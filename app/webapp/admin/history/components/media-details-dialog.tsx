"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Download, Trash2 } from "lucide-react"
import { formatDate } from "../utils/helpers"
import type { MediaEntry } from "../../data/history-sample-data"
import { JSX } from "react/jsx-runtime"

interface MediaDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  media: MediaEntry | null
  onDelete: () => void
  onDownload: () => void
  getMediaTypeBadge: (type: string) => JSX.Element
}

export function MediaDetailsDialog({
  open,
  onOpenChange,
  media,
  onDelete,
  onDownload,
  getMediaTypeBadge,
}: MediaDetailsDialogProps) {
  if (!media) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Media Details</DialogTitle>
          <DialogDescription>Detailed view of the media request</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted rounded-md overflow-hidden">
            {media.requestType === "photo" && media.mediaUrls[0] && (
              <img
                src={media.mediaUrls[0] || "/placeholder.svg"}
                alt={`Photo of ${media.petName}`}
                className="w-full h-auto object-contain max-h-[400px]"
              />
            )}
            {media.requestType === "video" && media.mediaUrls[0] && (
              <video src={media.mediaUrls[0]} controls className="w-full h-auto max-h-[400px]" />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Pet Name</span>
              <div className="text-base font-medium mt-1">{media.petName}</div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Owner Name</span>
              <div className="text-base font-medium mt-1">{media.ownerName}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Request Type</span>
              <div className="text-base font-medium mt-1">{getMediaTypeBadge(media.requestType)}</div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Completed By</span>
              <div className="text-base font-medium mt-1">{media.completedBy}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Requested On</span>
              <div className="text-base font-medium mt-1">{formatDate(media.timestamp)}</div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Completed On</span>
              <div className="text-base font-medium mt-1">{formatDate(media.completedAt)}</div>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Description</span>
            <div className="text-base mt-1">{media.description}</div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="default" onClick={onDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

