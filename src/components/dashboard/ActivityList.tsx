"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { UserPlus, CheckCircle2, XCircle, UserCog, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAdminDashboard } from "@/api/api-functions/adminDashboard"

interface ActivityItem {
  type: string
  info: string | any
}

interface ActivityListProps {
  dashboardData?: any
  loading?: boolean
  customActivities?: any[]
}

export function ActivityList({
  dashboardData: propDashboardData,
  loading: propLoading,
  customActivities
}: ActivityListProps = {}) {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [internalData, setInternalData] = useState<any>(null)
  const [internalLoading, setInternalLoading] = useState(false)

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
    if (customActivities === undefined && propDashboardData === undefined && mounted) {
      const fetchData = async () => {
        setInternalLoading(true)
        try {
          const response = await getAdminDashboard()
          if (response && response.status) {
            setInternalData(response.data)
          }
        } catch (err) {
          console.error("Error fetching activity list dashboard data:", err)
        } finally {
          setInternalLoading(false)
        }
      }
      fetchData()
    }
  }, [customActivities, propDashboardData, mounted])

  const effectiveData = propDashboardData !== undefined ? propDashboardData : internalData
  const isLoading = propLoading !== undefined ? propLoading : internalLoading

  const rawActivities: ActivityItem[] = customActivities || effectiveData?.activity || effectiveData?.data?.activity || []

  const getActivityConfig = (type: string) => {
    const normalizedType = String(type || "").toLowerCase()
    if (normalizedType === "join") {
      return {
        icon: UserPlus,
        iconColor: "text-purple-400",
        iconBg: "bg-purple-500/15",
        dot: "bg-purple-500",
        badgeStyle: isDark
          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
          : "bg-purple-50 text-purple-700 border-purple-200"
      }
    }
    if (normalizedType === "complete") {
      return {
        icon: CheckCircle2,
        iconColor: "text-green-400",
        iconBg: "bg-green-500/15",
        dot: "bg-green-500",
        badgeStyle: isDark
          ? "bg-green-500/10 text-green-400 border-green-500/20"
          : "bg-green-50 text-green-700 border-green-200"
      }
    }
    if (normalizedType === "cancel") {
      return {
        icon: XCircle,
        iconColor: "text-red-400",
        iconBg: "bg-red-500/15",
        dot: "bg-red-500",
        badgeStyle: isDark
          ? "bg-red-500/10 text-red-400 border-red-500/20"
          : "bg-red-50 text-red-700 border-red-200"
      }
    }
    return {
      icon: UserCog,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/15",
      dot: "bg-blue-500",
      badgeStyle: isDark
        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
        : "bg-blue-50 text-blue-700 border-blue-200"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
    >
      <div className={`w-full rounded-2xl border overflow-hidden transition-colors duration-300 ${
        isDark 
          ? "bg-[#111827] border-white/8" 
          : "bg-white/60 backdrop-blur-xl border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      }`}>
        {/* Header */}
        <div className={`px-5 py-4 border-b flex justify-between items-center transition-colors duration-300 ${
          isDark ? "border-white/8" : "border-gray-200"
        }`}>
          <h3 className={`text-base font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Recent Activity</h3>
          <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 group transition-colors">
            View full logs
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Items */}
        <div className="flex flex-col">
          {isLoading ? (
            <div className={`py-12 text-center text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Loading activities...
            </div>
          ) : rawActivities.length === 0 ? (
            <div className={`py-12 text-center text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              No Recent Activity
            </div>
          ) : (
            rawActivities.map((activity, index) => {
              const config = getActivityConfig(activity.type)
              const titleText = typeof activity.info === "string" ? activity.info : JSON.stringify(activity.info || "")

              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors",
                    index !== rawActivities.length - 1 && (isDark ? "border-b border-white/5" : "border-b border-gray-100")
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0", config.iconBg)}>
                      <config.icon className={cn("w-4 h-4", config.iconColor)} />
                    </div>
                    <div className="text-sm">
                      <span className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}>{titleText}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border", config.badgeStyle)}>
                      {activity.type}
                    </span>
                    <span className={cn("w-2 h-2 rounded-full", config.dot)} />
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </motion.div>
  )
}