"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { format, formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Video,
  Scissors,
  Clock,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock8,
  Info,
  Loader2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface RequestCardProps {
  request: {
    id: string
    type: string
    petName: string
    status: string
    createdAt: string
    description: string
    inProgress?: boolean
    completedAt?: string
    rejectionReason?: string
    extensionDetails?: {
      duration: string
      unit: string
    }
  }
}

export default function RequestCard({ request }: RequestCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const { toast } = useToast()

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case "photo":
        return <Camera className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "grooming":
        return <Scissors className="h-5 w-5" />
      case "boarding-extension":
        return <Clock className="h-5 w-5" />
      case "custom":
        return <FileText className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case "photo":
        return "Photo Update"
      case "video":
        return "Video Request"
      case "grooming":
        return "Grooming Service"
      case "boarding-extension":
        return "Boarding Extension"
      case "custom":
        return "Custom Request"
      default:
        return "Request"
    }
  }

  const getStatusBadge = (status: string, inProgress?: boolean) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-700/70"
          >
            <Clock8 className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      case "approved":
        return inProgress ? (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700/70"
          >
            <Loader2 className="h-3 w-3 mr-1 animate-spin" /> In Progress
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700/70"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" /> Approved
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700/70"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
          </Badge>
        )
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700/70"
          >
            <XCircle className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCardBorderColor = (status: string) => {
    switch (status) {
      case "pending":
        return "border-yellow-200 dark:border-yellow-800/50"
      case "approved":
        return "border-blue-200 dark:border-blue-800/50"
      case "completed":
        return "border-green-200 dark:border-green-800/50"
      case "rejected":
        return "border-red-200 dark:border-red-800/50"
      default:
        return ""
    }
  }

  const handleCancelRequest = () => {
    setIsCancelling(true)

    // Simulate API call
    setTimeout(() => {
      setIsCancelling(false)
      setShowDetails(false)

      toast({
        title: "Request Cancelled",
        description: "Your request has been successfully cancelled.",
        duration: 5000,
      })
    }, 1500)
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)\
      return format(date, "MMM d, yyyy '  => {
    try {
      const date = new Date(dateString)
      return format(date, "MMM d, yyyy 'at' h:mm a")
    } catch (error) {
      return dateString
    }
  }

  const getTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (error) {
      return "some time ago"
    }
  }

  return (
    <>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
        <Card
          className={`cursor-pointer overflow-hidden ${getCardBorderColor(request.status)} dark:border-opacity-70`}
          onClick={() => setShowDetails(true)}
        >
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
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
                <h3 className="font-medium text-sm text-foreground dark:text-foreground">{getRequestTypeLabel(request.type)}</h3>
                <p className="text-xs text-muted-foreground">{request.petName}</p>
              </div>
            </div>
            {getStatusBadge(request.status, request.inProgress)}
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <p className="text-sm line-clamp-2 text-foreground dark:text-foreground">{request.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium block mb-1">
                Submitted
              </span>
              <p className="text-xs font-medium text-foreground dark:text-foreground">{getTimeAgo(request.createdAt)}</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs text-foreground dark:text-foreground">
              View Details
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground dark:text-foreground">
              <span
                className={`
                p-1 rounded-full 
                ${request.type === "photo" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : ""}
                ${request.type === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : ""}
                ${request.type === "grooming" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}
                ${request.type === "boarding-extension" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" : ""}
                ${request.type === "custom" ? "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300" : ""}
              `}
              >
                {getRequestTypeIcon(request.type)}
              </span>
              {getRequestTypeLabel(request.type)} for {request.petName}
            </DialogTitle>
            <DialogDescription>Request ID: {request.id}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Status</span>
              <div>{getStatusBadge(request.status, request.inProgress)}</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Description</span>
              <div className="text-sm font-medium p-3 bg-muted/30 rounded-md text-foreground dark:text-foreground">{request.description}</div>
            </div>

            {request.type === "boarding-extension" && request.extensionDetails && (
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Extension Details
                </span>
                <div className="text-base font-medium text-green-600 dark:text-green-400">
                  {request.extensionDetails.duration} {request.extensionDetails.unit}
                </div>
              </div>
            )}

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Submitted</span>
              <div className="text-sm font-medium text-foreground dark:text-foreground">{formatDate(request.createdAt)}</div>
            </div>

            {request.completedAt && (
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Completed</span>
                <div className="text-sm font-medium text-foreground dark:text-foreground">{formatDate(request.completedAt)}</div>
              </div>
            )}

            {request.status === "rejected" && request.rejectionReason && (
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wide text-muted-foreground dark:text-muted-foreground/80 font-medium">
                  Rejection Reason
                </span>
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-md dark:bg-red-950/20 dark:border-red-800">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-red-600 dark:text-red-400" />
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">{request.rejectionReason}</span>
                </div>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground/80 mt-1">
                  {request.type === "photo" || request.type === "video"
                    ? "No media was provided as the request was rejected."
                    : "Please contact us if you have any questions about this rejection."}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="sm:justify-between">
            {(request.status === "pending" || request.status === "approved") && !request.inProgress && (
              <Button
                variant="destructive"
                onClick={handleCancelRequest}
                disabled={isCancelling}
                className="dark:text-destructive-foreground"
              >
                {isCancelling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Cancel Request
              </Button>
            )}

            {request.status === "completed" && (
              <Button variant="outline" className="w-full dark:border-foreground/20 dark:text-foreground">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Leave Feedback
              </Button>
            )}

            {request.status === "rejected" && (
              <Button variant="outline" className="w-full dark:border-foreground/20 dark:text-foreground">
                <Info className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            )}

            {(request.status === "pending" || (request.status === "approved" && !request.inProgress)) && (
              <Button
                variant="outline"
                className="w-full dark:border-foreground/20 dark:text-foreground"
                onClick={() => setShowDetails(false)}
              >
                Close
              </Button>
            )}

            <div className="w-full mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Suggested next steps:</h4>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                {request.status === "pending" && "Check back later for updates on your request or make another request for your pet."}
                {request.status === "approved" && "Your request has been approved and will be processed soon."}
                {request.status === "completed" && "Consider leaving feedback about your experience or make a new request."}
                {request.status === "rejected" && "Contact our support team if you have questions about why your request was rejected."}
              </p>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

