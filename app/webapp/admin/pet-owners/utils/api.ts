// API functions for the Pet Owner Management module
import type { PetOwner, Pet } from "./types"
import { MOCK_PET_OWNERS } from "./constants"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Fetch all pet owners
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function fetchPetOwners(): Promise<PetOwner[]> {
  // Simulate API call
  await delay(1500)
  return [...MOCK_PET_OWNERS]
}

/**
 * Delete a pet owner
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function deletePetOwner(id: string): Promise<boolean> {
  // Simulate API call
  await delay(1000)
  return true
}

/**
 * Add a pet to an owner
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
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

  return newPet
}

/**
 * Board a pet
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function boardPet(ownerId: string, petId: string): Promise<boolean> {
  // Simulate API call
  await delay(1000)
  return true
}

