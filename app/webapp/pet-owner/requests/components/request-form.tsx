"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Camera, Video, Scissors, Clock, FileText, X } from "lucide-react"

// Sample data for demonstration
const samplePets = [
  { id: "pet-1", name: "Max", type: "Dog", breed: "Golden Retriever" },
  { id: "pet-2", name: "Bella", type: "Dog", breed: "Poodle" },
  { id: "pet-3", name: "Charlie", type: "Cat", breed: "Maine Coon" },
  { id: "pet-4", name: "Luna", type: "Cat", breed: "Siamese" },
]

interface RequestFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function RequestForm({ onSubmit, onCancel }: RequestFormProps) {
  const [requestType, setRequestType] = useState<string>("")
  const [selectedPet, setSelectedPet] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [extensionDuration, setExtensionDuration] = useState<string>("")
  const [extensionUnit, setExtensionUnit] = useState<string>("hours")
  const [isUrgent, setIsUrgent] = useState<boolean>(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!requestType) newErrors.requestType = "Please select a request type"
    if (!selectedPet) newErrors.selectedPet = "Please select a pet"
    if (!description) newErrors.description = "Please provide a description"

    if (requestType === "boarding-extension") {
      if (!extensionDuration) newErrors.extensionDuration = "Please specify the extension duration"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const requestData = {
      type: requestType,
      petId: selectedPet,
      petName: samplePets.find((pet) => pet.id === selectedPet)?.name || "",
      description,
      isUrgent,
      ...(requestType === "boarding-extension" && {
        extensionDetails: {
          duration: extensionDuration,
          unit: extensionUnit,
        },
      }),
    }

    onSubmit(requestData)
  }

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case "photo":
        return <Camera className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "grooming":
        return <Scissors className="h-5 w-5" />
      case "boarding-extension":
        return <Clock className="h-5 w-5" />
      case "custom":
        return <FileText className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full">
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
          <CardTitle>New Service Request</CardTitle>
          <CardDescription>Request services for your pet during their stay</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="request-type"
                className="text-xs uppercase tracking-wide text-muted-foreground font-medium"
              >
                Request Type
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[
                  { id: "photo", label: "Photo Update", icon: <Camera className="h-4 w-4 mr-2" /> },
                  { id: "video", label: "Video Request", icon: <Video className="h-4 w-4 mr-2" /> },
                  { id: "grooming", label: "Grooming", icon: <Scissors className="h-4 w-4 mr-2" /> },
                  { id: "boarding-extension", label: "Extend Stay", icon: <Clock className="h-4 w-4 mr-2" /> },
                  { id: "custom", label: "Custom", icon: <FileText className="h-4 w-4 mr-2" /> },
                ].map((type) => (
                  <Button
                    key={type.id}
                    type="button"
                    variant={requestType === type.id ? "default" : "outline"}
                    className={`justify-start ${requestType === type.id ? "border-primary" : ""}`}
                    onClick={() => setRequestType(type.id)}
                  >
                    {type.icon}
                    <span className="truncate">{type.label}</span>
                  </Button>
                ))}
              </div>
              {errors.requestType && <p className="text-sm text-red-500 mt-1">{errors.requestType}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pet" className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Select Pet
              </Label>
              <Select value={selectedPet} onValueChange={setSelectedPet}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a pet" />
                </SelectTrigger>
                <SelectContent>
                  {samplePets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.name} ({pet.breed})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.selectedPet && <p className="text-sm text-red-500 mt-1">{errors.selectedPet}</p>}
            </div>

            {requestType === "boarding-extension" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="extension-duration"
                    className="text-xs uppercase tracking-wide text-muted-foreground font-medium"
                  >
                    Extension Duration
                  </Label>
                  <Input
                    id="extension-duration"
                    type="number"
                    min="1"
                    placeholder="Duration"
                    value={extensionDuration}
                    onChange={(e) => setExtensionDuration(e.target.value)}
                  />
                  {errors.extensionDuration && <p className="text-sm text-red-500 mt-1">{errors.extensionDuration}</p>}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="extension-unit"
                    className="text-xs uppercase tracking-wide text-muted-foreground font-medium"
                  >
                    Unit
                  </Label>
                  <Select value={extensionUnit} onValueChange={setExtensionUnit}>
                    <SelectTrigger id="extension-unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-xs uppercase tracking-wide text-muted-foreground font-medium"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Please provide details about your request"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
              {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Priority</Label>
              <RadioGroup
                value={isUrgent ? "urgent" : "normal"}
                onValueChange={(value) => setIsUrgent(value === "urgent")}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="font-normal">
                    Normal
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="font-normal">
                    Urgent (higher priority)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Submit Request</Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}

