"use client"

import React from "react"
import { Home, Users, ClipboardList, LogOut, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", icon: Home, active: true },
  { name: "Live Queue", icon: Users, active: false },
  { name: "Form Builder", icon: ClipboardList, active: false },
  { name: "Team", icon: Users, active: false },
]

export function Sidebar() {
  return (
    <div className="w-52 h-full hidden md:flex flex-col bg-[#0d1117] border-r border-white/8 shrink-0">
      {/* Logo */}
      <div className="p-5 flex items-center gap-2.5">
        <Zap className="w-7 h-7 text-blue-500 fill-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          WaitLess
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm",
              item.active
                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </button>
        ))}
      </nav>

      {/* User Card */}
      <div className="p-3 mt-auto">
        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/8 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            {/* Avatar with photo-like gradient */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 flex items-center justify-center shrink-0 shadow-lg">
              <span className="font-bold text-xs text-white">AD</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-white truncate">admin@waitless.com</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)] animate-pulse" />
                <span className="text-[11px] text-gray-400">Admin</span>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all border border-red-500/20 hover:border-red-500/30">
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}