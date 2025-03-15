import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BoardingOrder } from "../types"
import { formatCurrency } from "../utils/helpers"
import { CalendarClock, CheckCircle, AlertTriangle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface StatsCardsProps {
  boardingOrders: BoardingOrder[]
  isLoading?: boolean
}

export function StatsCards({ boardingOrders, isLoading = false }: StatsCardsProps) {
  // Calculate statistics
  const totalBoardings = boardingOrders.length

  const activeBoardings = boardingOrders.filter((order) => order.boardingStatus === "Boarding").length

  const totalRevenue = boardingOrders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((sum, order) => sum + order.totalPrice, 0)

  const overduePickups = boardingOrders.filter((order) => order.isOverdue).length

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[80px]" />
                <Skeleton className="h-3 w-[120px] mt-2" />
              </CardContent>
            </Card>
          ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white dark:bg-gray-950 border-blue-100 dark:border-blue-900/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400">Total Boardings</CardTitle>
          <CalendarClock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{totalBoardings}</div>
          <p className="text-xs text-blue-600/70 dark:text-blue-400/70">
            {boardingOrders.filter((order) => order.boardingStatus === "Released").length} pets released
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-950 border-green-100 dark:border-green-900/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">Active Boardings</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700 dark:text-green-400">{activeBoardings}</div>
          <p className="text-xs text-green-600/70 dark:text-green-400/70">
            {boardingOrders.filter((order) => order.boardingStatus === "Done Boarding").length} ready for pickup
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-950 border-purple-100 dark:border-purple-900/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-400">Total Revenue</CardTitle>
          <span className="text-purple-500 dark:text-purple-400 text-sm font-bold">₱</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{formatCurrency(totalRevenue)}</div>
          <p className="text-xs text-purple-600/70 dark:text-purple-400/70">
            {boardingOrders.filter((order) => order.paymentStatus === "Paid").length} paid boardings
          </p>
        </CardContent>
      </Card>

      <Card
        className={`bg-white dark:bg-gray-950 ${overduePickups > 0 ? "border-red-200 dark:border-red-800/50" : "border-gray-100 dark:border-gray-800"}`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle
            className={`text-sm font-medium ${overduePickups > 0 ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-400"}`}
          >
            Overdue Pickups
          </CardTitle>
          <AlertTriangle
            className={`h-4 w-4 ${overduePickups > 0 ? "text-red-500 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`}
          />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${overduePickups > 0 ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-400"}`}
          >
            {overduePickups}
          </div>
          <p className="text-xs text-muted-foreground">
            {overduePickups > 0 ? "Requires immediate attention" : "No overdue pickups"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

