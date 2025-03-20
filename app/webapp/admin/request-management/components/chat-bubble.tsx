"use client";

import type React from "react";

import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Music,
  CheckCircle,
  X,
  Maximize,
  Volume2,
  VolumeX,
  Play,
} from "lucide-react";

interface ChatBubbleProps {
  sender: string;
  message: string;
  timestamp: string;
  avatar: string;
  isAdmin: boolean;
  type?: string;
  isUrgent?: boolean;
  media?: {
    url: string;
    type: "image" | "video";
    urls?: string[];
    audioUrl?: string;
    audioName?: string;
    audioMerged?: boolean;
    mergedVideoUrl?: string;
  };
}

export function ChatBubble({
  sender,
  message,
  timestamp,
  avatar,
  isAdmin,
  type,
  isUrgent,
  media,
}: ChatBubbleProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenMedia, setFullscreenMedia] = useState<string | null>(null);
  const [fullscreenType, setFullscreenType] = useState<
    "image" | "video" | null
  >(null);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return format(date, "MMM d, yyyy 'at' h:mm a");
    } catch (error) {
      return timestamp;
    }
  };

  // Animation variants for chat bubbles
  const bubbleVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 1,
      },
    },
  };

  // Generate video thumbnail
  useEffect(() => {
    if (media?.type === "video" && media.url && !videoThumbnail) {
      const video = document.createElement("video");
      video.src =
        media.audioMerged && media.mergedVideoUrl
          ? media.mergedVideoUrl
          : media.url;
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.currentTime = 1; // Seek to 1 second to get a representative frame

      video.onloadeddata = () => {
        // Create a canvas to capture the frame
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video frame to the canvas
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Convert canvas to data URL
          const thumbnailUrl = canvas.toDataURL("image/jpeg");
          setVideoThumbnail(thumbnailUrl);
        }
      };
    }
  }, [
    media?.type,
    media?.url,
    media?.mergedVideoUrl,
    media?.audioMerged,
    videoThumbnail,
  ]);

  // Sync audio with video playback
  useEffect(() => {
    const videoElement = videoRef.current;
    const audioElement = audioRef.current;
    const fullscreenVideoElement = fullscreenVideoRef.current;

    // If audio is merged, we don't need to sync external audio
    if (
      !videoElement ||
      !audioElement ||
      !media?.audioUrl ||
      media?.audioMerged
    )
      return;

    const handlePlay = () => {
      audioElement.currentTime = videoElement.currentTime;
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    };

    const handlePause = () => {
      audioElement.pause();
      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      // Keep audio in sync with video
      if (Math.abs(audioElement.currentTime - videoElement.currentTime) > 0.3) {
        audioElement.currentTime = videoElement.currentTime;
      }
    };

    const handleEnded = () => {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying(false);
    };

    const handleSeeking = () => {
      // Update audio time when video is seeking
      audioElement.currentTime = videoElement.currentTime;
    };

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("ended", handleEnded);
    videoElement.addEventListener("seeking", handleSeeking);

    // Also handle fullscreen video if it exists
    if (fullscreenVideoElement) {
      fullscreenVideoElement.addEventListener("play", handlePlay);
      fullscreenVideoElement.addEventListener("pause", handlePause);
      fullscreenVideoElement.addEventListener("timeupdate", handleTimeUpdate);
      fullscreenVideoElement.addEventListener("ended", handleEnded);
      fullscreenVideoElement.addEventListener("seeking", handleSeeking);
    }

    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("ended", handleEnded);
      videoElement.removeEventListener("seeking", handleSeeking);

      if (fullscreenVideoElement) {
        fullscreenVideoElement.removeEventListener("play", handlePlay);
        fullscreenVideoElement.removeEventListener("pause", handlePause);
        fullscreenVideoElement.removeEventListener(
          "timeupdate",
          handleTimeUpdate,
        );
        fullscreenVideoElement.removeEventListener("ended", handleEnded);
        fullscreenVideoElement.removeEventListener("seeking", handleSeeking);
      }

      // Ensure audio is stopped when component unmounts
      audioElement.pause();
    };
  }, [media?.audioUrl, media?.audioMerged, showFullscreen]);

  // Cleanup function to stop audio when component unmounts
  useEffect(() => {
    return () => {
      // Stop audio playback when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // Stop video playback when component unmounts
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if (fullscreenVideoRef.current) {
        fullscreenVideoRef.current.pause();
      }
    };
  }, []);

  // Handle opening fullscreen view
  const openFullscreen = (url: string, type: "image" | "video") => {
    setFullscreenMedia(url);
    setFullscreenType(type);
    setShowFullscreen(true);

    // If it's a video, pause the thumbnail video
    if (type === "video" && videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Handle closing fullscreen view
  const closeFullscreen = () => {
    // If it's a video, pause the fullscreen video
    if (fullscreenType === "video" && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }

    setShowFullscreen(false);
    setFullscreenMedia(null);
    setFullscreenType(null);
  };

  // Toggle mute for video
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }

    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.muted = !fullscreenVideoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <motion.div
        className={cn(
          "flex gap-3 max-w-full",
          isAdmin ? "justify-end" : "justify-start",
        )}
        initial="initial"
        animate="animate"
        variants={bubbleVariants}
      >
        {!isAdmin && (
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {avatar}
            </AvatarFallback>
          </Avatar>
        )}

        <div
          className={cn(
            "flex flex-col space-y-1 max-w-[85%] sm:max-w-[75%]",
            isAdmin && "items-end",
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              {sender}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(timestamp)}
            </span>
          </div>

          <div
            className={cn(
              "rounded-lg px-4 py-3 text-sm break-words",
              isAdmin ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            <div className="flex flex-wrap gap-1.5 mb-1">
              {type && (
                <Badge
                  className={cn(
                    "text-xs font-medium",
                    type === "photo" &&
                      "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
                    type === "video" &&
                      "bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300",
                    type === "grooming" &&
                      "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300",
                    type === "boarding-extension" &&
                      "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-300",
                    type === "custom" &&
                      "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300",
                  )}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
              )}
              {isUrgent && (
                <Badge variant="destructive" className="text-xs">
                  Urgent
                </Badge>
              )}
            </div>
            <p className="whitespace-pre-wrap">{message}</p>

            {media && (
              <div className="mt-3 rounded-md overflow-hidden">
                {/* Handle multiple media files */}
                {media.urls && media.urls.length > 0 ? (
                  <div
                    className={`grid ${media.urls.length > 2 ? "grid-cols-2" : "grid-cols-1"} gap-2 mt-2`}
                  >
                    {media.urls.map((url, index) => (
                      <div
                        key={index}
                        className="relative rounded-md overflow-hidden cursor-pointer group"
                        onClick={() => openFullscreen(url, "image")}
                      >
                        <img
                          src={url || "/placeholder.svg?height=150&width=150"}
                          alt={`Media ${index + 1}`}
                          className="w-full h-[150px] object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Maximize className="h-6 w-6 text-white drop-shadow-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : // Single media file
                media.type === "image" ? (
                  <div
                    className="relative cursor-pointer group"
                    onClick={() => openFullscreen(media.url, "image")}
                  >
                    <img
                      src={media.url || "/placeholder.svg?height=300&width=400"}
                      alt="Shared media"
                      className="max-w-full h-auto rounded-md object-cover transition-transform group-hover:scale-[1.02]"
                      style={{ maxHeight: "300px" }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Maximize className="h-6 w-6 text-white drop-shadow-md" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative rounded-md overflow-hidden"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {/* Video thumbnail with play button overlay */}
                    <div
                      className="relative cursor-pointer group"
                      onClick={() =>
                        openFullscreen(
                          media.audioMerged && media.mergedVideoUrl
                            ? media.mergedVideoUrl
                            : media.url,
                          "video",
                        )
                      }
                    >
                      {videoThumbnail ? (
                        <>
                          <img
                            src={videoThumbnail || "/placeholder.svg"}
                            alt="Video thumbnail"
                            className="w-full h-auto rounded-md object-cover transition-transform group-hover:scale-[1.02]"
                            style={{ maxHeight: "300px" }}
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="h-12 w-12 rounded-full bg-white/80 flex items-center justify-center">
                              <Play className="h-6 w-6 text-primary ml-1" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <video
                          ref={videoRef}
                          src={
                            media.audioMerged && media.mergedVideoUrl
                              ? media.mergedVideoUrl
                              : media.url
                          }
                          preload="metadata"
                          className="max-w-full h-auto rounded-md"
                          style={{ maxHeight: "300px" }}
                          muted={true}
                          playsInline
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>

                    {/* Audio element for background music - only show if audio is not merged */}
                    {media.audioUrl && !media.audioMerged && (
                      <>
                        <audio
                          ref={audioRef}
                          src={media.audioUrl}
                          loop={false}
                          hidden
                        />
                        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center">
                          <Music className="h-3 w-3 mr-1" />
                          <span>{media.audioName || "Background Music"}</span>
                        </div>
                      </>
                    )}

                    {/* Show indicator for merged audio */}
                    {media.audioMerged && (
                      <div className="absolute top-2 left-2 bg-green-500/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span>Audio Merged</span>
                      </div>
                    )}

                    {/* Volume control */}
                    {isHovering && (
                      <button
                        className="absolute bottom-2 right-2 bg-black/50 text-white p-1.5 rounded-full"
                        onClick={toggleMute}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {isAdmin && (
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {avatar}
            </AvatarFallback>
          </Avatar>
        )}
      </motion.div>

      {/* Fullscreen Media View */}
      <AnimatePresence>
        {showFullscreen && fullscreenMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeFullscreen}
          >
            <button
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full z-10"
              onClick={closeFullscreen}
            >
              <X className="h-6 w-6" />
            </button>

            {fullscreenType === "image" ? (
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={fullscreenMedia}
                alt="Fullscreen media"
                className="max-w-full max-h-[90vh] object-contain rounded-md"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div
                className="relative w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.video
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  ref={fullscreenVideoRef}
                  src={fullscreenMedia}
                  controls
                  autoPlay
                  className="max-w-full max-h-[90vh] w-full rounded-md"
                  muted={isMuted}
                >
                  Your browser does not support the video tag.
                </motion.video>

                {/* Audio element for background music in fullscreen - only show if audio is not merged */}
                {media?.audioUrl && !media?.audioMerged && (
                  <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1.5 rounded-md flex items-center">
                    <Music className="h-4 w-4 mr-2" />
                    <span>{media.audioName || "Background Music"}</span>
                  </div>
                )}

                {/* Show indicator for merged audio in fullscreen */}
                {media?.audioMerged && (
                  <div className="absolute top-4 left-4 bg-green-500/70 text-white text-sm px-3 py-1.5 rounded-md flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Audio Merged</span>
                  </div>
                )}

                {/* Volume control in fullscreen */}
                <button
                  className="absolute top-4 right-16 bg-black/50 text-white p-2 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute(e);
                  }}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Note: The ChatBubble component should be updated to handle multiple images in the media prop
// The media prop should be updated to accept an array of URLs and types
// If the component doesn't exist, it should be created with this functionality
