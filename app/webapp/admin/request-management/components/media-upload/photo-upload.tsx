"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, ImageIcon, AlertCircle } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PhotoUploadProps {
  selectedFiles: File[];
  previewUrls: string[];
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  onRemoveAllFiles: () => void;
  maxFiles?: number;
}

export function PhotoUpload({
  selectedFiles,
  previewUrls,
  onFileSelect,
  onRemoveFile,
  onRemoveAllFiles,
  maxFiles = 5,
}: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Handle file input click
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      // Reset the file input value to ensure onChange fires even if selecting the same file
      if (fileInputRef.current.value) {
        fileInputRef.current.value = "";
      }
      fileInputRef.current.click();
    }
  };

  // Handle file selection with max limit enforcement
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Convert FileList to array
      const filesArray = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/"),
      );

      // Check if total would exceed max
      const totalFiles = selectedFiles.length + filesArray.length;

      if (totalFiles > maxFiles) {
        // Show warning
        setShowLimitWarning(true);

        // Only take the first N files that would make the total = maxFiles
        const remainingSlots = maxFiles - selectedFiles.length;
        const limitedFiles = filesArray.slice(0, remainingSlots);

        // Create a new event with limited files
        const newEvent = {
          target: {
            files: limitedFiles,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        // Pass to parent handler
        onFileSelect(newEvent);

        // Hide warning after 3 seconds
        setTimeout(() => setShowLimitWarning(false), 3000);
      } else {
        // No limit exceeded, pass all files
        onFileSelect(e);
      }
    }
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Filter for image files
      const imageFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/"),
      );

      // Check if total would exceed max
      const totalFiles = selectedFiles.length + imageFiles.length;

      if (totalFiles > maxFiles) {
        // Show warning
        setShowLimitWarning(true);

        // Only take the first N files that would make the total = maxFiles
        const remainingSlots = maxFiles - selectedFiles.length;
        const limitedFiles = imageFiles.slice(0, remainingSlots);

        // Create a new event with limited files
        const event = {
          target: {
            files: limitedFiles,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        // Pass to parent handler
        onFileSelect(event);

        // Hide warning after 3 seconds
        setTimeout(() => setShowLimitWarning(false), 3000);
      } else {
        // No limit exceeded, pass all files
        const event = {
          target: {
            files: imageFiles,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        onFileSelect(event);
      }
    }
  };

  // Handle adding more photos
  const handleAddMorePhotos = () => {
    handleFileInputClick();
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">Photo Upload</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Upload photos of the pet (maximum {maxFiles} photos).
        </p>
      </div>

      {showLimitWarning && (
        <Alert
          variant="warning"
          className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mb-4"
        >
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-700 dark:text-amber-400">
            Maximum {maxFiles} photos allowed. Only the first {maxFiles} photos
            were selected.
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
              onChange={onFileSelect}
              className="hidden"
              ref={fileInputRef}
            />
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-1">
              Drag and drop photos here or click to browse
            </p>
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
                <div className="relative aspect-square rounded-md overflow-hidden bg-muted/30">
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveFile(index)}
                    className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {selectedFiles[index]?.name || `Photo ${index + 1}`}
                </p>
              </div>
            ))}

            {selectedFiles.length < maxFiles && (
              <div
                className="relative aspect-square rounded-md overflow-hidden bg-muted/30 border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={handleAddMorePhotos}
              >
                <ImageIcon className="h-6 w-6 text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Add More</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {selectedFiles.length} of {maxFiles} photos selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onRemoveAllFiles}>
                <X className="h-4 w-4 mr-1" /> Remove All
              </Button>
              <Button
                size="sm"
                onClick={handleFileInputClick}
                className="w-full sm:w-auto"
                disabled={selectedFiles.length >= maxFiles}
              >
                <Upload className="h-4 w-4 mr-1" /> Replace
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
