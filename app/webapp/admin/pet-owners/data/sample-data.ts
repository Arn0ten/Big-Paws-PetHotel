import type { Pet } from "../utils/types"

/**
 * PET OWNER MANAGEMENT MODULE - SAMPLE DATA
 *
 * This file contains sample data for the Pet Owner Management module.
 * In a production environment, this data would be fetched from the backend API.
 *
 * BACKEND INTEGRATION NOTES:
 *
 * 1. API Endpoints Required:
 *    - GET /api/pet-owners - Fetch all pet owners with optional filters
 *      Parameters: search, city, hasPets, page, limit, sortBy, sortOrder
 *    - GET /api/pet-owners/:id - Fetch a single pet owner by ID
 *    - POST /api/pet-owners - Create a new pet owner
 *    - PUT /api/pet-owners/:id - Update an existing pet owner
 *    - DELETE /api/pet-owners/:id - Delete a pet owner
 *    - POST /api/pet-owners/:id/pets - Add a pet to a pet owner
 *    - POST /api/boarding - Create a new boarding record
 *
 * 2. Data Models:
 *    - PetOwner: id, name, email, phone, address, avatar, pets[]
 *    - Pet: id, name, type, breed, age, size, isBoarding, notes, image, ownerId
 *    - BoardingDetails: petIds[], startDate, endDate, notes, services[]
 *
 * 3. Data Transformation:
 *    - Convert ISO date strings to Date objects if needed
 *    - Format address for display
 *    - Calculate pet counts and boarding status
 */

// Sample data for demonstration purposes
export const SAMPLE_PET_OWNERS = [
  {
    id: "PO-1001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1001",
        name: "Max",
        type: "Dog",
        breed: "Golden Retriever",
        age: 3,
        size: "Large",
        isBoarding: true,
        notes: "Friendly and energetic",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1001",
      },
      {
        id: "P-1002",
        name: "Bella",
        type: "Dog",
        breed: "Beagle",
        age: 2,
        size: "Medium",
        isBoarding: false,
        notes: "Loves to play fetch",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1001",
      },
    ],
  },
  {
    id: "PO-1002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Boston, MA 02108",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1003",
        name: "Whiskers",
        type: "Cat",
        breed: "Siamese",
        age: 4,
        size: "Small",
        isBoarding: true,
        notes: "Needs special diet",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1002",
      },
    ],
  },
  {
    id: "PO-1003",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "(555) 456-7890",
    address: "789 Pine St, Chicago, IL 60601",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [],
  },
  {
    id: "PO-1004",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "(555) 234-5678",
    address: "101 Maple Rd, San Francisco, CA 94102",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1004",
        name: "Rocky",
        type: "Dog",
        breed: "German Shepherd",
        age: 5,
        size: "Large",
        isBoarding: false,
        notes: "Protective but friendly",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1004",
      },
      {
        id: "P-1005",
        name: "Luna",
        type: "Cat",
        breed: "Maine Coon",
        age: 3,
        size: "Medium",
        isBoarding: true,
        notes: "Long-haired, needs regular grooming",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1004",
      },
      {
        id: "P-1006",
        name: "Charlie",
        type: "Dog",
        breed: "Poodle",
        age: 2,
        size: "Small",
        isBoarding: false,
        notes: "Hypoallergenic",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1004",
      },
    ],
  },
  {
    id: "PO-1005",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "(555) 876-5432",
    address: "202 Cedar Ln, Seattle, WA 98101",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1007",
        name: "Buddy",
        type: "Dog",
        breed: "Labrador",
        age: 4,
        size: "Large",
        isBoarding: true,
        notes: "Loves swimming",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1005",
      },
    ],
  },
  {
    id: "PO-1006",
    name: "Jennifer Martinez",
    email: "jennifer.m@example.com",
    phone: "(555) 345-6789",
    address: "303 Birch Dr, Austin, TX 78701",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1008",
        name: "Mittens",
        type: "Cat",
        breed: "Persian",
        age: 6,
        size: "Small",
        isBoarding: false,
        notes: "Very calm and quiet",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1006",
      },
      {
        id: "P-1009",
        name: "Oscar",
        type: "Cat",
        breed: "Tabby",
        age: 2,
        size: "Medium",
        isBoarding: true,
        notes: "Playful and curious",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1006",
      },
    ],
  },
  {
    id: "PO-1007",
    name: "Robert Taylor",
    email: "robert.t@example.com",
    phone: "(555) 567-8901",
    address: "404 Elm Ct, Denver, CO 80202",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [],
  },
  {
    id: "PO-1008",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "(555) 678-9012",
    address: "505 Spruce Ave, Miami, FL 33101",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1010",
        name: "Rex",
        type: "Dog",
        breed: "Boxer",
        age: 3,
        size: "Large",
        isBoarding: false,
        notes: "Energetic and needs lots of exercise",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1008",
      },
    ],
  },
  {
    id: "PO-1009",
    name: "Thomas Garcia",
    email: "thomas.g@example.com",
    phone: "(555) 789-0123",
    address: "606 Willow St, Portland, OR 97201",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1011",
        name: "Daisy",
        type: "Dog",
        breed: "Dachshund",
        age: 4,
        size: "Small",
        isBoarding: true,
        notes: "Loves to burrow in blankets",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1009",
      },
      {
        id: "P-1012",
        name: "Simba",
        type: "Cat",
        breed: "Orange Tabby",
        age: 1,
        size: "Small",
        isBoarding: false,
        notes: "Very young, still learning litter habits",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1009",
      },
    ],
  },
  {
    id: "PO-1010",
    name: "Patricia Lee",
    email: "patricia.l@example.com",
    phone: "(555) 890-1234",
    address: "707 Aspen Rd, Phoenix, AZ 85001",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1013",
        name: "Shadow",
        type: "Cat",
        breed: "Black Domestic Shorthair",
        age: 7,
        size: "Medium",
        isBoarding: false,
        notes: "Shy with strangers",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1010",
      },
    ],
  },
]

/**
 * Helper function to add a new pet to a pet owner
 *
 * @param ownerId - The ID of the pet owner
 * @param petData - The data for the new pet
 * @returns The new pet with a generated ID
 */
export const addPetToOwner = (ownerId: string, petData: Partial<Pet>): Pet => {
  const newPet: Pet = {
    id: `P-${Math.floor(Math.random() * 10000)}`,
    name: petData.name!,
    type: petData.type as "Dog" | "Cat",
    breed: petData.breed!,
    age: petData.age || 0,
    size: petData.size as "Small" | "Medium" | "Large" | "XL",
    isBoarding: false,
    notes: petData.notes || "",
    image: "/placeholder.svg?height=200&width=200",
    ownerId: ownerId,
  }

  return newPet
}

