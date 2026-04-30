"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AddMemberForm } from "@/components/team/AddMemberForm"
import { TeamList } from "@/components/team/TeamList"
import teamBgImage from "@/assets/team_bg.png"
import teamBgLightImage from "@/assets/team_bg_light.png"

interface Member {
  id: string
  name: string
  email: string
  role: string
  initials: string
}

export default function TeamPage() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@waitless.com",
      role: "Coordinator",
      initials: "SJ"
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael@waitless.com",
      role: "Coordinator",
      initials: "MC"
    }
  ])

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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleAddMember = (name: string, email: string) => {
    const newMember: Member = {
      id: Date.now().toString(),
      name,
      email,
      role: "Coordinator",
      initials: getInitials(name)
    }
    setMembers([...members, newMember])
  }

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id))
  }

  if (!mounted) {
    return null
  }

  return (
    <div 
      className="relative min-h-screen transition-colors duration-300"
      style={{
        backgroundImage: `url(${isDark ? teamBgImage.src : teamBgLightImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for better content visibility */}
      <div className={`absolute inset-0 transition-colors duration-300 ${
        isDark ? "bg-[#030712]/80" : "bg-white/30"
      }`} />
      
      {/* Background Effects - Glowing Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-100px] left-[10%] w-[400px] h-[400px] bg-purple-600/30 blur-[120px] rounded-full mix-blend-screen pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-150px] right-[5%] w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[30%] right-[30%] w-[300px] h-[300px] bg-cyan-400/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none"
      />

      {/* Gradient Wave at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-blue-300 mb-2">
            Team
          </h1>
          <p className={isDark ? "text-gray-400 text-lg" : "text-gray-600 text-lg"}>
            Manage your coordinators and staff
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Add Member Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AddMemberForm onAddMember={handleAddMember} isDark={isDark} />
          </motion.div>

          {/* Right Column - Team List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TeamList members={members} onRemoveMember={handleRemoveMember} isDark={isDark} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
