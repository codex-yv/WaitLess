"use client";

import React, { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { Header } from "@/components/client/Header"
import { Timeline } from "@/components/client/Timeline"
import { ActionButtons } from "@/components/client/ActionButtons"
import { Footer } from "@/components/client/Footer"
import { useTheme } from "@/contexts/ThemeContext"
import { reScanQR } from "@/api/api-functions/clientForm"
import { useRouter } from "next/navigation"
import clsx from "clsx"

export default function ClientPageContent() {
  const { isDark, mounted } = useTheme()
  const router = useRouter()
  const [isUnauthorized, setIsUnauthorized] = useState(false)

  useEffect(() => {
    if (!mounted) return
    const fetchStatus = async () => {
      try {
        const response = await reScanQR()
        if (response.status) {
          setIsUnauthorized(false)
          localStorage.setItem("current_pos", String(response.current_pos))
          localStorage.setItem("your_spot", String(response.your_spot))
          localStorage.setItem("expected_time", String(response.expected_time))
          window.dispatchEvent(new Event("queueUpdate"))
        } else if (response.statusCode === 401) {
          setIsUnauthorized(true)
        }
      } catch (err) {
        console.error("Error fetching rescan status:", err)
      }
    }
    fetchStatus()
  }, [mounted])

  if (!mounted) {
    return null
  }

  return (
    <main
      className={clsx(
        "min-h-screen relative",
        isDark
          ? "bg-gradient-to-b from-[#05070d] via-[#060a14] to-[#04060c]"
          : "bg-gradient-to-br from-[#f5f6fa] via-[#eef1f7] to-[#e6e9f2]"
      )}
    >
      {isDark && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
      )}
      <div
        className={clsx(
          "max-w-[420px] mx-auto min-h-screen px-5 relative",
          isDark
            ? "shadow-[inset_0_0_120px_rgba(0,0,0,0.3)]"
            : "shadow-[inset_0_0_120px_rgba(0,0,0,0.05)]"
        )}
      >
        <Header />

        {isUnauthorized ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center text-2xl font-bold animate-pulse">?</div>
            <h2 className={clsx("text-xl font-bold", isDark ? "text-white" : "text-gray-900")}>No Active Ticket</h2>
            <p className={clsx("text-sm max-w-[280px] mx-auto", isDark ? "text-gray-400" : "text-gray-500")}>
              Please fill and submit the form to join the queue and get your spot.
            </p>
            <button 
              onClick={() => router.push("/")}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer shadow-lg shadow-indigo-500/25"
            >
              Go to Forms
            </button>
          </div>
        ) : (
          <>
            <section className="text-center mt-6">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" strokeWidth={2} />
                <h2
                  className={clsx(
                    "text-xl font-semibold",
                    isDark ? "text-white" : "text-gray-900"
                  )}
                >
                  You're in line
                </h2>
              </div>
              <p
                className={clsx(
                  "text-sm mt-1",
                  isDark ? "text-gray-400" : "text-gray-500"
                )}
              >
                Your turn is approaching
              </p>
            </section>

            <Timeline />

            <ActionButtons />
          </>
        )}

        <Footer />
      </div>
    </main>
  )
}
