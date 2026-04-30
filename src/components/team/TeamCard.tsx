"use client"

import React from "react"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface TeamCardProps {
  name: string
  email: string
  role: string
  initials: string
  onRemove?: () => void
  isDark?: boolean
}

export function TeamCard({ name, email, role, initials, onRemove, isDark = true }: TeamCardProps) {
  return (
    <div className={cn(
      "relative group p-4 rounded-xl border transition-all duration-200 backdrop-blur-none backdrop-saturate-180",
      isDark 
        ? "bg-white/5 border-white/10 hover:bg-white/10" 
        : "bg-white/10 border-white/20 ring-1 ring-white/30 hover:bg-white/15"
    )}>
      {/* Subtle gradient tint */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.06),rgba(34,211,238,0.05))] rounded-xl opacity-100 pointer-events-none" />
      {/* Micro-contrast layer */}
      <div className="absolute inset-0 bg-white/5 rounded-xl pointer-events-none" />
      {/* Inner highlight */}
      <div className="absolute inset-0 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] pointer-events-none" />
      
      <div className="relative z-10 flex items-center gap-4">
        {/* Avatar with gradient */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 flex items-center justify-center shrink-0 shadow-lg">
          <span className="font-bold text-sm text-white">{initials}</span>
        </div>
        
        {/* Member Info */}
        <div className="flex-1 min-w-0">
          <p className={cn("font-semibold truncate", isDark ? "text-white" : "text-gray-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]")}>
            {name}
          </p>
          <p className={cn("text-sm truncate", isDark ? "text-gray-400" : "text-gray-700 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]")}>
            {email}
          </p>
          <span className={cn("inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm", isDark ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : "bg-purple-500/15 text-purple-700 border-purple-500/40 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]")}>
            {role}
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className={cn("p-2 rounded-lg transition-all duration-200 border backdrop-blur-sm", isDark ? "bg-red-500/10 hover:bg-red-500/20 border-red-500/20 hover:border-red-500/30 text-red-400 hover:text-red-300" : "bg-red-500/10 hover:bg-red-500/20 border-red-500/30 hover:border-red-500/40 text-red-600 hover:text-red-700")}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
