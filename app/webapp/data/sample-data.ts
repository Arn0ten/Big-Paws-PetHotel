/**
 * CENTRALIZED SAMPLE DATA STORE
 *
 * This file contains all sample data used throughout the pet owner interface.
 * Backend developers should replace these with actual API calls.
 *
 * INTEGRATION INSTRUCTIONS:
 * 1. Replace the exported constants with API fetching functions
 * 2. Maintain the same data structure to ensure compatibility
 * 3. Add proper error handling and loading states
 * 4. Update the types in types.ts to match your actual data model
 */

import type { Pet, Request, Notification, Pricing } from "./types"

/**
 * SAMPLE PETS DATA
 *
 * API Integration:
 * - Endpoint: GET /api/pets (for all pets)
 * - Endpoint: GET /api/pets/:id (for single pet)
 * - Response should match the Pet interface in types.ts
 */
export const pets: Pet[] = [
  {
    id: "pet-1",
    name: "Max",
    type: "Dog",
    breed: "Shih Tzu",
    age: "3 years",
    avatar: "/placeholder.svg?height=100&width=100",
    boarding: {
      status: "active",
      startDate: "2025-03-05T10:00:00Z",
      endDate: "2025-03-15T18:00:00Z",
      package: "Premium Care",
      totalPrice: 550,
      paidAmount: 300,
      remainingAmount: 250,
    },
  },
  {
    id: "pet-2",
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: "2 years",
    avatar: "/placeholder.svg?height=100&width=100",
    boarding: null,
  },
]

/**
 * SAMPLE REQUESTS DATA
 *
 * API Integration:
 * - Endpoint: GET /api/requests (for all requests)
 * - Endpoint: GET /api/requests/:id (for single request)
 * - Endpoint: POST /api/requests (for creating a request)
 * - Endpoint: PUT /api/requests/:id (for updating a request)
 * - Endpoint: DELETE /api/requests/:id (for cancelling a request)
 * - Response should match the Request interface in types.ts
 */
export const requests: Request[] = [
  {
    id: "req-001",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-10T10:30:00Z",
    completedAt: "2025-03-10T14:45:00Z",
    description: "Would love to see how Max is doing today!",
    mediaFiles: {
      type: "photo",
      urls: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/475884722_1437552477217404_9052949441849644312_n.jpg-7uhDVp5OlcnO0bA2dRO3y4AJKWX7Eu.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480958858_1347138986475614_3113605541324887048_n.jpg-CJzY6RUEoyVXERrDrst4UUZweYKNx2.jpeg",
      ],
      count: 2,
    },
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-10T10:30:00Z",
        content: "Would love to see how Max is doing today!",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-10T14:45:00Z",
        content: "Here are some photos of Max! He's been having a great time and is very well-behaved.",
      },
    ],
  },
  {
    id: "req-002",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "in-progress",
    createdAt: "2025-03-11T09:15:00Z",
    description: "Please give Max a bath and trim his nails.",
    groomingService: "premium-wash-and-cut",
    price: 45,
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-11T09:15:00Z",
        content: "Please give Max a bath and trim his nails.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-11T09:30:00Z",
        content: "We've scheduled Max's grooming for this afternoon. We'll update you once it's completed.",
      },
    ],
  },
  {
    id: "req-003",
    type: "boarding-extension",
    petName: "Max",
    petId: "pet-1",
    status: "new",
    createdAt: "2025-03-12T11:30:00Z",
    description: "Need to extend Max's stay by 2 more days.",
    extensionDetails: {
      duration: "2",
      unit: "days",
    },
    currentEndDate: "2025-03-15T18:00:00Z",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-12T11:30:00Z",
        content: "Need to extend Max's stay by 2 more days.",
      },
    ],
  },
  {
    id: "req-004",
    type: "video",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-09T16:20:00Z",
    completedAt: "2025-03-09T18:45:00Z",
    description: "Would like a short video of Max playing.",
    mediaFiles: {
      type: "video",
      urls: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481680804_28744805481832748_1861448157952924189_n-QhfRhcm35IvtWfk0Cr5xghpgSDfOH0.mp4",
      ],
      count: 1,
    },
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-09T16:20:00Z",
        content: "Would like a short video of Max playing.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-09T18:45:00Z",
        content: "Here's a video of Max playing with his favorite toy! He's been very active today.",
      },
    ],
  },
  {
    id: "req-005",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-08T13:25:00Z",
    completedAt: "2025-03-08T16:40:00Z",
    description: "Max needs a haircut, please make it short for the summer.",
    groomingService: "full-grooming",
    price: 65,
    mediaFiles: {
      type: "photo",
      urls: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481341330_645628184644218_5977888978271770501_n.jpg-WAAmLbaijRIf2MdPbmpcKeIbTGXXnx.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480064874_3971175603130199_8445389685285733814_n.jpg-4Br3hEVwqETCJBgdNUUynhTZ1pJ8ey.jpeg",
      ],
      count: 2,
    },
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-08T13:25:00Z",
        content: "Max needs a haircut, please make it short for the summer.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-08T14:30:00Z",
        content: "We'll take care of Max's grooming. We'll send you photos once it's done.",
      },
      {
        id: "msg-003",
        sender: "admin",
        timestamp: "2025-03-08T16:40:00Z",
        content:
          "Max's grooming is complete! Here are some photos of the finished result. He looks great with his summer cut!",
      },
    ],
  },
]

/**
 * SAMPLE NOTIFICATIONS DATA
 *
 * API Integration:
 * - Endpoint: GET /api/notifications (for all notifications)
 * - Endpoint: PUT /api/notifications/:id (for marking as read)
 * - Endpoint: DELETE /api/notifications/:id (for deleting a notification)
 * - Response should match the Notification interface in types.ts
 */
export const notifications: Notification[] = [
  {
    id: "notif-001",
    type: "request-completed",
    title: "Photo Request Completed",
    message: "Your photo request for Max has been completed.",
    timestamp: "2025-03-10T14:45:00Z",
    isRead: false,
    requestId: "req-001",
  },
  {
    id: "notif-002",
    type: "request-in-progress",
    title: "Grooming Request In Progress",
    message: "Your grooming request for Max is now being processed.",
    timestamp: "2025-03-11T09:30:00Z",
    isRead: false,
    requestId: "req-002",
  },
  {
    id: "notif-003",
    type: "payment-reminder",
    title: "Payment Reminder",
    message: "You have an outstanding balance of $250 for Max's boarding.",
    timestamp: "2025-03-12T08:15:00Z",
    isRead: true,
  },
  {
    id: "notif-004",
    type: "request-completed",
    title: "Video Request Completed",
    message: "Your video request for Max has been completed. Check it out!",
    timestamp: "2025-03-09T18:45:00Z",
    isRead: true,
    requestId: "req-004",
  },
  {
    id: "notif-005",
    type: "request-completed",
    title: "Grooming Completed",
    message: "Max's grooming has been completed. Check out his new look!",
    timestamp: "2025-03-08T16:40:00Z",
    isRead: true,
    requestId: "req-005",
  },
]

/**
 * SAMPLE PRICING DATA
 *
 * API Integration:
 * - Endpoint: GET /api/pricing (for all pricing data)
 * - Response should match the Pricing interface in types.ts
 */
export const pricing: Pricing = {
  boarding: {
    dogs: {
      small: 35,
      medium: 45,
      large: 55,
      xlarge: 65,
    },
    cats: 30,
    daycare: {
      hourly: 5,
      daily: 25,
    },
  },
  grooming: {
    dogs: {
      basicWash: {
        small: 25,
        medium: 35,
        large: 45,
        xlarge: 55,
      },
      premiumWash: {
        small: 35,
        medium: 45,
        large: 55,
        xlarge: 65,
      },
      premiumWashAndCut: {
        small: 45,
        medium: 55,
        large: 65,
        xlarge: 75,
      },
      fullGrooming: {
        small: 55,
        medium: 65,
        large: 75,
        xlarge: 85,
      },
    },
    cats: {
      basicWash: 30,
      premiumWash: 40,
    },
  },
  additionalServices: {
    tickAndFleaRemoval: 15,
    nailCut: 10,
    earCleaning: 10,
    analSacCleaning: 15,
    blowDry: 10,
    woundTreatment: 20,
  },
}

/**
 * HELPER FUNCTIONS
 *
 * These functions help with common data operations.
 * Backend developers can modify these to work with actual API data.
 */

/**
 * Get a pet by ID
 * @param id The pet ID
 * @returns The pet object or undefined if not found
 *
 * API Integration:
 * - Replace with a fetch call to GET /api/pets/:id
 */
export const getPetById = (id: string): Pet | undefined => {
  return pets.find((pet) => pet.id === id)
}

/**
 * Get all boarding pets
 * @returns Array of pets that are currently boarding
 *
 * API Integration:
 * - Replace with a fetch call to GET /api/pets?boarding=true
 */
export const getBoardingPets = (): Pet[] => {
  return pets.filter((pet) => pet.boarding !== null)
}

/**
 * Get requests for a specific pet
 * @param petId The pet ID
 * @returns Array of requests for the specified pet
 *
 * API Integration:
 * - Replace with a fetch call to GET /api/requests?petId=:petId
 */
export const getRequestsByPetId = (petId: string): Request[] => {
  return requests.filter((request) => request.petId === petId)
}

/**
 * Get unread notifications count
 * @returns Number of unread notifications
 *
 * API Integration:
 * - Replace with a fetch call to GET /api/notifications/unread/count
 */
export const getUnreadNotificationsCount = (): number => {
  return notifications.filter((notification) => !notification.isRead).length
}

/**
 * Mark a notification as read
 * @param id The notification ID
 *
 * API Integration:
 * - Replace with a fetch call to PUT /api/notifications/:id/read
 */
export const markNotificationAsRead = (id: string): void => {
  // In a real implementation, this would update the server
  // For now, we just update the local data
  const notification = notifications.find((n) => n.id === id)
  if (notification) {
    notification.isRead = true
  }
}

/**
 * Create a new request
 * @param requestData The request data
 * @returns The created request
 *
 * API Integration:
 * - Replace with a fetch call to POST /api/requests
 */
export const createRequest = (requestData: Omit<Request, "id" | "status" | "createdAt">): Request => {
  // In a real implementation, this would send data to the server
  // and return the created request with an ID
  const newRequest: Request = {
    id: `req-${requests.length + 1}`,
    status: "new",
    createdAt: new Date().toISOString(),
    ...requestData,
  }

  // In a real implementation, we would add this to the server
  // For now, we just return it
  return newRequest
}

/**
 * Format a date string
 * @param dateString The ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}

/**
 * Get request type icon name
 * @param type The request type
 * @returns The icon name
 */
export const getRequestTypeIcon = (type: string): string => {
  switch (type) {
    case "photo":
      return "Camera"
    case "video":
      return "Video"
    case "grooming":
      return "Scissors"
    case "boarding-extension":
      return "Clock"
    case "custom":
      return "FileText"
    default:
      return "FileText"
  }
}

/**
 * Get request type label
 * @param type The request type
 * @returns The label
 */
export const getRequestTypeLabel = (type: string): string => {
  switch (type) {
    case "photo":
      return "Photo Update"
    case "video":
      return "Video Request"
    case "grooming":
      return "Grooming Service"
    case "boarding-extension":
      return "Boarding Extension"
    case "custom":
      return "Custom Request"
    default:
      return "Request"
  }
}

