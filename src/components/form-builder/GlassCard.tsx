"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
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
    <div className={cn(
      "relative backdrop-blur-xl rounded-2xl transition-colors duration-300",
      isDark
        ? "bg-white/5 border-white/10"
        : "bg-white/70 border-gray-200 border-2",
      className
    )}>
      {/* Subtle gradient tint */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-100 pointer-events-none transition-colors duration-300",
        isDark
          ? "bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.06),rgba(34,211,238,0.05))]"
          : "bg-[linear-gradient(135deg,rgba(255,255,255,0.6),rgba(99,102,241,0.05))]"
      )} />
      {/* Inner highlight */}
      <div className={cn(
        "absolute inset-0 rounded-2xl pointer-events-none transition-colors duration-300",
        isDark
          ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
          : "shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
      )} />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
