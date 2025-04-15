/**
 * SHARED SAMPLE DATA
 *
 * This file contains common data structures and constants used across multiple admin modules.
 * Centralizing these shared elements ensures consistency across the application.
 */

// Default images for users and pets
export const DEFAULT_IMAGES = {
  USER_AVATAR: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/default-pic-TTy4UvlTr4nVP0etctSbFI1CUrupvH.png",
  DOG_AVATAR: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop",
  CAT_AVATAR: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop",
  DEFAULT_PET: "/placeholder.svg?height=200&width=200",
}

// Helper function to get pet avatar based on type
export const getPetImageByType = (petType: string): string => {
  if (petType.toLowerCase() === "cat") return DEFAULT_IMAGES.CAT_AVATAR
  return DEFAULT_IMAGES.DOG_AVATAR
}

// Common pet sizes
export const PET_SIZES = ["Small", "Medium", "Large", "XL"] as const
export type PetSize = (typeof PET_SIZES)[number]

// Common pet types
export const PET_TYPES = ["Dog", "Cat"] as const
export type PetType = (typeof PET_TYPES)[number]

// Dog breeds
export const DOG_BREEDS = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "Bulldog",
  "Beagle",
  "Poodle",
  "Rottweiler",
  "Yorkshire Terrier",
  "Boxer",
  "Dachshund",
  "Shih Tzu",
  "Siberian Husky",
  "Doberman Pinscher",
  "Great Dane",
  "Chihuahua",
  "Pomeranian",
  "Border Collie",
  "Cocker Spaniel",
  "Australian Shepherd",
  "Cavalier King Charles Spaniel",
  "Shiba Inu",
  "Corgi",
  "Aspin", // Local Philippine breed
  "Mixed Breed",
]

// Cat breeds
export const CAT_BREEDS = [
  "Persian",
  "Maine Coon",
  "Siamese",
  "Ragdoll",
  "Bengal",
  "Abyssinian",
  "Birman",
  "Oriental Shorthair",
  "Sphynx",
  "Devon Rex",
  "Himalayan",
  "American Shorthair",
  "Scottish Fold",
  "British Shorthair",
  "Burmese",
  "Russian Blue",
  "Norwegian Forest Cat",
  "Siberian",
  "Exotic Shorthair",
  "Tonkinese",
  "Mixed Breed",
]

// Common request types
export const REQUEST_TYPES = ["photo", "video", "grooming", "boarding-extension", "custom"] as const
export type RequestType = (typeof REQUEST_TYPES)[number]

// Common request statuses
export const REQUEST_STATUSES = ["new", "in-progress", "completed", "rejected"] as const
export type RequestStatus = (typeof REQUEST_STATUSES)[number]

// Common boarding statuses
export const BOARDING_STATUSES = ["Boarding", "Done Boarding", "Released"] as const
export type BoardingStatus = (typeof BOARDING_STATUSES)[number]

// Common payment statuses
export const PAYMENT_STATUSES = ["Paid", "Not Paid", "Pending"] as const
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number]

// Common boarding types
export const BOARDING_TYPES = ["Daycare", "LongStay"] as const
export type BoardingType = (typeof BOARDING_TYPES)[number]

// Base interfaces for common entities
export interface BasePet {
  id: string
  name: string
  type: PetType
  breed: string
  age: number
  size: PetSize
  isBoarding: boolean
  notes?: string
  image: string
  ownerId: string
}

export interface BasePetOwner {
  id: string
  name: string
  email: string
  phone: string
  address: string
  avatar: string
  createdAt?: string
}

export interface BaseRequest {
  id: string
  type: RequestType
  petId: string
  petName: string
  petOwnerId: string
  petOwnerName: string
  status: RequestStatus
  createdAt: string
  description: string
  petSize?: PetSize
  boardingId?: string
  completedAt?: string
  completedBy?: string
  processingNotes?: string
}

export interface BaseBoardingOrder {
  id: string
  petId: string
  ownerId: string
  startDate: string
  endDate: string
  boardingType: BoardingType
  boardingStatus: BoardingStatus
  paymentStatus: PaymentStatus
  totalPrice: number
  baseAmount?: number
  createdAt: string
  updatedAt: string
  isOverdue?: boolean
}

// Helper function to generate a random date within a range
export const randomDate = (start: Date, end: Date): string => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString()
}

// Helper function to generate a random ID with a prefix
export const generateId = (prefix: string): string => {
  return `${prefix}-${Math.floor(Math.random() * 10000)}`
}
