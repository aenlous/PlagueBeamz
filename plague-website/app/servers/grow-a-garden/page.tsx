"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GrowAGardenPage() {
  const discordLinks = [
    "https://discord.gg/growagarden",
    "https://discord.gg/stocknotifier",
    "https://discord.gg/growagardenn",
    "https://discord.gg/giftcard",
    "https://discord.gg/growagardentrades",
    "https://discord.gg/growgardens",
    "https://discord.gg/growagardencode",
    "https://discord.gg/growagardenstore",
    "https://discord.gg/gaghub",
    "https://discord.gg/growagardens",
    "https://discord.gg/growanotifier",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-black flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <a
          href="/servers"
          className="bg-purple-600/80 hover:bg-purple-500/90 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300"
        >
          ← Back to Servers
        </a>
      </div>

      <a
        href="/"
        className="absolute top-16 right-4 bg-green-700/80 hover:bg-green-600/90 text-white px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border border-green-400/30 hover:border-green-300/50 transition-all duration-300"
      >
        ← Back to Home
      </a>

      <Card className="w-full max-w-2xl bg-purple-900/30 border-purple-500/50 backdrop-blur-sm shadow-2xl shadow-purple-500/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">🌱 Grow a Garden Servers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-800/50 border border-purple-500/50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <ol className="text-white space-y-2 list-decimal list-inside">
              {discordLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-100 underline ml-2"
                  >
                    Discord Server {index + 1}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
