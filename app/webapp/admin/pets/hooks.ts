"use client"

/**
 * Custom hooks for the Pet Management module
 *
 * BACKEND INTEGRATION POINTS:
 * 1. Replace the sample data with API calls to fetch pets and pet owners
 * 2. Implement CRUD operations for pets and pet owners
 * 3. Add error handling and loading states
 * 4. Implement real-time updates using WebSockets or polling
 */
import { useState, useEffect, useCallback } from "react"
import type { Pet, PetOwner } from "./utils/types"
import { MOCK_PETS, MOCK_PET_OWNERS } from "../data/pet-management-sample-data"

/**
 * Custom hook for pagination
 */
export function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: {
  totalItems: number
  itemsPerPage?: number
  initialPage?: number
}) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  // Ensure current page is within bounds
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  // Calculate start and end indices
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  // Navigation functions
  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    },
    [totalPages],
  )

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }, [currentPage, totalPages])

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }, [currentPage])

  const resetPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  return {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
    startIndex,
    endIndex,
  }
}

/**
 * Custom hook for managing pets data
 *
 * BACKEND INTEGRATION:
 * Replace this hook with actual API calls to fetch and manage pets data
 */
export function usePets() {
  const [pets, setPets] = useState<Pet[]>([])
  const [petOwners, setPetOwners] = useState<PetOwner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null)

  // Fetch pets and pet owners
  useEffect(() => {
    // BACKEND INTEGRATION: Replace with actual API calls
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Load sample data
        setPets(MOCK_PETS)
        setPetOwners(
          MOCK_PET_OWNERS.map((owner) => ({
            ...owner,
            pets: MOCK_PETS.filter((pet) => pet.ownerId === owner.id),
          })),
        )

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Refresh pets data
  const refreshPets = useCallback(async () => {
    setIsRefreshing(true)

    // BACKEND INTEGRATION: Replace with actual API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reload sample data
      setPets(MOCK_PETS)
      setPetOwners(
        MOCK_PET_OWNERS.map((owner) => ({
          ...owner,
          pets: MOCK_PETS.filter((pet) => pet.ownerId === owner.id),
        })),
      )

      setIsRefreshing(false)
    } catch (error) {
      console.error("Error refreshing data:", error)
      setIsRefreshing(false)
    }
  }, [])

  // Add a new pet
  const addPet = useCallback(async (petData: Partial<Pet>, ownerId: string) => {
    // BACKEND INTEGRATION: Replace with actual API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a new pet ID
      const newPet: Pet = {
        id: `pet-${Date.now()}`,
        name: petData.name || "New Pet",
        type: petData.type as "Dog" | "Cat",
        breed: petData.breed || "Unknown",
        age: petData.age || 0,
        size: petData.size as "Small" | "Medium" | "Large" | "XL",
        isBoarding: false,
        notes: petData.notes || "",
        image: petData.image || "/placeholder.svg?height=200&width=200",
        ownerId,
      }

      // Update local state
      setPets((prev) => [...prev, newPet])

      return true
    } catch (error) {
      console.error("Error adding pet:", error)
      return false
    }
  }, [])

  // Update an existing pet
  const updatePet = useCallback(async (petId: string, petData: Partial<Pet>) => {
    // BACKEND INTEGRATION: Replace with actual API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      setPets((prev) => prev.map((pet) => (pet.id === petId ? { ...pet, ...petData } : pet)))

      return true
    } catch (error) {
      console.error("Error updating pet:", error)
      return false
    }
  }, [])

  // Remove a pet
  const removePet = useCallback(async (petId: string) => {
    // BACKEND INTEGRATION: Replace with actual API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      setPets((prev) => prev.filter((pet) => pet.id !== petId))

      return true
    } catch (error) {
      console.error("Error removing pet:", error)
      return false
    }
  }, [])

  // Toggle boarding status
  const toggleBoardingStatus = useCallback(async (petId: string, boardingDetails?: any) => {
    // BACKEND INTEGRATION: Replace with actual API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      setPets((prev) => prev.map((pet) => (pet.id === petId ? { ...pet, isBoarding: !pet.isBoarding } : pet)))

      return true
    } catch (error) {
      console.error("Error toggling boarding status:", error)
      return false
    }
  }, [])

  return {
    pets,
    petOwners,
    isLoading,
    isRefreshing,
    refreshPets,
    addPet,
    updatePet,
    removePet,
    toggleBoardingStatus,
    selectedOwnerId,
    setSelectedOwnerId,
  }
}
