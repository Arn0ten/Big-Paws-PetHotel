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

import { dashboardData } from "../../data/dashboard-sample-data"

/**
 * Fetch dashboard data
 * This function simulates an API call to fetch dashboard data
 * @returns Promise that resolves to dashboard data
 */
export const fetchDashboardData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return dashboardData
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

    // Return data from the consolidated sample data
    return dashboardData.requestsTrend
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

    // Return data from the consolidated sample data
    switch (timeFrame) {
      case "daily":
        return dashboardData.revenueData.daily
      case "weekly":
        return dashboardData.revenueData.weekly
      case "monthly":
        return dashboardData.revenueData.monthly
      default:
        return dashboardData.revenueData.daily
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

    // Return data from the consolidated sample data
    return dashboardData.popularRequests
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

    // Return data from the consolidated sample data
    return {
      recentActivity: dashboardData.recentActivity.slice(0, limit),
      upcomingPickups: dashboardData.upcomingPickups.slice(0, limit),
    }
  } catch (error) {
    console.error("Error fetching recent activity:", error)
    throw error
  }
}
