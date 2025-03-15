"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Filter, X, RefreshCw, Search, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Import types and components from consolidated files
import type { Pet, BoardingDetails } from "./utils/types"
import { ITEMS_PER_PAGE } from "./utils/constants"
import { usePetOwners, usePagination } from "./hooks"
import { PetOwnerTable, PaginationControls } from "./components/table-components"
import { PetDetailsDialog, AddPetDialog, DeleteConfirmDialog, SuccessDialog } from "./components/dialogs"
import { BoardPetDialog } from "./components/board-pet-dialog"
import { SuccessDialog as ActionSuccessDialog } from "../pets/components/confirmation-dialog"

// BACKEND INTEGRATION: Sample data for demonstration purposes
// This should be replaced with actual API calls in production
const SAMPLE_PET_OWNERS = [
  {
    id: "PO-1001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1001",
        name: "Max",
        type: "Dog",
        breed: "Golden Retriever",
        age: 3,
        size: "Large",
        isBoarding: true,
        notes: "Friendly and energetic",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1001",
      },
      {
        id: "P-1002",
        name: "Bella",
        type: "Dog",
        breed: "Beagle",
        age: 2,
        size: "Medium",
        isBoarding: false,
        notes: "Loves to play fetch",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1001",
      },
    ],
  },
  {
    id: "PO-1002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Boston, MA 02108",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1003",
        name: "Whiskers",
        type: "Cat",
        breed: "Siamese",
        age: 4,
        size: "Small",
        isBoarding: true,
        notes: "Needs special diet",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1002",
      },
    ],
  },
  {
    id: "PO-1003",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "(555) 456-7890",
    address: "789 Pine St, Chicago, IL 60601",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [],
  },
  {
    id: "PO-1004",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "(555) 234-5678",
    address: "101 Maple Rd, San Francisco, CA 94102",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1004",
        name: "Rocky",
        type: "Dog",
        breed: "German Shepherd",
        age: 5,
        size: "Large",
        isBoarding: false,
        notes: "Protective but friendly",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1004",
      },
      {
        id: "P-1005",
        name: "Luna",
        type: "Cat",
        breed: "Maine Coon",
        age: 3,
        size: "Medium",
        isBoarding: true,
        notes: "Long-haired, needs regular grooming",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1004",
      },
      {
        id: "P-1006",
        name: "Charlie",
        type: "Dog",
        breed: "Poodle",
        age: 2,
        size: "Small",
        isBoarding: false,
        notes: "Hypoallergenic",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1004",
      },
    ],
  },
  {
    id: "PO-1005",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "(555) 876-5432",
    address: "202 Cedar Ln, Seattle, WA 98101",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1007",
        name: "Buddy",
        type: "Dog",
        breed: "Labrador",
        age: 4,
        size: "Large",
        isBoarding: true,
        notes: "Loves swimming",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1005",
      },
    ],
  },
  {
    id: "PO-1006",
    name: "Jennifer Martinez",
    email: "jennifer.m@example.com",
    phone: "(555) 345-6789",
    address: "303 Birch Dr, Austin, TX 78701",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1008",
        name: "Mittens",
        type: "Cat",
        breed: "Persian",
        age: 6,
        size: "Small",
        isBoarding: false,
        notes: "Very calm and quiet",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1006",
      },
      {
        id: "P-1009",
        name: "Oscar",
        type: "Cat",
        breed: "Tabby",
        age: 2,
        size: "Medium",
        isBoarding: true,
        notes: "Playful and curious",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1006",
      },
    ],
  },
  {
    id: "PO-1007",
    name: "Robert Taylor",
    email: "robert.t@example.com",
    phone: "(555) 567-8901",
    address: "404 Elm Ct, Denver, CO 80202",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [],
  },
  {
    id: "PO-1008",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "(555) 678-9012",
    address: "505 Spruce Ave, Miami, FL 33101",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1010",
        name: "Rex",
        type: "Dog",
        breed: "Boxer",
        age: 3,
        size: "Large",
        isBoarding: false,
        notes: "Energetic and needs lots of exercise",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1008",
      },
    ],
  },
  {
    id: "PO-1009",
    name: "Thomas Garcia",
    email: "thomas.g@example.com",
    phone: "(555) 789-0123",
    address: "606 Willow St, Portland, OR 97201",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1011",
        name: "Daisy",
        type: "Dog",
        breed: "Dachshund",
        age: 4,
        size: "Small",
        isBoarding: true,
        notes: "Loves to burrow in blankets",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1009",
      },
      {
        id: "P-1012",
        name: "Simba",
        type: "Cat",
        breed: "Orange Tabby",
        age: 1,
        size: "Small",
        isBoarding: false,
        notes: "Very young, still learning litter habits",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1009",
      },
    ],
  },
  {
    id: "PO-1010",
    name: "Patricia Lee",
    email: "patricia.l@example.com",
    phone: "(555) 890-1234",
    address: "707 Aspen Rd, Phoenix, AZ 85001",
    avatar: "/placeholder.svg?height=40&width=40",
    pets: [
      {
        id: "P-1013",
        name: "Shadow",
        type: "Cat",
        breed: "Black Domestic Shorthair",
        age: 7,
        size: "Medium",
        isBoarding: false,
        notes: "Shy with strangers",
        image: "/placeholder.svg?height=200&width=200",
        ownerId: "PO-1010",
      },
    ],
  },
]

export default function PetOwnersPage() {
  const router = useRouter()
  const { toast } = useToast()

  // State
  const [searchQuery, setSearchQuery] = useState("")
  const [searchInputValue, setSearchInputValue] = useState("")
  const [filterCity, setFilterCity] = useState<string>("all")
  const [filterHasPets, setFilterHasPets] = useState<string>("all")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null)
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [showPetDetailsDialog, setShowPetDetailsDialog] = useState(false)
  const [expandedPetsList, setExpandedPetsList] = useState<string[]>([])
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({})
  const [showAddPetDialog, setShowAddPetDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [isAddingPet, setIsAddingPet] = useState(false)
  const [showBoardPetDialog, setShowBoardPetDialog] = useState(false)
  const [isBoardingPet, setIsBoardingPet] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Success dialog state
  const [successDialog, setSuccessDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
    actionLabel: "",
    onAction: () => {},
  })

  // BACKEND INTEGRATION: Replace this hook with actual API calls
  // This is a mock implementation for demonstration purposes
  const { petOwners, setPetOwners, isLoading, isRefreshing, refreshPetOwners, removePetOwner } =
    usePetOwners(SAMPLE_PET_OWNERS)

  // Get unique cities for filter
  const uniqueCities = Array.from(
    new Set(
      petOwners.map((owner) => {
        const cityMatch = owner.address.match(/([^,]+),\s*([^,]+)$/)
        return cityMatch ? cityMatch[1].trim() : "Unknown"
      }),
    ),
  ).sort()

  // Filter owners based on search query and filters
  const filteredOwners = petOwners.filter((owner) => {
    // Search query filter
    const matchesSearch =
      !searchQuery ||
      owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.phone.includes(searchQuery)

    // City filter
    const cityMatch = owner.address.match(/([^,]+),\s*([^,]+)$/)
    const ownerCity = cityMatch ? cityMatch[1].trim() : "Unknown"
    const matchesCity = filterCity === "all" || ownerCity === filterCity

    // Has pets filter
    const matchesHasPets =
      filterHasPets === "all" ||
      (filterHasPets === "with-pets" && owner.pets.length > 0) ||
      (filterHasPets === "no-pets" && owner.pets.length === 0)

    return matchesSearch && matchesCity && matchesHasPets
  })

  // Pagination
  const { currentPage, totalPages, goToPage, resetPage } = usePagination({
    totalItems: filteredOwners.length,
    itemsPerPage: ITEMS_PER_PAGE,
  })

  // Reset pagination when filters change
  useEffect(() => {
    resetPage()
  }, [searchQuery, filterCity, filterHasPets, resetPage])

  // Get current page data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentOwners = filteredOwners.slice(startIndex, endIndex)

  // Get selected owner
  const selectedOwner = petOwners.find((owner) => owner.id === selectedOwnerId) || null

  // Handle search
  const handleSearch = useCallback(() => {
    setIsSearching(true)
    // Simulate search delay
    setTimeout(() => {
      setSearchQuery(searchInputValue)
      setIsSearching(false)
    }, 800)
  }, [searchInputValue])

  // Handle search input keydown
  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch()
      }
    },
    [handleSearch],
  )

  // Clear filters
  const clearFilters = useCallback(() => {
    setSearchQuery("")
    setSearchInputValue("")
    setFilterCity("all")
    setFilterHasPets("all")
  }, [])

  // Handle delete confirmation
  const confirmDelete = () => {
    if (!selectedOwnerId) return

    // BACKEND INTEGRATION: Replace with actual API call to delete pet owner
    removePetOwner(selectedOwnerId).then(() => {
      setShowDeleteDialog(false)
      setSelectedOwnerId(null)

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
  const handleAddPetOwner = () => {
    // BACKEND INTEGRATION: Navigate to registration page
    router.push("/webapp/admin/registration")
  }

  // Handle edit pet owner
  const handleEditPetOwner = (id: string) => {
    // BACKEND INTEGRATION: Navigate to edit page with owner ID
    toast({
      title: "Edit Pet Owner",
      description: `Navigating to edit page for owner ID: ${id}`,
    })
  }

  // Handle add pet to owner
  const handleAddPet = (id: string) => {
    // Reset new pet form and errors
    setFormErrors({})
    setSelectedOwnerId(id)
    setShowAddPetDialog(true)
  }

  // Handle board pet
  const handleBoardPet = (id: string) => {
    setSelectedOwnerId(id)
    setShowBoardPetDialog(true)
  }

  // Handle pet badge click
  const handlePetBadgeClick = (pet: Pet) => {
    setSelectedPet(pet)
    setShowPetDetailsDialog(true)
  }

  // Toggle expanded pets list
  const toggleExpandedPetsList = (ownerId: string) => {
    if (expandedPetsList.includes(ownerId)) {
      setExpandedPetsList(expandedPetsList.filter((id) => id !== ownerId))
    } else {
      setExpandedPetsList([...expandedPetsList, ownerId])
    }
  }

  // Handle add pet form submission
  const handleSubmitNewPet = async (petData: Partial<Pet>) => {
    if (!selectedOwnerId) return { success: false }

    setIsAddingPet(true)

    // BACKEND INTEGRATION: Replace with actual API call to add a new pet
    return new Promise<{ success: boolean }>((resolve) => {
      setTimeout(() => {
        const newPetWithId: Pet = {
          id: `P-${Math.floor(Math.random() * 10000)}`,
          name: petData.name!,
          type: petData.type as "Dog" | "Cat",
          breed: petData.breed!,
          age: petData.age,
          size: petData.size as "Small" | "Medium" | "Large" | "XL",
          isBoarding: false,
          notes: petData.notes,
          image: "/placeholder.svg?height=200&width=200",
          ownerId: selectedOwnerId,
        }

        // Update pet owners state with new pet
        setPetOwners(
          petOwners.map((owner) => {
            if (owner.id === selectedOwnerId) {
              return {
                ...owner,
                pets: [...owner.pets, newPetWithId],
              }
            }
            return owner
          }),
        )

        setIsAddingPet(false)
        setShowAddPetDialog(false)

        // Show success dialog
        setSuccessDialog({
          isOpen: true,
          title: "Pet Added Successfully",
          description: `${petData.name} has been added to ${selectedOwner?.name}'s profile.`,
          actionLabel: "Board Pet",
          onAction: () => {
            setShowBoardPetDialog(true)
          },
        })

        resolve({ success: true })
      }, 1500)
    })
  }

  // Handle board pet form submission
  const handleSubmitBoarding = async (details: BoardingDetails) => {
    if (!selectedOwnerId) return false

    setIsBoardingPet(true)

    // BACKEND INTEGRATION: Replace with actual API call to board pets
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // Update pet owners state to mark selected pets as boarding
        setPetOwners(
          petOwners.map((owner) => {
            if (owner.id === selectedOwnerId) {
              return {
                ...owner,
                pets: owner.pets.map((pet) => {
                  if (details.petIds.includes(pet.id)) {
                    return {
                      ...pet,
                      isBoarding: true,
                    }
                  }
                  return pet
                }),
              }
            }
            return owner
          }),
        )

        setIsBoardingPet(false)
        setShowBoardPetDialog(false)

        // Show success dialog after boarding
        setSuccessDialog({
          isOpen: true,
          title: "Boarding Started",
          description: `Boarding created successfully for ${details.petIds.length} pet(s)`,
          actionLabel: "",
          onAction: () => {},
        })

        resolve(true)
      }, 1500)
    })
  }

  // Handle end boarding
  const handleEndBoarding = (pet: Pet) => {
    // BACKEND INTEGRATION: Replace with actual API call to end boarding
    setTimeout(() => {
      // Update pet owners state to mark selected pet as not boarding
      setPetOwners(
        petOwners.map((owner) => {
          return {
            ...owner,
            pets: owner.pets.map((p) => {
              if (p.id === pet.id) {
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

      setShowPetDetailsDialog(false)

      // Show success dialog after ending boarding
      setSuccessDialog({
        isOpen: true,
        title: "Boarding Ended",
        description: `Boarding has been ended for ${pet.name}`,
        actionLabel: "",
        onAction: () => {},
      })
    }, 1000)
  }

  // Determine if we should show the skeleton loader
  const showSkeletonLoader = isLoading || isRefreshing || isSearching

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
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
                  <div className="relative flex-1 sm:w-[300px]">
                    <Input
                      type="search"
                      placeholder="Search pet owners..."
                      className="pl-8"
                      value={searchInputValue}
                      onChange={(e) => setSearchInputValue(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-0 top-0 h-full px-2"
                      onClick={handleSearch}
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      ) : (
                        <Search className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={refreshPetOwners}
                      disabled={isRefreshing}
                      title="Refresh data"
                    >
                      <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    </Button>
                    <Button onClick={handleAddPetOwner} className="bg-green-600 hover:bg-green-700 text-white">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add New Owner
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <Select value={filterCity} onValueChange={setFilterCity}>
                  <SelectTrigger className="w-[150px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>City: </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {uniqueCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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

                {(searchQuery || filterCity !== "all" || filterHasPets !== "all") && (
                  <Button variant="outline" size="icon" onClick={clearFilters} title="Clear filters">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Active filters display */}
              {(searchQuery || filterCity !== "all" || filterHasPets !== "all") && (
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
                  {filterCity !== "all" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      City: {filterCity}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterCity("all")} />
                    </Badge>
                  )}
                  {filterHasPets !== "all" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Pets: {filterHasPets === "with-pets" ? "With Pets" : "No Pets"}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterHasPets("all")} />
                    </Badge>
                  )}
                </div>
              )}

              {/* Pet owners table */}
              <div className="rounded-md border overflow-hidden">
                <PetOwnerTable
                  owners={currentOwners}
                  isLoading={showSkeletonLoader}
                  expandedPetsList={expandedPetsList}
                  onToggleExpandPets={toggleExpandedPetsList}
                  onPetClick={handlePetBadgeClick}
                  onAddPet={handleAddPet}
                  onBoardPet={handleBoardPet}
                  onEditOwner={handleEditPetOwner}
                  onDeleteOwner={(id) => {
                    setSelectedOwnerId(id)
                    setShowDeleteDialog(true)
                  }}
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

      {/* Dialogs */}
      <DeleteConfirmDialog isOpen={showDeleteDialog} onOpenChange={setShowDeleteDialog} onConfirm={confirmDelete} />

      <PetDetailsDialog
        pet={selectedPet}
        isOpen={showPetDetailsDialog}
        onOpenChange={setShowPetDetailsDialog}
        onEditPet={(pet) => {
          // BACKEND INTEGRATION: Navigate to edit pet page or show edit dialog
          setShowPetDetailsDialog(false)
        }}
        onBoardPet={(pet) => {
          // Handle board pet
          setShowPetDetailsDialog(false)
          setSelectedOwnerId(pet.ownerId)
          setShowBoardPetDialog(true)
        }}
        onEndBoarding={handleEndBoarding}
      />

      <AddPetDialog
        owner={selectedOwner}
        isOpen={showAddPetDialog}
        onOpenChange={setShowAddPetDialog}
        onSubmit={handleSubmitNewPet}
        isSubmitting={isAddingPet}
      />

      <SuccessDialog
        isOpen={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        ownerName={selectedOwner?.name || ""}
        onBoardPet={() => {
          if (selectedOwnerId) {
            handleBoardPet(selectedOwnerId)
          }
        }}
      />

      <BoardPetDialog
        owner={selectedOwner}
        isOpen={showBoardPetDialog}
        onOpenChange={setShowBoardPetDialog}
        onSubmit={handleSubmitBoarding}
      />

      {/* Action Success Dialog */}
      <ActionSuccessDialog
        isOpen={successDialog.isOpen}
        onClose={() => setSuccessDialog((prev) => ({ ...prev, isOpen: false }))}
        title={successDialog.title}
        description={successDialog.description}
        actionLabel={successDialog.actionLabel}
        onAction={successDialog.onAction}
      />
    </motion.div>
  )
}

