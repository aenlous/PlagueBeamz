"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"

export default function MethodsPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [playlist] = useState([
    { title: "100", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dean%20Blunt%20-%20100-Z5GjA1kk5lIidfxNBf94t0rojjjW2C.mp4" },
    { title: "the internet is where we met", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kempachii-%20the%20internet%20is%20where%20we%20met%20%28slowed%20and%20reverbed%20to%20perfection%29-feIbARBW4AJ9gfXHozfmeIwgw15oy9.mp4" },
    { title: "Cigarettes out the Window", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TV%20Girl%20-%20Cigarettes%20out%20the%20Window%20%28Lyrics%29-zKzjWx8ioUje36F2GgCEE7EACys0oC.mp4" },
    { title: "Untitled 05 Remix", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kendrick%20Lamar%20-%20Untitled%2005%20%28LoVibe.%20Remix%29-NydeKz2DDHI0SLUjYfZN4rI24jYSmo.mp4" },
  ])
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const skipToPrevious = () => {
    const newIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1
    setCurrentSongIndex(newIndex)
    setIsPlaying(false)
  }

  const skipToNext = () => {
    const newIndex = currentSongIndex === playlist.length - 1 ? 0 : currentSongIndex + 1
    setCurrentSongIndex(newIndex)
    setIsPlaying(false)
  }

  const handleSongEnd = () => {
    skipToNext()
    // Auto-play the next song
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }, 100)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseInt(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      audioRef.current.addEventListener("ended", handleSongEnd)

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", handleSongEnd)
        }
      }
    }
  }, [currentSongIndex])

  const handleCardClick = () => {
    // Create a subtle click animation effect
    const clickEffect = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget
      card.style.transform = "scale(0.98)"
      setTimeout(() => {
        card.style.transform = "scale(1.05)"
        setTimeout(() => {
          card.style.transform = "scale(1)"
        }, 100)
      }, 100)
    }
    return clickEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black flex flex-col p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-emoji" style={{ top: "20%", right: "10%", animationDelay: "2s" }}>
          ☠️
        </div>
        <div className="floating-emoji" style={{ top: "30%", left: "15%", animationDelay: "4s" }}>
          💀
        </div>
        <div className="floating-emoji" style={{ top: "50%", left: "8%", animationDelay: "3s" }}>
          💉
        </div>
        <div className="floating-emoji" style={{ top: "60%", right: "15%", animationDelay: "5s" }}>
          ⚠️
        </div>
        <div className="floating-emoji" style={{ top: "80%", right: "5%", animationDelay: "4.5s" }}>
          🚨
        </div>
        <div className="floating-emoji" style={{ top: "15%", left: "50%", animationDelay: "1.5s" }}>
          🧬
        </div>
        <div className="floating-emoji" style={{ top: "35%", right: "40%", animationDelay: "3.5s" }}>
          💀
        </div>
        <div className="floating-emoji" style={{ top: "55%", left: "60%", animationDelay: "0.5s" }}>
          ☠️
        </div>
        <div className="floating-emoji" style={{ top: "45%", right: "60%", animationDelay: "1.8s" }}>
          💉
        </div>
        <div className="floating-emoji" style={{ top: "65%", left: "40%", animationDelay: "3.2s" }}>
          ⚠️
        </div>
      </div>

      <a
        href="/"
        className="absolute top-16 right-4 bg-blue-700/80 hover:bg-blue-600/90 text-white px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300"
      >
        ← Back to Home
      </a>

      <div className="absolute top-4 left-4 bg-blue-900/80 backdrop-blur-sm border border-blue-500/50 rounded-lg p-2 shadow-lg">
        <div className="text-white text-xs mb-1">Now Playing</div>
        <div className="text-blue-200 font-medium mb-2 text-sm">{playlist[currentSongIndex].title}</div>

        <div className="flex items-center gap-1 mb-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:text-blue-300 p-0.5 h-6 w-6"
            onClick={skipToPrevious}
          >
            <SkipBack size={12} />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:text-blue-300 p-0.5 h-6 w-6"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:text-blue-300 p-0.5 h-6 w-6"
            onClick={skipToNext}
          >
            <SkipForward size={12} />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Volume2 size={10} className="text-blue-300" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-blue-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-xs text-blue-300">{volume}%</span>
        </div>

        <audio ref={audioRef}>
          <source src={playlist[currentSongIndex].src} type="audio/mp4" />
        </audio>
      </div>

      <a
        href="https://discord.gg/F4PJCjfptr"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 bg-blue-600/80 hover:bg-blue-500/90 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30"
      >
        Join Discord
      </a>

      <h1 className="text-5xl font-black text-white mb-8 mt-16 text-center tracking-wide futuristic-title">
        ❤️ Beaming Methods ❤️
      </h1>

      <p className="text-gray-400 text-center mb-8">6 of our Best Beaming Methods, More in our Discord Server</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full mb-8">
        {/* Dualhook Method */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                D
              </div>
              <div className="flex gap-2">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">technical</span>
              </div>
            </div>
            <CardTitle className="text-white text-xl font-bold">Dualhook Method (OP)</CardTitle>
            <CardDescription className="text-gray-300 text-sm leading-relaxed">
              The most powerful dual-hook implementation with exceptional success rates. This advanced technique
              simultaneously targets multiple authentication layers...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚡ Effectiveness:</span>
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="text-gray-400 text-sm">(5.0)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-red-400">🎯 Success Rate:</span>
                <span className="text-white font-bold">85-90%</span>
              </div>
              <div>
                <p className="text-orange-400 font-medium mb-2">Key Features:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Dual-layer authentication bypass</li>
                  <li>• Improved cookie handling</li>
                  <li>• +2 more features</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">hook</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">authentication</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">session</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm flex items-center gap-1">📥 9,245</span>
                <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-medium">Advanced</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* TikTok Method */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                T
              </div>
              <div className="flex gap-2">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">viral</span>
                <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium">NEW</span>
              </div>
            </div>
            <CardTitle className="text-white text-xl font-bold">TikTok Method (OP)</CardTitle>
            <CardDescription className="text-gray-300 text-sm leading-relaxed">
              Leverage TikTok's massive platform to deploy highly effective beaming strategies. This method uses viral
              content to attract unsuspecting targets through...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚡ Effectiveness:</span>
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="text-gray-400 text-sm">(5.0)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-red-400">🎯 Success Rate:</span>
                <span className="text-white font-bold">80-95%</span>
              </div>
              <div>
                <p className="text-orange-400 font-medium mb-2">Key Features:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• TikTok platform integration</li>
                  <li>• Social proof mechanisms</li>
                  <li>• +2 more features</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">tiktok</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">social</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">viral</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm flex items-center gap-1">📥 10,389</span>
                <span className="bg-yellow-600 text-white px-3 py-1 rounded text-xs font-medium">Intermediate</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Autohar Method */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div className="flex gap-2">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">technical</span>
                <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium">NEW</span>
              </div>
            </div>
            <CardTitle className="text-white text-xl font-bold">Autohar Method</CardTitle>
            <CardDescription className="text-gray-300 text-sm leading-relaxed">
              A technical method that tricks victims into revealing their own cookies while thinking they're getting
              access to someone else's account. Utilizes...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚡ Effectiveness:</span>
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="text-gray-400 text-sm">(5.0)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-red-400">🎯 Success Rate:</span>
                <span className="text-white font-bold">75-85%</span>
              </div>
              <div>
                <p className="text-orange-400 font-medium mb-2">Key Features:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Developer console exploitation</li>
                  <li>• Self-cookie extraction</li>
                  <li>• +2 more features</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">technical</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">cookies</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">console</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm flex items-center gap-1">📥 8,750</span>
                <span className="bg-gray-600 text-white px-3 py-1 rounded text-xs font-medium">Built with 🤖</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Please Donate Method */}
        <Card className="bg-gray-600/50 border-gray-500 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <div className="flex gap-2">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">social</span>
                <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium">NEW</span>
              </div>
            </div>
            <CardTitle className="text-white text-xl font-bold">Please Donate Method (OP)</CardTitle>
            <CardDescription className="text-gray-300 text-sm leading-relaxed">
              Target people in the PLEASE DONATE game by offering fake donations. This method exploits the desire for
              free items and...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚡ Effectiveness:</span>
                <div className="flex text-yellow-400">★★★★☆</div>
                <span className="text-gray-400 text-sm">(4.0)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-red-400">🎯 Success Rate:</span>
                <span className="text-white font-bold">80-90%</span>
              </div>
              <div>
                <p className="text-orange-400 font-medium mb-2">Key Features:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Game-specific targeting</li>
                  <li>• Fake donation techniques</li>
                  <li>• +2 more features</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">pls</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">donate</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">giveaway</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm flex items-center gap-1">📥 7,892</span>
                <span className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium">Beginner</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Adopt Me Method */}
        <Card className="bg-gray-600/50 border-gray-500 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div className="flex gap-2">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">social</span>
              </div>
            </div>
            <CardTitle className="text-white text-xl font-bold">Adopt Me Method</CardTitle>
            <CardDescription className="text-gray-300 text-sm leading-relaxed">
              Target people in Adopt Me by offering rare pets or in-game currency and trading systems when...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚡ Effectiveness:</span>
                <div className="flex text-yellow-400">★★★☆☆</div>
                <span className="text-gray-400 text-sm">(3.0)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-red-400">🎯 Success Rate:</span>
                <span className="text-white font-bold">70-80%</span>
              </div>
              <div>
                <p className="text-orange-400 font-medium mb-2">Key Features:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Pet trading manipulation</li>
                  <li>• Trust building techniques</li>
                  <li>• +2 more features</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">adoptme</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">pets</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">trading</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm flex items-center gap-1">📥 6,543</span>
                <span className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium">Beginner</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fake Friend Method */}
        <Card className="bg-gray-600/50 border-gray-500 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                F
              </div>
              <div className="flex gap-2">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">social</span>
              </div>
            </div>
            <CardTitle className="text-white text-xl font-bold">Fake Friend Method</CardTitle>
            <CardDescription className="text-gray-300 text-sm leading-relaxed">
              Approach your target and pretend that you are their friend. Slowly build trust and manipulate them to let
              you exploit their vulnerabilities by...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚡ Effectiveness:</span>
                <div className="flex text-yellow-400">★★★★☆</div>
                <span className="text-gray-400 text-sm">(4.0)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-red-400">🎯 Success Rate:</span>
                <span className="text-white font-bold">85-95%</span>
              </div>
              <div>
                <p className="text-orange-400 font-medium mb-2">Key Features:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Long-term relationship building</li>
                  <li>• Trust manipulation</li>
                  <li>• +2 more features</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">social</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">friends</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">trust</span>
                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm flex items-center gap-1">📥 5,876</span>
                <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-medium">Advanced</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="absolute bottom-4 left-4 text-blue-300/70 text-sm">© PlagueBeamz</div>
    </div>
  )
}
