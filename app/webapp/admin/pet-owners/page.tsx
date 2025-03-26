"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserPlus,
  Filter,
  X,
  RefreshCw,
  Search,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Import types and components from consolidated files
import type { Pet, BoardingDetails } from "./utils/types";
import { ITEMS_PER_PAGE } from "./utils/constants";
import { usePetOwners, usePagination } from "./hooks";
import {
  PetOwnerTable,
  PaginationControls,
} from "./components/table-components";
import {
  PetDetailsDialog,
  AddPetDialog,
  DeleteConfirmDialog,
  SuccessDialog,
} from "./components/dialogs";
import { SuccessDialog as ActionSuccessDialog } from "../pets/components/confirmation-dialog";
import { EditPetOwnerDialog } from "./components/edit-pet-owner-dialog";
import type { PetOwner } from "./utils/types";
import { PetOwnerDetailsDialog } from "./components/pet-owner-details-dialog";
// Import the unified board pet dialog
import { UnifiedBoardPetDialog } from "@/app/webapp/admin/components/unified-board-pet-dialog";

/**
 * BACKEND INTEGRATION NOTES:
 *
 * This page manages pet owners and their associated pets.
 *
 * Integration points:
 * 1. Replace the SAMPLE_PET_OWNERS constant with data from your API
 * 2. Replace the usePetOwners hook with actual API calls:
 *    - fetchPetOwners(): GET /api/pet-owners
 *    - removePetOwner(): DELETE /api/pet-owners/{id}
 *    - updatePetOwner(): PUT /api/pet-owners/{id}
 *
 * 3. Replace handleSubmitNewPet with actual API call:
 *    - POST /api/pet-owners/{ownerId}/pets
 *
 * 4. Replace handleSubmitBoarding with actual API call:
 *    - POST /api/boarding
 *
 * 5. Replace handleEndBoarding with actual API call:
 *    - PUT /api/boarding/{boardingId}/end
 *
 * 6. Implement handleEditPetOwner to either:
 *    - Navigate to a dedicated edit page
 *    - Open an edit dialog with form fields
 *    - Connect to PUT /api/pet-owners/{id}
 *
 * Expected data formats are documented in the corresponding API utility files.
 */

// BACKEND INTEGRATION: Sample data for demonstration purposes

export default function PetOwnersPage() {
  const router = useRouter();
  const { toast } = useToast();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [filterHasPets, setFilterHasPets] = useState<string>("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showPetDetailsDialog, setShowPetDetailsDialog] = useState(false);
  const [expandedPetsList, setExpandedPetsList] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [showAddPetDialog, setShowAddPetDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [showBoardPetDialog, setShowBoardPetDialog] = useState(false);
  const [isBoardingPet, setIsBoardingPet] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdatingOwner, setIsUpdatingOwner] = useState(false);
  // Add state for the pet owner details dialog
  const [showPetOwnerDetailsDialog, setShowPetOwnerDetailsDialog] =
    useState(false);

  // Success dialog state
  const [successDialog, setSuccessDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
    actionLabel: "",
    onAction: () => {},
  });

  // BACKEND INTEGRATION: Replace this hook with actual API calls
  // This is a mock implementation for demonstration purposes
  const {
    petOwners,
    setPetOwners,
    isLoading,
    isRefreshing,
    refreshPetOwners,
    removePetOwner,
  } = usePetOwners();

  // Filter owners based on search query and filters
  const filteredOwners = petOwners.filter((owner) => {
    // Search query filter
    const matchesSearch =
      !searchQuery ||
      owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.phone.includes(searchQuery);

    // Has pets filter
    const matchesHasPets =
      filterHasPets === "all" ||
      (filterHasPets === "with-pets" && owner.pets.length > 0) ||
      (filterHasPets === "no-pets" && owner.pets.length === 0);

    return matchesSearch && matchesHasPets;
  });

  // Pagination
  const { currentPage, totalPages, goToPage, resetPage } = usePagination({
    totalItems: filteredOwners.length,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  // Reset pagination when filters change
  useEffect(() => {
    resetPage();
  }, [searchQuery, filterHasPets, resetPage]);

  // Get current page data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOwners = filteredOwners.slice(startIndex, endIndex);

  // Get selected owner
  const selectedOwner =
    petOwners.find((owner) => owner.id === selectedOwnerId) || null;

  // Handle search input change with debounce
  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchInputValue(value);

      // Clear any existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Set searching state immediately for UI feedback
      if (value.length > 0) {
        setIsSearching(true);
      }

      // Debounce the actual search query update
      searchTimeoutRef.current = setTimeout(() => {
        setSearchQuery(value);
        setIsSearching(false);
      }, 300); // 300ms debounce
    },
    [],
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSearchInputValue("");
    setFilterHasPets("all");
  }, []);

  // Handle delete confirmation
  const confirmDelete = () => {
    if (!selectedOwnerId) return;

    // BACKEND INTEGRATION: Replace with actual API call to delete pet owner
    removePetOwner(selectedOwnerId).then(() => {
      setShowDeleteDialog(false);
      setSelectedOwnerId(null);

      // Show success dialog after deletion
      setSuccessDialog({
        isOpen: true,
        title: "Pet Owner Deleted",
        description:
          "The pet owner has been successfully removed from the system.",
        actionLabel: "",
        onAction: () => {},
      });
    });
  };

  // Handle add pet owner button click
  const handleAddPetOwner = () => {
    // BACKEND INTEGRATION: Navigate to registration page
    router.push("/webapp/admin/registration");
  };

  // Add this function to handle editing pet owners:

  // Add this after the handleEditPetOwner function declaration:
  const handleEditPetOwner = (id: string) => {
    // Find the pet owner to edit
    const ownerToEdit = petOwners.find((owner) => owner.id === id);

    if (!ownerToEdit) {
      toast({
        title: "Error",
        description: "Pet owner not found",
        variant: "destructive",
      });
      return;
    }

    // Set the selected owner and open the edit dialog
    setSelectedOwnerId(id);
    setShowPetOwnerDetailsDialog(false); // Close the details dialog first
    setIsEditDialogOpen(true);
  };

  // Handle add pet to owner
  const handleAddPet = (id: string) => {
    // Reset new pet form and errors
    setFormErrors({});
    setSelectedOwnerId(id);
    setShowAddPetDialog(true);
  };

  // Handle board pet
  const handleBoardPet = (id: string) => {
    setSelectedOwnerId(id);
    setShowBoardPetDialog(true);
  };

  // Modify the pet owner management page to fix the issue with multiple dialogs
  // We need to update the handlePetBadgeClick function and related state management

  // First, add a state to track if we should reopen the pet owner details dialog
  const [shouldReopenOwnerDetails, setShouldReopenOwnerDetails] =
    useState(false);

  // Then modify the handlePetBadgeClick function to close the pet owner details dialog first
  const handlePetBadgeClick = (pet: Pet) => {
    // If pet owner details dialog is open, close it and set flag to reopen later
    if (showPetOwnerDetailsDialog) {
      setShouldReopenOwnerDetails(true);
      setShowPetOwnerDetailsDialog(false);
    }

    setSelectedPet(pet);
    setShowPetDetailsDialog(true);
  };

  // Add an effect to reopen the pet owner details dialog when pet details dialog closes
  useEffect(() => {
    if (!showPetDetailsDialog && shouldReopenOwnerDetails) {
      setShowPetOwnerDetailsDialog(true);
      setShouldReopenOwnerDetails(false);
    }
  }, [showPetDetailsDialog, shouldReopenOwnerDetails]);

  // Toggle expanded pets list
  const toggleExpandedPetsList = (ownerId: string) => {
    if (expandedPetsList.includes(ownerId)) {
      setExpandedPetsList(expandedPetsList.filter((id) => id !== ownerId));
    } else {
      setExpandedPetsList([...expandedPetsList, ownerId]);
    }
  };

  // Handle add pet form submission
  const handleSubmitNewPet = async (petData: Partial<Pet>) => {
    if (!selectedOwnerId) return { success: false };

    setIsAddingPet(true);

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
        };

        // Update pet owners state with new pet
        setPetOwners(
          petOwners.map((owner) => {
            if (owner.id === selectedOwnerId) {
              return {
                ...owner,
                pets: [...owner.pets, newPetWithId],
              };
            }
            return owner;
          }),
        );

        setIsAddingPet(false);
        setShowAddPetDialog(false);

        // Show success dialog
        setSuccessDialog({
          isOpen: true,
          title: "Pet Added Successfully",
          description: `${petData.name} has been added to ${selectedOwner?.name}'s profile.`,
          actionLabel: "Board Pet",
          onAction: () => {
            setShowBoardPetDialog(true);
          },
        });

        resolve({ success: true });
      }, 1500);
    });
  };

  // Handle board pet form submission
  const handleSubmitBoarding = async (details: BoardingDetails) => {
    if (!selectedOwnerId) return false;

    setIsBoardingPet(true);

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
                    };
                  }
                  return pet;
                }),
              };
            }
            return owner;
          }),
        );

        setIsBoardingPet(false);
        setShowBoardPetDialog(false);

        // Show success dialog after boarding
        setSuccessDialog({
          isOpen: true,
          title: "Boarding Started",
          description: `Boarding created successfully for ${details.petIds.length} pet(s)`,
          actionLabel: "",
          onAction: () => {},
        });

        resolve(true);
      }, 1500);
    });
  };

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
                };
              }
              return p;
            }),
          };
        }),
      );

      setShowPetDetailsDialog(false);

      // Show success dialog after ending boarding
      setSuccessDialog({
        isOpen: true,
        title: "Boarding Ended",
        description: `Boarding has been ended for ${pet.name}`,
        actionLabel: "",
        onAction: () => {},
      });
    }, 1000);
  };

  // Determine if we should show the skeleton loader
  const showSkeletonLoader = isLoading || isRefreshing || isSearching;

  const handleUpdatePetOwner = async (ownerData: Partial<PetOwner>) => {
    if (!selectedOwnerId) return;

    setIsUpdatingOwner(true);

    try {
      // BACKEND INTEGRATION: Replace with actual API call to update pet owner
      // Example:
      // const response = await fetch(`/api/pet-owners/${selectedOwnerId}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(ownerData)
      // });
      // if (!response.ok) throw new Error('Failed to update pet owner');
      // const updatedOwner = await response.json();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update pet owners state
      setPetOwners(
        petOwners.map((owner) => {
          if (owner.id === selectedOwnerId) {
            return {
              ...owner,
              ...ownerData,
              // Preserve pets array
              pets: owner.pets,
            };
          }
          return owner;
        }),
      );

      setIsEditDialogOpen(false);

      // Show success dialog
      setSuccessDialog({
        isOpen: true,
        title: "Pet Owner Updated",
        description: `${ownerData.name} has been successfully updated.`,
        actionLabel: "",
        onAction: () => {},
      });
    } catch (error) {
      console.error("Failed to update pet owner:", error);
      toast({
        title: "Error",
        description: "Failed to update pet owner. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingOwner(false);
    }
  };

  // Add a handler for row clicks
  const handlePetOwnerRowClick = (id: string) => {
    setSelectedOwnerId(id);
    setShowPetOwnerDetailsDialog(true);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 300,
        }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Pet Owner Management
        </h1>
        <p className="text-muted-foreground">
          Manage all pet owners registered in the system.
        </p>
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
                <CardDescription className="mt-0">
                  View and manage all registered pet owners.
                </CardDescription>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
                  <div className="relative flex-1 sm:w-[300px]">
                    <Input
                      type="search"
                      placeholder="Search pet owners..."
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
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={refreshPetOwners}
                      disabled={isRefreshing}
                      title="Refresh data"
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                      />
                    </Button>
                    <Button
                      onClick={handleAddPetOwner}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
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

                {(searchQuery || filterHasPets !== "all") && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={clearFilters}
                    title="Clear filters"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Active filters display */}
              {(searchQuery || filterHasPets !== "all") && (
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Search: {searchQuery}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          setSearchQuery("");
                          setSearchInputValue("");
                        }}
                      />
                    </Badge>
                  )}
                  {filterHasPets !== "all" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Pets:{" "}
                      {filterHasPets === "with-pets" ? "With Pets" : "No Pets"}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setFilterHasPets("all")}
                      />
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
                    setSelectedOwnerId(id);
                    setShowDeleteDialog(true);
                  }}
                  onRowClick={handlePetOwnerRowClick} // Add this line
                  itemsPerPage={ITEMS_PER_PAGE}
                  searchQuery={searchQuery}
                />
              </div>

              {/* Pagination */}
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Dialogs */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
      />

      {/* Update the onOpenChange handler for the PetDetailsDialog */}
      <PetDetailsDialog
        pet={selectedPet}
        isOpen={showPetDetailsDialog}
        onOpenChange={(open) => {
          setShowPetDetailsDialog(open);
          // When dialog closes and we should reopen owner details, don't do anything here
          // The effect above will handle reopening the owner details dialog
        }}
        onEditPet={(pet) => {
          // Handle edit pet
          setShowPetDetailsDialog(false);
        }}
        onBoardPet={(pet) => {
          // Handle board pet
          setShowPetDetailsDialog(false);
          setSelectedOwnerId(pet.ownerId);
          setShowBoardPetDialog(true);
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
            handleBoardPet(selectedOwnerId);
          }
        }}
      />

      <UnifiedBoardPetDialog
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
      <EditPetOwnerDialog
        owner={selectedOwner}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleUpdatePetOwner}
        isSubmitting={isUpdatingOwner}
      />
      <PetOwnerDetailsDialog
        owner={selectedOwner}
        isOpen={showPetOwnerDetailsDialog}
        onOpenChange={setShowPetOwnerDetailsDialog}
        onEditOwner={handleEditPetOwner}
        onDeleteOwner={(id) => {
          setSelectedOwnerId(id);
          setShowPetOwnerDetailsDialog(false);
          setShowDeleteDialog(true);
        }}
        onAddPet={handleAddPet}
        onBoardPet={handleBoardPet}
        onPetClick={handlePetBadgeClick}
      />
    </motion.div>
  );
}
