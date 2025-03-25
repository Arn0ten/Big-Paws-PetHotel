"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import {
  PawPrint,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Upload,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { PetOwner } from "../utils/types";
import { DEFAULT_IMAGES } from "@/app/webapp/constants/image-constants";

export interface EditPetOwnerDialogProps {
  owner: PetOwner | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (ownerData: Partial<PetOwner>) => Promise<void>;
  isSubmitting: boolean;
}

export function EditPetOwnerDialog({
  owner,
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: EditPetOwnerDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<PetOwner>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Initialize form data when owner changes or dialog opens
  useEffect(() => {
    if (owner && isOpen) {
      setFormData({
        id: owner.id,
        name: owner.name,
        email: owner.email,
        phone: owner.phone,
        address: owner.address,
        avatar: owner.avatar,
        notes: owner.notes || "",
      });
      setFormErrors({});
    }
  }, [owner, isOpen]);

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // BACKEND INTEGRATION POINT:
    // This should upload the file to your server/storage
    // Example implementation:
    // const formData = new FormData()
    // formData.append('avatar', file)
    // const response = await fetch('/api/admin/upload-avatar', {
    //   method: 'POST',
    //   body: formData
    // })
    // const data = await response.json()
    // if (response.ok) {
    //   setFormData(prev => ({ ...prev, avatar: data.url }))
    // }

    // Mock implementation - replace with actual upload
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const avatarUrl = event.target.result.toString();
        setFormData((prev) => ({ ...prev, avatar: avatarUrl }));

        toast({
          title: "Avatar uploaded",
          description: "Profile picture has been updated.",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    const requiredFields: (keyof PetOwner)[] = ["name", "email", "phone"];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required";
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Failed to update pet owner:", error);
      toast({
        title: "Error",
        description: "Failed to update pet owner. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Reset form when dialog closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFormData({});
      setFormErrors({});
    }
    onOpenChange(open);
  };

  if (!owner) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <PawPrint className="h-5 w-5" />
            Edit Pet Owner
          </DialogTitle>
          <DialogDescription>
            Update information for {owner.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center mb-4">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage
                src={formData.avatar || DEFAULT_IMAGES.USER_AVATAR}
                alt="Profile"
              />
              <AvatarFallback>
                {formData.name ? formData.name.charAt(0) : "U"}
              </AvatarFallback>
            </Avatar>

            <Label htmlFor="avatar-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
                <Upload className="h-3 w-3" />
                <span>Upload Photo</span>
              </div>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              Optional: Upload a profile picture
            </p>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium flex items-center"
            >
              Full Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="Enter full name"
                value={formData.name || ""}
                onChange={handleInputChange}
                className={`pl-9 ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {formErrors.name && (
              <p className="text-xs text-red-500">{formErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium flex items-center"
            >
              Email <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email || ""}
                onChange={handleInputChange}
                className={`pl-9 ${formErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {formErrors.email && (
              <p className="text-xs text-red-500">{formErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium flex items-center"
            >
              Phone <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone || ""}
                onChange={handleInputChange}
                className={`pl-9 ${formErrors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {formErrors.phone && (
              <p className="text-xs text-red-500">{formErrors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Address{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                name="address"
                placeholder="Enter address"
                value={formData.address || ""}
                onChange={handleInputChange}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Enter any additional notes"
              value={formData.notes || ""}
              onChange={handleInputChange}
              className="min-h-[80px]"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
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
                Updating...
              </>
            ) : (
              <>
                <PawPrint className="mr-2 h-4 w-4" />
                Update Pet Owner
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
