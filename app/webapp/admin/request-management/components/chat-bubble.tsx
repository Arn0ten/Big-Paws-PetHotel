"use client"

import { format } from "date-fns"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { motion } from "framer-motion" // Add framer-motion import
import { useRef, useState, useEffect } from "react"
import { Music } from "lucide-react"

interface ChatBubbleProps {
  sender: string
  message: string
  timestamp: string
  avatar: string
  isAdmin: boolean
  type?: string
  isUrgent?: boolean
  media?: {
    url: string
    type: "image" | "video"
    urls?: string[]
    audioUrl?: string
    audioName?: string
  }
}

// Update ChatBubble to support audio with video
export function ChatBubble({ sender, message, timestamp, avatar, isAdmin, type, isUrgent, media }: ChatBubbleProps) {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isSmallScreen = useMediaQuery("(max-width: 768px)")
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

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

  // Sync audio with video playback
  useEffect(() => {
    const videoElement = videoRef.current
    const audioElement = audioRef.current

    if (!videoElement || !audioElement || !media?.audioUrl) return

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

    return () => {
      videoElement.removeEventListener("play", handlePlay)
      videoElement.removeEventListener("pause", handlePause)
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("ended", handleEnded)
      videoElement.removeEventListener("seeking", handleSeeking)

      // Ensure audio is stopped when component unmounts
      audioElement.pause()
    }
  }, [media?.audioUrl])

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
    }
  }, [])

  return (
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
            "rounded-lg px-4 py-3 text-sm break-words",
            isAdmin ? "bg-primary text-primary-foreground" : "bg-muted",
          )}
        >
          <div className="flex flex-wrap gap-1.5 mb-1">
            {type && (
              <Badge
                className={cn(
                  "text-xs font-medium",
                  type === "photo" && "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
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
                <div className={`grid ${media.urls.length > 2 ? "grid-cols-2" : "grid-cols-1"} gap-2 mt-2`}>
                  {media.urls.map((url, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden">
                      <img
                        src={url || "/placeholder.svg?height=150&width=150"}
                        alt={`Media ${index + 1}`}
                        className="w-full h-[150px] object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : // Single media file
              media.type === "image" ? (
                <img
                  src={media.url || "/placeholder.svg?height=300&width=400"}
                  alt="Shared media"
                  className="max-w-full h-auto rounded-md object-cover"
                  style={{ maxHeight: "300px" }}
                />
              ) : (
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={media.url || "/placeholder.svg?height=300&width=400"}
                    controls
                    preload="metadata"
                    className="max-w-full h-auto rounded-md"
                    style={{ maxHeight: "300px" }}
                  >
                    Your browser does not support the video tag.
                  </video>

                  {/* Audio element for background music */}
                  {media.audioUrl && (
                    <>
                      <audio ref={audioRef} src={media.audioUrl} loop={false} hidden />
                      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center">
                        <Music className="h-3 w-3 mr-1" />
                        <span>{media.audioName || "Background Music"}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
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
  )
}

