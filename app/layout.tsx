import type React from "react"
import type { Metadata } from "next"
import { Gugi } from "next/font/google"
import "./globals.css"

// Initialize the Gugi font with proper settings
const gugi = Gugi({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Spiel Portal - Retailer Registration",
  description: "Register as a retailer on the Spiel Portal",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={gugi.className}>
      <body>{children}</body>
    </html>
  )
}
