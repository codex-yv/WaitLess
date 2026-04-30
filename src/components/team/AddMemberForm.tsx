"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

interface AddMemberFormProps {
  onAddMember: (name: string, email: string) => void
  isDark?: boolean
}

export function AddMemberForm({ onAddMember, isDark = true }: AddMemberFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && email.trim()) {
      onAddMember(name.trim(), email.trim())
      setName("")
      setEmail("")
    }
  }

  return (
    <div className={cn(
      "relative p-6 rounded-2xl border transition-colors duration-300 backdrop-blur-none backdrop-saturate-100",
      isDark 
        ? "bg-white/5 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
        : "bg-white/10 border-white/20 ring-1 ring-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
    )}>
      {/* Subtle gradient tint */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.06),rgba(34,211,238,0.05))] rounded-2xl opacity-100 pointer-events-none" />
      {/* Micro-contrast layer */}
      <div className="absolute inset-0 bg-white/5 rounded-2xl pointer-events-none" />
      {/* Inner highlight */}
      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className={cn("text-xl font-bold mb-1", isDark ? "text-white" : "bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent")}>
          Add New Member
        </h3>
        <p className={cn("text-sm mb-6", isDark ? "text-gray-400" : "text-gray-700")}>
          Add coordinators to your team
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]")}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              className={cn(
                "w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none backdrop-blur-sm",
                isDark 
                  ? "bg-white/5 border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500" 
                  : "bg-white/10 border-white/20 focus:border-purple-400 focus:ring-1 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500 caret-blue-500"
              )}
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]")}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className={cn(
                "w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none backdrop-blur-sm",
                isDark 
                  ? "bg-white/5 border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500" 
                  : "bg-white/10 border-white/20 focus:border-purple-400 focus:ring-1 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500 caret-blue-500"
              )}
              required
            />
          </div>

          {/* Add Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 hover:brightness-110 transition-all duration-200 shadow-[0_4px_15px_rgba(99,102,241,0.4)]"
          >
            + Add to Team
          </button>
        </form>

        {/* Info Box */}
        <div className={cn(
          "mt-6 p-4 rounded-xl border backdrop-blur-sm",
          isDark 
            ? "bg-blue-500/10 border-blue-500/20" 
            : "bg-blue-500/10 border-blue-500/30"
        )}>
          <p className={cn("text-sm", isDark ? "text-blue-300" : "text-blue-700 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]")}>
            <span className="font-semibold">ℹ️ Note:</span> Coordinators can call, skip and manage the queue. They'll receive access to the dashboard upon invitation.
          </p>
        </div>
      </div>
    </div>
  )
}
