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
import {useState, useEffect, useCallback} from "react"
import type {Pet, PetOwner} from "./utils/types"
import {preloadPetDetails, preloadPetOwnerList} from "@/lib/preload";
import {recentPetDetails} from "@/lib/recent";
import {PetDetailsDTO} from "@/types/preloadPet";
import {PetOwnerListDTO} from "@/types/petOwner";
import {PetRegister, PetRegisterResponse} from "@/types/pet";
import {petService} from "@/lib/add-pet";


export function usePreloadData() {
    const [preloadedPets, setPreloadedPets] = useState<PetDetailsDTO[]>([])
    const [preloadedPetOwners, setPreloadedPetOwners] = useState<PetOwnerListDTO[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                const [pets, owners] = await Promise.all([
                    preloadPetDetails(),
                    preloadPetOwnerList()
                ])
                setPreloadedPets(pets)
                setPreloadedPetOwners(owners)
            } catch (error) {
                console.error("Error preloading data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, []) // Only load once when component mounts

    return {
        preloadedPets,
        preloadedPetOwners,
        isLoading
    }
}


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
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

    // Navigation functions remain the same
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
        endIndex
    }
}

// In hooks.ts
export function usePets(
    initialPets?: PetDetailsDTO[],
    initialPetOwners?: PetOwnerListDTO[]
) {
    const [pets, setPets] = useState<PetDetailsDTO[]>([]);
    const [petOwners, setPetOwners] = useState<PetOwnerListDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize with preloaded data
    useEffect(() => {
        if (initialPets?.length) {
            console.log('Setting initial pets:', initialPets); // Debug log
            setPets(initialPets);
        }
        if (initialPetOwners?.length) {
            console.log('Setting initial owners:', initialPetOwners); // Debug log
            setPetOwners(initialPetOwners);
        }
        setIsLoading(false);
    }, [initialPets, initialPetOwners]);

    // ... rest of the hook code
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null)

    // Refresh pets data
    const refreshPets = useCallback(async () => {
        setIsRefreshing(true)
        try {
            const recentPets = await recentPetDetails()
            if (!(recentPets instanceof Error)) {
                // Merge recent pets with existing pets
                // Add at the beginning of the array and remove duplicates
                setPets(prevPets => {
                    const mergedPets = [recentPets, ...prevPets]
                    // Remove duplicates based on pet ID
                    return Array.from(new Map(mergedPets.map(pet => [pet.id, pet])).values())
                })
            }
        } catch (error) {
            console.error("Error refreshing pets:", error)
        } finally {
            setIsRefreshing(false)
        }
    }, [])


    // Add a new pet
    const addPet = useCallback(async (petData: Partial<PetRegister>, ownerId: string) => {
        // BACKEND INTEGRATION: Replace with actual API call
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            //
            // // Generate a new pet ID
            // const newPet: PetRegister = {
            //     ownerId
            //     petName: petData.name || "New Pet",
            //     type: petData.type as "Dog" | "Cat",
            //     breed: petData.breed || "Unknown",
            //     age: petData.age || 0,
            //     size: petData.size as "Small" | "Medium" | "Large" | "XL",
            //     isBoarding: false,
            //     notes: petData.notes || "",
            //     image: petData.image || "/placeholder.svg?height=200&width=200",
            //     ownerId,
            // }
            //
            // // Update local state
            // setPets((prev) => [...prev, newPet])

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
            setPets((prev) => prev.map((pet) => (pet.id === petId ? {...pet, ...petData} : pet)))

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
            setPets((prev) => prev.map((pet) => (pet.id === petId ? {...pet, isBoarding: !pet.boarding} : pet)))

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


