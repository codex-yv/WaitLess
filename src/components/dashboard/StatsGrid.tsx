"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, UserPlus, CheckCircle2, AlertTriangle, MoreVertical } from "lucide-react"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

const sparklineData = [
  { value: 1 },
  { value: 2 },
  { value: 1 },
  { value: 3 },
  { value: 2 },
  { value: 4 },
]

interface StatsGridProps {
  dashboardData: any
  loading: boolean
}

export function StatsGrid({ dashboardData, loading }: StatsGridProps) {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Calculate stats from dashboard data
  const stats = React.useMemo(() => {
    if (!dashboardData || loading) {
      // Return dummy data when loading or no data
      return [
        {
          title: "Total Clients",
          value: "4",
          icon: Users,
          iconColor: "text-purple-400",
          iconBg: "bg-purple-500/12",
          chartColor: "#a855f7",
          lightTint: "bg-[linear-gradient(135deg,rgba(139,92,246,0.08),transparent)]",
          isLive: false,
        },
        {
          title: "Waiting",
          value: "1",
          subtitle: "Live count",
          icon: UserPlus,
          iconColor: "text-blue-400",
          iconBg: "bg-blue-500/12",
          chartColor: "#3b82f6",
          lightTint: "bg-[linear-gradient(135deg,rgba(59,130,246,0.08),transparent)]",
          isLive: true,
        },
        {
          title: "Completed",
          value: "2",
          subtitle: "50% completion rate",
          icon: CheckCircle2,
          iconColor: "text-green-400",
          iconBg: "bg-green-500/12",
          chartColor: "#22c55e",
          lightTint: "bg-[linear-gradient(135deg,rgba(34,197,94,0.08),transparent)]",
          isLive: false,
        },
        {
          title: "Canceled",
          value: "3",
          subtitle: "Action needed",
          icon: AlertTriangle,
          iconColor: "text-red-400",
          iconBg: "bg-red-500/12",
          chartColor: "#ef4444",
          lightTint: "bg-[linear-gradient(135deg,rgba(239,68,68,0.08),transparent)]",
          isLive: false,
        },
      ]
    }

    const total = dashboardData.total || 0
    const checked = dashboardData.checked || 0
    const waiting = dashboardData.waiting || 0
    const canceled = dashboardData.canceled || 0

    // Calculate completion rate
    const completionRate = total > 0 ? Math.round((checked / total) * 100) : 0
    // Calculate cancel rate
    const cancelRate = total > 0 ? Math.round((canceled / total) * 100) : 0

    return [
      {
        title: "Total Clients",
        value: total.toString(),
        icon: Users,
        iconColor: "text-purple-400",
        iconBg: "bg-purple-500/12",
        chartColor: "#a855f7",
        lightTint: "bg-[linear-gradient(135deg,rgba(139,92,246,0.08),transparent)]",
        isLive: false,
      },
      {
        title: "Waiting",
        value: waiting.toString(),
        subtitle: "Live count",
        icon: UserPlus,
        iconColor: "text-blue-400",
        iconBg: "bg-blue-500/12",
        chartColor: "#3b82f6",
        lightTint: "bg-[linear-gradient(135deg,rgba(59,130,246,0.08),transparent)]",
        isLive: true,
      },
      {
        title: "Completed",
        value: checked.toString(),
        subtitle: `${completionRate}% completion rate`,
        icon: CheckCircle2,
        iconColor: "text-green-400",
        iconBg: "bg-green-500/12",
        chartColor: "#22c55e",
        lightTint: "bg-[linear-gradient(135deg,rgba(34,197,94,0.08),transparent)]",
        isLive: false,
      },
      {
        title: "Canceled",
        value: canceled.toString(),
        subtitle: `${cancelRate}% cancel rate`,
        icon: AlertTriangle,
        iconColor: "text-red-400",
        iconBg: "bg-red-500/12",
        chartColor: "#ef4444",
        lightTint: "bg-[linear-gradient(135deg,rgba(239,68,68,0.08),transparent)]",
        isLive: false,
      },
    ]
  }, [dashboardData, loading])

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Card 
            className="h-full flex flex-col justify-between overflow-hidden relative group p-[0px]"
            glowColor={stat.chartColor}
            borderGlow={`linear-gradient(135deg, ${stat.chartColor}20, transparent 70%)`}
            lightTint={stat.lightTint}
          >
            
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-xl flex items-center justify-center", stat.iconBg)}>
                    <stat.icon className={cn("w-5 h-5", stat.iconColor)} />
                  </div>
                  <div>
                    <h3 className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.title}</h3>
                  </div>
                </div>
                <button className={isDark ? "text-gray-500" : "text-gray-400"}>
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-end gap-3">
                <span className={`text-4xl font-bold tracking-tight flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {stat.value}
                  {stat.isLive && (
                    <span className="relative flex h-3 w-3 -top-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                  )}
                </span>
                {stat.subtitle && (
                  <span className={`text-sm pb-1 ${isDark ? "text-gray-500" : "text-gray-600"}`}>{stat.subtitle}</span>
                )}
              </div>
            </div>

            <div className="h-16 w-full mt-auto px-2 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <defs>
                    <linearGradient id={`color-${i}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={stat.chartColor} stopOpacity={0.15} />
                      <stop offset="100%" stopColor={stat.chartColor} stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={`url(#color-${i})`}
                    strokeWidth={3}
                    dot={{ r: 3, fill: stat.chartColor, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: stat.chartColor, stroke: isDark ? "#fff" : "#000", strokeWidth: 2 }}
                    style={{ 
                      filter: isDark 
                        ? `drop-shadow(0px 6px 10px ${stat.chartColor}30)` 
                        : `drop-shadow(0px 0px 6px ${stat.chartColor}25)`,
                      opacity: isDark ? 1 : 0.9
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}