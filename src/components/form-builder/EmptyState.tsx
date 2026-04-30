"use client"

import React, { useState, useEffect } from "react"
import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  className?: string
}

export function EmptyState({ className }: EmptyStateProps) {
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
      "flex flex-col items-center justify-center h-full p-12",
      className
    )}>
      {/* Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full" />
        <div className={cn(
          "relative p-6 rounded-2xl border transition-colors duration-300",
          isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
        )}>
          <FileText className="w-12 h-12 text-purple-400" />
        </div>
      </div>

      {/* Heading */}
      <h2 className={cn(
        "text-2xl font-bold mb-3 transition-colors duration-300",
        isDark ? "text-white" : "text-gray-900"
      )}>
        Select a form
      </h2>

      {/* Subtext */}
      <p className={cn(
        "text-center max-w-md transition-colors duration-300",
        isDark ? "text-gray-400" : "text-gray-600"
      )}>
        Click on a form from the list to preview it
      </p>
    </div>
  )
}
