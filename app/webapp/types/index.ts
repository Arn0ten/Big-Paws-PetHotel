/**
 * Application Types
 *
 * This file contains all the TypeScript types and interfaces used across the application.
 * Centralizing types helps maintain consistency and makes updates easier.
 *
 * BACKEND INTEGRATION NOTE:
 * When implementing the backend, ensure your API responses match these types
 * or update these types to match your API responses.
 */

import type { REQUEST_TYPES, REQUEST_STATUS, PET_SIZES } from "../constants"

// User Types
export type UserRole = "pet-owner" | "admin" | "staff"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  phoneNumber?: string
  address?: string
  city?: string
  province?: string
  postalCode?: string
  profileImage?: string
  createdAt: string
  updatedAt: string
}

// Pet Types
export type PetSize = (typeof PET_SIZES)[keyof typeof PET_SIZES]
export type PetGender = "male" | "female"
export type PetStatus = "active" | "boarding" | "inactive"

export interface Pet {
  id: string
  name: string
  ownerId: string
  ownerName?: string
  type: "dog" | "cat" | "other"
  breed: string
  age: number
  gender: PetGender
  size: PetSize
  weight: number
  color: string
  microchipNumber?: string
  vaccinated: boolean
  neutered: boolean
  specialNeeds?: string
  medicalConditions?: string
  medications?: string
  dietaryRestrictions?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
  notes?: string
  image?: string
  status: PetStatus
  createdAt: string
  updatedAt: string
}

// Request Types
export type RequestType = (typeof REQUEST_TYPES)[keyof typeof REQUEST_TYPES]
export type RequestStatus = (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS]

export interface Request {
  id: string
  type: RequestType
  petId: string
  petName: string
  petOwnerId: string
  petOwnerName: string
  status: RequestStatus
  createdAt: string
  description: string
  isUrgent: boolean
  petSize: PetSize
  boardingId?: string

  // For grooming requests
  groomingService?: string

  // For boarding extension requests
  extensionDetails?: {
    duration: string
    unit: "hours" | "days"
  }
  currentEndDate?: string

  // For rejected requests
  rejectedAt?: string
  rejectedBy?: string
  rejectionReason?: string

  // For reconsidered requests
  isReconsidered?: boolean
  reconsideredAt?: string
  reconsideredBy?: string
  reconsiderationReason?: string

  // For completed requests
  completedAt?: string
  completedBy?: string

  // For in-progress requests
  startedAt?: string
  startedBy?: string

  // Media attachments
  mediaUrls?: string[]
}

// Notification Types
export type NotificationType =
  | "request-created"
  | "request-updated"
  | "request-approved"
  | "request-rejected"
  | "request-completed"
  | "request-reconsidered"
  | "boarding-started"
  | "boarding-ending-soon"
  | "boarding-completed"
  | "system"

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  createdAt: string
  relatedId?: string // ID of related entity (request, boarding, etc.)
  relatedType?: string // Type of related entity
  link?: string // Link to navigate to when clicked
}

// Boarding Types
export interface Boarding {
  id: string
  petId: string
  petName: string
  petOwnerId: string
  petOwnerName: string
  startDate: string
  endDate: string
  status: "scheduled" | "active" | "completed" | "cancelled"
  kennelNumber?: string
  specialInstructions?: string
  feedingInstructions?: string
  medicationInstructions?: string
  checkInNotes?: string
  checkOutNotes?: string
  dailyNotes?: BoardingDailyNote[]
  pricing: {
    baseRate: number
    additionalServices: {
      id: string
      name: string
      price: number
    }[]
    discount?: number
    total: number
  }
  createdAt: string
  updatedAt: string
}

export interface BoardingDailyNote {
  date: string
  notes: string
  createdBy: string
  createdAt: string
}

// Pricing Types
export interface PricingItem {
  id: string
  name: string
  description: string
  basePrice: number
  sizeMultipliers: {
    [key in PetSize]: number
  }
  category: "boarding" | "grooming" | "daycare" | "additional"
  isPopular?: boolean
  duration?: string
  notes?: string
}

// Form Types
export interface RequestFormData {
  type: RequestType
  petId: string
  description: string
  isUrgent: boolean

  // For grooming requests
  groomingService?: string

  // For boarding extension requests
  extensionDetails?: {
    duration: string
    unit: "hours" | "days"
  }

  // For photo/video requests
  specificInstructions?: string
}

