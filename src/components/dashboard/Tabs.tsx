"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const tabs = ["Overview", "Live Queue", "Activity"]

export function Tabs() {
  const [activeTab, setActiveTab] = useState("Overview")

  return (
    <div className="relative flex items-center gap-2 mb-8 p-1.5 bg-[#020617]/40 backdrop-blur-[24px] border border-white/10 rounded-full w-max shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_15px_35px_rgba(0,0,0,0.5)] z-20">
      {/* Container specular light */}
      <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {tabs.map((tab) => {
        const isActive = activeTab === tab
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300",
              isActive 
                ? "text-white" 
                : "text-gray-400 hover:text-white hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5),inset_0_1px_rgba(255,255,255,0.4)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={cn("relative z-10", isActive && "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]")}>{tab}</span>
          </button>
        )
      })}
    </div>
  )
}