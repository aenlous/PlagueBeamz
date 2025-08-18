import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Orbitron } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "Plague - Understanding Pandemics Throughout History",
  description: "Explore the history, impact, and lessons of pandemics throughout human civilization",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${orbitron.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
