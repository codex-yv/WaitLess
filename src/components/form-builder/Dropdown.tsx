"use client"

import React, { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  label?: string
  options: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export function Dropdown({ 
  label, 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option",
  className 
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
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

  const selectedOption = options.find(opt => opt.value === value)

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
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none text-left flex items-center justify-between",
            isDark
              ? "bg-white/5 border-white/10 focus:border-purple-400/40 focus:ring-1 focus:ring-purple-500/50 text-white placeholder-gray-500"
              : "bg-white border-gray-200 focus:border-purple-400/60 focus:ring-1 focus:ring-purple-500/30 text-gray-900 placeholder-gray-400",
            className
          )}
        >
          <span className={cn(
            isDark ? (selectedOption ? "text-white" : "text-gray-500") : (selectedOption ? "text-gray-900" : "text-gray-400")
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform duration-200",
            isDark ? "text-gray-400" : "text-gray-500",
            isOpen && "rotate-180"
          )} />
        </button>

        {isOpen && (
          <div className={cn(
            "absolute z-50 w-full mt-2 rounded-xl border transition-all duration-200 backdrop-blur-xl shadow-xl max-h-60 overflow-y-auto",
            isDark
              ? "bg-[#0f172a]/95 border-white/10"
              : "bg-white border-gray-200"
          )}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange?.(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full px-4 py-3 text-left transition-colors duration-150 focus:outline-none",
                  isDark
                    ? "hover:bg-white/10 focus:bg-white/10"
                    : "hover:bg-gray-50 focus:bg-gray-50",
                  option.value === value && (isDark ? "bg-purple-500/20 text-purple-300" : "bg-purple-50 text-purple-600"),
                  option.value !== value && (isDark ? "text-gray-300" : "text-gray-700")
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
