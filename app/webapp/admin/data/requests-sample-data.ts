/**
 * REQUESTS SAMPLE DATA
 *
 * This file contains centralized sample data for the Requests module.
 */

import type { BaseRequest } from "./shared-sample-data"

// Extend the base request interface with additional properties
export interface Request extends BaseRequest {
  extensionDetails?: {
    duration: string
    unit: string
  }
  currentEndDate?: string
  newEndDate?: string
  groomingService?: string
  price?: number
  rejectionReason?: string
  rejectedBy?: string
  rejectedAt?: string
}

// Sample new and rejected requests data
export const sampleRequests: Request[] = [
  {
    id: "req-101",
    type: "photo",
    petName: "Simba",
    petId: "pet-014",
    petOwnerId: "owner-014",
    petOwnerName: "Jessica Miller",
    status: "new",
    createdAt: "2025-03-14T10:15:00Z",
    description: "Could I get a photo of Simba today? Just want to see how he's doing.",
    isUrgent: false,
    petSize: "Medium",
    boardingId: "board-014",
  },
  {
    id: "req-102",
    type: "boarding-extension",
    petName: "Ruby",
    petId: "pet-015",
    petOwnerId: "owner-015",
    petOwnerName: "Thomas Wright",
    status: "new",
    createdAt: "2025-03-14T11:30:00Z",
    description: "Need to extend Ruby's stay by 2 more days. Is that possible?",
    isUrgent: true,
    petSize: "Small",
    boardingId: "board-015",
    extensionDetails: {
      duration: "2",
      unit: "days",
    },
    currentEndDate: "2025-03-16T12:00:00Z",
  },
  {
    id: "req-103",
    type: "video",
    petName: "Oscar",
    petId: "pet-017",
    petOwnerId: "owner-017",
    petOwnerName: "Jennifer Lopez",
    status: "new",
    createdAt: "2025-03-14T13:45:00Z",
    description: "Would love to see a video of Oscar playing with other dogs.",
    isUrgent: false,
    petSize: "Medium",
    boardingId: "board-017",
  },
  {
    id: "req-104",
    type: "grooming",
    petName: "Lola",
    petId: "pet-018",
    petOwnerId: "owner-018",
    petOwnerName: "Robert Davis",
    status: "new",
    createdAt: "2025-03-14T14:30:00Z",
    description: "Lola needs a bath and nail trim. Her fur is getting matted.",
    isUrgent: false,
    petSize: "Small",
    boardingId: "board-018",
    groomingService: "basic-wash",
  },
  {
    id: "req-105",
    type: "custom",
    petName: "Rex",
    petId: "pet-019",
    petOwnerId: "owner-019",
    petOwnerName: "Patricia Wilson",
    status: "new",
    createdAt: "2025-03-14T15:15:00Z",
    description:
      "Rex has been having some anxiety. Could you give him extra attention and maybe some playtime with his favorite toy?",
    isUrgent: true,
    petSize: "Large",
    boardingId: "board-019",
  },
  {
    id: "req-106",
    type: "grooming",
    petName: "Toby",
    petId: "pet-016",
    petOwnerId: "owner-016",
    petOwnerName: "Amanda Lee",
    status: "rejected",
    createdAt: "2025-03-13T09:45:00Z",
    description: "Toby needs a full grooming session with nail trimming.",
    isUrgent: false,
    petSize: "Medium",
    boardingId: "board-016",
    groomingService: "full-grooming",
    rejectionReason: "Groomer not available on requested date. Please reschedule for next week.",
    rejectedBy: "Admin",
    rejectedAt: "2025-03-13T11:30:00Z",
  },
  {
    id: "req-107",
    type: "boarding-extension",
    petName: "Milo",
    petId: "pet-020",
    petOwnerId: "owner-020",
    petOwnerName: "Christopher Brown",
    status: "rejected",
    createdAt: "2025-03-12T10:15:00Z",
    description: "Need to extend Milo's stay by 3 more days.",
    isUrgent: true,
    petSize: "Medium",
    boardingId: "board-020",
    extensionDetails: {
      duration: "3",
      unit: "days",
    },
    currentEndDate: "2025-03-15T12:00:00Z",
    rejectionReason: "No available space for the requested dates. We're fully booked.",
    rejectedBy: "Admin",
    rejectedAt: "2025-03-12T14:20:00Z",
  },
  {
    id: "req-108",
    type: "photo",
    petName: "Bella",
    petId: "pet-021",
    petOwnerId: "owner-021",
    petOwnerName: "Elizabeth Taylor",
    status: "rejected",
    createdAt: "2025-03-11T16:30:00Z",
    description: "Could I get some photos of Bella today?",
    isUrgent: false,
    petSize: "Small",
    boardingId: "board-021",
    rejectionReason: "Pet is no longer boarding with us. Was picked up earlier today.",
    rejectedBy: "Admin",
    rejectedAt: "2025-03-11T17:45:00Z",
  },
]

// Sample boarding data that matches with the requests
export const sampleBoardingData = [
  {
    id: "board-014",
    pet: { id: "pet-014", name: "Simba", size: "Medium" },
    owner: { id: "owner-014", name: "Jessica Miller" },
    startDate: "2025-03-10T10:00:00Z",
    endDate: "2025-03-17T10:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2800,
  },
  {
    id: "board-015",
    pet: { id: "pet-015", name: "Ruby", size: "Small" },
    owner: { id: "owner-015", name: "Thomas Wright" },
    startDate: "2025-03-09T11:00:00Z",
    endDate: "2025-03-16T11:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2240,
  },
  {
    id: "board-016",
    pet: { id: "pet-016", name: "Toby", size: "Medium" },
    owner: { id: "owner-016", name: "Amanda Lee" },
    startDate: "2025-03-08T09:00:00Z",
    endDate: "2025-03-15T09:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2800,
  },
  {
    id: "board-017",
    pet: { id: "pet-017", name: "Oscar", size: "Medium" },
    owner: { id: "owner-017", name: "Jennifer Lopez" },
    startDate: "2025-03-11T10:00:00Z",
    endDate: "2025-03-18T10:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2800,
  },
  {
    id: "board-018",
    pet: { id: "pet-018", name: "Lola", size: "Small" },
    owner: { id: "owner-018", name: "Robert Davis" },
    startDate: "2025-03-10T14:00:00Z",
    endDate: "2025-03-17T14:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2240,
  },
  {
    id: "board-019",
    pet: { id: "pet-019", name: "Rex", size: "Large" },
    owner: { id: "owner-019", name: "Patricia Wilson" },
    startDate: "2025-03-12T09:00:00Z",
    endDate: "2025-03-19T09:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 3360,
  },
  {
    id: "board-020",
    pet: { id: "pet-020", name: "Milo", size: "Medium" },
    owner: { id: "owner-020", name: "Christopher Brown" },
    startDate: "2025-03-08T11:00:00Z",
    endDate: "2025-03-15T11:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2800,
  },
  {
    id: "board-021",
    pet: { id: "pet-021", name: "Bella", size: "Small" },
    owner: { id: "owner-021", name: "Elizabeth Taylor" },
    startDate: "2025-03-04T10:00:00Z",
    endDate: "2025-03-11T10:00:00Z",
    boardingStatus: "Released",
    paymentStatus: "Paid",
    totalPrice: 2240,
  },
]

/**
 * Helper functions for working with the sample data
 */

/**
 * Get a request by ID
 * @param id The request ID
 * @returns The request object or undefined if not found
 */
export const getRequestById = (id: string) => {
  return sampleRequests.find((req) => req.id === id)
}

/**
 * Get boarding details for a request
 * @param boardingId The boarding ID
 * @returns The boarding details or undefined if not found
 */
export const getBoardingDetails = (boardingId: string) => {
  return sampleBoardingData.find((boarding) => boarding.id === boardingId)
}

/**
 * Filter requests by status
 * @param requests The requests to filter
 * @param status The status to filter by
 * @returns Filtered requests
 */
export const filterRequestsByStatus = (requests: Request[], status: string) => {
  if (!status || status === "all") return requests
  return requests.filter((req) => req.status === status)
}

/**
 * Search requests by query
 * @param requests The requests to search
 * @param query The search query
 * @returns Matching requests
 */
export const searchRequests = (requests: Request[], query: string) => {
  if (!query) return requests

  const lowerQuery = query.toLowerCase()
  return requests.filter(
    (req) =>
      req.petName.toLowerCase().includes(lowerQuery) ||
      req.petOwnerName.toLowerCase().includes(lowerQuery) ||
      req.description.toLowerCase().includes(lowerQuery),
  )
}
