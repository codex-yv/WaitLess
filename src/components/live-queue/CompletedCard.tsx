"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"

interface CompletedCardProps {
  name: string
  initials: string
  token: string
  time: string
  status?: "Completed" | "Cancelled" | "Skipped"
  onClick?: () => void
  className?: string
}

export const CompletedCard = React.memo(function CompletedCard({
  name,
  initials,
  token,
  time,
  status = "Completed",
  onClick,
  className
}: CompletedCardProps) {
  const { isDark, mounted } = useTheme()

  if (!mounted) return null

  const getStatusBadge = () => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400"
      case "Cancelled":
        return "bg-red-500/20 text-red-400"
      case "Skipped":
        return "bg-orange-500/20 text-orange-400"
      default:
        return "bg-green-500/20 text-green-400"
    }
  }

  return (
    <div 
      onClick={onClick}
      className={cn(
        "backdrop-blur-xl border rounded-xl p-4 flex items-center justify-between transition-all duration-200 cursor-pointer",
        isDark
          ? "bg-white/5 border-white/10 hover:border-white/20"
          : "bg-white border-gray-200 hover:border-gray-300",
        className
      )}
    >
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
          {initials}
        </div>
        
        {/* User Info */}
        <div className="flex flex-col">
          <span className={cn(
            "font-medium transition-colors duration-200",
            isDark ? "text-white" : "text-gray-900"
          )}>{name}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-md text-xs">
              {token}
            </span>
            <span className={cn(
              "text-sm transition-colors duration-200",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>{time}</span>
          </div>
        </div>
      </div>

      {/* Right Side - Status Badge */}
      <span className={cn(
        "px-3 py-1 rounded-full text-sm font-medium",
        getStatusBadge()
      )}>
        {status}
      </span>
    </div>
  )
})
