"use client"

import React, { useState, useEffect } from "react"
import { Eye, QrCode, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormCardProps {
  formId?: string
  formName: string
  status?: "Active" | "Inactive" | "Expired"
  createdDate: string
  scanCount: number
  onPreview?: () => void
  onQR?: () => void
  onDelete?: () => void
  onClick?: () => void
  className?: string
}

export function FormCard({
  formId,
  formName,
  status = "Active",
  createdDate,
  scanCount,
  onPreview,
  onQR,
  onDelete,
  onClick,
  className
}: FormCardProps) {
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
    <div
      onClick={onClick}
      className={cn(
        "relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer group",
        isDark
          ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {/* Top Row - Form Name and Status */}
      <div className="flex items-start justify-between mb-4">
        <h3 className={cn(
          "text-lg font-semibold transition-colors duration-200",
          isDark ? "text-white group-hover:text-purple-300" : "text-gray-900 group-hover:text-purple-600"
        )}>
          {formName}
        </h3>
        <span className={cn(
          "px-2.5 py-1 rounded-full text-xs font-medium border",
          status === "Active"
            ? "bg-green-500/20 text-green-400 border-green-500/30"
            : status === "Expired"
              ? "bg-red-500/20 text-red-400 border-red-500/30"
              : "bg-gray-500/20 text-gray-400 border-gray-500/30"
        )}>
          {status}
        </span>
      </div>

      {/* Metadata */}
      <div className="space-y-2 mb-4">
        <div className={cn(
          "flex items-center gap-2 text-sm transition-colors duration-200",
          isDark ? "text-gray-400" : "text-gray-600"
        )}>
          <span>Created:</span>
          <span className={cn(
            "transition-colors duration-200",
            isDark ? "text-gray-300" : "text-gray-700"
          )}>{createdDate}</span>
        </div>
        <div className={cn(
          "flex items-center gap-2 text-sm transition-colors duration-200",
          isDark ? "text-gray-400" : "text-gray-600"
        )}>
          <span>Scans:</span>
          <span className={cn(
            "transition-colors duration-200",
            isDark ? "text-gray-300" : "text-gray-700"
          )}>{scanCount}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPreview?.()
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
              isDark
                ? "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
            )}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onQR?.()
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
              isDark
                ? "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
            )}
          >
            <QrCode className="w-4 h-4" />
            QR
          </button>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete?.()
          }}
          title="Delete Form"
          className={cn(
            "p-2 rounded-xl transition-all duration-200 cursor-pointer",
            isDark
              ? "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 hover:scale-105"
              : "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 hover:scale-105"
          )}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
