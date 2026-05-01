"use client"

import React, { useState } from "react"
import { ActionButtons } from "./ActionButtons"
import { QueueCard } from "./QueueCard"
import { CompletedCard } from "./CompletedCard"
import { LiveStats } from "./LiveStats"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"

interface QueueItem {
  id: string
  name: string
  initials: string
  token: string
  time: string
  status?: "Completed" | "Cancelled" | "Skipped"
}

export function LiveQueuePage() {
  const { isDark, mounted } = useTheme()

  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    { id: "1", name: "Amit Sharma", initials: "AS", token: "T-001", time: "10:30 AM" },
    { id: "2", name: "Priya Patel", initials: "PP", token: "T-002", time: "10:35 AM" },
    { id: "3", name: "Rahul Kumar", initials: "RK", token: "T-003", time: "10:40 AM" },
    { id: "4", name: "Sneha Gupta", initials: "SG", token: "T-004", time: "10:45 AM" },
  ])

  const [completedItems, setCompletedItems] = useState<QueueItem[]>([
    { id: "5", name: "Vikram Singh", initials: "VS", token: "T-005", time: "10:25 AM", status: "Completed" },
  ])

  const [skippedItems, setSkippedItems] = useState<QueueItem[]>([])

  const [waiting, setWaiting] = useState(4)
  const [served, setServed] = useState(1)
  const [completionRate, setCompletionRate] = useState(20)

  const handleCallNext = () => {
    if (queueItems.length > 0) {
      const firstItem = queueItems[0]
      setCompletedItems([...completedItems, { ...firstItem, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: "Completed" }])
      setQueueItems(queueItems.slice(1))
      setWaiting(prev => Math.max(0, prev - 1))
      setServed(prev => prev + 1)
      setCompletionRate(prev => Math.min(100, prev + 20))
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
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
