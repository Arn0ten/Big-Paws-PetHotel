import { DEFAULT_IMAGES, getPetImageByType } from "@/app/webapp/constants/image-constants"
import type { Pet, PetOwner } from "../utils/types"

/**
 * PET MANAGEMENT MODULE - SAMPLE DATA
 *
 * This file contains sample data for the Pet Management module.
 * In a production environment, this data would be fetched from the backend API.
 */

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

// Mock pet owners data
export const MOCK_PET_OWNERS: PetOwner[] = [
  {
    id: "owner-1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    avatar: DEFAULT_IMAGES.USER_AVATAR,
  },
  {
    id: "owner-2",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "234-567-8901",
    address: "456 Oak Ave, Somewhere, USA",
    avatar: DEFAULT_IMAGES.USER_AVATAR,
  },
  // Other pet owners...
]

// Mock pets data
export const MOCK_PETS: Pet[] = [
  {
    id: "pet-1",
    name: "Max",
    ownerId: "owner-1",
    type: "Dog",
    breed: "Labrador Retriever",
    age: 3,
    size: "Large",
    isBoarding: true,
    notes: "Friendly and energetic. Loves to play fetch and needs daily exercise.",
    image: getPetImageByType("Dog"),
  },
  {
    id: "pet-2",
    name: "Luna",
    ownerId: "owner-2",
    type: "Cat",
    breed: "Siamese",
    age: 2,
    size: "Medium",
    isBoarding: false,
    notes: "Quiet and independent. Prefers to be left alone most of the time.",
    image: getPetImageByType("Cat"),
  },
  // Other pets...
]

// Sample boarding history data for each pet
const PET_BOARDING_HISTORY = {
  "pet-1": [
    {
      id: "bh-pet1-1",
      startDate: "2024-01-10",
      endDate: "2024-01-15",
      checkInTime: "9:00 AM",
      checkOutTime: "4:00 PM",
      duration: "5 days",
      status: "completed",
      type: "LongStay",
      notes: "Enjoyed daily walks and playtime with other large dogs",
      totalPrice: 2500,
      paymentStatus: "Paid",
    },
    {
      id: "bh-pet1-2",
      startDate: "2023-11-05",
      endDate: "2023-11-12",
      checkInTime: "10:30 AM",
      checkOutTime: "5:30 PM",
      duration: "7 days",
      status: "completed",
      type: "LongStay",
      notes: "Special diet followed, extra playtime provided",
      totalPrice: 3500,
      paymentStatus: "Paid",
    },
  ],
  "pet-2": [
    {
      id: "bh-pet2-1",
      startDate: "2023-12-20",
      endDate: "2023-12-20",
      checkInTime: "8:30 AM",
      checkOutTime: "5:30 PM",
      duration: "9 hours",
      status: "completed",
      type: "Daycare",
      notes: "Kept in quiet area with window perch, minimal interaction with other cats",
      totalPrice: 270,
      paymentStatus: "Paid",
    },
    {
      id: "bh-pet2-2",
      startDate: "2023-10-15",
      endDate: "2023-10-18",
      checkInTime: "11:00 AM",
      checkOutTime: "3:00 PM",
      duration: "3 days",
      status: "completed",
      type: "LongStay",
      notes: "Provided private space, enjoyed individual playtime",
      totalPrice: 1200,
      paymentStatus: "Paid",
    },
  ],
}

// Sample request history data for each pet
const PET_REQUEST_HISTORY = {
  "pet-1": [
    {
      id: "rq-pet1-1",
      date: "2024-01-12",
      type: "grooming",
      status: "completed",
      notes: "Full grooming service with bath, nail trimming, and ear cleaning",
      price: 500,
      paymentStatus: "Paid",
    },
    {
      id: "rq-pet1-2",
      date: "2024-01-13",
      type: "photo",
      status: "completed",
      notes: "Daily photo update showing playtime with other dogs",
      price: null,
      paymentStatus: "N/A",
    },
    {
      id: "rq-pet1-3",
      date: "2024-01-14",
      type: "boarding-extension",
      status: "completed",
      notes: "Extended boarding by 1 day",
      price: 500,
      paymentStatus: "Paid",
    },
  ],
  "pet-2": [
    {
      id: "rq-pet2-1",
      date: "2023-12-20",
      type: "photo",
      status: "completed",
      notes: "Photo update of cat enjoying window perch",
      price: null,
      paymentStatus: "N/A",
    },
    {
      id: "rq-pet2-2",
      date: "2023-10-16",
      type: "video",
      status: "completed",
      notes: "Video of cat playing with toys during individual playtime",
      price: null,
      paymentStatus: "N/A",
    },
    {
      id: "rq-pet2-3",
      date: "2023-10-17",
      type: "custom",
      status: "completed",
      notes: "Special food request - premium cat food provided",
      price: 150,
      paymentStatus: "Paid",
    },
  ],
}

/**
 * Generate a unique pet ID
 *
 * @returns A unique pet ID string
 */
export const generatePetId = (): string => {
  return `pet-${Math.floor(Math.random() * 10000)}`
}

// Helper functions to get boarding and request history for a specific pet
export const getPetBoardingHistory = (petId: string) => {
  return PET_BOARDING_HISTORY[petId as keyof typeof PET_BOARDING_HISTORY] || []
}

export const getPetRequestHistory = (petId: string) => {
  return PET_REQUEST_HISTORY[petId as keyof typeof PET_REQUEST_HISTORY] || []
}
