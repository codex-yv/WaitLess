"use client"

import React, { useState, useEffect } from "react"
import { Settings, ChevronDown, Sun, Moon } from "lucide-react"

export function Header() {
  const [theme, setTheme] = useState("dark")
  const [mounted, setMounted] = useState(false)
  const [userData, setUserData] = useState<{ email: string; picture: string | null } | null>(null)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load user data from localStorage
  useEffect(() => {
    if (!mounted) return

    const tempData = localStorage.getItem('temp_data')
    if (tempData) {
      try {
        const parsed = JSON.parse(tempData)
        setUserData(parsed)
      } catch (e) {
        console.error('Error parsing temp_data:', e)
      }
    }
  }, [mounted])

  // Theme management
  useEffect(() => {
    if (!mounted) return

    // Check localStorage or system preference
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light")
    setTheme(initialTheme)

    // Apply theme to document
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [mounted])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const isDark = theme === "dark"

  return (
    <header className={`h-16 w-full flex items-center justify-between px-6 border-b z-10 sticky top-0 transition-colors duration-300 ${
      isDark ? "bg-[#0d1117] border-white/8" : "bg-white border-gray-200"
    }`}>
      <h1 className={`text-xl font-bold tracking-wide ${isDark ? "text-white" : "text-gray-900"}`}>Dashboard</h1>

      <div className="flex items-center gap-3">
        {/* Email Pill */}
        <div className={`flex items-center gap-2 cursor-pointer px-4 py-1 rounded-xl border hover:border-opacity-20 transition-all duration-200 ${
          isDark
            ? "bg-[#161b27] border-white/10 hover:border-white/20"
            : "bg-gray-100 border-gray-300 hover:border-gray-400"
        }`}>
          {/* Profile Avatar */}
          {userData?.picture ? (
            <img
              src={userData.picture}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              isDark
                ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
            }`}>
              {userData?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
          )}
          <span className={`text-sm font-medium tracking-wide ${isDark ? "text-white/90" : "text-gray-700"}`}>
            {userData?.email || 'admin@waitless.com'}
          </span>
          <ChevronDown className={`w-4 h-4 ${isDark ? "text-white/50" : "text-gray-500"}`} />
        </div>

        {/* Theme Toggle */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border hover:border-opacity-20 transition-all duration-200 cursor-pointer ${
          isDark 
            ? "bg-[#161b27] border-white/10 hover:border-white/20" 
            : "bg-gray-100 border-gray-300 hover:border-gray-400"
        }`}
          onClick={toggleTheme}
        >
          {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
          {/* Toggle Track */}
          <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 border ${
            isDark 
              ? "bg-[#2a3347] border-white/10" 
              : "bg-gradient-to-r from-purple-500 to-blue-500 border-transparent"
          }`}>
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${isDark ? "right-0.5" : "left-0.5"}`}></div>
          </div>
        </div>

        {/* Settings Button */}
        <button className={`p-2.5 rounded-xl border hover:border-opacity-20 transition-all duration-200 ${
          isDark 
            ? "bg-[#161b27] border-white/10 hover:border-white/20" 
            : "bg-gray-100 border-gray-300 hover:border-gray-400"
        }`}>
          <Settings className={`w-5 h-5 ${isDark ? "text-white/70" : "text-gray-600"}`} />
        </button>
      </div>
    </header>
  )
}