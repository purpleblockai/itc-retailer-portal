"use client"

import { ArrowLeft, Mic, Volume2, Check, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast, Toaster } from "sonner"

const PHRASE = "ITC Flake: Smooth and Satisfying"
const MAX_RECORDING_TIME = 8;

function ValidationModal({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-[#18181b] p-8 rounded-xl flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <p className="text-white text-xl font-bold">Speech validation in process...</p>
        <p className="text-gray-400">Please wait while we validate your response</p>
      </div>
    </div>
  );
}

function FeedbackModal({
  open,
  type,
  attempt,
  onClose,
  onCollectReward
}: {
  open: boolean,
  type: "correct" | "incorrect" | "all-correct",
  attempt: number,
  onClose: () => void,
  onCollectReward?: () => void
}) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-[#18181b] p-8 rounded-xl max-w-md w-full">
        <div className="flex flex-col items-center justify-center">
          <div className={`rounded-full w-24 h-24 flex items-center justify-center mb-6 ${
            type === 'incorrect' ? 'bg-red-600' : 'bg-[#B275F7]'
          }`}>
            {type === 'incorrect' ? (
              <X className="w-16 h-16 text-white" />
            ) : (
              <Check className="w-16 h-16 text-white" />
            )}
          </div>
          
          <h2 className="text-[#B275F7] text-2xl font-bold mb-4 text-center">
            {type === 'incorrect' ? 'Try Again' : 'Congratulations!!!'}
          </h2>
          
          <p className="text-white text-xl text-center mb-6">
            {type === 'all-correct' ? (
              'All 3 voice responses are correct!'
            ) : (
              <>
                Voice Input #{attempt + 1} is{' '}
                <span className={type === 'incorrect' ? 'text-red-500' : 'text-green-500'}>
                  {type === 'incorrect' ? 'INCORRECT' : 'CORRECT'}
                </span>
              </>
            )}
          </p>
          
          <button
            onClick={type === 'all-correct' ? onCollectReward : onClose}
            className="bg-[#B275F7] text-black font-bold text-lg rounded-full px-8 py-3 hover:bg-[#9d5fe0] transition-colors"
          >
            {type === 'all-correct' ? '🏆 COLLECT REWARD' : type === 'incorrect' ? 'RECORD AGAIN' : 'RECORD NEXT RESPONSE'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ITCFlakeGamePage() {
  const [isListening, setIsListening] = useState(false)
  const [timer, setTimer] = useState(MAX_RECORDING_TIME)
  const [activeInput, setActiveInput] = useState(0)
  const [results, setResults] = useState([false, false, false])
  const [transcripts, setTranscripts] = useState(["", "", ""])
  const [modal, setModal] = useState<{type: "correct" | "incorrect" | "all-correct", attempt: number} | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const [language, setLanguage] = useState("English")
  const router = useRouter()

  // Add permission check function
  const checkMicrophonePermission = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      return permissionStatus.state === 'granted';
    } catch (error) {
      console.error('Error checking microphone permission:', error);
      return false;
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const handleSpeak = async () => {
    // If already recording, stop the recording
    if (isListening) {
      stopRecording();
      return;
    }

    // If not recording, start new recording
    if (activeInput > 2 || isValidating) return;

    try {
      // Check if permission is already granted
      const hasPermission = await checkMicrophonePermission();
      
      if (!hasPermission) {
        // On mobile, we need to request permission through getUserMedia
        await navigator.mediaDevices.getUserMedia({ audio: true });
        // After successful permission, proceed with recording
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Check if the stream is valid and has audio tracks
      if (!stream || !stream.getAudioTracks().length) {
        throw new Error('No audio track available');
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstart = () => {
        setIsListening(true);
        setTimer(MAX_RECORDING_TIME);
        
        intervalRef.current = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer <= 1) {
              stopRecording();
              return 0;
            }
            return prevTimer - 1;
          });
        }, 1000);
      };

      mediaRecorder.onstop = async () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsListening(false);
        setTimer(MAX_RECORDING_TIME);

        // Only validate if we have audio data
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { 
            type: 'audio/webm;codecs=opus' 
          });

          // Stop all tracks
          stream.getTracks().forEach(track => track.stop());

          // Start validation
          await validateSpeech(audioBlob);
        }
      };

      // Request data every 100ms to ensure we capture audio
      mediaRecorder.start(100);
      toast.success('Recording started');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Please allow microphone access to play the game');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      toast.success('Recording stopped');
    }
  };

  const validateSpeech = async (audioBlob: Blob) => {
    try {
      setIsValidating(true);
      
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('text', PHRASE);
      formData.append('language', language);

      const response = await fetch('/api/speech-validation', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Validation failed');
      }

      const data = await response.json();
      
      if (data.match) {
        const newResults = [...results];
        newResults[activeInput] = true;
        setResults(newResults);
        
        const newTranscripts = [...transcripts];
        newTranscripts[activeInput] = data.recognized_text;
        setTranscripts(newTranscripts);
        
        if (activeInput === 2) {
          setModal({ type: "all-correct", attempt: activeInput });
        } else {
          setModal({ type: "correct", attempt: activeInput });
        }
      } else {
        setModal({ type: "incorrect", attempt: activeInput });
      }
    } catch (error) {
      console.error('Validation error:', error);
      toast.error('Error validating speech. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handlePlayPhrase = () => {
    const utterance = new SpeechSynthesisUtterance(PHRASE);
    utterance.lang = language === 'English' ? 'en-US' : 'hi-IN';
    window.speechSynthesis.speak(utterance);
  };

  const handleModalClose = () => {
    setModal(null);
    if (results[activeInput]) {
      setActiveInput(activeInput + 1);
    }
  };

  const handleCollectReward = () => {
    setModal(null);
    router.push("/games/won");
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-black overflow-hidden p-4">
      <Toaster position="top-center" />
      <ValidationModal isOpen={isValidating} />
      <FeedbackModal
        open={!!modal}
        type={modal?.type || "correct"}
        attempt={modal?.attempt || 0}
        onClose={handleModalClose}
        onCollectReward={handleCollectReward}
      />
      
      {/* Background pattern */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden z-0">
        <svg
          width="100%"
          height="600"
          viewBox="0 0 375 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* 8 wavy, curvy lines */}
          <path d="M-10,40 C55,20 95,60 115,110 C135,160 135,220 115,270 C95,320 55,350 -10,330" stroke="#B275F7" strokeWidth="1.2" fill="none" />
          <path d="M-10,70 C45,50 80,80 100,125 C120,170 120,225 100,270 C80,315 45,340 -10,320" stroke="#B275F7" strokeWidth="1.2" fill="none" />
          <path d="M-10,100 C35,80 65,100 85,140 C105,180 105,230 85,270 C65,310 35,330 -10,310" stroke="#B275F7" strokeWidth="1.2" fill="none" />
          <path d="M-10,130 C25,110 50,120 70,155 C90,190 90,235 70,270 C50,305 25,320 -10,300" stroke="#B275F7" strokeWidth="1.2" fill="none" />
          <path d="M-10,160 C15,140 35,140 55,170 C75,200 75,240 55,270 C35,300 15,310 -10,290" stroke="#B275F7" strokeWidth="1.2" fill="none" />
          <path d="M-10,190 C5,170 20,160 40,185 C60,210 60,245 40,270 C20,295 5,300 -10,280" stroke="#B275F7" strokeWidth="1.2" fill="none" />
          <path d="M-10,220 C-5,200 5,180 25,200 C45,220 45,250 25,270 C5,290 -5,290 -10,270" stroke="#B275F7" strokeWidth="1.2" fill="none" />
          <path d="M-10,10 C65,0 110,40 130,100 C150,160 150,230 130,290 C110,350 65,380 -10,370" stroke="#B275F7" strokeWidth="1.2" fill="none" />
        </svg>
      </div>

      {/* Back button */}
      <a href="/games" className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors z-10">
        <ArrowLeft className="w-6 h-6" />
      </a>

      {/* Header */}
      <div className="flex flex-col items-center mt-2 mb-4 z-10">
        <h2 className="text-[#B275F7] text-2xl font-bold text-center">Say the following</h2>
        <h1 className="text-white text-4xl font-bold text-center mt-1 mb-1">
          <span className="text-[#B275F7]">3 times</span> to WIN!!!
        </h1>
      </div>

      {/* Tagline card */}
      <div className="bg-[#18181b] rounded-2xl shadow-lg p-6 mb-6 mx-auto w-full max-w-md relative z-10">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            <button className={`px-3 py-1 rounded-full text-sm font-bold ${language === "English" ? "bg-[#B275F7] text-black" : "bg-gray-700 text-white"}`} onClick={() => setLanguage("English")}>English</button>
            <button className={`px-3 py-1 rounded-full text-sm font-bold ${language === "Hindi" ? "bg-[#B275F7] text-black" : "bg-gray-700 text-white"}`} onClick={() => setLanguage("Hindi")}>Hindi</button>
          </div>
          <button onClick={handlePlayPhrase} className="text-[#B275F7] p-2 rounded-full hover:bg-gray-800 transition-colors">
            <Volume2 className="w-6 h-6" />
          </button>
        </div>
        <div className="text-center">
          <span className="text-[#B275F7] text-2xl font-bold">"{PHRASE}"</span>
        </div>
      </div>

      {/* Recording section */}
      <div className="flex flex-col items-center mb-6 z-10">
        <span className="text-white text-sm mb-2">CLICK HERE TO START RECORDING</span>
        <button
          onClick={handleSpeak}
          disabled={isListening || activeInput > 2}
          className={`w-28 h-28 rounded-full flex items-center justify-center border-4 border-[#B275F7] shadow-lg transition-all mb-2 ${
            isListening ? "bg-red-500 animate-pulse" : "bg-[#B275F7] hover:bg-[#9d5fe0]"
          } ${activeInput > 2 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Mic className={`w-14 h-14 ${isListening ? "text-white" : "text-black"}`} />
        </button>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-32 h-4 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-4 bg-[#B275F7] transition-all duration-1000"
              style={{ width: `${(timer / MAX_RECORDING_TIME) * 100}%` }}
            />
          </div>
          <span className="text-white text-xs font-mono">
            0:{timer.toString().padStart(2, '0')}/0:08
          </span>
        </div>
      </div>

      {/* Voice input boxes */}
      <div className="flex flex-col items-center gap-3 mb-8 z-10">
        <span className="text-white text-base mb-1">Say it x3 times</span>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`rounded-xl px-4 py-3 text-center font-bold text-lg border-2 transition-all ${
                results[i]
                  ? "border-green-500 bg-green-900/20 text-green-300"
                  : activeInput === i
                  ? "border-[#B275F7] bg-[#18181b] text-white"
                  : "border-gray-700 bg-[#18181b] text-white opacity-60"
              }`}
            >
              Voice Input #{i + 1}
              <div className="text-xs font-normal mt-1 text-white/80">
                {transcripts[i]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logo at bottom */}
      <div className="mt-auto mb-2 text-center z-10">
        <h2 className="text-[#B275F7] text-2xl font-bold">Spiel</h2>
        <h3 className="text-[#B275F7] text-2xl font-bold">Portal</h3>
      </div>
    </div>
  );
} 