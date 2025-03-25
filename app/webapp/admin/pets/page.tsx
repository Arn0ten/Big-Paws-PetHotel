"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  PawPrint,
  Search,
  RefreshCw,
  Plus,
  Dog,
  Cat,
  Filter,
  X,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PetsTable } from "./components/pets-table";
import { AddPetDialog, EditPetDialog } from "./components/dialogs";
import { BoardPetDialog } from "./components/board-pet-dialog";
import {
  ConfirmationDialog,
  SuccessDialog,
} from "./components/confirmation-dialog";
import { usePets, usePagination } from "./hooks";
import { filterPets } from "./utils/helpers";
import type { Pet } from "./utils/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationControls } from "@/app/webapp/admin/components/pagination-controls";

/**
 * BACKEND INTEGRATION NOTES:
 *
 * This page manages pets in the system.
 *
 * Integration points:
 * 1. Replace the usePets hook with actual API calls:
 *    - fetchPets(): GET /api/pets
 *    - fetchPetOwners(): GET /api/pet-owners
 *    - addPet(): POST /api/pets
 *    - updatePet(): PUT /api/pets/{id}
 *    - removePet(): DELETE /api/pets/{id}
 *    - toggleBoardingStatus(): PUT /api/pets/{id}/boarding
 *
 * 2. Update the filter functions to work with your actual data structure
 *
 * 3. Implement proper form validation based on your business rules
 *
 * 4. Connect success/error handling to your notification system
 *
 * Expected data formats are documented in the corresponding API utility files.
 */

export default function PetsPage() {
  const { toast } = useToast();
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBoardDialogOpen, setIsBoardDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Confirmation dialog state
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    type: "delete" as "delete" | "edit" | "board" | "endBoarding",
    title: "",
    description: "",
    onConfirm: () => {},
  });

  // Success dialog state
  const [successDialog, setSuccessDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
    actionLabel: "",
    onAction: () => {},
  });

  // BACKEND INTEGRATION: Replace this with actual API calls
  // Fetch pets data
  const {
    pets,
    petOwners,
    isLoading,
    isRefreshing,
    refreshPets,
    addPet,
    updatePet,
    removePet,
    toggleBoardingStatus,
  } = usePets();

  // Apply filters
  const filteredPets = filterPets(pets, {
    searchQuery,
    type: filterType !== "all" ? (filterType as "Dog" | "Cat") : undefined,
    status: filterStatus !== "all" ? filterStatus === "boarding" : undefined,
  });

  // Pagination
  const {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
    startIndex,
    endIndex,
  } = usePagination({
    totalItems: filteredPets.length,
    itemsPerPage: 10, // Standardized to 10 items per page
  });

  // Reset pagination when filters change
  useEffect(() => {
    resetPage();
  }, [searchQuery, filterType, filterStatus, resetPage]);

  // Current page data
  const currentPets = filteredPets.slice(startIndex, endIndex);

  // Handle pet selection for actions
  const handleSelectPet = useCallback((pet: Pet) => {
    setSelectedPet(pet);
  }, []);

  // Show confirmation dialog
  const showConfirmation = useCallback(
    (
      type: "delete" | "edit" | "board" | "endBoarding",
      title: string,
      description: string,
      onConfirm: () => void,
    ) => {
      setConfirmationDialog({
        isOpen: true,
        type,
        title,
        description,
        onConfirm,
      });
    },
    [],
  );

  // Close confirmation dialog
  const closeConfirmation = useCallback(() => {
    setConfirmationDialog((prev) => ({ ...prev, isOpen: false }));
  }, []);

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

  // Handle add pet
  const handleAddPet = useCallback(
    async (petData: Partial<Pet>, ownerId: string) => {
      setIsSubmitting(true);
      try {
        // BACKEND INTEGRATION: Replace with actual API call to add a pet
        await addPet(petData, ownerId);
        setIsAddDialogOpen(false);
        // Refresh pets with loading effect
        refreshPets();

        // Show success dialog
        setSuccessDialog({
          isOpen: true,
          title: "Pet Added Successfully",
          description: `${petData.name} has been added to the system.`,
          actionLabel: "",
          onAction: () => {},
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add pet. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [addPet, refreshPets, toast],
  );

  // Handle edit pet
  const handleEditPet = useCallback(
    async (petData: Partial<Pet>) => {
      if (!selectedPet) return;

      setIsSubmitting(true);
      try {
        // BACKEND INTEGRATION: Replace with actual API call to update a pet
        await updatePet(selectedPet.id, petData);
        setIsEditDialogOpen(false);
        // Refresh pets with loading effect
        refreshPets();

        // Show success dialog
        setSuccessDialog({
          isOpen: true,
          title: "Pet Updated",
          description: `${petData.name || selectedPet.name} has been successfully updated.`,
          actionLabel: "",
          onAction: () => {},
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update pet. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedPet, updatePet, refreshPets, toast],
  );

  // Handle delete pet
  const handleDeletePet = useCallback(async () => {
    if (!selectedPet) return;

    setIsSubmitting(true);
    try {
      // BACKEND INTEGRATION: Replace with actual API call to delete a pet
      await removePet(selectedPet.id);
      closeConfirmation();
      // Refresh pets with loading effect
      refreshPets();

      // Show success dialog
      setSuccessDialog({
        isOpen: true,
        title: "Pet Deleted",
        description: `${selectedPet.name} has been removed from the system.`,
        actionLabel: "",
        onAction: () => {},
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete pet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedPet, removePet, refreshPets, toast, closeConfirmation]);

  // Handle boarding status toggle
  const handleToggleBoardingStatus = useCallback(
    async (petId: string, boardingDetails?: any) => {
      if (!selectedPet) return false;

      setIsSubmitting(true);
      try {
        // BACKEND INTEGRATION: Replace with actual API call to toggle boarding status
        await toggleBoardingStatus(petId, boardingDetails);
        closeConfirmation();
        // Refresh pets with loading effect
        refreshPets();

        // Show success dialog
        setSuccessDialog({
          isOpen: true,
          title: selectedPet.isBoarding ? "Boarding Ended" : "Boarding Started",
          description: selectedPet.isBoarding
            ? `${selectedPet.name}'s boarding has been ended.`
            : `${selectedPet.name} has been successfully boarded.`,
          actionLabel: "",
          onAction: () => {},
        });
        return true;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update boarding status. Please try again.",
          variant: "destructive",
        });
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedPet, toggleBoardingStatus, refreshPets, toast, closeConfirmation],
  );

  // Clear filters
  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSearchInputValue("");
    setFilterType("all");
    setFilterStatus("all");
  }, []);

  // Determine if we should show the skeleton loader
  const showSkeletonLoader = isLoading || isRefreshing || isSearching;

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
          Pet Management
        </h1>
        <p className="text-muted-foreground">
          Manage all pets currently registered in the system.
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
                <PawPrint className="mr-2 h-5 w-5 text-primary" />
                <CardTitle>Pet Registry</CardTitle>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardDescription className="mt-0">
                  View and manage all registered pets.
                </CardDescription>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
                  <div className="relative flex-1 sm:w-[300px]">
                    <Input
                      ref={searchInputRef}
                      type="search"
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
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={refreshPets}
                      disabled={isRefreshing}
                      title="Refresh data"
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                      />
                    </Button>
                    <Button
                      onClick={() => setIsAddDialogOpen(true)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Pet
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

                {(searchQuery ||
                  filterType !== "all" ||
                  filterStatus !== "all") && (
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
              {(searchQuery ||
                filterType !== "all" ||
                filterStatus !== "all") && (
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
                  {filterType !== "all" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Type: {filterType}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setFilterType("all")}
                      />
                    </Badge>
                  )}
                  {filterStatus !== "all" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Status:{" "}
                      {filterStatus === "boarding"
                        ? "Boarding"
                        : "Not Boarding"}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setFilterStatus("all")}
                      />
                    </Badge>
                  )}
                </div>
              )}

              {/* Pets table */}
              {showSkeletonLoader ? (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted">
                      <TableRow>
                        <TableHead className="w-[60px]">
                          <Skeleton className="h-4 w-8 bg-gray-200 dark:bg-gray-700" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-700" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-12 bg-gray-200 dark:bg-gray-700" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-700" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                        </TableHead>
                        <TableHead className="text-right">
                          <Skeleton className="h-4 w-16 ml-auto bg-gray-200 dark:bg-gray-700" />
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Skeleton className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-20 bg-gray-200 dark:bg-gray-700" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-12 bg-gray-200 dark:bg-gray-700" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-16 bg-gray-200 dark:bg-gray-700" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Skeleton className="h-8 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
                              <Skeleton className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <>
                  <div className="rounded-md border overflow-hidden">
                    <PetsTable
                      pets={currentPets}
                      petOwners={petOwners}
                      onEdit={(pet) => {
                        handleSelectPet(pet);
                        setIsEditDialogOpen(true);
                      }}
                      onDelete={(pet) => {
                        handleSelectPet(pet);
                        showConfirmation(
                          "delete",
                          "Delete Pet",
                          `Are you sure you want to delete ${pet.name}? This action cannot be undone.`,
                          () => handleDeletePet(),
                        );
                      }}
                      onBoard={(pet) => {
                        handleSelectPet(pet);
                        setIsBoardDialogOpen(true);
                      }}
                      onEndBoarding={(pet) => {
                        handleSelectPet(pet);
                        showConfirmation(
                          "endBoarding",
                          "End Boarding",
                          `Are you sure you want to end boarding for ${pet.name}?`,
                          () => handleToggleBoardingStatus(pet.id),
                        );
                      }}
                    />
                  </div>

                  {/* Standardized Pagination Controls */}
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Pet Dialog */}
      <AddPetDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddPet}
        isSubmitting={isSubmitting}
        petOwners={petOwners}
      />

      {/* Edit Pet Dialog */}
      <EditPetDialog
        pet={selectedPet}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditPet}
        isSubmitting={isSubmitting}
        petOwners={petOwners}
      />

      {/* Board Pet Dialog */}
      <BoardPetDialog
        pet={selectedPet}
        isOpen={isBoardDialogOpen}
        onOpenChange={setIsBoardDialogOpen}
        onSubmit={(details) =>
          handleToggleBoardingStatus(selectedPet?.id || "", details)
        }
      />

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
    </motion.div>
  );
}
