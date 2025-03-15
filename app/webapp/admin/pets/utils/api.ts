// API functions for the Pet Management module
import type { Pet, PetOwner } from "./types"
import { MOCK_PETS, MOCK_PET_OWNERS } from "./constants"
import { generatePetId } from "./helpers"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Fetch all pets
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function fetchPets(): Promise<Pet[]> {
  // Simulate API call
  await delay(1500)
  return [...MOCK_PETS]
}

/**
 * Fetch all pet owners
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function fetchPetOwners(): Promise<PetOwner[]> {
  // Simulate API call
  await delay(1000)
  return [...MOCK_PET_OWNERS]
}

/**
 * Add a new pet
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function addNewPet(petData: Partial<Pet>): Promise<Pet> {
  // Simulate API call
  await delay(1500)

  const newPet: Pet = {
    id: generatePetId(),
    name: petData.name!,
    ownerId: petData.ownerId!,
    type: petData.type as "Dog" | "Cat",
    breed: petData.breed!,
    age: petData.age!,
    size: petData.size as "Small" | "Medium" | "Large" | "XL",
    isBoarding: false,
    notes: petData.notes,
    image: "/placeholder.svg?height=200&width=200",
  }

  return newPet
}

/**
 * Update a pet
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function updatePetData(id: string, petData: Partial<Pet>): Promise<Pet> {
  // Simulate API call
  await delay(1000)

  // Find the pet to update
  const petIndex = MOCK_PETS.findIndex((pet) => pet.id === id)
  if (petIndex === -1) {
    throw new Error("Pet not found")
  }

  // Create updated pet
  const updatedPet: Pet = {
    ...MOCK_PETS[petIndex],
    ...petData,
  }

  return updatedPet
}

/**
 * Delete a pet
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function deletePet(id: string): Promise<boolean> {
  // Simulate API call
  await delay(1000)
  return true
}

/**
 * Toggle pet boarding status
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function togglePetBoardingStatus(id: string, boardingDetails?: any): Promise<Pet> {
  // Simulate API call
  await delay(1000)

  // Find the pet to update
  const petIndex = MOCK_PETS.findIndex((pet) => pet.id === id)
  if (petIndex === -1) {
    throw new Error("Pet not found")
  }

  // Toggle boarding status
  const updatedPet: Pet = {
    ...MOCK_PETS[petIndex],
    isBoarding: !MOCK_PETS[petIndex].isBoarding,
  }

  return updatedPet
}

