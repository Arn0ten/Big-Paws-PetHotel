"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dog, Cat, Edit, Hotel, CheckCircle2 } from "lucide-react"
import type { Pet, PetOwner } from "../utils/types"

interface PetDetailsDialogProps {
  pet: Pet | null
  petOwners: PetOwner[]
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onEditPet?: (pet: Pet) => void
  onBoardPet?: (pet: Pet) => void
  onEndBoarding?: (pet: Pet) => void
}

export function PetDetailsDialog({
  pet,
  petOwners,
  isOpen,
  onOpenChange,
  onEditPet,
  onBoardPet,
  onEndBoarding,
}: PetDetailsDialogProps) {
  if (!pet) return null

  // Find pet owner
  const owner = petOwners.find((o) => o.id === pet.ownerId)

  // Get default image based on pet type if no image is provided
  const getDefaultImage = () => {
    return pet.type === "Dog" ? "/default-images/dog.png" : "/default-images/cat.png"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {pet.type === "Dog" ? (
              <Dog className="h-5 w-5 text-blue-500" />
            ) : (
              <Cat className="h-5 w-5 text-purple-500" />
            )}
            Pet Details
          </DialogTitle>
          <DialogDescription>Detailed information about {pet.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-2 border-4 border-primary/20">
              <AvatarImage src={pet.image || getDefaultImage()} alt={pet.name} />
              <AvatarFallback>
                {pet.type === "Dog" ? <Dog className="h-12 w-12" /> : <Cat className="h-12 w-12" />}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{pet.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className={
                  pet.type === "Dog"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                }
              >
                {pet.type}
              </Badge>
              <Badge variant="outline">{pet.breed}</Badge>
            </div>
            {pet.isBoarding && (
              <Badge className="mt-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Currently Boarding
              </Badge>
            )}

            {/* Move buttons here under the avatar and badges */}
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                className="border-primary/20 hover:bg-primary/10 hover:text-primary"
                onClick={() => onEditPet?.(pet)}
              >
                <Edit className="mr-1 h-3.5 w-3.5" />
                Edit Pet
              </Button>

              {!pet.isBoarding ? (
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => onBoardPet?.(pet)}
                >
                  <Hotel className="mr-1 h-3.5 w-3.5" />
                  Start Boarding
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="mr-2 bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => onEndBoarding?.(pet)}
                >
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                  End Boarding
                </Button>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-lg border">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Dog className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Type</p>
                <p className="text-lg">{pet.type}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg border">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                <span className="block h-4 w-4 text-amber-600 dark:text-amber-400 text-center font-medium">A</span>
              </div>
              <div>
                <p className="text-sm font-medium">Age</p>
                <p className="text-lg">
                  {pet.age} {pet.age === 1 ? "year" : "years"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg border">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                <span className="block h-4 w-4 text-purple-600 dark:text-purple-400 text-center font-medium">S</span>
              </div>
              <div>
                <p className="text-sm font-medium">Size</p>
                <p className="text-lg">{pet.size}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg border">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                <span className="block h-4 w-4 text-indigo-600 dark:text-indigo-400 text-center font-medium">O</span>
              </div>
              <div>
                <p className="text-sm font-medium">Owner</p>
                <p className="text-lg truncate max-w-[120px]">{owner?.name || "Unknown"}</p>
              </div>
            </div>
          </div>

          {pet.notes && (
            <div className="p-3 rounded-lg border">
              <p className="text-sm font-medium mb-1">Additional Notes</p>
              <p className="text-sm text-muted-foreground">{pet.notes}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

