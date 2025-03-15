"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addDays, addHours, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import {
  CalendarIcon,
  Clock,
  Loader2,
  Trash2,
  Upload,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Film,
  ImageIcon,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "../utils/helpers"
import { Switch } from "@/components/ui/switch"
import { useMediaQuery } from "@/hooks/use-media-query"

interface EnhancedRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: any
  onComplete: (updatedRequest: any) => void
  isProcessing: boolean
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function EnhancedRequestDialog({
  open,
  onOpenChange,
  request,
  onComplete,
  isProcessing,
  activeTab,
  setActiveTab,
}: EnhancedRequestDialogProps) {
  // State for handling multiple files
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isMultipleUpload, setIsMultipleUpload] = useState(false)

  // Other state variables
  const [processingNotes, setProcessingNotes] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedGroomingService, setSelectedGroomingService] = useState("premium-wash-and-cut")
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null)
  const [isHourExtension, setIsHourExtension] = useState(false)
  const [newEndDate, setNewEndDate] = useState<Date | undefined>(undefined)
  const [newEndTime, setNewEndTime] = useState<string>("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Reset state when dialog opens/closes or request changes
  useEffect(() => {
    if (open && request) {
      setProcessingNotes("")
      setSelectedFiles([])
      setPreviewUrls([])
      setCurrentPreviewIndex(0)
      setIsFullScreen(false)
      setIsMultipleUpload(false)

      // Check if this is an hour extension
      if (request.type === "boarding-extension" && request.extensionDetails) {
        setIsHourExtension(request.extensionDetails.unit === "hours")

        // Calculate new end date based on extension details
        if (request.currentEndDate) {
          const currentEndDate = parseISO(request.currentEndDate)
          let calculatedEndDate: Date

          if (request.extensionDetails.unit === "hours") {
            calculatedEndDate = addHours(currentEndDate, Number.parseInt(request.extensionDetails.duration))
          } else {
            calculatedEndDate = addDays(currentEndDate, Number.parseInt(request.extensionDetails.duration))
          }

          setDate(calculatedEndDate)
          setNewEndDate(calculatedEndDate)
          setNewEndTime(format(calculatedEndDate, "HH:mm"))
        }
      } else {
        setIsHourExtension(false)
      }

      // Set default grooming service if available
      if (request.type === "grooming" && request.groomingService) {
        setSelectedGroomingService(request.groomingService)
      } else {
        setSelectedGroomingService("premium-wash-and-cut")
      }
    }
  }, [open, request])

  // Handle file selection with support for multiple files and video duration validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)

      // For video, check duration
      if (request.type === "video" && files.length > 0) {
        const file = files[0]
        const videoElement = document.createElement("video")
        videoElement.preload = "metadata"

        videoElement.onloadedmetadata = () => {
          window.URL.revokeObjectURL(videoElement.src)
          if (videoElement.duration > 60) {
            // More than 1 minute
            alert("Video must be 1 minute or less in duration")
            return
          } else {
            setSelectedFiles([file])
            const url = URL.createObjectURL(file)
            setPreviewUrls([url])
            setCurrentPreviewIndex(0)
          }
        }

        videoElement.src = URL.createObjectURL(file)
        return
      }

      // For photos
      let filesToAdd: File[] = []

      if (isMultipleUpload) {
        // Limit to 5 photos total
        const totalFiles = [...selectedFiles, ...files]
        filesToAdd = totalFiles.slice(0, 5)
      } else {
        // Single photo mode - replace existing
        filesToAdd = [files[0]]
      }

      setSelectedFiles(filesToAdd)

      // Create preview URLs
      const urls = filesToAdd.map((file) => URL.createObjectURL(file))

      // Clean up any existing preview URLs to prevent memory leaks
      previewUrls.forEach((url) => URL.revokeObjectURL(url))

      setPreviewUrls(urls)
      setCurrentPreviewIndex(0)
    }
  }

  // Remove selected file(s)
  const handleRemoveFile = (index?: number) => {
    if (index !== undefined) {
      // Remove a specific file
      const newFiles = [...selectedFiles]
      const newUrls = [...previewUrls]

      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(newUrls[index])

      newFiles.splice(index, 1)
      newUrls.splice(index, 1)

      setSelectedFiles(newFiles)
      setPreviewUrls(newUrls)

      // Adjust current index if needed
      if (currentPreviewIndex >= newUrls.length && newUrls.length > 0) {
        setCurrentPreviewIndex(newUrls.length - 1)
      }
    } else {
      // Remove all files
      previewUrls.forEach((url) => URL.revokeObjectURL(url))
      setSelectedFiles([])
      setPreviewUrls([])
      setCurrentPreviewIndex(0)
    }
  }

  // Navigation for preview carousel
  const goToPreviousImage = () => {
    if (previewUrls.length <= 1) return
    setCurrentPreviewIndex((prev) => (prev === 0 ? previewUrls.length - 1 : prev - 1))
  }

  const goToNextImage = () => {
    if (previewUrls.length <= 1) return
    setCurrentPreviewIndex((prev) => (prev === previewUrls.length - 1 ? 0 : prev + 1))
  }

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev)
  }

  // Validate form before submission
  const isFormValid = () => {
    if (!request) return false

    // For photo/video requests, a file must be selected
    if ((request.type === "photo" || request.type === "video") && selectedFiles.length === 0) {
      return false
    }

    // For boarding extensions, a date must be selected
    if (request.type === "boarding-extension" && !date) {
      return false
    }

    // For grooming, a service must be selected
    if (request.type === "grooming" && !selectedGroomingService) {
      return false
    }

    // Processing notes are optional but recommended
    return true
  }

  // Handle form submission
  const handleComplete = () => {
    if (isProcessing) return

    // Add the processing notes to the request object
    const updatedRequest = {
      ...request,
      processingNotes: processingNotes,
      // BACKEND INTEGRATION: Store the selected files in your backend storage
      // and save the URLs/references to the request record
      mediaFiles: selectedFiles.map((file, index) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        url: previewUrls[index], // This should be replaced with actual stored URLs from your backend
      })),
    }

    // Call the onComplete callback with the updated request
    onComplete(updatedRequest)
  }

  if (!request) return null

  // Determine if this is a boarding extension request
  const isBoardingExtension = request.type === "boarding-extension"

  // Format the current end date for display
  const formattedCurrentEndDate = request.currentEndDate
    ? `${formatDate(request.currentEndDate, false)}, at ${format(new Date(request.currentEndDate), "h:mm a")}`
    : "Not specified"

  // Update the formattedNewEndDate to match the same format
  const formattedNewEndDate = date
    ? `${formatDate(date.toISOString(), false)}, at ${format(date, "h:mm a")}`
    : "Not specified"

  // Calculate additional cost
  const additionalCost = request.price || calculatedPrice || 0

  // Format the extension requested
  const formattedExtensionRequested = request.extensionDetails
    ? `${request.extensionDetails.duration} ${request.extensionDetails.unit}`
    : "Not specified"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0",
          isFullScreen && "w-screen h-screen max-w-none max-h-none rounded-none",
        )}
      >
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="text-xl font-semibold">Process Request</DialogTitle>
          <DialogDescription>
            Review and process the request from {request.petOwnerName} for {request.petName}.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Request Information</TabsTrigger>
              <TabsTrigger value="process">Process Request</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="info" className="p-6 pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Request Type</Label>
                  <div className="mt-1">
                    <Badge
                      className={`
                        text-sm font-medium
                        ${request.type === "photo" ? "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300" : ""}
                        ${request.type === "video" ? "bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300" : ""}
                        ${request.type === "grooming" ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300" : ""}
                        ${request.type === "boarding-extension" ? "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-300" : ""}
                        ${request.type === "custom" ? "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300" : ""}
                      `}
                    >
                      {request.type === "photo" && "Photo Update"}
                      {request.type === "video" && "Video Request"}
                      {request.type === "grooming" && "Grooming Service"}
                      {request.type === "boarding-extension" && "Boarding Extension"}
                      {request.type === "custom" && "Custom Request"}
                    </Badge>
                    {request.isUrgent && (
                      <Badge variant="destructive" className="ml-2">
                        Urgent
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Submitted</Label>
                  <div className="mt-1 text-base font-medium">{formatDate(request.createdAt)}</div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Pet</Label>
                  <div className="mt-1 text-base font-medium">{request.petName}</div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Pet Owner</Label>
                  <div className="mt-1 text-base font-medium">{request.petOwnerName}</div>
                </div>

                {request.type === "boarding-extension" && request.extensionDetails && (
                  <>
                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">Current End Date</Label>
                      <div className="mt-1 text-base font-medium">{formattedCurrentEndDate}</div>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                        Extension Requested
                      </Label>
                      <div className="mt-1 text-base font-medium text-amber-700 dark:text-amber-400">
                        {request.extensionDetails.duration} {request.extensionDetails.unit}
                      </div>
                    </div>
                  </>
                )}

                {request.type === "grooming" && request.groomingService && (
                  <div>
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">Requested Service</Label>
                    <div className="mt-1 text-base font-medium text-green-700 dark:text-green-400">
                      {request.groomingService.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">Description</Label>
                <div className="mt-1 p-3 bg-muted/30 rounded-md text-base whitespace-pre-wrap">
                  {request.description}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="process" className="p-6 pt-4">
            <div className="space-y-6">
              {/* Photo/Video Upload Section */}
              {(request.type === "photo" || request.type === "video") && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="media-upload" className="text-base font-medium">
                      Upload {request.type === "photo" ? "Photo" : "Video"}
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      {request.type === "photo"
                        ? "Upload photos of the pet to share with the owner."
                        : "Upload a short video (max 1 minute) of the pet to share with the owner."}
                    </p>

                    {/* Toggle for multiple photo upload */}
                    {request.type === "photo" && (
                      <div className="flex items-center space-x-2 mb-4">
                        <Switch id="multiple-upload" checked={isMultipleUpload} onCheckedChange={setIsMultipleUpload} />
                        <Label htmlFor="multiple-upload" className="text-sm cursor-pointer">
                          Upload multiple photos (max 5)
                        </Label>
                      </div>
                    )}

                    {selectedFiles.length === 0 ? (
                      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                        <Input
                          id="media-upload"
                          type="file"
                          accept={request.type === "photo" ? "image/*" : "video/*"}
                          className="hidden"
                          onChange={handleFileChange}
                          multiple={request.type === "photo" && isMultipleUpload}
                        />
                        <div className="flex flex-col items-center justify-center gap-2">
                          {request.type === "photo" ? (
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          ) : (
                            <Film className="h-8 w-8 text-muted-foreground" />
                          )}
                          <p className="text-sm text-muted-foreground">
                            Drag and drop or click to upload {isMultipleUpload ? "photos" : "a " + request.type}
                          </p>
                          <Button
                            variant="outline"
                            onClick={() => document.getElementById("media-upload")?.click()}
                            className="mt-2"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Select {request.type === "photo" ? (isMultipleUpload ? "Photos" : "Photo") : "Video"}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium">
                            {selectedFiles.length > 1
                              ? `${selectedFiles.length} files selected`
                              : selectedFiles[0].name}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById("media-upload")?.click()}
                            >
                              <Upload className="h-3 w-3 mr-1" />
                              Replace
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleRemoveFile()}>
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>

                        {/* Media Preview Carousel */}
                        {previewUrls.length > 0 && (
                          <div className="relative mt-2">
                            {/* Full screen overlay */}
                            {isFullScreen && (
                              <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-4 right-4 text-white"
                                  onClick={toggleFullScreen}
                                >
                                  <Minimize className="h-6 w-6" />
                                </Button>

                                {request.type === "photo" ? (
                                  <img
                                    src={previewUrls[currentPreviewIndex] || "/placeholder.svg"}
                                    alt={`Preview ${currentPreviewIndex + 1}`}
                                    className="max-h-[90vh] max-w-[90vw] object-contain"
                                  />
                                ) : (
                                  <video
                                    src={previewUrls[currentPreviewIndex]}
                                    controls
                                    className="max-h-[90vh] max-w-[90vw]"
                                    ref={videoRef}
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                )}

                                {previewUrls.length > 1 && (
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
                                      onClick={goToPreviousImage}
                                    >
                                      <ChevronLeft className="h-8 w-8" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
                                      onClick={goToNextImage}
                                    >
                                      <ChevronRight className="h-8 w-8" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            )}

                            {/* Regular preview */}
                            <div className="relative rounded-md overflow-hidden">
                              {request.type === "photo" ? (
                                <img
                                  src={previewUrls[currentPreviewIndex] || "/placeholder.svg"}
                                  alt={`Preview ${currentPreviewIndex + 1}`}
                                  className="w-full h-[300px] object-contain bg-black/5"
                                />
                              ) : (
                                <video
                                  src={previewUrls[currentPreviewIndex]}
                                  controls
                                  className="w-full h-[300px] object-contain bg-black/5"
                                  ref={videoRef}
                                >
                                  Your browser does not support the video tag.
                                </video>
                              )}

                              {/* Navigation controls */}
                              <div className="absolute top-2 right-2 flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="bg-black/20 text-white hover:bg-black/30"
                                  onClick={toggleFullScreen}
                                >
                                  <Maximize className="h-4 w-4" />
                                </Button>
                                {selectedFiles.length > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="bg-black/20 text-white hover:bg-black/30"
                                    onClick={() => handleRemoveFile(currentPreviewIndex)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>

                              {previewUrls.length > 1 && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/30"
                                    onClick={goToPreviousImage}
                                  >
                                    <ChevronLeft className="h-6 w-6" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/30"
                                    onClick={goToNextImage}
                                  >
                                    <ChevronRight className="h-6 w-6" />
                                  </Button>
                                </>
                              )}
                            </div>

                            {/* Thumbnail navigation for multiple photos */}
                            {previewUrls.length > 1 && (
                              <div className="flex justify-center mt-2 gap-2 overflow-x-auto py-2">
                                {previewUrls.map((url, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setCurrentPreviewIndex(index)}
                                    className={`w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 ${
                                      index === currentPreviewIndex ? "border-primary" : "border-transparent"
                                    }`}
                                  >
                                    <img
                                      src={url || "/placeholder.svg"}
                                      alt={`Thumbnail ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* File counter */}
                            {previewUrls.length > 1 && (
                              <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                                {currentPreviewIndex + 1} / {previewUrls.length}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Boarding Extension Section */}
              {request.type === "boarding-extension" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-amber-200 dark:border-amber-800">
                      <CardContent className="p-4 space-y-4">
                        <h3 className="text-base font-medium text-amber-700 dark:text-amber-400 flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Extension Approval
                        </h3>

                        <div className="space-y-3">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                              Current End Date:
                            </Label>
                            <div className="text-base font-medium">{formattedCurrentEndDate}</div>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                              Extension Requested:
                            </Label>
                            <div className="text-base font-medium text-amber-700 dark:text-amber-400">
                              {formattedExtensionRequested}
                            </div>
                          </div>

                          {isHourExtension ? (
                            <>
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                                  New End Date:
                                </Label>
                                <div className="text-base font-medium">{formattedNewEndDate}</div>
                              </div>

                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                                  Additional Cost:
                                </Label>
                                <div className="text-base font-medium text-green-600 dark:text-green-400">
                                  {formatCurrency(additionalCost)}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="space-y-1">
                                <Label
                                  htmlFor="extension-date"
                                  className="text-xs text-muted-foreground uppercase tracking-wider"
                                >
                                  New End Date:
                                </Label>
                                <div className="flex flex-col space-y-2">
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full justify-start text-left font-normal",
                                          !date && "text-muted-foreground",
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Select date</span>}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                        disabled={(date) => date < new Date()}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                                  Additional Cost:
                                </Label>
                                <div className="text-base font-medium text-green-600 dark:text-green-400">
                                  {formatCurrency(additionalCost)}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="processing-notes" className="text-base font-medium">
                          Processing Notes
                        </Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Add any notes about this extension request. These notes will be visible to the pet owner.
                        </p>
                        <Textarea
                          id="processing-notes"
                          placeholder="Enter processing notes..."
                          value={processingNotes}
                          onChange={(e) => setProcessingNotes(e.target.value)}
                          rows={5}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grooming Service Section */}
              {request.type === "grooming" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Grooming Service Details</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      The following grooming service has been requested for {request.petName}.
                    </p>

                    <Card className="border-green-200 dark:border-green-800">
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                              Requested Service:
                            </Label>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 text-sm font-medium">
                              {request.groomingService?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) ||
                                selectedGroomingService.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </Badge>
                          </div>

                          <div className="flex justify-between items-center">
                            <Label className="text-xs text-muted-foreground uppercase tracking-wider">Pet Size:</Label>
                            <span className="text-base font-medium">{request.petSize}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                              Total Price:
                            </Label>
                            <span className="text-base font-medium text-green-600 dark:text-green-400">
                              {formatCurrency(calculatedPrice || request.price || 0)}
                            </span>
                          </div>
                        </div>

                        <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md">
                          <p className="text-xs text-amber-700 dark:text-amber-400">
                            Note: Grooming service details are predefined and cannot be modified. The price is
                            automatically calculated based on the service type and pet size.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Label htmlFor="processing-notes" className="text-base font-medium">
                      Processing Notes
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Add any notes about this grooming service. These notes will be visible to the pet owner.
                    </p>
                    <Textarea
                      id="processing-notes"
                      placeholder="Enter processing notes..."
                      value={processingNotes}
                      onChange={(e) => setProcessingNotes(e.target.value)}
                      rows={5}
                    />
                  </div>
                </div>
              )}

              {/* Custom/Other Request Section */}
              {(request.type === "custom" || request.type === "photo" || request.type === "video") && (
                <div>
                  <Label htmlFor="processing-notes" className="text-base font-medium">
                    Processing Notes
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Add any notes about this request. These notes will be visible to the pet owner.
                  </p>
                  <Textarea
                    id="processing-notes"
                    placeholder="Enter processing notes..."
                    value={processingNotes}
                    onChange={(e) => setProcessingNotes(e.target.value)}
                    rows={5}
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="p-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handleComplete} disabled={!isFormValid() || isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Complete Request"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

