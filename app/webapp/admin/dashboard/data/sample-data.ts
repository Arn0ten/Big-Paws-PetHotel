// /**
//  * ADMIN DASHBOARD MODULE - SAMPLE DATA
//  *
//  * This file contains sample data for the Admin Dashboard module.
//  * In a production environment, this data would be fetched from the backend API.
//  *
//  * BACKEND INTEGRATION NOTES:
//  *
//  * 1. API Endpoints Required:
//  *    - GET /api/dashboard/stats - Fetch dashboard statistics
//  *    - GET /api/dashboard/recent-activity - Fetch recent activity
//  *    - GET /api/dashboard/upcoming-pickups - Fetch upcoming pickups
//  *    - GET /api/dashboard/revenue - Fetch revenue data
//  *
//  * 2. Data Models:
//  *    - DashboardStats: totalPets, activeBoardings, pendingRequests, revenue
//  *    - RecentActivity: id, type, description, timestamp, relatedId
//  *    - UpcomingPickup: id, petName, ownerName, endDate, contactInfo
//  *    - RevenueData: daily[], weekly[], monthly[]
//  *
//  * 3. Data Transformation:
//  *    - Convert ISO date strings to Date objects if needed
//  *    - Format currency values for display
//  *    - Calculate time differences for relative time display
//  */

// // Dashboard statistics
// export const dashboardStats = {
//   totalPets: 42,
//   activeBoardings: 18,
//   pendingRequests: 7,
//   revenue: {
//     today: 1250,
//     thisWeek: 8750,
//     thisMonth: 32500,
//     growth: 12.5, // percentage growth compared to previous period
//   },
// }

// // Recent activity
// export const recentActivity = [
//   {
//     id: "act-001",
//     type: "boarding",
//     description: "New boarding: Max (Golden Retriever)",
//     timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
//     relatedId: "board-001",
//   },
//   {
//     id: "act-002",
//     type: "request",
//     description: "Photo request completed for Bella",
//     timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
//     relatedId: "req-002",
//   },
//   {
//     id: "act-003",
//     type: "payment",
//     description: "Payment received: $350 for Charlie's boarding",
//     timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
//     relatedId: "payment-003",
//   },
//   {
//     id: "act-004",
//     type: "boarding",
//     description: "Pet released: Luna (Maine Coon)",
//     timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
//     relatedId: "board-004",
//   },
//   {
//     id: "act-005",
//     type: "request",
//     description: "New grooming request for Rocky",
//     timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
//     relatedId: "req-005",
//   },
// ]

// // Upcoming pickups
// export const upcomingPickups = [
//   {
//     id: "pickup-001",
//     petName: "Bella",
//     petType: "Cat",
//     ownerName: "Sarah Johnson",
//     endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
//     contactInfo: "(555) 987-6543",
//   },
//   {
//     id: "pickup-002",
//     petName: "Charlie",
//     petType: "Dog",
//     ownerName: "Michael Brown",
//     endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
//     contactInfo: "(555) 456-7890",
//   },
//   {
//     id: "pickup-003",
//     petName: "Max",
//     petType: "Dog",
//     ownerName: "John Smith",
//     endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
//     contactInfo: "(555) 123-4567",
//   },
//   {
//     id: "pickup-004",
//     petName: "Luna",
//     petType: "Cat",
//     ownerName: "Emily Davis",
//     endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
//     contactInfo: "(555) 234-5678",
//   },
// ]

// // Revenue data for charts
// export const revenueData = {
//   daily: [
//     { date: "Mon", revenue: 1200 },
//     { date: "Tue", revenue: 1500 },
//     { date: "Wed", revenue: 1100 },
//     { date: "Thu", revenue: 1800 },
//     { date: "Fri", revenue: 2100 },
//     { date: "Sat", revenue: 1700 },
//     { date: "Sun", revenue: 1300 },
//   ],
//   weekly: [
//     { date: "Week 1", revenue: 8500 },
//     { date: "Week 2", revenue: 7800 },
//     { date: "Week 3", revenue: 9200 },
//     { date: "Week 4", revenue: 8750 },
//   ],
//   monthly: [
//     { date: "Jan", revenue: 28000 },
//     { date: "Feb", revenue: 25500 },
//     { date: "Mar", revenue: 27800 },
//     { date: "Apr", revenue: 31200 },
//     { date: "May", revenue: 29800 },
//     { date: "Jun", revenue: 32500 },
//   ],
// }

// // Occupancy data for charts
// export const occupancyData = {
//   current: 75, // percentage
//   byPetType: [
//     { type: "Dog", count: 12 },
//     { type: "Cat", count: 6 },
//   ],
//   byRoomType: [
//     { type: "Standard", count: 8, capacity: 10 },
//     { type: "Deluxe", count: 6, capacity: 8 },
//     { type: "Premium", count: 4, capacity: 6 },
//   ],
// }
