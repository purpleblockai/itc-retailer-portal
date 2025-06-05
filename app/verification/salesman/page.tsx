"use client"

import React, { useState } from "react"
import { Globe, CheckCircle, ArrowLeft } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const countryCodes = [
  { code: "+91", name: "India" },
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+61", name: "Australia" },
  { code: "+86", name: "China" },
  { code: "+81", name: "Japan" },
  { code: "+49", name: "Germany" },
  { code: "+33", name: "France" },
  { code: "+39", name: "Italy" },
  { code: "+34", name: "Spain" },
]

export default function SalesmanVerificationPage() {
  const [salesmanPhone, setSalesmanPhone] = useState("")
  const [countryCode, setCountryCode] = useState("")
  const [verifiedPhone, setVerifiedPhone] = useState("+91 9983081638")
  const [errors, setErrors] = useState({
    phoneNumber: "",
    countryCode: ""
  })

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
    setSalesmanPhone(value)
    setErrors(prev => ({ ...prev, phoneNumber: validatePhoneNumber(value) }))
  }

  const handleCountryCodeChange = (value: string) => {
    setCountryCode(value)
    setErrors(prev => ({ ...prev, countryCode: value ? "" : "Please select a country code" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate country code
    if (!countryCode) {
      setErrors(prev => ({ ...prev, countryCode: "Please select a country code" }))
      return
    }

    // Validate phone number
    const phoneError = validatePhoneNumber(salesmanPhone)
    if (phoneError) {
      setErrors(prev => ({ ...prev, phoneNumber: phoneError }))
      return
    }

    // Store the phone number for the OTP page
    const fullPhoneNumber = countryCode + salesmanPhone
    sessionStorage.setItem("salesmanPhone", fullPhoneNumber)

    // Navigate to salesman OTP page
    window.location.href = "/verification/salesman/otp"
  }

  // In a real app, we would get the verified phone from sessionStorage or context
  React.useEffect(() => {
    const storedPhone = sessionStorage.getItem("phoneNumber")
    if (storedPhone) {
      setVerifiedPhone(storedPhone)
    }
  }, [])

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
            d="M-10,100 C35,80 65,100 85,140 C105,180 105,230 85,270 C65,310 35,300 -10,290"
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
            d="M-10,190 C 5,170 20,160 40,185 C60,210 60,245 40,270 C20,295 5,300 -10,280"
            stroke="#B275F7"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-10,220 C-5,200 5,180 25,200 C45,220 45,250 25,270 C 5,290 -5,290 -10,270"
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
      <a href="/verification/otp" className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors z-10">
        <ArrowLeft className="w-6 h-6" />
      </a>

      {/* Verified phone number */}
      <div className="flex items-center mb-8 z-10">
        <p className="text-white mr-1">Your mobile no.</p>
        <span className="text-[#B275F7] mr-1">{verifiedPhone}</span>
        <p className="text-white mr-1">is verified</p>
        <CheckCircle className="w-4 h-4 text-green-500" fill="green" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col z-10">
        <h1 className="text-white text-xl font-medium mb-1">Enter Salesman&apos;s Mobile</h1>
        <h2 className="text-white text-xl font-medium mb-8">no. for verification</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="salesmanPhone" className="text-white text-sm font-normal">
              Enter Salesman&apos;s Mobile Number
            </label>
            <div className="flex gap-2">
              <Select 
                value={countryCode} 
                onValueChange={handleCountryCodeChange}
              >
                <SelectTrigger 
                  className={`w-[180px] h-[52px] bg-[#222222] text-white border-gray-700 focus:border-[#B275F7] rounded-lg ${
                    errors.countryCode ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-[#222222] text-white border-gray-700">
                  {countryCodes.map((country) => (
                    <SelectItem 
                      key={country.code} 
                      value={country.code}
                      className="focus:bg-[#B275F7] focus:text-black"
                    >
                      {country.code} - {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                id="salesmanPhone"
                type="tel"
                value={salesmanPhone}
                onChange={handlePhoneNumberChange}
                placeholder="Mobile No."
                className={`flex-1 bg-[#222222] text-white p-4 rounded-lg border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:border-[#B275F7] font-normal h-[52px]`}
              />
            </div>
            {(errors.countryCode || errors.phoneNumber) && (
              <div className="text-red-500 text-sm mt-1">
                {errors.countryCode || errors.phoneNumber}
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
