import { Hero } from "@/components/dashboard/Hero"
import { DashboardContent } from "./DashboardContent.tsx"

export const metadata = {
  title: "Dashboard - WaitLess Control Center",
  description: "Modern Queue Management Dashboard",
}

export default function DashboardPage() {
  return (
    <div className="max-w-[1600px] mx-auto w-full flex flex-col pt-2">
      <Hero />
      <DashboardContent />
    </div>
  )
}
