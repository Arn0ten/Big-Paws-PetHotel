/**
 * CENTRALIZED SAMPLE DATA STORE
 *
 * This file contains all sample data used throughout the pet owner interface.
 *
 * =====================================================================
 * BACKEND INTEGRATION INSTRUCTIONS:
 * =====================================================================
 *
 * 1. Replace the exported constants with API fetching functions
 * 2. Maintain the same data structure to ensure compatibility
 * 3. Add proper error handling and loading states
 * 4. Update the types in types.ts to match your actual data model
 *
 * Example API integration:
 *
 * export const getPets = async () => {
 *   try {
 *     const response = await fetch('/api/pets');
 *     if (!response.ok) throw new Error('Failed to fetch pets');
 *     return await response.json();
 *   } catch (error) {
 *     console.error('Error fetching pets:', error);
 *     return []; // Return empty array as fallback
 *   }
 * };
 */

import type { Pet, Request, Notification, Pricing, MediaItem } from "./types";

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
    weight: "65 lbs",
    gender: "Male",
    microchip: "123456789012345",
    avatar:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop",
    boarding: {
      status: "active",
      startDate: "2025-03-05T10:00:00Z",
      endDate: "2025-03-15T18:00:00Z",
      package: "Premium Care",
      totalPrice: 550,
      paidAmount: 300,
      remainingAmount: 250,
    },
    size: "Large",
    medicalInfo: "Allergic to chicken. Takes thyroid medication daily.",
    vaccinations: [
      { name: "Rabies", date: "2024-01-15", expiry: "2025-01-15" },
      { name: "DHPP", date: "2024-02-10", expiry: "2025-02-10" },
      { name: "Bordetella", date: "2024-03-05", expiry: "2024-09-05" },
    ],
    emergencyContact: {
      name: "John Johnson",
      phone: "+1 (555) 987-6543",
      relationship: "Spouse",
    },
    dietaryRestrictions: "Grain-free diet recommended",
    behavioralNotes: "Friendly with other dogs. Anxious during thunderstorms.",
  },
  {
    id: "pet-2",
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: "2 years",
    weight: "8 lbs",
    gender: "Female",
    microchip: "987654321098765",
    avatar:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop",
    boarding: null,
    size: "Small",
    medicalInfo: "No known medical issues",
    vaccinations: [
      { name: "Rabies", date: "2024-02-20", expiry: "2025-02-20" },
      { name: "FVRCP", date: "2024-02-20", expiry: "2025-02-20" },
    ],
    emergencyContact: {
      name: "John Johnson",
      phone: "+1 (555) 987-6543",
      relationship: "Spouse",
    },
    dietaryRestrictions: "None",
    behavioralNotes: "Shy with strangers. Prefers quiet environments.",
  },
];

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
 *
 * NOTE: These request types must match the types used in the admin interface:
 * - photo: For photo update requests
 * - video: For video requests
 * - grooming: For grooming service requests
 * - boarding-extension: For extending boarding stays
 * - custom: For any other custom requests
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
        content:
          "Here are some photos of Max! He's been having a great time and is very well-behaved.",
      },
    ],
  },
  {
    id: "req-002",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "new",
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
        content:
          "We've scheduled Max's grooming for this afternoon. We'll update you once it's completed.",
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
        content:
          "Here's a video of Max playing with his favorite toy! He's been very active today.",
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
        content:
          "We'll take care of Max's grooming. We'll send you photos once it's done.",
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
  {
    id: "req-006",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "rejected",
    createdAt: "2025-03-07T08:15:00Z",
    updatedAt: "2025-03-07T10:30:00Z",
    description:
      "Would love to get some photos of Max playing with other dogs.",
    rejectionReason:
      "We're unable to fulfill this request as Max prefers to play alone and gets anxious around other dogs.",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-07T08:15:00Z",
        content:
          "Would love to get some photos of Max playing with other dogs.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-07T10:30:00Z",
        content:
          "We're unable to fulfill this request as Max prefers to play alone and gets anxious around other dogs. We can provide photos of him playing alone if you'd like.",
      },
    ],
  },
  // Add in-progress samples
  {
    id: "req-in-prog-001",
    type: "grooming",
    petName: "Bella",
    petId: "pet-2",
    status: "in-progress",
    title: "Bella - Grooming Service",
    createdAt: "2025-03-15T14:15:00Z",
    updatedAt: "2025-03-15T15:30:00Z",
    description: "Please give Bella a bath and trim her nails.",
    groomingService: "basic-wash",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-15T14:15:00Z",
        content: "Please give Bella a bath and trim her nails.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-15T15:30:00Z",
        content:
          "We've started the grooming process for Bella. We'll update you once it's completed.",
      },
    ],
  },
  {
    id: "req-in-prog-002",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "in-progress",
    title: "Max - Photo Update",
    createdAt: "2025-03-16T09:45:00Z",
    updatedAt: "2025-03-16T10:20:00Z",
    description: "Would love to see some photos of Max playing outside.",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-16T09:45:00Z",
        content: "Would love to see some photos of Max playing outside.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-16T10:20:00Z",
        content:
          "We'll take some photos of Max during his outdoor playtime today. Stay tuned!",
      },
    ],
  },
];

/**
 * SAMPLE PET OWNER REQUESTS DATA
 *
 * This data is specifically formatted for the pet owner requests page.
 *
 * API Integration:
 * - Endpoint: GET /api/pet-owner/requests
 * - Response should match the structure below
 */
export const petOwnerRequests = [
  {
    id: "req-001",
    title: "Photo Update Request",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-10T10:30:00Z",
    updatedAt: "2025-03-10T14:45:00Z",
  },
  {
    id: "req-002",
    title: "Grooming Service",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "new",
    createdAt: "2025-03-11T09:15:00Z",
    updatedAt: "2025-03-11T09:30:00Z",
  },
  {
    id: "req-003",
    title: "Boarding Extension",
    type: "boarding-extension",
    petName: "Max",
    petId: "pet-1",
    status: "pending",
    createdAt: "2025-03-12T11:30:00Z",
    updatedAt: "2025-03-12T11:30:00Z",
  },
  {
    id: "req-004",
    title: "Video Request",
    type: "video",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-09T16:20:00Z",
    updatedAt: "2025-03-09T18:45:00Z",
  },
  {
    id: "req-005",
    title: "Grooming Service",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-08T13:25:00Z",
    updatedAt: "2025-03-08T16:40:00Z",
  },
  {
    id: "req-006",
    title: "Photos with Other Dogs",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "rejected",
    createdAt: "2025-03-07T08:15:00Z",
    updatedAt: "2025-03-07T10:30:00Z",
    rejectionReason:
      "We're unable to fulfill this request as Max prefers to play alone and gets anxious around other dogs.",
  },
  // Add in-progress samples to petOwnerRequests
  {
    id: "req-in-prog-001",
    title: "Bella - Grooming Service",
    type: "grooming",
    petName: "Bella",
    petId: "pet-2",
    status: "in-progress",
    createdAt: "2025-03-15T14:15:00Z",
    updatedAt: "2025-03-15T15:30:00Z",
  },
  {
    id: "req-in-prog-002",
    title: "Max - Photo Update",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "in-progress",
    createdAt: "2025-03-16T09:45:00Z",
    updatedAt: "2025-03-16T10:20:00Z",
  },
];

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
    message:
      "Your photo request for Max has been completed. You can view the photos now.",
    timestamp: "2025-03-10T14:45:00Z",
    isRead: false,
    requestId: "req-001",
  },
  {
    id: "notif-002",
    type: "request-in-progress",
    title: "Grooming Request In Progress",
    message:
      "Your grooming request for Max is now being processed. You'll be notified when it's completed.",
    timestamp: "2025-03-11T09:30:00Z",
    isRead: false,
    requestId: "req-002",
  },
  {
    id: "notif-003",
    type: "payment-reminder",
    title: "Additional Charges Added",
    message:
      "Additional charges of ₱250 have been added for Max's grooming service. Payment will be collected during pickup.",
    timestamp: "2025-03-12T08:15:00Z",
    isRead: true,
  },
  {
    id: "notif-004",
    type: "request-rejected",
    title: "Video Request Rejected",
    message:
      "Your video request for Max has been rejected. Please check the details for more information.",
    timestamp: "2025-03-07T18:45:00Z",
    isRead: true,
    requestId: "req-004",
  },
  {
    id: "notif-005",
    type: "boarding-update",
    title: "Boarding Pickup Reminder",
    message:
      "Max's boarding period ends tomorrow. Please prepare for pickup between 8:00 AM and 6:00 PM.",
    timestamp: "2025-03-05T10:30:00Z",
    isRead: true,
  },
  {
    id: "notif-006",
    type: "request-rejected",
    title: "Request Rejected",
    message: "Your request for photos with other dogs has been rejected.",
    timestamp: "2025-03-07T10:30:00Z",
    isRead: false,
    requestId: "req-006",
  },
];

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
};

/**
 * SAMPLE USER PROFILE DATA
 *
 * API Integration:
 * - Endpoint: GET /api/user/profile
 * - Response should match the structure below
 */
export const userProfile = {
  name: "Sarah Johnson",
  email: "sarah.j@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, CA 12345",
  avatar:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/default-pic-TTy4UvlTr4nVP0etctSbFI1CUrupvH.png?height=200&width=200",
};

/**
 * SAMPLE MEDIA ARCHIVE DATA
 *
 * API Integration:
 * - Endpoint: GET /api/pet-owner/media
 * - Response should match the MediaItem interface in types.ts
 */
export const mediaItems: MediaItem[] = [
  {
    id: "1",
    timestamp: new Date(),
    petName: "Buddy",
    requestType: "photo",
    description: "Buddy's grooming session",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480958858_1347138986475614_3113605541324887048_n.jpg-2Qs4qGN7rZSZAT5rqCQ7c2UyD2rtHY.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/476423370_1180780884058793_1895486931922885045_n.jpg-qRHW956GdINyfw6VoD6nITBdYG4QrV.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480064874_3971175603130199_8445389685285733814_n.jpg-8H6pSDIqmQ3m9rg84YuGhB8TAiCYEv.jpeg",
    ],
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    petName: "Whiskers",
    requestType: "video",
    description: "Whiskers playing with a toy",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481817843_9277714875675610_7115125575926345799_n-lCz1vZTDTYlcmAGIgVjrqw52ElqlYm.mp4",
    ],
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    petName: "Charlie",
    requestType: "photo",
    description: "Charlie's grooming session",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/475884722_1437552477217404_9052949441849644312_n.jpg-dbCP39F5PsvkEXA5fu5b3DrhSH0kRT.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480491302_9250055781727301_8238070743716968783_n.jpg-zuHWDIFIvZYglrA4tCl9zEshPDo7E8.jpeg",
    ],
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
    petName: "Daisy",
    requestType: "photo",
    description: "Daisy's grooming session",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480899995_642061011656747_972779387843409689_n.jpg-neY2SryyFSDQbBaJ9JHrZCSqyq4uKg.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480179834_591444434054760_4947462491439067277_n.jpg-DGzfDxX7zSuLJmWJLi0kIgtf4g8rI5.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-4Vb1Wt169NtXEbceqxxB4mSRt55chU.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480958858_1347138986475614_3113605541324887048_n.jpg-2Qs4qGN7rZSZAT5rqCQ7c2UyD2rtHY.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/476423370_1180780884058793_1895486931922885045_n.jpg-qRHW956GdINyfw6VoD6nITBdYG4QrV.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480064874_3971175603130199_8445389685285733814_n.jpg-8H6pSDIqmQ3m9rg84YuGhB8TAiCYEv.jpeg",
    ],
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 345600000), // 4 days ago
    petName: "Rocky",
    requestType: "video",
    description: "Rocky playing in the yard",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481817843_9277714875675610_7115125575926345799_n-lCz1vZTDTYlcmAGIgVjrqw52public.blob.vercel-storage.com/481817843_9277714875675610_7115125575926345799_n-lCz1vZTDTYlcmAGIgVjrqw52ElqlYm.mp4",
    ],
  },
  {
    id: "6",
    timestamp: new Date(Date.now() - 432000000), // 5 days ago
    petName: "Bella",
    requestType: "photo",
    description: "Bella's grooming session",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480179834_591444434054760_4947462491439067277_n.jpg-DGzfDxX7zSuLJmWJLi0kIgtf4g8rI5.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-4Vb1Wt169NtXEbceqxxB4mSRt55chU.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480958858_1347138986475614_3113605541324887048_n.jpg-2Qs4qGN7rZSZAT5rqCQ7c2UyD2rtHY.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/476423370_1180780884058793_1895486931922885045_n.jpg-qRHW956GdINyfw6VoD6nITBdYG4QrV.jpeg",
    ],
  },
];

/**
 * PRICING CONSTANTS
 */
export const petSizes = {
  small: "Small (Chihuahua, Yorkshire Terrier)",
  medium: "Medium (Beagle, Cocker Spaniel)",
  large: "Large (Labrador, Golden Retriever)",
  xlarge: "Extra Large (Great Dane, St. Bernard)",
};

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
  return pets.find((pet) => pet.id === id);
};

/**
 * Get all boarding pets
 * @returns Array of pets that are currently boarding
 *
 * API Integration:
 * - Replace with a fetch call to GET /api/pets?boarding=true
 */
export const getBoardingPets = (): Pet[] => {
  return pets.filter((pet) => pet.boarding !== null);
};

/**
 * Get all pets for a pet owner
 * @returns Array of all pets belonging to the pet owner
 *
 * API Integration:
 * - Replace with a fetch call to GET /api/pet-owner/pets
 */
export const getPetOwnerPets = (): Pet[] => {
  return pets;
};

/**
 * Get requests for a specific pet
 * @param petId The pet ID
 * @returns Array of requests for the specified pet
 *
 * API Integration:
 * - Replace with a fetch call to GET /api/requests?petId=:petId
 */
export const getRequestsByPetId = (petId: string): Request[] => {
  return requests.filter((request) => request.petId === petId);
};

/**
 * Get pet owner requests
 * @returns Array of requests for the pet owner
 *
 * API Integration:
 * - Replace with a fetch call to GET /api/pet-owner/requests
 */
export const getPetOwnerRequests = () => {
  return petOwnerRequests;
};

/**
 * Get unread notifications count
 * @returns Number of unread notifications
 *
 * API Integration:
 * - Replace with a fetch call to GET /api/notifications/unread/count
 */
export const getUnreadNotificationsCount = (): number => {
  return notifications.filter((notification) => !notification.isRead).length;
};

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
  const notification = notifications.find((n) => n.id === id);
  if (notification) {
    notification.isRead = true;
  }
};

/**
 * Create a new request
 * @param requestData The request data
 * @returns The created request
 *
 * API Integration:
 * - Replace with a fetch call to POST /api/requests
 */
export const createRequest = (
  requestData: Omit<Request, "id" | "createdAt">,
): Request => {
  // In a real implementation, this would send data to the server
  // and return the created request with an ID
  const newRequest: Request = {
    id: `req-${requests.length + 1}`,
    createdAt: new Date().toISOString(),
    ...requestData,
  };

  // Add to sample data (in a real implementation, this would be handled by the server)
  requests.push(newRequest);

  // Also add to pet owner requests list
  petOwnerRequests.push({
    id: newRequest.id,
    title: newRequest.title || `${newRequest.type} Request`,
    type: newRequest.type,
    petName: newRequest.petName,
    petId: newRequest.petId,
    status: newRequest.status,
    createdAt: newRequest.createdAt,
    updatedAt: newRequest.createdAt,
  });

  return newRequest;
};

/**
 * Format a date string
 * @param dateString The ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

/**
 * Get request type icon name
 * @param type The request type
 * @returns The icon name
 */
export const getRequestTypeIcon = (type: string): string => {
  switch (type) {
    case "photo":
      return "Camera";
    case "video":
      return "Video";
    case "grooming":
      return "Scissors";
    case "boarding-extension":
      return "Clock";
    case "custom":
      return "FileText";
    default:
      return "FileText";
  }
};

/**
 * Get request type label
 * @param type The request type
 * @returns The label
 */
export const getRequestTypeLabel = (type: string): string => {
  switch (type) {
    case "photo":
      return "Photo Update";
    case "video":
      return "Video Request";
    case "grooming":
      return "Grooming Service";
    case "boarding-extension":
      return "Boarding Extension";
    case "custom":
      return "Custom Request";
    default:
      return "Request";
  }
};

/**
 * Get media items
 * @returns Array of media items
 *
 * API Integration:
 * - Replace with a fetch call to GET /api/pet-owner/media
 */
export const getMediaItems = (): MediaItem[] => {
  return mediaItems;
};

/**
 * Get user profile
 * @returns User profile object
 *
 * API Integration:
 * - Replace with a fetch call to GET /api/user/profile
 */
export const getUserProfile = () => {
  return userProfile;
};

/**
 * Update user profile
 * @param profileData Updated profile data
 * @returns Updated profile
 *
 * API Integration:
 * - Replace with a fetch call to PUT /api/user/profile
 */
export const updateUserProfile = (profileData: typeof userProfile) => {
  // In a real implementation, this would update the server
  // For now, we just return the updated data
  return profileData;
};

/**
 * Get pricing data
 * @returns Pricing data
 *
 * API Integration:
 * - Replace with a fetch call to GET /api/pricing
 */
export const getPricingData = (): Pricing => {
  return pricing;
};
