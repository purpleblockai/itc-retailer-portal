"use client"

import { ArrowLeft } from "lucide-react"

const games = [
  {
    id: "itc-classic",
    name: "ITC Classic",
    description: "Test your knowledge about ITC Classic cigarettes",
    image: "/games/classic.jpg" // You'll need to add these images
  },
  {
    id: "itc-flake",
    name: "ITC Flake",
    description: "Learn about ITC Flake through an interactive game",
    image: "/games/flake.jpg"
  },
  {
    id: "itc-navy-cut",
    name: "ITC Navy Cut",
    description: "Challenge yourself with ITC Navy Cut trivia",
    image: "/games/navy-cut.jpg"
  }
]

export default function GamesPage() {
  const handleGameClick = (gameId: string) => {
    window.location.href = `/games/${gameId}`
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-black overflow-hidden p-6">
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
          <path
            d="M-10,40 C55,20 95,60 115,110 C135,160 135,220 115,270 C95,320 55,350 -10,330"
            stroke="#B275F7"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-10,70 C45,50 80,80 100,125 C120,170 120,225 100,270 C80,315 45,340 -10,320"
            stroke="#B275F7"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-10,100 C35,80 65,100 85,140 C105,180 105,230 85,270 C65,310 35,330 -10,310"
            stroke="#B275F7"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-10,130 C25,110 50,120 70,155 C90,190 90,235 70,270 C50,305 25,320 -10,300"
            stroke="#B275F7"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-10,160 C15,140 35,140 55,170 C75,200 75,240 55,270 C35,300 15,310 -10,290"
            stroke="#B275F7"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-10,190 C5,170 20,160 40,185 C60,210 60,245 40,270 C20,295 5,300 -10,280"
            stroke="#B275F7"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-10,220 C-5,200 5,180 25,200 C45,220 45,250 25,270 C5,290 -5,290 -10,270"
            stroke="#B275F7"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-10,10 C65,0 110,40 130,100 C150,160 150,230 130,290 C110,350 65,380 -10,370"
            stroke="#B275F7"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </div>

      {/* Back button */}
      <a href="/verification/success" className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors z-10">
        <ArrowLeft className="w-6 h-6" />
      </a>

      {/* Main content */}
      <div className="flex-1 flex flex-col z-10">
        <h1 className="text-white text-3xl font-medium mb-8">Select a Game</h1>

        <div className="grid grid-cols-1 gap-6">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => handleGameClick(game.id)}
              className="bg-[#222222] rounded-lg p-6 text-left hover:bg-[#2a2a2a] transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#B275F7] rounded-lg flex items-center justify-center">
                  <span className="text-black text-xl font-bold">{game.name.split(" ")[1][0]}</span>
                </div>
                <div>
                  <h2 className="text-white text-xl font-medium mb-1">{game.name}</h2>
                  <p className="text-gray-400">{game.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Logo at bottom */}
      <div className="mt-auto mb-4 text-center z-10">
        <h2 className="text-[#B275F7] text-2xl font-bold">Spiel</h2>
        <h3 className="text-[#B275F7] text-2xl font-bold">Portal</h3>
      </div>
    </div>
  )
}
