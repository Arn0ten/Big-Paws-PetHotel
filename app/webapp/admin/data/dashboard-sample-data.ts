/**
 * DASHBOARD SAMPLE DATA
 *
 * This file contains centralized sample data for the Admin Dashboard module.
 *
 * BACKEND INTEGRATION GUIDE:
 * 1. Replace this sample data with actual API endpoints
 * 2. Create corresponding API routes in /app/api/admin/dashboard/
 * 3. Implement proper data fetching in the dashboard components
 * 4. Add authentication and authorization checks
 * 5. Implement caching strategies for performance optimization
 *
 * Suggested API endpoints:
 * - GET /api/admin/dashboard/stats - Summary statistics
 * - GET /api/admin/dashboard/requests-trend - Request trend data
 * - GET /api/admin/dashboard/revenue - Revenue data
 * - GET /api/admin/dashboard/popular-requests - Popular request types
 * - GET /api/admin/dashboard/recent-activity - Recent requests and new pet owners
 */

// Dashboard statistics - Main data object used by the dashboard
export const dashboardStats = {
  // Summary statistics for the stat cards
  activeBoardings: 12,
  petCheckouts: 45,
  pendingRequests: 8,
  registeredOwners: 78,
  revenue: {
    daily: 15250,
    weekly: 87500,
    monthly: 325000,
  },

  // Request trend data for the line chart
  requestsTrend: [
    { date: "Jun 1", requests: 42 },
    { date: "Jun 2", requests: 45 },
    { date: "Jun 3", requests: 39 },
    { date: "Jun 4", requests: 41 },
    { date: "Jun 5", requests: 48 },
    { date: "Jun 6", requests: 46 },
    { date: "Jun 7", requests: 39 },
    { date: "Jun 8", requests: 42 },
    { date: "Jun 9", requests: 50 },
    { date: "Jun 10", requests: 55 },
    { date: "Jun 11", requests: 48 },
    { date: "Jun 12", requests: 43 },
    { date: "Jun 13", requests: 40 },
    { date: "Jun 14", requests: 45 },
    { date: "Jun 15", requests: 55 },
    { date: "Jun 16", requests: 57 },
    { date: "Jun 17", requests: 60 },
    { date: "Jun 18", requests: 58 },
    { date: "Jun 19", requests: 52 },
    { date: "Jun 20", requests: 54 },
    { date: "Jun 21", requests: 59 },
    { date: "Jun 22", requests: 64 },
    { date: "Jun 23", requests: 61 },
    { date: "Jun 24", requests: 58 },
    { date: "Jun 25", requests: 55 },
    { date: "Jun 26", requests: 52 },
    { date: "Jun 27", requests: 49 },
    { date: "Jun 28", requests: 51 },
    { date: "Jun 29", requests: 54 },
    { date: "Jun 30", requests: 56 },
    // Additional data for 90-day view
    { date: "Jul 1", requests: 58 },
    { date: "Jul 2", requests: 60 },
    // ... more data points for 90 days
  ],

  // Revenue data for the bar chart
  dailyRevenue: [
    { day: "Mon", amount: 12500 },
    { day: "Tue", amount: 15000 },
    { day: "Wed", amount: 18750 },
    { day: "Thu", amount: 16250 },
    { day: "Fri", amount: 21000 },
    { day: "Sat", amount: 22500 },
    { day: "Sun", amount: 19000 },
  ],
  weeklyRevenue: [
    { week: "Week 1", amount: 85000 },
    { week: "Week 2", amount: 92500 },
    { week: "Week 3", amount: 88750 },
    { week: "Week 4", amount: 95000 },
  ],
  monthlyRevenue: [
    { month: "Jan", amount: 280000 },
    { month: "Feb", amount: 250000 },
    { month: "Mar", amount: 310000 },
    { month: "Apr", amount: 285000 },
    { month: "May", amount: 305000 },
    { month: "Jun", amount: 325000 },
  ],

  // Popular requests data for the pie chart
  popularRequests: [
    { name: "Photo", value: 45, color: "#3b82f6" },
    { name: "Video", value: 32, color: "#8b5cf6" },
    { name: "Grooming", value: 28, color: "#ec4899" },
    { name: "Extension", value: 15, color: "#f97316" },
  ],

  // Recent activity data for the tabs
  recentRequests: [
    {
      id: 1,
      ownerName: "John Doe",
      petName: "Buddy",
      petType: "dog",
      service: "Boarding",
      date: "Jun 15, 2023",
      status: "Confirmed",
    },
    {
      id: 2,
      ownerName: "Jane Smith",
      petName: "Whiskers",
      petType: "cat",
      service: "Grooming",
      date: "Jun 14, 2023",
      status: "Pending",
    },
    {
      id: 3,
      ownerName: "Mike Johnson",
      petName: "Rex",
      petType: "dog",
      service: "Photo",
      date: "Jun 13, 2023",
      status: "Confirmed",
    },
    {
      id: 4,
      ownerName: "Sarah Williams",
      petName: "Luna",
      petType: "cat",
      service: "Video",
      date: "Jun 12, 2023",
      status: "Confirmed",
    },
    {
      id: 5,
      ownerName: "David Brown",
      petName: "Max",
      petType: "dog",
      service: "Extension",
      date: "Jun 11, 2023",
      status: "Pending",
    },
  ],
  newOwners: [
    { id: 1, name: "John Doe", email: "john.doe@example.com", pets: 2, lastVisit: "Jun 10, 2023" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", pets: 1, lastVisit: "Jun 9, 2023" },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", pets: 3, lastVisit: "Jun 8, 2023" },
    { id: 4, name: "Sarah Williams", email: "sarah.williams@example.com", pets: 1, lastVisit: "Jun 7, 2023" },
    { id: 5, name: "David Brown", email: "david.brown@example.com", pets: 2, lastVisit: "Jun 6, 2023" },
  ],
}

/**
 * Fetch dashboard data
 * This function simulates an API call to fetch dashboard data
 *
 * BACKEND IMPLEMENTATION:
 * Replace this with actual API calls to your backend services
 *
 * @returns Promise that resolves to dashboard data
 */
export const fetchDashboardData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return dashboardStats
}
