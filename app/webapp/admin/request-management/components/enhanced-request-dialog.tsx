"use client"

import { DialogFooter } from "@/components/ui/dialog"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addDays, addHours, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon, Clock, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "../utils/helpers"
import { useMediaQuery } from "@/hooks/use-media-query"
import { PhotoUpload } from "./media-upload/photo-upload"
import { VideoUpload } from "./media-upload/video-upload"

interface EnhancedRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: any
  onComplete: () => void
  isProcessing: boolean
  activeTab: string
  setActiveTab: (tab: string) => void
  selectedFiles: File[]
  previewUrls: string[]
  handleMultipleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRemoveSelectedFile: (index: number) => void
}

/**
 * Enhanced Request Dialog Component
 *
 * BACKEND INTEGRATION NOTES:
 *
 * 1. File Upload:
 *    - This component handles file selection and preview
 *    - The actual upload happens in the parent component's handleCompleteRequest function
 *    - Ensure the backend can handle multiple file uploads via multipart/form-data
 *
 * 2. Form Data:
 *    - processingNotes: Text notes about the request processing
 *    - selectedFiles: Array of File objects to be uploaded
 *    - extensionDate: Date object for boarding extensions
 *    - selectedGroomingService: String ID of the selected grooming service
 *    - selectedAudioUrl: URL of the selected background audio for videos
 *
 * 3. Validation:
 *    - Add server-side validation for all form inputs
 *    - Ensure file types, sizes, and video duration are validated on both client and server
 */
// Fix dialog responsiveness and ensure audio stops when dialog closes
export function EnhancedRequestDialog({
  open,
  onOpenChange,
  request,
  onComplete,
  isProcessing,
  activeTab,
  setActiveTab,
  selectedFiles,
  previewUrls,
  handleMultipleFileSelect,
  handleRemoveSelectedFile,
}: EnhancedRequestDialogProps) {
  // State for handling multiple files
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)
  const [selectedAudioUrl, setSelectedAudioUrl] = useState<string | null>(null)

  // Other state variables
  const [processingNotes, setProcessingNotes] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedGroomingService, setSelectedGroomingService] = useState("premium-wash-and-cut")
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null)
  const [isHourExtension, setIsHourExtension] = useState(false)
  const [newEndDate, setNewEndDate] = useState<Date | undefined>(undefined)
  const [newEndTime, setNewEndTime] = useState<string>("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [extensionDate, setExtensionDate] = useState<Date | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Reset state when dialog opens/closes or request changes
  useEffect(() => {
    if (open && request) {
      setProcessingNotes("")
      setVideoFile(null)
      setVideoPreviewUrl(null)
      setSelectedAudioUrl(null)
      setExtensionDate(undefined)

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

      // Set default extension date if available
      if (request.type === "boarding-extension" && request.currentEndDate) {
        // Calculate a default extension date (current end date + requested extension)
        const currentEndDate = new Date(request.currentEndDate)
        if (request.extensionDetails) {
          const { duration, unit } = request.extensionDetails
          if (unit === "days") {
            currentEndDate.setDate(currentEndDate.getDate() + Number.parseInt(duration))
          } else if (unit === "weeks") {
            currentEndDate.setDate(currentEndDate.getDate() + Number.parseInt(duration) * 7)
          } else if (unit === "hours") {
            currentEndDate.setHours(currentEndDate.getHours() + Number.parseInt(duration))
          }
          setExtensionDate(currentEndDate)
        }
      }
    } else if (!open) {
      // Clean up audio and video when dialog closes
      if (videoRef.current) {
        videoRef.current.pause()
      }
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [open, request])

  // Handle photo file selection
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"))

      if (files.length === 0) return

      // Pass the files to parent component
      const event = {
        target: {
          files: files,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>

      handleMultipleFileSelect(event)
    }
  }

  // Handle video file selection
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Validate file type
      if (!file.type.startsWith("video/")) {
        alert("Please select a valid video file")
        return
      }

      // Create preview URL
      const url = URL.createObjectURL(file)
      setVideoFile(file)
      setVideoPreviewUrl(url)

      // Also update the parent component's state for form submission
      const event = {
        target: {
          files: [file],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>

      handleMultipleFileSelect(event)
    }
  }

  // Remove all photo files
  const handleRemoveAllPhotos = () => {
    // Clean up preview URLs
    previewUrls.forEach((url) => URL.revokeObjectURL(url))

    // Reset state
    const event = {
      target: {
        files: [],
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>

    handleMultipleFileSelect(event)
  }

  // Remove video file
  const handleRemoveVideo = () => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl)
    }

    setVideoFile(null)
    setVideoPreviewUrl(null)
    setSelectedAudioUrl(null)

    // Also update the parent component's state
    const event = {
      target: {
        files: [],
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>

    handleMultipleFileSelect(event)
  }

  // Handle audio selection for video
  const handleAudioSelect = (audioUrl: string | null) => {
    setSelectedAudioUrl(audioUrl)
  }

  // Validate form before submission
  const isFormValid = () => {
    if (!request) return false

    // For photo/video requests, a file must be selected
    if (request.type === "photo" && selectedFiles.length === 0) {
      return false
    }

    if (request.type === "video") {
      // Must have a video file
      if (!videoFile) return false

      // Video must be valid duration
      if (videoRef.current && videoRef.current.duration > 60) return false
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

    // Add the processing notes and audio selection to the request object
    const updatedRequest = {
      ...request,
      processingNotes: processingNotes,
      selectedAudioUrl: selectedAudioUrl,
    }

    // Call the onComplete callback with the updated request
    onComplete()
  }

  // Cleanup function to stop audio and video when dialog closes
  useEffect(() => {
    return () => {
      // Stop audio and video playback when component unmounts
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (videoRef.current) {
        videoRef.current.pause()
      }

      // Clean up preview URLs
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl)
      }
    }
  }, [])

  // Handle file input click
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Determine if the complete button should be disabled
  const isCompleteDisabled = () => {
    if (isProcessing) return true

    // For photo and video requests, require at least one file
    if ((request?.type === "photo" || request?.type === "video") && selectedFiles.length === 0) {
      return true
    }

    // For boarding extensions, require an extension date
    if (request?.type === "boarding-extension" && !extensionDate) {
      return true
    }

    return false
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
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        // Stop audio and video when dialog closes
        if (!isOpen) {
          if (videoRef.current) {
            videoRef.current.pause()
          }
          if (audioRef.current) {
            audioRef.current.pause()
          }
        }
        onOpenChange(isOpen)
      }}
    >
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 max-w-[95vw] w-full">
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
            <div className="space-y-4 max-w-full overflow-x-hidden">
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

          <TabsContent value="process" className="px-4 sm:px-6 pt-4 overflow-hidden">
            <div className="space-y-6 w-full">
              {/* Photo Upload Section */}
              {request.type === "photo" && (
                <PhotoUpload
                  selectedFiles={selectedFiles}
                  previewUrls={previewUrls}
                  onFileSelect={handlePhotoSelect}
                  onRemoveFile={handleRemoveSelectedFile}
                  onRemoveAllFiles={handleRemoveAllPhotos}
                  maxFiles={5}
                />
              )}

              {/* Video Upload Section */}
              {request.type === "video" && (
                <VideoUpload
                  selectedFile={videoFile}
                  previewUrl={videoPreviewUrl}
                  onFileSelect={handleVideoSelect}
                  onRemoveFile={handleRemoveVideo}
                  maxDuration={60}
                  onAudioSelect={handleAudioSelect}
                />
              )}

              {/* Boarding Extension Section */}
              {request.type === "boarding-extension" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <div className="text-base font-medium break-words">{formattedCurrentEndDate}</div>
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
                                <div className="text-base font-medium break-words">{formattedNewEndDate}</div>
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
                          <div className="flex flex-wrap justify-between items-center gap-2">
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

