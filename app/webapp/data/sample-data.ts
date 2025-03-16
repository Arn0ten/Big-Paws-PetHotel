/**
 * Sample data for the pet owner interface
 *
 * @note This file contains mock data for development and testing purposes.
 * In a production environment, this data would be fetched from an API.
 *
 * @important Backend developers should replace these static objects with
 * actual API calls to fetch real data from the database.
 */

// Sample pet data
export const pets = [
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

// Sample request data
export const requests = [
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

// Sample notification data
export const notifications = [
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
 * API Integration Notes for Backend Developers:
 *
 * 1. Replace static data with API endpoints:
 *    - GET /api/pets - Fetch user's pets
 *    - GET /api/pets/:id - Fetch specific pet details
 *    - GET /api/requests - Fetch all requests (with optional filters)
 *    - GET /api/requests/:id - Fetch specific request details
 *    - GET /api/notifications - Fetch user notifications
 *
 * 2. Implement real-time updates using WebSockets for:
 *    - New notifications
 *    - Request status changes
 *    - New messages in conversations
 *
 * 3. Authentication:
 *    - All API requests should include authentication headers
 *    - Implement token refresh mechanism
 *
 * 4. Error handling:
 *    - Implement proper error handling for API failures
 *    - Add retry logic for failed requests
 *    - Show appropriate error messages to users
 */

