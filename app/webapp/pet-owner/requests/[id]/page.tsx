"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Calendar, Clock, Camera, Video, Scissors, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { requests } from "@/app/webapp/data/sample-data"
import { formatDate } from "@/app/webapp/utils/date-utils"

/**
 * Request Detail Page
 *
 * BACKEND INTEGRATION POINTS:
 * 1. Replace the static data with an API call to fetch the request details
 *    - Endpoint: GET /api/pet-owner/requests/:id
 *
 * 2. Add proper error handling and loading states
 */
export default function RequestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const requestId = params.id as string

  const [request, setRequest] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        // In production, replace with actual API call
        // const response = await fetch(`/api/pet-owner/requests/${requestId}`)
        // if (!response.ok) throw new Error('Request not found')
        // const data = await response.json()

        // For demo, we'll use the local data
        const foundRequest = requests.find((r) => r.id === requestId)
        if (!foundRequest) {
          throw new Error("Request not found")
        }

        setRequest(foundRequest)
      } catch (error) {
        console.error("Error fetching request:", error)
        setError("Request not found or could not be loaded")
      } finally {
        setLoading(false)
      }
    }

    fetchRequest()
  }, [requestId])

  // Get request type icon
  const getRequestTypeIcon = (type) => {
    switch (type) {
      case "photo":
        return <Camera className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "grooming":
        return <Scissors className="h-5 w-5" />
      case "boarding-extension":
        return <Clock className="h-5 w-5" />
      default:
        return <Calendar className="h-5 w-5" />
    }
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
      case "new":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700/30 dark:text-yellow-400"
          >
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      case "approved":
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-700/30 dark:text-green-400"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" /> In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700/30 dark:text-blue-400"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
          </Badge>
        )
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:border-red-700/30 dark:text-red-400"
          >
            <XCircle className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <AlertCircle className="h-3 w-3 mr-1" /> {status}
          </Badge>
        )
    }
  }

  // Get request type title
  const getRequestTypeTitle = (type) => {
    switch (type) {
      case "photo":
        return "Photo Update"
      case "video":
        return "Video Request"
      case "grooming":
        return "Grooming Service"
      case "boarding-extension":
        return "Boarding Extension"
      default:
        return "Service Request"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Loading request details...</p>
      </div>
    )
  }

  if (error || !request) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="icon" asChild className="mb-4">
          <Link href="/webapp/pet-owner/requests">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "Request not found"}</AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/webapp/pet-owner/requests">Return to Requests</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-4">
          <Link href="/webapp/pet-owner/requests">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-foreground">Request Details</h1>
          <p className="text-base text-muted-foreground dark:text-muted-foreground/90">
            View details of your service request
          </p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                  {getRequestTypeIcon(request.type)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground dark:text-foreground">
                    {request.title || getRequestTypeTitle(request.type)}
                  </h2>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
                    Request ID: {request.id}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-2">
                {getStatusBadge(request.status)}
                <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
                  Submitted: {formatDate(request.createdAt)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {request.status === "rejected" && request.rejectionReason && (
              <Alert
                variant="destructive"
                className="bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/30"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Request Rejected</AlertTitle>
                <AlertDescription>{request.rejectionReason}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-medium mb-2">Request Details</h3>
                <Card className="bg-muted/50 dark:bg-muted/20">
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Request Type</p>
                      <p className="text-sm text-foreground dark:text-foreground">
                        {getRequestTypeTitle(request.type)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pet</p>
                      <p className="text-sm text-foreground dark:text-foreground">{request.petName}</p>
                    </div>
                    {request.type === "grooming" && request.groomingService && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Grooming Service</p>
                        <p className="text-sm text-foreground dark:text-foreground">
                          {request.groomingService.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </p>
                      </div>
                    )}
                    {request.type === "boarding-extension" && request.extensionDetails && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Extension Details</p>
                        <p className="text-sm text-foreground dark:text-foreground">
                          {request.extensionDetails.duration} {request.extensionDetails.unit}
                        </p>
                      </div>
                    )}
                    {request.price && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Price</p>
                        <p className="text-sm text-foreground dark:text-foreground">₱{request.price}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Description</p>
                      <p className="text-sm text-foreground dark:text-foreground whitespace-pre-wrap">
                        {request.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">Status Timeline</h3>
                <Card className="bg-muted/50 dark:bg-muted/20">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex gap-3 items-start">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        <Calendar className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground dark:text-foreground">Request Submitted</p>
                        <p className="text-xs text-muted-foreground dark:text-muted-foreground/90">
                          {formatDate(request.createdAt)}
                        </p>
                      </div>
                    </div>

                    {request.status === "in-progress" && (
                      <div className="flex gap-3 items-start">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-foreground">In Progress</p>
                          <p className="text-xs text-muted-foreground dark:text-muted-foreground/90">
                            Your request is being processed
                          </p>
                        </div>
                      </div>
                    )}

                    {request.completedAt && (
                      <div className="flex gap-3 items-start">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-foreground">Completed</p>
                          <p className="text-xs text-muted-foreground dark:text-muted-foreground/90">
                            {formatDate(request.completedAt)}
                          </p>
                        </div>
                      </div>
                    )}

                    {request.status === "rejected" && (
                      <div className="flex gap-3 items-start">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          <XCircle className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-foreground">Rejected</p>
                          <p className="text-xs text-muted-foreground dark:text-muted-foreground/90">
                            {formatDate(request.updatedAt || request.createdAt)}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Media Files Section */}
            {request.mediaFiles && request.mediaFiles.urls && request.mediaFiles.urls.length > 0 && (
              <div>
                <h3 className="text-base font-medium mb-2">
                  {request.mediaFiles.type === "photo" ? "Photos" : "Videos"}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {request.mediaFiles.urls.map((url, index) => (
                    <div key={index} className="rounded-md overflow-hidden border">
                      {request.mediaFiles.type === "photo" ? (
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`${request.petName} photo ${index + 1}`}
                          className="object-cover w-full h-48"
                        />
                      ) : (
                        <video src={url} controls className="w-full h-48" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation Section */}
            {request.conversation && request.conversation.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-medium">Conversation</h3>
                </div>
                <Card className="bg-muted/50 dark:bg-muted/20">
                  <CardContent className="p-4 space-y-4">
                    {request.conversation.map((message, index) => (
                      <div key={message.id} className={`flex gap-3 ${message.sender === "owner" ? "justify-end" : ""}`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-3
                            ${
                              message.sender === "owner"
                                ? "bg-primary text-primary-foreground ml-auto"
                                : "bg-gray-100 dark:bg-gray-800 text-foreground dark:text-foreground"
                            }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1 text-right">{formatDate(message.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

