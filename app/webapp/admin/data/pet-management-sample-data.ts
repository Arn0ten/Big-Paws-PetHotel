/**
 * PET MANAGEMENT SAMPLE DATA
 *
 * This file contains centralized sample data for the Pet Management module.
 */

import {
  type BasePet,
  type BasePetOwner,
  DEFAULT_IMAGES,
  getPetImageByType,
} from "./shared-sample-data";

// Pet interface extending the base interface
export interface Pet extends BasePet {}

// Pet Owner interface extending the base interface
export interface PetOwner extends BasePetOwner {}

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
  {
    id: "owner-3",
    name: "David Johnson",
    email: "david.johnson@example.com",
    phone: "345-678-9012",
    address: "789 Pine Rd, Elsewhere, USA",
    avatar: DEFAULT_IMAGES.USER_AVATAR,
  },
  {
    id: "owner-4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "456-789-0123",
    address: "101 Cedar Ln, Nowhere, USA",
    avatar: DEFAULT_IMAGES.USER_AVATAR,
  },
  {
    id: "owner-5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "567-890-1234",
    address: "202 Maple Dr, Anywhere, USA",
    avatar: DEFAULT_IMAGES.USER_AVATAR,
  },
];

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
    notes:
      "Friendly and energetic. Loves to play fetch and needs daily exercise.",
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
  {
    id: "pet-3",
    name: "Buddy",
    ownerId: "owner-1",
    type: "Dog",
    breed: "Golden Retriever",
    age: 5,
    size: "Large",
    isBoarding: false,
    notes: "Very friendly with other dogs and children. Has a special diet.",
    image: getPetImageByType("Dog"),
  },
  {
    id: "pet-4",
    name: "Bella",
    ownerId: "owner-3",
    type: "Dog",
    breed: "Beagle",
    age: 4,
    size: "Medium",
    isBoarding: true,
    notes: "Loves to explore and follow scents. Needs secure fencing.",
    image: getPetImageByType("Dog"),
  },
  {
    id: "pet-5",
    name: "Oliver",
    ownerId: "owner-4",
    type: "Cat",
    breed: "Maine Coon",
    age: 3,
    size: "Large",
    isBoarding: true,
    notes: "Friendly and sociable for a cat. Enjoys being brushed.",
    image: getPetImageByType("Cat"),
  },
  {
    id: "pet-6",
    name: "Charlie",
    ownerId: "owner-5",
    type: "Dog",
    breed: "Poodle",
    age: 6,
    size: "Medium",
    isBoarding: false,
    notes: "Intelligent and easily trained. Requires regular grooming.",
    image: getPetImageByType("Dog"),
  },
  {
    id: "pet-7",
    name: "Lucy",
    ownerId: "owner-2",
    type: "Cat",
    breed: "Ragdoll",
    age: 2,
    size: "Medium",
    isBoarding: true,
    notes: "Very affectionate and relaxed. Enjoys being held.",
    image: getPetImageByType("Cat"),
  },
  {
    id: "pet-8",
    name: "Cooper",
    ownerId: "owner-3",
    type: "Dog",
    breed: "Australian Shepherd",
    age: 3,
    size: "Medium",
    isBoarding: false,
    notes: "High energy and needs lots of exercise. Very intelligent.",
    image: getPetImageByType("Dog"),
  },
];

// Sample boarding history data for each pet
export const PET_BOARDING_HISTORY = {
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
      notes:
        "Kept in quiet area with window perch, minimal interaction with other cats",
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
  "pet-3": [
    {
      id: "bh-pet3-1",
      startDate: "2023-09-10",
      endDate: "2023-09-17",
      checkInTime: "9:30 AM",
      checkOutTime: "4:30 PM",
      duration: "7 days",
      status: "completed",
      type: "LongStay",
      notes: "Special diet maintained, got along well with other dogs",
      totalPrice: 3500,
      paymentStatus: "Paid",
    },
  ],
  "pet-4": [
    {
      id: "bh-pet4-1",
      startDate: "2024-01-05",
      endDate: "2024-01-12",
      checkInTime: "10:00 AM",
      checkOutTime: "5:00 PM",
      duration: "7 days",
      status: "active",
      type: "LongStay",
      notes: "Currently boarding, enjoys playtime with other medium-sized dogs",
      totalPrice: 2800,
      paymentStatus: "Paid",
    },
  ],
  "pet-5": [
    {
      id: "bh-pet5-1",
      startDate: "2024-01-08",
      endDate: "2024-01-15",
      checkInTime: "11:30 AM",
      checkOutTime: "3:30 PM",
      duration: "7 days",
      status: "active",
      type: "LongStay",
      notes: "Currently boarding, provided with a quiet space and window perch",
      totalPrice: 2800,
      paymentStatus: "Paid",
    },
  ],
  "pet-7": [
    {
      id: "bh-pet7-1",
      startDate: "2024-01-07",
      endDate: "2024-01-14",
      checkInTime: "9:00 AM",
      checkOutTime: "4:00 PM",
      duration: "7 days",
      status: "active",
      type: "LongStay",
      notes: "Currently boarding, enjoys quiet spaces and gentle handling",
      totalPrice: 2800,
      paymentStatus: "Paid",
    },
  ],
};

// Sample request history data for each pet
export const PET_REQUEST_HISTORY = {
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
  "pet-4": [
    {
      id: "rq-pet4-1",
      date: "2024-01-07",
      type: "photo",
      status: "completed",
      notes: "Daily photo update showing Bella enjoying playtime",
      price: null,
      paymentStatus: "N/A",
    },
    {
      id: "rq-pet4-2",
      date: "2024-01-09",
      type: "grooming",
      status: "completed",
      notes: "Basic grooming with nail trim",
      price: 350,
      paymentStatus: "Paid",
    },
  ],
  "pet-5": [
    {
      id: "rq-pet5-1",
      date: "2024-01-10",
      type: "photo",
      status: "completed",
      notes: "Photo update of Oliver relaxing in his boarding space",
      price: null,
      paymentStatus: "N/A",
    },
  ],
  "pet-7": [
    {
      id: "rq-pet7-1",
      date: "2024-01-09",
      type: "video",
      status: "completed",
      notes: "Video of Lucy playing with toys",
      price: null,
      paymentStatus: "N/A",
    },
  ],
};

/**
 * Generate a unique pet ID
 *
 * @returns A unique pet ID string
 */
export const generatePetId = (): string => {
  return `pet-${Math.floor(Math.random() * 10000)}`;
};

// Helper functions to get boarding and request history for a specific pet
export const getPetBoardingHistory = (petId: string) => {
  return PET_BOARDING_HISTORY[petId as keyof typeof PET_BOARDING_HISTORY] || [];
};

export const getPetRequestHistory = (petId: string) => {
  return PET_REQUEST_HISTORY[petId as keyof typeof PET_REQUEST_HISTORY] || [];
};
