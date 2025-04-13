"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Hotel, CheckCircle, Dog, Cat, Info } from "lucide-react"
import type { BasePet, BasePetOwner } from "@/app/webapp/admin/data/shared-sample-data"
import { Skeleton } from "@/components/ui/skeleton"

// Pet interface extending the base interface
export interface Pet extends BasePet {}

// Pet Owner interface extending the base interface
export interface PetOwner extends BasePetOwner {}

interface PetsTableProps {
  pets: Pet[]
  petOwners: PetOwner[]
  onEdit: (pet: Pet) => void
  onEditDetails: (pet: Pet) => void // Add this new prop
  onDelete: (pet: Pet) => void
  onBoard: (pet: Pet) => void
  onEndBoarding: (pet: Pet) => void
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  isLoading?: boolean
}

export function PetsTable({
  pets,
  petOwners,
  onEdit,
  onEditDetails, // Add this new prop
  onDelete,
  onBoard,
  onEndBoarding,
  currentPage,
  totalPages,
  goToPage,
  nextPage,
  prevPage,
  isLoading = false,
}: PetsTableProps) {
  // Find owner name by pet's ownerId
  const getOwnerName = (ownerId: string): string => {
    const owner = petOwners.find((owner) => owner.id === ownerId)
    return owner ? owner.name : "Unknown Owner"
  }

  // Add a loading state renderer
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="w-[60px] text-center whitespace-nowrap">Avatar</TableHead>
                <TableHead className="text-center whitespace-nowrap">Pet Name</TableHead>
                <TableHead className="text-center whitespace-nowrap">Pet Owner</TableHead>
                <TableHead className="text-center whitespace-nowrap">Type</TableHead>
                <TableHead className="text-center whitespace-nowrap">Breed</TableHead>
                <TableHead className="text-center whitespace-nowrap">Age</TableHead>
                <TableHead className="text-center whitespace-nowrap">Size</TableHead>
                <TableHead className="text-center whitespace-nowrap">Notes</TableHead>
                <TableHead className="text-center whitespace-nowrap">Status</TableHead>
                <TableHead className="text-center whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
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
      </div>
    )
  }

  // Rest of the component remains the same
  return (
    <div className="space-y-4">
      <style jsx global>{`
  /* Hide the browser's native clear button */
  input[type="search"]::-webkit-search-cancel-button {
    display: none;
  }
  input[type="search"]::-ms-clear {
    display: none;
  }
`}</style>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="w-[60px] text-center whitespace-nowrap">Avatar</TableHead>
              <TableHead className="text-center whitespace-nowrap">Pet Name</TableHead>
              <TableHead className="text-center whitespace-nowrap">Pet Owner</TableHead>
              <TableHead className="text-center whitespace-nowrap">Type</TableHead>
              <TableHead className="text-center whitespace-nowrap">Breed</TableHead>
              <TableHead className="text-center whitespace-nowrap">Age</TableHead>
              <TableHead className="text-center whitespace-nowrap">Size</TableHead>
              <TableHead className="text-center whitespace-nowrap">Notes</TableHead>
              <TableHead className="text-center whitespace-nowrap">Status</TableHead>
              <TableHead className="text-center whitespace-nowrap">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center">
                  No pets found.
                </TableCell>
              </TableRow>
            ) : (
              pets.map((pet) => (
                <TableRow
                  key={pet.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={(e) => {
                    // Only trigger row click if not clicking on a button or interactive element
                    if (!(e.target as HTMLElement).closest('button, [role="button"], a, input, select, textarea')) {
                      onEdit(pet)
                    }
                  }}
                >
                  <TableCell>
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src={pet.image} alt={pet.name} />
                      <AvatarFallback className="bg-primary/10">
                        {pet.type === "Dog" ? (
                          <Dog className="h-4 w-4 text-primary" />
                        ) : (
                          <Cat className="h-4 w-4 text-primary" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{pet.name}</TableCell>
                  <TableCell>{getOwnerName(pet.ownerId)}</TableCell>
                  <TableCell>
                    <Badge
                      className={`whitespace-nowrap justify-center ${
                        pet.type === "Dog"
                          ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600"
                          : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-600"
                      }`}
                    >
                      {pet.type === "Dog" ? <Dog className="mr-1 h-3 w-3" /> : <Cat className="mr-1 h-3 w-3" />}
                      {pet.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{pet.breed}</TableCell>
                  <TableCell>
                    {pet.age} {pet.age === 1 ? "year" : "years"}
                  </TableCell>
                  <TableCell>{pet.size}</TableCell>
                  <TableCell>
                    {pet.notes ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center cursor-help">
                              <span className="truncate max-w-[100px]">{pet.notes}</span>
                              <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{pet.notes}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <span className="text-muted-foreground text-sm">No notes</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`whitespace-nowrap min-w-[110px] text-center justify-center ${pet.isBoarding ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                    >
                      {pet.isBoarding ? "Boarding" : "Not Boarding"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      {pet.isBoarding ? (
                        <Button
                          className="mr-2 bg-red-500 hover:bg-red-600 text-white min-w-[140px]"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation() // Prevent row click
                            onEndBoarding(pet)
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          End Boarding
                        </Button>
                      ) : (
                        <Button
                          className="mr-2 bg-green-500 hover:bg-green-600 text-white min-w-[140px]"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation() // Prevent row click
                            onBoard(pet)
                          }}
                        >
                          <Hotel className="h-4 w-4 mr-1" />
                          Board Pet
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => e.stopPropagation()} // Prevent row click
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation() // Prevent row click
                              onEditDetails(pet) // Use the new function instead of onEdit
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4 text-blue-500" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation() // Prevent row click
                              onDelete(pet)
                            }}
                            className="text-red-600 hover:text-red-700 focus:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4 mr-2 text-red-600 dark:text-red-500" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
            {/* Empty rows to maintain fixed height */}
            {pets.length > 0 &&
              pets.length < 6 &&
              Array.from({ length: 6 - pets.length }).map((_, index) => (
                <TableRow key={`empty-${index}`} className="h-[73px]">
                  <TableCell colSpan={10}></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

