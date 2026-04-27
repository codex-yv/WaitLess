"use client"

import React from "react"
import { Moon, Settings, ChevronDown } from "lucide-react"

export function Header() {
  return (
    <header className="h-20 w-full flex items-center justify-between px-8 bg-white/5 backdrop-blur-xl border-b border-white/10 z-10 sticky top-0">
      <h1 className="text-2xl font-bold text-white tracking-wide">Dashboard</h1>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 cursor-pointer group">
          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
            admin@waitless.com
          </span>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
        </div>

        <div className="flex items-center gap-4 border-l border-white/10 pl-6">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            <Moon className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
