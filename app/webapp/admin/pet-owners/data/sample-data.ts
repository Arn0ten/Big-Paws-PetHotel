import { DEFAULT_IMAGES, getPetImageByType } from "@/app/webapp/constants/image-constants"
import type { PetOwner } from "../utils/types"

/**
 * PET OWNER MANAGEMENT MODULE - SAMPLE DATA
 *
 * This file contains sample data for the Pet Owner Management module.
 * In a production environment, this data would be fetched from the backend API.
 */

// Mock data for pet owners
export const MOCK_PET_OWNERS: PetOwner[] = [
  {
    id: "PO-001",
    name: "John Doe",
    avatar: DEFAULT_IMAGES.USER_AVATAR,
    email: "john.doe@example.com",
    phone: "09123456789",
    address: "123 Main St, Makati City, Metro Manila",
    pets: [
      {
        id: "P-001",
        name: "Buddy",
        type: "Dog",
        breed: "Golden Retriever",
        age: 3,
        size: "Large",
        isBoarding: true,
        image: getPetImageByType("Dog"),
      },
      {
        id: "P-002",
        name: "Max",
        type: "Dog",
        breed: "German Shepherd",
        age: 5,
        size: "Large",
        isBoarding: false,
        image: getPetImageByType("Dog"),
      },
    ],
    createdAt: "2023-01-15",
  },
  {
    id: "PO-002",
    name: "Maria Garcia",
    avatar: DEFAULT_IMAGES.USER_AVATAR,
    email: "maria.garcia@example.com",
    phone: "09234567890",
    address: "456 Oak Ave, Quezon City, Metro Manila",
    pets: [
      {
        id: "P-003",
        name: "Luna",
        type: "Cat",
        breed: "Siamese",
        age: 2,
        size: "Medium",
        isBoarding: true,
        image: getPetImageByType("Cat"),
      },
    ],
    createdAt: "2023-02-20",
  },
  // Other pet owners...
]

// Sample boarding history data for each pet
const PET_BOARDING_HISTORY = {
  "P-001": [
    {
      id: "bh-p001-1",
      startDate: "2023-12-15",
      endDate: "2023-12-20",
      checkInTime: "10:00 AM",
      checkOutTime: "5:00 PM",
      duration: "5 days",
      status: "completed",
      type: "LongStay",
      notes: "Regular diet, daily walks, enjoyed playtime with other dogs",
      totalPrice: 2400,
      paymentStatus: "Paid",
    },
    {
      id: "bh-p001-2",
      startDate: "2023-11-01",
      endDate: "2023-11-03",
      checkInTime: "9:30 AM",
      checkOutTime: "4:30 PM",
      duration: "2 days",
      status: "completed",
      type: "LongStay",
      notes: "Special diet followed, medication administered as scheduled",
      totalPrice: 960,
      paymentStatus: "Paid",
    },
  ],
  "P-002": [
    {
      id: "bh-p002-1",
      startDate: "2023-10-10",
      endDate: "2023-10-10",
      checkInTime: "8:00 AM",
      checkOutTime: "6:00 PM",
      duration: "10 hours",
      status: "completed",
      type: "Daycare",
      notes: "Socialized well with other dogs, enjoyed outdoor activities",
      totalPrice: 300,
      paymentStatus: "Paid",
    },
  ],
  "P-003": [
    {
      id: "bh-p003-1",
      startDate: "2023-11-20",
      endDate: "2023-11-25",
      checkInTime: "11:00 AM",
      checkOutTime: "3:00 PM",
      duration: "5 days",
      status: "completed",
      type: "LongStay",
      notes: "Preferred quiet spaces, enjoyed individual playtime",
      totalPrice: 2000,
      paymentStatus: "Paid",
    },
    {
      id: "bh-p003-2",
      startDate: "2023-09-15",
      endDate: "2023-09-15",
      checkInTime: "9:00 AM",
      checkOutTime: "5:00 PM",
      duration: "8 hours",
      status: "completed",
      type: "Daycare",
      notes: "Kept in quiet area, enjoyed window perching",
      totalPrice: 240,
      paymentStatus: "Paid",
    },
  ],
}

// Sample request history data for each pet
const PET_REQUEST_HISTORY = {
  "P-001": [
    {
      id: "rq-p001-1",
      date: "2023-12-18",
      type: "grooming",
      status: "completed",
      notes: "Full grooming service with nail trimming and bath",
      price: 450,
      paymentStatus: "Paid",
    },
    {
      id: "rq-p001-2",
      date: "2023-12-17",
      type: "photo",
      status: "completed",
      notes: "Daily photo update showing playtime activities",
      price: null,
      paymentStatus: "N/A",
    },
  ],
  "P-002": [
    {
      id: "rq-p002-1",
      date: "2023-10-10",
      type: "video",
      status: "completed",
      notes: "Video of daycare activities and socialization",
      price: null,
      paymentStatus: "N/A",
    },
    {
      id: "rq-p002-2",
      date: "2023-09-05",
      type: "boarding-extension",
      status: "rejected",
      notes: "Request to extend boarding by 1 day - no space available",
      price: null,
      paymentStatus: "N/A",
    },
  ],
  "P-003": [
    {
      id: "rq-p003-1",
      date: "2023-11-22",
      type: "photo",
      status: "completed",
      notes: "Daily photo update showing cat in relaxed state",
      price: null,
      paymentStatus: "N/A",
    },
    {
      id: "rq-p003-2",
      date: "2023-11-23",
      type: "custom",
      status: "completed",
      notes: "Special food request - premium cat food provided",
      price: 120,
      paymentStatus: "Paid",
    },
    {
      id: "rq-p003-3",
      date: "2023-11-24",
      type: "boarding-extension",
      status: "completed",
      notes: "Extended boarding by 1 day",
      price: 400,
      paymentStatus: "Paid",
    },
  ],
}

// Helper functions to get boarding and request history for a specific pet
export const getPetBoardingHistory = (petId: string) => {
  return PET_BOARDING_HISTORY[petId as keyof typeof PET_BOARDING_HISTORY] || []
}

export const getPetRequestHistory = (petId: string) => {
  return PET_REQUEST_HISTORY[petId as keyof typeof PET_REQUEST_HISTORY] || []
}
