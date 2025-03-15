"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { MediaPreview } from "./media-preview"
import { Camera, Video, Scissors, Clock, FileText, Upload, AlertCircle, Info, Check, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { v4 as uuidv4 } from "uuid"

interface MediaFile {
  file: File
  url: string
  id: string
}

interface RequestFormProps {
  onSubmit: (data: any) => void
  isSubmitting?: boolean
  petName?: string
  petSize?: string
}

export function RequestForm({ onSubmit, isSubmitting = false, petName = "", petSize = "Medium" }: RequestFormProps) {
  const [requestType, setRequestType] = useState<string>("photo")
  const [description, setDescription] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [groomingService, setGroomingService] = useState("premium-wash-and-cut")
  const [extensionDuration, setExtensionDuration] = useState("1")
  const [extensionUnit, setExtensionUnit] = useState<"hours" | "days">("days")
  const [showInfoDialog, setShowInfoDialog] = useState(false)
  const [infoDialogContent, setInfoDialogContent] = useState({ title: "", content: "" })
  const [error, setError] = useState<string | null>(null)

  const photoInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Reset form when request type changes
  useEffect(() => {
    setMediaFiles([])
    setDescription("")
    setError(null)
  }, [requestType])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const files = Array.from(e.target.files)

    if (requestType === "photo") {
      // Check if adding these files would exceed the limit
      if (files.length + mediaFiles.length > 5) {
        setError(`You can only upload up to 5 photos. Please select ${5 - mediaFiles.length} or fewer.`)
        return
      }

      // Process photo files
      const newMediaFiles = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        id: uuidv4(),
      }))

      setMediaFiles((prev) => [...prev, ...newMediaFiles])
      setError(null)
    } else if (requestType === "video") {
      // Only use the first video file
      const file = files[0]

      // Create a video element to check duration
      const video = document.createElement("video")
      video.preload = "metadata"

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src)

        if (video.duration > 60) {
          setError("Video is too long. Maximum duration is 60 seconds.")
          return
        }

        const newMediaFile = {
          file,
          url: URL.createObjectURL(file),
          id: uuidv4(),
        }

        setMediaFiles([newMediaFile])
        setError(null)
      }

      video.src = URL.createObjectURL(file)
    }

    // Reset the input
    e.target.value = ""
  }

  const handleRemoveFile = (index: number) => {
    setMediaFiles((prev) => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].url)
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const handleAddMore = () => {
    if (photoInputRef.current) {
      photoInputRef.current.click()
    }
  }

  const handleReplace = () => {
    if (requestType === "photo" && photoInputRef.current) {
      setMediaFiles([])
      photoInputRef.current.click()
    } else if (requestType === "video" && videoInputRef.current) {
      setMediaFiles([])
      videoInputRef.current.click()
    }
  }

  const handleSubmit = () => {
    // Validate form
    if (description.trim() === "") {
      setError("Please provide a description for your request.")
      return
    }

    if (mediaFiles.length === 0 && (requestType === "photo" || requestType === "video")) {
      setError(`Please upload at least one ${requestType === "photo" ? "photo" : "video"}.`)
      return
    }

    // Prepare data for submission
    const requestData = {
      type: requestType,
      description,
      isUrgent,
      petName,
      petSize,
      ...(requestType === "photo" && { photos: mediaFiles }),
      ...(requestType === "video" && { video: mediaFiles[0] }),
      ...(requestType === "grooming" && { groomingService }),
      ...(requestType === "boarding-extension" && {
        extensionDetails: {
          duration: extensionDuration,
          unit: extensionUnit,
        },
      }),
    }

    onSubmit(requestData)
  }

  const showInfo = (title: string, content: string) => {
    setInfoDialogContent({ title, content })
    setShowInfoDialog(true)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>New Request</span>
          {petName && <Badge variant="outline">{petName}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Request Type Selection */}
        <div className="space-y-2">
          <Label>Request Type</Label>
          <Tabs defaultValue="photo" value={requestType} onValueChange={setRequestType} className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="photo" className="flex items-center gap-1">
                <Camera className="h-4 w-4" />
                <span className="hidden sm:inline">Photo</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">Video</span>
              </TabsTrigger>
              <TabsTrigger value="grooming" className="flex items-center gap-1">
                <Scissors className="h-4 w-4" />
                <span className="hidden sm:inline">Grooming</span>
              </TabsTrigger>
              <TabsTrigger value="boarding-extension" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Extension</span>
              </TabsTrigger>
              <TabsTrigger value="custom" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Custom</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photo" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="photo-upload" className="text-base font-medium">
                    Upload Photos
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      showInfo(
                        "Photo Requests",
                        "Upload up to 5 photos of your pet. Our staff will take new photos of your pet and send them to you.",
                      )
                    }
                    className="h-8 w-8 p-0"
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Learn more about photo requests</span>
                  </Button>
                </div>

                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="photo-upload"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                      mediaFiles.length > 0
                        ? "bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-800"
                        : "bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/50 border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {mediaFiles.length > 0 ? (
                        <Check className="w-8 h-8 mb-2 text-green-500" />
                      ) : (
                        <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                      )}
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 10MB each)</p>
                    </div>
                    <input
                      id="photo-upload"
                      ref={photoInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>

                {mediaFiles.length > 0 && (
                  <MediaPreview
                    files={mediaFiles}
                    onRemove={handleRemoveFile}
                    onReplace={handleReplace}
                    onAddMore={handleAddMore}
                    type="photo"
                    maxFiles={5}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="video" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="video-upload" className="text-base font-medium">
                    Upload Video
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      showInfo(
                        "Video Requests",
                        "Upload a video sample (max 1 minute). Our staff will take a new video of your pet and send it to you.",
                      )
                    }
                    className="h-8 w-8 p-0"
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Learn more about video requests</span>
                  </Button>
                </div>

                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="video-upload"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                      mediaFiles.length > 0
                        ? "bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-800"
                        : "bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/50 border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {mediaFiles.length > 0 ? (
                        <Check className="w-8 h-8 mb-2 text-green-500" />
                      ) : (
                        <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                      )}
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">MP4, MOV or AVI (MAX. 100MB, 1 minute)</p>
                    </div>
                    <input
                      id="video-upload"
                      ref={videoInputRef}
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>

                {mediaFiles.length > 0 && (
                  <MediaPreview
                    files={mediaFiles}
                    onRemove={handleRemoveFile}
                    onReplace={handleReplace}
                    type="video"
                    maxVideoDuration={60}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="grooming" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="grooming-service" className="text-base font-medium">
                    Grooming Service
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      showInfo(
                        "Grooming Services",
                        "Request a grooming service for your pet. Additional charges will apply based on the service and pet size.",
                      )
                    }
                    className="h-8 w-8 p-0"
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Learn more about grooming services</span>
                  </Button>
                </div>

                <Select value={groomingService} onValueChange={setGroomingService}>
                  <SelectTrigger id="grooming-service">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic-wash">Basic Wash (₱180-₱320)</SelectItem>
                    <SelectItem value="premium-wash">Premium Wash (₱300-₱850)</SelectItem>
                    <SelectItem value="premium-wash-and-cut">Premium Wash & Cut (₱450-₱850)</SelectItem>
                    <SelectItem value="full-grooming">Full Grooming (₱500-₱800)</SelectItem>
                  </SelectContent>
                </Select>

                <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md">
                  <div className="flex items-center text-sm text-green-800 dark:text-green-300">
                    <Info className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p>
                      Price varies based on pet size and specific needs. Final price will be confirmed by our staff.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="boarding-extension" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Extension Details</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      showInfo(
                        "Boarding Extensions",
                        "Request to extend your pet's current boarding stay. Additional charges will apply based on the extension duration and pet size.",
                      )
                    }
                    className="h-8 w-8 p-0"
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Learn more about boarding extensions</span>
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="extension-duration">Duration</Label>
                    <Input
                      id="extension-duration"
                      type="number"
                      min="1"
                      max={extensionUnit === "hours" ? "24" : "30"}
                      value={extensionDuration}
                      onChange={(e) => setExtensionDuration(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="extension-unit">Unit</Label>
                    <Select
                      value={extensionUnit}
                      onValueChange={(value) => setExtensionUnit(value as "hours" | "days")}
                    >
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

                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md">
                  <div className="flex items-center text-sm text-amber-800 dark:text-amber-300">
                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p>
                      Extension requests are subject to availability. Our staff will confirm if the extension is
                      possible.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Custom Request</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      showInfo(
                        "Custom Requests",
                        "Have a special request not covered by our standard options? Let us know what you need, and our staff will do their best to accommodate.",
                      )
                    }
                    className="h-8 w-8 p-0"
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Learn more about custom requests</span>
                  </Button>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <div className="flex items-center text-sm text-blue-800 dark:text-blue-300">
                    <Info className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p>
                      Please provide as much detail as possible about your request. Additional charges may apply
                      depending on the nature of the request.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Please provide details about your request..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Urgent Toggle */}
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="urgent" className="flex items-center gap-2">
            Mark as Urgent
            <Badge variant="outline" className="ml-2">
              Priority Processing
            </Badge>
          </Label>
          <Switch id="urgent" checked={isUrgent} onCheckedChange={setIsUrgent} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md">
            <div className="flex items-center text-sm text-red-800 dark:text-red-300">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <p>{error}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Request"
          )}
        </Button>
      </CardFooter>

      {/* Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{infoDialogContent.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">{infoDialogContent.content}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowInfoDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

