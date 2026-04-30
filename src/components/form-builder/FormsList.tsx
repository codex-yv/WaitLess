"use client"

import React, { useState, useEffect } from "react"
import { FormCard } from "./FormCard"
import { cn } from "@/lib/utils"

interface Form {
  id: string
  name: string
  status: "Active" | "Inactive"
  createdDate: string
  scanCount: number
}

interface FormsListProps {
  forms: Form[]
  onFormClick?: (form: Form) => void
  onPreview?: (form: Form) => void
  onQR?: (form: Form) => void
  className?: string
}

export function FormsList({
  forms,
  onFormClick,
  onPreview,
  onQR,
  className
}: FormsListProps) {
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
    <div className={cn("space-y-4", className)}>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className={cn(
          "text-xl font-bold transition-colors duration-300",
          isDark ? "text-white" : "text-gray-900"
        )}>ALL FORMS</h2>
        <span className="px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
          <span className={cn(
            "text-sm font-medium",
            isDark ? "text-purple-300" : "text-purple-700"
          )}>{forms.length}</span>
        </span>
      </div>

      {/* Forms List */}
      {forms.length === 0 ? (
        <div className={cn(
          "p-8 rounded-2xl border text-center transition-colors duration-300",
          isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
        )}>
          <p className={cn(
            "transition-colors duration-300",
            isDark ? "text-gray-400" : "text-gray-600"
          )}>No forms created yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {forms.map((form) => (
            <FormCard
              key={form.id}
              formName={form.name}
              status={form.status}
              createdDate={form.createdDate}
              scanCount={form.scanCount}
              onClick={() => onFormClick?.(form)}
              onPreview={() => onPreview?.(form)}
              onQR={() => onQR?.(form)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
