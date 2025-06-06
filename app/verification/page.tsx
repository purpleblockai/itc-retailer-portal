"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function VerificationPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [errors, setErrors] = useState({
    phoneNumber: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const validatePhoneNumber = (number: string) => {
    // Check if it contains any non-digit characters
    if (!/^\d*$/.test(number)) {
      return "Phone number must contain only numbers"
    }
    
    // Check if it's exactly 10 digits
    if (number.length !== 10) {
      return "Phone number must be 10 digits"
    }
    
    return ""
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhoneNumber(value)
    setErrors(prev => ({ ...prev, phoneNumber: validatePhoneNumber(value) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate phone number
    const phoneError = validatePhoneNumber(phoneNumber)
    if (phoneError) {
      setErrors(prev => ({ ...prev, phoneNumber: phoneError }))
      return
    }

    // Store phone number with +91 prefix and navigate to OTP page
    const fullPhoneNumber = "+91" + phoneNumber
    sessionStorage.setItem("phoneNumber", fullPhoneNumber)
    window.location.href = "/verification/otp"
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
      <a href="/" className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors z-10">
        <ArrowLeft className="w-6 h-6" />
      </a>

      {/* Main content */}
      <div className="flex-1 flex flex-col mt-12 z-10">
        <h1 className="text-white text-xl font-medium mb-1">Enter your Mobile no.</h1>
        <h2 className="text-white text-xl font-medium mb-8">for verification</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="phoneNumber" className="text-white text-sm font-normal">
              Enter Mobile Number
            </label>
            <div className="flex gap-2">
              <div className="w-[120px] h-[52px] bg-[#222222] text-white border border-gray-700 rounded-lg flex items-center justify-center gap-2 px-3">
                <Image
                  src="/india-flag.svg"
                  alt="India flag"
                  width={24}
                  height={18}
                  className="rounded"
                  priority
                />
                <span>+91</span>
              </div>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Mobile No."
                className={`flex-1 bg-[#222222] text-white p-4 rounded-lg border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:border-[#B275F7] font-normal h-[52px]`}
              />
            </div>
            {errors.phoneNumber && (
              <div className="text-red-500 text-sm mt-1">
                {errors.phoneNumber}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="bg-[#B275F7] text-black py-4 px-6 rounded-full font-medium text-base"
          >
            Get OTP
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
