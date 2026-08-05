"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs } from "@/components/dashboard/Tabs"
import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { AnalyticsGrid } from "@/components/dashboard/Analytics"
import { ActivityList } from "@/components/dashboard/ActivityList"
import { getAdminDashboard, getAdminDashboardActivity } from "@/api/api-functions/adminDashboard"
import wsManager from "@/api/websocket"
import { Loader2 } from "lucide-react"

export function DashboardContent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("Overview")
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Activity tab state
  const [activityData, setActivityData] = useState<any[] | null>(null)
  const [activityLoading, setActivityLoading] = useState(false)

  useEffect(() => {
    // Connect to WebSocket on page load/refresh if admin_id exists
    const adminId = localStorage.getItem('admin_id')
    if (adminId) {
      wsManager.connect(adminId)
    }

    const fetchDashboardData = async () => {
      try {
        const data = await getAdminDashboard()
        if (data.status) {
          setDashboardData(data.data)
        } else {
          console.error('Failed to fetch dashboard data:', data.message)
        }
      } catch (error: any) {
        if (error?.response?.status === 401 || error?.status === 401) {
          // Redirect to login on 401 error
          localStorage.removeItem('access_token')
          localStorage.removeItem('temp_data')
          localStorage.removeItem('admin_id')
          router.push('/login')
        } else {
          console.error('Error fetching dashboard data:', error)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [router])

  const handleTabChange = async (tab: string) => {
    setActiveTab(tab)
    if (tab === "Activity") {
      setActivityLoading(true)
      try {
        const res = await getAdminDashboardActivity()
        if (res && (res.status || Array.isArray(res.data) || Array.isArray(res))) {
          const list = Array.isArray(res.data)
            ? res.data
            : (Array.isArray(res) ? res : (res.data?.activity || res.activity || []))
          setActivityData(list)
        } else {
          const list = Array.isArray(res?.data) ? res.data : []
          setActivityData(list)
        }
      } catch (err) {
        console.error("Error fetching activity data on tab click:", err)
      } finally {
        setActivityLoading(false)
      }
    }
  }

  return (
    <div className="w-full flex flex-col">
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === "Activity" ? (
        activityLoading ? (
          <div className="w-full py-24 flex flex-col items-center justify-center space-y-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all">
            <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
            <p className="text-sm font-medium text-gray-400">Loading activity log...</p>
          </div>
        ) : (
          <ActivityList customActivities={activityData || []} loading={false} />
        )
      ) : (
        <>
          <StatsGrid dashboardData={dashboardData} loading={loading} />
          <AnalyticsGrid dashboardData={dashboardData} loading={loading} />
          <ActivityList dashboardData={dashboardData} loading={loading} />
        </>
      )}
    </div>
  )
}
