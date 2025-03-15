"use client"

// Consolidated hooks file
import { useState, useEffect, useCallback, useMemo } from "react"
import { useToast } from "@/hooks/use-toast"
import type { PetOwner, Pet, FormErrors, PetFormState } from "./utils/types"
import { fetchPetOwners, deletePetOwner, addPetToOwner } from "./utils/api"
import { calculateTotalPages } from "./utils/helpers"

/**
 * Custom hook for managing pet owners data
 */
export function usePetOwners() {
  const { toast } = useToast()
  const [petOwners, setPetOwners] = useState<PetOwner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch pet owners
  const loadPetOwners = useCallback(async () => {
    try {
      const data = await fetchPetOwners()
      setPetOwners(data)
    } catch (error) {
      console.error("Error fetching pet owners:", error)
      toast({
        title: "Error",
        description: "Failed to load pet owners. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  // Initial data loading
  useEffect(() => {
    loadPetOwners()
  }, [loadPetOwners])

  // Refresh pet owners
  const refreshPetOwners = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const data = await fetchPetOwners()
      setPetOwners(data)
      toast({
        title: "Success",
        description: "Pet owner data refreshed successfully",
      })
    } catch (error) {
      console.error("Error refreshing pet owners:", error)
      toast({
        title: "Error",
        description: "Failed to refresh pet owners. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }, [toast])

  // Delete pet owner
  const removePetOwner = useCallback(
    async (id: string) => {
      try {
        await deletePetOwner(id)
        setPetOwners((current) => current.filter((owner) => owner.id !== id))
        toast({
          title: "Success",
          description: "Pet owner deleted successfully",
        })
        return true
      } catch (error) {
        console.error("Error deleting pet owner:", error)
        toast({
          title: "Error",
          description: "Failed to delete pet owner. Please try again.",
          variant: "destructive",
        })
        return false
      }
    },
    [toast],
  )

  // Add pet to owner
  const addPet = useCallback(
    async (ownerId: string, petData: Partial<Pet>) => {
      try {
        const newPet = await addPetToOwner(ownerId, petData)

        // Update pet owners state with new pet
        setPetOwners((current) =>
          current.map((owner) => {
            if (owner.id === ownerId) {
              return {
                ...owner,
                pets: [...owner.pets, newPet],
              }
            }
            return owner
          }),
        )

        return { success: true, pet: newPet }
      } catch (error) {
        console.error("Error adding pet:", error)
        toast({
          title: "Error",
          description: "Failed to add pet. Please try again.",
          variant: "destructive",
        })
        return { success: false, pet: null }
      }
    },
    [toast],
  )

  return {
    petOwners,
    setPetOwners,
    isLoading,
    isRefreshing,
    refreshPetOwners,
    removePetOwner,
    addPet,
  }
}

/**
 * Custom hook for managing pet form state and validation
 */
export function usePetForm(initialState: PetFormState = { type: "Dog", size: "Medium" }) {
  const [formState, setFormState] = useState<PetFormState>(initialState)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form field
  const updateField = useCallback(
    (field: keyof Pet, value: any) => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
        // Reset breed if pet type changes
        ...(field === "type" && { breed: undefined }),
      }))

      // Clear error for this field if it exists
      if (formErrors[field]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[field]
          return newErrors
        })
      }
    },
    [formErrors],
  )

  // Validate form
  const validateForm = useCallback(() => {
    const errors: FormErrors = {}
    const requiredFields: (keyof Pet)[] = ["name", "type", "breed", "age", "size"]

    requiredFields.forEach((field) => {
      if (!formState[field]) {
        errors[field] = true
      }
    })

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [formState])

  // Reset form
  const resetForm = useCallback(() => {
    setFormState({ type: "Dog", size: "Medium" })
    setFormErrors({})
    setIsSubmitting(false)
  }, [])

  return {
    formState,
    formErrors,
    isSubmitting,
    setIsSubmitting,
    updateField,
    validateForm,
    resetForm,
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

