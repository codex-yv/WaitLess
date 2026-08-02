"use client"

import React from "react"
import { X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"

interface QueueCardProps {
  name: string
  initials: string
  token: string
  time: string
  isServing?: boolean
  isCancelling?: boolean
  onCancel?: () => void
  onClick?: () => void
  className?: string
}

export const QueueCard = React.memo(function QueueCard({
  name,
  initials,
  token,
  time,
  isServing = false,
  isCancelling = false,
  onCancel,
  onClick,
  className
}: QueueCardProps) {
  const { isDark, mounted } = useTheme()

  if (!mounted) return null

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

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {isServing && (
          <span className="text-green-400 text-sm font-medium">Serving</span>
        )}
        {onCancel && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (!isCancelling) onCancel()
            }}
            disabled={isCancelling}
            className={cn(
              "rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50",
              isDark
                ? "bg-red-500/10 text-red-400 border border-red-400/20 hover:bg-red-500/20"
                : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
            )}
          >
            {isCancelling ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  )
})
