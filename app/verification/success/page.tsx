"use client"

import { Globe } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-black overflow-hidden p-4">
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

      {/* Language selector */}
      <div className="absolute top-4 right-4 z-20">
        <button className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Globe className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center z-10">
        {/* Purple circle with check mark */}
        <div className="w-32 h-32 bg-[#B275F7] rounded-full flex items-center justify-center mb-6">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Text content */}
        <h1 className="text-[#B275F7] text-3xl font-bold mb-2">Verification</h1>
        <h2 className="text-[#B275F7] text-3xl font-bold mb-8">Complete!</h2>

        <p className="text-white text-lg mb-2">Let's play a game to win</p>
        <p className="text-lg mb-8">
          exciting <span className="text-[#B275F7] font-bold">REWARDS!!!</span>
        </p>

        {/* Play button */}
        <Link
          href="/games"
          className="bg-[#B275F7] text-black px-12 py-3 rounded-full font-bold text-lg hover:bg-[#9d5fe0] transition-colors inline-flex items-center justify-center"
        >
          PLAY
        </Link>
      </div>
    </div>
  )
}
