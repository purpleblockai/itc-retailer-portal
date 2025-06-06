"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowLeft } from "lucide-react"

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")

  // Focus on first input when component mounts
  useEffect(() => {
    const firstInput = inputRefs.current[0];
    if (firstInput) {
      firstInput.focus();
    }

    // Get the phone number from sessionStorage
    const storedPhone = sessionStorage.getItem("phoneNumber")
    if (storedPhone) {
      setPhoneNumber(storedPhone)
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(0, 1)
    setOtp(newOtp)
    setError("") // Clear error when user types

    // Move to next input if current input is filled
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join("")
    
    // Check if all 4 digits are entered
    if (otpValue.length !== 4) {
      setError("Please enter all 4 digits of the OTP")
      return
    }

    // Navigate directly to the success page
    window.location.href = "/verification/success"
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
      <a href="/verification" className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors z-10">
        <ArrowLeft className="w-6 h-6" />
      </a>

      {/* Main content */}
      <div className="flex-1 flex flex-col mt-12 z-10">
        <h1 className="text-white text-3xl font-medium mb-8">OTP Verification</h1>

        <p className="text-white mb-6">
          Enter the 4-digit code sent to <span className="text-[#B275F7]">{phoneNumber}</span>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="number"
                  inputMode="numeric"
                  pattern="\d*"
                  autoComplete="one-time-code"
                  min="0"
                  max="9"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => {
                    if (inputRefs.current) {
                      inputRefs.current[index] = el;
                    }
                  }}
                  className={`w-16 h-16 text-center text-2xl bg-[#222222] rounded-lg text-white border ${
                    error ? "border-red-500" : "border-gray-700"
                  } focus:outline-none focus:border-[#B275F7] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  placeholder="X"
                />
              ))}
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="bg-[#B275F7] text-black py-4 px-6 rounded-full font-medium text-base"
          >
            Verify
          </button>
        </form>
      </div>

      {/* Logo at bottom */}
      <div className="mt-auto mb-4 text-center z-10">
        <h2 className="text-[#B275F7] text-2xl font-bold">Spiel</h2>
        <h3 className="text-[#B275F7] text-2xl font-bold">Portal</h3>
      </div>
    </div>
  )
}
