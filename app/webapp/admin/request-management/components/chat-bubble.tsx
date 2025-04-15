"use client"

import type React from "react"

import { format } from "date-fns"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Music, X, Volume2, VolumeX, Eye, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ChatBubbleProps {
  sender: string
  message: string
  timestamp: string
  avatar: string
  isAdmin: boolean
  type?: string
  onFullscreenOpen?: () => void
  onFullscreenClose?: () => void
  onFullscreenBackClick?: () => void
  media?: {
    url: string
    type: "image" | "video"
    urls?: string[]
    audioUrl?: string
    audioName?: string
    audioMerged?: boolean
    mergedVideoUrl?: string
  }
}

export function ChatBubble({
  sender,
  message,
  timestamp,
  avatar,
  isAdmin,
  type,
  media,
  onFullscreenOpen,
  onFullscreenClose,
  onFullscreenBackClick,
}: ChatBubbleProps) {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  const videoRef = useRef<HTMLVideoElement>(null)
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [fullscreenMedia, setFullscreenMedia] = useState<string | null>(null)
  const [fullscreenType, setFullscreenType] = useState<"image" | "video" | null>(null)
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVideoControls, setShowVideoControls] = useState(true)
  const [videoProgress, setVideoProgress] = useState(0)

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp)
      return format(date, "MMM d, yyyy 'at' h:mm a")
    } catch (error) {
      return timestamp
    }
  }

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
  }

  // Generate video thumbnail
  useEffect(() => {
    if (media?.type === "video" && media.url && !videoThumbnail) {
      const video = document.createElement("video")
      video.src = media.audioMerged && media.mergedVideoUrl ? media.mergedVideoUrl : media.url
      video.crossOrigin = "anonymous"
      video.muted = true
      video.currentTime = 1 // Seek to 1 second to get a representative frame

      video.onloadeddata = () => {
        // Create a canvas to capture the frame
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw the video frame to the canvas
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

          // Convert canvas to data URL
          const thumbnailUrl = canvas.toDataURL("image/jpeg")
          setVideoThumbnail(thumbnailUrl)
        }
      }
    }
  }, [media?.type, media?.url, media?.mergedVideoUrl, media?.audioMerged, videoThumbnail])

  // Sync audio with video playback
  useEffect(() => {
    const videoElement = videoRef.current
    const audioElement = audioRef.current
    const fullscreenVideoElement = fullscreenVideoRef.current

    // If audio is merged, we don't need to sync external audio
    if (!videoElement || !audioElement || !media?.audioUrl || media?.audioMerged) return

    const handlePlay = () => {
      audioElement.currentTime = videoElement.currentTime
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error)
      })
      setIsPlaying(true)
    }

    const handlePause = () => {
      audioElement.pause()
      setIsPlaying(false)
    }

    const handleTimeUpdate = () => {
      // Keep audio in sync with video
      if (Math.abs(audioElement.currentTime - videoElement.currentTime) > 0.3) {
        audioElement.currentTime = videoElement.currentTime
      }
    }

    const handleEnded = () => {
      audioElement.pause()
      audioElement.currentTime = 0
      setIsPlaying(false)
    }

    const handleSeeking = () => {
      // Update audio time when video is seeking
      audioElement.currentTime = videoElement.currentTime
    }

    videoElement.addEventListener("play", handlePlay)
    videoElement.addEventListener("pause", handlePause)
    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("ended", handleEnded)
    videoElement.addEventListener("seeking", handleSeeking)

    // Also handle fullscreen video if it exists
    if (fullscreenVideoElement) {
      fullscreenVideoElement.addEventListener("play", handlePlay)
      fullscreenVideoElement.addEventListener("pause", handlePause)
      fullscreenVideoElement.addEventListener("timeupdate", handleTimeUpdate)
      fullscreenVideoElement.addEventListener("ended", handleEnded)
      fullscreenVideoElement.addEventListener("seeking", handleSeeking)
    }

    return () => {
      videoElement.removeEventListener("play", handlePlay)
      videoElement.removeEventListener("pause", handlePause)
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("ended", handleEnded)
      videoElement.removeEventListener("seeking", handleSeeking)

      if (fullscreenVideoElement) {
        fullscreenVideoElement.removeEventListener("play", handlePlay)
        fullscreenVideoElement.removeEventListener("pause", handlePause)
        fullscreenVideoElement.removeEventListener("timeupdate", handleTimeUpdate)
        fullscreenVideoElement.removeEventListener("ended", handleEnded)
        fullscreenVideoElement.removeEventListener("seeking", handleSeeking)
      }

      // Ensure audio is stopped when component unmounts
      audioElement.pause()
    }
  }, [media?.audioUrl, media?.audioMerged, showFullscreen])

  // Cleanup function to stop audio when component unmounts
  useEffect(() => {
    return () => {
      // Stop audio playback when component unmounts
      if (audioRef.current) {
        audioRef.current.pause()
      }
      // Stop video playback when component unmounts
      if (videoRef.current) {
        videoRef.current.pause()
      }
      if (fullscreenVideoRef.current) {
        fullscreenVideoRef.current.pause()
      }
    }
  }, [])

  // Handle opening fullscreen view
  const openFullscreen = (url: string, type: "image" | "video", index = 0) => {
    // Stop all other videos from playing
    const allVideos = document.querySelectorAll("video")
    allVideos.forEach((video) => {
      if (video !== videoRef.current) {
        video.pause()
      }
    })

    setFullscreenMedia(url)
    setFullscreenType(type)
    setShowFullscreen(true)
    setCurrentImageIndex(index)

    // Notify parent to hide dialog
    if (onFullscreenOpen) {
      onFullscreenOpen()
    }

    // If it's a video, pause the thumbnail video
    if (type === "video" && videoRef.current) {
      videoRef.current.pause()
    }
  }

  // Add this new function to handle image navigation
  const navigateImage = (direction: "next" | "prev", e: React.MouseEvent) => {
    e.stopPropagation()

    if (!media?.urls || media.urls.length <= 1) return

    let newIndex = currentImageIndex
    if (direction === "next") {
      newIndex = (currentImageIndex + 1) % media.urls.length
    } else {
      newIndex = (currentImageIndex - 1 + media.urls.length) % media.urls.length
    }

    setCurrentImageIndex(newIndex)
    setFullscreenMedia(media.urls[newIndex])
  }

  // Add this function to update video progress
  const updateVideoProgress = () => {
    if (fullscreenVideoRef.current) {
      const progress = (fullscreenVideoRef.current.currentTime / fullscreenVideoRef.current.duration) * 100
      setVideoProgress(progress)
    }
  }

  // Add this function to handle seeking in the video
  const handleVideoSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fullscreenVideoRef.current) {
      const seekTime = (Number.parseFloat(e.target.value) / 100) * fullscreenVideoRef.current.duration
      fullscreenVideoRef.current.currentTime = seekTime
    }
  }

  // Add this effect to update video progress
  useEffect(() => {
    const videoElement = fullscreenVideoRef.current
    if (!videoElement) return

    const handleTimeUpdate = () => updateVideoProgress()
    videoElement.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [fullscreenVideoRef.current])

  // Handle closing fullscreen view
  const closeFullscreen = () => {
    // If it's a video, pause the fullscreen video
    if (fullscreenType === "video" && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause()
    }

    setShowFullscreen(false)
    setFullscreenMedia(null)
    setFullscreenType(null)

    // Notify parent to close both dialogs
    if (onFullscreenClose) {
      onFullscreenClose()
    }
  }

  // Handle back button click
  const handleBackClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    // If it's a video, pause the fullscreen video
    if (fullscreenType === "video" && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause()
    }

    setShowFullscreen(false)
    setFullscreenMedia(null)
    setFullscreenType(null)

    // Notify parent to show dialog again
    if (onFullscreenBackClick) {
      onFullscreenBackClick()
    }
  }

  // Toggle play/pause for video
  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (fullscreenVideoRef.current) {
      if (isPlaying) {
        fullscreenVideoRef.current.pause()
      } else {
        fullscreenVideoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Toggle mute for video
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }

    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.muted = !fullscreenVideoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  // Update isPlaying state when video plays or pauses
  useEffect(() => {
    const videoElement = fullscreenVideoRef.current
    if (!videoElement) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    videoElement.addEventListener("play", handlePlay)
    videoElement.addEventListener("pause", handlePause)
    videoElement.addEventListener("ended", handleEnded)

    return () => {
      videoElement.removeEventListener("play", handlePlay)
      videoElement.removeEventListener("pause", handlePause)
      videoElement.removeEventListener("ended", handleEnded)
    }
  }, [fullscreenVideoRef.current])

  // Get badge style based on type
  const getBadgeStyle = (type?: string) => {
    if (!type) return ""

    switch (type) {
      case "photo":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
      case "video":
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
      case "grooming":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
      case "boarding-extension":
        return "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700"
    }
  }

  return (
    <>
      <motion.div
        className={cn("flex gap-3 max-w-full", isAdmin ? "justify-end" : "justify-start")}
        initial="initial"
        animate="animate"
        variants={bubbleVariants}
      >
        {!isAdmin && (
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">{avatar}</AvatarFallback>
          </Avatar>
        )}

        <div className={cn("flex flex-col space-y-1 max-w-[85%] sm:max-w-[75%]", isAdmin && "items-end")}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">{sender}</span>
            <span className="text-xs text-muted-foreground">{formatTimestamp(timestamp)}</span>
          </div>

          <div
            className={cn(
              "rounded-lg px-4 py-3 text-sm break-words shadow-sm",
              isAdmin
                ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-tr-none"
                : "bg-muted rounded-tl-none border border-muted/50",
            )}
          >
            <div className="flex flex-wrap gap-1.5 mb-1">
              {type && (
                <Badge className={cn("text-xs font-medium shadow-sm", getBadgeStyle(type))}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
              )}
            </div>
            <p className="whitespace-pre-wrap">{message}</p>

            {media && (
              <div className="mt-2">
                {(media.type === "image" || type === "grooming") && media.urls && media.urls.length > 0 ? (
                  <div className={`grid ${media.urls.length > 1 ? "grid-cols-2 gap-2" : "grid-cols-1"}`}>
                    {media.urls.map((url, index) => (
                      <div
                        key={index}
                        className="relative rounded-md overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] group"
                        onClick={() => openFullscreen(url, "image", index)}
                      >
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Media ${index + 1}`}
                          className="w-full h-auto object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              openFullscreen(url, "image", index)
                            }}
                            className="bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="View fullscreen"
                          >
                            <Eye className="h-5 w-5 text-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : media.type === "video" ? (
                  <div
                    className="relative rounded-md overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] group"
                    onClick={() => openFullscreen(media.url, "video")}
                  >
                    <video
                      ref={videoRef}
                      src={media.audioMerged && media.mergedVideoUrl ? media.mergedVideoUrl : media.url}
                      className="w-full h-auto rounded-md"
                      controls
                    >
                      Your browser does not support the video tag.
                    </video>
                    {media?.audioMerged && (
                      <motion.div
                        className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center shadow-md"
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
                        <span>{media.audioName || "Audio Merged"}</span>
                      </motion.div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openFullscreen(media.url, "video")
                        }}
                        className="bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="View fullscreen"
                      >
                        <Eye className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {isAdmin && (
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">{avatar}</AvatarFallback>
          </Avatar>
        )}
      </motion.div>

      {/* Media Fullscreen Dialog - Separate from the chat bubble dialog */}
      <Dialog
        open={showFullscreen}
        onOpenChange={(open) => {
          if (!open) {
            closeFullscreen()
          }
        }}
      >
        <DialogContent className="p-0 max-w-[100vw] h-[100vh] border-none bg-transparent shadow-none">
          <div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeFullscreen}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Close button - top right */}
            <button
              className="fixed top-4 right-4 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
              onClick={closeFullscreen}
              aria-label="Close fullscreen view"
            >
              <X className="h-6 w-6" />
            </button>

            {fullscreenType === "image" ? (
              <motion.div
                className="w-full h-full flex items-center justify-center p-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <img
                  src={fullscreenMedia || "/placeholder.svg"}
                  alt="Fullscreen media"
                  className="max-w-[90%] max-h-[80vh] object-contain rounded-md shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Navigation buttons for images */}
                {media?.urls && media.urls.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 hover:bg-black/70 transition-colors"
                      onClick={(e) => navigateImage("prev", e)}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 hover:bg-black/70 transition-colors"
                      onClick={(e) => navigateImage("next", e)}
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full">
                      {currentImageIndex + 1} / {media.urls.length}
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                className="relative w-full max-w-3xl h-full flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                {/* Custom video player with centered play/pause button */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <video
                    ref={fullscreenVideoRef}
                    src={fullscreenMedia || null}
                    className="max-w-[90%] max-h-[80vh] object-contain rounded-md shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    autoPlay
                    muted={isMuted}
                  >
                    Your browser does not support the video tag.
                  </video>

                  {/* Centered play/pause button */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center ${isPlaying && !showControls ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                  >
                    <button
                      onClick={togglePlayPause}
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4 transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
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

                  {/* Audio element for background music in fullscreen - only show if audio is not merged */}
                  {media?.audioUrl && !media?.audioMerged && (
                    <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1.5 rounded-full flex items-center shadow-md">
                      <Music className="h-4 w-4 mr-2" />
                      <span>{media.audioName || "Background Music"}</span>
                    </div>
                  )}

                  {/* Show indicator for merged audio in fullscreen */}
                  {media?.audioMerged && (
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
                    className={`absolute top-4 right-16 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors ${isPlaying && !showControls ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleMute(e)
                    }}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
