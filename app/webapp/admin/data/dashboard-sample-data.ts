/**
 * DASHBOARD SAMPLE DATA
 *
 * This file contains centralized sample data for the Admin Dashboard module.
 */

// Dashboard statistics
export const dashboardStats = {
  totalPets: 42,
  activeBoardings: 18,
  pendingRequests: 7,
  revenue: {
    today: 1250,
    thisWeek: 8750,
    thisMonth: 32500,
    growth: 12.5, // percentage growth compared to previous period
  },
}

// Recent activity
export const recentActivity = [
  {
    id: "act-001",
    type: "boarding",
    description: "New boarding: Max (Golden Retriever)",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    relatedId: "board-001",
  },
  {
    id: "act-002",
    type: "request",
    description: "Photo request completed for Bella",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    relatedId: "req-002",
  },
  {
    id: "act-003",
    type: "payment",
    description: "Payment received: $350 for Charlie's boarding",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    relatedId: "payment-003",
  },
  {
    id: "act-004",
    type: "boarding",
    description: "Pet released: Luna (Maine Coon)",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    relatedId: "board-004",
  },
  {
    id: "act-005",
    type: "request",
    description: "New grooming request for Rocky",
    timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
    relatedId: "req-005",
  },
]

// Upcoming pickups
export const upcomingPickups = [
  {
    id: "pickup-001",
    petName: "Bella",
    petType: "Cat",
    ownerName: "Sarah Johnson",
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    contactInfo: "(555) 987-6543",
  },
  {
    id: "pickup-002",
    petName: "Charlie",
    petType: "Dog",
    ownerName: "Michael Brown",
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    contactInfo: "(555) 456-7890",
  },
  {
    id: "pickup-003",
    petName: "Max",
    petType: "Dog",
    ownerName: "John Smith",
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    contactInfo: "(555) 123-4567",
  },
  {
    id: "pickup-004",
    petName: "Luna",
    petType: "Cat",
    ownerName: "Emily Davis",
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    contactInfo: "(555) 234-5678",
  },
]

// Revenue data for charts
export const revenueData = {
  daily: [
    { date: "Mon", revenue: 1200 },
    { date: "Tue", revenue: 1500 },
    { date: "Wed", revenue: 1100 },
    { date: "Thu", revenue: 1800 },
    { date: "Fri", revenue: 2100 },
    { date: "Sat", revenue: 1700 },
    { date: "Sun", revenue: 1300 },
  ],
  weekly: [
    { date: "Week 1", revenue: 8500 },
    { date: "Week 2", revenue: 7800 },
    { date: "Week 3", revenue: 9200 },
    { date: "Week 4", revenue: 8750 },
  ],
  monthly: [
    { date: "Jan", revenue: 28000 },
    { date: "Feb", revenue: 25500 },
    { date: "Mar", revenue: 27800 },
    { date: "Apr", revenue: 31200 },
    { date: "May", revenue: 29800 },
    { date: "Jun", revenue: 32500 },
  ],
}

// Occupancy data for charts
export const occupancyData = {
  current: 75, // percentage
  byPetType: [
    { type: "Dog", count: 12 },
    { type: "Cat", count: 6 },
  ],
  byRoomType: [
    { type: "Standard", count: 8, capacity: 10 },
    { type: "Deluxe", count: 6, capacity: 8 },
    { type: "Premium", count: 4, capacity: 6 },
  ],
}

// Request trend data
export const requestTrend = [
  { date: "Jun 1", requests: 42 },
  { date: "Jun 2", requests: 45 },
  { date: "Jun 3", requests: 39 },
  { date: "Jun 4", requests: 52 },
  { date: "Jun 5", requests: 48 },
  { date: "Jun 6", requests: 53 },
  { date: "Jun 7", requests: 41 },
  { date: "Jun 8", requests: 55 },
  { date: "Jun 9", requests: 49 },
  { date: "Jun 10", requests: 57 },
  { date: "Jun 11", requests: 62 },
  { date: "Jun 12", requests: 58 },
  { date: "Jun 13", requests: 54 },
  { date: "Jun 14", requests: 60 },
  { date: "Jun 15", requests: 55 },
  { date: "Jun 16", requests: 59 },
  { date: "Jun 17", requests: 63 },
  { date: "Jun 18", requests: 58 },
  { date: "Jun 19", requests: 65 },
  { date: "Jun 20", requests: 59 },
  { date: "Jun 21", requests: 64 },
  { date: "Jun 22", requests: 68 },
  { date: "Jun 23", requests: 65 },
  { date: "Jun 24", requests: 70 },
  { date: "Jun 25", requests: 72 },
  { date: "Jun 26", requests: 68 },
  { date: "Jun 27", requests: 75 },
  { date: "Jun 28", requests: 70 },
  { date: "Jun 29", requests: 74 },
  { date: "Jun 30", requests: 78 },
]

// Popular requests data
export const popularRequests = [
  { name: "Photo", value: 45, color: "#3b82f6" },
  { name: "Video", value: 32, color: "#8b5cf6" },
  { name: "Grooming", value: 28, color: "#ec4899" },
  { name: "Extension", value: 15, color: "#f97316" },
]

// Recent bookings data
export const recentBookings = [
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
    customerName: "Maria Garcia",
    petName: "Luna",
    petType: "cat",
    service: "Grooming",
    date: "2023-06-16",
    status: "Pending",
  },
  {
    id: 3,
    customerName: "Robert Santos",
    petName: "Charlie",
    petType: "dog",
    service: "Photo Request",
    date: "2023-06-16",
    status: "Confirmed",
  },
  {
    id: 4,
    customerName: "Sarah Johnson",
    petName: "Bella",
    petType: "cat",
    service: "Boarding Extension",
    date: "2023-06-17",
    status: "Confirmed",
  },
  {
    id: 5,
    customerName: "Michael Brown",
    petName: "Max",
    petType: "dog",
    service: "Video Request",
    date: "2023-06-17",
    status: "Pending",
  },
]

// Recent customers data
export const recentCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    pets: 2,
    lastVisit: "2023-06-10",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    pets: 1,
    lastVisit: "2023-06-12",
  },
  {
    id: 3,
    name: "Robert Santos",
    email: "robert.santos@example.com",
    pets: 2,
    lastVisit: "2023-06-13",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    pets: 1,
    lastVisit: "2023-06-14",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    pets: 1,
    lastVisit: "2023-06-15",
  },
]

// Consolidated dashboard data for export
export const dashboardData = {
  stats: dashboardStats,
  recentActivity: recentActivity,
  upcomingPickups: upcomingPickups,
  dailyRevenue: revenueData.daily,
  weeklyRevenue: revenueData.weekly,
  monthlyRevenue: revenueData.monthly,
  occupancy: occupancyData,
  requestsTrend: requestTrend,
  popularRequests: popularRequests,
  recentBookings: recentBookings,
  recentCustomers: recentCustomers,
}

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
