"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, ImageIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Handle file input click
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
      // Create a synthetic event to pass to the onFileSelect handler
      const event = {
        target: {
          files: e.dataTransfer.files,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onFileSelect(event);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">Photo Upload</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Upload photos of the pet (maximum {maxFiles} photos).
        </p>
      </div>

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
              multiple
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-full overflow-hidden">
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
                onClick={handleFileInputClick}
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
                disabled={selectedFiles.length >= maxFiles}
              >
                <Upload className="h-4 w-4 mr-1" /> Add More
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
