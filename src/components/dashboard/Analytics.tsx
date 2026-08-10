"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, IndianRupee, MoreVertical } from "lucide-react"
import { Card } from "@/components/ui/Card"

interface AnalyticsGridProps {
  dashboardData: any
  loading: boolean
}

const SVGCircle = ({ percentage, color, isDark }: { percentage: number; color: string; isDark: boolean }) => {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          className={isDark ? "stroke-gray-700/50" : "stroke-gray-300/50"}
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
        />
      </svg>
      <div className="absolute flex items-center justify-center">
        <span className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{percentage}%</span>
      </div>
    </div>
  )
}

export function AnalyticsGrid({ dashboardData, loading }: AnalyticsGridProps) {
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

  // Calculate completion and cancel rates from dashboard data
  const analytics = React.useMemo(() => {
    if (!dashboardData || loading) {
      // Return dummy data when loading or no data
      return {
        completionRate: 50,
        completionText: "2 of 4",
        cancelRate: 75,
        cancelText: "3 of 4"
      }
    }

    const total = dashboardData.total || 0
    const checked = dashboardData.checked || 0
    const canceled = dashboardData.canceled || 0

    const completionRate = total > 0 ? Math.round((checked / total) * 100) : 0
    const cancelRate = total > 0 ? Math.round((canceled / total) * 100) : 0

    return {
      completionRate,
      completionText: `${checked} of ${total}`,
      cancelRate,
      cancelText: `${canceled} of ${total}`
    }
  }, [dashboardData, loading])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Completion Rate */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Card
          className="p-5 flex flex-col justify-between h-full"
          glowColor="#3b82f6"
          borderGlow="linear-gradient(135deg, #3b82f620, transparent 70%)"
          lightTint="bg-[linear-gradient(135deg,rgba(59,130,246,0.08),transparent)]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Completion Rate</h3>
            <button className={isDark ? "text-gray-500" : "text-gray-400"}>
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <SVGCircle percentage={analytics.completionRate} color="#3b82f6" isDark={isDark} />
            <div>
              <div className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{analytics.completionText}</div>
              <div className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}>total</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Cancel Rate */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <Card
          className="p-5 flex flex-col justify-between h-full"
          glowColor="#ef4444"
          borderGlow="linear-gradient(135deg, #ef444420, transparent 70%)"
          lightTint="bg-[linear-gradient(135deg,rgba(239,68,68,0.08),transparent)]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Cancel Rate</h3>
            <button className={isDark ? "text-gray-500" : "text-gray-400"}>
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <SVGCircle percentage={analytics.cancelRate} color="#ef4444" isDark={isDark} />
            <div>
              <div className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{analytics.cancelText}</div>
              <div className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}>total</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Avg Wait Time */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <Card
          className="p-5 flex flex-col justify-between h-full"
          glowColor="#818cf8"
          borderGlow="linear-gradient(135deg, #818cf820, transparent 70%)"
          lightTint="bg-[linear-gradient(135deg,rgba(129,140,248,0.08),transparent)]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Avg Wait Time</h3>
            <button className={isDark ? "text-gray-500" : "text-gray-400"}>
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-6 my-auto">
            <div className="w-16 h-16 rounded-full bg-indigo-500/8 border border-indigo-500/15 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.12)]">
              <Clock className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <div className={`text-md ${isDark ? "text-white" : "text-gray-900"}`}>Available Soon</div>
              {/* <div className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}>today's average</div> */}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Total Revenue */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
        <Card
          className="p-5 flex flex-col justify-between h-full"
          glowColor="#10b981"
          borderGlow="linear-gradient(135deg, #10b98120, transparent 70%)"
          lightTint="bg-[linear-gradient(135deg,rgba(16,185,129,0.08),transparent)]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Total Revenue</h3>
            <button className={isDark ? "text-gray-500" : "text-gray-400"}>
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-6 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/8 border border-emerald-500/15 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.12)]">
              <IndianRupee className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <div className="text-md text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]">Available Soon</div>
              {/* <div className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}>today</div> */}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}