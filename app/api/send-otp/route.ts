import { NextResponse } from 'next/server'
import twilio from 'twilio'

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

const client = twilio(accountSid, authToken)

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json()

    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString()

    // Send SMS using Twilio
    const message = await client.messages.create({
      body: `Your Spiel Portal verification code is: ${otp}`,
      from: twilioPhoneNumber,
      to: phoneNumber
    })

    // Return success response with OTP (in production, you should only return success/failure)
    return NextResponse.json({ 
      success: true, 
      messageId: message.sid,
      otp // In production, don't send OTP back to client
    })
  } catch (error) {
    console.error('Error sending OTP:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
} 