"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Video, Scissors, Clock, FileText, ArrowLeft, Check } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function NewRequestPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [requestType, setRequestType] = useState<string | null>(null)
  const [selectedPet, setSelectedPet] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)
  const [extensionDuration, setExtensionDuration] = useState("")
  const [extensionUnit, setExtensionUnit] = useState("days")
  const [groomingService, setGroomingService] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [pets, setPets] = useState([
    {
      id: "pet-1",
      name: "Max",
      type: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      avatar: "/placeholder.svg?height=100&width=100",
      boarding: {
        status: "active",
        startDate: "2025-03-05T10:00:00Z",
        endDate: "2025-03-15T18:00:00Z",
        package: "Premium Care",
        totalPrice: 550,
        paidAmount: 300,
        remainingAmount: 250,
      },
    },
    {
      id: "pet-2",
      name: "Luna",
      type: "Cat",
      breed: "Siamese",
      age: "2 years",
      avatar: "/placeholder.svg?height=100&width=100",
      boarding: null,
    },
  ])

  // Get active boarding pets
  const activeBoardingPets = pets.filter((pet) => pet.boarding?.status === "active")

  // Get selected pet object
  const selectedPetObject = pets.find((pet) => pet.id === selectedPet)

  // Check if form is valid for current step
  const isStepValid = () => {
    if (step === 1) return !!requestType
    if (step === 2) return !!selectedPet
    if (step === 3) {
      if (!description) return false

      if (requestType === "boarding-extension") {
        return !!extensionDuration && !!extensionUnit
      }

      if (requestType === "grooming") {
        return !!groomingService
      }

      return true
    }

    return false
  }

  // Handle next step
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    if (!isStepValid()) return

    setIsSubmitting(true)

    // Create request object
    const request = {
      type: requestType,
      petId: selectedPet,
      petName: selectedPetObject?.name,
      description,
      isUrgent,
      status: "new",
      createdAt: new Date().toISOString(),
      ...(requestType === "boarding-extension" && {
        extensionDetails: {
          duration: extensionDuration,
          unit: extensionUnit,
        },
        currentEndDate: selectedPetObject?.boarding?.endDate,
      }),
      ...(requestType === "grooming" && {
        groomingService,
        petSize: "Medium", // This would be determined from the pet's profile
      }),
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Submitting request:", request)
      setIsSubmitting(false)
      setIsSuccess(true)

      // Redirect after success
      setTimeout(() => {
        router.push("/webapp/pet-owner/requests")
      }, 2000)
    }, 1500)
  }

  // Get request type icon
  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case "photo":
        return <Camera className="h-6 w-6" />
      case "video":
        return <Video className="h-6 w-6" />
      case "grooming":
        return <Scissors className="h-6 w-6" />
      case "boarding-extension":
        return <Clock className="h-6 w-6" />
      case "custom":
        return <FileText className="h-6 w-6" />
      default:
        return <FileText className="h-6 w-6" />
    }
  }

  // Get request type label
  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case "photo":
        return "Photo Update"
      case "video":
        return "Video Request"
      case "grooming":
        return "Grooming Service"
      case "boarding-extension":
        return "Boarding Extension"
      case "custom":
        return "Custom Request"
      default:
        return "Request"
    }
  }

  // Get request type description
  const getRequestTypeDescription = (type: string) => {
    switch (type) {
      case "photo":
        return "Request photos of your pet during their stay"
      case "video":
        return "Request a short video of your pet's activities"
      case "grooming":
        return "Schedule a grooming service for your pet"
      case "boarding-extension":
        return "Extend your pet's current boarding stay"
      case "custom":
        return "Make a custom request for your pet"
      default:
        return ""
    }
  }

  // Render step content
  const renderStepContent = () => {
    if (isSuccess) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center py-8"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Request Submitted!</h2>
          <p className="text-center text-muted-foreground mb-6">
            Your request has been submitted successfully. We'll process it as soon as possible.
          </p>
          <p className="text-sm text-muted-foreground">Redirecting to requests page...</p>
        </motion.div>
      )
    }

    if (step === 1) {
      return (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {["photo", "video", "grooming", "boarding-extension", "custom"].map((type) => (
                <div
                  key={type}
                  className={cn(
                    "relative rounded-lg border-2 p-4 cursor-pointer transition-all",
                    requestType === type
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground/20",
                  )}
                  onClick={() => setRequestType(type)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`
                      p-2 rounded-full
                      ${type === "photo" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : ""}
                      ${type === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : ""}
                      ${type === "grooming" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}
                      ${type === "boarding-extension" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" : ""}
                      ${type === "custom" ? "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300" : ""}
                    `}
                    >
                      {getRequestTypeIcon(type)}
                    </div>

                    <div>
                      <h3 className="font-medium">{getRequestTypeLabel(type)}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{getRequestTypeDescription(type)}</p>
                    </div>
                  </div>

                  {requestType === type && <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-primary" />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )
    }

    if (step === 2) {
      return (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4">
            {requestType === "boarding-extension" ? (
              // Only show pets that are currently boarding
              activeBoardingPets.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {activeBoardingPets.map((pet) => (
                    <div
                      key={pet.id}
                      className={cn(
                        "relative rounded-lg border-2 p-4 cursor-pointer transition-all",
                        selectedPet === pet.id
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-muted-foreground/20",
                      )}
                      onClick={() => setSelectedPet(pet.id)}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={pet.avatar} alt={pet.name} />
                          <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-medium">{pet.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {pet.breed} • {pet.age}
                          </p>
                          <p className="text-xs text-primary mt-1">
                            Currently boarding until {format(new Date(pet.boarding?.endDate || ""), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>

                      {selectedPet === pet.id && (
                        <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-primary" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No Active Boarding</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You don't have any pets currently boarding with us.
                  </p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link href="/webapp/pet-owner/requests/new">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Choose Another Request Type
                    </Link>
                  </Button>
                </div>
              )
            ) : (
              // Show all pets for other request types
              <div className="grid grid-cols-1 gap-4">
                {pets.map((pet) => (
                  <div
                    key={pet.id}
                    className={cn(
                      "relative rounded-lg border-2 p-4 cursor-pointer transition-all",
                      selectedPet === pet.id
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-muted-foreground/20",
                    )}
                    onClick={() => setSelectedPet(pet.id)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={pet.avatar} alt={pet.name} />
                        <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium">{pet.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {pet.breed} • {pet.age}
                        </p>
                        {pet.boarding?.status === "active" && (
                          <p className="text-xs text-primary mt-1">Currently boarding</p>
                        )}
                      </div>
                    </div>

                    {selectedPet === pet.id && (
                      <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-primary" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )
    }

    if (step === 3) {
      return (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your request..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            {requestType === "boarding-extension" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="extension-duration">Duration</Label>
                    <Input
                      id="extension-duration"
                      type="number"
                      min="1"
                      placeholder="Enter duration"
                      value={extensionDuration}
                      onChange={(e) => setExtensionDuration(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="extension-unit">Unit</Label>
                    <Select value={extensionUnit} onValueChange={setExtensionUnit}>
                      <SelectTrigger id="extension-unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="weeks">Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedPetObject?.boarding?.endDate && (
                  <div className="p-3 bg-muted/50 rounded-md">
                    <p className="text-sm">
                      Current end date:{" "}
                      <span className="font-medium">
                        {format(new Date(selectedPetObject.boarding.endDate), "MMM d, yyyy 'at' h:mm a")}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {requestType === "grooming" && (
              <div className="space-y-2">
                <Label htmlFor="grooming-service">Grooming Service</Label>
                <Select value={groomingService} onValueChange={setGroomingService}>
                  <SelectTrigger id="grooming-service">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic-wash">Basic Wash</SelectItem>
                    <SelectItem value="premium-wash-and-cut">Premium Wash & Cut</SelectItem>
                    <SelectItem value="full-grooming">Full Grooming</SelectItem>
                    <SelectItem value="nail-trim">Nail Trim</SelectItem>
                    <SelectItem value="teeth-cleaning">Teeth Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {(requestType === "photo" || requestType === "video") && (
              <div className="space-y-2">
                <Label>Urgency</Label>
                <RadioGroup
                  value={isUrgent ? "urgent" : "normal"}
                  onValueChange={(value) => setIsUrgent(value === "urgent")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal" className="cursor-pointer">
                      Normal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label htmlFor="urgent" className="cursor-pointer">
                      Urgent
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>
        </motion.div>
      )
    }

    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">New Request</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 ? "Select Request Type" : step === 2 ? "Select Pet" : step === 3 ? "Request Details" : ""}
          </CardTitle>
          <CardDescription>
            {step === 1
              ? "Choose the type of request you want to make"
              : step === 2
                ? "Select the pet for this request"
                : step === 3
                  ? "Provide details for your request"
                  : ""}
          </CardDescription>
        </CardHeader>

        <CardContent>{renderStepContent()}</CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handlePrevStep}>
              Back
            </Button>
          ) : (
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          )}

          <Button onClick={handleNextStep} disabled={!isStepValid() || isSubmitting}>
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : step < 3 ? (
              "Next"
            ) : (
              "Submit Request"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

