/**
 * BACKEND INTEGRATION NOTES:
 *
 * This file contains dialog components for pet management operations.
 *
 * Integration points:
 * 1. AddPetDialog: Connect to your pet creation API endpoint
 *    - Replace onSubmit handler with actual API call
 *    - Update form validation as needed for your data requirements
 *
 * 2. EditPetDialog: Connect to your pet update API endpoint
 *    - Replace onSubmit handler with actual API call
 *    - Ensure proper error handling and validation
 *
 * 3. DeleteConfirmDialog: Connect to your pet deletion API endpoint
 *    - Replace onConfirm handler with actual API call
 *    - Consider adding additional confirmation for pets with active bookings
 *
 * Expected data format for Pet object:
 * {
 *   id: string,
 *   name: string,
 *   type: "Dog" | "Cat",
 *   breed: string,
 *   age: number,
 *   size: "Small" | "Medium" | "Large" | "XL",
 *   ownerId: string,
 *   isBoarding: boolean,
 *   notes?: string,
 *   image?: string
 * }
 */
"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PawPrint,
  Dog,
  Cat,
  Loader2,
  Upload,
  AlertCircle,
  PlusCircle,
  User,
  Dna,
  CalendarDays,
  Ruler,
} from "lucide-react"
import type { Pet, PetOwner } from "../utils/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define the FormErrors type
interface FormErrors {
  name?: boolean
  type?: boolean
  breed?: boolean
  age?: boolean
  size?: boolean
  ownerId?: boolean
  image?: boolean
}

const DOG_BREEDS = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "French Bulldog",
  "Bulldog",
  "Poodle",
  "Rottweiler",
  "Beagle",
  "Dachshund",
  "German Shorthaired Pointer",
  "Yorkshire Terrier",
  "Boxer",
  "Siberian Husky",
  "Doberman Pinscher",
  "Australian Shepherd",
  "Great Dane",
  "Miniature Schnauzer",
  "Shih Tzu",
  "Bernese Mountain Dog",
  "Pomeranian",
]

const CAT_BREEDS = [
  "Maine Coon",
  "Ragdoll",
  "British Shorthair",
  "Persian",
  "Siamese",
  "Bengal",
  "Sphynx",
  "Abyssinian",
  "Russian Blue",
  "Norwegian Forest Cat",
  "American Shorthair",
  "Scottish Fold",
  "Burmese",
  "Oriental Shorthair",
  "Himalayan",
  "Egyptian Mau",
  "Tonkinese",
  "Cornish Rex",
  "Devon Rex",
  "Ocicat",
]

/**
 * Component for adding a new pet
 */
export interface AddPetDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (petData: Partial<Pet>, ownerId: string) => Promise<void>
  isSubmitting: boolean
  petOwners: PetOwner[]
}

export function AddPetDialog({ isOpen, onOpenChange, onSubmit, isSubmitting, petOwners }: AddPetDialogProps) {
  const [formData, setFormData] = useState<Partial<Pet>>({
    type: "Dog",
    size: "Medium",
  })
  const [ownerId, setOwnerId] = useState<string>("")
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle select change
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Reset breed if pet type changes
    if (field === "type") {
      setFormData((prev) => ({ ...prev, breed: undefined }))
    }

    // Clear error for this field if it exists
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

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
        setFormData((prev) => ({ ...prev, image: imageUrl }))
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.image
          return newErrors
        })
      }
    }
    reader.readAsDataURL(file)
  }

  const validateForm = () => {
    const errors: FormErrors = {}
    const requiredFields: (keyof Pet)[] = ["name", "type", "breed", "age", "size"]

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = true
      }
    })

    if (!ownerId) {
      errors["ownerId"] = true
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    // Set default image based on pet type if no image is provided
    if (!formData.image) {
      const defaultImage = formData.type === "Dog" ? "/default-images/dog.png" : "/default-images/cat.png"
      formData.image = defaultImage
    }

    await onSubmit(formData, ownerId)
  }

  // Reset form when dialog closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFormData({ type: "Dog", size: "Medium" })
      setOwnerId("")
      setFormErrors({})
    }
    onOpenChange(open)
  }

  // Get default image based on pet type
  const getDefaultImage = () => {
    return formData.type === "Dog" ? "/default-images/dog.png" : "/default-images/cat.png"
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <PlusCircle className="h-5 w-5" />
            Add New Pet
          </DialogTitle>
          <DialogDescription>Register a new pet in the system</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center mb-4">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src={formData.image || getDefaultImage()} alt="Pet Profile" />
              <AvatarFallback>
                {formData.type === "Dog" ? <Dog className="h-12 w-12" /> : <Cat className="h-12 w-12" />}
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
            <Label htmlFor="name" className="text-sm font-medium flex items-center">
              Pet Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <PawPrint className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="Enter pet name"
                value={formData.name || ""}
                onChange={handleInputChange}
                className={`pl-9 ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {formErrors.name && <p className="text-xs text-red-500">Pet name is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet-owner" className="text-sm font-medium flex items-center">
              Pet Owner <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select value={ownerId} onValueChange={setOwnerId}>
                <SelectTrigger
                  id="pet-owner"
                  className={`pl-9 ${formErrors.ownerId ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select pet owner" />
                </SelectTrigger>
                <SelectContent>
                  {petOwners.map((owner) => (
                    <SelectItem key={owner.id} value={owner.id}>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        {owner.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formErrors.ownerId && <p className="text-xs text-red-500">Pet owner is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium flex items-center">
              Pet Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              {formData.type === "Dog" ? (
                <Dog className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              ) : (
                <Cat className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
              <Select value={formData.type || "Dog"} onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger
                  id="type"
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
            <Label htmlFor="breed" className="text-sm font-medium flex items-center">
              Breed <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Dna className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select value={formData.breed || ""} onValueChange={(value) => handleSelectChange("breed", value)}>
                <SelectTrigger
                  id="breed"
                  className={`pl-9 ${formErrors.breed ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select breed" />
                </SelectTrigger>
                <SelectContent>
                  {(formData.type === "Dog" ? DOG_BREEDS : CAT_BREEDS).map((breed) => (
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
            <Label htmlFor="age" className="text-sm font-medium flex items-center">
              Age (years) <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="age"
                name="age"
                type="number"
                min="0"
                max="30"
                placeholder="Enter age"
                value={formData.age || ""}
                onChange={handleInputChange}
                className={`pl-9 ${formErrors.age ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {formErrors.age && <p className="text-xs text-red-500">Age is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="size" className="text-sm font-medium flex items-center">
              Size <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select value={formData.size || "Medium"} onValueChange={(value) => handleSelectChange("size", value)}>
                <SelectTrigger
                  id="size"
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
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Enter any additional notes about this pet"
              value={formData.notes || ""}
              onChange={handleInputChange}
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
 * Component for editing a pet
 */
export function EditPetDialog({
  pet,
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
  petOwners,
}: {
  pet: Pet | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Partial<Pet>) => void
  isSubmitting: boolean
  petOwners: PetOwner[]
}) {
  const [formData, setFormData] = useState<Partial<Pet>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize form data when pet changes or dialog opens
  useEffect(() => {
    if (pet && isOpen) {
      setFormData({
        id: pet.id,
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        age: pet.age,
        size: pet.size,
        ownerId: pet.ownerId,
        notes: pet.notes || "",
        image: pet.image || "/placeholder.svg?height=200&width=200",
      })
      setFormErrors({})
    }
  }, [pet, isOpen])

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle select change
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error for this field if it exists
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!validTypes.includes(file.type)) {
      setFormErrors((prev) => ({
        ...prev,
        image: "Please upload a valid image file (JPEG, PNG, GIF, WEBP)",
      }))
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({
        ...prev,
        image: "Image size should be less than 5MB",
      }))
      return
    }

    // BACKEND INTEGRATION POINT:
    // This should upload the file to your server/storage
    // Example implementation:
    // const formData = new FormData()
    // formData.append('image', file)
    // const response = await fetch('/api/admin/upload-pet-image', {
    //   method: 'POST',
    //   body: formData
    // })
    // const data = await response.json()
    // if (response.ok) {
    //   setFormData(prev => ({ ...prev, image: data.url }))
    // }

    // Mock implementation - replace with actual upload
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result.toString()
        setFormData((prev) => ({ ...prev, image: imageUrl }))
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.image
          return newErrors
        })
      }
    }
    reader.readAsDataURL(file)
  }

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {}
    const requiredFields: (keyof Pet)[] = ["name", "type", "breed", "size", "ownerId"]

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required"
      }
    })

    // Age validation
    if (formData.age !== undefined) {
      if (isNaN(Number(formData.age))) {
        errors.age = "Age must be a number"
      } else if (Number(formData.age) < 0 || Number(formData.age) > 30) {
        errors.age = "Age must be between 0 and 30"
      }
    } else {
      errors.age = "Age is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Failed to update pet:", error)
    }
  }

  // Reset form when dialog closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFormData({})
      setFormErrors({})
    }
    onOpenChange(open)
  }

  // Get owner name for display
  const getOwnerName = (ownerId: string) => {
    const owner = petOwners.find((o) => o.id === ownerId)
    return owner ? owner.name : "Unknown Owner"
  }

  if (!pet) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Pet</DialogTitle>
          <DialogDescription>Update the pet's information. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center mb-4">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src={formData.image || "/placeholder.svg?height=200&width=200"} alt="Pet Profile" />
              <AvatarFallback>
                {formData.type === "Dog" ? <Dog className="h-12 w-12" /> : <Cat className="h-12 w-12" />}
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
            {formErrors.image && <p className="text-xs text-red-500 mt-1">{formErrors.image}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium flex items-center">
              Pet Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <PawPrint className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="Enter pet name"
                value={formData.name || ""}
                onChange={handleInputChange}
                className={`pl-9 ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {formErrors.name && <p className="text-xs text-red-500">{formErrors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium flex items-center">
              Pet Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              {formData.type === "Dog" ? (
                <Dog className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              ) : (
                <Cat className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
              <Select value={formData.type || ""} onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger
                  id="type"
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
            {formErrors.type && <p className="text-xs text-red-500">{formErrors.type}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="breed" className="text-sm font-medium flex items-center">
              Breed <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Dna className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select value={formData.breed || ""} onValueChange={(value) => handleSelectChange("breed", value)}>
                <SelectTrigger
                  id="breed"
                  className={`pl-9 ${formErrors.breed ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select breed" />
                </SelectTrigger>
                <SelectContent>
                  {(formData.type === "Dog" ? DOG_BREEDS : CAT_BREEDS).map((breed) => (
                    <SelectItem key={breed} value={breed}>
                      {breed}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formErrors.breed && <p className="text-xs text-red-500">{formErrors.breed}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-sm font-medium flex items-center">
              Age (years) <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="age"
                name="age"
                type="number"
                min="0"
                max="30"
                placeholder="Enter age"
                value={formData.age === undefined ? "" : formData.age}
                onChange={handleInputChange}
                className={`pl-9 ${formErrors.age ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {formErrors.age && <p className="text-xs text-red-500">{formErrors.age}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="size" className="text-sm font-medium flex items-center">
              Size <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select value={formData.size || ""} onValueChange={(value) => handleSelectChange("size", value)}>
                <SelectTrigger
                  id="size"
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
            {formErrors.size && <p className="text-xs text-red-500">{formErrors.size}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerId" className="text-sm font-medium flex items-center">
              Owner <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select value={formData.ownerId || ""} onValueChange={(value) => handleSelectChange("ownerId", value)}>
                <SelectTrigger
                  id="ownerId"
                  className={`pl-9 ${formErrors.ownerId ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select owner">
                    {formData.ownerId ? getOwnerName(formData.ownerId) : "Select owner"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {petOwners.map((owner) => (
                    <SelectItem key={owner.id} value={owner.id}>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        {owner.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formErrors.ownerId && <p className="text-xs text-red-500">{formErrors.ownerId}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Enter any additional notes about this pet"
              value={formData.notes || ""}
              onChange={handleInputChange}
              className="min-h-[80px]"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
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
                Updating...
              </>
            ) : (
              <>
                <PawPrint className="mr-2 h-4 w-4" />
                Update Pet
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Component for confirming pet deletion
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
  title = "Delete Pet",
  description = "Are you sure you want to delete this pet? This action cannot be undone.",
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 p-4 bg-destructive/10 rounded-md">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-sm text-destructive">This will permanently delete the pet and all associated records.</p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

