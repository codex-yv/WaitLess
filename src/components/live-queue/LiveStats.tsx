"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"

interface LiveStatsProps {
  waiting: number
  served: number
  completionRate: number
  className?: string
}

export const LiveStats = React.memo(function LiveStats({ waiting, served, completionRate, className }: LiveStatsProps) {
  const { isDark, mounted } = useTheme()

  if (!mounted) return null

  return (
    <div className={cn(
      "backdrop-blur-xl border rounded-2xl p-5 transition-colors duration-200",
      isDark
        ? "bg-white/5 border-white/10"
        : "bg-white border-gray-200",
      className
    )}>
      {/* Title */}
      <h3 className={cn(
        "text-sm tracking-wide mb-4 transition-colors duration-200",
        isDark ? "text-gray-400" : "text-gray-600"
      )}>LIVE STATS</h3>
      
      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Waiting */}
        <div className={cn(
          "rounded-xl p-4 text-center transition-colors duration-200",
          isDark ? "bg-white/5" : "bg-gray-50"
        )}>
          <div className={cn(
            "text-3xl font-bold transition-colors duration-200",
            isDark ? "text-white" : "text-gray-900"
          )}>{waiting}</div>
          <div className={cn(
            "text-sm mt-1 transition-colors duration-200",
            isDark ? "text-gray-400" : "text-gray-600"
          )}>Waiting</div>
        </div>
        
        {/* Served */}
        <div className={cn(
          "rounded-xl p-4 text-center transition-colors duration-200",
          isDark ? "bg-white/5" : "bg-gray-50"
        )}>
          <div className={cn(
            "text-3xl font-bold transition-colors duration-200",
            isDark ? "text-white" : "text-gray-900"
          )}>{served}</div>
          <div className={cn(
            "text-sm mt-1 transition-colors duration-200",
            isDark ? "text-gray-400" : "text-gray-600"
          )}>Served</div>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="flex items-center justify-between mb-2">
        <span className={cn(
          "text-sm transition-colors duration-200",
          isDark ? "text-gray-400" : "text-gray-600"
        )}>Completion Rate</span>
        <span className={cn(
          "font-medium transition-colors duration-200",
          isDark ? "text-white" : "text-gray-900"
        )}>{completionRate}%</span>
      </div>
      
      {/* Progress Bar */}
      <div className={cn(
        "h-2 rounded-full overflow-hidden transition-colors duration-200",
        isDark ? "bg-white/10" : "bg-gray-200"
      )}>
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
          style={{ width: `${completionRate}%` }}
        />
      </div>
    </div>
  )
})
