"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dog,
  Cat,
  Calendar,
  Ruler,
  CheckCircle2,
  XCircle,
  Edit,
  Hotel,
  User,
  Dna,
  Weight,
  Palette,
  Syringe,
  Stethoscope,
  UtensilsCrossed,
  BrainCircuit,
} from "lucide-react"
import type { Pet, PetOwner } from "../utils/types"

export interface PetDetailsDialogProps {
  pet: Pet | null
  petOwners?: PetOwner[]
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onEditPet?: (pet: Pet) => void
  onBoardPet?: (pet: Pet) => void
  onEndBoarding?: (pet: Pet) => void
}

export function PetDetailsDialog({
  pet,
  petOwners = [],
  isOpen,
  onOpenChange,
  onEditPet,
  onBoardPet,
  onEndBoarding,
}: PetDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!pet) return null

  // Find the pet owner
  const owner = petOwners.find((o) => o.id === pet.ownerId)

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

        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 mb-2">
              <img
                src={pet.image || "/placeholder.svg?height=200&width=200"}
                alt={pet.name}
                className="object-cover w-full h-full"
              />
              {pet.isBoarding && (
                <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs py-1 text-center">
                  Currently Boarding
                </div>
              )}
            </div>
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
                {pet.type === "Dog" ? <Dog className="h-3 w-3 mr-1" /> : <Cat className="h-3 w-3 mr-1" />}
                {pet.type}
              </Badge>
              <Badge
                variant="outline"
                className={
                  pet.isBoarding
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }
              >
                {pet.isBoarding ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                {pet.isBoarding ? "Boarding" : "Not Boarding"}
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Detailed Info</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg border">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    <Dna className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Breed</p>
                    <p className="text-base">{pet.breed}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg border">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Age</p>
                    <p className="text-base">
                      {pet.age} {pet.age === 1 ? "year" : "years"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg border">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                    <Ruler className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Size</p>
                    <p className="text-base">{pet.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg border">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Owner</p>
                    <p className="text-base truncate">{owner?.name || "Unknown"}</p>
                  </div>
                </div>
              </div>

              {pet.notes && (
                <div className="p-3 rounded-lg border">
                  <p className="text-sm font-medium mb-1">Additional Notes</p>
                  <p className="text-sm text-muted-foreground">{pet.notes}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg border">
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-full">
                    <Weight className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Weight</p>
                    <p className="text-base">{pet.weight || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg border">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full">
                    <Palette className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Color</p>
                    <p className="text-base">{pet.color || "Not specified"}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Syringe className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium">Vaccination Status</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {pet.vaccinationStatus || "No vaccination information available"}
                </p>
              </div>

              <div className="p-3 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Stethoscope className="h-4 w-4 text-red-600" />
                  <p className="text-sm font-medium">Medical History</p>
                </div>
                <p className="text-sm text-muted-foreground">{pet.medicalHistory || "No medical history available"}</p>
              </div>

              <div className="p-3 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <UtensilsCrossed className="h-4 w-4 text-amber-600" />
                  <p className="text-sm font-medium">Dietary Needs</p>
                </div>
                <p className="text-sm text-muted-foreground">{pet.dietaryNeeds || "Standard diet"}</p>
              </div>

              <div className="p-3 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <BrainCircuit className="h-4 w-4 text-purple-600" />
                  <p className="text-sm font-medium">Behavioral Notes</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {pet.behavioralNotes || "No behavioral notes available"}
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              className="border-primary/20 hover:bg-primary/10 hover:text-primary dark:border-primary/30 dark:hover:bg-primary/20 dark:hover:text-primary-foreground"
              onClick={() => onEditPet?.(pet)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Pet
            </Button>

            {!pet.isBoarding ? (
              <Button
                className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 dark:text-white"
                onClick={() => onBoardPet?.(pet)}
              >
                <Hotel className="mr-2 h-4 w-4" />
                Start Boarding
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:hover:bg-amber-800/50 dark:text-amber-400"
                onClick={() => onEndBoarding?.(pet)}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                End Boarding
              </Button>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

