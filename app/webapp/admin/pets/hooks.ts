"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useToast } from "@/hooks/use-toast"
import type { Pet, PetOwner } from "./utils/types"
import { fetchPets, fetchPetOwners, deletePet, addNewPet, updatePetData, togglePetBoardingStatus } from "./utils/api"
import { calculateTotalPages } from "./utils/helpers"

/**
 * Custom hook for managing pets data
 */
export function usePets() {
  const { toast } = useToast()
  const [pets, setPets] = useState<Pet[]>([])
  const [petOwners, setPetOwners] = useState<PetOwner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch pets and pet owners
  const loadData = useCallback(async () => {
    try {
      const [petsData, ownersData] = await Promise.all([fetchPets(), fetchPetOwners()])
      setPets(petsData)
      setPetOwners(ownersData)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  // Initial data loading
  useEffect(() => {
    loadData()
  }, [loadData])

  // Refresh pets
  const refreshPets = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const data = await fetchPets()
      setPets(data)
      toast({
        title: "Success",
        description: "Pet data refreshed successfully",
      })
    } catch (error) {
      console.error("Error refreshing pets:", error)
      toast({
        title: "Error",
        description: "Failed to refresh pets. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }, [toast])

  // Add pet
  const addPet = useCallback(async (petData: Partial<Pet>, ownerId: string) => {
    try {
      const newPet = await addNewPet({ ...petData, ownerId })
      setPets((current) => [...current, newPet])
      return newPet
    } catch (error) {
      console.error("Error adding pet:", error)
      throw error
    }
  }, [])

  // Update pet
  const updatePet = useCallback(async (id: string, petData: Partial<Pet>) => {
    try {
      const updatedPet = await updatePetData(id, petData)
      setPets((current) =>
        current.map((pet) => {
          if (pet.id === id) {
            return { ...pet, ...updatedPet }
          }
          return pet
        }),
      )
      return updatedPet
    } catch (error) {
      console.error("Error updating pet:", error)
      throw error
    }
  }, [])

  // Delete pet
  const removePet = useCallback(async (id: string) => {
    try {
      await deletePet(id)
      setPets((current) => current.filter((pet) => pet.id !== id))
      return true
    } catch (error) {
      console.error("Error deleting pet:", error)
      throw error
    }
  }, [])

  // Toggle boarding status
  const toggleBoardingStatus = useCallback(async (id: string, boardingDetails?: any) => {
    try {
      const updatedPet = await togglePetBoardingStatus(id, boardingDetails)
      setPets((current) =>
        current.map((pet) => {
          if (pet.id === id) {
            return { ...pet, isBoarding: !pet.isBoarding }
          }
          return pet
        }),
      )
      return true
    } catch (error) {
      console.error("Error toggling boarding status:", error)
      throw error
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
  }
}

/**
 * Custom hook for pagination
 */
export interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
  initialPage?: number
}

export function usePagination({ totalItems, itemsPerPage, initialPage = 1 }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  // Calculate total pages
  const totalPages = useMemo(() => calculateTotalPages(totalItems, itemsPerPage), [totalItems, itemsPerPage])

  // Handle page change
  const goToPage = useCallback(
    (page: number) => {
      const targetPage = Math.max(1, Math.min(page, totalPages))
      setCurrentPage(targetPage)
    },
    [totalPages],
  )

  // Go to next page
  const nextPage = useCallback(() => {
    goToPage(currentPage + 1)
  }, [currentPage, goToPage])

  // Go to previous page
  const prevPage = useCallback(() => {
    goToPage(currentPage - 1)
  }, [currentPage, goToPage])

  // Reset to first page
  const resetPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  // Calculate start and end indices
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

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

