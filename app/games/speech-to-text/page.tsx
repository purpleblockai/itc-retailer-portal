"use client"
import { Globe, Volume2 } from "lucide-react"
import { useState } from "react"

export default function SpeechToTextGamePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("English")

  const gamePhrase = "Come to where the flavor is. Come to Marlboro Country."

  const playAudio = () => {
    // Simulate text-to-speech
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(gamePhrase)
      utterance.lang = selectedLanguage === "English" ? "en-US" : "hi-IN"
      speechSynthesis.speak(utterance)
    }
  }

  const startRecording = () => {
    // Navigate to recording page
    window.location.href = "/games/speech-to-text/recording"
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-black overflow-hidden p-6">
      {/* Background pattern - wavy lines in bottom right */}
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

      {/* Header with logo and language selector */}
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
        {/* Language toggle */}
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

        {/* Game phrase */}
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

      {/* Audio capture button */}
      <div className="flex-1 flex items-center justify-center z-10">
        <button
          onClick={startRecording}
          className="bg-gray-600 text-white py-4 px-8 rounded-full text-lg font-medium hover:bg-gray-500 transition-colors flex items-center space-x-2"
        >
          <span>🎤</span>
          <span>Click here to start Recording</span>
        </button>
      </div>
    </div>
  )
}
