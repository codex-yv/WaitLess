"use client"

import React from "react"
import { motion } from "framer-motion"
import { Clock, Users, BarChart3 } from "lucide-react"
import adminDashImage from "@/assets/admin_dash.png"

export function Hero() {
  return (
    <div 
      className="relative w-full h-[280px] rounded-3xl overflow-hidden mb-8 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
      style={{
        backgroundImage: `url(${adminDashImage.src})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dynamic Background Base Removed to restore image contrast */}

      {/* Animated Glow Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-50px] left-[20%] w-[300px] h-[300px] bg-purple-600/40 blur-[100px] rounded-full mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-100px] right-[10%] w-[400px] h-[400px] bg-blue-500/30 blur-[120px] rounded-full mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[20%] right-[40%] w-[200px] h-[200px] bg-cyan-400/30 blur-[80px] rounded-full mix-blend-screen"
      />

      {/* Mid-Layer Ambient Glow for Text Contrast */}
      <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-[#020617]/80 to-transparent z-0 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-between p-10">
        <div className="flex flex-col max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-200 mb-2 flex items-center gap-2 drop-shadow-md">
              Good Morning <span className="animate-bounce">👋</span>
            </p>
            <h2 className="text-3xl font-extrabold mb-1.5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-blue-300">
              Queue Control Center
            </h2>
            <p className="text-gray-300 text-lg mb-8 drop-shadow-md font-medium">
              Real-time view. Total control. No chaos.
            </p>

            {/* Stats Glass Tiles */}
            <div className="flex flex-wrap gap-4">
              <div className="relative group overflow-hidden flex items-center gap-4 bg-[#020617]/50 backdrop-blur-[24px] border border-white/10 px-6 py-4 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_30px_rgba(0,0,0,0.6)] hover:bg-[#020617]/40 transition-colors">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-[-150%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-45deg] transition-all duration-1000 group-hover:translate-x-[300%] opacity-0 group-hover:opacity-100 ease-in-out pointer-events-none" />
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                </span>
                <div className="flex flex-col relative z-10">
                  <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Active now</span>
                  <span className="text-xl font-extrabold text-white">1</span>
                </div>
              </div>

              <div className="relative group overflow-hidden flex items-center gap-4 bg-[#020617]/50 backdrop-blur-[24px] border border-white/10 px-6 py-4 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_30px_rgba(0,0,0,0.6)] hover:bg-[#020617]/40 transition-colors">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-[-150%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-45deg] transition-all duration-1000 group-hover:translate-x-[300%] opacity-0 group-hover:opacity-100 ease-in-out pointer-events-none" />
                <Clock className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                <div className="flex flex-col relative z-10">
                  <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Avg wait</span>
                  <span className="text-xl font-extrabold text-white">8 min</span>
                </div>
              </div>

              <div className="relative group overflow-hidden flex items-center gap-4 bg-[#020617]/50 backdrop-blur-[24px] border border-white/10 px-6 py-4 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_30px_rgba(0,0,0,0.6)] hover:bg-[#020617]/40 transition-colors">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-[-150%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-45deg] transition-all duration-1000 group-hover:translate-x-[300%] opacity-0 group-hover:opacity-100 ease-in-out pointer-events-none" />
                <BarChart3 className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
                <div className="flex flex-col relative z-10">
                  <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Today</span>
                  <span className="text-xl font-extrabold text-white">4</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}