"use client"

import React from "react"
import { TeamCard } from "./TeamCard"
import { cn } from "@/lib/utils"

interface Member {
  id: string
  name: string
  email: string
  role: string
  initials: string
}

interface TeamListProps {
  members: Member[]
  onRemoveMember: (id: string) => void
  isDark?: boolean
}

export function TeamList({ members, onRemoveMember, isDark = true }: TeamListProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className={cn("text-xl font-bold", isDark ? "text-white" : "bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent")}>
              Active Team
            </h3>
            <p className={cn("text-sm mt-1", isDark ? "text-gray-400" : "text-gray-700")}>
              Manage your team members
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm">
            <span className={cn("text-sm font-semibold", isDark ? "text-purple-300" : "text-purple-600 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]")}>{members.length}</span>
          </div>
        </div>

        {/* Member List */}
        <div className="space-y-3">
          {members.length === 0 ? (
            <div className={cn(
              "text-center py-12 rounded-xl border border-dashed backdrop-blur-sm",
              isDark ? "border-white/10 bg-white/5" : "border-white/20 bg-white/5"
            )}>
              <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-700 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]")}>
                No team members yet. Add your first member!
              </p>
            </div>
          ) : (
            members.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                email={member.email}
                role={member.role}
                initials={member.initials}
                onRemove={() => onRemoveMember(member.id)}
                isDark={isDark}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
