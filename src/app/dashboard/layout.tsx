import React from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-[#0d1117] text-white overflow-hidden relative selection:bg-purple-500/30">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 w-full">
        <Header />
        <main className="flex-1 overflow-y-auto w-full p-6 pb-20 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  )
}