"use client"

import React, { useState } from "react"
import { Moon, Sun, Settings, ChevronDown } from "lucide-react"

export function Header() {
  const [isDark, setIsDark] = useState(true)

  return (
    <header className="h-20 w-full flex items-center justify-between px-8 bg-white/5 backdrop-blur-xl border-b border-white/10 z-10 sticky top-0">
      <h1 className="text-2xl font-bold text-white tracking-wide">Dashboard</h1>

      <div className="relative flex items-center gap-6">
        {/* Ambient Background Glow */}
        <div className="absolute right-0 top-0 w-[300px] h-[120px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-400/10 blur-3xl opacity-60 -z-10"></div>

        {/* Email Pill */}
        <div className="relative p-[1px] rounded-full bg-gradient-to-r from-purple-500/40 via-blue-500/40 to-cyan-400/40 hover:scale-[1.02] active:scale-95 transition-all duration-300">
          <div className="relative flex items-center gap-2 cursor-pointer group px-4 py-2 rounded-full bg-[#0b1220]/80 backdrop-blur-xl border border-white/10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30 pointer-events-none"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-400/10 blur-xl opacity-40 -z-10"></div>
            <span className="text-sm font-medium text-white/90 tracking-wide">
              admin@waitless.com
            </span>
            <ChevronDown className="w-4 h-4 text-white/60 group-hover:rotate-180 transition-transform duration-300" />
          </div>
        </div>

        <div className="flex items-center gap-4 border-l border-white/10 pl-6">
          {/* Theme Toggle */}
          <div className="relative p-[1px] rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300">
            <button
              onClick={() => setIsDark(!isDark)}
              className="relative flex items-center gap-3 px-3 py-2 rounded-full bg-[#0b1220]/70 backdrop-blur-xl border border-white/10"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30 pointer-events-none"></div>
              <Sun className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-white/40'}`} />
              <div className={`w-8 h-4 rounded-full bg-white/10 relative transition-colors duration-300 border border-white/10 ${isDark ? 'bg-white/10' : 'bg-gradient-to-r from-purple-500 to-blue-500'}`}>
                <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all duration-300 ${isDark ? 'right-1' : 'left-1'}`}></div>
              </div>
              <Moon className={`w-4 h-4 ${isDark ? 'text-blue-300' : 'text-white/40'}`} />
            </button>
          </div>

          {/* Settings Button */}
          <div className="relative p-[1px] rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300">
            <button className="relative p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl opacity-40 -z-10"></div>
              <Settings className="w-5 h-5 text-white/80" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
