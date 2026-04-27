"use client"

import React from "react"
import { LayoutDashboard, Users, ClipboardList, LogOut, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Live Queue", icon: Users, active: false },
  { name: "Form Builder", icon: ClipboardList, active: false },
  { name: "Team", icon: Users, active: false },
]

export function Sidebar() {
  return (
    <div className="w-64 h-full hidden md:flex flex-col bg-white/5 backdrop-blur-2xl border-r border-white/10 shrink-0">
      <div className="p-6 flex items-center gap-3">
        <Zap className="w-8 h-8 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] fill-blue-500" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          WaitLess
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium",
              item.active
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_4px_20px_rgba(99,102,241,0.5)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center shrink-0">
              <span className="font-bold text-sm">AD</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">admin@waitless.com</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse" />
                <span className="text-xs text-gray-400">Admin</span>
              </div>
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-2 rounded-lg text-sm text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all border border-transparent hover:border-red-500/20">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
