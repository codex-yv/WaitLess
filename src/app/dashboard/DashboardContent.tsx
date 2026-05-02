"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { AnalyticsGrid } from "@/components/dashboard/Analytics"
import { getAdminDashboard } from "@/api/api-functions/adminDashboard"
import wsManager from "@/api/websocket"

export function DashboardContent() {
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

  return (
    <>
      <StatsGrid dashboardData={dashboardData} loading={loading} />
      <AnalyticsGrid dashboardData={dashboardData} loading={loading} />
    </>
  )
}
