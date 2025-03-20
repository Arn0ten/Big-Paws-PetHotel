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
"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Loader2,
  Dog,
  Cat,
  AlertCircle,
  PawPrint,
  User,
} from "lucide-react";
import type { Pet, PetOwner, FormErrors } from "../utils/types";
import { DOG_BREEDS, CAT_BREEDS } from "../utils/constants";

/**
 * Component for adding a new pet
 */
export interface AddPetDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (petData: Partial<Pet>, ownerId: string) => Promise<void>;
  isSubmitting: boolean;
  petOwners: PetOwner[];
}

export function AddPetDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
  petOwners,
}: AddPetDialogProps) {
  const [formState, setFormState] = useState<Partial<Pet>>({
    type: "Dog",
    size: "Medium",
  });
  const [ownerId, setOwnerId] = useState<string>("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const updateField = useCallback(
    (field: keyof Pet, value: any) => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
        // Reset breed if pet type changes
        ...(field === "type" && { breed: undefined }),
      }));

      // Clear error for this field if it exists
      if (formErrors[field]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [formErrors],
  );

  const validateForm = useCallback(() => {
    const errors: FormErrors = {};
    const requiredFields: (keyof Pet)[] = [
      "name",
      "type",
      "breed",
      "age",
      "size",
    ];

    requiredFields.forEach((field) => {
      if (!formState[field]) {
        errors[field] = true;
      }
    });

    if (!ownerId) {
      errors["ownerId"] = true;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formState, ownerId]);

  const handleSubmit = async () => {
    if (!validateForm()) return;
    await onSubmit({ ...formState, ownerId }, ownerId);
  };

  // Reset form when dialog closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFormState({ type: "Dog", size: "Medium" });
      setOwnerId("");
      setFormErrors({});
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <PlusCircle className="h-5 w-5" />
            Add New Pet
          </DialogTitle>
          <DialogDescription>
            Register a new pet in the system
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="pet-name"
              className="text-sm font-medium flex items-center"
            >
              Pet Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="pet-name"
              placeholder="Enter pet name"
              value={formState.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
              className={`focus-visible:ring-primary ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : "border-input"}`}
            />
            {formErrors.name && (
              <p className="text-xs text-red-500">Pet name is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pet-owner"
              className="text-sm font-medium flex items-center"
            >
              Pet Owner <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select value={ownerId} onValueChange={setOwnerId}>
              <SelectTrigger
                id="pet-owner"
                className={`${formErrors.ownerId ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-primary`}
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
            {formErrors.ownerId && (
              <p className="text-xs text-red-500">Pet owner is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pet-type"
              className="text-sm font-medium flex items-center"
            >
              Pet Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formState.type}
              onValueChange={(value) => updateField("type", value)}
            >
              <SelectTrigger
                id="pet-type"
                className={`${formErrors.type ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-primary`}
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
            {formErrors.type && (
              <p className="text-xs text-red-500">Pet type is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pet-breed"
              className="text-sm font-medium flex items-center"
            >
              Breed <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formState.breed}
              onValueChange={(value) => updateField("breed", value)}
            >
              <SelectTrigger
                id="pet-breed"
                className={`${formErrors.breed ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-primary`}
              >
                <SelectValue placeholder="Select breed" />
              </SelectTrigger>
              <SelectContent>
                {(formState.type === "Dog" ? DOG_BREEDS : CAT_BREEDS).map(
                  (breed) => (
                    <SelectItem key={breed} value={breed}>
                      {breed}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
            {formErrors.breed && (
              <p className="text-xs text-red-500">Breed is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pet-age"
              className="text-sm font-medium flex items-center"
            >
              Age (years) <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="pet-age"
              type="number"
              min="0"
              max="30"
              placeholder="Enter age"
              value={formState.age || ""}
              onChange={(e) =>
                updateField("age", Number.parseInt(e.target.value))
              }
              className={`focus-visible:ring-primary ${formErrors.age ? "border-red-500 focus-visible:ring-red-500" : "border-input"}`}
            />
            {formErrors.age && (
              <p className="text-xs text-red-500">Age is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pet-size"
              className="text-sm font-medium flex items-center"
            >
              Size <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formState.size}
              onValueChange={(value) => updateField("size", value)}
            >
              <SelectTrigger
                id="pet-size"
                className={`${formErrors.size ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-primary`}
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
            {formErrors.size && (
              <p className="text-xs text-red-500">Size is required</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="pet-notes" className="text-sm font-medium">
              Additional Notes{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="pet-notes"
              placeholder="Enter any additional information about the pet"
              value={formState.notes || ""}
              onChange={(e) => updateField("notes", e.target.value)}
              className="min-h-[80px] focus-visible:ring-primary"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-red-300 bg-red-50 hover:bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:hover:bg-red-800/50 dark:text-red-400"
          >
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
  );
}

/**
 * Component for editing a pet
 */
export interface EditPetDialogProps {
  pet: Pet | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (petData: Partial<Pet>) => Promise<void>;
  isSubmitting: boolean;
  petOwners: PetOwner[];
}

// Fix the EditPetDialog to properly initialize form state when pet changes
export function EditPetDialog({
  pet,
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
  petOwners,
}: EditPetDialogProps) {
  const [formState, setFormState] = useState<Partial<Pet>>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Initialize form state when pet changes or dialog opens
  useEffect(() => {
    if (pet && isOpen) {
      setFormState({
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        age: pet.age,
        size: pet.size,
        notes: pet.notes || "",
        ownerId: pet.ownerId,
      });
      setFormErrors({});
    }
  }, [pet, isOpen]);

  // Handle dialog open/close
  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };

  const updateField = useCallback(
    (field: keyof Pet, value: any) => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
        // Reset breed if pet type changes
        ...(field === "type" && { breed: undefined }),
      }));

      // Clear error for this field if it exists
      if (formErrors[field]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [formErrors],
  );

  const validateForm = useCallback(() => {
    const errors: FormErrors = {};
    const requiredFields: (keyof Pet)[] = [
      "name",
      "type",
      "breed",
      "age",
      "size",
      "ownerId",
    ];

    requiredFields.forEach((field) => {
      if (!formState[field]) {
        errors[field] = true;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formState]);

  const handleSubmit = async () => {
    if (!validateForm()) return;
    await onSubmit(formState);
  };

  if (!pet) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <PawPrint className="h-5 w-5" />
            Edit Pet
          </DialogTitle>
          <DialogDescription>
            Update information for {pet.name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="edit-pet-name"
              className="text-sm font-medium flex items-center"
            >
              Pet Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="edit-pet-name"
              placeholder="Enter pet name"
              value={formState.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
              className={`focus-visible:ring-primary ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : "border-input"}`}
            />
            {formErrors.name && (
              <p className="text-xs text-red-500">Pet name is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="edit-pet-owner"
              className="text-sm font-medium flex items-center"
            >
              Pet Owner <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formState.ownerId}
              onValueChange={(value) => updateField("ownerId", value)}
            >
              <SelectTrigger
                id="edit-pet-owner"
                className={`${formErrors.ownerId ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-primary`}
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
            {formErrors.ownerId && (
              <p className="text-xs text-red-500">Pet owner is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="edit-pet-type"
              className="text-sm font-medium flex items-center"
            >
              Pet Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formState.type}
              onValueChange={(value) => updateField("type", value)}
            >
              <SelectTrigger
                id="edit-pet-type"
                className={`${formErrors.type ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-primary`}
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
            {formErrors.type && (
              <p className="text-xs text-red-500">Pet type is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="edit-pet-breed"
              className="text-sm font-medium flex items-center"
            >
              Breed <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formState.breed}
              onValueChange={(value) => updateField("breed", value)}
            >
              <SelectTrigger
                id="edit-pet-breed"
                className={`${formErrors.breed ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-primary`}
              >
                <SelectValue placeholder="Select breed" />
              </SelectTrigger>
              <SelectContent>
                {(formState.type === "Dog" ? DOG_BREEDS : CAT_BREEDS).map(
                  (breed) => (
                    <SelectItem key={breed} value={breed}>
                      {breed}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
            {formErrors.breed && (
              <p className="text-xs text-red-500">Breed is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="edit-pet-age"
              className="text-sm font-medium flex items-center"
            >
              Age (years) <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="edit-pet-age"
              type="number"
              min="0"
              max="30"
              placeholder="Enter age"
              value={formState.age || ""}
              onChange={(e) =>
                updateField("age", Number.parseInt(e.target.value))
              }
              className={`focus-visible:ring-primary ${formErrors.age ? "border-red-500 focus-visible:ring-red-500" : "border-input"}`}
            />
            {formErrors.age && (
              <p className="text-xs text-red-500">Age is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="edit-pet-size"
              className="text-sm font-medium flex items-center"
            >
              Size <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formState.size}
              onValueChange={(value) => updateField("size", value)}
            >
              <SelectTrigger
                id="edit-pet-size"
                className={`${formErrors.size ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-primary`}
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
            {formErrors.size && (
              <p className="text-xs text-red-500">Size is required</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="edit-pet-notes" className="text-sm font-medium">
              Additional Notes{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="edit-pet-notes"
              placeholder="Enter any additional information about the pet"
              value={formState.notes || ""}
              onChange={(e) => updateField("notes", e.target.value)}
              className="min-h-[80px] focus-visible:ring-primary"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-red-300 bg-red-50 hover:bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:hover:bg-red-800/50 dark:text-red-400"
          >
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
                Updating Pet...
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
  );
}

/**
 * Component for confirming pet deletion
 */
export interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
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
          <p className="text-sm text-destructive">
            This will permanently delete the pet and all associated records.
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
