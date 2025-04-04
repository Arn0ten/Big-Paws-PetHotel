import { DEFAULT_IMAGES, getPetImageByType } from "@/app/webapp/constants/image-constants"
import type { Pet, PetOwner } from "../utils/types"

/**
 * PET MANAGEMENT MODULE - SAMPLE DATA
 *
 * This file contains sample data for the Pet Management module.
 * In a production environment, this data would be fetched from the backend API.
 *
 * BACKEND INTEGRATION NOTES:
 *
 * 1. API Endpoints Required:
 *    - GET /api/pets - Fetch all pets with optional filters
 *      Parameters: search, type, status, page, limit, sortBy, sortOrder
 *    - GET /api/pets/:id - Fetch a single pet by ID
 *    - POST /api/pets - Create a new pet
 *    - PUT /api/pets/:id - Update an existing pet
 *    - DELETE /api/pets/:id - Delete a pet
 *    - PUT /api/pets/:id/boarding - Update boarding status
 *    - GET /api/pet-owners - Fetch all pet owners (for pet assignment)
 *
 * 2. Data Models:
 *    - Pet: id, name, ownerId, type, breed, age, size, isBoarding, notes, image
 *    - PetOwner: id, name, email, phone, address
 *    - BoardingDetails: startDate, endDate, notes, services[]
 *
 * 3. Data Transformation:
 *    - Convert ISO date strings to Date objects if needed
 *    - Format pet age for display
 *    - Map pet owner IDs to owner names
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
  {
    id: "owner-3",
    name: "David Johnson",
    email: "david.johnson@example.com",
    phone: "345-678-9012",
    address: "789 Pine Rd, Nowhere, USA",
    avatar: DEFAULT_IMAGES.USER_AVATAR,
  },
  {
    id: "owner-4",
    name: "Sarah Lee",
    email: "sarah.lee@example.com",
    phone: "456-789-0123",
    address: "101 Maple Dr, Everywhere, USA",
    avatar: DEFAULT_IMAGES.USER_AVATAR,
  },
  {
    id: "owner-5",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "567-890-1234",
    address: "202 Cedar Ln, Anywhere, USA",
    avatar: DEFAULT_IMAGES.USER_AVATAR,
  },
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
  {
    id: "pet-3",
    name: "Charlie",
    ownerId: "owner-3",
    type: "Dog",
    breed: "Golden Retriever",
    age: 5,
    size: "Large",
    isBoarding: true,
    notes: "Very friendly with other dogs and children. Has a special diet for allergies.",
    image: getPetImageByType("Dog"),
  },
  {
    id: "pet-4",
    name: "Bella",
    ownerId: "owner-4",
    type: "Cat",
    breed: "Maine Coon",
    age: 4,
    size: "Large",
    isBoarding: false,
    notes: "Loves to be brushed and petted. Needs regular grooming due to long fur.",
    image: getPetImageByType("Cat"),
  },
  {
    id: "pet-5",
    name: "Rocky",
    ownerId: "owner-5",
    type: "Dog",
    breed: "Bulldog",
    age: 2,
    size: "Medium",
    isBoarding: false,
    notes: "Stubborn but loving. Needs short walks multiple times a day.",
    image: getPetImageByType("Dog"),
  },
  {
    id: "pet-6",
    name: "Milo",
    ownerId: "owner-1",
    type: "Cat",
    breed: "Bengal",
    age: 1,
    size: "Medium",
    isBoarding: true,
    notes: "Very active and playful. Needs lots of toys and climbing opportunities.",
    image: getPetImageByType("Cat"),
  },
  {
    id: "pet-7",
    name: "Daisy",
    ownerId: "owner-2",
    type: "Dog",
    breed: "Beagle",
    age: 6,
    size: "Medium",
    isBoarding: false,
    notes: "Loves to follow scents. Can be vocal when excited or left alone.",
    image: getPetImageByType("Dog"),
  },
  {
    id: "pet-8",
    name: "Oliver",
    ownerId: "owner-3",
    type: "Cat",
    breed: "Scottish Fold",
    age: 3,
    size: "Small",
    isBoarding: false,
    notes: "Quiet and gentle. Enjoys sitting on laps and being petted.",
    image: getPetImageByType("Cat"),
  },
  {
    id: "pet-9",
    name: "Cooper",
    ownerId: "owner-4",
    type: "Dog",
    breed: "Siberian Husky",
    age: 4,
    size: "Large",
    isBoarding: true,
    notes: "High energy and needs lots of exercise. Can be escape-prone if not properly contained.",
    image: getPetImageByType("Dog"),
  },
  {
    id: "pet-10",
    name: "Lucy",
    ownerId: "owner-5",
    type: "Cat",
    breed: "Ragdoll",
    age: 5,
    size: "Large",
    isBoarding: false,
    notes: "Very docile and affectionate. Tends to go limp when picked up.",
    image: getPetImageByType("Cat"),
  },
  {
    id: "pet-11",
    name: "Bailey",
    ownerId: "owner-1",
    type: "Dog",
    breed: "Poodle",
    age: 7,
    size: "Medium",
    isBoarding: false,
    notes: "Intelligent and easy to train. Requires regular grooming.",
    image: getPetImageByType("Dog"),
  },
  {
    id: "pet-12",
    name: "Simba",
    ownerId: "owner-2",
    type: "Cat",
    breed: "Persian",
    age: 6,
    size: "Medium",
    isBoarding: true,
    notes: "Requires daily grooming to prevent matting. Prefers quiet environments.",
    image: getPetImageByType("Cat"),
  },
]

/**
 * Generate a unique pet ID
 *
 * @returns A unique pet ID string
 */
export const generatePetId = (): string => {
  return `pet-${Math.floor(Math.random() * 10000)}`
}

