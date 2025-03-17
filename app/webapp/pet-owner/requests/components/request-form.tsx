"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Camera, Video, Scissors, Calendar, HelpCircle } from "lucide-react"
import { pets } from "@/app/webapp/data/sample-data"
import { cn } from "@/lib/utils"

/**
 * Form schema for request creation
 */
const formSchema = z.object({
  petId: z.string({
    required_error: "Please select a pet",
  }),
  type: z.string({
    required_error: "Please select a request type",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters",
    })
    .max(500, {
      message: "Description must not exceed 500 characters",
    }),
  groomingService: z.string().optional(),
  extensionDuration: z.string().optional(),
  extensionUnit: z.string().optional(),
  isUrgent: z.boolean().default(false),
})

// Request type options with icons and descriptions
const requestTypes = [
  {
    id: "photo",
    name: "Photo Update",
    icon: Camera,
    description: "Request photos of your pet",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  {
    id: "video",
    name: "Video Request",
    icon: Video,
    description: "Request videos of your pet",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  },
  {
    id: "grooming",
    name: "Grooming Service",
    icon: Scissors,
    description: "Schedule a grooming service",
    color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
  },
  {
    id: "boarding-extension",
    name: "Boarding Extension",
    icon: Calendar,
    description: "Extend your pet's stay",
    color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  },
  {
    id: "custom",
    name: "Custom Request",
    icon: HelpCircle,
    description: "Make a custom request",
    color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  },
]

/**
 * RequestForm Component
 *
 * This component provides a form for creating new service requests.
 *
 * API Integration Points:
 * 1. Pet data fetching - GET /api/pets?boarding=true
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Function to handle form submission
 * @param {Function} props.onCancel - Function to handle form cancellation
 * @param {boolean} props.isSubmitting - Whether the form is currently submitting
 * @returns {JSX.Element} The request form component
 */
export default function RequestForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: {
  onSubmit: (data: any) => void
  onCancel: () => void
  isSubmitting?: boolean
}) {
  const [requestType, setRequestType] = useState("")

  // Get boarding pets
  // In a real implementation, this would be fetched from an API
  const boardingPets = pets.filter((pet) => pet.boarding !== null)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      isUrgent: false,
    },
  })

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Prepare data based on request type
    const data: any = {
      petId: values.petId,
      petName: pets.find((pet) => pet.id === values.petId)?.name || "",
      type: values.type,
      description: values.description,
      isUrgent: values.isUrgent,
    }

    // Add type-specific data
    if (values.type === "grooming" && values.groomingService) {
      data.groomingService = values.groomingService
    } else if (values.type === "boarding-extension" && values.extensionDuration && values.extensionUnit) {
      data.extensionDetails = {
        duration: values.extensionDuration,
        unit: values.extensionUnit,
      }

      // Add current end date from pet boarding data
      const pet = pets.find((p) => p.id === values.petId)
      if (pet?.boarding) {
        data.currentEndDate = pet.boarding.endDate
      }
    }

    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Pet Selection */}
              <FormField
                control={form.control}
                name="petId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-foreground dark:text-foreground">
                      Select Pet
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select a pet" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {boardingPets.length === 0 ? (
                          <SelectItem value="none" disabled>
                            No pets currently boarding
                          </SelectItem>
                        ) : (
                          boardingPets.map((pet) => (
                            <SelectItem key={pet.id} value={pet.id}>
                              {pet.name} ({pet.type})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-muted-foreground dark:text-muted-foreground/90">
                      Only pets that are currently boarding are shown.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Request Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-medium text-foreground dark:text-foreground">
                      Request Type
                    </FormLabel>
                    <FormDescription className="text-muted-foreground dark:text-muted-foreground/90">
                      Select the type of service you're requesting.
                    </FormDescription>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {requestTypes.map((type) => (
                        <div
                          key={type.id}
                          className={cn(
                            "relative flex cursor-pointer rounded-lg border border-border p-4 transition-all",
                            "hover:border-primary/50 hover:shadow-sm",
                            field.value === type.id ? "border-primary ring-2 ring-primary/20" : "",
                          )}
                          onClick={() => {
                            field.onChange(type.id)
                            setRequestType(type.id)
                          }}
                        >
                          <div className="flex w-full items-start space-x-3">
                            <div className={cn("rounded-full p-2", type.color)}>
                              <type.icon className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium text-foreground dark:text-foreground">{type.name}</p>
                              <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
                                {type.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Grooming Service (conditional) */}
              {requestType === "grooming" && (
                <FormField
                  control={form.control}
                  name="groomingService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-foreground dark:text-foreground">
                        Grooming Service
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Select grooming service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="basic-wash">Basic Wash</SelectItem>
                          <SelectItem value="premium-wash">Premium Wash</SelectItem>
                          <SelectItem value="premium-wash-and-cut">Premium Wash & Cut</SelectItem>
                          <SelectItem value="full-grooming">Full Grooming</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-muted-foreground dark:text-muted-foreground/90">
                        Select the grooming service you'd like for your pet.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Boarding Extension (conditional) */}
              {requestType === "boarding-extension" && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="extensionDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-foreground dark:text-foreground">
                          Extension Duration
                        </FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="Duration" className="h-12 text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="extensionUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-foreground dark:text-foreground">
                          Unit
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-foreground dark:text-foreground">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide details about your request..."
                        className="min-h-[120px] text-base resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-muted-foreground dark:text-muted-foreground/90">
                      {requestType === "photo" && "Describe what kind of photos you'd like."}
                      {requestType === "video" && "Describe what kind of video you'd like."}
                      {requestType === "grooming" && "Provide any specific instructions for the grooming service."}
                      {requestType === "boarding-extension" && "Explain why you need to extend your pet's stay."}
                      {requestType === "custom" && "Describe your request in detail."}
                      {!requestType && "Provide details about your request."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Urgency */}
              <FormField
                control={form.control}
                name="isUrgent"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-medium text-foreground dark:text-foreground">
                      Priority
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === "urgent")}
                        defaultValue={field.value ? "urgent" : "normal"}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="normal" />
                          </FormControl>
                          <FormLabel className="font-normal text-foreground dark:text-foreground">Normal</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="urgent" />
                          </FormControl>
                          <FormLabel className="font-normal text-foreground dark:text-foreground">Urgent</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription className="text-muted-foreground dark:text-muted-foreground/90">
                      Select "Urgent" if this request requires immediate attention.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="h-12 px-6 text-base font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 px-6 text-base font-medium bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:text-white"
          >
            {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

