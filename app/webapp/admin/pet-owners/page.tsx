/**
 * Pet Owner Management Page
 *
 * TODO: Backend Integration
 * This page currently uses sample data. For production:
 * 1. Replace the sample data with API calls to fetch pet owners
 * 2. Implement API endpoints for CRUD operations:
 *    - GET /api/pet-owners - Fetch all pet owners with pagination and filtering
 *    - GET /api/pet-owners/:id - Fetch a single pet owner by ID
 *    - POST /api/pet-owners - Create a new pet owner
 *    - PUT /api/pet-owners/:id - Update a pet owner
 *    - DELETE /api/pet-owners/:id - Delete a pet owner
 *    - GET /api/pet-owners/:id/pets - Fetch all pets for a specific owner
 * 3. Add error handling for API calls
 * 4. Implement loading states during API requests
 * 5. Add real-time updates using WebSockets or polling
 */
"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Filter, Search, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

// Import types and components from consolidated files
import type { Pet, BoardingDetails } from "./utils/types"
import { ITEMS_PER_PAGE } from "./utils/constants"
import { usePetOwners, usePagination } from "./hooks"
import { PetOwnerTable, PaginationControls } from "./components/table-components"
import { DeleteConfirmDialog } from "./components/dialogs"
import { SuccessDialog as ActionSuccessDialog } from "../pets/components/confirmation-dialog"
import type { PetOwner } from "./utils/types"
import PetOwnerDetailsView from "./views/pet-owner-details-view"
import PetOwnerFormView from "./views/pet-owner-form-view"
import PetFormView from "./views/pet-form-view"
import BoardPetsView from "./views/board-pets-view"
import PetDetailsView from "./views/pet-details-view"

// Define the possible views for the module
type View =
  | { type: "list" }
  | { type: "details"; ownerId: string }
  | { type: "add" }
  | { type: "edit"; ownerId: string }
  | { type: "addPet"; ownerId: string }
  | { type: "editPet"; petId: string }
  | { type: "petDetails"; petId: string }
  | { type: "board"; ownerId: string }

export default function PetOwnersPage() {
  const router = useRouter()
  const { toast } = useToast()

  // Navigation state
  const [currentView, setCurrentView] = useState<View>({ type: "list" })

  // Add a navigation history stack to track previous views
  const [navigationHistory, setNavigationHistory] = useState<View[]>([{ type: "list" }])

  // Replace the current setCurrentView function with this enhanced version
  const navigateTo = useCallback((newView: View) => {
    setNavigationHistory((prev) => [...prev, newView])
    setCurrentView(newView)
  }, [])

  // Add a function to handle back navigation
  const navigateBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      // Remove current view from history
      const newHistory = [...navigationHistory]
      newHistory.pop()
      // Get previous view
      const previousView = newHistory[newHistory.length - 1]
      setNavigationHistory(newHistory)
      setCurrentView(previousView)
    } else {
      // If no history, go back to list view
      setNavigationHistory([{ type: "list" }])
      setCurrentView({ type: "list" })
    }
  }, [navigationHistory])

  // State
  const [searchQuery, setSearchQuery] = useState("")
  const [searchInputValue, setSearchInputValue] = useState("")
  const [isSearching, setIsSearching] = useState(false) // Moved before its usage
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [filterHasPets, setFilterHasPets] = useState<string>("all")
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null)
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [expandedPetsList, setExpandedPetsList] = useState<string[]>([])
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Success dialog state
  const [successDialog, setSuccessDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
    actionLabel: "",
    onAction: () => {},
  })

  // Confirmation dialog state
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    type: "delete" as "delete" | "edit" | "board" | "endBoarding",
    title: "",
    description: "",
    onConfirm: () => {},
  })

  // BACKEND INTEGRATION: Replace this hook with actual API calls
  // This is a mock implementation for demonstration purposes
  const { petOwners, setPetOwners, isLoading, isRefreshing, refreshPetOwners, removePetOwner } = usePetOwners()

  // Filter owners based on search query and filters
  const filteredOwners = petOwners.filter((owner) => {
    // Search query filter
    const matchesSearch =
      !searchQuery ||
      owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.phone.includes(searchQuery)

    // Has pets filter
    const matchesHasPets =
      filterHasPets === "all" ||
      (filterHasPets === "with-pets" && owner.pets.length > 0) ||
      (filterHasPets === "no-pets" && owner.pets.length === 0)

    return matchesSearch && matchesHasPets
  })

  // Pagination
  const { currentPage, totalPages, goToPage, resetPage } = usePagination({
    totalItems: filteredOwners.length,
    itemsPerPage: ITEMS_PER_PAGE,
  })

  // Reset pagination when filters change
  useEffect(() => {
    resetPage()
  }, [searchQuery, filterHasPets, resetPage])

  // Get current page data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentOwners = filteredOwners.slice(startIndex, endIndex)

  // Get selected owner and pet based on the view
  useEffect(() => {
    if (
      currentView.type === "details" ||
      currentView.type === "edit" ||
      currentView.type === "addPet" ||
      currentView.type === "board"
    ) {
      const owner = petOwners.find((o) => o.id === currentView.ownerId) || null
      setSelectedOwnerId(currentView.ownerId)
    } else if (currentView.type === "petDetails" || currentView.type === "editPet") {
      // Find the pet and its owner
      let foundPet: Pet | null = null

      for (const owner of petOwners) {
        const pet = owner.pets.find((p) => p.id === currentView.petId)
        if (pet) {
          foundPet = pet
          setSelectedOwnerId(owner.id)
          break
        }
      }

      setSelectedPet(foundPet)
    } else {
      setSelectedOwnerId(null)
      setSelectedPet(null)
    }
  }, [currentView, petOwners])

  // Handle search input change with debounce
  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInputValue(value)

    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    // Set searching state immediately for UI feedback
    if (value.length > 0) {
      setIsSearching(true)
    }

    // Debounce the actual search query update
    searchTimeoutRef.current = setTimeout(() => {
      setSearchQuery(value)
      setIsSearching(false)
    }, 300) // 300ms debounce
  }, [])

  // Clear search input
  const handleClearSearch = useCallback(() => {
    setSearchInputValue("")
    setSearchQuery("")
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  // Clear filters
  const clearFilters = useCallback(() => {
    setSearchQuery("")
    setSearchInputValue("")
    setFilterHasPets("all")
  }, [])

  // Show confirmation dialog
  const showConfirmation = useCallback(
    (type: "delete" | "edit" | "board" | "endBoarding", title: string, description: string, onConfirm: () => void) => {
      setConfirmationDialog({
        isOpen: true,
        type,
        title,
        description,
        onConfirm,
      })
    },
    [],
  )

  // Close confirmation dialog
  const closeConfirmation = useCallback(() => {
    setConfirmationDialog((prev) => ({ ...prev, isOpen: false }))
  }, [])

  // Handle delete confirmation
  const confirmDelete = () => {
    if (!selectedOwnerId) return

    // BACKEND INTEGRATION: Replace with actual API call to delete pet owner
    removePetOwner(selectedOwnerId).then(() => {
      closeConfirmation()

      // Navigate back to list view
      navigateTo({ type: "list" })

      // Show success dialog after deletion
      setSuccessDialog({
        isOpen: true,
        title: "Pet Owner Deleted",
        description: "The pet owner has been successfully removed from the system.",
        actionLabel: "",
        onAction: () => {},
      })
    })
  }

  // Handle add pet owner button click
  const handleAddPetOwnerClick = () => {
    // Navigate to the registration page
    router.push("/webapp/admin/registration")
  }

  // Toggle expanded pets list
  const toggleExpandedPetsList = (ownerId: string) => {
    if (expandedPetsList.includes(ownerId)) {
      setExpandedPetsList(expandedPetsList.filter((id) => id !== ownerId))
    } else {
      setExpandedPetsList([...expandedPetsList, ownerId])
    }
  }

  // Handle add pet owner form submission
  const handleAddPetOwner = async (ownerData: Partial<PetOwner>) => {
    setIsSubmitting(true)

    try {
      // BACKEND INTEGRATION: Replace with actual API call to add pet owner
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a mock ID for the new pet owner
      const newPetOwner: PetOwner = {
        ...(ownerData as PetOwner),
        id: `owner-${Date.now()}`,
        createdAt: new Date().toISOString(),
        pets: [],
      }

      // Update pet owners state
      setPetOwners([...petOwners, newPetOwner])

      // Navigate back to list view
      navigateTo({ type: "list" })

      // Show success dialog
      setSuccessDialog({
        isOpen: true,
        title: "Pet Owner Added",
        description: `${ownerData.name} has been successfully added to the system.`,
        actionLabel: "",
        onAction: () => {},
      })

      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add pet owner. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update the handleUpdatePetOwner function to ensure it preserves the address structure
  const handleUpdatePetOwner = async (ownerData: Partial<PetOwner>) => {
    if (!selectedOwnerId) return false

    setIsSubmitting(true)

    try {
      // BACKEND INTEGRATION: Replace with actual API call to update pet owner
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update pet owners state
      setPetOwners(
        petOwners.map((owner) => {
          if (owner.id === selectedOwnerId) {
            return {
              ...owner,
              ...ownerData,
              // Preserve pets array and ensure address structure is maintained
              pets: owner.pets,
              address: ownerData.address || owner.address,
            }
          }
          return owner
        }),
      )

      // Navigate back to details view
      navigateTo({ type: "details", ownerId: selectedOwnerId })

      // Show success dialog
      setSuccessDialog({
        isOpen: true,
        title: "Pet Owner Updated",
        description: `${ownerData.name} has been successfully updated.`,
        actionLabel: "",
        onAction: () => {},
      })

      return true
    } catch (error) {
      console.error("Failed to update pet owner:", error)
      toast({
        title: "Error",
        description: "Failed to update pet owner. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle add pet
  const handleAddPet = async (petData: Partial<Pet>) => {
    if (!selectedOwnerId) return false

    setIsSubmitting(true)

    try {
      // BACKEND INTEGRATION: Replace with actual API call to add a pet
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newPet: Pet = {
        id: `P-${Math.floor(Math.random() * 10000)}`,
        name: petData.name!,
        type: petData.type as "Dog" | "Cat",
        breed: petData.breed!,
        age: petData.age!,
        size: petData.size as "Small" | "Medium" | "Large" | "XL",
        isBoarding: false,
        notes: petData.notes,
        image: petData.image || "/placeholder.svg?height=200&width=200",
        ownerId: selectedOwnerId,
      }

      // Update pet owners state with new pet
      setPetOwners(
        petOwners.map((owner) => {
          if (owner.id === selectedOwnerId) {
            return {
              ...owner,
              pets: [...owner.pets, newPet],
            }
          }
          return owner
        }),
      )

      // Navigate back to owner details view
      const selectedOwner = petOwners.find((o) => o.id === selectedOwnerId) || null
      navigateTo({ type: "details", ownerId: selectedOwnerId })

      // Show success dialog
      setSuccessDialog({
        isOpen: true,
        title: "Pet Added Successfully",
        description: `${petData.name} has been added to ${selectedOwner?.name}'s profile.`,
        actionLabel: "Board Pet",
        onAction: () => {
          setSuccessDialog((prev) => ({ ...prev, isOpen: false }))
          navigateTo({ type: "board", ownerId: selectedOwnerId })
        },
      })

      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add pet. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle update pet
  const handleUpdatePet = async (petData: Partial<Pet>) => {
    if (!selectedPet) return false

    setIsSubmitting(true)

    try {
      // BACKEND INTEGRATION: Replace with actual API call to update a pet
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the pet in the pet owners state
      setPetOwners(
        petOwners.map((owner) => {
          return {
            ...owner,
            pets: owner.pets.map((p) => {
              if (p.id === selectedPet?.id) {
                return {
                  ...p,
                  ...petData,
                }
              }
              return p
            }),
          }
        }),
      )

      // Navigate back to pet details view
      navigateTo({ type: "petDetails", petId: selectedPet.id })

      // Show success dialog
      setSuccessDialog({
        isOpen: true,
        title: "Pet Updated",
        description: `${petData.name || selectedPet?.name} has been successfully updated.`,
        actionLabel: "",
        onAction: () => {},
      })

      return true
    } catch (error) {
      console.error("Failed to update pet:", error)
      toast({
        title: "Error",
        description: "Failed to update pet. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle delete pet
  const handleDeletePet = async () => {
    if (!selectedPet || !selectedOwnerId) return

    setIsSubmitting(true)
    try {
      // BACKEND INTEGRATION: Replace with actual API call to delete a pet
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update pet owners state to remove the pet
      setPetOwners(
        petOwners.map((owner) => {
          if (owner.id === selectedOwnerId) {
            return {
              ...owner,
              pets: owner.pets.filter((p) => p.id !== selectedPet.id),
            }
          }
          return owner
        }),
      )

      closeConfirmation()

      // Navigate back to owner details view
      navigateTo({ type: "details", ownerId: selectedOwnerId })

      // Show success dialog
      setSuccessDialog({
        isOpen: true,
        title: "Pet Deleted",
        description: `${selectedPet.name} has been removed from the system.`,
        actionLabel: "",
        onAction: () => {},
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete pet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle board pet form submission
  const handleSubmitBoarding = async (details: BoardingDetails) => {
    if (!selectedOwnerId) return false

    setIsSubmitting(true)

    try {
      // BACKEND INTEGRATION: Replace with actual API call to board pets
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update pet owners state to mark selected pets as boarding
      setPetOwners(
        petOwners.map((owner) => {
          if (owner.id === selectedOwnerId) {
            return {
              ...owner,
              pets: owner.pets.map((p) => {
                if (details.petIds.includes(p.id)) {
                  return {
                    ...p,
                    isBoarding: true,
                  }
                }
                return p
              }),
            }
          }
          return owner
        }),
      )

      // Navigate back to owner details view
      navigateTo({ type: "details", ownerId: selectedOwnerId })

      // Show success dialog after boarding
      setSuccessDialog({
        isOpen: true,
        title: "Boarding Started",
        description: `Boarding created successfully for ${details.petIds.length} pet(s)`,
        actionLabel: "",
        onAction: () => {},
      })

      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create boarding. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle end boarding
  const handleEndBoarding = async (petId: string) => {
    setIsSubmitting(true)

    try {
      // BACKEND INTEGRATION: Replace with actual API call to end boarding
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update pet owners state to mark selected pet as not boarding
      setPetOwners(
        petOwners.map((owner) => {
          return {
            ...owner,
            pets: owner.pets.map((p) => {
              if (p.id === petId) {
                return {
                  ...p,
                  isBoarding: false,
                }
              }
              return p
            }),
          }
        }),
      )

      closeConfirmation()

      // If we're in pet details view, stay there, otherwise go back to owner details
      if (currentView.type === "petDetails") {
        // Refresh the current view
        navigateTo({ type: "petDetails", petId })
      } else if (selectedOwnerId) {
        navigateTo({ type: "details", ownerId: selectedOwnerId })
      }

      // Show success dialog after ending boarding
      setSuccessDialog({
        isOpen: true,
        title: "Boarding Ended",
        description: `Boarding has been ended successfully`,
        actionLabel: "",
        onAction: () => {},
      })

      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to end boarding. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  // Determine if we should show the skeleton loader
  const showSkeletonLoader = isLoading || isRefreshing || isSearching

  // Get selected owner
  const selectedOwner = petOwners.find((o) => o.id === selectedOwnerId) || null

  // Render the appropriate view based on the current state
  const renderView = () => {
    switch (currentView.type) {
      case "list":
        return (
          <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 300,
              }}
            >
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Pet Owner Management</h1>
              <p className="text-muted-foreground">Manage all pet owners registered in the system.</p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
            >
              <Card>
                <CardHeader>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-primary" />
                      <CardTitle>Pet Owner Registry</CardTitle>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <CardDescription className="mt-0">View and manage all registered pet owners.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Filters */}
                    {/* Filters and Search Section */}
                    <div className="flex flex-row justify-between items-center gap-4 flex-wrap md:flex-nowrap">
                      {/* Left side - Search and Filters */}
                      <div className="flex flex-wrap gap-2 items-center order-1 md:order-1 w-full md:w-auto">
                        <div className="relative flex-1 min-w-0 md:w-[300px]">
                          <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search pet owners..."
                            className="pl-9 h-10"
                            value={searchInputValue}
                            onChange={handleSearchInputChange}
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            {isSearching ? (
                              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            ) : (
                              <Search className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          {searchInputValue && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs font-medium"
                              onClick={handleClearSearch}
                              aria-label="Clear search"
                            >
                              Clear
                            </Button>
                          )}
                        </div>

                        <Select value={filterHasPets} onValueChange={setFilterHasPets}>
                          <SelectTrigger className="w-[150px]">
                            <div className="flex items-center">
                              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>Pets: </span>
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Owners</SelectItem>
                            <SelectItem value="with-pets">With Pets</SelectItem>
                            <SelectItem value="no-pets">No Pets</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Pet owners table */}
                    <div className="rounded-md border overflow-hidden">
                      <PetOwnerTable
                        owners={currentOwners}
                        isLoading={showSkeletonLoader}
                        expandedPetsList={expandedPetsList}
                        onToggleExpandPets={toggleExpandedPetsList}
                        onPetClick={(pet) => navigateTo({ type: "petDetails", petId: pet.id })}
                        onAddPet={(id) => navigateTo({ type: "addPet", ownerId: id })}
                        onBoardPet={(id) => navigateTo({ type: "board", ownerId: id })}
                        onEditOwner={(id) => navigateTo({ type: "edit", ownerId: id })}
                        onDeleteOwner={(id) => {
                          setSelectedOwnerId(id)
                          showConfirmation(
                            "delete",
                            "Delete Pet Owner",
                            "Are you sure you want to delete this pet owner? This action cannot be undone and will remove all associated pets.",
                            confirmDelete,
                          )
                        }}
                        onRowClick={(id) => navigateTo({ type: "details", ownerId: id })}
                        itemsPerPage={ITEMS_PER_PAGE}
                        searchQuery={searchQuery}
                      />
                    </div>

                    {/* Pagination */}
                    <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )

      case "details":
        return (
          <PetOwnerDetailsView
            owner={selectedOwner}
            onBack={navigateBack}
            onEdit={() => selectedOwner && navigateTo({ type: "edit", ownerId: selectedOwner.id })}
            onDelete={() => {
              if (selectedOwner) {
                showConfirmation(
                  "delete",
                  "Delete Pet Owner",
                  "Are you sure you want to delete this pet owner? This action cannot be undone and will remove all associated pets.",
                  confirmDelete,
                )
              }
            }}
            onAddPet={() => selectedOwner && navigateTo({ type: "addPet", ownerId: selectedOwner.id })}
            onBoardPet={() => selectedOwner && navigateTo({ type: "board", ownerId: selectedOwner.id })}
            onPetClick={(pet) => navigateTo({ type: "petDetails", petId: pet.id })}
          />
        )

      // Update all other cases to use navigateBack and navigateTo
      case "add":
        return <PetOwnerFormView onBack={navigateBack} onSubmit={handleAddPetOwner} isSubmitting={isSubmitting} />

      case "edit":
        return (
          <PetOwnerFormView
            owner={selectedOwner}
            onBack={navigateBack}
            onSubmit={handleUpdatePetOwner}
            isSubmitting={isSubmitting}
          />
        )

      case "addPet":
        return (
          <PetFormView
            ownerId={selectedOwnerId}
            ownerName={selectedOwner?.name}
            onBack={navigateBack}
            onSubmit={handleAddPet}
            isSubmitting={isSubmitting}
          />
        )

      case "editPet":
        return (
          <PetFormView
            pet={selectedPet}
            ownerId={selectedOwnerId}
            ownerName={selectedOwner?.name}
            onBack={navigateBack}
            onSubmit={handleUpdatePet}
            isSubmitting={isSubmitting}
          />
        )

      case "petDetails":
        return (
          <PetDetailsView
            pet={selectedPet}
            owner={selectedOwner}
            onBack={navigateBack}
            onEdit={() => selectedPet && navigateTo({ type: "editPet", petId: selectedPet.id })}
            onBoard={() => selectedPet && selectedOwner && navigateTo({ type: "board", ownerId: selectedOwner.id })}
            onEndBoarding={() => {
              if (selectedPet) {
                showConfirmation(
                  "endBoarding",
                  "End Boarding",
                  `Are you sure you want to end boarding for ${selectedPet.name}?`,
                  () => handleEndBoarding(selectedPet.id),
                )
              }
            }}
            onDelete={() => {
              if (selectedPet) {
                showConfirmation(
                  "delete",
                  "Delete Pet",
                  `Are you sure you want to delete ${selectedPet.name}? This action cannot be undone and will remove all associated data.`,
                  handleDeletePet,
                )
              }
            }}
          />
        )

      case "board":
        return (
          <BoardPetsView
            owner={selectedOwner}
            onBack={navigateBack}
            onSubmit={handleSubmitBoarding}
            isSubmitting={isSubmitting}
          />
        )
    }
  }

  return (
    <>
      {renderView()}

      {/* Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={confirmationDialog.isOpen}
        onOpenChange={closeConfirmation}
        onConfirm={confirmationDialog.onConfirm}
        title={confirmationDialog.title}
        description={confirmationDialog.description}
      />

      {/* Success Dialog */}
      <ActionSuccessDialog
        isOpen={successDialog.isOpen}
        onClose={() => setSuccessDialog((prev) => ({ ...prev, isOpen: false }))}
        title={successDialog.title}
        description={successDialog.description}
        actionLabel={successDialog.actionLabel}
        onAction={successDialog.onAction}
      />
    </>
  )
}

