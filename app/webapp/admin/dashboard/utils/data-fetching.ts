/**
 * Dashboard Data Fetching Utilities
 *
 * This file contains functions for fetching dashboard data from the backend.
 *
 * BACKEND INTEGRATION GUIDE:
 *
 * 1. API Endpoints Required:
 *    - GET /api/admin/dashboard - Main dashboard data
 *    - GET /api/admin/analytics/request-trends - Request trend data
 *    - GET /api/admin/analytics/revenue - Revenue data
 *    - GET /api/admin/analytics/popular-requests - Popular requests data
 *    - GET /api/admin/recent-activity - Recent activity data
 *
 * 2. Authentication:
 *    - All endpoints should require admin authentication
 *    - Include authorization headers in all requests
 *
 * 3. Error Handling:
 *    - Implement proper error handling for API failures
 *    - Consider implementing retry logic for transient failures
 *
 * 4. Caching:
 *    - Consider implementing client-side caching for performance
 *    - Use stale-while-revalidate pattern for optimal UX
 */

// Fetch all dashboard data
export async function fetchDashboardData() {
  try {
    // In a real implementation, this would be an API call
    // Example:
    // const response = await fetch('/api/admin/dashboard', {
    //   headers: {
    //     'Authorization': `Bearer ${getAuthToken()}`,
    //   },
    // });
    // if (!response.ok) throw new Error('Failed to fetch dashboard data');
    // return await response.json();

    // For now, return mock data
    return getMockDashboardData()
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    throw error
  }
}

// Fetch request trend data
export async function fetchRequestTrends(timeRange = "30days") {
  try {
    // In a real implementation, this would be an API call
    // Example:
    // const response = await fetch(`/api/admin/analytics/request-trends?timeRange=${timeRange}`, {
    //   headers: {
    //     'Authorization': `Bearer ${getAuthToken()}`,
    //   },
    // });
    // if (!response.ok) throw new Error('Failed to fetch request trends');
    // return await response.json();

    // For now, return mock data
    const mockData = getMockDashboardData()
    return mockData.requestsTrend
  } catch (error) {
    console.error("Error fetching request trends:", error)
    throw error
  }
}

// Fetch revenue data
export async function fetchRevenueData(timeFrame = "daily") {
  try {
    // In a real implementation, this would be an API call
    // Example:
    // const response = await fetch(`/api/admin/analytics/revenue?timeFrame=${timeFrame}`, {
    //   headers: {
    //     'Authorization': `Bearer ${getAuthToken()}`,
    //   },
    // });
    // if (!response.ok) throw new Error('Failed to fetch revenue data');
    // return await response.json();

    // For now, return mock data
    const mockData = getMockDashboardData()
    switch (timeFrame) {
      case "daily":
        return mockData.dailyRevenue
      case "weekly":
        return mockData.weeklyRevenue
      case "monthly":
        return mockData.monthlyRevenue
      default:
        return mockData.dailyRevenue
    }
  } catch (error) {
    console.error("Error fetching revenue data:", error)
    throw error
  }
}

// Fetch popular requests data
export async function fetchPopularRequests(period = "month") {
  try {
    // In a real implementation, this would be an API call
    // Example:
    // const response = await fetch(`/api/admin/analytics/popular-requests?period=${period}`, {
    //   headers: {
    //     'Authorization': `Bearer ${getAuthToken()}`,
    //   },
    // });
    // if (!response.ok) throw new Error('Failed to fetch popular requests');
    // return await response.json();

    // For now, return mock data
    const mockData = getMockDashboardData()
    return mockData.popularRequests
  } catch (error) {
    console.error("Error fetching popular requests:", error)
    throw error
  }
}

// Fetch recent activity data
export async function fetchRecentActivity(type = "all", limit = 5) {
  try {
    // In a real implementation, this would be an API call
    // Example:
    // const response = await fetch(`/api/admin/recent-activity?type=${type}&limit=${limit}`, {
    //   headers: {
    //     'Authorization': `Bearer ${getAuthToken()}`,
    //   },
    // });
    // if (!response.ok) throw new Error('Failed to fetch recent activity');
    // return await response.json();

    // For now, return mock data
    const mockData = getMockDashboardData()
    return {
      recentBookings: mockData.recentBookings,
      recentCustomers: mockData.recentCustomers,
    }
  } catch (error) {
    console.error("Error fetching recent activity:", error)
    throw error
  }
}

// Mock data function - replace with actual API calls in production
function getMockDashboardData() {
  return {
    activeBoardings: 42,
    petCheckouts: 76,
    pendingRequests: 24,
    registeredOwners: 124,
    revenue: {
      daily: 5680,
      weekly: 32450,
      monthly: 145680,
    },
    recentBookings: [
      {
        id: 1,
        customerName: "John Doe",
        petName: "Buddy",
        petType: "dog",
        service: "Boarding",
        date: "2023-06-15",
        status: "Confirmed",
      },
      {
        id: 2,
        customerName: "Jane Smith",
        petName: "Whiskers",
        petType: "cat",
        service: "Grooming",
        date: "2023-06-16",
        status: "Pending",
      },
      {
        id: 3,
        customerName: "Mike Johnson",
        petName: "Rex",
        petType: "dog",
        service: "Daycare",
        date: "2023-06-17",
        status: "Confirmed",
      },
      {
        id: 4,
        customerName: "Sarah Williams",
        petName: "Luna",
        petType: "cat",
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
    requestsTrend: Array.from({ length: 30 }, (_, i) => ({
      date: `Jun ${i + 1}`,
      requests: Math.floor(Math.random() * 50) + 30,
    })),
    dailyRevenue: Array.from({ length: 7 }, (_, i) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
      amount: Math.floor(Math.random() * 5000) + 2000,
    })),
    weeklyRevenue: Array.from({ length: 4 }, (_, i) => ({
      week: `Week ${i + 1}`,
      amount: Math.floor(Math.random() * 15000) + 10000,
    })),
    monthlyRevenue: Array.from({ length: 6 }, (_, i) => ({
      month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
      amount: Math.floor(Math.random() * 50000) + 30000,
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
}
