"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { UserPlus, CheckCircle2, XCircle, UserCog, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    title: "Client #182",
    action: "joined queue",
    time: "2 mins ago",
    icon: UserPlus,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/15",
    dot: "bg-purple-500",
  },
  {
    id: 2,
    title: "Appointment #145",
    action: "completed",
    time: "5 mins ago",
    icon: CheckCircle2,
    iconColor: "text-green-400",
    iconBg: "bg-green-500/15",
    dot: "bg-green-500",
  },
  {
    id: 3,
    title: "Client #150",
    action: "canceled appointment",
    time: "12 mins ago",
    icon: XCircle,
    iconColor: "text-red-400",
    iconBg: "bg-red-500/15",
    dot: "bg-red-500",
  },
  {
    id: 4,
    title: "Staff",
    action: "added manual entry #183",
    time: "15 mins ago",
    icon: UserCog,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/15",
    dot: "bg-blue-500",
  },
]

export function ActivityList() {
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
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={cn(
                "flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors",
                index !== activities.length - 1 && (isDark ? "border-b border-white/5" : "border-b border-gray-100")
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0", activity.iconBg)}>
                  <activity.icon className={cn("w-4 h-4", activity.iconColor)} />
                </div>
                <div className="text-sm">
                  <span className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}>{activity.title}</span>{" "}
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>{activity.action}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{activity.time}</span>
                <span className={cn("w-2 h-2 rounded-full", activity.dot)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}