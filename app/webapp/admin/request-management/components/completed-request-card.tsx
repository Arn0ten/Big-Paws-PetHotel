"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink } from "lucide-react";
import {
  getRequestTypeIcon,
  getRequestTypeLabel,
  getCardBgColor,
  formatDate,
} from "../utils/ui-helpers";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChatBubble } from "./chat-bubble";

interface CompletedRequestCardProps {
  request: any;
}

export function CompletedRequestCard({ request }: CompletedRequestCardProps) {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card
        className={`w-full h-[280px] flex flex-col cursor-pointer ${
          request.isNewlyCompleted
            ? "ring-2 ring-green-500 dark:ring-green-400"
            : ""
        } ${getCardBgColor(request.type, false)}`}
        onClick={() => setShowDetailsDialog(true)}
      >
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div
                className={`p-2 rounded-full ${getIconBgColorClass(request.type)}`}
              >
                {getRequestTypeIcon(request.type)}
              </div>
              <div>
                <CardTitle className="text-base font-semibold tracking-tight">
                  {getRequestTypeLabel(request.type)}
                </CardTitle>
                <CardDescription className="text-foreground/70 dark:text-foreground/60 font-medium">
                  {request.petName}{" "}
                  <span className="text-muted-foreground">
                    ({request.petOwnerName})
                  </span>
                </CardDescription>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-green-100 text-green-700 border-green-200 ml-auto"
            >
              <CheckCircle className="h-3 w-3 mr-1" /> Completed
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow overflow-hidden">
          <p className="text-sm line-clamp-2 text-foreground/90 dark:text-foreground/80">
            {request.description}
          </p>

          <div className="mt-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Completed
            </span>
            <div className="text-sm font-medium mt-0.5">
              {formatDate(request.completedAt || request.createdAt)}
            </div>
          </div>

          {request.mediaFiles && (
            <div className="mt-3">
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Media
              </span>
              <div className="text-sm font-medium mt-0.5">
                {request.mediaFiles.count}{" "}
                {request.mediaFiles.type === "photo" ? "photo(s)" : "video(s)"}{" "}
                uploaded
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowDetailsDialog(true)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </CardFooter>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <span
                className={`p-1 rounded-full ${getIconBgColorClass(request.type)}`}
              >
                {getRequestTypeIcon(request.type)}
              </span>
              {getRequestTypeLabel(request.type)} - {request.petName}
            </DialogTitle>
            <DialogDescription>
              Completed on {formatDate(request.completedAt)} by{" "}
              {request.completedBy || "Admin"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Request details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Pet Owner
                </span>
                <div className="text-base font-medium mt-1">
                  {request.petOwnerName}
                </div>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Pet
                </span>
                <div className="text-base font-medium mt-1">
                  {request.petName}
                </div>
              </div>
            </div>

            {/* Request description */}
            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Request
              </span>
              <div className="mt-1 p-3 bg-muted/30 rounded-md text-base whitespace-pre-wrap">
                {request.description}
              </div>
            </div>

            {/* Processing notes if available */}
            {request.processingNotes && (
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Processing Notes
                </span>
                <div className="mt-1 p-3 bg-muted/30 rounded-md text-base whitespace-pre-wrap">
                  {request.processingNotes}
                </div>
              </div>
            )}

            {/* Media files if available */}
            {request.mediaFiles &&
              request.mediaFiles.urls &&
              request.mediaFiles.urls.length > 0 && (
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    {request.mediaFiles.type === "photo" ? "Photos" : "Videos"}
                  </span>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {request.mediaFiles.urls.map(
                      (url: string, index: number) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-md overflow-hidden"
                        >
                          {request.mediaFiles.type === "photo" ? (
                            <img
                              src={url || "/placeholder.svg"}
                              alt={`${request.petName} - ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <video
                              src={url}
                              controls
                              className="w-full h-full object-cover"
                              poster="/placeholder.svg?height=200&width=200"
                            />
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

            {/* Chat-like interface for the request timeline */}
            <div className="mt-6">
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Request Timeline
              </span>
              <div className="mt-2 space-y-3">
                <ChatBubble
                  type="owner"
                  message={request.description}
                  timestamp={request.createdAt}
                  name={request.petOwnerName}
                />

                {request.approvedAt && (
                  <ChatBubble
                    type="admin"
                    message="Request approved"
                    timestamp={request.approvedAt}
                    name={request.approvedBy || "Admin"}
                    isAction
                  />
                )}

                {request.completedAt && (
                  <ChatBubble
                    type="admin"
                    message={
                      request.processingNotes
                        ? request.processingNotes
                        : `Request completed: ${getRequestTypeLabel(request.type)} for ${request.petName}`
                    }
                    timestamp={request.completedAt}
                    name={request.completedBy || "Admin"}
                    mediaFiles={request.mediaFiles}
                  />
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// Helper function to get icon background color class
function getIconBgColorClass(type: string) {
  switch (type) {
    case "photo":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    case "video":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
    case "grooming":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "boarding-extension":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300";
    case "custom":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
  }
}
