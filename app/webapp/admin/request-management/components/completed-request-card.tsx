"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink } from "lucide-react"
import { getRequestTypeIcon, getRequestTypeLabel, getCardBgColor, formatDate } from "../utils/ui-helpers"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChatBubble } from "./chat-bubble"
import { Camera, Clock, Scissors, Video } from "lucide-react"

interface CompletedRequestCardProps {
  request: any
}

export function CompletedRequestCard({ request }: CompletedRequestCardProps) {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

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
          request.isNewlyCompleted ? "ring-2 ring-green-500 dark:ring-green-400" : ""
        } ${getCardBgColor(request.type, false)}`}
        onClick={() => setShowDetailsDialog(true)}
      >
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-full ${getIconBgColorClass(request.type)}`}>
                {getRequestTypeIcon(request.type)}
              </div>
              <div>
                <CardTitle className="text-base font-semibold tracking-tight">
                  {getRequestTypeLabel(request.type)}
                </CardTitle>
                <CardDescription className="text-foreground/70 dark:text-foreground/60 font-medium">
                  {request.petName} <span className="text-muted-foreground">({request.petOwnerName})</span>
                </CardDescription>
              </div>
            </div>
            <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white ml-auto">
              <CheckCircle className="h-3 w-3 mr-1" /> Completed
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow overflow-hidden">
          <p className="text-sm line-clamp-2 text-foreground/90 dark:text-foreground/80">{request.description}</p>

          <div className="mt-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Completed</span>
            <div className="text-sm font-medium mt-0.5">{formatDate(request.completedAt || request.createdAt)}</div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Button variant="outline" className="w-full" onClick={() => setShowDetailsDialog(true)}>
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
              <span className={`p-1 rounded-full ${getIconBgColorClass(request.type)}`}>
                {getRequestTypeIcon(request.type)}
              </span>
              {getRequestTypeLabel(request.type)} - {request.petName}
            </DialogTitle>
            <DialogDescription>
              Completed on {formatDate(request.completedAt)} by {request.completedBy || "Admin"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Request details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Pet Owner</span>
                <div className="text-base font-medium mt-1">{request.petOwnerName}</div>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Pet</span>
                <div className="text-base font-medium mt-1">{request.petName}</div>
              </div>
            </div>

            {/* Request description */}
            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Request</span>
              <div className="mt-1 p-3 bg-muted/30 rounded-md text-base whitespace-pre-wrap">{request.description}</div>
            </div>

            {/* Request type specific details */}
            {request.type === "grooming" && (
              <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md space-y-2">
                <h4 className="font-medium text-green-800 dark:text-green-300 flex items-center">
                  <Scissors className="h-4 w-4 mr-2" /> Grooming Service Details
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Service Type:</span>
                    <div className="font-medium">
                      {request.groomingService?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) ||
                        "Standard Grooming"}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pet Size:</span>
                    <div className="font-medium">{request.petSize || "Medium"}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <div className="font-medium text-green-700 dark:text-green-400">
                      {request.price ? `₱${request.price.toFixed(2)}` : "Price not specified"}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <div className="font-medium">{request.duration || "1-2 hours"}</div>
                  </div>
                </div>
              </div>
            )}

            {request.type === "boarding-extension" && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md space-y-2">
                <h4 className="font-medium text-amber-800 dark:text-amber-300 flex items-center">
                  <Clock className="h-4 w-4 mr-2" /> Boarding Extension Details
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Original End Date:</span>
                    <div className="font-medium">
                      {request.currentEndDate ? formatDate(request.currentEndDate) : "Not specified"}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Extension:</span>
                    <div className="font-medium text-amber-700 dark:text-amber-400">
                      {request.extensionDetails
                        ? `${request.extensionDetails.duration} ${request.extensionDetails.unit}`
                        : "Not specified"}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">New End Date:</span>
                    <div className="font-medium">
                      {request.newEndDate ? formatDate(request.newEndDate) : "Not specified"}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Additional Cost:</span>
                    <div className="font-medium text-green-700 dark:text-green-400">
                      {request.price ? `₱${request.price.toFixed(2)}` : "Price not specified"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {request.type === "video" && (
              <div className="p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-md space-y-2">
                <h4 className="font-medium text-purple-800 dark:text-purple-300 flex items-center">
                  <Video className="h-4 w-4 mr-2" /> Video Request Details
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Video Duration:</span>
                    <div className="font-medium">{request.videoDuration || "Up to 60 seconds"}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Background Music:</span>
                    <div className="font-medium">
                      {request.selectedAudioName || (request.audioMerged ? "Added" : "None")}
                    </div>
                  </div>
                  {request.videoSpecialRequests && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Special Requests:</span>
                      <div className="font-medium">{request.videoSpecialRequests}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {request.type === "photo" && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md space-y-2">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 flex items-center">
                  <Camera className="h-4 w-4 mr-2" /> Photo Request Details
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Number of Photos:</span>
                    <div className="font-medium">{request.mediaFiles?.count || "Multiple"}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Photo Type:</span>
                    <div className="font-medium">{request.photoType || "Standard"}</div>
                  </div>
                  {request.photoSpecialRequests && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Special Requests:</span>
                      <div className="font-medium">{request.photoSpecialRequests}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

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
            {/* {request.mediaFiles && request.mediaFiles.urls && request.mediaFiles.urls.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  {request.mediaFiles.type === "photo" ? "Photos" : "Videos"}
                </span>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {request.mediaFiles.urls.map((url: string, index: number) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden">
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
                  ))}
                </div>
              </div>
            )} */}

            {/* Chat-like interface for the request timeline */}
            <div className="mt-6">
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Request Timeline
              </span>
              <div className="mt-2 space-y-3">
                <ChatBubble
                  sender={request.petOwnerName}
                  message={request.description}
                  timestamp={request.createdAt}
                  avatar={request.petOwnerName.charAt(0).toUpperCase()}
                  isAdmin={false}
                  type={request.type}
                />

                {request.approvedAt && (
                  <ChatBubble
                    sender={request.approvedBy || "Admin"}
                    message={`Request approved and in progress`}
                    timestamp={request.approvedAt}
                    avatar={(request.approvedBy || "Admin").charAt(0).toUpperCase()}
                    isAdmin={true}
                  />
                )}

                {request.completedAt && (
                  <ChatBubble
                    sender={request.completedBy || "Admin"}
                    message={
                      request.processingNotes
                        ? request.processingNotes
                        : `Request completed: ${getRequestTypeLabel(request.type)} for ${request.petName}`
                    }
                    timestamp={request.completedAt}
                    avatar={(request.completedBy || "Admin").charAt(0).toUpperCase()}
                    isAdmin={true}
                    type={request.type}
                    media={
                      request.mediaFiles
                        ? {
                            url: request.mediaFiles.urls?.[0] || "",
                            type:
                              request.mediaFiles.type === "photo" || request.type === "grooming" ? "image" : "video",
                            urls: request.mediaFiles.urls,
                            audioUrl: request.selectedAudioUrl,
                            audioName: request.selectedAudioName,
                            audioMerged: request.audioMerged,
                            mergedVideoUrl: request.mergedVideoUrl,
                          }
                        : undefined
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

// Helper function to get icon background color class
function getIconBgColorClass(type: string) {
  switch (type) {
    case "photo":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
    case "video":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
    case "grooming":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
    case "boarding-extension":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
    case "custom":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
  }
}
