"use client";

import { DialogFooter } from "@/components/ui/dialog";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, addDays, addHours, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  Clock,
  Loader2,
  Camera,
  Video,
  Scissors,
  ClipboardList,
  Info,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Play,
  Pause,
  Music,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "../utils/helpers";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PhotoUpload } from "./media-upload/photo-upload";
import { VideoUpload } from "./media-upload/video-upload";
import { Progress } from "@/components/ui/progress";
import { NoteGenerator } from "./note-generator";

// Define fallback rate constants if they're not imported
const BOARDING_RATES = {
  hourly: {
    Small: 5,
    Medium: 7,
    Large: 10,
    XLarge: 12,
  },
  daily: {
    Small: 30,
    Medium: 40,
    Large: 50,
    XLarge: 60,
  },
};

const GROOMING_RATES = {
  "basic-wash": {
    Small: 25,
    Medium: 35,
    Large: 45,
    XLarge: 55,
  },
  "premium-wash-and-cut": {
    Small: 40,
    Medium: 50,
    Large: 60,
    XLarge: 70,
  },
  "deluxe-spa-package": {
    Small: 60,
    Medium: 75,
    Large: 90,
    XLarge: 105,
  },
};

interface EnhancedRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: any;
  onComplete: () => void;
  isProcessing: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedFiles: File[];
  previewUrls: string[];
  handleMultipleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveSelectedFile: (index: number) => void;
}

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
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [selectedAudioUrl, setSelectedAudioUrl] = useState<string | null>(null);
  const [selectedAudioName, setSelectedAudioName] = useState<string | null>(
    null,
  );
  const [audioMerged, setAudioMerged] = useState(false);
  const [mergedVideoUrl, setMergedVideoUrl] = useState<string | null>(null);
  const [processingNotes, setProcessingNotes] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedGroomingService, setSelectedGroomingService] = useState(
    "premium-wash-and-cut",
  );
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [isHourExtension, setIsHourExtension] = useState(false);
  const [newEndDate, setNewEndDate] = useState<Date | undefined>(undefined);
  const [newEndTime, setNewEndTime] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [extensionDate, setExtensionDate] = useState<Date | undefined>(
    undefined,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Reset state when dialog opens/closes or request changes
  useEffect(() => {
    if (open && request) {
      setProcessingNotes("");
      setVideoFile(null);
      setVideoPreviewUrl(null);
      setSelectedAudioUrl(null);
      setSelectedAudioName(null);
      setExtensionDate(undefined);
      setAudioMerged(false);
      setMergedVideoUrl(null);
      setCurrentStep(0);

      // Check if this is an hour extension
      if (request.type === "boarding-extension" && request.extensionDetails) {
        setIsHourExtension(request.extensionDetails.unit === "hours");

        // Calculate new end date based on extension details
        if (request.currentEndDate) {
          const currentEndDate = parseISO(request.currentEndDate);
          let calculatedEndDate: Date;

          if (request.extensionDetails.unit === "hours") {
            calculatedEndDate = addHours(
              currentEndDate,
              Number.parseInt(request.extensionDetails.duration),
            );
          } else {
            calculatedEndDate = addDays(
              currentEndDate,
              Number.parseInt(request.extensionDetails.duration),
            );
          }

          setDate(calculatedEndDate);
          setNewEndDate(calculatedEndDate);
          setNewEndTime(format(calculatedEndDate, "HH:mm"));
        }
      } else {
        setIsHourExtension(false);
      }

      // Set default grooming service if available
      if (request.type === "grooming" && request.groomingService) {
        setSelectedGroomingService(request.groomingService);
      } else {
        setSelectedGroomingService("premium-wash-and-cut");
      }

      // Set default extension date if available
      if (request.type === "boarding-extension" && request.currentEndDate) {
        // Calculate a default extension date (current end date + requested extension)
        const currentEndDate = new Date(request.currentEndDate);
        if (request.extensionDetails) {
          const { duration, unit } = request.extensionDetails;
          if (unit === "days") {
            currentEndDate.setDate(
              currentEndDate.getDate() + Number.parseInt(duration),
            );
          } else if (unit === "weeks") {
            currentEndDate.setDate(
              currentEndDate.getDate() + Number.parseInt(duration) * 7,
            );
          } else if (unit === "hours") {
            currentEndDate.setHours(
              currentEndDate.getHours() + Number.parseInt(duration),
            );
          }
          setExtensionDate(currentEndDate);
        }
      }
    } else if (!open) {
      // Clean up audio and video when dialog closes
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Clear all media-related state to prevent persistence
      setVideoFile(null);
      setVideoPreviewUrl(null);
      setSelectedAudioUrl(null);
      setSelectedAudioName(null);

      // Clear selected files using the parent's handler function
      const event = {
        target: {
          files: [],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleMultipleFileSelect(event);

      // Clean up merged video URL if it exists
      if (mergedVideoUrl) {
        URL.revokeObjectURL(mergedVideoUrl);
        setMergedVideoUrl(null);
      }
    }
  }, [open, request]);

  // Update play state when video plays/pauses
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [videoRef.current]);

  // Handle photo file selection with max limit enforcement
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/"),
      );

      // Limit to max 5 photos
      const limitedFiles = files.slice(0, 5);

      if (limitedFiles.length === 0) return;

      // Pass the files to parent component
      const event = {
        target: {
          files: limitedFiles,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleMultipleFileSelect(event);
    }
  };

  // Handle video file selection
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith("video/")) {
        alert("Please select a valid video file");
        return;
      }

      // Create a temporary video element to check duration
      const tempVideo = document.createElement("video");
      tempVideo.preload = "metadata";

      tempVideo.onloadedmetadata = () => {
        // Check if video exceeds maximum duration
        if (tempVideo.duration > 60) {
          alert(
            "Video exceeds maximum duration of 60 seconds. Please select a shorter video.",
          );

          // Revoke the temporary URL
          URL.revokeObjectURL(tempVideo.src);

          // Reset the file input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }

          return;
        }

        // If duration is valid, set the video
        const url = URL.createObjectURL(file);

        // If there was a previous video, clean it up
        if (videoPreviewUrl) {
          URL.revokeObjectURL(videoPreviewUrl);
        }

        setVideoFile(file);
        setVideoPreviewUrl(url);

        // Also update the parent component's state for form submission
        const event = {
          target: {
            files: [file],
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        handleMultipleFileSelect(event);

        // Revoke the temporary URL
        URL.revokeObjectURL(tempVideo.src);
      };

      tempVideo.onerror = () => {
        alert("Error loading video. Please try another file.");

        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };

      // Set the source to check metadata
      tempVideo.src = URL.createObjectURL(file);
    }
  };

  // Remove all photo files
  const handleRemoveAllPhotos = () => {
    // Clean up preview URLs
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    // Reset state
    const event = {
      target: {
        files: [],
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleMultipleFileSelect(event);
  };

  // Remove video file
  const handleRemoveVideo = () => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }

    setVideoFile(null);
    setVideoPreviewUrl(null);
    setSelectedAudioUrl(null);
    setSelectedAudioName(null);
    setAudioMerged(false);

    // Also update the parent component's state
    const event = {
      target: {
        files: [],
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleMultipleFileSelect(event);
  };

  // Handle audio selection for video
  const handleAudioSelect = (
    audioUrl: string | null,
    audioName: string | null,
  ) => {
    setSelectedAudioUrl(audioUrl);
    setSelectedAudioName(audioName);

    // Reset merged state when new audio is selected
    if (audioUrl !== selectedAudioUrl) {
      setAudioMerged(false);
    }
  };

  // Validate form before submission
  const isFormValid = () => {
    if (!request) return false;

    // For photo/video requests, a file must be selected
    if (request.type === "photo" && selectedFiles.length === 0) {
      return false;
    }

    if (request.type === "video") {
      // Must have a video file
      if (!videoFile) return false;

      // Video must be valid duration
      if (videoRef.current && videoRef.current.duration > 60) return false;
    }

    // For boarding extensions, a date must be selected
    if (request.type === "boarding-extension" && !date) {
      return false;
    }

    // For grooming, a service must be selected
    if (request.type === "grooming" && !selectedGroomingService) {
      return false;
    }

    // Photos for grooming are optional, so we don't need to validate them here

    // Processing notes are optional but recommended
    return true;
  };

  // Handle form submission
  const handleComplete = () => {
    if (isProcessing) return;

    // Add the processing notes and audio selection to the request object
    const updatedRequest = {
      ...request,
      processingNotes: processingNotes,
      selectedAudioUrl: selectedAudioUrl,
      selectedAudioName: selectedAudioName,
      // Include the merged video URL if available
      mergedVideoUrl: mergedVideoUrl,
      audioMerged: audioMerged,
      // Add a flag to indicate that the audio should replace the original
      replaceOriginalAudio:
        !!selectedAudioUrl && (audioMerged || request.type === "video"),
    };

    // Call the onComplete callback with the updated request
    onComplete();
  };

  // Cleanup function to stop audio and video when dialog closes
  useEffect(() => {
    return () => {
      // Stop audio and video playback when component unmounts
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current.src = "";
        } catch (e) {
          console.error("Error cleaning up audio:", e);
        }
      }
      if (videoRef.current) {
        try {
          videoRef.current.pause();
          videoRef.current.src = "";
        } catch (e) {
          console.error("Error cleaning up video:", e);
        }
      }

      // Clean up preview URLs
      if (videoPreviewUrl) {
        try {
          URL.revokeObjectURL(videoPreviewUrl);
        } catch (e) {
          console.error("Error revoking URL:", e);
        }
      }
    };
  }, [videoPreviewUrl]);

  // Handle file input click
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Determine if the complete button should be disabled
  const isCompleteDisabled = () => {
    if (isProcessing) return true;

    // For photo and video requests, require at least one file
    if (
      (request?.type === "photo" || request?.type === "video") &&
      selectedFiles.length === 0
    ) {
      return true;
    }

    // For boarding extensions, require an extension date
    if (request?.type === "boarding-extension" && !extensionDate) {
      return true;
    }

    return false;
  };

  if (!request) return null;

  // Determine if this is a boarding extension request
  const isBoardingExtension = request.type === "boarding-extension";

  // Format the current end date for display
  const formattedCurrentEndDate = request.currentEndDate
    ? `${formatDate(request.currentEndDate)}`
    : "Not specified";

  // Update the formattedNewEndDate to match the same format
  const formattedNewEndDate = date
    ? `${formatDate(date.toISOString())}`
    : "Not specified";

  // Calculate additional cost
  const calculateAdditionalCost = () => {
    if (!request) return 0;

    const petSize = request.petSize || "Medium"; // Default to Medium if size is not specified

    if (request.type === "boarding-extension" && request.extensionDetails) {
      const { duration, unit } = request.extensionDetails;
      const rate =
        unit === "hours"
          ? BOARDING_RATES.hourly[petSize] || BOARDING_RATES.hourly.Medium
          : BOARDING_RATES.daily[petSize] || BOARDING_RATES.daily.Medium;
      return rate * Number(duration || 1);
    } else if (request.type === "grooming" && request.groomingService) {
      const service = request.groomingService;
      const serviceRates =
        GROOMING_RATES[service] || GROOMING_RATES["basic-wash"];
      return serviceRates[petSize] || serviceRates.Medium;
    }
    return request.price || 0;
  };

  const additionalCost =
    request.price || calculatedPrice || calculateAdditionalCost();

  // Format the extension requested
  const formattedExtensionRequested = request.extensionDetails
    ? `${request.extensionDetails.duration} ${request.extensionDetails.unit}`
    : "Not specified";

  // Get the appropriate icon for the request type
  const getRequestTypeIcon = () => {
    switch (request.type) {
      case "photo":
        return <Camera className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "grooming":
        return <Scissors className="h-5 w-5" />;
      case "boarding-extension":
        return <Clock className="h-5 w-5" />;
      default:
        return <ClipboardList className="h-5 w-5" />;
    }
  };

  // Get the appropriate color class for the request type
  const getRequestTypeColorClass = () => {
    switch (request.type) {
      case "photo":
        return "text-blue-600 dark:text-blue-400";
      case "video":
        return "text-purple-600 dark:text-purple-400";
      case "grooming":
        return "text-green-600 dark:text-green-400";
      case "boarding-extension":
        return "text-amber-600 dark:text-amber-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  // Get the appropriate background color class for the request type
  const getRequestTypeBgClass = () => {
    switch (request.type) {
      case "photo":
        return "bg-blue-50 dark:bg-blue-950/20";
      case "video":
        return "bg-purple-50 dark:bg-purple-950/20";
      case "grooming":
        return "bg-green-50 dark:bg-green-950/20";
      case "boarding-extension":
        return "bg-amber-50 dark:bg-amber-950/20";
      default:
        return "bg-gray-50 dark:bg-gray-950/20";
    }
  };

  // Get the appropriate border color class for the request type
  const getRequestTypeBorderClass = () => {
    switch (request.type) {
      case "photo":
        return "border-blue-200 dark:border-blue-800";
      case "video":
        return "border-purple-200 dark:border-purple-800";
      case "grooming":
        return "border-green-200 dark:border-green-800";
      case "boarding-extension":
        return "border-amber-200 dark:border-amber-800";
      default:
        return "border-gray-200 dark:border-gray-800";
    }
  };

  // Get the steps for the current request type
  const getSteps = () => {
    switch (request.type) {
      case "photo":
        return ["Review Request", "Upload Photos", "Add Notes", "Complete"];
      case "video":
        return ["Review Request", "Upload Video", "Add Notes", "Complete"];
      case "grooming":
        return [
          "Review Request",
          "Confirm Service",
          "Upload Photos",
          "Add Notes",
          "Complete",
        ];
      case "boarding-extension":
        return ["Review Request", "Confirm Extension", "Add Notes", "Complete"];
      default:
        return ["Review Request", "Process", "Complete"];
    }
  };

  const steps = getSteps();
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Determine if we can go to the next step
  const canGoNext = () => {
    if (currentStep === steps.length - 1) return false;

    // For photo upload step
    if (
      request.type === "photo" &&
      currentStep === 1 &&
      selectedFiles.length === 0
    ) {
      return false;
    }

    // For video upload step
    if (request.type === "video" && currentStep === 1 && !videoFile) {
      return false;
    }

    // For boarding extension confirmation step
    if (request.type === "boarding-extension" && currentStep === 1 && !date) {
      return false;
    }

    return true;
  };

  // Determine if we can complete the request
  const canComplete = () => {
    return currentStep === steps.length - 1 && isFormValid();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        // Stop audio and video when dialog closes
        if (!isOpen) {
          if (videoRef.current) {
            try {
              videoRef.current.pause();
              videoRef.current.src = "";
            } catch (e) {
              console.error("Error cleaning up video on close:", e);
            }
          }
          if (audioRef.current) {
            try {
              audioRef.current.pause();
              audioRef.current.src = "";
            } catch (e) {
              console.error("Error cleaning up audio on close:", e);
            }
          }
        }
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 max-w-[95vw] w-full overflow-x-hidden">
        <DialogHeader
          className={`p-6 pb-4 border-b ${getRequestTypeBgClass()}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-full bg-white dark:bg-gray-800 ${getRequestTypeColorClass()}`}
            >
              {getRequestTypeIcon()}
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">
                Process {request.petName}'s{" "}
                {request.type
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
                Request
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Submitted by {request.petOwnerName} on{" "}
                {formatDate(request.createdAt)}
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="px-6 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium">{steps[currentStep]}</span>
          </div>
          <Progress value={progress} className="h-2" />

          <div className="hidden sm:flex justify-between mt-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-xs ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Review Request */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <Card className={`border ${getRequestTypeBorderClass()}`}>
                <CardHeader className={`${getRequestTypeBgClass()} pb-2`}>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Request Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                        Pet
                      </Label>
                      <div className="mt-1 text-base font-medium">
                        {request.petName}
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                        Pet Size
                      </Label>
                      <div className="mt-1">
                        <Badge variant="outline" className="font-normal">
                          {request.petSize}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                        Pet Owner
                      </Label>
                      <div className="mt-1 text-base font-medium">
                        {request.petOwnerName}
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                        Submitted
                      </Label>
                      <div className="mt-1 text-base font-medium">
                        {formatDate(request.createdAt)}
                      </div>
                    </div>

                    {request.type === "boarding-extension" &&
                      request.extensionDetails && (
                        <>
                          <div>
                            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                              Current End Date
                            </Label>
                            <div className="mt-1 text-base font-medium">
                              {formattedCurrentEndDate}
                            </div>
                          </div>

                          <div>
                            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                              Extension Requested
                            </Label>
                            <div className="mt-1 text-base font-medium text-amber-700 dark:text-amber-400">
                              {request.extensionDetails.duration}{" "}
                              {request.extensionDetails.unit}
                            </div>
                          </div>
                        </>
                      )}

                    {request.type === "grooming" && request.groomingService && (
                      <div className="col-span-2">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                          Requested Service
                        </Label>
                        <div className="mt-1 text-base font-medium text-green-700 dark:text-green-400">
                          {request.groomingService
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                      Description
                    </Label>
                    <div className="mt-1 p-3 bg-muted/30 rounded-md text-base whitespace-pre-wrap">
                      {request.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Upload Photos (for photo requests) */}
          {request.type === "photo" && currentStep === 1 && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Camera className="h-5 w-5 text-blue-600" />
                    Upload Photos
                  </CardTitle>
                  <CardDescription>
                    Upload up to 5 photos of {request.petName} to share with the
                    pet owner.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <PhotoUpload
                    selectedFiles={selectedFiles}
                    previewUrls={previewUrls}
                    onFileSelect={handlePhotoSelect}
                    onRemoveFile={handleRemoveSelectedFile}
                    onRemoveAllFiles={handleRemoveAllPhotos}
                    maxFiles={5}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Upload Video (for video requests) */}
          {request.type === "video" && currentStep === 1 && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Video className="h-5 w-5 text-purple-600" />
                    Upload Video
                  </CardTitle>
                  <CardDescription>
                    Upload a video of {request.petName} to share with the pet
                    owner.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <VideoUpload
                    selectedFile={videoFile}
                    previewUrl={videoPreviewUrl}
                    onFileSelect={handleVideoSelect}
                    onRemoveFile={handleRemoveVideo}
                    maxDuration={60}
                    onAudioSelect={handleAudioSelect}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Confirm Service (for grooming requests) */}
          {request.type === "grooming" && currentStep === 1 && (
            <div className="space-y-4">
              <Card className="border-green-200 dark:border-green-800">
                <CardHeader className="bg-green-50 dark:bg-green-950/20 pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Scissors className="h-5 w-5 text-green-600" />
                    Confirm Grooming Service
                  </CardTitle>
                  <CardDescription>
                    Review and confirm the grooming service for{" "}
                    {request.petName}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <Label className="text-sm font-medium">
                        Requested Service:
                      </Label>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 text-sm font-medium">
                        {request.groomingService
                          ?.replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase()) ||
                          selectedGroomingService
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Pet Size:</Label>
                      <span className="text-base font-medium">
                        {request.petSize}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">
                        Total Price:
                      </Label>
                      <span className="text-base font-medium text-green-600 dark:text-green-400 flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {formatCurrency(calculatedPrice || request.price || 0)}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md">
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      Note: Grooming service details are predefined and cannot
                      be modified. The price is automatically calculated based
                      on the service type and pet size.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Confirm Extension (for boarding extension requests) */}
          {request.type === "boarding-extension" && currentStep === 1 && (
            <div className="space-y-4">
              <Card className="border-amber-200 dark:border-amber-800">
                <CardHeader className="bg-amber-50 dark:bg-amber-950/20 pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-600" />
                    Confirm Boarding Extension
                  </CardTitle>
                  <CardDescription>
                    Review and confirm the boarding extension for{" "}
                    {request.petName}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">
                        Current End Date:
                      </Label>
                      <div className="text-base font-medium break-words">
                        {formattedCurrentEndDate}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm font-medium">
                        Extension Requested:
                      </Label>
                      <div className="text-base font-medium text-amber-700 dark:text-amber-400">
                        {formattedExtensionRequested}
                      </div>
                    </div>

                    {isHourExtension ? (
                      <>
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">
                            New End Date:
                          </Label>
                          <div className="text-base font-medium break-words">
                            {formattedNewEndDate}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <Label
                            htmlFor="extension-date"
                            className="text-sm font-medium"
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
                                  {date ? (
                                    format(date, "PPP")
                                  ) : (
                                    <span>Select date</span>
                                  )}
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
                      </>
                    )}

                    <div className="space-y-1">
                      <Label className="text-sm font-medium">
                        Additional Cost:
                      </Label>
                      <div className="text-base font-medium text-green-600 dark:text-green-400 flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {formatCurrency(additionalCost)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Upload Photos (for grooming requests) */}
          {request.type === "grooming" && currentStep === 2 && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Camera className="h-5 w-5 text-green-600" />
                    Upload Grooming Photos
                  </CardTitle>
                  <CardDescription>
                    Upload up to 2 photos of {request.petName} after grooming to
                    share with the pet owner.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <PhotoUpload
                    selectedFiles={selectedFiles}
                    previewUrls={previewUrls}
                    onFileSelect={handlePhotoSelect}
                    onRemoveFile={handleRemoveSelectedFile}
                    onRemoveAllFiles={handleRemoveAllPhotos}
                    maxFiles={2}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step for Processing Notes (different step number depending on request type) */}
          {((request.type === "photo" && currentStep === 2) ||
            (request.type === "video" && currentStep === 2) ||
            (request.type === "grooming" && currentStep === 3) ||
            (request.type === "boarding-extension" && currentStep === 2)) && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    Processing Notes
                  </CardTitle>
                  <CardDescription>
                    Add any notes about this request. These notes will be
                    visible to the pet owner.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <NoteGenerator
                    request={request}
                    selectedFiles={selectedFiles}
                    value={processingNotes}
                    onChange={setProcessingNotes}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Final Step: Review and Complete */}
          {((request.type === "photo" && currentStep === 3) ||
            (request.type === "video" && currentStep === 3) ||
            (request.type === "grooming" && currentStep === 4) ||
            (request.type === "boarding-extension" && currentStep === 3)) && (
            <div className="space-y-6">
              <Card className={`border ${getRequestTypeBorderClass()}`}>
                <CardHeader className={`${getRequestTypeBgClass()} pb-2`}>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Review and Complete
                  </CardTitle>
                  <CardDescription>
                    Review the information below before completing the request.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                        Request Type
                      </Label>
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
                          {request.type === "boarding-extension" &&
                            "Boarding Extension"}
                          {request.type === "custom" && "Custom Request"}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                        Pet
                      </Label>
                      <div className="mt-1 text-base font-medium">
                        {request.petName}
                      </div>
                    </div>

                    {/* Request-specific details */}
                    {request.type === "photo" && (
                      <div>
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                          Photos Uploaded
                        </Label>
                        <div className="mt-1 text-base font-medium">
                          {selectedFiles.length} photos
                        </div>
                      </div>
                    )}

                    {request.type === "video" && (
                      <div>
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                          Video Uploaded
                        </Label>
                        <div className="mt-1 text-base font-medium">
                          {selectedFiles.length > 0 ? "Yes" : "No"}
                        </div>
                      </div>
                    )}

                    {request.type === "grooming" && (
                      <>
                        <div>
                          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                            Service
                          </Label>
                          <div className="mt-1 text-base font-medium text-green-700 dark:text-green-400">
                            {selectedGroomingService
                              .replace(/-/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                            Price
                          </Label>
                          <div className="mt-1 text-base font-medium text-green-600 dark:text-green-400">
                            {formatCurrency(calculatedPrice || 0)}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                            Photos Uploaded
                          </Label>
                          <div className="mt-1 text-base font-medium">
                            {selectedFiles.length} photos
                          </div>
                        </div>
                      </>
                    )}

                    {request.type === "boarding-extension" && (
                      <>
                        <div>
                          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                            Extension
                          </Label>
                          <div className="mt-1 text-base font-medium text-amber-700 dark:text-amber-400">
                            {formattedExtensionRequested}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                            New End Date
                          </Label>
                          <div className="mt-1 text-base font-medium">
                            {formattedNewEndDate}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                            Additional Cost
                          </Label>
                          <div className="mt-1 text-base font-medium text-green-600 dark:text-green-400">
                            {formatCurrency(additionalCost)}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Video preview in final step */}
                  {request.type === "video" && videoFile && (
                    <div className="col-span-2 mt-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                        Video Preview
                      </Label>
                      <div className="relative rounded-md overflow-hidden bg-muted/30 w-full">
                        <video
                          ref={videoRef}
                          src={
                            audioMerged && mergedVideoUrl
                              ? mergedVideoUrl
                              : videoPreviewUrl || undefined
                          }
                          className="w-full h-auto max-h-[200px] object-contain"
                          muted={false}
                          // Remove controls attribute to hide default controls
                        >
                          Your browser does not support the video tag.
                        </video>

                        {selectedAudioUrl && !audioMerged && (
                          <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center">
                            <Music className="h-3 w-3 mr-1" />
                            <span>
                              {selectedAudioName || "Background Music"}
                            </span>
                          </div>
                        )}

                        {audioMerged && (
                          <div className="absolute top-2 left-2 bg-green-500/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            <span>Audio Merged</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-center mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (videoRef.current) {
                              if (isVideoPlaying) {
                                videoRef.current.pause();
                              } else {
                                videoRef.current.play().catch((err) => {
                                  console.error("Error playing video:", err);
                                  alert(
                                    "Error playing video. Please try again.",
                                  );
                                });
                              }
                            }
                          }}
                          className="mx-auto"
                        >
                          {isVideoPlaying ? (
                            <>
                              <Pause className="h-4 w-4 mr-1" /> Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-1" /> Play
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Photo preview in final step */}
                  {request.type === "photo" && selectedFiles.length > 0 && (
                    <div className="col-span-2 mt-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                        Photo Preview
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {previewUrls.map((url, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-md overflow-hidden bg-muted/30"
                          >
                            <img
                              src={url || "/placeholder.svg"}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {processingNotes && (
                    <div>
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                        Processing Notes
                      </Label>
                      <div className="mt-1 p-3 bg-muted/30 rounded-md text-base whitespace-pre-wrap">
                        {processingNotes}
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Completing this request will notify the pet owner and
                      update the status to "Completed".
                      {(request.type === "grooming" ||
                        request.type === "boarding-extension") &&
                        " It will also update the boarding record with the additional charges."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <DialogFooter className="p-4 border-t flex flex-col sm:flex-row gap-2">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}

          {currentStep < steps.length - 1 && (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canGoNext()}
              className="flex items-center"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}

          {currentStep === steps.length - 1 && (
            <Button
              onClick={handleComplete}
              disabled={isProcessing || !canComplete()}
              className="flex items-center"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Complete Request
                </>
              )}
            </Button>
          )}

          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
            className="sm:order-first"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
