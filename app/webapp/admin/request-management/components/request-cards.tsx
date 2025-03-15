"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { formatDate } from "../utils/helpers"
import { formatCurrency } from "../../boarding/utils/helpers"
import { getRequestTypeIcon, getRequestTypeLabel, getCardBorderColor, getCardBgColor } from "../utils/ui-helpers"
import { ChatBubble } from "./chat-bubble"
import { Input } from "@/components/ui/input"

// In Progress Request Card
export interface InProgressRequestCardProps {
  request: any
  onProcess: () => void
  onUndoAccept?: () => void
  onViewDetails: () => void
}

export function InProgressRequestCard({ request, onProcess, onUndoAccept, onViewDetails }: InProgressRequestCardProps) {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isSmallCard = useMediaQuery("(max-width: 400px)")

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.3,
      }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card
        className={`w-full h-full flex flex-col ${getCardBorderColor(request.type, request.isUrgent)} ${getCardBgColor(request.type, request.isUrgent)} cursor-pointer hover:shadow-md transition-shadow`}
        onClick={onViewDetails}
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
                  {request.petName} <span className="text-muted-foreground">({request.petOwnerName})</span>
                </CardDescription>
              </div>
            </div>
            {request.isUrgent && (
              <Badge variant="destructive" className="ml-auto">
                Urgent
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow">
          <p className="text-sm line-clamp-3 text-foreground/90 dark:text-foreground/80">{request.description}</p>

          {request.type === "boarding-extension" && request.extensionDetails && (
            <div className="mt-3 flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Extension</span>
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-amber-700 dark:text-amber-400">
                  {request.extensionDetails.duration} {request.extensionDetails.unit}
                </span>
                {request.price && (
                  <span className="text-base font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(request.price)}
                  </span>
                )}
              </div>
            </div>
          )}

          {request.type === "grooming" && request.groomingService && (
            <div className="mt-3 flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Service</span>
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-green-700 dark:text-green-400">
                  {request.groomingService.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
                {request.price && (
                  <span className="text-base font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(request.price)}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mt-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Submitted</span>
            <div className="text-sm font-medium mt-0.5">{formatDate(request.createdAt)}</div>
          </div>

          {/* Show undo reason if this was previously completed and undone */}
          {request.undoReason && (
            <div className="mt-3 p-2 bg-amber-50 border border-amber-100 rounded-md dark:bg-amber-950/20 dark:border-amber-800">
              <p className="text-xs uppercase tracking-wide text-amber-700 dark:text-amber-300 font-medium">
                Returned to In-Progress
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">{request.undoReason}</p>
              <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">
                {request.undoTimestamp ? formatDate(request.undoTimestamp) : ""}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className={`p-4 pt-0 mt-auto flex flex-col gap-2`}>
          <Button
            className="w-full"
            onClick={(e) => {
              e.stopPropagation() // Prevent card click event
              onProcess() // Use the passed prop instead of direct state manipulation
            }}
            size={isSmallCard ? "sm" : "default"}
          >
            Process Request
          </Button>
          <Button
            variant="outline"
            className="w-full text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950/50"
            onClick={(e) => {
              e.stopPropagation() // Prevent card click event
              onUndoAccept && onUndoAccept()
            }}
            size={isSmallCard ? "sm" : "default"}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to New
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

// Completed Request Card
export interface CompletedRequestCardProps {
  request: any
}

export function CompletedRequestCard({ request }: CompletedRequestCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Check if this is a newly completed request
  const isNewlyCompleted = request.isNewlyCompleted

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
            isNewlyCompleted ? "ring-2 ring-green-400 dark:ring-green-600 shadow-md" : ""
          }`}
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
                    {request.petName} <span className="text-muted-foreground">({request.petOwnerName})</span>
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
            <p className="text-sm line-clamp-2 text-foreground/90 dark:text-foreground/80">{request.description}</p>

            {(request.type === "grooming" || request.type === "boarding-extension") && request.price && (
              <div className="mt-3 flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Price</span>
                <span className="text-base font-medium text-green-600 dark:text-green-400">
                  {formatCurrency(request.price)}
                </span>
              </div>
            )}

            <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-3">
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Submitted</span>
                <div className="text-sm font-medium mt-0.5">{formatDate(request.createdAt)}</div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Completed</span>
                <div className="text-sm font-medium mt-0.5">{formatDate(request.completedAt)}</div>
              </div>

              <div className="col-span-2">
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Completed by</span>
                <div className="text-sm font-medium mt-0.5">{request.completedBy}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 mt-auto">
            <Button variant="outline" className="w-full" onClick={() => setShowDetails(true)}>
              View Details
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className={`${isMobile ? "w-[95vw] max-w-lg" : "max-w-4xl"} h-[80vh] p-0 flex flex-col`}>
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
            <DialogDescription>
              Completed on {formatDate(request.completedAt)} by {request.completedBy}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left panel - Request details */}
            <div className="w-full md:w-1/2 border-r overflow-y-auto p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Pet Information</h3>
                  <p className="text-base font-medium">{request.petName}</p>
                  <p className="text-sm text-muted-foreground">Owner: {request.petOwnerName}</p>
                </div>

                {request.type === "boarding-extension" && request.extensionDetails && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Extension Details</h3>
                    <p className="text-base">
                      <span className="font-medium">Duration:</span> {request.extensionDetails.duration}{" "}
                      {request.extensionDetails.unit}
                    </p>
                    {request.price && (
                      <p className="text-base">
                        <span className="font-medium">Price:</span> {formatCurrency(request.price)}
                      </p>
                    )}
                    {request.newEndDate && (
                      <p className="text-base">
                        <span className="font-medium">New End Date:</span> {formatDate(request.newEndDate)}
                      </p>
                    )}
                  </div>
                )}

                {request.type === "grooming" && request.groomingService && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Grooming Service</h3>
                    <p className="text-base">
                      {request.groomingService.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </p>
                    {request.price && (
                      <p className="text-base">
                        <span className="font-medium">Price:</span> {formatCurrency(request.price)}
                      </p>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Submitted</h3>
                    <p className="text-base">{formatDate(request.createdAt)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Completed</h3>
                    <p className="text-base">{formatDate(request.completedAt)}</p>
                  </div>
                </div>

                {request.fileUploaded && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Media</h3>
                    <div className="mt-2 p-3 bg-muted rounded-md text-center text-muted-foreground">
                      {request.type === "photo" ? "Photo uploaded" : "Video uploaded"}
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
                  isUrgent={request.isUrgent}
                />

                {/* Admin response message */}
                <ChatBubble
                  sender={request.completedBy || "Admin"}
                  message={request.processingNotes || "Request completed successfully."}
                  timestamp={request.completedAt}
                  avatar="A"
                  isAdmin={true}
                />

                {/* Conditional media message from admin */}
                {request.fileUploaded && (
                  <ChatBubble
                    sender={request.completedBy || "Admin"}
                    message={`Here's the ${request.type} of ${request.petName} as requested.`}
                    timestamp={request.completedAt}
                    avatar="A"
                    isAdmin={true}
                    media={{
                      url: "/placeholder.svg?height=300&width=400",
                      type: request.type === "photo" ? "image" : "video",
                    }}
                  />
                )}

                {/* Conditional confirmation message for boarding extension */}
                {request.type === "boarding-extension" && request.newEndDate && (
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

              {/* Disabled input area to simulate messenger interface */}
              <div className="p-4 border-t flex items-center gap-2">
                <Input className="flex-1" placeholder="This conversation is completed" disabled />
                <Button size="icon" variant="ghost" disabled>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-send-horizontal"
                  >
                    <path d="m3 3 3 9-3 9 19-9Z" />
                    <path d="M6 12h16" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Skeleton and Empty State components
export function RequestCardSkeleton() {
  return (
    <div className="h-full">
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-9 w-9 rounded-full animate-pulse" />
              <div>
                <Skeleton className="h-5 w-32 mb-1 animate-pulse" />
                <Skeleton className="h-4 w-24 animate-pulse" />
              </div>
            </div>
            <Skeleton className="h-5 w-16 rounded-full animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow">
          <Skeleton className="h-4 w-full mb-2 animate-pulse" />
          <Skeleton className="h-4 w-3/4 mb-2 animate-pulse" />
          <Skeleton className="h-4 w-1/2 mb-4 animate-pulse" />
          <Skeleton className="h-3 w-32 mt-auto animate-pulse" />
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Skeleton className="h-9 w-full animate-pulse" />
        </CardFooter>
      </Card>
    </div>
  )
}

export function EmptyState({ message = "No requests found" }: { message?: string }) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">{message}</h3>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Requests will appear here when pet owners submit them
        </p>
      </CardContent>
    </Card>
  )
}

