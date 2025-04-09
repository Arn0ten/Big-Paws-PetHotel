"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, AlertCircle, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion } from "framer-motion"

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
  const [isDragging, setIsDragging] = useState(false)
  const [showLimitWarning, setShowLimitWarning] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Add state variables for fullscreen view inside the PhotoUpload component
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Add this function inside the PhotoUpload component
  const openFullscreen = (index: number) => {
    setCurrentPhotoIndex(index)
    setShowFullscreen(true)
  }

  // Add this function inside the PhotoUpload component
  const navigatePhotos = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentPhotoIndex((prev) => (prev === previewUrls.length - 1 ? 0 : prev + 1))
    } else {
      setCurrentPhotoIndex((prev) => (prev === 0 ? previewUrls.length - 1 : prev - 1))
    }
  }

  // Handle file input click
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      // Reset the file input value to ensure onChange fires even if selecting the same file
      if (fileInputRef.current.value) {
        fileInputRef.current.value = ""
      }
      fileInputRef.current.click()
    }
  }

  // Handle file selection with max limit enforcement
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Convert FileList to array
      const filesArray = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"))

      // Check if total would exceed max
      const totalFiles = selectedFiles.length + filesArray.length

      if (totalFiles > maxFiles) {
        // Show warning
        setShowLimitWarning(true)

        // Only take the first N files that would make the total = maxFiles
        const remainingSlots = maxFiles - selectedFiles.length
        const limitedFiles = filesArray.slice(0, remainingSlots)

        // Create a new event with limited files
        const newEvent = {
          target: {
            files: limitedFiles,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>

        // Pass to parent handler
        onFileSelect(newEvent)

        // Hide warning after 3 seconds
        setTimeout(() => setShowLimitWarning(false), 3000)
      } else {
        // No limit exceeded, pass all files
        onFileSelect(e)
      }
    }
  }

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Filter for image files
      const imageFiles = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))

      // Check if total would exceed max
      const totalFiles = selectedFiles.length + imageFiles.length

      if (totalFiles > maxFiles) {
        // Show warning
        setShowLimitWarning(true)

        // Only take the first N files that would make the total = maxFiles
        const remainingSlots = maxFiles - selectedFiles.length
        const limitedFiles = imageFiles.slice(0, remainingSlots)

        // Create a new event with limited files
        const event = {
          target: {
            files: limitedFiles,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>

        // Pass to parent handler
        onFileSelect(event)

        // Hide warning after 3 seconds
        setTimeout(() => setShowLimitWarning(false), 3000)
      } else {
        // No limit exceeded, pass all files
        const event = {
          target: {
            files: imageFiles,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>

        onFileSelect(event)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">Photo Upload</Label>
        <p className="text-sm text-muted-foreground mb-2">Upload photos of the pet (maximum {maxFiles} photos).</p>
      </div>

      {showLimitWarning && (
        <Alert
          variant="warning"
          className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mb-4"
        >
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-700 dark:text-amber-400">
            Maximum {maxFiles} photos allowed. Only the first {maxFiles} photos were selected.
          </AlertDescription>
        </Alert>
      )}

      {selectedFiles.length === 0 ? (
        <Card
          className={cn(
            "border-dashed border-2 transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-border",
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <CardContent className="flex flex-col items-center justify-center py-6">
            <input
              type="file"
              accept="image/*"
              multiple={maxFiles > 1}
              onChange={handleFileSelect}
              className="hidden"
              ref={fileInputRef}
            />
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-1">Drag and drop photos here or click to browse</p>
            <p className="text-xs text-muted-foreground text-center mb-4">
              JPG, PNG, or GIF format (max {maxFiles} photos)
            </p>
            <Button onClick={handleFileInputClick} className="mt-2">
              Select Photos
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-full overflow-hidden">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <div
                  className="relative aspect-square rounded-md overflow-hidden bg-muted/30 cursor-pointer"
                  onClick={() => openFullscreen(index)}
                >
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Improved hover overlay with centered buttons */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation() // Prevent opening fullscreen
                          onRemoveFile(index)
                        }}
                        className="bg-red-500/90 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                        aria-label="Remove photo"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation() // Prevent duplicate events
                          openFullscreen(index)
                        }}
                        className="bg-white/90 text-gray-800 p-1.5 rounded-full hover:bg-white transition-colors"
                        aria-label="View photo"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {selectedFiles[index]?.name || `Photo ${index + 1}`}
                </p>
              </div>
            ))}

            {/* Add More Photos button when fewer than max photos are selected */}
            {selectedFiles.length < maxFiles && (
              <div
                className="relative aspect-square rounded-md border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={handleFileInputClick}
              >
                <div className="flex flex-col items-center gap-1 p-4 text-center">
                  <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                  <span className="text-sm font-medium">Add More</span>
                  <span className="text-xs text-muted-foreground">{maxFiles - selectedFiles.length} remaining</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {selectedFiles.length} of {maxFiles} photos selected
            </p>
            <div className="flex gap-2">
              {selectedFiles.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRemoveAllFiles}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <X className="h-4 w-4 mr-1" /> Remove All
                </Button>
              )}
              {selectedFiles.length < maxFiles && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ""
                      fileInputRef.current.click()
                    }
                  }}
                  className="text-primary hover:text-primary-foreground hover:bg-primary"
                >
                  <Upload className="h-4 w-4 mr-1" /> Add Photos
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Fullscreen Photo Dialog */}
      <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
        <DialogContent className="p-0 max-w-[100vw] h-[100vh] border-none bg-transparent shadow-none">
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
            {/* Close button */}
            <button
              className="fixed top-4 right-4 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
              onClick={() => setShowFullscreen(false)}
              aria-label="Close fullscreen view"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation buttons */}
            {previewUrls.length > 1 && (
              <>
                <button
                  className="fixed left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
                  onClick={() => navigatePhotos("prev")}
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  className="fixed right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
                  onClick={() => navigatePhotos("next")}
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Photo container with animation */}
            <motion.div
              className="relative w-full max-w-4xl h-full flex items-center justify-center p-4 group"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              key={currentPhotoIndex} // Re-render animation when photo changes
            >
              <img
                src={previewUrls[currentPhotoIndex] || "/placeholder.svg"}
                alt={`Photo ${currentPhotoIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Photo counter */}
              {previewUrls.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  {currentPhotoIndex + 1} / {previewUrls.length}
                </div>
              )}
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
