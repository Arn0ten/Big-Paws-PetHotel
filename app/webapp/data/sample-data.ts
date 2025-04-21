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
    gender: "Male",
    avatar:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop",
    boarding: {
      status: "active",
      startDate: "2025-03-05T10:00:00Z",
      endDate: "2025-03-15T18:00:00Z",
      boardingType: "Long Stay",
      totalPrice: 550,
      paidAmount: 300,
      remainingAmount: 250,
    },
    size: "Large",
    emergencyContact: {
      name: "John Johnson",
      phone: "+1 (555) 987-6543",
      relationship: "Spouse",
    },
    behavioralNotes: "Friendly with other dogs. Anxious during thunderstorms.",
  },
  {
    id: "pet-2",
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: "2 years",
    gender: "Female",
    avatar:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop",
    boarding: null,
    size: "Small",
    emergencyContact: {
      name: "John Johnson",
      phone: "+1 (555) 987-6543",
      relationship: "Spouse",
    },
    behavioralNotes: "Shy with strangers. Prefers quiet environments.",
  },
  {
    id: "pet-3",
    name: "Bella",
    type: "Dog",
    breed: "Beagle",
    age: "1 year",
    gender: "Female",
    avatar:
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=200&auto=format&fit=crop",
    boarding: {
      status: "active",
      startDate: "2025-03-10T08:00:00Z",
      endDate: "2025-03-10T18:00:00Z",
      boardingType: "Day Care",
      totalPrice: 50,
      paidAmount: 50,
      remainingAmount: 0,
    },
    size: "Medium",
    emergencyContact: {
      name: "Emily Johnson",
      phone: "+1 (555) 123-4567",
      relationship: "Owner",
    },
    behavioralNotes: "Friendly and energetic. Loves to play with other dogs.",
  },
  {
    id: "pet-4",
    name: "Rocky",
    type: "Dog",
    breed: "German Shepherd",
    age: "4 years",
    gender: "Male",
    avatar:
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=200&auto=format&fit=crop",
    boarding: {
      status: "active",
      startDate: "2025-03-07T09:00:00Z",
      endDate: "2025-03-14T17:00:00Z",
      boardingType: "Long Stay",
      totalPrice: 385,
      paidAmount: 200,
      remainingAmount: 185,
    },
    size: "Large",
    emergencyContact: {
      name: "Michael Smith",
      phone: "+1 (555) 456-7890",
      relationship: "Owner",
    },
    behavioralNotes: "Well-trained and obedient. Protective but friendly.",
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
  // PENDING REQUESTS - One of each type
  {
    id: "req-pending-photo",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "pending",
    createdAt: "2025-03-10T10:30:00Z",
    description: "Would love to see how Max is doing today!",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-10T10:30:00Z",
        content: "Would love to see how Max is doing today!",
      },
    ],
  },
  {
    id: "req-pending-video",
    type: "video",
    petName: "Max",
    petId: "pet-1",
    status: "pending",
    createdAt: "2025-03-11T09:15:00Z",
    description: "Please send a short video of Max playing with his toys.",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-11T09:15:00Z",
        content: "Please send a short video of Max playing with his toys.",
      },
    ],
  },
  {
    id: "req-pending-grooming",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "pending",
    createdAt: "2025-03-12T11:30:00Z",
    description: "Max needs a bath and nail trimming.",
    groomingService: "basic-wash",
    price: 35, // BACKEND: This should be calculated based on pet size and service type
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-12T11:30:00Z",
        content: "Max needs a bath and nail trimming.",
      },
    ],
  },
  {
    id: "req-pending-extension",
    type: "boarding-extension",
    petName: "Max",
    petId: "pet-1",
    status: "pending",
    createdAt: "2025-03-13T14:45:00Z",
    description: "Need to extend Max's stay by 3 more days.",
    extensionDetails: {
      duration: "3",
      unit: "days",
    },
    price: 165, // BACKEND: This should be calculated based on pet size and duration
    currentEndDate: "2025-03-15T18:00:00Z",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-13T14:45:00Z",
        content: "Need to extend Max's stay by 3 more days.",
      },
    ],
  },

  // IN-PROGRESS REQUESTS - One of each type
  {
    id: "req-inprogress-photo",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "in-progress",
    createdAt: "2025-03-14T10:30:00Z",
    updatedAt: "2025-03-14T11:15:00Z",
    description: "Would like to see some photos of Max during playtime.",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-14T10:30:00Z",
        content: "Would like to see some photos of Max during playtime.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-14T11:15:00Z",
        content:
          "We'll take some photos during Max's playtime today. Will update you soon!",
      },
    ],
  },
  {
    id: "req-inprogress-video",
    type: "video",
    petName: "Max",
    petId: "pet-1",
    status: "in-progress",
    createdAt: "2025-03-15T09:15:00Z",
    updatedAt: "2025-03-15T10:00:00Z",
    description: "Would like a video of Max's daily activities.",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-15T09:15:00Z",
        content: "Would like a video of Max's daily activities.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-15T10:00:00Z",
        content:
          "We'll record a video of Max today. Will share it with you once ready.",
      },
    ],
  },
  {
    id: "req-inprogress-grooming",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "in-progress", // Ensure this is "in-progress"
    createdAt: "2025-03-16T11:30:00Z",
    updatedAt: "2025-03-16T12:15:00Z",
    description: "Max needs a full grooming service with haircut.",
    groomingService: "full-grooming",
    price: 65, // BACKEND: This should be calculated based on pet size and service type
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-16T11:30:00Z",
        content: "Max needs a full grooming service with haircut.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-16T12:15:00Z",
        content:
          "We've scheduled Max's grooming for this afternoon. We'll update you once it's completed.",
      },
    ],
  },
  {
    id: "req-inprogress-extension",
    type: "boarding-extension",
    petName: "Max",
    petId: "pet-1",
    status: "in-progress", // Ensure this is "in-progress"
    createdAt: "2025-03-17T14:45:00Z",
    updatedAt: "2025-03-17T15:30:00Z",
    description: "Need to extend Max's stay by 2 more days.",
    extensionDetails: {
      duration: "2",
      unit: "days",
    },
    price: 110, // BACKEND: This should be calculated based on pet size and duration
    currentEndDate: "2025-03-15T18:00:00Z",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-17T14:45:00Z",
        content: "Need to extend Max's stay by 2 more days.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-17T15:30:00Z",
        content:
          "We're processing your extension request. We'll confirm once it's approved.",
      },
    ],
  },

  // Rocky's requests
  {
    id: "req-inprogress-grooming-rocky",
    type: "grooming",
    petName: "Rocky",
    petId: "pet-4",
    status: "in-progress",
    createdAt: "2025-03-09T13:30:00Z",
    updatedAt: "2025-03-09T14:15:00Z",
    description: "Rocky needs a bath and nail trimming.",
    groomingService: "premium-wash",
    price: 55,
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-09T13:30:00Z",
        content: "Rocky needs a bath and nail trimming.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-09T14:15:00Z",
        content:
          "We've scheduled Rocky's grooming for tomorrow. We'll update you once it's completed.",
      },
    ],
  },

  // COMPLETED REQUESTS - One of each type
  {
    id: "req-completed-photo",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-18T10:30:00Z",
    completedAt: "2025-03-18T14:45:00Z",
    description: "Would love to see how Max is doing today!",
    processingNotes:
      "Here are some photos of Max! He's been having a great time and is very well-behaved.",
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
        timestamp: "2025-03-18T10:30:00Z",
        content: "Would love to see how Max is doing today!",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-18T14:45:00Z",
        content:
          "Here are some photos of Max! He's been having a great time and is very well-behaved.",
      },
    ],
  },
  {
    id: "req-completed-video",
    type: "video",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-19T09:15:00Z",
    completedAt: "2025-03-19T13:30:00Z",
    description: "Would like a short video of Max playing.",
    processingNotes:
      "Here's a video of Max playing with his favorite toy! He's been very active today.",
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
        timestamp: "2025-03-19T09:15:00Z",
        content: "Would like a short video of Max playing.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-19T13:30:00Z",
        content:
          "Here's a video of Max playing with his favorite toy! He's been very active today.",
      },
    ],
  },
  {
    id: "req-completed-grooming",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-20T11:30:00Z",
    completedAt: "2025-03-20T15:45:00Z",
    description: "Max needs a haircut, please make it short for the summer.",
    groomingService: "full-grooming",
    price: 65, // BACKEND: This should be calculated based on pet size and service type
    processingNotes:
      "Max's grooming is complete! He looks great with his summer cut and was very well-behaved during the session.",
    mediaFiles: {
      type: "photo",
      urls: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480958858_1347138986475614_3113605541324887048_n.jpg-CJzY6RUEoyVXERrDrst4UUZweYKNx2.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/475884722_1437552477217404_9052949441849644312_n.jpg-7uhDVp5OlcnO0bA2dRO3y4AJKWX7Eu.jpeg",
      ],
      count: 2,
    },
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-20T11:30:00Z",
        content: "Max needs a haircut, please make it short for the summer.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-20T13:15:00Z",
        content:
          "We'll take care of Max's grooming. We'll send you photos once it's done.",
      },
      {
        id: "msg-003",
        sender: "admin",
        timestamp: "2025-03-20T15:45:00Z",
        content:
          "Max's grooming is complete! He looks great with his summer cut and was very well-behaved during the session.",
      },
    ],
  },
  {
    id: "req-completed-extension",
    type: "boarding-extension",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-21T14:45:00Z",
    completedAt: "2025-03-21T16:30:00Z",
    description: "Need to extend Max's stay by 1 more day.",
    extensionDetails: {
      duration: "1",
      unit: "days",
    },
    price: 55, // BACKEND: This should be calculated based on pet size and duration
    currentEndDate: "2025-03-15T18:00:00Z",
    newEndDate: "2025-03-16T18:00:00Z",
    processingNotes:
      "Your extension request has been approved. Max's stay has been extended until March 16th.",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-21T14:45:00Z",
        content: "Need to extend Max's stay by 1 more day.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-21T16:30:00Z",
        content:
          "Your extension request has been approved. Max's stay has been extended until March 16th.",
      },
    ],
  },

  // REJECTED REQUESTS - One of each type
  {
    id: "req-rejected-photo",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "rejected",
    createdAt: "2025-03-22T10:30:00Z",
    updatedAt: "2025-03-22T11:45:00Z",
    description:
      "Would love to get some photos of Max playing with other dogs.",
    rejectionReason:
      "We're unable to fulfill this request as Max prefers to play alone and gets anxious around other dogs.",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-22T10:30:00Z",
        content:
          "Would love to get some photos of Max playing with other dogs.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-22T11:45:00Z",
        content:
          "We're unable to fulfill this request as Max prefers to play alone and gets anxious around other dogs. We can provide photos of him playing alone if you'd like.",
      },
    ],
  },
  {
    id: "req-rejected-video",
    type: "video",
    petName: "Max",
    petId: "pet-1",
    status: "rejected",
    createdAt: "2025-03-23T09:15:00Z",
    updatedAt: "2025-03-23T10:30:00Z",
    description: "Would like a video of Max swimming in the pool.",
    rejectionReason:
      "We don't have a pool facility at our location. We can offer videos of other activities instead.",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-23T09:15:00Z",
        content: "Would like a video of Max swimming in the pool.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-23T10:30:00Z",
        content:
          "We don't have a pool facility at our location. We can offer videos of other activities instead. Would you like a video of Max during playtime or relaxing in his kennel?",
      },
    ],
  },
  {
    id: "req-rejected-grooming",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "rejected",
    createdAt: "2025-03-24T11:30:00Z",
    updatedAt: "2025-03-24T12:45:00Z",
    description: "Max needs fur coloring for a special event.",
    groomingService: "custom",
    rejectionReason:
      "We don't offer fur coloring services. We can provide standard grooming services instead.",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-24T11:30:00Z",
        content: "Max needs fur coloring for a special event.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-24T12:45:00Z",
        content:
          "We don't offer fur coloring services. We can provide standard grooming services instead. Would you like to schedule a regular grooming appointment?",
      },
    ],
  },
  {
    id: "req-rejected-extension",
    type: "boarding-extension",
    petName: "Max",
    petId: "pet-1",
    status: "rejected",
    createdAt: "2025-03-25T14:45:00Z",
    updatedAt: "2025-03-25T16:00:00Z",
    description: "Need to extend Max's stay by 7 more days.",
    extensionDetails: {
      duration: "7",
      unit: "days",
    },
    currentEndDate: "2025-03-15T18:00:00Z",
    rejectionReason:
      "We're fully booked for the requested extension period. We can offer a shorter extension instead.",
    conversation: [
      {
        id: "msg-001",
        sender: "owner",
        timestamp: "2025-03-25T14:45:00Z",
        content: "Need to extend Max's stay by 7 more days.",
      },
      {
        id: "msg-002",
        sender: "admin",
        timestamp: "2025-03-25T16:00:00Z",
        content:
          "We're fully booked for the requested extension period. We can offer a shorter extension of 3 days instead. Would that work for you?",
      },
    ],
  },

  // Keep a few of the original requests for backward compatibility
  {
    id: "req-001",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-10T10:30:00Z",
    completedAt: "2025-03-10T14:45:00Z",
    description: "Would love to see how Max is doing today!",
    processingNotes:
      "Here are some photos of Max! He's been having a great time and is very well-behaved.",
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
  // PENDING REQUESTS
  {
    id: "req-pending-photo",
    title: "Photo Update Request",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "pending",
    createdAt: "2025-03-10T10:30:00Z",
    updatedAt: "2025-03-10T10:30:00Z",
  },
  {
    id: "req-pending-video",
    title: "Video Request",
    type: "video",
    petName: "Max",
    petId: "pet-1",
    status: "pending",
    createdAt: "2025-03-11T09:15:00Z",
    updatedAt: "2025-03-11T09:15:00Z",
  },
  {
    id: "req-pending-grooming",
    title: "Grooming Service",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "pending",
    createdAt: "2025-03-12T11:30:00Z",
    updatedAt: "2025-03-12T11:30:00Z",
  },
  {
    id: "req-pending-extension",
    title: "Boarding Extension",
    type: "boarding-extension",
    petName: "Max",
    petId: "pet-1",
    status: "pending",
    createdAt: "2025-03-13T14:45:00Z",
    updatedAt: "2025-03-13T14:45:00Z",
  },

  // IN-PROGRESS REQUESTS
  {
    id: "req-inprogress-photo",
    title: "Photo Update Request",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "in-progress",
    createdAt: "2025-03-14T10:30:00Z",
    updatedAt: "2025-03-14T11:15:00Z",
  },
  {
    id: "req-inprogress-video",
    title: "Video Request",
    type: "video",
    petName: "Max",
    petId: "pet-1",
    status: "in-progress",
    createdAt: "2025-03-15T09:15:00Z",
    updatedAt: "2025-03-15T10:00:00Z",
  },
  {
    id: "req-inprogress-grooming",
    title: "Grooming Service",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "in-progress",
    createdAt: "2025-03-16T11:30:00Z",
    updatedAt: "2025-03-16T12:15:00Z",
  },
  {
    id: "req-inprogress-extension",
    title: "Boarding Extension",
    type: "boarding-extension",
    petName: "Max",
    petId: "pet-1",
    status: "in-progress",
    createdAt: "2025-03-17T14:45:00Z",
    updatedAt: "2025-03-17T15:30:00Z",
  },
  {
    id: "req-inprogress-grooming-rocky",
    title: "Grooming Service",
    type: "grooming",
    petName: "Rocky",
    petId: "pet-4",
    status: "in-progress",
    createdAt: "2025-03-09T13:30:00Z",
    updatedAt: "2025-03-09T14:15:00Z",
  },

  // COMPLETED REQUESTS
  {
    id: "req-completed-photo",
    title: "Photo Update Request",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-18T10:30:00Z",
    updatedAt: "2025-03-18T14:45:00Z",
  },
  {
    id: "req-completed-video",
    title: "Video Request",
    type: "video",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-19T09:15:00Z",
    updatedAt: "2025-03-19T13:30:00Z",
  },
  {
    id: "req-completed-grooming",
    title: "Grooming Service",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-20T11:30:00Z",
    updatedAt: "2025-03-20T15:45:00Z",
  },
  {
    id: "req-completed-extension",
    title: "Boarding Extension",
    type: "boarding-extension",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-21T14:45:00Z",
    updatedAt: "2025-03-21T16:30:00Z",
  },

  // REJECTED REQUESTS
  {
    id: "req-rejected-photo",
    title: "Photo Update Request",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "rejected",
    createdAt: "2025-03-22T10:30:00Z",
    updatedAt: "2025-03-22T11:45:00Z",
    rejectionReason:
      "We're unable to fulfill this request as Max prefers to play alone and gets anxious around other dogs.",
  },
  {
    id: "req-rejected-video",
    title: "Video Request",
    type: "video",
    petName: "Max",
    petId: "pet-1",
    status: "rejected",
    createdAt: "2025-03-23T09:15:00Z",
    updatedAt: "2025-03-23T10:30:00Z",
    rejectionReason:
      "We don't have a pool facility at our location. We can offer videos of other activities instead.",
  },
  {
    id: "req-rejected-grooming",
    title: "Grooming Service",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "rejected",
    createdAt: "2025-03-24T11:30:00Z",
    updatedAt: "2025-03-24T12:45:00Z",
    rejectionReason:
      "We don't offer fur coloring services. We can provide standard grooming services instead.",
  },
  {
    id: "req-rejected-extension",
    title: "Boarding Extension",
    type: "boarding-extension",
    petName: "Max",
    petId: "pet-1",
    status: "rejected",
    createdAt: "2025-03-25T14:45:00Z",
    updatedAt: "2025-03-25T16:00:00Z",
    rejectionReason:
      "We're fully booked for the requested extension period. We can offer a shorter extension instead.",
  },

  // Keep a few of the original requests for backward compatibility
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
  id: 1,
  name: "Argie Sahur",
  email: "argie.argie@argie.argie",
  phone: "09458938376",
  address: "Prk. Skibidi Cuambugagan Tagum City",
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
  return pets.filter(
    (pet) => pet.boarding !== null && pet.boarding.status === "active",
  );
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
 * Format a time string
 * @param dateString The ISO date string
 * @returns Formatted time string
 */
export const formatTime = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
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
