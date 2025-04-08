"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2,
  Upload,
  X,
  Music,
  Save,
  CheckCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  AlertCircle,
  Eye,
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface VideoUploadProps {
  selectedFile: File | null;
  previewUrl: string | null;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  maxDuration?: number;
  onAudioSelect?: (audioUrl: string | null, audioName?: string | null) => void;
}

export function VideoUpload({
  selectedFile,
  previewUrl,
  onFileSelect,
  onRemoveFile,
  maxDuration = 60,
  onAudioSelect,
}: VideoUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [isDurationValid, setIsDurationValid] = useState(true);
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const [selectedAudioName, setSelectedAudioName] = useState<string | null>(
    null,
  );
  const [audioMerging, setAudioMerging] = useState(false);
  const [audioMerged, setAudioMerged] = useState(false);
  const [mergedVideoUrl, setMergedVideoUrl] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [showDurationError, setShowDurationError] = useState(false);
  const [originalVolume, setOriginalVolume] = useState(0); // Start muted
  const [backgroundVolume, setBackgroundVolume] = useState(1); // Full volume
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [durationError, setDurationError] = useState<string | null>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);

  // Audio options with the provided MP3 files
  const audioOptions = [
    {
      id: "pets-background-music",
      name: "Pets Background Music",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pets-background-music-funny-cute-sweet-cat-dog-animals-249668-9lhrvWjMrc7w6eWBDwGLlFCDeqzqwE.mp3",
      description: "Funny, cute & sweet cat/dog animals music",
    },
    {
      id: "quirky-fun",
      name: "Quirky Fun & Bright",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quirky-fun-and-bright-commercial-social-pets-kids-159155-vJOXAJgkrFumHR3utpbMGVOFsihaM2.mp3",
      description: "Commercial social pets & kids music",
    },
    {
      id: "cats-and-dogs",
      name: "Cats and Dogs",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cats-and-dogs-music-funny-happy-cute-pets-background-intro-theme-269362-MZRRsXAoYoMVqNqQFBt35k6hHhcZcU.mp3",
      description: "Funny happy cute pets background theme",
    },
    {
      id: "candy-store",
      name: "Candy Store Heist",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/candy-store-heist-300793-WyEi7PIhtCCY3YUGbw8fqnrHXK9jqi.mp3",
      description: "Upbeat playful music",
    },
    {
      id: "funny-pets-1",
      name: "Funny Pets",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/funny-pets-262921-jtpIlfivFw1ND4vYjipCpaMQy6JtBW.mp3",
      description: "Cheerful pet-themed music",
    },
    {
      id: "funny-pets-music",
      name: "Funny Pets Music",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/funny-pets-music-dog-cat-puppy-kitty-bunny-background-intro-theme-259686-gVDGsCMnvjV7sf798dQXskjKjgtovE.mp3",
      description: "Dog, cat, puppy, kitty, bunny background theme",
    },
    {
      id: "funny-pets-2",
      name: "Funny Pets 2",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/funny-pets-272033-w6q9rfNbjTt467s66F0fuzullBANnw.mp3",
      description: "Playful pet soundtrack",
    },
    {
      id: "pets-music",
      name: "Pets Music",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pets-music-dog-cat-puppy-kitty-shelter-background-intro-theme-259661-QMeJhfCaL9fqDOv8vEtdE1i1DWEiML.mp3",
      description: "Dog, cat, puppy, kitty shelter background theme",
    },
    {
      id: "cute-pets-music",
      name: "Cute Pets Music",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cute-pets-music-cat-dog-puppy-kitty-vlog-background-intro-theme-269379-k0KGuznah3i0H1eAeFqjzKcct9FQoP.mp3",
      description: "Cat, dog, puppy, kitty vlog background theme",
    },
    {
      id: "none",
      name: "No Background Music",
      url: null,
      description: "Original video audio only",
    },
  ];

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
      // Get the first file (only one video at a time)
      const file = e.dataTransfer.files[0];

      // Validate file type
      if (!file.type.startsWith("video/")) {
        setDurationError("Please select a valid video file");
        setTimeout(() => setDurationError(null), 5000);
        return;
      }

      // Create a synthetic event to reuse the existing handler
      const event = {
        target: {
          files: [file],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleVideoSelect(event);
    }
  };

  // Handle volume changes
  const handleOriginalVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newVolume = Number.parseFloat(e.target.value);
    setOriginalVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;

      // Automatically unmute if volume is adjusted
      if (newVolume > 0 && isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      } else if (newVolume === 0 && !isMuted) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleBackgroundVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newVolume = Number.parseFloat(e.target.value);
    setBackgroundVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Check video duration when preview URL changes
  useEffect(() => {
    if (previewUrl && videoRef.current) {
      const video = videoRef.current;

      const handleLoadedMetadata = () => {
        setDuration(video.duration);
        const valid = video.duration <= maxDuration;
        setIsDurationValid(valid);

        // Show error dialog if duration exceeds limit
        if (!valid) {
          setShowDurationError(true);
          // Automatically hide after 5 seconds
          setTimeout(() => setShowDurationError(false), 5000);
        }
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      // If the video is already loaded, check duration immediately
      if (video.readyState >= 1) {
        handleLoadedMetadata();
      }

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [previewUrl, maxDuration]);

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

  // Handle audio selection and auto-play video with selected audio
  const handleAudioSelect = (
    audioUrl: string | null,
    audioName: string | null,
  ) => {
    // Stop any currently playing audio preview
    if (isAudioPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsAudioPlaying(null);
    }

    setSelectedAudio(audioUrl);
    setSelectedAudioName(audioName);

    if (onAudioSelect) {
      onAudioSelect(audioUrl, audioName);
    }

    // Reset merged state when new audio is selected
    setAudioMerged(false);
    if (mergedVideoUrl) {
      URL.revokeObjectURL(mergedVideoUrl);
      setMergedVideoUrl(null);
    }

    // Auto-play video with selected audio
    if (videoRef.current && audioUrl) {
      // Reset video to beginning
      videoRef.current.currentTime = 0;
      // Mute original audio
      videoRef.current.muted = true;
      setIsMuted(true);

      // Set up audio
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.currentTime = 0;

        // Play video with audio
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsVideoPlaying(true);
              audioRef.current
                ?.play()
                .catch((err) => console.error("Error playing audio:", err));
            })
            .catch((err) => {
              console.error("Error playing video:", err);
            });
        }
      }
    }
  };

  // Toggle video playback
  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        if (audioRef.current && selectedAudio) {
          audioRef.current.pause();
        }
        setIsVideoPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsVideoPlaying(true);
              if (audioRef.current && selectedAudio) {
                audioRef.current.currentTime =
                  videoRef.current?.currentTime || 0;
                audioRef.current
                  .play()
                  .catch((err) => console.error("Error playing audio:", err));
              }
            })
            .catch((err) => {
              console.error("Error playing video:", err);
            });
        }
      }
    }
  };

  // Toggle mute state
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle audio preview playback
  const toggleAudioPreview = (audioUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (isAudioPlaying === audioUrl) {
      // Stop playing this audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsAudioPlaying(null);
    } else {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Set the new audio source and play it
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current
          .play()
          .catch((err) => console.error("Error playing audio:", err));
      }
      setIsAudioPlaying(audioUrl);
    }
  };

  // Handle audio playback with video
  useEffect(() => {
    const videoElement = videoRef.current;
    const audioElement = audioRef.current;

    if (!videoElement || !audioElement || !selectedAudio) return;

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
  }, [selectedAudio, backgroundVolume, originalVolume]);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Simulate merging audio with video
  const handleMergeAudio = () => {
    if (!selectedFile || !selectedAudio) return;

    setAudioMerging(true);

    // In a real implementation, this would call a server-side API to merge the audio and video
    // For this demo, we'll simulate the process with a timeout
    setTimeout(() => {
      // Create a "merged" video URL (in reality, this would be a new video with the audio merged)
      // For demo purposes, we'll just use the original video URL and track the merged state
      setAudioMerged(true);
      setMergedVideoUrl(previewUrl);
      setAudioMerging(false);

      // Notify parent component about the merged video
      if (onAudioSelect) {
        // Pass the audio URL but also set a flag that it's been "merged"
        // This ensures the backend knows to use this version for the pet owner
        onAudioSelect(selectedAudio, selectedAudioName);
      }

      // Add a comment explaining how audio merging works
      console.log(`
      Audio Merging Process:
      1. Original video audio volume is set to ${originalVolume * 100}%
      2. Background music volume is set to ${backgroundVolume * 100}%
      3. Both audio tracks are mixed together in the final output
      4. In a production environment, this would use a server-side process to create a new video file
      5. The merged video will be sent to the pet owner with both audio tracks combined
    `);
    }, 2000);
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith("video/")) {
        setDurationError("Please select a valid video file");
        setTimeout(() => setDurationError(null), 5000);
        return;
      }

      setIsLoading(true);

      // Create a temporary video element to check duration
      const tempVideo = document.createElement("video");
      tempVideo.preload = "metadata";

      tempVideo.onloadedmetadata = () => {
        // Check if video exceeds maximum duration
        if (tempVideo.duration > maxDuration) {
          setDurationError(
            `Video exceeds maximum duration of ${maxDuration} seconds. Please select a shorter video.`,
          );
          setTimeout(() => setDurationError(null), 5000);
          setIsLoading(false);

          // Revoke the temporary URL
          URL.revokeObjectURL(tempVideo.src);

          // Reset the file input to allow selecting the same file again
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
        setDuration(tempVideo.duration);
        setIsDurationValid(true);
        setIsLoading(false);

        // Also update the parent component's state for form submission
        const event = {
          target: {
            files: [file],
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        onFileSelect(event);

        // Revoke the temporary URL
        URL.revokeObjectURL(tempVideo.src);
      };

      tempVideo.onerror = () => {
        setDurationError("Error loading video. Please try another file.");
        setTimeout(() => setDurationError(null), 5000);
        setIsLoading(false);

        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };

      // Set the source to check metadata
      tempVideo.src = URL.createObjectURL(file);
    }
  };

  // Handle removing the video
  const handleRemoveVideo = () => {
    // Clean up resources
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }

    // Reset state
    setVideoFile(null);
    setVideoPreviewUrl(null);
    setSelectedAudio(null);
    setSelectedAudioName(null);
    setAudioMerged(false);
    setDuration(null);

    // Call the parent's onRemoveFile function
    onRemoveFile();
  };

  // Handle replacing the video
  const handleReplaceVideo = () => {
    // First reset the file input to ensure onChange fires even if selecting the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Then trigger the file input click
    handleFileInputClick();
  };

  const openFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setShowFullscreen(true);
  };

  // Add this function to close the fullscreen dialog
  const closeFullscreen = () => {
    setShowFullscreen(false);
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }
  };

  // Add this function to update video progress
  const updateVideoProgress = () => {
    if (fullscreenVideoRef.current) {
      const progress =
        (fullscreenVideoRef.current.currentTime /
          fullscreenVideoRef.current.duration) *
        100;
      setVideoProgress(progress);
    }
  };

  // Add this function to handle seeking in the video
  const handleVideoSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fullscreenVideoRef.current) {
      const seekTime =
        (Number.parseFloat(e.target.value) / 100) *
        fullscreenVideoRef.current.duration;
      fullscreenVideoRef.current.currentTime = seekTime;
    }
  };

  // Add this effect to update video progress
  useEffect(() => {
    const videoElement = fullscreenVideoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => updateVideoProgress();
    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [fullscreenVideoRef.current]);

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Video Upload</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Upload a video of the pet (maximum {maxDuration} seconds).
        </p>
      </div>

      {!selectedFile ? (
        <Card
          className={cn(
            "border-dashed border-2 transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : durationError
                ? "border-destructive bg-destructive/5"
                : "border-border",
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <CardContent className="flex flex-col items-center justify-center py-6">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoSelect}
              className="hidden"
              ref={fileInputRef}
            />
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-1">
              Drag and drop video here or click to browse
            </p>
            <p className="text-xs text-muted-foreground text-center mb-4">
              MP4, MOV, or WebM format (max {maxDuration} seconds)
            </p>
            {durationError && (
              <div className="mb-3 p-2 bg-destructive/10 border border-destructive rounded-md w-full">
                <p className="text-xs text-destructive text-center">
                  {durationError}
                </p>
              </div>
            )}
            <Button onClick={handleFileInputClick} className="mt-2">
              Select Video
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Video Preview Section */}
          <div className="space-y-4">
            {selectedFile && (
              <div
                className="relative overflow-hidden rounded-md bg-muted/30 w-full max-w-full cursor-pointer group"
                onClick={openFullscreen}
              >
                <video
                  ref={videoRef}
                  src={
                    audioMerged && mergedVideoUrl
                      ? mergedVideoUrl
                      : previewUrl || undefined
                  }
                  className="w-full h-auto max-h-[300px] object-contain"
                  muted={isMuted}
                  controls={false}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening fullscreen when clicking to play/pause
                    toggleVideoPlayback();
                  }}
                >
                  Your browser does not support the video tag.
                </video>

                {/* Centered play/pause button that appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent opening fullscreen
                      toggleVideoPlayback();
                    }}
                    className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                    aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                  >
                    {isVideoPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6 fill-white" />
                    )}
                  </button>
                </div>

                {/* Add Eye icon for fullscreen */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Needed to prevent duplicate events
                    openFullscreen();
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="View fullscreen"
                >
                  <Eye className="h-4 w-4" />
                </button>

                {/* Custom video controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 flex items-center justify-between">
                  <div className="flex items-center">
                    {selectedAudio && (
                      <Badge className="mr-2 bg-primary/80 hover:bg-primary/80">
                        <Music className="h-3 w-3 mr-1" />
                        {selectedAudioName || "Audio"}
                      </Badge>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening fullscreen
                        toggleMute();
                      }}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Hidden audio element for background music */}
                <audio ref={audioRef} hidden />

                {!isDurationValid && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <div className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md text-sm font-medium">
                      Video exceeds maximum duration of {maxDuration} seconds
                    </div>
                  </div>
                )}

                {selectedAudio &&
                  selectedAudio !== audioOptions[9].url &&
                  !audioMerged && (
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center">
                      <Music className="h-3 w-3 mr-1" />
                      <span>{selectedAudioName || "Background Music"}</span>
                    </div>
                  )}

                {audioMerged && (
                  <div className="absolute top-2 left-2 bg-green-500/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    <span>Audio Merged</span>
                  </div>
                )}
              </div>
            )}

            {showDurationError && (
              <div className="mt-2 p-3 bg-destructive/10 border border-destructive rounded-md">
                <p className="text-sm text-destructive font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Video exceeds maximum duration of {maxDuration} seconds.
                  Please upload a shorter video.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
              <div className="text-sm">
                <p className="font-medium break-all">
                  {selectedFile?.name?.length > 30
                    ? selectedFile.name.substring(0, 30) + "..."
                    : selectedFile?.name}
                </p>
                <p className="text-muted-foreground">
                  {selectedFile?.size
                    ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                    : ""}
                  {duration ? ` • ${Math.floor(duration)}s` : ""}
                </p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveVideo}
                  className="w-full sm:w-auto"
                >
                  <X className="h-4 w-4 mr-1" /> Remove
                </Button>
                <Button
                  size="sm"
                  onClick={handleReplaceVideo}
                  className="w-full sm:w-auto"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />{" "}
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-1" /> Replace
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {durationError && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-md flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive">
                  {durationError}
                </p>
                <p className="text-xs text-destructive/80 mt-1">
                  Please select a video that is {maxDuration} seconds or
                  shorter.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-2"
                  onClick={handleFileInputClick}
                >
                  Select Another Video
                </Button>
              </div>
            </div>
          )}

          {/* Audio Volume Controls - Moved here */}
          {selectedAudio && selectedAudio !== audioOptions[9].url && (
            <div className="space-y-3 p-4 border rounded-md bg-muted/10">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">
                  Audio Volume Controls
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-xs">Original Audio</Label>
                      <span className="text-xs">
                        {Math.round(originalVolume * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={originalVolume}
                      onChange={handleOriginalVolumeChange}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-xs">Background Music</Label>
                      <span className="text-xs">
                        {Math.round(backgroundVolume * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={backgroundVolume}
                      onChange={handleBackgroundVolumeChange}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Save with Selected Audio
                </Label>
                {!audioMerged && (
                  <Button
                    size="sm"
                    onClick={handleMergeAudio}
                    disabled={audioMerging}
                  >
                    {audioMerging ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />{" "}
                        Processing...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-1" /> Save with Audio
                      </>
                    )}
                  </Button>
                )}

                {audioMerged && (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Audio Merged</span>
                  </div>
                )}
              </div>

              {!audioMerged && (
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md p-3">
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Click "Save with Audio" to merge the audio with the video.
                    This will replace the original audio and will be sent to the
                    pet owner.
                  </p>
                </div>
              )}

              {audioMerged && (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Audio has been successfully merged with the video. This
                    version will be sent to the pet owner.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Background Audio Section */}
          <div className="space-y-4">
            <Separator className="my-4" />

            <div>
              <Label className="text-base font-medium">Background Music</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Choose background music to accompany the video. Click on an
                option to preview it with the video.
              </p>
            </div>

            <ScrollArea className="h-[200px] pr-4">
              <div className="grid grid-cols-1 gap-2">
                {audioOptions.map((audio) => (
                  <div
                    key={audio.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors",
                      selectedAudio === audio.url
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-muted/50 hover:bg-muted/80 border border-transparent",
                    )}
                    onClick={() => handleAudioSelect(audio.url, audio.name)}
                  >
                    <div className="flex items-center flex-grow">
                      <Music className="h-4 w-4 mr-2 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {audio.name}
                        </span>
                        {audio.description && (
                          <span className="text-xs text-muted-foreground">
                            {audio.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {audio.url && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={(e) => toggleAudioPreview(audio.url, e)}
                        >
                          {isAudioPlaying === audio.url ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      )}

                      {selectedAudio === audio.url && (
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}

      {/* Fullscreen Dialog */}
      <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
        <DialogContent className="p-0 max-w-[100vw] h-[100vh] border-none bg-transparent shadow-none">
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
            {/* Close button - top right */}
            <button
              className="fixed top-4 right-4 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
              onClick={closeFullscreen}
              aria-label="Close fullscreen view"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              className="relative w-full max-w-3xl h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
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
                      : previewUrl || undefined
                  }
                  className="max-w-[90%] max-h-[80vh] object-contain rounded-md shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  onEnded={() => setIsVideoPlaying(false)}
                  autoPlay
                  muted={isMuted}
                >
                  Your browser does not support the video tag.
                </video>

                {/* Centered play/pause button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={toggleVideoPlayback}
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

                {selectedAudio &&
                  selectedAudio !== audioOptions[9].url &&
                  !audioMerged && (
                    <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1.5 rounded-full flex items-center shadow-md">
                      <Music className="h-4 w-4 mr-2" />
                      <span>{selectedAudioName || "Background Music"}</span>
                    </div>
                  )}

                {audioMerged && (
                  <div className="absolute top-4 left-4 bg-green-500/70 text-white text-sm px-3 py-1.5 rounded-full flex items-center shadow-md">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Audio Merged</span>
                  </div>
                )}

                {/* Volume control in fullscreen */}
                <button
                  className="absolute top-4 right-16 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  onClick={toggleMute}
                >
                  {isMuted ? (
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
    </div>
  );
}
