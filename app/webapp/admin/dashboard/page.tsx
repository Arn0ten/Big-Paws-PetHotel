"use client"

import { Skeleton } from "@/components/ui/skeleton"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// Import modular dashboard components
import { StatCards } from "./components/stat-cards"
import { RequestTrendChart } from "./components/request-trend-chart"
import { RevenueChart } from "./components/revenue-chart"
import { PopularRequestsChart } from "./components/popular-requests-chart"
import { RecentActivityTabs } from "./components/recent-activity-tabs"
import { DashboardDataProvider } from "./context/dashboard-context"

// Update the imports at the top of the file to use the consolidated sample data
import { dashboardStats } from "../data/dashboard-sample-data"

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  interface DashboardData {
    recentRequests: Array<any>;
    requestsTrend: Array<any>;
    popularRequests: Array<any>;
    newOwners: Array<any>;
    // Add other properties as needed
  }

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [revenueView, setRevenueView] = useState<"daily" | "weekly" | "monthly">("daily")
  const router = useRouter()

  // Update the useEffect to properly load and use the sample data
  useEffect(() => {
    /**
     * BACKEND INTEGRATION POINT: Dashboard Data Fetching
     *
     * This function fetches all dashboard data from the backend.
     *
     * API Endpoint: /api/admin/dashboard
     * Method: GET
     * Response: Complete dashboard data object containing all metrics and charts data
     *   - activeBoardings: Number of currently boarding pets
     *   - petCheckouts: Number of completed boardings
     *   - pendingRequests: Number of pending requests
     *   - registeredOwners: Number of registered pet owners
     *   - revenue: Object with daily, weekly, monthly revenue
     *   - requestsTrend: Array of request data over time
     *   - popularRequests: Array of most popular request types
     *   - recentRequests: Array of recent service requests
     *   - newOwners: Array of newly registered pet owners
     *
     * Implementation Notes:
     * 1. Replace the setTimeout with actual API call
     * 2. Handle loading states and errors appropriately
     * 3. Consider implementing data caching for performance
     * 4. Set up polling or WebSocket for real-time updates if needed
     */

    // Simulated API call - replace with actual implementation
    const loadData = async () => {
      try {
        // BACKEND INTEGRATION: Replace this with actual API call
        // const response = await fetch('/api/admin/dashboard');
        // const data = await response.json();
        // setDashboardData(data);

        // Using sample data for now
        setDashboardData(dashboardStats)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()

    // Optional: Set up polling for real-time updates
    const intervalId = setInterval(loadData, 60000) // Update every minute
    return () => clearInterval(intervalId)
  }, [])

  const navigateTo = (path) => {
    router.push(path)
  }

  if (isLoading) {
    return <DashboardSkeleton />
  }

  // Update the return statement to pass the correct data to components
  return (
    <DashboardDataProvider value={{ dashboardData, revenueView, setRevenueView }}>
      <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Admin Jenie!</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none gap-2">
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button className="flex-1 sm:flex-none gap-2" onClick={() => navigateTo("/webapp/admin/registration")}>
              <UserPlus size={16} />
              <span>Add Pet Owner</span>
            </Button>
          </div>
        </div>

        {/* Summary Statistics Cards */}
        <motion.div variants={item}>
          <StatCards data={dashboardData} />
        </motion.div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div variants={item}>
            <RequestTrendChart data={dashboardData?.requestsTrend || []} />
          </motion.div>

          <motion.div variants={item}>
            <RevenueChart />
          </motion.div>
        </div>

        {/* Popular Requests Section */}
        <motion.div variants={item}>
          <PopularRequestsChart data={dashboardData?.popularRequests || []} />
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div variants={item}>
          <RecentActivityTabs
            requests={dashboardData?.recentRequests || []}
            petOwners={dashboardData?.newOwners || []}
          />
        </motion.div>
      </motion.div>
    </DashboardDataProvider>
  )
}

// Skeleton loader component for the dashboard
function DashboardSkeleton() {
  // Skeleton implementation...
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="overflow-hidden border rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
          <Skeleton className="h-[300px] w-full rounded-md" />
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-32 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-[300px] w-full rounded-md" />
        </div>
      </div>

      {/* Recent activity skeleton */}
      {/* ... */}
    </div>
  )
}
