"use client"
import { Globe, Volume2, Square } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface VoiceAttempt {
  text: string
  isCorrect: boolean
  parts: { text: string; isCorrect: boolean }[]
}

export default function SpeechRecordingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(64) // Start at 1:04 as shown in image
  const [voiceAttempts, setVoiceAttempts] = useState<VoiceAttempt[]>([
    {
      text: "Come to where the flavor is. Come to Marlboro Country.",
      isCorrect: true,
      parts: [
        { text: "Come to where the flavor is.", isCorrect: true },
        { text: " Come to Marlboro Country.", isCorrect: false },
      ],
    },
    {
      text: "Come to where the flavor is. Come to Marlboro Country.",
      isCorrect: false,
      parts: [{ text: "Come to where the flavor is. Come to Marlboro Country.", isCorrect: false }],
    },
    {
      text: "Come to where the flavor is. Come to Marlboro Country.",
      isCorrect: false,
      parts: [{ text: "Come to where the flavor is. Come to Marlboro Country.", isCorrect: false }],
    },
  ])
  const [currentAttempt, setCurrentAttempt] = useState(0)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const gamePhrase = "Come to where the flavor is. Come to Marlboro Country."
  const maxRecordingTime = 120 // 2 minutes in seconds

  useEffect(() => {
    // Start the timer automatically
    intervalRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= maxRecordingTime) {
          return maxRecordingTime
        }
        return prev + 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)

      setMediaRecorder(recorder)
      setIsRecording(true)

      recorder.start()

      recorder.ondataavailable = (event) => {
        // Simulate speech recognition
        setTimeout(() => {
          processVoiceInput()
        }, 2000)
      }

      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop())
      }
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Please allow microphone access to play the game")
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop()
      setIsRecording(false)
    }
  }

  const processVoiceInput = () => {
    // Simulate speech recognition results
    const newAttempts = [...voiceAttempts]

    if (currentAttempt < 3) {
      // Simulate different accuracy levels
      const accuracy = Math.random()

      if (accuracy > 0.7) {
        // High accuracy - mark as correct
        newAttempts[currentAttempt] = {
          text: gamePhrase,
          isCorrect: true,
          parts: [{ text: gamePhrase, isCorrect: true }],
        }
      } else if (accuracy > 0.4) {
        // Partial accuracy - some parts correct
        newAttempts[currentAttempt] = {
          text: gamePhrase,
          isCorrect: false,
          parts: [
            { text: "Come to where the flavor is.", isCorrect: true },
            { text: " Come to Marlboro Country.", isCorrect: false },
          ],
        }
      } else {
        // Low accuracy - mark as incorrect
        newAttempts[currentAttempt] = {
          text: gamePhrase,
          isCorrect: false,
          parts: [{ text: gamePhrase, isCorrect: false }],
        }
      }

      setVoiceAttempts(newAttempts)
      setCurrentAttempt((prev) => prev + 1)
    }

    setIsRecording(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    const totalMins = Math.floor(maxRecordingTime / 60)
    const totalSecs = maxRecordingTime % 60
    return `${mins}:${secs.toString().padStart(2, "0")}/${totalMins}:${totalSecs.toString().padStart(2, "0")}`
  }

  const playAudio = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(gamePhrase)
      utterance.lang = selectedLanguage === "English" ? "en-US" : "hi-IN"
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-black overflow-hidden p-6">
      {/* Background pattern */}
      <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden z-0">
        <svg
          width="300"
          height="400"
          viewBox="0 0 300 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <path
              key={i}
              d={`M${300 - i * 20},${400 - i * 30} Q${200 - i * 15},${350 - i * 25} ${100 - i * 10},${300 - i * 20} T${-50 - i * 5},${250 - i * 15}`}
              stroke="#B275F7"
              strokeWidth="1.5"
              fill="none"
              opacity="0.7"
            />
          ))}
        </svg>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8 z-10">
        <div className="text-[#B275F7]">
          <h1 className="text-4xl font-bold">Spiel</h1>
          <h2 className="text-4xl font-bold">Portal</h2>
        </div>
        <button className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Globe className="w-6 h-6" />
        </button>
      </div>

      {/* Game title */}
      <div className="mb-8 z-10">
        <h3 className="text-[#B275F7] text-2xl font-bold">Say the following</h3>
        <h3 className="text-white text-2xl font-bold">
          3 times <span className="text-[#B275F7]">to WIN!!!</span>
        </h3>
      </div>

      {/* Game card */}
      <div className="bg-[#1E1E1E] rounded-lg p-6 mb-8 z-10">
        <div className="flex justify-end mb-6">
          <div className="bg-[#2A2A2A] rounded-full p-1 flex">
            <button
              onClick={() => setSelectedLanguage("English")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedLanguage === "English" ? "bg-[#B275F7] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLanguage("Hindi")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedLanguage === "Hindi" ? "bg-[#B275F7] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Hindi
            </button>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-white text-xl mb-6">"{gamePhrase}"</p>
          <button onClick={playAudio} className="text-gray-400 hover:text-white transition-colors">
            <Volume2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Say it x3 times */}
      <div className="flex items-center justify-center mb-8 z-10">
        <div className="flex-1 h-px bg-gray-600"></div>
        <p className="text-[#B275F7] text-lg font-bold mx-4">Say it x3 times</p>
        <div className="flex-1 h-px bg-gray-600"></div>
      </div>

      {/* Voice prompts */}
      <div className="space-y-4 mb-8 z-10">
        {voiceAttempts.map((attempt, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg p-4 ${
              attempt.isCorrect ? "border-green-500" : index < currentAttempt ? "border-red-500" : "border-gray-600"
            }`}
          >
            <p className="text-[#B275F7] text-sm mb-2">Voice prompt #{index + 1}</p>
            <div className="text-lg">
              {attempt.parts.map((part, partIndex) => (
                <span key={partIndex} className={part.isCorrect ? "text-green-500" : "text-gray-400"}>
                  {part.text}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recording controls */}
      <div className="bg-[#B275F7] rounded-full p-4 flex items-center justify-between mb-4 z-10">
        <button onClick={stopRecording} className="w-8 h-8 bg-red-500 rounded-sm flex items-center justify-center">
          <Square className="w-4 h-4 text-white fill-white" />
        </button>
        <div className="flex items-center space-x-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 h-6 rounded-full ${isRecording ? "bg-white animate-pulse" : "bg-white/50"}`}
              style={{ height: `${Math.random() * 24 + 8}px` }}
            />
          ))}
        </div>
        <span className="text-white font-mono">{formatTime(recordingTime)}</span>
      </div>

      {/* Start recording button */}
      <button
        onClick={startRecording}
        disabled={isRecording || currentAttempt >= 3}
        className="bg-gray-600 text-white py-4 px-8 rounded-full text-lg font-medium hover:bg-gray-500 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 z-10"
      >
        <span>🎤</span>
        <span>Click here to start Recording</span>
      </button>

      {/* Completion message */}
      {currentAttempt >= 3 && (
        <div className="mt-8 p-4 bg-[#B275F7] rounded-lg z-10">
          <p className="text-white text-xl font-bold text-center mb-4">Game Complete!</p>
          <button
            onClick={() => (window.location.href = "/games")}
            className="w-full bg-white text-[#B275F7] px-6 py-2 rounded-full font-bold"
          >
            Play Another Game
          </button>
        </div>
      )}
    </div>
  )
}
