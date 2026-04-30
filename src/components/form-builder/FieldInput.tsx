"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface FieldInputProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  className?: string
  required?: boolean
}

export function FieldInput({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  type = "text",
  className,
  required = false
}: FieldInputProps) {
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
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none",
          isDark
            ? "bg-white/5 border-white/10 focus:border-purple-400/40 focus:ring-1 focus:ring-purple-500/50 text-white placeholder-gray-500"
            : "bg-white border-gray-200 focus:border-purple-400/60 focus:ring-1 focus:ring-purple-500/30 text-gray-900 placeholder-gray-400",
          className
        )}
        required={required}
      />
    </div>
  )
}
