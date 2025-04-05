"use client"

// Consolidated table-related components
import { TableRow, TableCell, TableBody, TableHead, TableHeader, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  PlusCircle,
  Hotel,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  MoreHorizontal,
  Dog,
  Cat,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react"
import type { Pet, PetOwner } from "../utils/types"

/**
 * Component for displaying pet badges
 */
export interface PetBadgesProps {
  pets: Pet[]
  ownerId: string
  expandedIds: string[]
  onToggleExpand: (id: string) => void
  onPetClick: (pet: Pet) => void
}

export function PetBadges({ pets, ownerId, expandedIds, onToggleExpand, onPetClick }: PetBadgesProps) {
  const isExpanded = expandedIds.includes(ownerId)

  if (pets.length === 0) {
    return <span className="text-muted-foreground text-sm">No pets</span>
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={() => onToggleExpand(ownerId)} className="w-full">
      <div className="flex flex-wrap gap-1.5">
        {pets.slice(0, 2).map((pet) => (
          <PetBadge key={pet.id} pet={pet} onClick={() => onPetClick(pet)} />
        ))}

        {pets.length > 2 && (
          <div
            onClick={(e) => {
              e.stopPropagation()
              onToggleExpand(ownerId)
            }}
          >
            <Badge
              variant="outline"
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer"
            >
              {isExpanded ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}+
              {pets.length - 2} more
            </Badge>
          </div>
        )}
      </div>

      {pets.length > 2 && (
        <CollapsibleContent className="mt-2 space-y-2">
          <div className="pl-2 border-l-2 border-muted-foreground/20 space-y-1.5">
            {pets.slice(2).map((pet) => (
              <PetBadge key={pet.id} pet={pet} onClick={() => onPetClick(pet)} />
            ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  )
}

interface PetBadgeProps {
  pet: Pet
  onClick: () => void
}

// Ensure the PetBadge component uses the same styling as the pet type badges in the PetsTable
// Update the PetBadge function:

function PetBadge({ pet, onClick }: PetBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`
        whitespace-nowrap cursor-pointer transition-all hover:scale-105
        ${
          pet.type === "Dog"
            ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600"
            : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-600"
        }
      `}
      onClick={(e) => {
        e.stopPropagation() // Prevent row click from triggering
        onClick()
      }}
    >
      {pet.type === "Dog" ? <Dog className="h-3 w-3 mr-1" /> : <Cat className="h-3 w-3 mr-1" />}
      {pet.name}
      {pet.isBoarding && <span className="ml-1 h-2 w-2 rounded-full bg-green-300" title="Currently boarding" />}
    </Badge>
  )
}

/**
 * Component for displaying a pet owner row
 */
export interface PetOwnerTableRowProps {
  owner: PetOwner
  expandedPetsList: string[]
  onToggleExpandPets: (id: string) => void
  onPetClick: (pet: Pet) => void
  onAddPet: (id: string) => void
  onBoardPet: (id: string) => void
  onEditOwner: (id: string) => void
  onDeleteOwner: (id: string) => void
}

// Make the entire row clickable to show pet owner details
// Add this to the PetOwnerTableRow function
export function PetOwnerTableRow({
  owner,
  expandedPetsList,
  onToggleExpandPets,
  onPetClick,
  onAddPet,
  onBoardPet,
  onEditOwner,
  onDeleteOwner,
  onRowClick, // Add this new prop
}: PetOwnerTableRowProps & { onRowClick: (id: string) => void }) {
  return (
    <TableRow
      className="hover:bg-muted/30 transition-colors cursor-pointer"
      onClick={(e) => {
        // Prevent row click when clicking on buttons or interactive elements
        if (!(e.target as HTMLElement).closest('button, [role="button"], a, input, select, textarea')) {
          onRowClick(owner.id)
        }
      }}
    >
      <TableCell>
        <Avatar className="border-2 border-primary/20">
          <AvatarImage src={owner.avatar} alt={owner.name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {owner.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="font-medium">{owner.name}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div className="flex items-center">
            <Mail className="h-3.5 w-3.5 mr-1 text-blue-500" />
            <span className="text-sm">{owner.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-3.5 w-3.5 mr-1 text-green-500" />
            <span className="text-sm">{owner.phone}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell max-w-[200px]">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-start cursor-help">
                <MapPin className="h-3.5 w-3.5 mr-1 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm truncate">{owner.address}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-sm">
              <p>{owner.address}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <PetBadges
          pets={owner.pets}
          ownerId={owner.id}
          expandedIds={expandedPetsList}
          onToggleExpand={onToggleExpandPets}
          onPetClick={(pet) => {
            // Ensure this properly passes the pet to the parent handler
            onPetClick(pet)
          }}
        />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-green-600 text-white hover:bg-green-700 border-green-600 dark:bg-green-700 dark:border-green-700 dark:hover:bg-green-600"
                  onClick={(e) => {
                    e.stopPropagation() // Prevent row click
                    onAddPet(owner.id)
                  }}
                >
                  <PlusCircle className="h-4 w-4 mr-1.5" />
                  <span>Add Pet</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add a new pet for this owner</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-amber-600 text-white hover:bg-amber-700 border-amber-600 dark:bg-amber-700 dark:border-amber-700 dark:hover:bg-amber-600"
                  onClick={(e) => {
                    e.stopPropagation() // Prevent row click
                    onBoardPet(owner.id)
                  }}
                >
                  <Hotel className="h-4 w-4 mr-1.5" />
                  <span>Board Pet</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new boarding reservation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={(e) => e.stopPropagation()} // Prevent row click
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation() // Prevent row click
                  onEditOwner(owner.id)
                }}
              >
                <Edit className="mr-2 h-4 w-4 text-blue-500" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={(e) => {
                  e.stopPropagation() // Prevent row click
                  onDeleteOwner(owner.id)
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  )
}

/**
 * Component for the pet owner table
 */
export interface PetOwnerTableProps {
  owners: PetOwner[]
  isLoading: boolean
  expandedPetsList: string[]
  onToggleExpandPets: (id: string) => void
  onPetClick: (pet: Pet) => void
  onAddPet: (id: string) => void
  onBoardPet: (id: string) => void
  onEditOwner: (id: string) => void
  onDeleteOwner: (id: string) => void
  onRowClick: (id: string) => void // Add this new prop
  itemsPerPage: number
  searchQuery: string
}

// Fix the skeleton colors in PetOwnerTable
export function PetOwnerTable({
  owners,
  isLoading,
  expandedPetsList,
  onToggleExpandPets,
  onPetClick,
  onAddPet,
  onBoardPet,
  onEditOwner,
  onDeleteOwner,
  onRowClick, // Add this new prop
  itemsPerPage,
  searchQuery,
}: PetOwnerTableProps) {
  // Create empty rows to maintain fixed height
  const emptyRowsCount = Math.max(0, itemsPerPage - owners.length)
  const emptyRows = Array(emptyRowsCount).fill(null)

  return (
    <div className="overflow-hidden">
      <style jsx global>{`
  /* Hide the browser's native clear button */
  input[type="search"]::-webkit-search-cancel-button {
    display: none;
  }
  input[type="search"]::-ms-clear {
    display: none;
  }
`}</style>
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[50px] font-semibold">Avatar</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Contact Information</TableHead>
            <TableHead className="hidden md:table-cell font-semibold">Address</TableHead>
            <TableHead className="font-semibold">Pets</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="relative">
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <TableRow key={`skeleton-${index}`}>
                <TableCell>
                  <Skeleton className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-[150px] bg-gray-200 dark:bg-gray-700" />
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[180px] bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-[120px] bg-gray-200 dark:bg-gray-700" />
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-4 w-[200px] bg-gray-200 dark:bg-gray-700" />
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-6 w-16 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-6 w-16 bg-gray-200 dark:bg-gray-700" />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-9 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-9 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-9 w-9 rounded-md bg-gray-200 dark:bg-gray-700" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : owners.length > 0 ? (
            // Pet owner rows
            owners.map((owner) => (
              <PetOwnerTableRow
                key={owner.id}
                owner={owner}
                expandedPetsList={expandedPetsList}
                onToggleExpandPets={onToggleExpandPets}
                onPetClick={onPetClick}
                onAddPet={onAddPet}
                onBoardPet={onBoardPet}
                onEditOwner={onEditOwner}
                onDeleteOwner={onDeleteOwner}
                onRowClick={onRowClick} // Pass the prop here
              />
            ))
          ) : (
            // No results
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Users className="h-8 w-8 mb-2 text-muted-foreground/70" />
                  <p>No pet owners found</p>
                  {searchQuery && <p className="text-sm">Try adjusting your search query</p>}
                </div>
              </TableCell>
            </TableRow>
          )}

          {/* Empty rows to maintain fixed height */}
          {!isLoading &&
            emptyRows.map((_, index) => (
              <TableRow key={`empty-${index}`} className="h-[73px]">
                <TableCell colSpan={6}></TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

/**
 * Component for pagination controls
 */
export interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
  if (totalPages <= 1) return null

  return (
    <div className="py-4 flex justify-center bg-muted/20">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="text-foreground hover:text-foreground/80"
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1

            // Show first page, last page, and pages around current page
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => onPageChange(page)}
                    className={page === currentPage ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            }

            // Show ellipsis for gaps
            if ((page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2)) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return null
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="text-foreground hover:text-foreground/80"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

