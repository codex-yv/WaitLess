"use client"

import React, { useState, useEffect } from "react"
import { Users } from "lucide-react"
import { LiveQueueCard } from "@/components/live-queue/LiveQueueCard"
import { cn } from "@/lib/utils"
import { getForms } from "@/api/api-functions/adminForms"

interface Form {
  id: string
  name: string
  status: "Active" | "Inactive" | "Expired"
  createdDate: string
  scanCount: number
}

export default function LiveQueuePage() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [forms, setForms] = useState<Form[]>([])
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

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

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await getForms()
        if (response.status) {
          if (response.data === null || response.data === undefined) {
            setForms([])
          } else {
            const mappedForms: Form[] = response.data.map((item: any) => ({
              id: item._id || item.id || item.form_id,
              name: item.title,
              status: item.expired ? "Expired" : (item.started ? "Active" : "Inactive"),
              createdDate: item.date,
              scanCount: item.total_scans
            }))
            setForms(mappedForms)
          }
        } else {
          setMessage({ text: response.message || "Failed to retrieve live queue forms.", type: "error" })
        }
      } catch (error: any) {
        console.error("Error fetching live queue forms:", error)
        setMessage({ text: "An error occurred while fetching forms.", type: "error" })
      }
    }

    if (mounted) {
      fetchForms()
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-extrabold mb-1.5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-blue-300">
          Live Queue
        </h1>
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full border transition-colors duration-300",
          isDark
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200"
        )}>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className={cn(
            "text-sm font-medium transition-colors duration-300",
            isDark ? "text-gray-300" : "text-gray-700"
          )}>yourajverma960@gmail.com</span>
        </div>
      </div>

      {/* Error/Success Message */}
      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium backdrop-blur-sm border mb-4 ${
          message.type === "success"
            ? "bg-green-500/10 border-green-500/20 text-green-400"
            : "bg-red-500/10 border-red-500/20 text-red-400"
        }`}>
          {message.text}
        </div>
      )}

      {/* Main Section */}
      <div className="space-y-4">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className={cn(
            "text-l font-bold transition-colors duration-300", 
            isDark ? "text-white" : "text-gray-900"
          )}>ALL FORMS</h2>
          <span className={cn("px-2 py-0.5 rounded-full",
            isDark 
              ? "bg-purple-500/20 border border-purple-500/30" 
              : "bg-purple-500/35 border border-purple-500/45")}>
            <span className={cn("text-sm font-medium transition-colors duration-300",
              isDark ? "text-purple-300" : "text-purple-700")}>{forms.length}</span>
          </span>
        </div>

        {/* Forms List */}
        <div className="w-full">
          {forms.map((form) => (
            <LiveQueueCard
              key={form.id}
              formId={form.id}
              formName={form.name}
              status={form.status}
              createdDate={form.createdDate}
              scanCount={form.scanCount}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
