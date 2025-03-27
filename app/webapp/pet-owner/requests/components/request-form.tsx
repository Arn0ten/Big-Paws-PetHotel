"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X, Upload, ImageIcon, FileImage } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Request Form Component
 *
 * This component provides a form for pet owners to create new requests.
 *
 * =====================================================================
 * BACKEND INTEGRATION GUIDE:
 * =====================================================================
 *
 * 1. API Endpoints Required:
 *    - GET /api/pets - To fetch the pet owner's pets
 *    - POST /api/pet-owner/requests - To submit a new request
 *
 * 2. Data Models:
 *    - Pet: See interface definition in the file
 *    - RequestFormData: See interface definition in the file
 *
 * 3. Integration Points:
 *    - Replace mockPets with actual API call to fetch pets
 *    - Implement actual form submission to create a request
 *    - Add proper file upload handling for photo/video requests
 *
 * 4. Form Validation:
 *    - Server-side validation should match client-side validation
 *    - Return appropriate error messages for validation failures
 */

// BACKEND INTEGRATION: Define the interface for the request form data
interface RequestFormData {
  petId: string;
  requestType: string;
  description: string;
  urgency: string;
  mediaFiles: File[];
}

// BACKEND INTEGRATION: Define the interface for the pet data
interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  imageUrl?: string;
}

/**
 * BACKEND INTEGRATION:
 *
 * Replace this mock data with an actual API call to fetch the pet owner's pets.
 *
 * API Endpoint: GET /api/pet-owner/pets
 *
 * Expected Response:
 * Array of Pet objects
 *
 * Implementation Example:
 * \`\`\`
 * const [isLoadingPets, setIsLoadingPets] = useState(true);
 *
 * useEffect(() => {
 *   const fetchPets = async () => {
 *     try {
 *       setIsLoadingPets(true);
 *       const response = await fetch('/api/pet-owner/pets', {
 *         headers: {
 *           'Authorization': `Bearer ${getAuthToken()}`
 *         }
 *       });
 *
 *       if (!response.ok) {
 *         throw new Error('Failed to fetch pets');
 *       }
 *
 *       const petsData = await response.json();
 *       // Use the fetched pets data
 *       setPets(petsData);
 *     } catch (error) {
 *       console.error('Error fetching pets:', error);
 *       toast({
 *         title: "Error",
 *         description: "Failed to load your pets. Please try again.",
 *         variant: "destructive",
 *       });
 *     } finally {
 *       setIsLoadingPets(false);
 *     }
 *   };
 *
 *   fetchPets();
 * }, []);
 * \`\`\`
 */
// BACKEND INTEGRATION: Replace with actual API call to fetch pets
const mockPets: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    imageUrl: "/images/default-dog.jpg",
  },
  {
    id: "2",
    name: "Whiskers",
    type: "Cat",
    breed: "Siamese",
    imageUrl: "/images/default-cat.jpg",
  },
  {
    id: "3",
    name: "Max",
    type: "Dog",
    breed: "German Shepherd",
    imageUrl: "/images/default-dog.jpg",
  },
];

export default function RequestForm() {
  const [selectedPet, setSelectedPet] = useState("");
  const [requestType, setRequestType] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  // BACKEND INTEGRATION: Replace with actual API call to fetch pets
  const pets = mockPets;

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      // Validate file types (only images for photo requests, videos for video requests)
      const validFiles = newFiles.filter((file) => {
        if (requestType === "photo" && !file.type.startsWith("image/")) {
          toast({
            title: "Invalid file type",
            description: "Please select only image files for photo requests.",
            variant: "destructive",
          });
          return false;
        }
        if (requestType === "video" && !file.type.startsWith("video/")) {
          toast({
            title: "Invalid file type",
            description: "Please select only video files for video requests.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      });

      // Update selected files
      setSelectedFiles((prev) => [...prev, ...validFiles]);

      // Create preview URLs
      const newPreviewUrls = validFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  // Remove a file from the selection
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!selectedPet) {
      toast({
        title: "Missing pet",
        description: "Please select a pet for this request.",
        variant: "destructive",
      });
      return;
    }

    if (!requestType) {
      toast({
        title: "Missing request type",
        description: "Please select a request type.",
        variant: "destructive",
      });
      return;
    }

    if (!description) {
      toast({
        title: "Missing description",
        description: "Please provide a description for your request.",
        variant: "destructive",
      });
      return;
    }

    // For photo/video requests, require at least one file
    if (
      (requestType === "photo" || requestType === "video") &&
      selectedFiles.length === 0
    ) {
      toast({
        title: "No files selected",
        description: `Please select at least one ${requestType === "photo" ? "image" : "video"} file.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      /**
       * BACKEND INTEGRATION:
       *
       * Replace this with an actual API call to submit the request.
       *
       * API Endpoint: POST /api/pet-owner/requests
       * Request Type: multipart/form-data (for file uploads)
       *
       * Implementation Example:
       * \`\`\`
       * const formData = new FormData();
       * formData.append("petId", selectedPet);
       * formData.append("requestType", requestType);
       * formData.append("description", description);
       * formData.append("urgency", urgency);
       *
       * // Add files
       * selectedFiles.forEach(file => {
       *   formData.append("mediaFiles", file);
       * });
       *
       * const response = await fetch("/api/pet-owner/requests", {
       *   method: "POST",
       *   headers: {
       *     'Authorization': `Bearer ${getAuthToken()}`
       *   },
       *   body: formData,
       * });
       *
       * if (!response.ok) {
       *   const errorData = await response.json();
       *   throw new Error(errorData.message || "Failed to submit request");
       * }
       *
       * const result = await response.json();
       * \`\`\`
       *
       * Error Handling:
       * - Handle network errors
       * - Handle validation errors from the server
       * - Handle server errors
       * - Handle file size/type validation errors
       */

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success toast
      toast({
        title: "Request submitted",
        description: "Your request has been submitted successfully.",
      });

      // Redirect to requests page
      router.push("/webapp/pet-owner/requests");
    } catch (error) {
      console.error("Error submitting request:", error);

      // BACKEND INTEGRATION: Improve error handling based on API response
      // Example:
      // if (error.response && error.response.status === 413) {
      //   toast({
      //     title: "Error",
      //     description: "Files are too large. Please select smaller files.",
      //     variant: "destructive",
      //   });
      // } else if (error.response && error.response.status === 401) {
      //   toast({
      //     title: "Session expired",
      //     description: "Your session has expired. Please log in again.",
      //     variant: "destructive",
      //   });
      //   // Redirect to login page
      // } else {
      //   toast({
      //     title: "Error",
      //     description: "Failed to submit request. Please try again.",
      //     variant: "destructive",
      //   });
      // }

      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Request</CardTitle>
        <CardDescription>Submit a new request for your pet</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pet">Select Pet</Label>
            <Select value={selectedPet} onValueChange={setSelectedPet}>
              <SelectTrigger>
                <SelectValue placeholder="Select a pet" />
              </SelectTrigger>
              <SelectContent>
                {pets.map((pet) => (
                  <SelectItem key={pet.id} value={pet.id}>
                    {pet.name} ({pet.breed})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requestType">Request Type</Label>
            <Select value={requestType} onValueChange={setRequestType}>
              <SelectTrigger>
                <SelectValue placeholder="Select request type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="photo">Photo Request</SelectItem>
                <SelectItem value="video">Video Request</SelectItem>
                <SelectItem value="grooming">Grooming Request</SelectItem>
                <SelectItem value="checkup">Health Check-up</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide details about your request"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Urgency</Label>
            <RadioGroup
              value={urgency}
              onValueChange={setUrgency}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="normal" />
                <Label htmlFor="normal">Normal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high">High</Label>
              </div>
            </RadioGroup>
          </div>

          {/* File upload section - only show for photo/video requests */}
          {(requestType === "photo" || requestType === "video") && (
            <div className="space-y-2">
              <Label>
                {requestType === "photo" ? "Upload Photos" : "Upload Video"}
                {requestType === "photo" && (
                  <span className="text-xs text-muted-foreground ml-1">
                    (Multiple photos allowed)
                  </span>
                )}
              </Label>

              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  {requestType === "photo" ? (
                    <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  ) : (
                    <FileImage className="h-8 w-8 text-muted-foreground mb-2" />
                  )}
                  <p className="text-sm text-muted-foreground mb-1">
                    {requestType === "photo"
                      ? "Drag and drop photos, or click to browse"
                      : "Drag and drop video, or click to browse"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {requestType === "photo"
                      ? "JPG, PNG, GIF up to 10MB each"
                      : "MP4, MOV up to 100MB"}
                  </p>
                </div>

                <Input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                  accept={requestType === "photo" ? "image/*" : "video/*"}
                  multiple={requestType === "photo"} // Allow multiple files for photos
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Select {requestType === "photo" ? "Photos" : "Video"}
                  </Button>
                </Label>
              </div>

              {/* Preview selected files */}
              {selectedFiles.length > 0 && (
                <div className="mt-4">
                  <Label className="mb-2 block">
                    Selected Files ({selectedFiles.length})
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        {selectedFiles[index].type.startsWith("image/") ? (
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="h-24 w-full object-cover rounded-md"
                          />
                        ) : (
                          <div className="h-24 w-full bg-muted rounded-md flex items-center justify-center">
                            <FileImage className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove file"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                        <p className="text-xs truncate mt-1">
                          {selectedFiles[index].name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/webapp/pet-owner/requests")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Request
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
