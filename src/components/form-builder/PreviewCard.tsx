"use client"

import React, { useState, useEffect } from "react"
import { Eye, Trash2 } from "lucide-react"
import { GlassCard } from "./GlassCard"
import { cn } from "@/lib/utils"
import { FRONTEND_URL } from "@/config/backend"

interface FormField {
  label: string
  placeholder: string
  type?: string
  options?: string
}

interface PreviewCardProps {
  formTitle: string
  formSubtitle?: string
  fields: FormField[]
  fieldCount: number
  className?: string
  onDeleteField?: (index: number) => void
  onPublish?: () => void
  isPublishing?: boolean
  qrCodeUrl?: string | null
  formId?: string | null
}

export function PreviewCard({ 
  formTitle, 
  formSubtitle = "Collect patient details before joining the queue.",
  fields,
  fieldCount,
  className,
  onDeleteField,
  onPublish,
  isPublishing = false,
  qrCodeUrl = null,
  formId = null
}: PreviewCardProps) {
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
    <GlassCard className={cn("p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-400" />
          <h3 className={cn(
            "text-lg font-semibold transition-colors duration-300",
            isDark ? "text-white" : "text-gray-900"
          )}>Form Preview</h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
          <span className={cn(
            "text-sm font-medium",
            isDark
            ? "text-purple-300"
            : "text-purple-700"
          )}>{fieldCount} fields</span>
        </div>
      </div>

      {/* Preview Content */}
      <div className="space-y-5">
        {/* Form Title */}
        <div>
          <h2 className={cn(
            "text-2xl font-bold mb-2 transition-colors duration-300",
            isDark ? "text-white" : "text-gray-900"
          )}>{formTitle || "Form Title"}</h2>
          <p className={cn(
            "text-sm transition-colors duration-300",
            isDark ? "text-gray-400" : "text-gray-600"
          )}>{formSubtitle}</p>
        </div>

        {/* Divider */}
        <div className={cn(
          "h-px transition-colors duration-300",
          isDark ? "bg-gradient-to-r from-white/10 via-white/20 to-white/10" : "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
        )} />

        {/* Example Fields */}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={index} className="space-y-1 relative group">
              <div className="flex items-center justify-between">
                <label className={cn(
                  "block text-sm font-medium transition-colors duration-300",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  {field.label}
                </label>
                {onDeleteField && field.label.toLowerCase() !== "full name" && (
                  <button
                    onClick={() => onDeleteField(index)}
                    className="p-1.5 rounded-lg transition-all duration-200 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Render based on field type */}
              {field.type === "checkbox" && field.options ? (
                <div className="space-y-2">
                  {field.options.split(",").map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        disabled
                        className={cn(
                          "w-4 h-4 rounded border transition-all duration-200 outline-none cursor-not-allowed",
                          isDark
                            ? "bg-white/5 border-white/10"
                            : "bg-white border-gray-300"
                        )}
                      />
                      <span className={cn(
                        "text-sm transition-colors duration-300",
                        isDark ? "text-gray-300" : "text-gray-700"
                      )}>{option.trim()}</span>
                    </div>
                  ))}
                </div>
              ) : field.type === "dropdown" && field.options ? (
                <select
                  disabled
                  className={cn(
                    "w-full px-4 py-2 rounded-xl border transition-all duration-200 outline-none cursor-not-allowed",
                    isDark
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  )}
                >
                  <option value="" className={isDark ? "bg-[#0f172a] text-gray-500" : "bg-white text-gray-400"}>{field.placeholder}</option>
                  {field.options.split(",").map((option, optIndex) => (
                    <option key={optIndex} value={option.trim()} className={isDark ? "bg-[#0f172a] text-gray-300" : "bg-white text-gray-700"}>
                      {option.trim()}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  disabled
                  className={cn(
                    "w-full px-4 py-2 rounded-xl border transition-all duration-200 outline-none cursor-not-allowed",
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={onPublish}
          disabled={isPublishing}
          className={cn(
            "w-full px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all duration-200 shadow-[0_4px_15px_rgba(99,102,241,0.4)]",
            isPublishing && "opacity-50 cursor-not-allowed"
          )}
        >
          {isPublishing ? "Generating QR & Publishing..." : "Generate QR & Publish"}
        </button>

        {/* QR Code display */}
        {qrCodeUrl && formId && (
          <div className={cn(
            "flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10 mt-6",
            !isDark && "bg-black/5 border-black/10"
          )}>
            <p className={cn("text-sm font-semibold mb-3", isDark ? "text-white" : "text-gray-900")}>Form Published!</p>
            <img src={qrCodeUrl} alt="Form QR Code" className="w-48 h-48 rounded-xl border-4 border-white shadow-xl" />
            <a 
              href={`${FRONTEND_URL}/${formId}`} 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs text-purple-400 hover:text-purple-300 mt-3 underline break-all text-center"
            >
              {FRONTEND_URL}/{formId}
            </a>
          </div>
        )}
      </div>
    </GlassCard>
  )
}
