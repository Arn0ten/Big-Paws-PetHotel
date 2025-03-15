import { v4 as uuidv4 } from "uuid"
import type { Pet, FilterOptions } from "./types"

/**
 * Generate a unique ID for a pet
 */
export function generatePetId(): string {
  return `pet-${uuidv4().slice(0, 8)}`
}

/**
 * Calculate total pages for pagination
 */
export function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.max(1, Math.ceil(totalItems / itemsPerPage))
}

/**
 * Filter pets based on search query and filter options
 */
export function filterPets(pets: Pet[], options: FilterOptions): Pet[] {
  const { searchQuery, type, status } = options

  return pets.filter((pet) => {
    // Filter by search query
    if (searchQuery && !pet.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by pet type
    if (type && pet.type !== type) {
      return false
    }

    // Filter by boarding status
    if (status !== undefined && pet.isBoarding !== status) {
      return false
    }

    return true
  })
}

/**
 * Format pet age for display
 */
export function formatPetAge(age: number): string {
  return `${age} ${age === 1 ? "year" : "years"}`
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

