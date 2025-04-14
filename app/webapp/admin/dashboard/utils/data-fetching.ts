/**
 * Data fetching utilities for the dashboard
 *
 * BACKEND INTEGRATION POINT:
 * Replace these functions with actual API calls to your backend services
 */

import { dashboardStats } from "../../data/dashboard-sample-data"

/**
 * Fetch dashboard summary statistics
 * @returns Promise that resolves to dashboard statistics
 */
export const fetchDashboardStats = async () => {
  // BACKEND INTEGRATION: Replace with actual API call
  // const response = await fetch('/api/admin/dashboard/stats');
  // return response.json();

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return dashboardStats
}

/**
 * Fetch request trend data
 * @param timeRange Time range for the data (7days, 30days, 90days)
 * @returns Promise that resolves to request trend data
 */
export const fetchRequestTrend = async (timeRange = "30days") => {
  // BACKEND INTEGRATION: Replace with actual API call
  // const response = await fetch(`/api/admin/dashboard/requests-trend?timeRange=${timeRange}`);
  // return response.json();

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return dashboardStats.requestsTrend
}

/**
 * Fetch revenue data
 * @param timeFrame Time frame for the data (daily, weekly, monthly)
 * @returns Promise that resolves to revenue data
 */
export const fetchRevenueData = async (timeFrame = "daily") => {
  // BACKEND INTEGRATION: Replace with actual API call
  // const response = await fetch(`/api/admin/dashboard/revenue?timeFrame=${timeFrame}`);
  // return response.json();

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  switch (timeFrame) {
    case "daily":
      return dashboardStats.dailyRevenue
    case "weekly":
      return dashboardStats.weeklyRevenue
    case "monthly":
      return dashboardStats.monthlyRevenue
    default:
      return dashboardStats.dailyRevenue
  }
}

/**
 * Fetch popular requests data
 * @param period Time period for the data (week, month, year)
 * @returns Promise that resolves to popular requests data
 */
export const fetchPopularRequests = async (period = "month") => {
  // BACKEND INTEGRATION: Replace with actual API call
  // const response = await fetch(`/api/admin/dashboard/popular-requests?period=${period}`);
  // return response.json();

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return dashboardStats.popularRequests
}

/**
 * Fetch recent activity data
 * @param type Type of activity data to fetch (requests, petOwners, all)
 * @param limit Maximum number of items to fetch
 * @returns Promise that resolves to recent activity data
 */
export const fetchRecentActivity = async (type = "all", limit = 5) => {
  // BACKEND INTEGRATION: Replace with actual API call
  // const response = await fetch(`/api/admin/dashboard/recent-activity?type=${type}&limit=${limit}`);
  // return response.json();

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (type === "requests") {
    return { recentRequests: dashboardStats.recentRequests.slice(0, limit) }
  } else if (type === "petOwners") {
    return { newOwners: dashboardStats.newOwners.slice(0, limit) }
  } else {
    return {
      recentRequests: dashboardStats.recentRequests.slice(0, limit),
      newOwners: dashboardStats.newOwners.slice(0, limit),
    }
  }
}
