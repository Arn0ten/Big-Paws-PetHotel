"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Camera, Video, Scissors, Clock, HelpCircle, Info, AlertCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getBoardingPets, createRequest } from "@/app/webapp/data/sample-data"
import { REQUEST_TYPES, REQUEST_TYPE_LABELS } from "@/app/webapp/constants"

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
 *
 * 2. Replace createRequest() with actual API call to create a new request
 *    - Endpoint: POST /api/requests
 *    - Payload structure is defined in the handleSubmit function
 *    - The backend should validate the request data and return the created request
 *
 * 3. Add proper error handling for API calls
 *    - Display user-friendly error messages
 *    - Implement retry logic for failed API calls
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
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedRequestType, setSelectedRequestType] = useState<string | null>(null)
  const [selectedPet, setSelectedPet] = useState<string>("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Additional state for specific request types
  const [groomingService, setGroomingService] = useState("")
  const [extensionDuration, setExtensionDuration] = useState("")
  const [extensionUnit, setExtensionUnit] = useState("days")
  const [photoCount, setPhotoCount] = useState("3")
  const [photoType, setPhotoType] = useState("general")
  const [videoDuration, setVideoDuration] = useState("30-60")
  const [videoType, setVideoType] = useState("general")
  const [customRequestCategory, setCustomRequestCategory] = useState("other")

  // Boarding pets state
  const [boardingPets, setBoardingPets] = useState<any[]>([])
  const [selectedPetDetails, setSelectedPetDetails] = useState<any>(null)

  // Form validation state
  const [formErrors, setFormErrors] = useState({
    requestType: false,
    pet: false,
    description: false,
    groomingService: false,
    extensionDuration: false,
  })

  // Fetch boarding pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setIsLoading(true)

        // BACKEND INTEGRATION:
        // Replace this with an actual API call to fetch boarding pets
        // Example:
        // const response = await fetch('/api/pets?boarding=true');
        // if (!response.ok) throw new Error('Failed to fetch pets');
        // const petsData = await response.json();

        // For demo, we'll use the sample data
        const petsData = getBoardingPets()
        setBoardingPets(petsData)
      } catch (error) {
        console.error("Error fetching pets:", error)
        setErrorMessage("Failed to load your pets. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPets()
  }, [])

  // Update selected pet details when pet changes
  useEffect(() => {
    if (selectedPet) {
      const petDetails = boardingPets.find((pet) => pet.id === selectedPet)
      setSelectedPetDetails(petDetails)
    } else {
      setSelectedPetDetails(null)
    }
  }, [selectedPet, boardingPets])

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
  ]

  // Photo type options
  const photoTypeOptions = [
    { value: "general", label: "General Photos", description: "Regular photos of your pet" },
    { value: "playing", label: "Playing", description: "Photos of your pet playing" },
    { value: "sleeping", label: "Sleeping/Resting", description: "Photos of your pet resting" },
    { value: "eating", label: "Eating/Drinking", description: "Photos of your pet during meal time" },
    { value: "groomed", label: "After Grooming", description: "Photos after grooming session" },
  ]

  // Video type options
  const videoTypeOptions = [
    { value: "general", label: "General Activity", description: "Regular activity of your pet" },
    { value: "playing", label: "Playing", description: "Video of your pet playing" },
    { value: "interaction", label: "Interaction", description: "Interaction with staff or other pets" },
    { value: "exercise", label: "Exercise", description: "Exercise or training session" },
  ]

  // Custom request categories
  const customRequestCategories = [
    { value: "feeding", label: "Special Feeding", description: "Special feeding instructions" },
    { value: "medication", label: "Medication", description: "Medication administration" },
    { value: "exercise", label: "Exercise", description: "Special exercise requests" },
    { value: "other", label: "Other", description: "Other special requests" },
  ]

  // Validate form based on current step
  const validateCurrentStep = () => {
    let isValid = true
    const newErrors = { ...formErrors }

    if (activeStep === 1) {
      if (!selectedRequestType) {
        newErrors.requestType = true
        isValid = false
      } else {
        newErrors.requestType = false
      }
    } else if (activeStep === 2) {
      if (!selectedPet) {
        newErrors.pet = true
        isValid = false
      } else {
        newErrors.pet = false
      }
    } else if (activeStep === 3) {
      if (!description.trim()) {
        newErrors.description = true
        isValid = false
      } else {
        newErrors.description = false
      }

      // Validate type-specific fields
      if (selectedRequestType === REQUEST_TYPES.GROOMING && !groomingService) {
        newErrors.groomingService = true
        isValid = false
      }

      if (selectedRequestType === REQUEST_TYPES.BOARDING_EXTENSION && !extensionDuration) {
        newErrors.extensionDuration = true
        isValid = false
      }
    }

    setFormErrors(newErrors)
    return isValid
  }

  // Handle next step
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setActiveStep((prev) => prev + 1)
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    setActiveStep((prev) => prev - 1)
  }

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
   *   videoDuration?: string,         // For video requests
   *   videoType?: string,             // For video requests
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
    e.preventDefault()

    // Final validation
    if (!validateCurrentStep()) {
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")

    // Get pet name for the request
    const pet = boardingPets.find((p) => p.id === selectedPet)
    const petName = pet ? pet.name : "Unknown Pet"

    // Generate a title if not provided
    const generatedTitle = title || `${petName} - ${requestTypes.find((type) => type.id === selectedRequestType)?.name}`

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
    }

    // Add type-specific data
    if (selectedRequestType === REQUEST_TYPES.GROOMING && groomingService) {
      requestData.groomingService = groomingService
    } else if (selectedRequestType === REQUEST_TYPES.BOARDING_EXTENSION && extensionDuration) {
      requestData.extensionDetails = {
        duration: extensionDuration,
        unit: extensionUnit,
      }

      // Add current end date from pet boarding data
      if (pet?.boarding) {
        requestData.currentEndDate = pet.boarding.endDate
      }
    } else if (selectedRequestType === REQUEST_TYPES.PHOTO) {
      requestData.photoCount = Number.parseInt(photoCount)
      requestData.photoType = photoType
    } else if (selectedRequestType === REQUEST_TYPES.VIDEO) {
      requestData.videoDuration = videoDuration
      requestData.videoType = videoType
    } else if (selectedRequestType === REQUEST_TYPES.CUSTOM) {
      requestData.customRequestCategory = customRequestCategory
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
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo, we'll use the local helper function
      createRequest(requestData)

      // Show success message
      setShowSuccess(true)

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/webapp/pet-owner/requests")
      }, 2000)
    } catch (error) {
      console.error("Error creating request:", error)
      setErrorMessage(error instanceof Error ? error.message : "Failed to create your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
    )
  }

  // Render step 1: Request Type Selection
  const renderStep1 = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              Request Type <span className="text-destructive">*</span>
            </Label>
            {formErrors.requestType && (
              <span className="text-sm text-destructive flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Please select a request type
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">Select the type of service you're requesting</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {requestTypes.map((type) => (
              <div
                key={type.id}
                className={`relative flex cursor-pointer rounded-lg border p-4 transition-all hover:border-primary/50 hover:shadow-sm ${
                  selectedRequestType === type.id
                    ? `border-${type.color}-400 dark:border-${type.color}-600 bg-${type.color}-50 dark:bg-${type.color}-900/20`
                    : "border-border hover:bg-muted/50"
                }`}
                onClick={() => {
                  setSelectedRequestType(type.id)
                  setFormErrors({ ...formErrors, requestType: false })
                }}
              >
                <div className="flex w-full items-start space-x-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      selectedRequestType === type.id
                        ? `bg-${type.color}-100 text-${type.color}-700 dark:bg-${type.color}-900 dark:text-${type.color}-300`
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <type.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{type.name}</p>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Render step 2: Pet Selection
  const renderStep2 = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="pet" className="text-base font-medium">
              Select Pet <span className="text-destructive">*</span>
            </Label>
            {formErrors.pet && (
              <span className="text-sm text-destructive flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Please select a pet
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">Choose which pet this request is for</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {isLoading ? (
              <div className="col-span-full p-8 text-center">
                <p className="text-muted-foreground">Loading your pets...</p>
              </div>
            ) : boardingPets.length === 0 ? (
              <div className="col-span-full p-8 text-center border rounded-lg">
                <p className="text-muted-foreground">No pets currently boarding</p>
              </div>
            ) : (
              boardingPets.map((pet) => (
                <div
                  key={pet.id}
                  className={`relative flex cursor-pointer rounded-lg border p-4 transition-all hover:border-primary/50 hover:shadow-sm ${
                    selectedPet === pet.id
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => {
                    setSelectedPet(pet.id)
                    setFormErrors({ ...formErrors, pet: false })
                  }}
                >
                  <div className="flex w-full items-center space-x-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                      <img
                        src={pet.avatar || "/placeholder.svg?height=48&width=48"}
                        alt={pet.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{pet.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {pet.breed} • {pet.type}
                      </p>
                      {pet.boarding && (
                        <div className="flex items-center">
                          <Badge
                            variant="outline"
                            className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                          >
                            Currently Boarding
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {selectedPetDetails && selectedPetDetails.boarding && (
          <Card className="bg-muted/30 dark:bg-muted/10 border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Boarding Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-muted-foreground">Check-in:</span>
                  <p>{new Date(selectedPetDetails.boarding.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Check-out:</span>
                  <p>{new Date(selectedPetDetails.boarding.endDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Package:</span>
                <p>{selectedPetDetails.boarding.package}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

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
            <div className="space-y-2">
              <Label htmlFor="photoType" className="text-base font-medium">
                Photo Type
              </Label>
              <Select value={photoType} onValueChange={setPhotoType}>
                <SelectTrigger id="photoType" className="text-base">
                  <SelectValue placeholder="Select photo type" />
                </SelectTrigger>
                <SelectContent>
                  {photoTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">What kind of photos would you like?</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photoCount" className="text-base font-medium">
                Number of Photos
              </Label>
              <Select value={photoCount} onValueChange={setPhotoCount}>
                <SelectTrigger id="photoCount" className="text-base">
                  <SelectValue placeholder="How many photos?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 photo</SelectItem>
                  <SelectItem value="3">3 photos</SelectItem>
                  <SelectItem value="5">5 photos</SelectItem>
                  <SelectItem value="10">10 photos</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">How many photos would you like of your pet?</p>
            </div>
          </div>
        )}

        {selectedRequestType === REQUEST_TYPES.VIDEO && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="videoType" className="text-base font-medium">
                Video Type
              </Label>
              <Select value={videoType} onValueChange={setVideoType}>
                <SelectTrigger id="videoType" className="text-base">
                  <SelectValue placeholder="Select video type" />
                </SelectTrigger>
                <SelectContent>
                  {videoTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">What kind of video would you like?</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoDuration" className="text-base font-medium">
                Video Duration
              </Label>
              <Select value={videoDuration} onValueChange={setVideoDuration}>
                <SelectTrigger id="videoDuration" className="text-base">
                  <SelectValue placeholder="Select video duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15-30">15-30 seconds</SelectItem>
                  <SelectItem value="30-60">30-60 seconds</SelectItem>
                  <SelectItem value="60-120">1-2 minutes</SelectItem>
                  <SelectItem value="120+">2+ minutes</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">How long would you like the video to be?</p>
            </div>
          </div>
        )}

        {selectedRequestType === REQUEST_TYPES.GROOMING && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="groomingService" className="text-base font-medium">
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
                setGroomingService(value)
                setFormErrors({ ...formErrors, groomingService: false })
              }}
            >
              <SelectTrigger id="groomingService" className="text-base">
                <SelectValue placeholder="Select grooming service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic-wash">Basic Wash (₱180-₱320)</SelectItem>
                <SelectItem value="premium-wash">Premium Wash (₱300-₱850)</SelectItem>
                <SelectItem value="premium-wash-and-cut">Premium Wash & Cut (₱450-₱850)</SelectItem>
                <SelectItem value="full-grooming">Full Grooming (₱500-₱800)</SelectItem>
                <SelectItem value="nail-trim">Nail Trim Only (₱150-₱200)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Prices vary based on pet size. See our{" "}
              <Link href="/webapp/pet-owner/pricing" className="text-primary hover:underline">
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
              <AlertTitle className="text-amber-800 dark:text-amber-300">Boarding Extension</AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-400">
                {selectedPetDetails && selectedPetDetails.boarding ? (
                  <>
                    Current checkout date:{" "}
                    <strong>{new Date(selectedPetDetails.boarding.endDate).toLocaleDateString()}</strong>
                  </>
                ) : (
                  "Please specify how long you'd like to extend your pet's stay."
                )}
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="extensionDuration" className="text-base font-medium">
                    Extension Duration <span className="text-destructive">*</span>
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
                    setExtensionDuration(e.target.value)
                    setFormErrors({ ...formErrors, extensionDuration: false })
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="extensionUnit" className="text-base font-medium">
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
                <span className="font-medium">Pricing:</span> Hourly extensions cost ₱50-75/hour and daily extensions
                cost ₱500-750/day depending on pet size.
              </p>
            </div>
          </div>
        )}

        {selectedRequestType === REQUEST_TYPES.CUSTOM && (
          <div className="space-y-2">
            <Label htmlFor="customRequestCategory" className="text-base font-medium">
              Request Category
            </Label>
            <Select value={customRequestCategory} onValueChange={setCustomRequestCategory}>
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
            <p className="text-xs text-muted-foreground">Select a category that best describes your request</p>
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
              setDescription(e.target.value)
              setFormErrors({ ...formErrors, description: false })
            }}
          />
          <p className="text-xs text-muted-foreground">
            {selectedRequestType === REQUEST_TYPES.PHOTO && "Describe what kind of photos you'd like of your pet."}
            {selectedRequestType === REQUEST_TYPES.VIDEO && "Describe what kind of video you'd like of your pet."}
            {selectedRequestType === REQUEST_TYPES.GROOMING &&
              "Provide any specific instructions or preferences for the grooming service."}
            {selectedRequestType === REQUEST_TYPES.BOARDING_EXTENSION &&
              "Please explain why you need to extend your pet's stay."}
            {selectedRequestType === REQUEST_TYPES.CUSTOM && "Describe your request in detail."}
            {!selectedRequestType && "Provide details about your request."}
          </p>
        </div>

        {/* Urgency */}
        <div className="flex items-center space-x-2">
          <Checkbox id="urgent" checked={isUrgent} onCheckedChange={(checked) => setIsUrgent(checked === true)} />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="urgent" className="text-base font-normal">
              Mark as urgent
            </Label>
            <p className="text-sm text-muted-foreground">Urgent requests will be prioritized by our staff</p>
          </div>
        </div>
      </div>
    )
  }

  // Render the current step
  const renderCurrentStep = () => {
    switch (activeStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild className="text-foreground">
          <Link href="/webapp/pet-owner/requests">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">New Request</h1>
          <p className="text-base text-muted-foreground">Submit a new service request for your pet</p>
        </div>
      </div>

      {showSuccess ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700/30">
            <AlertTitle className="text-green-800 dark:text-green-300">Request Submitted Successfully</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              Your request has been submitted and is now pending approval. You will be redirected to the requests page.
            </AlertDescription>
          </Alert>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-semibold">Create New Request</CardTitle>
                <CardDescription>Follow the steps below to create a new service request</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {renderStepIndicator()}
                {renderCurrentStep()}
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-between">
              {activeStep > 1 ? (
                <Button type="button" variant="outline" onClick={handlePrevStep}>
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
                <Button type="submit" disabled={isSubmitting || boardingPets.length === 0}>
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      )}
    </div>
  )
}

