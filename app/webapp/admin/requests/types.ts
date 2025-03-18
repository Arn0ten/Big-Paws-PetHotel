// Types for request management module

/**
 * Request Type Enum
 *
 * BACKEND INTEGRATION:
 * These types MUST match the types used in the pet owner interface
 * and in the database schema
 */
export type RequestType = "photo" | "video" | "grooming" | "boarding-extension" | "custom"

/**
 * Request Status Enum
 *
 * BACKEND INTEGRATION:
 * These statuses should match your database schema
 */
export type RequestStatus = "new" | "in-progress" | "completed" | "rejected"

/**
 * Payment Status Enum
 */
export type PaymentStatus = "Paid" | "Not Paid" | "Pending"

/**
 * Pet Size Enum
 */
export type PetSize = "Small" | "Medium" | "Large" | "XLarge"

/**
 * Media Preview Interface
 * Used for file uploads in the UI
 */
export interface MediaPreview {
  file: File
  url: string
  type: "image" | "video"
}

/**
 * Boarding Extension Interface
 * Details for boarding extension requests
 */
export interface BoardingExtension {
  duration: string
  unit: "hours" | "days"
  currentEndDate: string
  newEndDate?: string
}

/**
 * Grooming Service Interface
 * Details for grooming service requests
 */
export interface GroomingService {
  type: string
  price: number
}

/**
 * Request Interface
 * Main data structure for request management
 *
 * BACKEND INTEGRATION:
 * This should match your database schema for requests
 */
export interface Request {
  id: string
  type: RequestType
  petName: string
  petSize: PetSize
  petOwnerId: string
  petOwnerName: string
  status: RequestStatus
  createdAt: string
  description: string
  isUrgent: boolean
  completedAt?: string
  completedBy?: string
  processingNotes?: string
  mediaUrl?: string
  mediaType?: "image" | "video"
  groomingService?: string
  extensionDetails?: BoardingExtension
  price?: number
  fileUploaded?: boolean
  extensionApproved?: boolean
  newEndDate?: string
  isNew?: boolean
  boardingId?: string
}

/**
 * Pricing constants based on pet size
 *
 * BACKEND INTEGRATION:
 * These rates should be fetched from your database or configuration
 */
export const BOARDING_RATES = {
  hourly: {
    Small: 25,
    Medium: 30,
    Large: 40,
    XLarge: 50,
  },
  daily: {
    Small: 320,
    Medium: 400,
    Large: 480,
    XLarge: 550,
  },
}

export const GROOMING_RATES = {
  "basic-wash": {
    Small: 180,
    Medium: 220,
    Large: 280,
    XLarge: 320,
  },
  "premium-wash": {
    Small: 300,
    Medium: 450,
    Large: 650,
    XLarge: 850,
  },
  "premium-wash-cut": {
    Small: 450,
    Medium: 600,
    Large: 700,
    XLarge: 850,
  },
  "full-grooming": {
    Small: 500,
    Medium: 650,
    Large: 700,
    XLarge: 800,
  },
}

