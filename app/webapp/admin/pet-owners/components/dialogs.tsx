"use client"

import type React from "react"

// Consolidated dialog components
import { useState, useCallback, useRef } from "react"
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
  Upload,
  PawPrint,
  Dna,
  CalendarDays,
} from "lucide-react"
import type { Pet, PetOwner, FormErrors } from "../utils/types"
import { DOG_BREEDS, CAT_BREEDS } from "../utils/constants"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

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
  const [formState, setFormState] = useState<Partial<Pet>>({
    type: "Dog",
    size: "Medium",
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!validTypes.includes(file.type)) {
      setFormErrors((prev) => ({
        ...prev,
        image: true,
      }))
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({
        ...prev,
        image: true,
      }))
      return
    }

    // Mock implementation - replace with actual upload
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result.toString()
        setFormState((prev) => ({ ...prev, image: imageUrl }))
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.image
          return newErrors
        })
      }
    }
    reader.readAsDataURL(file)
  }

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

    // Set default image based on pet type if no image is provided
    if (!formState.image) {
      const defaultImage = formState.type === "Dog" ? "/default-images/dog.png" : "/default-images/cat.png"
      formState.image = defaultImage
    }

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

  // Get default image based on pet type
  const getDefaultImage = () => {
    return formState.type === "Dog" ? "/default-images/dog.png" : "/default-images/cat.png"
  }

  if (!owner) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <PlusCircle className="h-5 w-5" />
            Add New Pet
          </DialogTitle>
          <DialogDescription>Add a new pet for {owner.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center mb-4">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src={formState.image || getDefaultImage()} alt="Pet Profile" />
              <AvatarFallback>
                {formState.type === "Dog" ? <Dog className="h-12 w-12" /> : <Cat className="h-12 w-12" />}
              </AvatarFallback>
            </Avatar>

            <Label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
                <Upload className="h-3 w-3" />
                <span>Upload Photo</span>
              </div>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
            </Label>
            <p className="text-xs text-muted-foreground mt-1">Optional: Upload a profile picture</p>
            {formErrors.image && <p className="text-xs text-red-500 mt-1">Please upload a valid image (max 5MB)</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet-name" className="text-sm font-medium flex items-center">
              Pet Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <PawPrint className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="pet-name"
                placeholder="Enter pet name"
                value={formState.name || ""}
                onChange={(e) => updateField("name", e.target.value)}
                className={`pl-9 ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {formErrors.name && <p className="text-xs text-red-500">Pet name is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet-type" className="text-sm font-medium flex items-center">
              Pet Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              {formState.type === "Dog" ? (
                <Dog className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              ) : (
                <Cat className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
              <Select value={formState.type} onValueChange={(value) => updateField("type", value)}>
                <SelectTrigger
                  id="pet-type"
                  className={`pl-9 ${formErrors.type ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select pet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dog">
                    <div className="flex items-center">
                      <Dog className="mr-2 h-4 w-4 text-blue-500" />
                      Dog
                    </div>
                  </SelectItem>
                  <SelectItem value="Cat">
                    <div className="flex items-center">
                      <Cat className="mr-2 h-4 w-4 text-purple-500" />
                      Cat
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formErrors.type && <p className="text-xs text-red-500">Pet type is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet-breed" className="text-sm font-medium flex items-center">
              Breed <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Dna className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select value={formState.breed} onValueChange={(value) => updateField("breed", value)}>
                <SelectTrigger
                  id="pet-breed"
                  className={`pl-9 ${formErrors.breed ? "border-red-500 focus-visible:ring-red-500" : ""}`}
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
            </div>
            {formErrors.breed && <p className="text-xs text-red-500">Breed is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet-age" className="text-sm font-medium flex items-center">
              Age (years) <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="pet-age"
                type="number"
                min="0"
                max="30"
                placeholder="Enter age"
                value={formState.age || ""}
                onChange={(e) => updateField("age", Number.parseInt(e.target.value))}
                className={`pl-9 ${formErrors.age ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {formErrors.age && <p className="text-xs text-red-500">Age is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet-size" className="text-sm font-medium flex items-center">
              Size <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select value={formState.size} onValueChange={(value) => updateField("size", value)}>
                <SelectTrigger
                  id="pet-size"
                  className={`pl-9 ${formErrors.size ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                  <SelectItem value="XL">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formErrors.size && <p className="text-xs text-red-500">Size is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet-notes" className="text-sm font-medium">
              Additional Notes <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="pet-notes"
              placeholder="Enter any additional information about the pet"
              value={formState.notes || ""}
              onChange={(e) => updateField("notes", e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 dark:text-white"
          >
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
              className="border-green-300 bg-green-50 hover:bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:hover:bg-green-800/50 dark:text-green-400"
            >
              Close
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 dark:text-white"
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

