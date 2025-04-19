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
import { format, addDays, addHours, parseISO, isBefore } from "date-fns";
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
  Play,
  Pause,
  Music,
  Eye,
  X,
  Volume2,
  VolumeX,
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
import { motion } from "framer-motion";
import { PRICING, calculateExtensionCost } from "../data/pricing-data";

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

export default function EnhancedRequestDialog({
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
  const [selectedGroomingService, setSelectedGroomingService] =
    useState<string>("");
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
  const [originalVolume, setOriginalVolume] = useState(0); // Initially set to 0% (muted)
  const [backgroundVolume, setBackgroundVolume] = useState(1); // Initially set to 100%

  // Add state variables for fullscreen views
  const [showVideoFullscreen, setShowVideoFullscreen] = useState(false);
  const [showPhotoFullscreen, setShowPhotoFullscreen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);
  const [audioMerging, setAudioMerging] = useState(false);

  // Handlers for volume changes
  const handleOriginalVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newVolume = Number.parseFloat(e.target.value);
    setOriginalVolume(newVolume);

    // Apply volume change immediately to video and unmute if needed
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      // If user is adjusting original audio volume above 0, unmute
      if (newVolume > 0 && videoRef.current.muted) {
        videoRef.current.muted = false;
      }
    }
  };

  const handleBackgroundVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newVolume = Number.parseFloat(e.target.value);
    setBackgroundVolume(newVolume);

    // Apply volume change immediately to audio
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Calculate price based on request type and pet size
  const calculatePrice = () => {
    if (!request) return 0;

    const petSize = request.petSize || "Medium"; // Default to Medium if size is not specified

    if (request.type === "boarding-extension" && request.extensionDetails) {
      const { duration, unit } = request.extensionDetails;
      return calculateExtensionCost(duration, unit, petSize);
    } else if (request.type === "grooming") {
      const service =
        selectedGroomingService ||
        request.groomingService ||
        "premium-wash-and-cut";

      // Check if the service exists in the pricing data
      if (PRICING.grooming[service as keyof typeof PRICING.grooming]) {
        const serviceRates =
          PRICING.grooming[service as keyof typeof PRICING.grooming];
        return (
          serviceRates[petSize as keyof typeof serviceRates] ||
          serviceRates.Medium
        );
      }
    }

    return request.price || 0;
  };

  // Function to open video fullscreen
  const openVideoFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setShowVideoFullscreen(true);
  };

  // Function to close video fullscreen
  const closeVideoFullscreen = () => {
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }
    setShowVideoFullscreen(false);
  };

  // Function to open photo fullscreen
  const openPhotoFullscreen = (index: number) => {
    setCurrentPhotoIndex(index);
    setShowPhotoFullscreen(true);
  };

  // Function to navigate photos
  const navigatePhotos = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentPhotoIndex((prev) =>
        prev === previewUrls.length - 1 ? 0 : prev + 1,
      );
    } else {
      setCurrentPhotoIndex((prev) =>
        prev === 0 ? previewUrls.length - 1 : prev - 1,
      );
    }
  };

  // Function to update video progress
  const updateVideoProgress = () => {
    if (fullscreenVideoRef.current) {
      const progress =
        (fullscreenVideoRef.current.currentTime /
          fullscreenVideoRef.current.duration) *
        100;
      setVideoProgress(progress);
    }
  };

  // Function to handle video seeking
  const handleVideoSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fullscreenVideoRef.current) {
      const seekTime =
        (Number.parseFloat(e.target.value) / 100) *
        fullscreenVideoRef.current.duration;
      fullscreenVideoRef.current.currentTime = seekTime;
    }
  };

  // Function to toggle mute
  const toggleMute = () => {
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  // Function to toggle fullscreen video play
  const toggleFullscreenVideoPlay = () => {
    if (fullscreenVideoRef.current) {
      if (fullscreenVideoRef.current.paused) {
        fullscreenVideoRef.current.play().catch((err) => {
          console.error("Error playing video:", err);
        });
      } else {
        fullscreenVideoRef.current.pause();
      }
    }
  };

  // Handle audio merging with backend integration
  const handleAudioMerge = async () => {
    if (!videoFile || !selectedAudioUrl) return;

    setAudioMerging(true);

    /**
     * BACKEND INTEGRATION GUIDE FOR AUDIO MERGING
     *
     * In a production environment, this function would call a backend API to perform the actual
     * audio merging. Below is a guide for implementing this functionality on the backend.
     *
     * JAVA SPRING BOOT IMPLEMENTATION:
     *
     * @PostMapping("/api/media/merge-audio")
     * public ResponseEntity<Map<String, String>> mergeAudioWithVideo(
     *     @RequestParam("videoFile") MultipartFile videoFile,
     *     @RequestParam("audioUrl") String audioUrl,
     *     @RequestParam("originalVolume") float originalVolume,
     *     @RequestParam("backgroundVolume") float backgroundVolume) {
     *
     *     // Download audio from URL if needed
     *     File audioFile = downloadAudioFromUrl(audioUrl);
     *
     *     // Process the files using FFmpeg
     *     String outputPath = "/tmp/merged_" + System.currentTimeMillis() + ".mp4";
     *
     *     // FFmpeg command to merge audio with video while controlling volume levels
     *     String command = String.format(
     *         "ffmpeg -i %s -i %s -filter_complex \"[0:a]volume=%.1f[a1];[1:a]volume=%.1f,aloop=loop=-1:size=0:start=0[a2];[a1][a2]amix=inputs=2:duration=first[aout]\" -map 0:v -map \"[aout]\" -c:v copy -c:a aac -shortest %s",
     *         videoFile.getOriginalFilename(), audioFile.getAbsolutePath(),
     *         originalVolume, backgroundVolume, outputPath);
     *
     *     // Execute command...
     *
     *     // Upload result to cloud storage
     *     String publicUrl = uploadToCloudStorage(outputPath);
     *
     *     // Return the URL of the merged video
     *     Map<String, String> response = new HashMap<>();
     *     response.put("mergedVideoUrl", publicUrl);
     *     return ResponseEntity.ok(response);
     * }
     */

    // For this demo, we'll simulate the process with a timeout
    setTimeout(() => {
      // Create a "merged" video URL (in reality, this would be a new video with the audio merged)
      // For demo purposes, we'll just use the original video URL and track the merged state
      setAudioMerged(true);
      setMergedVideoUrl(videoPreviewUrl);
      setAudioMerging(false);

      // Apply volume settings to the video and audio elements
      if (videoRef.current) {
        videoRef.current.volume = originalVolume;
      }

      if (audioRef.current) {
        audioRef.current.volume = backgroundVolume;
      }
    }, 2000);
  };

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

      // Set default grooming service if available
      if (request.type === "grooming" && request.groomingService) {
        setSelectedGroomingService(request.groomingService);
      } else if (request.type === "grooming") {
        setSelectedGroomingService("premium-wash-and-cut");
      }

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
          setExtensionDate(calculatedEndDate);
          setNewEndTime(format(calculatedEndDate, "HH:mm"));
        }
      } else {
        setIsHourExtension(false);
      }

      // Calculate price based on request type and pet size
      const price = calculatePrice();
      setCalculatedPrice(price);
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

  // Update calculated price when relevant state changes
  useEffect(() => {
    if (request) {
      const price = calculatePrice();
      setCalculatedPrice(price);
    }
  }, [request, selectedGroomingService, date]);

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

  // Update video progress and handle fullscreen video events
  useEffect(() => {
    const videoElement = fullscreenVideoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => updateVideoProgress();
    const handlePlay = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);
    const handleEnded = () => setIsVideoPlaying(false);

    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, [fullscreenVideoRef.current]);

  // Handle audio playback with video
  useEffect(() => {
    const videoElement = videoRef.current;
    const audioElement = audioRef.current;

    if (!videoElement || !audioElement || !selectedAudioUrl) return;

    const handlePlay = () => {
      setIsVideoPlaying(true);
      audioElement.currentTime = videoElement.currentTime;
      audioElement.volume = backgroundVolume;
      videoElement.volume = originalVolume;
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    };

    const handlePause = () => {
      setIsVideoPlaying(false);
      audioElement.pause();
    };

    const handleTimeUpdate = () => {
      // Keep audio in sync with video
      if (Math.abs(audioElement.currentTime - videoElement.currentTime) > 0.3) {
        audioElement.currentTime = videoElement.currentTime;
      }
    };

    const handleEnded = () => {
      setIsVideoPlaying(false);
      audioElement.pause();
      audioElement.currentTime = 0;
    };

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("ended", handleEnded);

    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, [selectedAudioUrl, backgroundVolume, originalVolume]);

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
    audioName?: string | null,
  ) => {
    setSelectedAudioUrl(audioUrl);
    setSelectedAudioName(audioName ?? null);

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
      // Add calculated price
      calculatedPrice: calculatedPrice,
      // Add extension date for boarding extensions
      extensionDate: extensionDate ? extensionDate.toISOString() : undefined,
      // Add audio volume settings
      audioSettings: {
        originalVolume,
        backgroundVolume,
      },
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
  const additionalCost =
    calculatedPrice !== null ? calculatedPrice : request.price || 0;

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
        return ["Review Request", "Confirm Service", "Add Notes", "Complete"];
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
                  .replace(/\b\w/g, (l: string) => l.toUpperCase())}{" "}
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
                            .replace(/\b\w/g, (l: string) => l.toUpperCase())}
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

              {/* Add audio volume controls and merge button if audio is selected */}
              {/* Remove the Audio Settings section in the dialog */}
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
                        {(
                          request.groomingService
                          ?.replace(/-/g, " ")
                          .replace(/\b\w/g, (l: string) => l.toUpperCase()) ||
                          selectedGroomingService
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l: string) => l.toUpperCase())
                        ) as string}
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
                        {formatCurrency(calculatedPrice || 0)}
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
                          <Label className="text-sm font-medium">
                            New End Date:
                          </Label>
                          <div className="text-base font-medium break-words">
                            {formattedNewEndDate}
                          </div>
                        </div>
                      </>
                    )}

                    <div className="space-y-1">
                      <Label className="text-sm font-medium">
                        Additional Cost:
                      </Label>
                      <div className="text-base font-medium text-green-600 dark:text-green-400 flex items-center">
                        {formatCurrency(additionalCost)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step for Processing Notes (different step number depending on request type) */}
          {((request.type === "photo" && currentStep === 2) ||
            (request.type === "video" && currentStep === 2) ||
            (request.type === "grooming" && currentStep === 2) ||
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
            (request.type === "grooming" && currentStep === 3) ||
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
                      <div
                        className="relative rounded-md overflow-hidden bg-muted/30 w-full group cursor-pointer"
                        onClick={openVideoFullscreen}
                      >
                        <video
                          ref={videoRef}
                          src={
                            audioMerged && mergedVideoUrl
                              ? mergedVideoUrl
                              : videoPreviewUrl || undefined
                          }
                          className="w-full h-auto max-h-[200px] object-contain"
                          muted={false}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent opening fullscreen when clicking to play/pause
                            if (videoRef.current) {
                              if (isVideoPlaying) {
                                videoRef.current.pause();
                              } else {
                                videoRef.current.play().catch((err) => {
                                  console.error("Error playing video:", err);
                                });
                              }
                            }
                          }}
                        >
                          Your browser does not support the video tag.
                        </video>

                        {/* Center play/pause button that appears on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent opening fullscreen
                              if (videoRef.current) {
                                if (isVideoPlaying) {
                                  videoRef.current.pause();
                                } else {
                                  videoRef.current.play().catch((err) => {
                                    console.error("Error playing video:", err);
                                  });
                                }
                              }
                            }}
                            className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                            aria-label={
                              isVideoPlaying ? "Pause video" : "Play video"
                            }
                          >
                            {isVideoPlaying ? (
                              <Pause className="h-6 w-6" />
                            ) : (
                              <Play className="h-6 w-6 fill-white" />
                            )}
                          </button>
                        </div>

                        {/* Eye icon for fullscreen */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent duplicate events
                            openVideoFullscreen();
                          }}
                          className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="View fullscreen"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {selectedAudioUrl && !audioMerged && (
                          <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center">
                            <Music className="h-3 w-3 mr-1" />
                            <span>
                              {selectedAudioName || "Background Music"}
                            </span>
                          </div>
                        )}

                        {audioMerged && (
                          <motion.div
                            className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs px-2 py-1 rounded-md flex items-center shadow-md"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                              scale: [0.9, 1.05, 1],
                              opacity: 1,
                            }}
                            transition={{
                              duration: 0.5,
                              ease: "easeOut",
                            }}
                          >
                            <motion.div
                              animate={{ rotate: [0, 15, -15, 0] }}
                              transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                                duration: 2,
                                ease: "easeInOut",
                              }}
                            >
                              <Music className="h-3 w-3 mr-1" />
                            </motion.div>
                            <span>Audio Merged</span>
                          </motion.div>
                        )}
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
                            className="relative aspect-square rounded-md overflow-hidden bg-muted/30 group cursor-pointer"
                            onClick={() => openPhotoFullscreen(index)}
                          >
                            <img
                              src={url || "/placeholder.svg"}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {/* Eye icon for fullscreen */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent duplicate events
                                openPhotoFullscreen(index);
                              }}
                              className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                              aria-label="View fullscreen"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            {/* Add a subtle overlay on hover to indicate it's clickable */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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

                  {/* <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Completing this request will notify the pet owner and
                      update the status to "Completed".
                      {(request.type === "grooming" ||
                        request.type === "boarding-extension") &&
                        " It will also update the boarding record with the additional charges."}
                    </p>
                  </div> */}
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Video Fullscreen Dialog */}
        <Dialog
          open={showVideoFullscreen}
          onOpenChange={setShowVideoFullscreen}
        >
          <DialogContent className="p-0 max-w-[100vw] h-[100vh] border-none bg-transparent shadow-none">
            <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
              {/* Close button */}
              <button
                className="fixed top-4 right-4 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
                onClick={closeVideoFullscreen}
                aria-label="Close fullscreen view"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Video container with animation */}
              <motion.div
                className="relative w-full max-w-3xl h-full flex items-center justify-center p-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <video
                    ref={fullscreenVideoRef}
                    src={
                      audioMerged && mergedVideoUrl
                        ? mergedVideoUrl
                        : videoPreviewUrl || undefined
                    }
                    className="max-w-[90%] max-h-[80vh] object-contain rounded-md shadow-xl"
                    onClick={toggleFullscreenVideoPlay}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={() => setIsVideoPlaying(false)}
                    autoPlay
                    muted={isVideoMuted}
                  >
                    Your browser does not support the video tag.
                  </video>

                  {/* Centered play/pause button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={toggleFullscreenVideoPlay}
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4 transition-colors"
                      aria-label={isVideoPlaying ? "Pause" : "Play"}
                    >
                      {isVideoPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8" />
                      )}
                    </button>
                  </div>

                  {/* Video progress bar */}
                  <div className="absolute bottom-8 left-0 right-0 px-8 flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={videoProgress}
                      onChange={handleVideoSeek}
                      className="w-full h-2 bg-white/30 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, white ${videoProgress}%, rgba(255,255,255,0.3) ${videoProgress}%)`,
                      }}
                    />
                  </div>

                  {selectedAudioUrl && !audioMerged && (
                    <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1.5 rounded-full flex items-center shadow-md">
                      <Music className="h-4 w-4 mr-2" />
                      <span>{selectedAudioName || "Background Music"}</span>
                    </div>
                  )}

                  {audioMerged && (
                    <motion.div
                      className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm px-3 py-1.5 rounded-full flex items-center shadow-md"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: [0.9, 1.05, 1],
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          duration: 2,
                          ease: "easeInOut",
                        }}
                      >
                        <Music className="h-4 w-4 mr-2" />
                      </motion.div>
                      <span>Audio Merged</span>
                    </motion.div>
                  )}

                  {/* Volume control in fullscreen */}
                  <button
                    className="absolute top-4 right-16 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    onClick={toggleMute}
                  >
                    {isVideoMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </DialogContent>
        </Dialog>

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
