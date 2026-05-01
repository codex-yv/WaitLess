"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"

interface ActionButtonsProps {
  onCallNext?: () => void
  onSkip?: () => void
  className?: string
}

export const ActionButtons = React.memo(function ActionButtons({ onCallNext, onSkip, className }: ActionButtonsProps) {
  const { isDark, mounted } = useTheme()

  if (!mounted) return null

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        onClick={onCallNext}
        className={cn(
          "px-5 py-2 rounded-xl font-medium text-white hover:scale-105 transition-all duration-200",
          isDark
            ? "bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            : "bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.25)]"
        )}
      >
        Call Next
      </button>
      <button
        onClick={onSkip}
        className={cn(
          "px-5 py-2 rounded-xl font-medium text-white hover:scale-105 transition-all duration-200",
          isDark
            ? "bg-gradient-to-r from-orange-500 to-amber-400 shadow-[0_0_20px_rgba(251,146,60,0.4)]"
            : "bg-gradient-to-r from-orange-500 to-amber-400 shadow-[0_0_12px_rgba(251,146,60,0.25)]"
        )}
      >
        Skip
      </button>
    </div>
  )
})
