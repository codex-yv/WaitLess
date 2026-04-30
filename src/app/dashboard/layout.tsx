import React from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-[var(--bg-0)] text-[var(--text-primary)] overflow-hidden relative selection:bg-purple-500/30 transition-colors duration-300">
      {/* Global Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none dark:opacity-100 opacity-50" />

      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 w-full">
        <Header />
        <main className="flex-1 overflow-y-auto w-full p-8 pb-20 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  )
}
