"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { formatCurrency, formatDate } from "../utils/helpers";
import type { HistoryEntry } from "../data/sample-data";

interface HistoryDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry: HistoryEntry | null;
  onDelete: () => void;
  getModuleIcon: (module: string) => JSX.Element;
  getModuleLabel: (module: string) => string;
  getStatusBadge: (status: string | undefined) => JSX.Element | null;
}

export function HistoryDetailsDialog({
  open,
  onOpenChange,
  entry,
  onDelete,
  getModuleIcon,
  getModuleLabel,
  getStatusBadge,
}: HistoryDetailsDialogProps) {
  if (!entry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Activity Details</DialogTitle>
          <DialogDescription>
            Detailed information about this activity
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Timestamp
              </span>
              <div className="text-base font-medium mt-1">
                {formatDate(entry.timestamp)}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Module
              </span>
              <div className="text-base font-medium mt-1 flex items-center gap-2">
                {getModuleIcon(entry.module)}
                <span>{getModuleLabel(entry.module)}</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Description
            </span>
            <div className="text-base font-medium mt-1">
              {entry.description}
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Performed By
            </span>
            <div className="text-base font-medium mt-1">
              {entry.performedBy}
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Status
            </span>
            <div className="text-base font-medium mt-1">
              {getStatusBadge(entry.status)}
            </div>
          </div>

          {(entry.petName || entry.ownerName) && (
            <div className="grid grid-cols-2 gap-4">
              {entry.petName && (
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Pet
                  </span>
                  <div className="text-base font-medium mt-1">
                    {entry.petName}
                  </div>
                </div>
              )}

              {entry.ownerName && (
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Owner
                  </span>
                  <div className="text-base font-medium mt-1">
                    {entry.ownerName}
                  </div>
                </div>
              )}
            </div>
          )}

          {entry.amount && (
            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Amount
              </span>
              <div className="text-base font-medium mt-1 text-green-600 dark:text-green-400">
                {formatCurrency(entry.amount)}
              </div>
            </div>
          )}

          {entry.mediaUrl && (
            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Media
              </span>
              <div className="mt-1 bg-muted rounded-md overflow-hidden">
                {entry.mediaType === "image" && (
                  <img
                    src={entry.mediaUrl || "/placeholder.svg"}
                    alt="Media"
                    className="w-full h-auto object-contain"
                  />
                )}
                {entry.mediaType === "video" && (
                  <video
                    src={entry.mediaUrl}
                    controls
                    className="w-full h-auto"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
