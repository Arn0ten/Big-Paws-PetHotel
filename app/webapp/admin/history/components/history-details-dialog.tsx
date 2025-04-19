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
import type { HistoryEntry } from "../../data/history-sample-data";
import { JSX } from "react/jsx-runtime";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Left Section: Activity Details */}
          <div className="space-y-4">
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
          </div>

          {/* Right Section: Personal, Pet, Boarding, or Request Info */}
          <div className="space-y-4">
            {/* Pet Information Section */}
            {entry.petName && (
              <div className="border border-border rounded-md p-3">
                <h4 className="text-sm font-semibold mb-2">Pet Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Pet Name
                    </span>
                    <div className="text-base font-medium mt-1">
                      {entry.petName}
                    </div>
                  </div>

                  {entry.petType && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Pet Type
                      </span>
                      <div className="text-base font-medium mt-1">
                        {entry.petType}
                      </div>
                    </div>
                  )}

                  {entry.petBreed && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Breed
                      </span>
                      <div className="text-base font-medium mt-1">
                        {entry.petBreed}
                      </div>
                    </div>
                  )}

                  {entry.petSize && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Size
                      </span>
                      <div className="text-base font-medium mt-1">
                        {entry.petSize}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Owner Information Section */}
            {entry.ownerName && (
              <div className="border border-border rounded-md p-3">
                <h4 className="text-sm font-semibold mb-2">
                  Owner Information
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Owner Name
                    </span>
                    <div className="text-base font-medium mt-1">
                      {entry.ownerName}
                    </div>
                  </div>

                  {entry.ownerEmail && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Email
                      </span>
                      <div className="text-base font-medium mt-1 break-words">
                        {entry.ownerEmail}
                      </div>
                    </div>
                  )}

                  {entry.ownerPhone && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Phone
                      </span>
                      <div className="text-base font-medium mt-1">
                        {entry.ownerPhone}
                      </div>
                    </div>
                  )}

                  {entry.ownerAddress && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Address
                      </span>
                      <div className="text-base font-medium mt-1">
                        {entry.ownerAddress}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Boarding Information Section */}
            {entry.module === "boarding" && (
              <div className="border-4 border-border rounded-lg p-4 w-full">
                <h4 className="text-sm font-semibold mb-3">
                  Boarding Information
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {entry.boardingType && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Boarding Type
                      </span>
                      <div className="text-base font-medium mt-1">
                        {entry.boardingType}
                      </div>
                    </div>
                  )}

                  {entry.boardingDuration && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Duration
                      </span>
                      <div className="text-base font-medium mt-1">
                        {entry.boardingDuration}
                      </div>
                    </div>
                  )}

                  {entry.boardingStartDate && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Start Date
                      </span>
                      <div className="text-base font-medium mt-1">
                        {formatDate(entry.boardingStartDate)}
                      </div>
                    </div>
                  )}

                  {entry.boardingEndDate && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        End Date
                      </span>
                      <div className="text-base font-medium mt-1">
                        {formatDate(entry.boardingEndDate)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* {entry.mediaUrls && entry.mediaUrls.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Media
                </span>
                <div className="mt-1 bg-muted rounded-md overflow-hidden space-y-2">
                  {entry.mediaUrls.map((url, index) => (
                    <div key={index}>
                      {entry.mediaTypes?.[index] === "image" && (
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Media ${index + 1}`}
                          className="w-full h-auto object-contain"
                        />
                      )}
                      {entry.mediaTypes?.[index] === "video" && (
                        <video src={url} controls className="w-full h-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>
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
