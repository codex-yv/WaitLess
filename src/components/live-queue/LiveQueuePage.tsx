"use client"

import React, { useState, useEffect } from "react"
import { ActionButtons } from "./ActionButtons"
import { QueueCard } from "./QueueCard"
import { CompletedCard } from "./CompletedCard"
import { LiveStats } from "./LiveStats"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"
import { getLiveTracking } from "@/api/api-functions/adminTracking"
import { useParams } from "next/navigation"

interface QueueItem {
  id: string
  name: string
  initials: string
  token: string
  time: string
  status?: "Completed" | "Cancelled" | "Skipped"
  params_val?: any[]
}

export function LiveQueuePage() {
  const { isDark, mounted } = useTheme()
  const params = useParams()
  const formId = params?.formId as string

  const [queueItems, setQueueItems] = useState<QueueItem[]>([])
  const [completedItems, setCompletedItems] = useState<QueueItem[]>([])
  const [skippedItems, setSkippedItems] = useState<QueueItem[]>([])
  const [selectedPerson, setSelectedPerson] = useState<QueueItem | null>(null)

  const [waiting, setWaiting] = useState(0)
  const [served, setServed] = useState(0)
  const [completionRate, setCompletionRate] = useState(0)

  useEffect(() => {
    const fetchLiveQueue = async () => {
      if (!formId) return
      try {
        const response = await getLiveTracking(formId)
        if (response.status && response.data) {
          const allSubmissions = response.data.map((item: any) => {
            const name = item.params_val?.[0]?.["Full Name"] || "Anonymous"
            const initials = name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
            
            let status: "Completed" | "Cancelled" | "Skipped" | undefined = undefined
            if (item.checked) status = "Completed"
            else if (item.cancelled) status = "Cancelled"
            else if (item.skipped) status = "Skipped"

            return {
              id: item._id,
              name,
              initials,
              token: item.client_id,
              time: item.submitted_at,
              status,
              checked: item.checked,
              skipped: item.skipped,
              cancelled: item.cancelled,
              missed: item.missed,
              params_val: item.params_val
            }
          })

          const inQueue = allSubmissions.filter(
            (item: any) => !item.checked && !item.skipped && !item.cancelled && !item.missed
          )
          const completed = allSubmissions.filter(
            (item: any) => item.checked || item.cancelled || item.missed
          )
          const skipped = allSubmissions.filter(
            (item: any) => item.skipped && !item.checked && !item.cancelled && !item.missed
          )

          setQueueItems(inQueue)
          setCompletedItems(completed)
          setSkippedItems(skipped)

          const total = allSubmissions.length
          const completedCount = completed.filter((item: any) => item.checked).length
          setWaiting(inQueue.length)
          setServed(completedCount)
          setCompletionRate(total > 0 ? Math.round((completedCount / total) * 100) : 0)
        }
      } catch (error) {
        console.error("Error loading live tracking:", error)
      }
    }

    if (mounted && formId) {
      fetchLiveQueue()
    }
  }, [mounted, formId])

  const handleCallNext = () => {
    if (queueItems.length > 0) {
      const firstItem = queueItems[0]
      setCompletedItems([...completedItems, { ...firstItem, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: "Completed" }])
      setQueueItems(queueItems.slice(1))
      setWaiting(prev => Math.max(0, prev - 1))
      setServed(prev => prev + 1)
      const total = queueItems.length + completedItems.length + skippedItems.length
      setCompletionRate(total > 0 ? Math.round(((served + 1) / total) * 100) : 0)
    }
  }

  const handleSkip = () => {
    if (queueItems.length > 0) {
      const firstItem = queueItems[0]
      setSkippedItems([...skippedItems, { ...firstItem, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: "Skipped" }])
      setQueueItems(queueItems.slice(1))
      setWaiting(prev => Math.max(0, prev - 1))
    }
  }

  const handleCancel = (id: string) => {
    const itemToCancel = queueItems.find(item => item.id === id)
    if (itemToCancel) {
      setCompletedItems([...completedItems, { ...itemToCancel, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: "Cancelled" }])
      setQueueItems(queueItems.filter(item => item.id !== id))
      setWaiting(prev => Math.max(0, prev - 1))
    }
  }

  if (!mounted) return null

  return (
    <div className="w-full space-y-6">
      {/* Top Section - Action Buttons */}
      <div className="flex items-center justify-between">
        <h1 className={cn(
          "text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-blue-300"
        )}>
          Live Queue
        </h1>
        <ActionButtons onCallNext={handleCallNext} onSkip={handleSkip} />
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side - Queue Lists (70%) */}
        <div className="lg:col-span-8 space-y-6">
          {/* IN QUEUE Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={cn(
                "tracking-wide text-sm font-medium transition-colors duration-200",
                isDark ? "text-gray-400" : "text-gray-600"
              )}>IN QUEUE</h2>
              <span className={cn(
                "rounded-full px-2 py-0.5 text-xs transition-colors duration-200",
                isDark
                  ? "bg-white/10 border border-white/10 text-gray-300"
                  : "bg-gray-100 border border-gray-200 text-gray-600"
              )}>
                {queueItems.length}
              </span>
            </div>
            <div className="space-y-3">
              {queueItems.map((item, index) => (
                <QueueCard
                  key={item.id}
                  name={item.name}
                  initials={item.initials}
                  token={item.token}
                  time={item.time}
                  isServing={index === 0}
                  onCancel={() => handleCancel(item.id)}
                  onClick={() => setSelectedPerson(item)}
                />
              ))}
            </div>
          </div>

          {/* COMPLETED Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={cn(
                "tracking-wide text-sm font-medium transition-colors duration-200",
                isDark ? "text-gray-400" : "text-gray-600"
              )}>COMPLETED</h2>
              <span className={cn(
                "rounded-full px-2 py-0.5 text-xs transition-colors duration-200",
                isDark
                  ? "bg-white/10 border border-white/10 text-gray-300"
                  : "bg-gray-100 border border-gray-200 text-gray-600"
              )}>
                {completedItems.length}
              </span>
            </div>
            <div className="space-y-3">
              {completedItems.map((item) => (
                <CompletedCard
                  key={item.id}
                  name={item.name}
                  initials={item.initials}
                  token={item.token}
                  time={item.time}
                  status={item.status}
                  onClick={() => setSelectedPerson(item)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Live Stats (30%) */}
        <div className="lg:col-span-4 space-y-6">
          <LiveStats
            waiting={waiting}
            served={served}
            completionRate={completionRate}
          />

          {/* Skipped Section */}
          {skippedItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className={cn(
                  "tracking-wide text-sm font-medium transition-colors duration-200",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>SKIPPED</h2>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-xs transition-colors duration-200",
                  isDark
                    ? "bg-white/10 border border-white/10 text-gray-300"
                    : "bg-gray-100 border border-gray-200 text-gray-600"
                )}>
                  {skippedItems.length}
                </span>
              </div>
              <div className="space-y-3">
                {skippedItems.map((item) => (
                  <CompletedCard
                    key={item.id}
                    name={item.name}
                    initials={item.initials}
                    token={item.token}
                    time={item.time}
                    status={item.status}
                    onClick={() => setSelectedPerson(item)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Person Details Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={cn(
            "relative w-full max-w-md p-6 rounded-2xl border transition-all duration-300 shadow-2xl animate-in fade-in zoom-in-95 duration-200",
            isDark 
              ? "bg-[#0b0f19] border-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
              : "bg-white border-gray-200 text-gray-900 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
          )}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedPerson(null)}
              className={cn(
                "absolute top-4 right-4 p-1.5 rounded-lg border transition-all duration-200 cursor-pointer",
                isDark 
                  ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-gray-400 hover:text-white" 
                  : "bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-900"
              )}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="mt-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                  {selectedPerson.initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedPerson.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-md text-xs font-semibold">
                      {selectedPerson.token}
                    </span>
                    <span className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-500")}>
                      {selectedPerson.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                <h4 className={cn("text-xs font-bold uppercase tracking-wider", isDark ? "text-gray-500" : "text-gray-400")}>Submission Details</h4>
                <div className="divide-y divide-white/5">
                  {selectedPerson.params_val && selectedPerson.params_val.length > 0 ? (
                    selectedPerson.params_val.map((dict, index) => (
                      <div key={index} className="py-2.5">
                        {Object.entries(dict).map(([key, val]) => (
                          <div key={key} className="flex justify-between items-start gap-4">
                            <span className={cn(isDark ? "text-gray-400" : "text-gray-600", "text-sm font-medium")}>{key}:</span>
                            <span className={cn(isDark ? "text-white" : "text-gray-900", "text-sm font-semibold text-right break-all")}>
                              {Array.isArray(val) ? val.join(", ") : String(val)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p className={cn("text-sm py-2", isDark ? "text-gray-400" : "text-gray-500")}>No parameters submitted.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
