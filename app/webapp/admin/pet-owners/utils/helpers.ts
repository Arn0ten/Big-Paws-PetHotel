// Utility functions for the Pet Owner Management module
import type { PetOwner } from "./types"

/**
 * Filter pet owners based on search query
 */
export function filterPetOwners(owners: PetOwner[], query: string): PetOwner[] {
  if (!query) return owners

  const lowercaseQuery = query.toLowerCase()
  return owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(lowercaseQuery) ||
      owner.email.toLowerCase().includes(lowercaseQuery) ||
      owner.phone.includes(lowercaseQuery),
  )
}

/**
 * Paginate pet owners
 */
export function paginatePetOwners(owners: PetOwner[], currentPage: number, itemsPerPage: number): PetOwner[] {
  const startIndex = (currentPage - 1) * itemsPerPage
  return owners.slice(startIndex, startIndex + itemsPerPage)
}

/**
 * Calculate total pages
 */
export function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage)
}

/**
 * Generate a random ID for a new pet
 */
export function generatePetId(): string {
  return `P-${Math.floor(Math.random() * 10000)}`
}

