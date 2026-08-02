"use client"

import React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"

interface ActionButtonsProps {
  onCallNext?: () => void
  onSkip?: () => void
  isCallingNext?: boolean
  isSkipping?: boolean
  className?: string
}

export const ActionButtons = React.memo(function ActionButtons({
  onCallNext,
  onSkip,
  isCallingNext = false,
  isSkipping = false,
  className
}: ActionButtonsProps) {
  const { isDark, mounted } = useTheme()

  if (!mounted) return null

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        onClick={onCallNext}
        disabled={isCallingNext || isSkipping}
        className={cn(
          "px-5 py-2 rounded-xl font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          isDark
            ? "bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-105"
            : "bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.25)] hover:scale-105"
        )}
      >
        {isCallingNext && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>Call Next</span>
      </button>
      <button
        onClick={onSkip}
        disabled={isCallingNext || isSkipping}
        className={cn(
          "px-5 py-2 rounded-xl font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          isDark
            ? "bg-gradient-to-r from-orange-500 to-amber-400 shadow-[0_0_20px_rgba(251,146,60,0.4)] hover:scale-105"
            : "bg-gradient-to-r from-orange-500 to-amber-400 shadow-[0_0_12px_rgba(251,146,60,0.25)] hover:scale-105"
        )}
      >
        {isSkipping && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>Skip</span>
      </button>
    </div>
  )
})
