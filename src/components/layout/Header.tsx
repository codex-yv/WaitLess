"use client"

import React, { useState } from "react"
import { Settings, ChevronDown, Sun } from "lucide-react"

export function Header() {
  const [isDark, setIsDark] = useState(true)

  return (
    <header className="h-16 w-full flex items-center justify-between px-6 bg-[#0d1117] border-b border-white/8 z-10 sticky top-0">
      <h1 className="text-xl font-bold text-white tracking-wide">Dashboard</h1>

      <div className="flex items-center gap-3">
        {/* Email Pill */}
        <div className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl bg-[#161b27] border border-white/10 hover:border-white/20 transition-all duration-200">
          <span className="text-sm font-medium text-white/90 tracking-wide">
            admin@waitless.com
          </span>
          <ChevronDown className="w-4 h-4 text-white/50" />
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#161b27] border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
          onClick={() => setIsDark(!isDark)}
        >
          <Sun className="w-4 h-4 text-yellow-400" />
          {/* Toggle Track */}
          <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${isDark ? 'bg-[#2a3347]' : 'bg-gradient-to-r from-purple-500 to-blue-500'} border border-white/10`}>
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${isDark ? 'right-0.5' : 'left-0.5'}`}></div>
          </div>
        </div>

        {/* Settings Button */}
        <button className="p-2.5 rounded-xl bg-[#161b27] border border-white/10 hover:border-white/20 transition-all duration-200">
          <Settings className="w-5 h-5 text-white/70" />
        </button>
      </div>
    </header>
  )
}