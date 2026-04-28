"use client"

import React from "react"
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

const stats = [
  {
    title: "Total Clients",
    value: "4",
    icon: Users,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/20",
    chartColor: "#a855f7",
    isLive: false,
  },
  {
    title: "Waiting",
    value: "1",
    subtitle: "Live count",
    icon: UserPlus,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/20",
    chartColor: "#3b82f6",
    isLive: true,
  },
  {
    title: "Completed",
    value: "2",
    subtitle: "50% completion rate",
    icon: CheckCircle2,
    iconColor: "text-green-400",
    iconBg: "bg-green-500/20",
    chartColor: "#22c55e",
    isLive: false,
  },
  {
    title: "Canceled",
    value: "3",
    subtitle: "Action needed",
    icon: AlertTriangle,
    iconColor: "text-red-400",
    iconBg: "bg-red-500/20",
    chartColor: "#ef4444",
    isLive: false,
  },
]

export function StatsGrid() {
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
            interactive 
            className="h-full flex flex-col justify-between overflow-hidden relative group p-[0px]"
            glowColor={stat.chartColor}
            borderGlow={`linear-gradient(135deg, ${stat.chartColor}80, transparent 70%)`}
          >
            
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-xl flex items-center justify-center", stat.iconBg)}>
                    <stat.icon className={cn("w-5 h-5", stat.iconColor)} />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-white tracking-tight flex items-center gap-2">
                  {stat.value}
                  {stat.isLive && (
                    <span className="relative flex h-3 w-3 -top-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                  )}
                </span>
                {stat.subtitle && (
                  <span className="text-sm text-gray-500 pb-1">{stat.subtitle}</span>
                )}
              </div>
            </div>

            <div className="h-16 w-full mt-auto px-2 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <defs>
                    <linearGradient id={`color-${i}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={stat.chartColor} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={stat.chartColor} stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={`url(#color-${i})`}
                    strokeWidth={3}
                    dot={{ r: 3, fill: stat.chartColor, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: stat.chartColor, stroke: "#fff", strokeWidth: 2 }}
                    style={{ filter: `drop-shadow(0px 8px 12px ${stat.chartColor}80)` }}
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