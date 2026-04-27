"use client"

import React from "react"
import { motion } from "framer-motion"
import { UserPlus, CheckCircle2, XCircle, UserCog, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    title: "Client #182",
    action: "joined queue",
    time: "2 mins ago",
    icon: UserPlus,
    color: "text-purple-400",
    bg: "bg-purple-500/20",
    dot: "bg-purple-500",
  },
  {
    id: 2,
    title: "Appointment #145",
    action: "completed",
    time: "5 mins ago",
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-500/20",
    dot: "bg-green-500",
  },
  {
    id: 3,
    title: "Client #150",
    action: "canceled appointment",
    time: "12 mins ago",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/20",
    dot: "bg-red-500",
  },
  {
    id: 4,
    title: "Staff",
    action: "added manual entry #183",
    time: "15 mins ago",
    icon: UserCog,
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    dot: "bg-blue-500",
  },
]

export function ActivityList() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
      <Card className="w-full relative overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 group transition-colors">
            View full logs
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="flex flex-col">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={cn(
                "flex items-center justify-between p-4 px-6 hover:bg-white/[0.03] transition-colors group",
                index !== activities.length - 1 && "border-b border-white/5"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", activity.bg)}>
                  <activity.icon className={cn("w-5 h-5", activity.color)} />
                </div>
                <div className="text-sm">
                  <span className="text-gray-200 font-medium">{activity.title}</span>{" "}
                  <span className="text-gray-400">{activity.action}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">{activity.time}</span>
                <span className={cn("w-2 h-2 rounded-full", activity.dot, "shadow-[0_0_8px_currentColor] opacity-60 group-hover:opacity-100 transition-opacity")} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
