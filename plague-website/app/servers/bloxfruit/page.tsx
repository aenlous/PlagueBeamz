"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BloxfruitPage() {
  const discordLinks = [
    "https://discord.gg/goodtrades",
    "https://discord.gg/wuizard",
    "https://discord.gg/itsatrap",
    "https://discord.gg/3UzvThuhHP",
    "https://discord.gg/srdark",
    "https://discord.gg/nCBKNBvQZw",
    "https://discord.gg/bfts",
    "https://discord.gg/bloxfruits",
    "https://discord.gg/k3cKUBbncT",
    "https://discord.gg/c9hkV7UfVa",
    "https://discord.gg/yJtMUucdpV",
    "https://discord.gg/bloxuniverse",
    "https://discord.gg/kenrblx",
    "https://discord.com/invite/axiore",
    "https://discord.com/invite/varietyjay",
    "https://discord.gg/tropa-do-luffy-981704660823982151",
    "https://discord.gg/fantasyplays",
    "https://discord.gg/gb",
    "https://discord.com/invite/officialnoobie",
    "https://discord.com/invite/bloxzy",
    "https://discord.gg/bloxtrade",
    "https://discord.gg/winterfamily",
    "https://discord.gg/kySCgYq",
    "https://discord.com/invite/enyu",
    "https://discord.gg/tradings",
    "https://discord.com/invite/pZPR2af",
    "https://discord.gg/4gribov",
    "https://discord.com/invite/xPuGzFYW4v",
    "https://discord.gg/srdark",
    "https://discord.gg/fantasyplays",
    "https://discord.gg/bloxzy",
    "https://discord.gg/eternaltrading",
    "https://discord.gg/hohohub",
    "https://discord.com/invite/Xkf4SSv24Z",
    "https://discord.gg/bloxtrade",
    "https://discord.gg/vaqqCaaPUd",
  ]

  const [inputText, setInputText] = useState("")

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
        className="absolute top-16 right-4 bg-orange-700/80 hover:bg-orange-600/90 text-white px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border border-orange-400/30 hover:border-orange-300/50 transition-all duration-300"
      >
        ← Back to Home
      </a>

      <Card className="w-full max-w-2xl bg-purple-900/30 border-purple-500/50 backdrop-blur-sm shadow-2xl shadow-purple-500/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">🍎 Bloxfruit Servers</CardTitle>
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
                    className="text-purple-300 hover:text-purple-100 underline hover:no-underline transition-colors duration-200"
                  >
                    Discord Server {index + 1}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white">Save</Button>
        </CardContent>
      </Card>
    </div>
  )
}
