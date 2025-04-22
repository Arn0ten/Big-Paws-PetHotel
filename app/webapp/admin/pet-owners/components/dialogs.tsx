"use client";

import type React from "react";

// Consolidated dialog components
import { useState, useCallback, useRef } from "react";
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
import { motion } from "framer-motion";
import {
  PlusCircle,
  Loader2,
  Dog,
  Cat,
  Ruler,
  CheckCircle2,
  Edit,
  Hotel,
  Upload,
  PawPrint,
  Dna,
  CalendarDays,
  Trash2,
  FileText,
  User,
  X,
  CalendarIcon,
} from "lucide-react";
import type { Pet, PetOwner, FormErrors } from "../utils/types";
import { DOG_BREEDS, CAT_BREEDS } from "../utils/constants";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaShieldDog, FaShieldCat } from "react-icons/fa6";
/**
 * Component for displaying success message
 */
interface GlobalSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  type: "add-pet" | "boarding" | "edit-pet";
  actionLabel: string;
  onAction: () => void;
}

function GlobalSuccessDialog({
  open,
  onOpenChange,
  title,
  description,
  type,
  actionLabel,
  onAction,
}: GlobalSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              Close
            </Button>
            <Button onClick={onAction} className="w-full">
              {actionLabel}
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Component for displaying pet details
 */
export function PetDetailsDialog({
  pet,
  isOpen,
  onOpenChange,
  onEditPet,
  onBoardPet,
  onEndBoarding,
  onDeletePet,
}: {
  pet: Pet | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEditPet?: (pet: Pet) => void;
  onBoardPet?: (pet: Pet) => void;
  onEndBoarding?: (pet: Pet) => void;
  onDeletePet?: (pet: Pet) => void;
}) {
  const [activeTab, setActiveTab] = useState("details");

  if (!pet) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md md:max-w-lg p-0 overflow-hidden max-h-[90vh] rounded-xl">
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header with title and close button */}
          <div className="flex items-center justify-between p-4 border-b">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              {pet.type === "Dog" ? (
                <FaShieldDog className="h-5 w-5 text-blue-500" />
              ) : (
                <FaShieldCat className="h-5 w-5 text-purple-500" />
              )}
              Pet Profile
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => onEditPet?.(pet)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto">
            {/* Pet image */}
            <div className="p-4 border-b">
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                {pet.image ? (
                  <img
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    {pet.type === "Dog" ? (
                      <FaShieldDog className="h-16 w-16 mb-2" />
                    ) : (
                      <FaShieldCat className="h-16 w-16 mb-2" />
                    )}
                    <span>No image available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Status banner */}
            {pet.isBoarding && (
              <div className="bg-green-100 dark:bg-green-900/30 p-3 text-center text-green-800 dark:text-green-300 font-medium border-b">
                Currently Boarding
              </div>
            )}

            {/* Pet name and primary info */}
            <div className="p-4 flex justify-between items-start border-b">
              <div>
                <h2 className="text-3xl font-bold mb-2">{pet.name}</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {pet.type}
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    {pet.breed}
                  </Badge>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <User className="h-4 w-4 mr-1" />
                  <span>Owner: {pet.ownerName || "Unknown"}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
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
                    className="border-red-300 bg-red-50 hover:bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:hover:bg-red-800/50 dark:text-red-400"
                    onClick={() => onEndBoarding?.(pet)}
                  >
                    <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                    End Boarding
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  <FileText className="mr-1 h-3.5 w-3.5" />
                  Request (0)
                </Button>
              </div>
            </div>

            {/* Tabs for different sections */}
            <div className="border-b">
              <Tabs
                defaultValue="details"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 w-full rounded-none border-b">
                  <TabsTrigger value="details" className="rounded-none">
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="boarding-history"
                    className="rounded-none"
                  >
                    Boarding History
                  </TabsTrigger>
                  <TabsTrigger value="request-history" className="rounded-none">
                    Request History
                  </TabsTrigger>
                </TabsList>

                {/* Details Tab Content */}
                <TabsContent value="details" className="p-0 m-0">
                  <div className="p-4 border-b">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
                        <div className="text-sm text-muted-foreground mb-1">
                          Size
                        </div>
                        <div className="font-semibold flex items-center">
                          <Ruler className="h-4 w-4 mr-1 text-blue-500" />
                          {pet.size}
                        </div>
                      </div>
                      <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
                        <div className="text-sm text-muted-foreground mb-1">
                          Age
                        </div>
                        <div className="font-semibold flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1 text-amber-500" />
                          {pet.age} {pet.age === 1 ? "Year" : "Years"}
                        </div>
                      </div>
                      <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
                        <div className="text-sm text-muted-foreground mb-1">
                          Gender
                        </div>
                        <div className="font-semibold flex items-center">
                          <User className="h-4 w-4 mr-1 text-purple-500" />
                          Male
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Additional Notes:</h3>
                      <p className="text-muted-foreground text-sm">
                        {pet.notes ||
                          "No additional notes available for this pet."}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Boarding History Tab Content */}
                <TabsContent value="boarding-history" className="p-0 m-0">
                  <div className="p-4">
                    <div className="flex items-center justify-center h-32 border rounded-md bg-muted/30">
                      <div className="text-center">
                        <CalendarIcon className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">
                          No boarding history available
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Request History Tab Content */}
                <TabsContent value="request-history" className="p-0 m-0">
                  <div className="p-4">
                    <div className="flex items-center justify-center h-32 border rounded-md bg-muted/30">
                      <div className="text-center">
                        <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">
                          No request history available
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Delete Pet Button */}
            <div className="p-4">
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                size="lg"
                onClick={() => onDeletePet?.(pet)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Pet
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Component for adding a new pet
 */
export interface AddPetDialogProps {
  owner: PetOwner | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (petData: Partial<Pet>) => Promise<void>;
  isSubmitting: boolean;
}

export function AddPetDialog({
  owner,
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: AddPetDialogProps) {
  const [formState, setFormState] = useState<Partial<Pet>>({
    type: "Dog",
    size: "Medium",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setFormErrors((prev) => ({
        ...prev,
        image: true,
      }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({
        ...prev,
        image: true,
      }));
      return;
    }

    // Mock implementation - replace with actual upload
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result.toString();
        setFormState((prev) => ({ ...prev, image: imageUrl }));
        setFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.image;
          return newErrors;
        });
      }
    };
    reader.readAsDataURL(file);
  };

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

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formState]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // Set default image based on pet type if no image is provided
    if (!formState.image) {
      const defaultImage =
        formState.type === "Dog"
          ? "/default-images/dog.png"
          : "/default-images/cat.png";
      formState.image = defaultImage;
    }

    await onSubmit(formState);
  };

  // Reset form when dialog closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFormState({ type: "Dog", size: "Medium" });
      setFormErrors({});
    }
    onOpenChange(open);
  };

  // Get default image based on pet type
  const getDefaultImage = () => {
    return formState.type === "Dog"
      ? "/default-images/dog.png"
      : "/default-images/cat.png";
  };

  if (!owner) return null;

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
              <AvatarImage
                src={formState.image || getDefaultImage()}
                alt="Pet Profile"
              />
              <AvatarFallback>
                {formState.type === "Dog" ? (
                  <FaShieldDog className="h-12 w-12" />
                ) : (
                  <FaShieldCat className="h-12 w-12" />
                )}
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
            <p className="text-xs text-muted-foreground mt-1">
              Optional: Upload a profile picture
            </p>
            {formErrors.image && (
              <p className="text-xs text-red-500 mt-1">
                Please upload a valid image (max 5MB)
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pet-name"
              className="text-sm font-medium flex items-center"
            >
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
            {formErrors.name && (
              <p className="text-xs text-red-500">Pet name is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pet-type"
              className="text-sm font-medium flex items-center"
            >
              Pet Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              {formState.type === "Dog" ? (
                <FaShieldDog className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              ) : (
                <FaShieldCat className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
              <Select
                value={formState.type}
                onValueChange={(value) => updateField("type", value)}
              >
                <SelectTrigger
                  id="pet-type"
                  className={`pl-9 ${formErrors.type ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select pet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dog">
                    <div className="flex items-center">
                      <FaShieldDog className="mr-2 h-4 w-4 text-blue-500" />
                      Dog
                    </div>
                  </SelectItem>
                  <SelectItem value="Cat">
                    <div className="flex items-center">
                      <FaShieldCat className="mr-2 h-4 w-4 text-purple-500" />
                      Cat
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            <div className="relative">
              <Dna className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select
                value={formState.breed}
                onValueChange={(value) => updateField("breed", value)}
              >
                <SelectTrigger
                  id="pet-breed"
                  className={`pl-9 ${formErrors.breed ? "border-red-500 focus-visible:ring-red-500" : ""}`}
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
            </div>
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
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                className={`pl-9 ${formErrors.age ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
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
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select
                value={formState.size}
                onValueChange={(value) => updateField("size", value)}
              >
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
            {formErrors.size && (
              <p className="text-xs text-red-500">Size is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet-notes" className="text-sm font-medium">
              Additional Notes{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>
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
  );
}

/**
 * Component for confirming pet owner deletion
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
  title = "Delete Pet Owner",
  description = "Are you sure you want to delete this pet owner? This action cannot be undone.",
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Component for displaying success message
 */
export interface SuccessDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ownerName: string;
  onBoardPet: () => void;
}

export function SuccessDialog({
  isOpen,
  onOpenChange,
  ownerName,
  onBoardPet,
}: SuccessDialogProps) {
  return (
    <GlobalSuccessDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Pet Added Successfully!"
      description={`The pet has been added to ${ownerName}'s profile.`}
      type="add-pet"
      actionLabel="Let's Board This Pet"
      onAction={() => {
        onOpenChange(false);
        onBoardPet();
      }}
    />
  );
}
