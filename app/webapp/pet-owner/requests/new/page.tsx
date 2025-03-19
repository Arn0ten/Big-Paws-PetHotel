"use client";

import { Badge } from "@/components/ui/badge";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import {
  ArrowLeft,
  Camera,
  Video,
  Scissors,
  Clock,
  HelpCircle,
  Info,
  AlertCircle,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getBoardingPets, createRequest } from "@/app/webapp/data/sample-data";
import { REQUEST_TYPES, REQUEST_TYPE_LABELS } from "@/app/webapp/constants";

/**
 * Enhanced Request Creation Page
 *
 * This component provides a user-friendly interface for pet owners to create
 * various types of service requests for their pets.
 *
 * BACKEND INTEGRATION POINTS:
 * 1. Replace getBoardingPets() with actual API call to fetch boarding pets
 *    - Endpoint: GET /api/pets?boarding=true
 *    - This should return all pets that are currently boarding
 *    - Response format should match the sample data structure in sample-data.js
 *
 * 2. Replace createRequest() with actual API call to create a new request
 *    - Endpoint: POST /api/requests
 *    - Payload structure is defined in the handleSubmit function
 *    - The backend should validate the request data and return the created request
 *    - On success, the backend should trigger notifications to admins about the new request
 *
 * 3. Add proper error handling for API calls
 *    - Display user-friendly error messages
 *    - Implement retry logic for failed API calls
 *    - Log errors for debugging purposes
 *
 * 4. Implement real-time validation of form fields
 *    - Validate pet selection, request type, and required fields
 *    - Show validation errors inline
 *
 * 5. Add analytics tracking for request creation
 *    - Track which request types are most popular
 *    - Monitor completion rates for the form
 */
export default function EnhancedRequestCreationPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState<string | null>(
    null,
  );
  const [selectedPet, setSelectedPet] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Additional state for specific request types
  const [groomingService, setGroomingService] = useState("");
  const [extensionDuration, setExtensionDuration] = useState("");
  const [extensionUnit, setExtensionUnit] = useState("days");
  const [photoCount, setPhotoCount] = useState("3"); // Photos limited to 5 for admins
  const [photoType, setPhotoType] = useState("general");
  const [customRequestCategory, setCustomRequestCategory] = useState("other");

  // Boarding pets state
  const [boardingPets, setBoardingPets] = useState<any[]>([]);
  const [selectedPetDetails, setSelectedPetDetails] = useState<any>(null);

  // Form validation state
  const [formErrors, setFormErrors] = useState({
    requestType: false,
    pet: false,
    description: false,
    groomingService: false,
    extensionDuration: false,
  });

  // Fetch boarding pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setIsLoading(true);

        // BACKEND INTEGRATION:
        // Replace this with an actual API call to fetch boarding pets
        // Example:
        // const response = await fetch('/api/pets?boarding=true');
        // if (!response.ok) throw new Error('Failed to fetch pets');
        // const petsData = await response.json();

        // For demo, we'll use the sample data
        const petsData = getBoardingPets();
        setBoardingPets(petsData);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setErrorMessage("Failed to load your pets. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Update selected pet details when pet changes
  useEffect(() => {
    if (selectedPet) {
      const petDetails = boardingPets.find((pet) => pet.id === selectedPet);
      setSelectedPetDetails(petDetails);
    } else {
      setSelectedPetDetails(null);
    }
  }, [selectedPet, boardingPets]);

  // Request type options with icons and descriptions
  const requestTypes = [
    {
      id: REQUEST_TYPES.PHOTO,
      name: REQUEST_TYPE_LABELS[REQUEST_TYPES.PHOTO],
      icon: Camera,
      description: "Request photos of your pet during their stay",
      color: "blue",
    },
    {
      id: REQUEST_TYPES.VIDEO,
      name: REQUEST_TYPE_LABELS[REQUEST_TYPES.VIDEO],
      icon: Video,
      description: "Request a short video of your pet's activities",
      color: "purple",
    },
    {
      id: REQUEST_TYPES.GROOMING,
      name: REQUEST_TYPE_LABELS[REQUEST_TYPES.GROOMING],
      icon: Scissors,
      description: "Schedule a grooming service for your pet",
      color: "green",
    },
    {
      id: REQUEST_TYPES.BOARDING_EXTENSION,
      name: REQUEST_TYPE_LABELS[REQUEST_TYPES.BOARDING_EXTENSION],
      icon: Clock,
      description: "Request to extend your pet's current stay",
      color: "amber",
    },
    {
      id: REQUEST_TYPES.CUSTOM,
      name: REQUEST_TYPE_LABELS[REQUEST_TYPES.CUSTOM],
      icon: HelpCircle,
      description: "Make a special request not covered by other options",
      color: "gray",
    },
  ];

  // Photo type options
  const photoTypeOptions = [
    {
      value: "general",
      label: "General Photos",
      description: "Regular photos of your pet",
    },
    {
      value: "playing",
      label: "Playing",
      description: "Photos of your pet playing",
    },
    {
      value: "sleeping",
      label: "Sleeping/Resting",
      description: "Photos of your pet resting",
    },
    {
      value: "eating",
      label: "Eating/Drinking",
      description: "Photos of your pet during meal time",
    },
    {
      value: "groomed",
      label: "After Grooming",
      description: "Photos after grooming session",
    },
  ];

  // Custom request categories
  const customRequestCategories = [
    {
      value: "feeding",
      label: "Special Feeding",
      description: "Special feeding instructions",
    },
    {
      value: "medication",
      label: "Medication",
      description: "Medication administration",
    },
    {
      value: "exercise",
      label: "Exercise",
      description: "Special exercise requests",
    },
    { value: "other", label: "Other", description: "Other special requests" },
  ];

  // Validate form based on current step
  const validateCurrentStep = () => {
    let isValid = true;
    const newErrors = { ...formErrors };

    if (activeStep === 1) {
      if (!selectedRequestType) {
        newErrors.requestType = true;
        isValid = false;
      } else {
        newErrors.requestType = false;
      }
    } else if (activeStep === 2) {
      if (!selectedPet) {
        newErrors.pet = true;
        isValid = false;
      } else {
        newErrors.pet = false;
      }
    } else if (activeStep === 3) {
      if (!description.trim()) {
        newErrors.description = true;
        isValid = false;
      } else {
        newErrors.description = false;
      }

      // Validate type-specific fields
      if (selectedRequestType === REQUEST_TYPES.GROOMING && !groomingService) {
        newErrors.groomingService = true;
        isValid = false;
      }

      if (
        selectedRequestType === REQUEST_TYPES.BOARDING_EXTENSION &&
        !extensionDuration
      ) {
        newErrors.extensionDuration = true;
        isValid = false;
      }
    }

    setFormErrors(newErrors);
    return isValid;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  /**
   * Handle form submission
   *
   * BACKEND INTEGRATION:
   * Replace this with an actual API call to create a new request
   *
   * API Endpoint: POST /api/requests
   * Request Body: {
   *   type: string,           // The request type (photo, video, grooming, boarding-extension, custom)
   *   petId: string,          // The ID of the pet
   *   petName: string,        // The name of the pet
   *   title: string,          // The request title
   *   description: string,    // The request description
   *   isUrgent: boolean,      // Whether the request is urgent
   *
   *   // Type-specific fields
   *   groomingService?: string,       // For grooming requests
   *   extensionDetails?: {            // For boarding extension requests
   *     duration: string,
   *     unit: "hours" | "days"
   *   },
   *   photoCount?: number,            // For photo requests
   *   photoType?: string,             // For photo requests
   *   customRequestCategory?: string, // For custom requests
   * }
   *
   * Response: {
   *   id: string,             // The ID of the created request
   *   status: string,         // The status of the request (should be "pending" or "new")
   *   createdAt: string,      // The creation timestamp
   *   ...other request fields
   * }
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    // Get pet name for the request
    const pet = boardingPets.find((p) => p.id === selectedPet);
    const petName = pet ? pet.name : "Unknown Pet";

    // Generate a title if not provided
    const generatedTitle =
      title ||
      `${petName} - ${requestTypes.find((type) => type.id === selectedRequestType)?.name}`;

    // Prepare request data based on type
    const requestData: any = {
      type: selectedRequestType,
      petId: selectedPet,
      petName: petName,
      title: generatedTitle,
      description,
      isUrgent,
      createdAt: new Date().toISOString(),
      status: "pending", // or "new" depending on your backend
    };

    // Add type-specific data
    if (selectedRequestType === REQUEST_TYPES.GROOMING && groomingService) {
      requestData.groomingService = groomingService;
    } else if (
      selectedRequestType === REQUEST_TYPES.BOARDING_EXTENSION &&
      extensionDuration
    ) {
      requestData.extensionDetails = {
        duration: extensionDuration,
        unit: extensionUnit,
      };

      // Add current end date from pet boarding data
      if (pet?.boarding) {
        requestData.currentEndDate = pet.boarding.endDate;
      }
    } else if (selectedRequestType === REQUEST_TYPES.PHOTO) {
      requestData.photoCount = Number.parseInt(photoCount);
      requestData.photoType = photoType;
    } else if (selectedRequestType === REQUEST_TYPES.VIDEO) {
      // No video duration or type needed
    } else if (selectedRequestType === REQUEST_TYPES.CUSTOM) {
      requestData.customRequestCategory = customRequestCategory;
    }

    try {
      // BACKEND INTEGRATION:
      // Replace this with an actual API call to create a request
      // Example:
      // const response = await fetch('/api/requests', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(requestData),
      // });
      //
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to create request');
      // }
      //
      // const createdRequest = await response.json();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo, we'll use the local helper function
      createRequest(requestData);

      // Show success message
      setShowSuccess(true);

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/webapp/pet-owner/requests");
      }, 2000);
    } catch (error) {
      console.error("Error creating request:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to create your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the step indicator
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  activeStep === step
                    ? "bg-primary text-primary-foreground"
                    : activeStep > step
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
            >
              {step}
            </div>
            <span className="text-xs mt-1 text-muted-foreground">
              {step === 1 ? "Type" : step === 2 ? "Pet" : "Details"}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Render step 3: Request Details
  const renderStep3 = () => {
    return (
      <div className="space-y-6">
        {/* Title (optional) */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base font-medium">
            Request Title
          </Label>
          <Input
            id="title"
            placeholder="Enter a title for your request (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-base"
          />
          <p className="text-xs text-muted-foreground">
            A descriptive title will be generated if you don't provide one
          </p>
        </div>

        {/* Type-specific fields */}
        {selectedRequestType === REQUEST_TYPES.PHOTO && (
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <Info className="inline-block w-4 h-4 mr-1" />
                Photo type and quantity will be determined by the admin during
                processing. Admins can select 1-5 photos per request based on
                availability and quality.
              </p>
            </div>
          </div>
        )}

        {selectedRequestType === REQUEST_TYPES.VIDEO && (
          <div className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-800 dark:text-blue-300">
                Video Request Information
              </AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                Videos will be up to 1 minute in length. Our staff will capture
                the best moments of your pet during their stay.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {selectedRequestType === REQUEST_TYPES.GROOMING && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="groomingService"
                className="text-base font-medium"
              >
                Grooming Service <span className="text-destructive">*</span>
              </Label>
              {formErrors.groomingService && (
                <span className="text-sm text-destructive flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Please select a grooming service
                </span>
              )}
            </div>
            <Select
              value={groomingService}
              onValueChange={(value) => {
                setGroomingService(value);
                setFormErrors({ ...formErrors, groomingService: false });
              }}
            >
              <SelectTrigger id="groomingService" className="text-base">
                <SelectValue placeholder="Select grooming service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic-wash">
                  Basic Wash (₱180-₱320)
                </SelectItem>
                <SelectItem value="premium-wash">
                  Premium Wash (₱300-₱850)
                </SelectItem>
                <SelectItem value="premium-wash-and-cut">
                  Premium Wash & Cut (₱450-₱850)
                </SelectItem>
                <SelectItem value="full-grooming">
                  Full Grooming (₱500-₱800)
                </SelectItem>
                <SelectItem value="nail-trim">
                  Nail Trim Only (₱150-₱200)
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Prices vary based on pet size. See our{" "}
              <Link
                href="/webapp/pet-owner/pricing"
                className="text-primary hover:underline"
              >
                pricing page
              </Link>{" "}
              for details.
            </p>
          </div>
        )}

        {selectedRequestType === REQUEST_TYPES.BOARDING_EXTENSION && (
          <div className="space-y-4">
            <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
              <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertTitle className="text-amber-800 dark:text-amber-300">
                Boarding Extension
              </AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-400">
                {selectedPetDetails && selectedPetDetails.boarding ? (
                  <>
                    Current checkout date:{" "}
                    <strong>
                      {new Date(
                        selectedPetDetails.boarding.endDate,
                      ).toLocaleDateString()}
                    </strong>
                  </>
                ) : (
                  "Please specify how long you'd like to extend your pet's stay."
                )}
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="extensionDuration"
                    className="text-base font-medium"
                  >
                    Extension Duration{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  {formErrors.extensionDuration && (
                    <span className="text-sm text-destructive flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Please enter a duration
                    </span>
                  )}
                </div>
                <Input
                  id="extensionDuration"
                  type="number"
                  min="1"
                  placeholder="Duration"
                  className="text-base"
                  value={extensionDuration}
                  onChange={(e) => {
                    setExtensionDuration(e.target.value);
                    setFormErrors({ ...formErrors, extensionDuration: false });
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="extensionUnit"
                  className="text-base font-medium"
                >
                  Unit <span className="text-destructive">*</span>
                </Label>
                <Select value={extensionUnit} onValueChange={setExtensionUnit}>
                  <SelectTrigger id="extensionUnit" className="text-base">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md dark:bg-blue-900/20 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <span className="font-medium">Pricing:</span> Hourly extensions
                cost ₱50-75/hour and daily extensions cost ₱500-750/day
                depending on pet size.
              </p>
            </div>
          </div>
        )}

        {selectedRequestType === REQUEST_TYPES.CUSTOM && (
          <div className="space-y-2">
            <Label
              htmlFor="customRequestCategory"
              className="text-base font-medium"
            >
              Request Category
            </Label>
            <Select
              value={customRequestCategory}
              onValueChange={setCustomRequestCategory}
            >
              <SelectTrigger id="customRequestCategory" className="text-base">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {customRequestCategories.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Select a category that best describes your request
            </p>
          </div>
        )}

        {/* Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description" className="text-base font-medium">
              Description <span className="text-destructive">*</span>
            </Label>
            {formErrors.description && (
              <span className="text-sm text-destructive flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Please provide a description
              </span>
            )}
          </div>
          <Textarea
            id="description"
            placeholder="Please provide details about your request..."
            className="min-h-[120px] text-base resize-none"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setFormErrors({ ...formErrors, description: false });
            }}
          />
          <p className="text-xs text-muted-foreground">
            {selectedRequestType === REQUEST_TYPES.PHOTO &&
              "Describe what kind of photos you'd like of your pet."}
            {selectedRequestType === REQUEST_TYPES.VIDEO &&
              "Describe what kind of video you'd like of your pet."}
            {selectedRequestType === REQUEST_TYPES.GROOMING &&
              "Provide any specific instructions or preferences for the grooming service."}
            {selectedRequestType === REQUEST_TYPES.BOARDING_EXTENSION &&
              "Please explain why you need to extend your pet's stay."}
            {selectedRequestType === REQUEST_TYPES.CUSTOM &&
              "Describe your request in detail."}
            {!selectedRequestType && "Provide details about your request."}
          </p>
        </div>

        {/* Urgency */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="urgent"
            checked={isUrgent}
            onCheckedChange={(checked) => setIsUrgent(checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="urgent" className="text-base font-normal">
              Mark as urgent
            </Label>
            <p className="text-sm text-muted-foreground">
              Urgent requests will be prioritized by our staff
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render step 1: Request Type Selection
  const renderStep1 = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {requestTypes.map((type) => (
          <motion.div
            key={type.id}
            className={`relative rounded-lg border shadow-md transition-colors hover:shadow-lg
              ${selectedRequestType === type.id ? "border-primary" : "border-muted"}`}
            onClick={() => {
              setSelectedRequestType(type.id);
              setFormErrors({ ...formErrors, requestType: false });
            }}
            style={{ cursor: "pointer" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {selectedRequestType === type.id && (
              <Badge className="absolute top-2 right-2 z-10">Selected</Badge>
            )}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <type.icon className={`h-5 w-5 text-${type.color}-500`} />
                  {type.name}
                </CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {type.id === REQUEST_TYPES.PHOTO &&
                    "Request photos of your pet during their stay."}
                  {type.id === REQUEST_TYPES.VIDEO &&
                    "Request a short video of your pet's activities."}
                  {type.id === REQUEST_TYPES.GROOMING &&
                    "Schedule a grooming service for your pet."}
                  {type.id === REQUEST_TYPES.BOARDING_EXTENSION &&
                    "Request to extend your pet's current stay."}
                  {type.id === REQUEST_TYPES.CUSTOM &&
                    "Make a special request not covered by other options."}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {formErrors.requestType && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Please select a request type</AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  // Render step 2: Pet Selection
  const renderStep2 = () => {
    return (
      <div className="space-y-6">
        {isLoading ? (
          <p>Loading your boarding pets...</p>
        ) : boardingPets.length === 0 ? (
          <Alert className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
            <Info className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <AlertTitle className="text-yellow-800 dark:text-yellow-300">
              No Boarding Pets Found
            </AlertTitle>
            <AlertDescription className="text-yellow-700 dark:text-yellow-400">
              You don't have any pets currently boarding with us. Please contact
              support if this is incorrect.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {boardingPets.map((pet) => (
              <motion.div
                key={pet.id}
                className={`relative rounded-lg border shadow-md transition-colors hover:shadow-lg
                  ${selectedPet === pet.id ? "border-primary" : "border-muted"}`}
                onClick={() => {
                  setSelectedPet(pet.id);
                  setFormErrors({ ...formErrors, pet: false });
                }}
                style={{ cursor: "pointer" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedPet === pet.id && (
                  <Badge className="absolute top-2 right-2 z-10">
                    Selected
                  </Badge>
                )}
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {pet.name}
                    </CardTitle>
                    <CardDescription>
                      {pet.breed} - {pet.age} years old
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {pet.notes || "No additional notes provided."}
                      </p>
                      {pet.boarding && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md dark:bg-blue-900/20 dark:border-blue-800">
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Checkout Date:{" "}
                            <strong>
                              {new Date(
                                pet.boarding.endDate,
                              ).toLocaleDateString()}
                            </strong>
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
        {formErrors.pet && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Please select a pet</AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  // Render the current step
  const renderCurrentStep = () => {
    switch (activeStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild className="text-foreground">
          <Link href="/webapp/pet-owner/requests">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            New Request
          </h1>
          <p className="text-base text-muted-foreground">
            Submit a new service request for your pet
          </p>
        </div>
      </div>

      {showSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700/30">
            <AlertTitle className="text-green-800 dark:text-green-300">
              Request Submitted Successfully
            </AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              Your request has been submitted and is now pending approval. You
              will be redirected to the requests page.
            </AlertDescription>
          </Alert>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-semibold">
                  Create New Request
                </CardTitle>
                <CardDescription>
                  Follow the steps below to create a new service request
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {renderStepIndicator()}
                {renderCurrentStep()}
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-between">
              {activeStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                >
                  Previous
                </Button>
              ) : (
                <Button type="button" variant="outline" asChild>
                  <Link href="/webapp/pet-owner/requests">Cancel</Link>
                </Button>
              )}

              {activeStep < 3 ? (
                <Button type="button" onClick={handleNextStep}>
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || boardingPets.length === 0}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}
