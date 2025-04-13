"use client"

// Consolidated hooks file
import { useState, useCallback } from "react"
import type { PetOwner, Pet, FormErrors, PetFormState } from "./utils/types"
// import { MOCK_PET_OWNERS } from "@/app/webapp/admin/data/pet-owner-sample-data"
import { MOCK_PET_OWNERS } from "../data/pet-owner-sample-data"

/**
 * Custom hook for managing pet owners data
 *
 * BACKEND INTEGRATION:
 * Replace this hook with actual API calls in production
 */
export function usePetOwners() {
  const [petOwners, setPetOwners] = useState<PetOwner[]>(MOCK_PET_OWNERS)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Refresh pet owners data
  const refreshPetOwners = useCallback(async () => {
    setIsRefreshing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real implementation, this would be an API call
    // const response = await fetch('/api/pet-owners')
    // const data = await response.json()
    // setPetOwners(data)

    setIsRefreshing(false)
  }, [])

  // Add a new pet owner
  const addPetOwner = useCallback(async (ownerData: Partial<PetOwner>) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a new pet owner with the provided data
    const newPetOwner: PetOwner = {
      id: `owner-${Date.now()}`,
      name: ownerData.name!,
      email: ownerData.email!,
      phone: ownerData.phone!,
      address: ownerData.address!,
      avatar: ownerData.avatar || `/placeholder.svg?height=200&width=200`,
      pets: [],
      createdAt: new Date().toISOString(),
    }

    // Update local state
    setPetOwners((prev) => [...prev, newPetOwner])

    setIsLoading(false)
    return newPetOwner
  }, [])

  // Update an existing pet owner
  const updatePetOwner = useCallback(async (id: string, ownerData: Partial<PetOwner>) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update local state
    setPetOwners((prev) => prev.map((owner) => (owner.id === id ? { ...owner, ...ownerData } : owner)))

    setIsLoading(false)
  }, [])

  // Remove a pet owner
  const removePetOwner = useCallback(async (id: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update local state
    setPetOwners((prev) => prev.filter((owner) => owner.id !== id))

    setIsLoading(false)
  }, [])

  return {
    petOwners,
    setPetOwners,
    isLoading,
    isRefreshing,
    refreshPetOwners,
    addPetOwner,
    updatePetOwner,
    removePetOwner,
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
export function usePagination({ totalItems, itemsPerPage = 5 }: { totalItems: number; itemsPerPage?: number }) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  // Ensure current page is within valid range
  if (currentPage > totalPages) {
    setCurrentPage(totalPages)
  }

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(validPage)
  }

  const resetPage = () => {
    setCurrentPage(1)
  }

  return {
    currentPage,
    totalPages,
    goToPage,
    resetPage,
  }
}
