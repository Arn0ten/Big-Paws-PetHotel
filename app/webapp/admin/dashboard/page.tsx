"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  PawPrint,
  Users,
  DollarSign,
  Loader2,
  Camera,
  Video,
  Scissors,
  Clock,
  Home,
  CheckCircle,
  Bell,
  UserPlus,
  MoreHorizontal,
  Download,
  Printer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// =============================================
// BACKEND INTEGRATION POINT
// =============================================
// Replace this mock data with actual API calls
// Example:
// const fetchDashboardStats = async () => {
//   const response = await fetch('/api/admin/dashboard/stats');
//   return response.json();
// }
// =============================================

const mockStats = {
  petsBoarding: 42,
  roomVacancy: 18,
  petCheckouts: 76,
  pendingRequests: 24,
  registeredOwners: 124,
  monthlyRevenue: 45680,
  recentBookings: [
    { id: 1, customerName: "John Doe", petName: "Buddy", service: "Boarding", date: "2023-06-15", status: "Confirmed" },
    {
      id: 2,
      customerName: "Jane Smith",
      petName: "Whiskers",
      service: "Grooming",
      date: "2023-06-16",
      status: "Pending",
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      petName: "Rex",
      service: "Daycare",
      date: "2023-06-17",
      status: "Confirmed",
    },
    {
      id: 4,
      customerName: "Sarah Williams",
      petName: "Luna",
      service: "Boarding",
      date: "2023-06-18",
      status: "Confirmed",
    },
  ],
  recentCustomers: [
    { id: 1, name: "John Doe", email: "john.doe@example.com", pets: 2, lastVisit: "2023-06-10" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", pets: 1, lastVisit: "2023-06-08" },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", pets: 3, lastVisit: "2023-06-12" },
  ],
  // =============================================
  // BACKEND INTEGRATION POINT - CHARTS DATA
  // =============================================
  // Replace these arrays with data from your API
  // =============================================
  requestsTrend: Array.from({ length: 30 }, (_, i) => ({
    date: `Jun ${i + 1}`,
    requests: Math.floor(Math.random() * 50) + 30,
  })),
  dailyRevenue: Array.from({ length: 7 }, (_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    amount: Math.floor(Math.random() * 5000) + 2000,
  })),
  popularRequests: [
    { name: "Photo", value: 45, color: "#3b82f6" },
    { name: "Video", value: 32, color: "#8b5cf6" },
    { name: "Grooming", value: 28, color: "#ec4899" },
    { name: "Extension", value: 15, color: "#f97316" },
  ],
  occupancyRate: [
    { month: "Jan", rate: 65 },
    { month: "Feb", rate: 72 },
    { month: "Mar", rate: 68 },
    { month: "Apr", rate: 75 },
    { month: "May", rate: 82 },
    { month: "Jun", rate: 88 },
  ],
}

// Animation variants for summary card icons
const iconAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    scale: 1.1,
    rotate: [0, -10, 10, -5, 5, 0],
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 300,
    },
  },
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(mockStats)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // =============================================
    // BACKEND INTEGRATION POINT - DATA FETCHING
    // =============================================
    // Replace this with your actual API call
    // Example:
    // const fetchData = async () => {
    //   try {
    //     const data = await fetchDashboardStats();
    //     setStats(data);
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching dashboard data:", error);
    //     setIsLoading(false);
    //   }
    // };
    // fetchData();
    // =============================================

    // Simulate API call to fetch stats
    setTimeout(() => {
      setStats(mockStats)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

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

  return (
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
          <Button className="flex-1 sm:flex-none gap-2">
            <UserPlus size={16} />
            <span>Add Pet Owner</span>
          </Button>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4"
        variants={container}
      >
        <motion.div variants={item}>
          <Card className="overflow-hidden border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Pets Boarding</CardTitle>
              <motion.div
                className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30"
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={iconAnimation}
              >
                <PawPrint className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.petsBoarding}</div>
              <div className="text-xs text-muted-foreground mt-1 w-full">Currently boarding pets</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-l-4 border-l-indigo-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Room Vacancy</CardTitle>
              <motion.div
                className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30"
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={iconAnimation}
              >
                <Home className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.roomVacancy}</div>
              <div className="text-xs text-muted-foreground mt-1 w-full">Available rooms</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Pet Checkouts</CardTitle>
              <motion.div
                className="rounded-full bg-green-100 p-2 dark:bg-green-900/30"
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={iconAnimation}
              >
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.petCheckouts}</div>
              <div className="text-xs text-muted-foreground mt-1 w-full">Monthly checkouts</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Pending Requests</CardTitle>
              <motion.div
                className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30"
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={iconAnimation}
              >
                <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.pendingRequests}</div>
              <div className="text-xs text-muted-foreground mt-1 w-full">Awaiting response</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Registered Owners</CardTitle>
              <motion.div
                className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/30"
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={iconAnimation}
              >
                <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.registeredOwners}</div>
              <div className="text-xs text-muted-foreground mt-1 w-full">Total pet owners</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-l-4 border-l-pink-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Revenue</CardTitle>
              <motion.div
                className="rounded-full bg-pink-100 p-2 dark:bg-pink-900/30"
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={iconAnimation}
              >
                <DollarSign className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₱{stats.monthlyRevenue.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1 w-full">This month</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Request Trend</CardTitle>
                <CardDescription>Pet owner service requests over time</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Printer className="mr-2 h-4 w-4" />
                    Print Chart
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.requestsTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" opacity={0.3} />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        // On small screens, show fewer ticks
                        if (window.innerWidth < 768) {
                          // Only show every 5th date
                          const day = Number.parseInt(value.split(" ")[1])
                          return day % 5 === 0 ? `${day}` : ""
                        }
                        return value
                      }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(255,255,0.9)",
                        // borderRadius: "8px",
                        // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "none",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="requests"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorRequests)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Daily Revenue</CardTitle>
                <CardDescription>Revenue breakdown by day (in PHP)</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Printer className="mr-2 h-4 w-4" />
                    Print Chart
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.dailyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" opacity={0.3} />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 12 }}
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
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-foreground">Popular Requests</CardTitle>
              <CardDescription>Most requested services by pet owners</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-4">
              <div className="w-full lg:w-1/2 h-[250px] mb-6 lg:mb-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Pie
                      data={stats.popularRequests}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => {
                        // On small screens, show only percentages without labels
                        if (window.innerWidth < 640) {
                          return `${(percent * 100).toFixed(0)}%`
                        }
                        // On medium screens, show abbreviated labels
                        else if (window.innerWidth < 1024) {
                          return `${name.substring(0, 1)}. ${(percent * 100).toFixed(0)}%`
                        }
                        // On large screens, show full labels
                        return `${name} ${(percent * 100).toFixed(0)}%`
                      }}
                    >
                      {stats.popularRequests.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [value, "Requests"]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "none",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <motion.div
                    className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Camera className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Photo Requests</p>
                    <p className="text-xl font-bold text-foreground">{stats.popularRequests[0].value}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <motion.div
                    className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Video className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Video Requests</p>
                    <p className="text-xl font-bold text-foreground">{stats.popularRequests[1].value}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <motion.div
                    className="rounded-full bg-pink-100 p-2 dark:bg-pink-900/30 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Scissors className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Grooming</p>
                    <p className="text-xl font-bold text-foreground">{stats.popularRequests[2].value}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <motion.div
                    className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/30 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Extensions</p>
                    <p className="text-xl font-bold text-foreground">{stats.popularRequests[3].value}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-foreground">Occupancy Rate</CardTitle>
              <CardDescription>Monthly occupancy rate percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.occupancyRate} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" opacity={0.3} />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Occupancy Rate"]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "none",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 6, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 8, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
                    />
                    <Area type="monotone" dataKey="rate" fill="url(#colorOccupancy)" fillOpacity={0.3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
            <CardDescription>Latest requests and registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="requests">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="requests">Recent Requests</TabsTrigger>
                <TabsTrigger value="owners">New Owners</TabsTrigger>
              </TabsList>
              <TabsContent value="requests" className="mt-0">
                <div className="space-y-4">
                  {stats.recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50 gap-2 sm:gap-0"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="rounded-full bg-primary/10 p-2"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <PawPrint className="h-5 w-5 text-primary" />
                        </motion.div>
                        <div>
                          <p className="font-medium text-foreground">{booking.customerName}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.service} - {booking.petName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 ml-11 sm:ml-0">
                        <div className="text-sm text-muted-foreground">{booking.date}</div>
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            booking.status === "Confirmed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="owners" className="mt-0">
                <div className="space-y-4">
                  {stats.recentCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50 gap-2 sm:gap-0"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/30"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </motion.div>
                        <div>
                          <p className="font-medium text-foreground">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 ml-11 sm:ml-0">
                        <div className="text-sm text-muted-foreground">Pets: {customer.pets}</div>
                        <div className="text-sm text-muted-foreground">Joined: {customer.lastVisit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

