"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image, Video } from "lucide-react";
import { format } from "date-fns";

interface MediaCardProps {
  id: string;
  timestamp: string | Date;
  petName: string;
  requestType: "photo" | "video";
  description?: string;
  mediaUrls: string[];
  onClick: () => void;
}

export function MediaCard({
  id,
  timestamp,
  petName,
  requestType,
  description,
  mediaUrls,
  onClick,
}: MediaCardProps) {
  // Get media type badge
  const getMediaTypeBadge = (type: string) => {
    switch (type) {
      case "photo":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700/70 font-medium"
          >
            <Image className="h-3 w-3 mr-1" /> Photo
          </Badge>
        );
      case "video":
        return (
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700/70 font-medium"
          >
            <Video className="h-3 w-3 mr-1" /> Video
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  // Format date for display
  const formatDate = (dateString: string | Date) => {
    try {
      const date =
        typeof dateString === "string" ? new Date(dateString) : dateString;
      return format(date, "MMM d, yyyy 'at' h:mm a");
    } catch (error) {
      return String(dateString);
    }
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-full border border-border/60"
      onClick={onClick}
    >
      <div className="relative aspect-square bg-muted">
        {requestType === "photo" && mediaUrls.length > 0 && (
          <>
            {/* Main image */}
            <img
              src={mediaUrls[0] || "/placeholder.svg"}
              alt={`Photo of ${petName}`}
              className="w-full h-full object-cover"
            />

            {/* Enhanced '+X' notation for multiple images */}
            {mediaUrls.length > 1 && (
              <>
                {/* For 2-3 images, show small thumbnails */}
                {mediaUrls.length <= 3 ? (
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    {mediaUrls.slice(1, 3).map((url, idx) => (
                      <div
                        key={idx}
                        className="h-8 w-8 rounded-md overflow-hidden border border-white/70 shadow-sm"
                        aria-label={`Additional photo ${idx + 2} of ${petName}`}
                      >
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Thumbnail ${idx + 2}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  // Enhanced '+X' indicator for 4+ images
                  <div
                    className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1"
                    aria-label={`${mediaUrls.length - 1} more photos available`}
                  >
                    <Image className="h-3 w-3" />+{mediaUrls.length - 1}
                  </div>
                )}
              </>
            )}
          </>
        )}
        {requestType === "video" && mediaUrls[0] && (
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <video
              src={mediaUrls[0]}
              className="w-full h-full object-cover"
              controls={false}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-black/50 p-2">
                <Video className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          {getMediaTypeBadge(requestType)}
        </div>
      </div>
      <CardContent className="p-2">
        <div className="font-medium text-sm truncate">{petName}</div>
        {description && (
          <div className="text-xs text-muted-foreground truncate">
            {description}
          </div>
        )}
        <div className="text-xs text-muted-foreground mt-1">
          {formatDate(timestamp)}
        </div>
      </CardContent>
    </Card>
  );
}
