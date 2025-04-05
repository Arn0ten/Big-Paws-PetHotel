/**
 * Pet Management Page
 *
 * TODO: Backend Integration
 * This page currently uses sample data. For production:
 * 1. Replace the sample data with API calls to fetch pets and pet owners
 * 2. Implement API endpoints for CRUD operations:
 *    - GET /api/pets - Fetch all pets with pagination and filtering
 *    - GET /api/pets/:id - Fetch a single pet by ID
 *    - POST /api/pets - Create a new pet
 *    - PUT /api/pets/:id - Update a pet
 *    - DELETE /api/pets/:id - Delete a pet
 *    - PUT /api/pets/:id/boarding - Start or end boarding for a pet
 * 3. Add error handling for API calls
 * 4. Implement loading states during API requests
 * 5. Add real-time updates using WebSockets or polling
 */
"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { PawPrint, Search, Plus, Dog, Cat, Filter, X, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { PetsTable } from "./components/pets-table"
import { ConfirmationDialog, SuccessDialog } from "./components/confirmation-dialog"
import { usePets, usePagination } from "./hooks"
import { filterPets } from "./utils/helpers"
import type { Pet } from "./utils/types"
import { PaginationControls } from "@/app/webapp/admin/components/pagination-controls"
import PetDetailsView from "./views/pet-details-view"
import PetFormView from "./views/pet-form-view"
import BoardPetView from "./views/board-pet-view"

// Define the possible views for the module with proper navigation tracking
type View =
  | { type: "list"; previousView: null }
  | { type: "details"; petId: string; previousView: View }
  | { type: "add"; previousView: View }
  | { type: "edit"; petId: string; previousView: View }
  | { type: "board"; petId: string; previousView: View }

export default function PetsPage() {
  const { toast } = useToast()

  // Navigation state with improved tracking
  const [currentView, setCurrentView] = useState<View>({ type: "list", previousView: null })

  // Search state
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [searchInputValue, setSearchInputValue] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Confirmation dialog state
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    type: "delete" as "delete" | "edit" | "board" | "endBoarding",
    title: "",
    description: "",
    onConfirm: () => {},
  })

  // Success dialog state
  const [successDialog, setSuccessDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
    actionLabel: "",
    onAction: () => {},
  })

  // BACKEND INTEGRATION: Replace this with actual API calls
  // Fetch pets data
  const { pets, petOwners, isLoading, isRefreshing, refreshPets, addPet, updatePet, removePet, toggleBoardingStatus } =
    usePets()

  // Apply filters
  const filteredPets = filterPets(pets, {
    searchQuery,
    type: filterType !== "all" ? (filterType as "Dog" | "Cat") : undefined,
    status: filterStatus !== "all" ? filterStatus === "boarding" : undefined,
  })

  // Pagination
  const { currentPage, totalPages, goToPage, nextPage, prevPage, resetPage, startIndex, endIndex } = usePagination({
    totalItems: filteredPets.length,
    itemsPerPage: 6,
  })

  // Reset pagination when filters change
  useEffect(() => {
    resetPage()
  }, [searchQuery, filterType, filterStatus, resetPage])

  // Current page data
  const currentPets = filteredPets.slice(startIndex, endIndex)

  // Get the currently selected pet based on the view
  useEffect(() => {
    if (currentView.type === "details" || currentView.type === "edit" || currentView.type === "board") {
      const pet = pets.find((p) => p.id === currentView.petId) || null
      setSelectedPet(pet)
    } else {
      setSelectedPet(null)
    }
  }, [currentView, pets])

  // Improved navigation helper - always returns to the correct previous view
  const navigateBack = useCallback(() => {
    if (currentView.previousView) {
      setCurrentView(currentView.previousView)
    } else {
      // Fallback to list view if no previous view exists
      setCurrentView({ type: "list", previousView: null })
    }
  }, [currentView])

  // Navigate to list view directly
  const navigateToList = useCallback(() => {
    setCurrentView({ type: "list", previousView: null })
  }, [])

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
    setFilterType("all")
    setFilterStatus("all")
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

  // Handle add pet
  const handleAddPet = useCallback(
    async (petData: Partial<Pet>, ownerId: string) => {
      setIsSubmitting(true)
      try {
        // BACKEND INTEGRATION: Replace with actual API call to add a pet
        await addPet(petData, ownerId)

        // Navigate back to list view
        navigateToList()

        // Refresh pets with loading effect
        refreshPets()

        // Show success dialog
        setSuccessDialog({
          isOpen: true,
          title: "Pet Added Successfully",
          description: `${petData.name} has been added to the system.`,
          actionLabel: "",
          onAction: () => {},
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
    },
    [addPet, refreshPets, toast, navigateToList],
  )

  // Handle edit pet with improved navigation
  const handleEditPet = useCallback(
    async (petData: Partial<Pet>) => {
      if (!selectedPet) return false

      setIsSubmitting(true)
      try {
        // BACKEND INTEGRATION: Replace with actual API call to update a pet
        await updatePet(selectedPet.id, petData)

        // Navigate back to details view after successful edit
        if (currentView.previousView && currentView.previousView.type === "details") {
          setCurrentView(currentView.previousView)
        } else {
          // If coming directly from list view, go back to list
          navigateToList()
        }

        // Refresh pets with loading effect
        refreshPets()

        // Show success dialog
        setSuccessDialog({
          isOpen: true,
          title: "Pet Updated",
          description: `${petData.name || selectedPet.name} has been successfully updated.`,
          actionLabel: "",
          onAction: () => {},
        })

        return true
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update pet. Please try again.",
          variant: "destructive",
        })
        return false
      } finally {
        setIsSubmitting(false)
      }
    },
    [selectedPet, updatePet, refreshPets, toast, currentView, navigateToList],
  )

  // Handle delete pet
  const handleDeletePet = useCallback(async () => {
    if (!selectedPet) return

    setIsSubmitting(true)
    try {
      // BACKEND INTEGRATION: Replace with actual API call to delete a pet
      await removePet(selectedPet.id)
      closeConfirmation()

      // Always navigate back to list view after deletion
      navigateToList()

      // Refresh pets with loading effect
      refreshPets()

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
  }, [selectedPet, removePet, refreshPets, toast, closeConfirmation, navigateToList])

  // Handle boarding status toggle
  const handleToggleBoardingStatus = useCallback(
    async (petId: string, boardingDetails?: any) => {
      const pet = pets.find((p) => p.id === petId)
      if (!pet) return false

      setIsSubmitting(true)
      try {
        // BACKEND INTEGRATION: Replace with actual API call to toggle boarding status
        await toggleBoardingStatus(petId, boardingDetails)
        closeConfirmation()

        // Navigate back to the previous view
        navigateBack()

        // Refresh pets with loading effect
        refreshPets()

        // Show success dialog
        setSuccessDialog({
          isOpen: true,
          title: pet.isBoarding ? "Boarding Ended" : "Boarding Started",
          description: pet.isBoarding
            ? `${pet.name}'s boarding has been ended.`
            : `${pet.name} has been successfully boarded.`,
          actionLabel: "",
          onAction: () => {},
        })
        return true
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update boarding status. Please try again.",
          variant: "destructive",
        })
        return false
      } finally {
        setIsSubmitting(false)
      }
    },
    [pets, toggleBoardingStatus, refreshPets, toast, closeConfirmation, navigateBack],
  )

  // Determine if we should show the skeleton loader
  const showSkeletonLoader = isLoading || isRefreshing || isSearching

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
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Pet Management</h1>
              <p className="text-muted-foreground">Manage all pets currently registered in the system.</p>
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
                      <PawPrint className="mr-2 h-5 w-5 text-primary" />
                      <CardTitle>Pet Registry</CardTitle>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <CardDescription className="mt-0">View and manage all registered pets.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Filters and Search Section */}
                    <div className="flex flex-row justify-between items-center gap-4 flex-wrap md:flex-nowrap">
                      {/* Left side - Search and Filters */}
                      <div className="flex flex-wrap gap-2 items-center order-1 md:order-1 w-full md:w-auto">
                        <div className="relative flex-1 min-w-0 md:w-[300px]">
                          <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search pets..."
                            className="pl-8"
                            value={searchInputValue}
                            onChange={handleSearchInputChange}
                          />
                          <div className="absolute left-0 top-0 h-full px-2 flex items-center">
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

                        <Select value={filterType} onValueChange={setFilterType}>
                          <SelectTrigger className="w-[130px]">
                            <div className="flex items-center">
                              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>Type: </span>
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="Dog">
                              <div className="flex items-center">
                                <Dog className="mr-2 h-4 w-4 text-primary" />
                                Dogs
                              </div>
                            </SelectItem>
                            <SelectItem value="Cat">
                              <div className="flex items-center">
                                <Cat className="mr-2 h-4 w-4 text-secondary" />
                                Cats
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger className="w-[150px]">
                            <div className="flex items-center">
                              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>Status: </span>
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="boarding">Currently Boarding</SelectItem>
                            <SelectItem value="not-boarding">Not Boarding</SelectItem>
                          </SelectContent>
                        </Select>

                        {(searchQuery || filterType !== "all" || filterStatus !== "all") && (
                          <Button variant="outline" size="icon" onClick={clearFilters} title="Clear filters">
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      {/* Right side - Add New */}
                      <div className="flex justify-end order-2 md:order-2 w-full md:w-auto">
                        <Button
                          onClick={() => setCurrentView({ type: "add", previousView: currentView })}
                          className="bg-green-600 hover:bg-green-700 text-white whitespace-nowrap"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add New Pet
                        </Button>
                      </div>
                    </div>

                    {/* Active filters display */}
                    {(searchQuery || filterType !== "all" || filterStatus !== "all") && (
                      <div className="flex flex-wrap gap-2">
                        {searchQuery && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            Search: {searchQuery}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => {
                                setSearchQuery("")
                                setSearchInputValue("")
                              }}
                            />
                          </Badge>
                        )}
                        {filterType !== "all" && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            Type: {filterType}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterType("all")} />
                          </Badge>
                        )}
                        {filterStatus !== "all" && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            Status: {filterStatus === "boarding" ? "Boarding" : "Not Boarding"}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterStatus("all")} />
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Pets table */}
                    <div className="rounded-md border overflow-hidden">
                      <PetsTable
                        pets={currentPets}
                        petOwners={petOwners}
                        onEdit={(pet) =>
                          setCurrentView({
                            type: "details",
                            petId: pet.id,
                            previousView: currentView,
                          })
                        }
                        onEditDetails={(pet) =>
                          setCurrentView({
                            type: "edit",
                            petId: pet.id,
                            previousView: { type: "list", previousView: null },
                          })
                        }
                        onDelete={(pet) => {
                          setSelectedPet(pet)
                          showConfirmation(
                            "delete",
                            "Delete Pet",
                            `Are you sure you want to delete ${pet.name}? This action cannot be undone.`,
                            handleDeletePet,
                          )
                        }}
                        onBoard={(pet) =>
                          setCurrentView({
                            type: "board",
                            petId: pet.id,
                            previousView: { type: "list", previousView: null },
                          })
                        }
                        onEndBoarding={(pet) => {
                          setSelectedPet(pet)
                          showConfirmation(
                            "endBoarding",
                            "End Boarding",
                            `Are you sure you want to end boarding for ${pet.name}?`,
                            () => handleToggleBoardingStatus(pet.id),
                          )
                        }}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        goToPage={goToPage}
                        nextPage={nextPage}
                        prevPage={prevPage}
                        isLoading={showSkeletonLoader}
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
          <PetDetailsView
            pet={selectedPet}
            petOwners={petOwners}
            onBack={navigateBack}
            onEdit={() =>
              selectedPet &&
              setCurrentView({
                type: "edit",
                petId: selectedPet.id,
                previousView: currentView,
              })
            }
            onBoard={() =>
              selectedPet &&
              setCurrentView({
                type: "board",
                petId: selectedPet.id,
                previousView: currentView,
              })
            }
            onEndBoarding={() => {
              if (selectedPet) {
                showConfirmation(
                  "endBoarding",
                  "End Boarding",
                  `Are you sure you want to end boarding for ${selectedPet.name}?`,
                  () => handleToggleBoardingStatus(selectedPet.id),
                )
              }
            }}
            onDelete={() => {
              if (selectedPet) {
                showConfirmation(
                  "delete",
                  "Delete Pet",
                  `Are you sure you want to delete ${selectedPet.name}? This action cannot be undone.`,
                  handleDeletePet,
                )
              }
            }}
          />
        )

      case "add":
        return (
          <PetFormView
            petOwners={petOwners}
            onBack={navigateBack}
            onCancel={navigateToList}
            onSubmit={handleAddPet}
            isSubmitting={isSubmitting}
          />
        )

      case "edit":
        return (
          <PetFormView
            pet={selectedPet}
            petOwners={petOwners}
            onBack={navigateBack}
            onCancel={navigateBack}
            onSubmit={handleEditPet}
            isSubmitting={isSubmitting}
          />
        )

      case "board":
        return (
          <BoardPetView
            pet={selectedPet}
            onBack={navigateBack}
            onCancel={navigateBack}
            onSubmit={(details) => selectedPet && handleToggleBoardingStatus(selectedPet.id, details)}
            isSubmitting={isSubmitting}
          />
        )
    }
  }

  return (
    <>
      {renderView()}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={closeConfirmation}
        onConfirm={confirmationDialog.onConfirm}
        type={confirmationDialog.type}
        title={confirmationDialog.title}
        description={confirmationDialog.description}
        isLoading={isSubmitting}
      />

      {/* Success Dialog */}
      <SuccessDialog
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

