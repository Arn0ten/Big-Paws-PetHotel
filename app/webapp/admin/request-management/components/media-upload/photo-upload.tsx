"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ImageIcon, Upload, Trash2, X, ChevronLeft, ChevronRight, Maximize, Minimize, Plus } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PhotoUploadProps {
  selectedFiles: File[]
  previewUrls: string[]
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (index: number) => void
  onRemoveAllFiles: () => void
  maxFiles?: number
}

export function PhotoUpload({
  selectedFiles,
  previewUrls,
  onFileSelect,
  onRemoveFile,
  onRemoveAllFiles,
  maxFiles = 5,
}: PhotoUploadProps) {
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Reset current preview index when files change
  useEffect(() => {
    if (selectedFiles.length === 0 || currentPreviewIndex >= selectedFiles.length) {
      setCurrentPreviewIndex(0)
    }
  }, [selectedFiles.length, currentPreviewIndex])

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

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

  // Validate image files only
  const validateImageFile = (file: File): boolean => {
    if (!file.type.startsWith("image/")) {
      return false
    }
    return true
  }

  // Handle file selection with validation
  const handlePhotoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)

      // Validate all files are images
      const invalidFiles = files.filter((file) => !validateImageFile(file))
      if (invalidFiles.length > 0) {
        setErrorMessage("Please select only image files.")
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
        return
      }

      // Check if adding these files would exceed the maximum
      const totalFiles = [...selectedFiles, ...files]
      if (totalFiles.length > maxFiles) {
        setErrorMessage(`You can upload a maximum of ${maxFiles} photos.`)
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)

        // Take only the first N files that would fit within the limit
        const availableSlots = maxFiles - selectedFiles.length
        const filesToAdd = files.slice(0, availableSlots)

        if (filesToAdd.length === 0) return

        // Create a new event with only the valid image files that fit
        const newEvent = {
          target: {
            files: filesToAdd,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>

        onFileSelect(newEvent)
        return
      }

      // All files are valid and within limits
      onFileSelect(e)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="photo-upload" className="text-base font-medium">
          Upload Photos
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Upload photos of the pet to share with the owner. You can upload up to {maxFiles} photos.
        </p>

        {showError && (
          <Alert variant="destructive" className="mb-3">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {selectedFiles.length === 0 ? (
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
            <Input
              id="photo-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoFileSelect}
              multiple={true} // Always allow multiple selection, but we'll handle the logic
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag and drop or click to upload photos (max {maxFiles})</p>
              <Button variant="outline" onClick={handleFileInputClick} className="mt-2">
                <Upload className="h-4 w-4 mr-2" />
                Select Photos
              </Button>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium">
                {selectedFiles.length > 1 ? `${selectedFiles.length} photos selected` : selectedFiles[0].name}
              </div>
              <div className="flex gap-2">
                {selectedFiles.length < maxFiles && (
                  <Button variant="outline" size="sm" onClick={handleFileInputClick}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add More
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={handleFileInputClick}>
                  <Upload className="h-3 w-3 mr-1" />
                  Replace
                </Button>
                <Button variant="outline" size="sm" onClick={onRemoveAllFiles}>
                  <Trash2 className="h-3 w-3 mr-1" />
                  Remove All
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

                    <img
                      src={previewUrls[currentPreviewIndex] || "/placeholder.svg?height=300&width=400"}
                      alt={`Preview ${currentPreviewIndex + 1}`}
                      className="max-h-[90vh] max-w-[90vw] object-contain"
                    />

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
                  <img
                    src={previewUrls[currentPreviewIndex] || "/placeholder.svg?height=300&width=400"}
                    alt={`Preview ${currentPreviewIndex + 1}`}
                    className="w-full h-[300px] object-contain bg-black/5"
                  />

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
                        onClick={() => onRemoveFile(currentPreviewIndex)}
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
                          src={url || "/placeholder.svg?height=64&width=64"}
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

            {/* Hidden input for file selection */}
            <Input
              id="photo-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoFileSelect}
              multiple={true} // Always allow multiple selection
            />
          </div>
        )}
      </div>
    </div>
  )
}

