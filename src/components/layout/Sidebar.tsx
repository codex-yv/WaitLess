"use client"

import React, { useState, useEffect } from "react"
import { Home, Users, ClipboardList, LogOut, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Live Queue", icon: Users, href: "/dashboard/live-queue" },
  { name: "Form Builder", icon: ClipboardList, href: "/dashboard/forms" },
  { name: "Team", icon: Users, href: "/dashboard/team" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check initial theme
    const hasDarkClass = document.documentElement.classList.contains("dark")
    setIsDark(hasDarkClass)

    // Listen for theme changes
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
    <div className={`w-52 h-full hidden md:flex flex-col border-r shrink-0 transition-colors duration-300 ${
      isDark ? "bg-[#0d1117] border-white/8" : "bg-gray-100 border-gray-200"
    }`}>
      {/* Logo */}
      <div className="p-5 flex items-center gap-2.5">
        <Zap className="w-7 h-7 text-blue-500 fill-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          WaitLess
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm",
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)]"
                  : isDark
                    ? "text-gray-400 hover:text-white hover:bg-white/5"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Card */}
      <div className="p-3 mt-auto">
        <div className={`p-3 rounded-xl border flex flex-col gap-3 transition-colors duration-300 ${
          isDark 
            ? "bg-white/[0.04] border-white/8" 
            : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center gap-2.5">
            {/* Avatar with photo-like gradient */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 flex items-center justify-center shrink-0 shadow-lg">
              <span className="font-bold text-xs text-white">AD</span>
            </div>
            <div className="overflow-hidden">
              <p className={`text-xs font-medium truncate ${isDark ? "text-white" : "text-gray-900"}`}>
                admin@waitless.com
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)] animate-pulse" />
                <span className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Admin
                </span>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs bg-red-500/10 hover:bg-red-500/20 transition-all border border-red-500/20 hover:border-red-500/30 text-red-400">
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}