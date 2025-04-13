"use client"

import { useContext } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Download, Printer, Calendar, BarChart3, TrendingUp } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { useToast } from "@/hooks/use-toast"
import { DashboardContext } from "../context/dashboard-context"
import { exportToCsv, printChart } from "../utils/export-utils"

export function RevenueChart() {
  const { toast } = useToast()
  const { dashboardData, revenueView, setRevenueView } = useContext(DashboardContext)

  /**
   * BACKEND INTEGRATION POINT: Revenue Data
   *
   * This component displays revenue data in different time frames (daily, weekly, monthly).
   *
   * API Endpoint: /api/admin/analytics/revenue
   * Method: GET
   * Query Parameters:
   *   - timeFrame: "daily" | "weekly" | "monthly"
   *   - startDate (optional): ISO date string
   *   - endDate (optional): ISO date string
   *
   * Response Format:
   * {
   *   daily: [{ day: "Mon", amount: 1200 }, ...],
   *   weekly: [{ week: "Week 1", amount: 8500 }, ...],
   *   monthly: [{ month: "Jan", amount: 28000 }, ...]
   * }
   *
   * Update Frequency: Daily or on-demand when timeFrame changes
   *
   * Implementation Notes:
   * 1. The chart should update when revenueView changes
   * 2. Consider adding date range picker for custom time ranges
   * 3. Add ability to compare with previous periods
   * 4. Implement data export functionality (CSV, Excel)
   */

  const getRevenueData = () => {
    if (!dashboardData) return []

    switch (revenueView) {
      case "daily":
        return dashboardData.dailyRevenue || []
      case "weekly":
        return dashboardData.weeklyRevenue || []
      case "monthly":
        return dashboardData.monthlyRevenue || []
      default:
        return dashboardData.dailyRevenue || []
    }
  }

  const getRevenueDataKey = () => {
    switch (revenueView) {
      case "daily":
        return "day"
      case "weekly":
        return "week"
      case "monthly":
        return "month"
      default:
        return "day"
    }
  }

  const revenueData = getRevenueData()
  const dataKey = getRevenueDataKey()

  // Handle CSV export
  const handleExportCsv = () => {
    try {
      exportToCsv(revenueData, `revenue-${revenueView}.csv`)
      toast({
        title: "Export successful",
        description: `${revenueView.charAt(0).toUpperCase() + revenueView.slice(1)} revenue data has been exported to CSV`,
      })
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting the data",
        variant: "destructive",
      })
    }
  }

  // Handle chart printing
  const handlePrintChart = () => {
    try {
      printChart("revenue-chart", `${revenueView.charAt(0).toUpperCase() + revenueView.slice(1)} Revenue`)
      toast({
        title: "Print initiated",
        description: "The chart print dialog has been opened",
      })
    } catch (error) {
      toast({
        title: "Print failed",
        description: "There was an error printing the chart",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-foreground">
            {revenueView === "daily" ? "Daily" : revenueView === "weekly" ? "Weekly" : "Monthly"} Revenue
          </CardTitle>
          <CardDescription>Revenue breakdown (in PHP)</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border overflow-hidden">
            <Button
              variant={revenueView === "daily" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setRevenueView("daily")}
            >
              <Calendar className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Daily</span>
            </Button>
            <Button
              variant={revenueView === "weekly" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setRevenueView("weekly")}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Weekly</span>
            </Button>
            <Button
              variant={revenueView === "monthly" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setRevenueView("monthly")}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Monthly</span>
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportCsv}>
                <Download className="mr-2 h-4 w-4 text-blue-500" />
                Download CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePrintChart}>
                <Printer className="mr-2 h-4 w-4 text-purple-500" />
                Print Chart
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]" id="revenue-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" opacity={0.3} />
              <XAxis dataKey={dataKey} tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 12 }}
                width={50}
                tickFormatter={(value) => {
                  // Format large numbers for better readability
                  if (value >= 1000) {
                    return `₱${(value / 1000).toFixed(0)}k`
                  }
                  return `₱${value}`
                }}
              />
              <Tooltip
                formatter={(value) => [`₱${value.toLocaleString()}`, "Revenue"]}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              <Bar dataKey="amount" fill="url(#colorRevenue)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
