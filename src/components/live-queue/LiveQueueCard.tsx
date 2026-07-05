"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface LiveQueueCardProps {
  formId: string
  formName: string
  status?: "Active" | "Inactive" | "Expired"
  createdDate: string
  scanCount: number
  className?: string
}

export function LiveQueueCard({
  formId,
  formName,
  status = "Active",
  createdDate,
  scanCount,
  className
}: LiveQueueCardProps) {
  const router = useRouter()
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

  const handleShowLive = () => {
    router.push(`/dashboard/live-queue/${formId}`)
  }

  return (
    <div className={cn(
      "relative p-4 rounded-2xl border transition-all duration-200",
      isDark
        ? "bg-white/5 border-white/10"
        : "bg-white border-gray-200",
      className
    )}>
      {/* Top Row - Form Name and Status */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={cn(
            "text-base font-semibold mb-2 transition-colors duration-200",
            isDark ? "text-white" : "text-gray-900"
          )}>
            {formName}
          </h3>
          <div className="space-y-1">
            <div className={cn(
              "flex items-center gap-2 text-xs transition-colors duration-200",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              <span>Created:</span>
              <span className={cn(
                "transition-colors duration-200",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>{createdDate}</span>
            </div>
            <div className={cn(
              "flex items-center gap-2 text-xs transition-colors duration-200",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              <span>Scans:</span>
              <span className={cn(
                "transition-colors duration-200",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>{scanCount}</span>
            </div>
          </div>
        </div>
        <span className={cn(
          "px-2 py-0.5 rounded-full text-xs font-medium border",
          status === "Active"
            ? "bg-green-500/20 text-green-400 border-green-500/30"
            : status === "Expired"
              ? "bg-red-500/20 text-red-400 border-red-500/30"
              : "bg-gray-500/20 text-gray-400 border-gray-500/30"
        )}>
          {status}
        </span>
      </div>

      {/* Show Live Button */}
      <button
        onClick={handleShowLive}
        className={cn(
          "w-full px-4 py-1.5 rounded-xl font-medium transition-all duration-200 text-center text-sm",
          isDark
            ? "border border-white/20 text-white hover:bg-white/10 hover:border-white/30"
            : "border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
        )}
      >
        Show Live
      </button>
    </div>
  )
}
