"use client"

import React, { useState, useEffect, useCallback } from "react"
import { ActionButtons } from "./ActionButtons"
import { QueueCard } from "./QueueCard"
import { CompletedCard } from "./CompletedCard"
import { LiveStats } from "./LiveStats"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"
import { getLiveTracking, nextCustomer, skipCustomer, cancelCustomer } from "@/api/api-functions/adminTracking"
import { useParams } from "next/navigation"
import wsManager from "@/api/websocket"

interface QueueItem {
  id: string
  name: string
  initials: string
  token: string
  time: string
  status?: "Completed" | "Cancelled" | "Skipped"
  serving?: boolean
  checked?: boolean
  skipped?: boolean
  cancelled?: boolean
  missed?: boolean
  params_val?: any[]
}

interface LiveQueuePageProps {
  formId?: string
}

export function LiveQueuePage({ formId: propFormId }: LiveQueuePageProps = {}) {
  const { isDark, mounted } = useTheme()
  const params = useParams()
  const formId = propFormId || (params?.formId as string)

  const [servingItems, setServingItems] = useState<QueueItem[]>([])
  const [queueItems, setQueueItems] = useState<QueueItem[]>([])
  const [completedItems, setCompletedItems] = useState<QueueItem[]>([])
  const [skippedItems, setSkippedItems] = useState<QueueItem[]>([])
  const [selectedPerson, setSelectedPerson] = useState<QueueItem | null>(null)

  const [waiting, setWaiting] = useState(0)
  const [served, setServed] = useState(0)
  const [completionRate, setCompletionRate] = useState(0)

  const [isCallingNext, setIsCallingNext] = useState(false)
  const [isSkipping, setIsSkipping] = useState(false)
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  // Reusable function to parse raw submissions array into categorized queue items
  const processSubmissions = useCallback((rawData: any[]) => {
    const allSubmissions = rawData.map((item: any) => {
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
        serving: Boolean(item.serving),
        params_val: item.params_val
      }
    })

    const serving = allSubmissions.filter(
      (item: any) => item.serving && !item.skipped && !item.cancelled && !item.missed
    )
    const inQueue = allSubmissions.filter(
      (item: any) => !item.serving && !item.checked && !item.skipped && !item.cancelled && !item.missed
    )
    const completed = allSubmissions.filter(
      (item: any) => !item.serving && (item.checked || item.cancelled || item.missed)
    )
    const skipped = allSubmissions.filter(
      (item: any) => !item.serving && item.skipped && !item.checked && !item.cancelled && !item.missed
    )

    setServingItems(serving)
    setQueueItems(inQueue)
    setCompletedItems(completed)
    setSkippedItems(skipped)

    const total = allSubmissions.length
    const completedCount = completed.filter((item: any) => item.checked).length
    setWaiting(inQueue.length)
    setServed(completedCount)
    setCompletionRate(total > 0 ? Math.round((completedCount / total) * 100) : 0)
  }, [])

  useEffect(() => {
    const fetchLiveQueue = async () => {
      if (!formId) return
      try {
        const response = await getLiveTracking(formId)
        if (response.status && response.data) {
          processSubmissions(response.data)
        }
      } catch (error) {
        console.error("Error loading live tracking:", error)
      }
    }

    if (mounted && formId) {
      fetchLiveQueue()
    }
  }, [mounted, formId, processSubmissions])

  // Listen for WebSocket `livequeue_cum_dashboard` events for real-time queue updates
  const handleLiveQueueUpdate = useCallback((data: { loc: string; live_queue: any[]; dashboard: any }) => {
    if (data.live_queue) {
      processSubmissions(data.live_queue)
    }
  }, [processSubmissions])

  useEffect(() => {
    wsManager.on("livequeue_cum_dashboard", handleLiveQueueUpdate)
    return () => {
      wsManager.off("livequeue_cum_dashboard", handleLiveQueueUpdate)
    }
  }, [handleLiveQueueUpdate])

  const handleCallNext = async () => {
    if (!formId) return
    let currentServing = [...servingItems]
    let currentQueue = [...queueItems]

    const targetItem = currentQueue.length > 0 ? currentQueue[0] : (currentServing.length > 0 ? currentServing[0] : null)
    if (!targetItem) return

    setIsCallingNext(true)
    try {
      const response = await nextCustomer(formId, targetItem.token)
      if (response && response.status) {
        let currentCompleted = [...completedItems]
        let newServedCount = served

        // If there is any submission in SERVING section:
        if (currentServing.length > 0) {
          const finishedItem = currentServing[0]
          const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          currentCompleted.push({
            ...finishedItem,
            time: timeStr,
            status: "Completed",
            checked: true,
            serving: false
          })
          currentServing = currentServing.slice(1)
          newServedCount += 1
        }

        // Put top submission of IN QUEUE section to SERVING section
        if (currentQueue.length > 0) {
          const nextItem = currentQueue[0]
          currentServing.push({ ...nextItem, serving: true })
          currentQueue = currentQueue.slice(1)
        }

        setServingItems(currentServing)
        setQueueItems(currentQueue)
        setCompletedItems(currentCompleted)

        setWaiting(currentQueue.length)
        setServed(newServedCount)
        const total = currentServing.length + currentQueue.length + currentCompleted.length + skippedItems.length
        setCompletionRate(total > 0 ? Math.round((newServedCount / total) * 100) : 0)
      } else {
        console.error("Failed to call next customer:", response?.message)
      }
    } catch (err) {
      console.error("Error in Call Next:", err)
    } finally {
      setIsCallingNext(false)
    }
  }

  const handleSkip = async () => {
    if (!formId) return
    let currentQueue = [...queueItems]

    const targetItem = currentQueue.length > 0 ? currentQueue[0] : null
    if (!targetItem) return

    setIsSkipping(true)
    try {
      const response = await skipCustomer(formId, targetItem.token)
      if (response && response.status) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        setSkippedItems([...skippedItems, { ...targetItem, time: timeStr, status: "Skipped" }])
        setQueueItems(currentQueue.slice(1))
        setWaiting((prev) => Math.max(0, prev - 1))
      } else {
        console.error("Failed to skip customer:", response?.message)
      }
    } catch (err) {
      console.error("Error in Skip:", err)
    } finally {
      setIsSkipping(false)
    }
  }

  const handleCancel = async (id: string, token: string, isServing = false) => {
    if (!formId || !token) return
    setCancellingId(id)
    try {
      const response = await cancelCustomer(formId, token)
      if (response && response.status) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        if (isServing) {
          const itemToCancel = servingItems.find((item) => item.id === id)
          if (itemToCancel) {
            setCompletedItems([
              ...completedItems,
              { ...itemToCancel, time: timeStr, status: "Cancelled" }
            ])
            setServingItems(servingItems.filter((item) => item.id !== id))
          }
        } else {
          const itemToCancel = queueItems.find((item) => item.id === id)
          if (itemToCancel) {
            setCompletedItems([
              ...completedItems,
              { ...itemToCancel, time: timeStr, status: "Cancelled" }
            ])
            setQueueItems(queueItems.filter((item) => item.id !== id))
            setWaiting((prev) => Math.max(0, prev - 1))
          }
        }
      } else {
        console.error("Failed to cancel customer:", response?.message)
      }
    } catch (err) {
      console.error("Error in Cancel:", err)
    } finally {
      setCancellingId(null)
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
        <ActionButtons
          onCallNext={handleCallNext}
          onSkip={handleSkip}
          isCallingNext={isCallingNext}
          isSkipping={isSkipping}
        />
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side - Queue Lists (70%) */}
        <div className="lg:col-span-8 space-y-6">
          {/* SERVING Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={cn(
                "tracking-wide text-sm font-medium transition-colors duration-200",
                isDark ? "text-gray-400" : "text-gray-600"
              )}>SERVING</h2>
              <span className={cn(
                "rounded-full px-2 py-0.5 text-xs transition-colors duration-200",
                isDark
                  ? "bg-white/10 border border-white/10 text-gray-300"
                  : "bg-gray-100 border border-gray-200 text-gray-600"
              )}>
                {servingItems.length}
              </span>
            </div>
            <div className="space-y-3">
              {servingItems.map((item) => (
                <QueueCard
                  key={item.id}
                  name={item.name}
                  initials={item.initials}
                  token={item.token}
                  time={item.time}
                  isServing={true}
                  isCancelling={cancellingId === item.id}
                  onCancel={() => handleCancel(item.id, item.token, true)}
                  onClick={() => setSelectedPerson(item)}
                />
              ))}
            </div>
          </div>

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
              {queueItems.map((item) => (
                <QueueCard
                  key={item.id}
                  name={item.name}
                  initials={item.initials}
                  token={item.token}
                  time={item.time}
                  isServing={false}
                  isCancelling={cancellingId === item.id}
                  onCancel={() => handleCancel(item.id, item.token, false)}
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
