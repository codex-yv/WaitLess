"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const tabs = ["Overview", "Live Queue", "Activity"]

interface TabsProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Tabs({ activeTab: propActiveTab, onTabChange }: TabsProps = {}) {
  const [internalActiveTab, setInternalActiveTab] = useState("Overview")
  const activeTab = propActiveTab !== undefined ? propActiveTab : internalActiveTab
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

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

  const handleTabClick = (tab: string) => {
    if (propActiveTab === undefined) {
      setInternalActiveTab(tab)
    }
    if (onTabChange) {
      onTabChange(tab)
    }
    if (tab === "Live Queue") {
      router.push("/dashboard/live-queue")
    }
  }

  return (
    <div className={`relative flex items-center gap-2 mb-8 p-1.5 backdrop-blur-xl border rounded-full w-max z-20 transition-colors duration-300 ${
      isDark 
        ? "bg-[#020617]/40 border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_15px_35px_rgba(0,0,0,0.5)]" 
        : "bg-white/70 border-white/70 ring-1 ring-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_6px_20px_rgba(0,0,0,0.08)]"
    }`}>
      {/* Container specular light */}
      <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {/* Subtle gradient tint for light mode */}
      {!isDark && (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.6),rgba(99,102,241,0.05))] rounded-full opacity-100 pointer-events-none" />
      )}
      {tabs.map((tab) => {
        const isActive = activeTab === tab
        return (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={cn(
              "relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300",
              isActive 
                ? "text-white" 
                : isDark
                  ? "text-gray-400 hover:text-white hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  : "text-gray-600 hover:text-gray-900 bg-transparent"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 rounded-full ${
                  isDark 
                    ? "shadow-[0_0_20px_rgba(139,92,246,0.5),inset_0_1px_rgba(255,255,255,0.4)]" 
                    : "shadow-[0_0_12px_rgba(99,102,241,0.25),inset_0_1px_rgba(255,255,255,0.5)]"
                }`}
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