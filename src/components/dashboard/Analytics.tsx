"use client"

import React from "react"
import { motion } from "framer-motion"
import { Clock, IndianRupee, MoreVertical } from "lucide-react"
import { Card } from "@/components/ui/Card"

const SVGCircle = ({ percentage, color }: { percentage: number; color: string }) => {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="stroke-gray-700/50"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
        />
      </svg>
      <div className="absolute flex items-center justify-center">
        <span className="text-xl font-bold text-white">{percentage}%</span>
      </div>
    </div>
  )
}

export function AnalyticsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Completion Rate */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Card 
          interactive 
          className="p-5 flex flex-col justify-between h-full"
          glowColor="#3b82f6" 
          borderGlow="linear-gradient(135deg, #3b82f680, transparent 70%)"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-300 font-medium">Completion Rate</h3>
            <button className="text-gray-500 hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <SVGCircle percentage={50} color="#3b82f6" />
            <div>
              <div className="text-2xl font-bold text-white">2 of 4</div>
              <div className="text-sm text-gray-500">total</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Cancel Rate */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <Card 
          interactive 
          className="p-5 flex flex-col justify-between h-full"
          glowColor="#ef4444" 
          borderGlow="linear-gradient(135deg, #ef444480, transparent 70%)"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-300 font-medium">Cancel Rate</h3>
            <button className="text-gray-500 hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <SVGCircle percentage={75} color="#ef4444" />
            <div>
              <div className="text-2xl font-bold text-white">3 of 4</div>
              <div className="text-sm text-gray-500">total</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Avg Wait Time */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <Card 
          interactive 
          className="p-5 flex flex-col justify-between h-full"
          glowColor="#818cf8" 
          borderGlow="linear-gradient(135deg, #818cf880, transparent 70%)"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-300 font-medium">Avg Wait Time</h3>
            <button className="text-gray-500 hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-6 my-auto">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Clock className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">8 min</div>
              <div className="text-sm text-gray-500">today's average</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Total Revenue */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
        <Card 
          interactive 
          className="p-5 flex flex-col justify-between h-full"
          glowColor="#10b981" 
          borderGlow="linear-gradient(135deg, #10b98180, transparent 70%)"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-300 font-medium">Total Revenue</h3>
            <button className="text-gray-500 hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-6 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <IndianRupee className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">₹8,450</div>
              <div className="text-sm text-gray-500">today</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
