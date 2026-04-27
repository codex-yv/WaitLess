import React from "react"
import { Hero } from "@/components/dashboard/Hero"
import { Tabs } from "@/components/dashboard/Tabs"
import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { AnalyticsGrid } from "@/components/dashboard/Analytics"
import { ActivityList } from "@/components/dashboard/ActivityList"

export const metadata = {
  title: "Dashboard - WaitLess Control Center",
  description: "Modern Queue Management Dashboard",
}

export default function DashboardPage() {
  return (
    <div className="max-w-[1600px] mx-auto w-full flex flex-col pt-2">
      <Hero />
      <Tabs />
      <StatsGrid />
      <AnalyticsGrid />
      <ActivityList />
    </div>
  )
}
