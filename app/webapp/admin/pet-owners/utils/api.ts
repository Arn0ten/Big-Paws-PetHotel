// API functions for the Pet Owner Management module
import type { PetOwner, Pet } from "./types";
import { MOCK_PET_OWNERS } from "./constants";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
  await delay(1500);
  return [...MOCK_PET_OWNERS];
}

/**
 * Delete a pet owner
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function deletePetOwner(id: string): Promise<boolean> {
  // Simulate API call
  await delay(1000);
  return true;
}

/**
 * Add a pet to an owner
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function addPetToOwner(
  ownerId: string,
  pet: Partial<Pet>,
): Promise<Pet> {
  // Simulate API call
  await delay(1500);

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
  };

  return newPet;
}

/**
 * Board a pet
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function boardPet(
  ownerId: string,
  petId: string,
): Promise<boolean> {
  // Simulate API call
  await delay(1000);
  return true;
}

/**
 * Update a pet owner's information
 * BACKEND INTEGRATION POINT: Replace with actual API call
 */
export async function updatePetOwner(
  id: string,
  ownerData: Partial<PetOwner>,
): Promise<PetOwner> {
  // Simulate API call
  await delay(1500);

  // In a real implementation, this would send a PUT request to your API
  // Example:
  // const response = await fetch(`/api/pet-owners/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(ownerData)
  // });
  // return response.json();

  // For now, return a mock updated owner
  return {
    id,
    name: ownerData.name || "Updated Owner",
    email: ownerData.email || "updated@example.com",
    phone: ownerData.phone || "(555) 123-4567",
    address: ownerData.address || "123 Updated St, City, State 12345",
    avatar: ownerData.avatar || "/placeholder.svg?height=40&width=40",
    pets: [],
  };
}
