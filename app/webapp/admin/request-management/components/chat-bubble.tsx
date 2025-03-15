"use client"

import { format } from "date-fns"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { motion } from "framer-motion" // Add framer-motion import

interface ChatBubbleProps {
  sender: string
  message: string
  timestamp: string
  avatar: string
  isAdmin?: boolean
  type?: string
  isUrgent?: boolean
  media?: {
    url: string
    type: "image" | "video"
    urls?: string[] // Add support for multiple media files
  }
}

export function ChatBubble({
  sender,
  message,
  timestamp,
  avatar,
  isAdmin = false,
  type,
  isUrgent,
  media,
}: ChatBubbleProps) {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

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
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {media.urls.slice(0, 4).map((url, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden">
                      <img
                        src={url || "/placeholder.svg?height=150&width=150"}
                        alt={`Media ${index + 1}`}
                        className="w-full h-[150px] object-cover"
                      />
                      {index === 3 && media.urls && media.urls.length > 4 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-medium">
                          +{media.urls.length - 4} more
                        </div>
                      )}
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
                <video
                  src={media.url || "/placeholder.svg?height=300&width=400"}
                  controls
                  preload="metadata"
                  className="max-w-full h-auto rounded-md"
                  style={{ maxHeight: "300px" }}
                >
                  Your browser does not support the video tag.
                </video>
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

