"use client";

import type React from "react";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X, Trash2 } from "lucide-react";
import Image from "next/image";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {previewUrls.map((url, index) => (
          <div
            key={index}
            className="relative group border rounded-md overflow-hidden w-[120px] h-[120px]"
          >
            <Image
              src={url || "/placeholder.svg"}
              alt={`Preview ${index + 1}`}
              width={120}
              height={120}
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => onRemoveFile(index)}
              className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {previewUrls.length < maxFiles && (
          <button
            type="button"
            onClick={handleFileInputClick}
            className="flex flex-col items-center justify-center border border-dashed rounded-md w-[120px] h-[120px] text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
          >
            <Camera className="h-6 w-6 mb-2" />
            <span className="text-xs">Add Photo</span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onFileSelect}
        className="hidden"
      />

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {previewUrls.length} of {maxFiles} photos selected
        </div>
        {previewUrls.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRemoveAllFiles}
            className="text-destructive hover:text-destructive flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Remove All
          </Button>
        )}
      </div>
    </div>
  );
}
