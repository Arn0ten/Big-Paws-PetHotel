/**
 * Add Pet View
 *
 * This view is used for adding a new pet to the system.
 *
 * BACKEND INTEGRATION POINTS:
 * 1. Form submission - Connect to your pet creation API endpoint
 * 2. Image upload - Replace the mock implementation with actual file upload
 * 3. Validation - Update validation rules as needed for your data requirements
 *
 * NAVIGATION:
 * - On successful submission: Navigates back to the pet list view
 * - On cancel: Returns to the previous view
 */
"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User, Loader2, PlusCircle } from "lucide-react";
import type { Pet, PetOwner } from "../utils/types";
import PageLayout from "@/app/webapp/components/PageLayout";
import { useToast } from "@/components/ui/use-toast";
import { FaShieldCat, FaShieldDog } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
// Define the FormErrors type
interface FormErrors {
  name?: boolean;
  type?: boolean;
  breed?: boolean;
  age?: boolean;
  size?: boolean;
  ownerId?: boolean;
  image?: boolean;
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
];

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
];

// Update the props interface to include preSelectedOwnerId
interface AddPetViewProps {
  petOwners: PetOwner[];
  preSelectedOwnerId?: string | null;
  onBack: () => void;
  onCancel: () => void;
  onSubmit: (petData: Partial<Pet>, ownerId: string) => Promise<boolean>;
  isSubmitting: boolean;
}

// Update the component to use preSelectedOwnerId
export default function AddPetView({
  petOwners,
  preSelectedOwnerId,
  onBack,
  onCancel,
  onSubmit,
  isSubmitting,
}: AddPetViewProps) {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    type: "Dog",
    breed: "",
    age: "",
    size: "Medium",
    notes: "",
    ownerId: preSelectedOwnerId || "",
    image: null,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set the owner ID from preSelectedOwnerId when it changes
  useEffect(() => {
    if (preSelectedOwnerId) {
      setFormState((prev) => ({
        ...prev,
        ownerId: preSelectedOwnerId,
      }));
    }
  }, [preSelectedOwnerId]);

  // Get the selected owner's name for display
  const selectedOwner = petOwners.find(
    (owner) => owner.id === formState.ownerId,
  );

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  // Handle select change
  const handleSelectChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));

    // Reset breed if pet type changes
    if (field === "type") {
      setFormState((prev) => ({ ...prev, breed: undefined }));
    }

    // Clear error for this field if it exists
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof FormErrors];
        return newErrors;
      });
    }
  };

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

    // BACKEND INTEGRATION POINT: Replace with actual file upload
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

  const validateForm = () => {
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

    if (!formState.ownerId) {
      errors["ownerId"] = true;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // Set default image based on pet type if no image is provided
    if (!formState.image) {
      const defaultImage =
        formState.type === "Dog"
          ? "/default-images/dog.png"
          : "/default-images/cat.png";
      setFormState((prev) => ({ ...prev, image: defaultImage }));
    }

    try {
      const success = await onSubmit(formState, formState.ownerId);
      if (success) {
        toast({
          title: "Pet added successfully!",
          description: "The new pet has been added to the system.",
        });
      } else {
        toast({
          title: "Error adding pet",
          description: "Something went wrong while adding the pet.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error adding pet",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  // Get default image based on pet type
  const getDefaultImage = () => {
    return formState.type === "Dog"
      ? "/default-images/dog.png"
      : "/default-images/cat.png";
  };

  const updateField = (field: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (formErrors[field as keyof FormErrors]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof FormErrors];
        return newErrors;
      });
    }
  };

  return (
    <PageLayout title="Add New Pet" onBack={onBack}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 flex flex-col items-center mb-4">
          <div className="aspect-square w-full max-w-[180px] mx-auto rounded-lg overflow-hidden bg-muted flex items-center justify-center mb-2">
            {formState.image ? (
              <img
                src={formState.image || getDefaultImage()}
                alt="Pet Profile"
                className="w-full h-full object-cover"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground w-full h-full">
                {formState.type === "Dog" ? (
                  <FaShieldDog className="h-14 w-14 mb-2" />
                ) : (
                  <FaShieldCat className="h-14 w-14 mb-2" />
                )}
                <span>No image available</span>
              </div>
            )}
          </div>

          <Label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
              <FaUpload className="h-3 w-3" />
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

        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium flex items-center"
            >
              Pet Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter pet name"
              value={formState.name || ""}
              onChange={handleInputChange}
              className={
                formErrors.name
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
            {formErrors.name && (
              <p className="text-xs text-red-500">Pet name is required</p>
            )}
          </div>

          {/* Replace the owner selection dropdown with a read-only display if preSelectedOwnerId is provided */}
          {preSelectedOwnerId ? (
            <div className="space-y-2">
              <Label
                htmlFor="pet-owner"
                className="text-sm font-medium flex items-center"
              >
                Pet Owner <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="flex items-center p-2 border rounded-md bg-muted">
                <FaUserCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{selectedOwner?.name || "Selected Owner"}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label
                htmlFor="pet-owner"
                className="text-sm font-medium flex items-center"
              >
                Pet Owner <span className="text-red-500 ml-1">*</span>
              </Label>
              <Select
                value={formState.ownerId}
                onValueChange={(value) => updateField("ownerId", value)}
              >
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
                        <FaUserCheck className="mr-2 h-4 w-4 text-muted-foreground" />
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
          )}

          <div className="space-y-2">
            <Label
              htmlFor="type"
              className="text-sm font-medium flex items-center"
            >
              Pet Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formState.type || "Dog"}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger
                id="type"
                className={
                  formErrors.type
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
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
            {formErrors.type && (
              <p className="text-xs text-red-500">Pet type is required</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="breed"
              className="text-sm font-medium flex items-center"
            >
              Breed <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formState.breed || ""}
              onValueChange={(value) => handleSelectChange("breed", value)}
            >
              <SelectTrigger
                id="breed"
                className={
                  formErrors.breed
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
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
              htmlFor="age"
              className="text-sm font-medium flex items-center"
            >
              Age (years) <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="age"
              name="age"
              type="number"
              min="0"
              max="30"
              placeholder="Enter age"
              value={formState.age || ""}
              onChange={handleInputChange}
              className={
                formErrors.age
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
            {formErrors.age && (
              <p className="text-xs text-red-500">Age is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="size"
              className="text-sm font-medium flex items-center"
            >
              Size <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formState.size || "Medium"}
              onValueChange={(value) => handleSelectChange("size", value)}
            >
              <SelectTrigger
                id="size"
                className={
                  formErrors.size
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
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
            {formErrors.size && (
              <p className="text-xs text-red-500">Size is required</p>
            )}
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="notes" className="text-sm font-medium">
            Notes{" "}
            <span className="text-xs text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Enter any additional notes about this pet"
            value={formState.notes || ""}
            onChange={handleInputChange}
            className="min-h-[80px]"
          />
        </div>

        <div className="md:col-span-2 pt-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>Add Pet</>
            )}
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
