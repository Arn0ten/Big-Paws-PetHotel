/**
 * Shared Request Data Module
 *
 * This module provides a centralized data store for request data
 * that is shared between the Requests and Request Management modules.
 *
 * BACKEND INTEGRATION:
 * In a production environment, this would be replaced with API calls
 * to fetch data from your backend server.
 */

import { create } from "zustand"

// Define the request types
export type RequestType = "photo" | "video" | "grooming" | "boarding-extension" | "custom"
export type RequestStatus = "new" | "in-progress" | "completed" | "rejected"
export type PetSize = "Small" | "Medium" | "Large" | "XLarge"

// Define the extension details interface
export interface ExtensionDetails {
  duration: string
  unit: "hours" | "days"
  currentEndDate: string
  newEndDate?: string
}

// Define the request interface
export interface Request {
  id: string
  type: RequestType
  petName: string
  petId: string
  petOwnerId: string
  petOwnerName: string
  status: RequestStatus
  createdAt: string
  description: string
  petSize: PetSize
  boardingId: string

  // Optional fields based on request type and status
  groomingService?: string
  extensionDetails?: ExtensionDetails

  // Fields for approved requests
  approvedAt?: string
  approvedBy?: string

  // Fields for completed requests
  completedAt?: string
  completedBy?: string
  processingNotes?: string
  mediaFiles?: {
    type: string
    urls: string[]
    count: number
  }
  price?: number

  // Fields for rejected requests
  rejectedAt?: string
  rejectedBy?: string
  rejectionReason?: string

  // Fields for reconsidered requests
  reconsideredAt?: string
  reconsideredBy?: string
  reconsiderationReason?: string
  isReconsidered?: boolean

  // UI state flags
  isNewlyCompleted?: boolean
}

// Sample data for demonstration
const initialRequests: Request[] = [
  {
    id: "req-001",
    type: "photo",
    petName: "Max",
    petId: "pet-001",
    petOwnerId: "owner-001",
    petOwnerName: "John Smith",
    status: "new",
    createdAt: "2025-03-10T10:30:00Z",
    description: "Would love to see how Max is doing today!",
    petSize: "Medium",
    boardingId: "board-001",
  },
  {
    id: "req-002",
    type: "grooming",
    petName: "Bella",
    petId: "pet-002",
    petOwnerId: "owner-002",
    petOwnerName: "Sarah Johnson",
    status: "new",
    createdAt: "2025-03-09T14:15:00Z",
    description: "Please give Bella a bath and trim her nails.",
    groomingService: "premium-wash-and-cut",
    petSize: "Medium",
    boardingId: "board-002",
  },
  {
    id: "req-003",
    type: "boarding-extension",
    petName: "Charlie",
    petId: "pet-003",
    petOwnerId: "owner-003",
    petOwnerName: "Michael Brown",
    status: "new",
    createdAt: "2025-03-08T09:45:00Z",
    description: "Need to extend Charlie's stay by 2 more days.",
    extensionDetails: {
      duration: "2",
      unit: "days",
    },
    currentEndDate: "2025-03-10T12:00:00Z",
    petSize: "Medium",
    boardingId: "board-003",
  },
  {
    id: "req-004",
    type: "video",
    petName: "Luna",
    petId: "pet-004",
    petOwnerId: "owner-004",
    petOwnerName: "Emily Davis",
    status: "rejected",
    createdAt: "2025-03-07T16:20:00Z",
    rejectedAt: "2025-03-07T18:45:00Z",
    description: "Would like a short video of Luna playing.",
    rejectedBy: "Admin",
    rejectionReason:
      "We're unable to record a video at this time as Luna is resting. We can try again tomorrow if you'd like.",
    petSize: "Small",
    boardingId: "board-004",
  },
  {
    id: "req-005",
    type: "photo",
    petName: "Rocky",
    petId: "pet-005",
    petOwnerId: "owner-005",
    petOwnerName: "David Wilson",
    status: "rejected",
    createdAt: "2025-03-06T11:10:00Z",
    rejectedAt: "2025-03-06T14:30:00Z",
    description: "Would like to see a photo of Rocky during playtime.",
    rejectedBy: "Admin",
    rejectionReason: "Rocky is currently being groomed. We'll send you a photo once he's done.",
    petSize: "Large",
    boardingId: "board-005",
  },
  {
    id: "req-006",
    type: "grooming",
    petName: "Daisy",
    petId: "pet-006",
    petOwnerId: "owner-006",
    petOwnerName: "Jennifer Taylor",
    status: "new",
    createdAt: "2025-03-05T13:25:00Z",
    description: "Daisy needs a full grooming session with special attention to her ears.",
    groomingService: "full-grooming",
    petSize: "Medium",
    boardingId: "board-006",
  },
  {
    id: "req-007",
    type: "boarding-extension",
    petName: "Cooper",
    petId: "pet-007",
    petOwnerId: "owner-007",
    petOwnerName: "Robert Johnson",
    status: "rejected",
    createdAt: "2025-03-04T09:15:00Z",
    rejectedAt: "2025-03-04T11:30:00Z",
    description: "Need to extend Cooper's stay by 3 more days due to delayed flight.",
    extensionDetails: {
      duration: "3",
      unit: "days",
    },
    currentEndDate: "2025-03-07T12:00:00Z",
    rejectedBy: "Admin",
    rejectionReason: "We're fully booked for those dates. Please call us to discuss alternatives.",
    petSize: "Large",
    boardingId: "board-007",
  },
  {
    id: "req-008",
    type: "custom",
    petName: "Milo",
    petId: "pet-008",
    petOwnerId: "owner-008",
    petOwnerName: "Amanda Clark",
    status: "new",
    createdAt: "2025-03-03T15:40:00Z",
    description: "Can you make sure Milo gets his medication at 3pm every day? It's in his bag.",
    petSize: "Small",
    boardingId: "board-008",
  },
  {
    id: "req-009",
    type: "video",
    petName: "Zoe",
    petId: "pet-009",
    petOwnerId: "owner-009",
    petOwnerName: "Thomas Wright",
    status: "new",
    createdAt: "2025-03-02T10:20:00Z",
    description: "Would love to see a video of Zoe playing with other dogs if possible.",
    petSize: "Medium",
    boardingId: "board-009",
  },
  {
    id: "req-010",
    type: "grooming",
    petName: "Bailey",
    petId: "pet-010",
    petOwnerId: "owner-010",
    petOwnerName: "Sophia Martinez",
    status: "rejected",
    createdAt: "2025-03-01T14:10:00Z",
    rejectedAt: "2025-03-01T16:45:00Z",
    description: "Bailey needs a bath and nail trim.",
    groomingService: "premium-wash-and-cut",
    rejectedBy: "Admin",
    rejectionReason: "Our groomer is fully booked today. We can schedule for tomorrow morning if that works for you.",
    petSize: "Small",
    boardingId: "board-010",
  },
  {
    id: "req-011",
    type: "boarding-extension",
    petName: "Buddy",
    petId: "pet-011",
    petOwnerId: "owner-011",
    petOwnerName: "James Wilson",
    status: "new",
    createdAt: "2025-03-11T08:30:00Z",
    description: "Need to extend Buddy's daycare by 4 more hours.",
    extensionDetails: {
      duration: "4",
      unit: "hours",
    },
    currentEndDate: "2025-03-11T17:00:00Z",
    petSize: "Medium",
    boardingId: "board-011",
  },
  {
    id: "req-012",
    type: "boarding-extension",
    petName: "Coco",
    petId: "pet-012",
    petOwnerId: "owner-012",
    petOwnerName: "Lisa Thompson",
    status: "new",
    createdAt: "2025-03-11T09:15:00Z",
    description: "Need to extend Coco's daycare by 2 more hours due to traffic.",
    extensionDetails: {
      duration: "2",
      unit: "hours",
    },
    currentEndDate: "2025-03-11T18:00:00Z",
    petSize: "Small",
    boardingId: "board-012",
  },
]

// Define the store interface
interface RequestStore {
  requests: Request[]
  setRequests: (requests: Request[]) => void
  updateRequest: (id: string, updates: Partial<Request>) => void
  addRequest: (request: Request) => void
  removeRequest: (id: string) => void
  getRequestById: (id: string) => Request | undefined
  getRequestsByStatus: (status: RequestStatus) => Request[]
  reset: () => void
}

// Create the store
export const useRequestStore = create<RequestStore>((set, get) => ({
  requests: initialRequests,

  setRequests: (requests) => set({ requests }),

  updateRequest: (id, updates) => {
    set((state) => ({
      requests: state.requests.map((request) => (request.id === id ? { ...request, ...updates } : request)),
    }))
  },

  addRequest: (request) => {
    set((state) => ({
      requests: [...state.requests, request],
    }))
  },

  removeRequest: (id) => {
    set((state) => ({
      requests: state.requests.filter((request) => request.id !== id),
    }))
  },

  getRequestById: (id) => {
    return get().requests.find((request) => request.id === id)
  },

  getRequestsByStatus: (status) => {
    return get().requests.filter((request) => request.status === status)
  },

  reset: () => set({ requests: initialRequests }),
}))

// Sample boarding data that matches with the requests
export const boardingData = [
  {
    id: "board-001",
    pet: { id: "pet-001", name: "Max", size: "Medium" },
    owner: { id: "owner-001", name: "John Smith" },
    startDate: "2025-03-05T10:00:00Z",
    endDate: "2025-03-12T10:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2800,
  },
  {
    id: "board-002",
    pet: { id: "pet-002", name: "Bella", size: "Medium" },
    owner: { id: "owner-002", name: "Sarah Johnson" },
    startDate: "2025-03-08T14:00:00Z",
    endDate: "2025-03-15T14:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2240,
  },
  {
    id: "board-003",
    pet: { id: "pet-003", name: "Charlie", size: "Large" },
    owner: { id: "owner-003", name: "Michael Brown" },
    startDate: "2025-03-06T09:00:00Z",
    endDate: "2025-03-13T09:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 3360,
  },
  {
    id: "board-004",
    pet: { id: "pet-004", name: "Luna", size: "Medium" },
    owner: { id: "owner-004", name: "Emily Davis" },
    startDate: "2025-03-09T11:00:00Z",
    endDate: "2025-03-15T12:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2400,
  },
  {
    id: "board-005",
    pet: { id: "pet-005", name: "Rocky", size: "Large" },
    owner: { id: "owner-005", name: "David Wilson" },
    startDate: "2025-03-07T13:00:00Z",
    endDate: "2025-03-14T13:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 3360,
  },
  {
    id: "board-006",
    pet: { id: "pet-006", name: "Daisy", size: "Small" },
    owner: { id: "owner-006", name: "Jennifer Taylor" },
    startDate: "2025-03-04T15:00:00Z",
    endDate: "2025-03-11T15:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2240,
  },
  {
    id: "board-007",
    pet: { id: "pet-007", name: "Cooper", size: "Large" },
    owner: { id: "owner-007", name: "Robert Johnson" },
    startDate: "2025-03-03T10:00:00Z",
    endDate: "2025-03-10T10:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 3360,
  },
  {
    id: "board-008",
    pet: { id: "pet-008", name: "Milo", size: "Small" },
    owner: { id: "owner-008", name: "Amanda Clark" },
    startDate: "2025-03-01T12:00:00Z",
    endDate: "2025-03-08T12:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2240,
  },
  {
    id: "board-009",
    pet: { id: "pet-009", name: "Zoe", size: "Medium" },
    owner: { id: "owner-009", name: "Thomas Wright" },
    startDate: "2025-03-10T09:00:00Z",
    endDate: "2025-03-17T09:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2800,
  },
  {
    id: "board-010",
    pet: { id: "pet-010", name: "Bailey", size: "Small" },
    owner: { id: "owner-010", name: "Sophia Martinez" },
    startDate: "2025-03-09T14:00:00Z",
    endDate: "2025-03-16T14:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2240,
  },
  {
    id: "board-011",
    pet: { id: "pet-011", name: "Buddy", size: "Medium" },
    owner: { id: "owner-011", name: "James Wilson" },
    startDate: "2025-03-11T09:00:00Z",
    endDate: "2025-03-11T17:00:00Z",
    boardingStatus: "Daycare",
    paymentStatus: "Paid",
    totalPrice: 200,
  },
  {
    id: "board-012",
    pet: { id: "pet-012", name: "Coco", size: "Small" },
    owner: { id: "owner-012", name: "Lisa Thompson" },
    startDate: "2025-03-11T10:00:00Z",
    endDate: "2025-03-11T18:00:00Z",
    boardingStatus: "Daycare",
    paymentStatus: "Paid",
    totalPrice: 160,
  },
]

// Helper functions for working with boarding data
export const getBoardingDetails = (boardingId: string) => {
  return boardingData.find((boarding) => boarding.id === boardingId)
}
