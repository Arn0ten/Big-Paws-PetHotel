"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import {
  formatCurrency,
  formatDate,
  getRequestTypeIcon,
  getRequestTypeLabel,
} from "../utils/ui-helpers";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChatBubble } from "./chat-bubble";

interface CompletedRequestCardProps {
  request: any;
}

export function CompletedRequestCard({ request }: CompletedRequestCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isNewlyCompleted, setIsNewlyCompleted] = useState(
    request.isNewlyCompleted,
  );
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Remove the 'new' badge when the details dialog is opened
  const handleViewDetails = () => {
    setIsNewlyCompleted(false);
    setShowDetails(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        className="h-full"
      >
        <Card
          className={`border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 w-full h-full flex flex-col ${
            isNewlyCompleted
              ? "ring-2 ring-green-400 dark:ring-green-600 shadow-md"
              : ""
          }`}
          onClick={handleViewDetails}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <div
                  className={`
                p-2 rounded-full 
                ${request.type === "photo" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : ""}
                ${request.type === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : ""}
                ${request.type === "grooming" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}
                ${request.type === "boarding-extension" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" : ""}
                ${request.type === "custom" ? "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300" : ""}
              `}
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
              <div className="flex items-center gap-1">
                {isNewlyCompleted && (
                  <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800"
                  >
                    New
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800"
                >
                  <CheckCircle className="h-3 w-3 mr-1" /> Completed
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2 flex-grow">
            <p className="text-sm line-clamp-2 text-foreground/90 dark:text-foreground/80">
              {request.description}
            </p>

            {(request.type === "grooming" ||
              request.type === "boarding-extension") &&
              request.price && (
                <div className="mt-3 flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Price
                  </span>
                  <span className="text-base font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(request.price)}
                  </span>
                </div>
              )}

            <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-3">
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Submitted
                </span>
                <div className="text-sm font-medium mt-0.5">
                  {formatDate(request.createdAt)}
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Completed
                </span>
                <div className="text-sm font-medium mt-0.5">
                  {formatDate(request.completedAt)}
                </div>
              </div>

              <div className="col-span-2">
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Completed by
                </span>
                <div className="text-sm font-medium mt-0.5">
                  {request.completedBy}
                </div>
              </div>
            </div>

            {/* Show media thumbnail if available */}
            {request.mediaFiles &&
              (request.type === "photo" || request.type === "video") && (
                <div className="mt-3">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    {request.type === "photo" ? "Photos" : "Video"}
                  </span>
                  <div className="mt-1 bg-muted/30 rounded-md p-2 flex items-center justify-between">
                    <span className="text-sm">
                      {request.mediaFiles.count || 1} {request.type}
                      {request.mediaFiles.count > 1 ? "s" : ""} uploaded
                    </span>
                    <Badge variant="outline" className="text-xs">
                      View in details
                    </Badge>
                  </div>
                </div>
              )}
          </CardContent>
          <CardFooter className="p-4 pt-0 mt-auto">
            <Button
              variant="outline"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog
        open={showDetails}
        onOpenChange={(open) => {
          if (!open) {
            setShowDetails(false);
          }
        }}
      >
        <DialogContent
          className={`${isMobile ? "w-[95vw] max-w-lg" : "max-w-4xl"} ${isMobile ? "h-[90vh]" : "h-[85vh]"} p-0 flex flex-col`}
        >
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-xl flex items-center gap-2">
              <div
                className={`
        p-2 rounded-full 
        ${request.type === "photo" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : ""}
        ${request.type === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : ""}
        ${request.type === "grooming" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}
        ${request.type === "boarding-extension" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" : ""}
        ${request.type === "custom" ? "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300" : ""}
      `}
              >
                {getRequestTypeIcon(request.type)}
              </div>
              {getRequestTypeLabel(request.type)} Request
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left panel - Request details */}
            <div className="w-full md:w-1/2 border-r overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900/30">
              <div className="space-y-5">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                  <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                    Pet Information
                  </h3>
                  <p className="text-lg font-semibold">{request.petName}</p>
                  <p className="text-sm">
                    Owner:{" "}
                    <span className="font-medium">{request.petOwnerName}</span>
                  </p>
                </div>

                {request.type === "boarding-extension" &&
                  request.extensionDetails && (
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                      <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                        Extension Details
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Duration:</span>
                          <span className="text-base font-medium text-amber-700 dark:text-amber-400">
                            {request.extensionDetails.duration}{" "}
                            {request.extensionDetails.unit}
                          </span>
                        </div>
                        {request.price && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Price:</span>
                            <span className="text-base font-medium text-green-600 dark:text-green-400">
                              {formatCurrency(request.price)}
                            </span>
                          </div>
                        )}
                        {request.newEndDate && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm">New End Date:</span>
                            <span className="text-base font-medium">
                              {formatDate(request.newEndDate)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                {request.type === "grooming" && request.groomingService && (
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                    <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                      Grooming Service
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Service:</span>
                        <span className="text-base font-medium text-green-700 dark:text-green-400">
                          {request.groomingService
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                      {request.price && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Price:</span>
                          <span className="text-base font-medium text-green-600 dark:text-green-400">
                            {formatCurrency(request.price)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                  <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                    Timeline
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Submitted:</span>
                      <span className="text-base font-medium">
                        {formatDate(request.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Completed:</span>
                      <span className="text-base font-medium">
                        {formatDate(request.completedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {request.mediaFiles && (
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                    <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                      Media
                    </h3>
                    <div className="p-3 bg-muted/50 rounded-md text-center">
                      <span className="font-medium">
                        {request.mediaFiles.count || 1} {request.type}
                        {request.mediaFiles.count > 1 ? "s" : ""} uploaded
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right panel - Chat conversation */}
            <div className="w-full md:w-1/2 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Pet owner request message */}
                <ChatBubble
                  sender={request.petOwnerName}
                  message={request.description}
                  timestamp={request.createdAt}
                  avatar={request.petOwnerName.charAt(0)}
                  isAdmin={false}
                  type={request.type}
                />

                {/* Admin response message */}
                <ChatBubble
                  sender={request.completedBy || "Admin"}
                  message={
                    request.processingNotes || "Request completed successfully."
                  }
                  timestamp={request.completedAt}
                  avatar="A"
                  isAdmin={true}
                />

                {/* Conditional media message from admin */}
                {request.mediaFiles && (
                  <ChatBubble
                    sender={request.completedBy || "Admin"}
                    message={`Here's the ${
                      request.type === "photo"
                        ? request.mediaFiles.count > 1
                          ? "photos"
                          : "photo"
                        : "video"
                    } of ${request.petName} as requested.`}
                    timestamp={request.completedAt}
                    avatar="A"
                    isAdmin={true}
                    media={{
                      url: request.mediaFiles.urls
                        ? request.mediaFiles.urls[0]
                        : "/placeholder.svg?height=300&width=400",
                      type: request.type === "photo" ? "image" : "video",
                      urls: request.mediaFiles.urls,
                      audioUrl: request.mediaFiles.audioUrl,
                      audioName: request.mediaFiles.audioName,
                    }}
                  />
                )}

                {/* Conditional confirmation message for boarding extension */}
                {request.type === "boarding-extension" &&
                  request.newEndDate && (
                    <ChatBubble
                      sender={request.completedBy || "Admin"}
                      message={`The boarding extension has been approved. The new end date is ${formatDate(request.newEndDate)}.`}
                      timestamp={request.completedAt}
                      avatar="A"
                      isAdmin={true}
                    />
                  )}

                {/* Conditional confirmation message for grooming */}
                {request.type === "grooming" && (
                  <ChatBubble
                    sender={request.completedBy || "Admin"}
                    message={`The grooming service (${request.groomingService.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}) has been completed for ${request.petName}.`}
                    timestamp={request.completedAt}
                    avatar="A"
                    isAdmin={true}
                  />
                )}
              </div>

              {/* Removed chat input area - no longer needed */}
              <div className="p-4 border-t">
                <div className="text-center text-sm text-muted-foreground">
                  This conversation is completed
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
