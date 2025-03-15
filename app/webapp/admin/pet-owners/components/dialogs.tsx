"use client"

// Consolidated dialog components
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import {
  PlusCircle,
  Loader2,
  Dog,
  Cat,
  Calendar,
  Ruler,
  CheckCircle2,
  XCircle,
  Edit,
  Hotel,
  AlertCircle,
  PartyPopper,
} from "lucide-react"
import type { Pet, PetOwner, FormErrors } from "../utils/types"
import { DOG_BREEDS, CAT_BREEDS } from "../utils/constants"

/**
 * Component for displaying pet details
 */
export interface PetDetailsDialogProps {
  pet: Pet | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onEditPet?: (pet: Pet) => void
  onBoardPet?: (pet: Pet) => void
  onEndBoarding?: (pet: Pet) => void
}

export function PetDetailsDialog({
  pet,
  isOpen,
  onOpenChange,
  onEditPet,
  onBoardPet,
  onEndBoarding,
}: PetDetailsDialogProps) {
  if (!pet) return null

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

        <div className="space-y-3 md:space-y-4">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mb-2">
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
            <p className="text-muted-foreground">{pet.breed}</p>
          </div>

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
                <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
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
                <Ruler className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Size</p>
                <p className="text-lg">{pet.size}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg border">
              <div
                className={`${pet.isBoarding ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"} p-2 rounded-full`}
              >
                {pet.isBoarding ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">Boarding Status</p>
                <p className="text-lg">{pet.isBoarding ? "Currently Boarding" : "Not Boarding"}</p>
              </div>
            </div>
          </div>

          {pet.notes && (
            <div className="p-3 rounded-lg border">
              <p className="text-sm font-medium mb-1">Additional Notes</p>
              <p className="text-sm text-muted-foreground">{pet.notes}</p>
            </div>
          )}

          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              className="border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-blue-800 dark:hover:bg-blue-950 dark:hover:text-blue-400"
              onClick={() => onEditPet?.(pet)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Pet
            </Button>

            {!pet.isBoarding ? (
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => onBoardPet?.(pet)}>
                <Hotel className="mr-2 h-4 w-4" />
                Start Boarding
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-amber-200 hover:bg-amber-50 hover:text-amber-600 dark:border-amber-800 dark:hover:bg-amber-950 dark:hover:text-amber-400"
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

/**
 * Component for adding a new pet
 */
export interface AddPetDialogProps {
  owner: PetOwner | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (petData: Partial<Pet>) => Promise<void>
  isSubmitting: boolean
}

export function AddPetDialog({ owner, isOpen, onOpenChange, onSubmit, isSubmitting }: AddPetDialogProps) {
  const [formState, setFormState] = useState<Partial<Pet>>({ type: "Dog", size: "Medium" })
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  const updateField = useCallback(
    (field: keyof Pet, value: any) => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
        // Reset breed if pet type changes
        ...(field === "type" && { breed: undefined }),
      }))

      // Clear error for this field if it exists
      if (formErrors[field]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[field]
          return newErrors
        })
      }
    },
    [formErrors],
  )

  const validateForm = useCallback(() => {
    const errors: FormErrors = {}
    const requiredFields: (keyof Pet)[] = ["name", "type", "breed", "age", "size"]

    requiredFields.forEach((field) => {
      if (!formState[field]) {
        errors[field] = true
      }
    })

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [formState])

  const handleSubmit = async () => {
    if (!validateForm()) return
    await onSubmit(formState)
  }

  // Reset form when dialog closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFormState({ type: "Dog", size: "Medium" })
      setFormErrors({})
    }
    onOpenChange(open)
  }

  if (!owner) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <PlusCircle className="h-5 w-5" />
            Add New Pet
          </DialogTitle>
          <DialogDescription>Add a new pet for {owner.name}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="pet-name" className="text-sm font-medium flex items-center">
              Pet Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="pet-name"
              placeholder="Enter pet name"
              value={formState.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
              className={`focus-visible:ring-blue-500 ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : "border-input"}`}
            />
            {formErrors.name && <p className="text-xs text-red-500">Pet name is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet-type" className="text-sm font-medium flex items-center">
              Pet Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select value={formState.type} onValueChange={(value) => updateField("type", value)}>
              <SelectTrigger
                id="pet-type"
                className={`${formErrors.type ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-blue-500`}
              >
                <SelectValue placeholder="Select pet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dog">Dog</SelectItem>
                <SelectItem value="Cat">Cat</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.type && <p className="text-xs text-red-500">Pet type is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet-breed" className="text-sm font-medium flex items-center">
              Breed <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select value={formState.breed} onValueChange={(value) => updateField("breed", value)}>
              <SelectTrigger
                id="pet-breed"
                className={`${formErrors.breed ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-blue-500`}
              >
                <SelectValue placeholder="Select breed" />
              </SelectTrigger>
              <SelectContent>
                {(formState.type === "Dog" ? DOG_BREEDS : CAT_BREEDS).map((breed) => (
                  <SelectItem key={breed} value={breed}>
                    {breed}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.breed && <p className="text-xs text-red-500">Breed is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet-age" className="text-sm font-medium flex items-center">
              Age (years) <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="pet-age"
              type="number"
              min="0"
              max="30"
              placeholder="Enter age"
              value={formState.age || ""}
              onChange={(e) => updateField("age", Number.parseInt(e.target.value))}
              className={`focus-visible:ring-blue-500 ${formErrors.age ? "border-red-500 focus-visible:ring-red-500" : "border-input"}`}
            />
            {formErrors.age && <p className="text-xs text-red-500">Age is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet-size" className="text-sm font-medium flex items-center">
              Size <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select value={formState.size} onValueChange={(value) => updateField("size", value)}>
              <SelectTrigger
                id="pet-size"
                className={`${formErrors.size ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-blue-500`}
              >
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Small">Small</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Large">Large</SelectItem>
                <SelectItem value="XL">XL</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.size && <p className="text-xs text-red-500">Size is required</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="pet-notes" className="text-sm font-medium">
              Additional Notes <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="pet-notes"
              placeholder="Enter any additional information about the pet"
              value={formState.notes || ""}
              onChange={(e) => updateField("notes", e.target.value)}
              className="min-h-[80px] focus-visible:ring-blue-500"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Pet...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Pet
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Component for confirming pet owner deletion
 */
export interface DeleteConfirmDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title?: string
  description?: string
}

export function DeleteConfirmDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  title = "Delete Pet Owner",
  description = "Are you sure you want to delete this pet owner? This action cannot be undone.",
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 p-4 bg-destructive/10 rounded-md">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-sm text-destructive">
            This will permanently delete the pet owner and all associated records.
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Component for displaying success message
 */
export interface SuccessDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  ownerName: string
  onBoardPet: () => void
}

export function SuccessDialog({ isOpen, onOpenChange, ownerName, onBoardPet }: SuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[80vh]">
        <motion.div
          className="flex items-center justify-center flex-col text-center py-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-3 mb-4">
            <PartyPopper className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">Pet Added Successfully!</h3>
          <p className="text-green-600 dark:text-green-400 mb-6">The pet has been added to {ownerName}'s profile.</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-green-200 hover:bg-green-100 dark:border-green-800 dark:hover:bg-green-900/30"
            >
              Close
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                onOpenChange(false)
                onBoardPet()
              }}
            >
              <Hotel className="mr-2 h-4 w-4" />
              Let's Board This Pet
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

