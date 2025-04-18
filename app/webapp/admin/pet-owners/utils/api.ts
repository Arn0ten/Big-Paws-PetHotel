// API functions for the Pet Owner Management module
import type { PetOwner, Pet } from "./types"
import { MOCK_PET_OWNERS } from "./constants"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * BACKEND INTEGRATION NOTES:
 *
 * This file contains API functions for pet owner management.
 * Replace these mock implementations with actual API calls.
 *
 * Integration points:
 * 1. fetchPetOwners: GET /api/pet-owners
 * 2. deletePetOwner: DELETE /api/pet-owners/{id}
 * 3. addPetToOwner: POST /api/pet-owners/{ownerId}/pets
 * 4. boardPet: POST /api/boarding
 * 5. updatePetOwner: PUT /api/pet-owners/{id} (to be implemented)
 */

/**
 * Fetch all pet owners
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function fetchPetOwners(): Promise<PetOwner[]> {
  // Simulate API call
  await delay(1500)
  return [...MOCK_PET_OWNERS]
}

// Add logging function to deletePetOwner
export async function deletePetOwner(id: string): Promise<boolean> {
  // Simulate API call
  await delay(1000)

  // Log the successful operation
  logAdminActivity({
    module: "pet-owner",
    action: "delete",
    description: `Deleted pet owner with ID: ${id}`,
    status: "completed",
    entityId: id,
  })

  return true
}

// Add logging function to addPetToOwner
export async function addPetToOwner(ownerId: string, pet: Partial<Pet>): Promise<Pet> {
  // Simulate API call
  await delay(1500)

  const newPet: Pet = {
    id: `P-${Math.floor(Math.random() * 10000)}`,
    name: pet.name!,
    type: pet.type as "Dog" | "Cat",
    breed: pet.breed!,
    age: pet.age,
    size: pet.size as "Small" | "Medium" | "Large" | "XL",
    isBoarding: false,
    notes: pet.notes,
    image: "/placeholder.svg?height=200&width=200",
  }

  // Log the successful operation
  logAdminActivity({
    module: "pet-owner",
    action: "add",
    description: `Added pet ${newPet.name} to owner ID: ${ownerId}`,
    status: "completed",
    entityId: newPet.id,
    relatedEntityId: ownerId,
  })

  return newPet
}

// Add logging function to boardPet
export async function boardPet(ownerId: string, petId: string): Promise<boolean> {
  // Simulate API call
  await delay(1000)

  // Log the successful operation
  logAdminActivity({
    module: "pet-owner",
    action: "board",
    description: `Initiated boarding for pet ID: ${petId} (Owner ID: ${ownerId})`,
    status: "completed",
    entityId: petId,
    relatedEntityId: ownerId,
  })

  return true
}

// Add logging function to updatePetOwner
export async function updatePetOwner(id: string, ownerData: Partial<PetOwner>): Promise<PetOwner> {
  // Simulate API call
  await delay(1500)

  // In a real implementation, this would send a PUT request to your API
  // Example:
  // const response = await fetch(`/api/pet-owners/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(ownerData)
  // });
  // return response.json();

  // For now, return a mock updated owner
  const updatedOwner = {
    id,
    name: ownerData.name || "Updated Owner",
    email: ownerData.email || "updated@example.com",
    phone: ownerData.phone || "(555) 123-4567",
    address: ownerData.address || "123 Updated St, City, State 12345",
    avatar: ownerData.avatar || "/placeholder.svg?height=40&width=40",
    pets: [],
  }

  // Log the successful operation
  logAdminActivity({
    module: "pet-owner",
    action: "update",
    description: `Updated pet owner: ${updatedOwner.name} (ID: ${id})`,
    status: "completed",
    entityId: id,
  })

  return updatedOwner
}

// Add the logAdminActivity helper function at the end of the file
interface LogActivityParams {
  module: string
  action: string
  description: string
  status: string
  entityId: string
  relatedEntityId?: string
  metadata?: Record<string, any>
}

function logAdminActivity(params: LogActivityParams): void {
  // In a real implementation, this would send a POST request to your API
  // Example:
  // fetch('/api/admin/activity-log', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     ...params,
  //     timestamp: new Date().toISOString(),
  //     performedBy: "Current Admin User", // This would come from auth context
  //   })
  // });

  // For now, just log to console
  console.log("Admin Activity Log:", {
    ...params,
    timestamp: new Date().toISOString(),
    performedBy: "Current Admin User", // This would come from auth context
  })
}
