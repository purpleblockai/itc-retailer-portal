"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GameWonPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-black overflow-hidden p-4">
      {/* Wavy background pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg width="100%" height="100%" viewBox="0 0 400 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          {[...Array(10)].map((_, i) => (
            <path
              key={i}
              d={`M200,450 m-${120 + i * 20},0 a${120 + i * 20},${120 + i * 20} 0 1,0 ${(120 + i * 20) * 2},0 a${120 + i * 20},${120 + i * 20} 0 1,0 -${(120 + i * 20) * 2},0`}
              stroke="#B275F7"
              strokeWidth="1.5"
              fill="none"
              opacity="0.3"
            />
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <h1 className="text-[#B275F7] text-3xl font-bold mb-4 text-center">Congratulations!!!</h1>
        
        {/* Party Icon */}
        <div className="w-24 h-24 bg-[#18181b] rounded-full flex items-center justify-center mb-6">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Purple Triangle */}
            <path d="M24 12L32 36H16L24 12Z" fill="#B275F7"/>
            
            {/* Colorful Decorative Elements */}
            <circle cx="36" cy="16" r="3" fill="#FFD700"/> {/* Yellow dot */}
            <circle cx="14" cy="20" r="2" fill="#00D8A7"/> {/* Teal dot */}
            <circle cx="32" cy="40" r="2" fill="#FF6B6B"/> {/* Red dot */}
            <circle cx="24" cy="40" r="2" fill="#B275F7"/> {/* Purple dot */}
            <circle cx="40" cy="32" r="2" fill="#FFD700"/> {/* Yellow dot */}
            <circle cx="8" cy="32" r="2" fill="#B275F7"/> {/* Purple dot */}
            
            {/* Curved Lines */}
            <path d="M24 12Q28 24 32 24" stroke="#FFD700" strokeWidth="2"/> {/* Yellow line */}
            <path d="M24 12Q20 24 16 24" stroke="#00D8A7" strokeWidth="2"/> {/* Teal line */}
            <path d="M24 12Q28 20 40 20" stroke="#FF6B6B" strokeWidth="1.5"/> {/* Red line */}
            <path d="M24 12Q20 20 8 20" stroke="#B275F7" strokeWidth="1.5"/> {/* Purple line */}
          </svg>
        </div>

        <h2 className="text-white text-2xl font-bold mb-2">You've <span className="text-[#00FF00]">WON</span></h2>
        <p className="text-white text-center mb-8 font-bold" style={{ fontFamily: 'monospace' }}>
          Collect your Prize<br />from our Salesman!!!
        </p>

        {/* Back button */}
        <Link
          href="/games"
          className="w-14 h-14 bg-[#B275F7] rounded-full flex items-center justify-center hover:bg-[#9d5fe0] transition-colors"
        >
          <ArrowLeft className="w-8 h-8 text-black" />
        </Link>
      </div>

      {/* Logo at bottom */}
      <div className="text-center mt-auto mb-8 z-10">
        <h2 className="text-[#B275F7] text-2xl font-bold">Spiel</h2>
        <h3 className="text-[#B275F7] text-2xl font-bold">Portal</h3>
      </div>
    </div>
  )
} 