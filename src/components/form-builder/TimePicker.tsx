"use client"

import React, { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimePickerProps {
  label?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export function TimePicker({ 
  label, 
  value, 
  onChange, 
  className 
}: TimePickerProps) {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hasDarkClass = document.documentElement.classList.contains("dark")
    setIsDark(hasDarkClass)

    const observer = new MutationObserver(() => {
      const hasDarkClass = document.documentElement.classList.contains("dark")
      setIsDark(hasDarkClass)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    })

    return () => observer.disconnect()
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-2">
      {label && (
        <label className={cn(
          "block text-sm font-medium transition-colors duration-300",
          isDark ? "text-gray-300" : "text-gray-700"
        )}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="time"
          value={value}
          onChange={onChange}
          className={cn(
            "w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none",
            isDark
              ? "bg-white/5 border-white/10 focus:border-purple-400/40 focus:ring-1 focus:ring-purple-500/50 text-white placeholder-gray-500"
              : "bg-white border-gray-200 focus:border-purple-400/60 focus:ring-1 focus:ring-purple-500/30 text-gray-900 placeholder-gray-400",
            className
          )}
        />
        <Clock className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-300",
          isDark ? "text-gray-400" : "text-gray-500"
        )} />
      </div>
    </div>
  )
}
