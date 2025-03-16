"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Camera, Video, Scissors, Clock, FileText, ArrowLeft, DollarSign } from "lucide-react"
import { formatDate, formatCurrency } from "../../../utils/date-helpers"
import { requests } from "../../../data/sample-data"

export default function RequestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [request, setRequest] = useState<any>(null)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      // Find request by ID
      const foundRequest = requests.find((r) => r.id === params.id)

      if (foundRequest) {
        setRequest(foundRequest)
      }

      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [params.id])

  // Get request type icon
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

  // Get request type label
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

  // Get request status badge
  const getRequestStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">New</Badge>
      case "in-progress":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-muted animate-pulse rounded-md"></div>
          <div className="h-6 w-40 bg-muted animate-pulse rounded-md"></div>
        </div>

        <div className="h-40 bg-muted animate-pulse rounded-md"></div>

        <div className="space-y-4">
          <div className="h-24 bg-muted animate-pulse rounded-md"></div>
          <div className="h-24 bg-muted animate-pulse rounded-md"></div>
        </div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <h2 className="text-xl font-semibold mb-2">Request Not Found</h2>
        <p className="text-muted-foreground mb-6">The request you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/webapp/pet-owner/requests">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Requests
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{getRequestTypeLabel(request.type)}</h1>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
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
                <CardTitle className="text-lg">Request Details</CardTitle>
              </div>
              {getRequestStatusBadge(request.status)}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">For {request.petName}</p>
              <p className="mt-1">{request.description}</p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-muted-foreground">Requested {formatDate(request.createdAt)}</p>

                {request.status === "completed" && (
                  <p className="text-sm text-muted-foreground">Completed {formatDate(request.completedAt || "")}</p>
                )}

                {request.status === "rejected" && (
                  <p className="text-sm text-muted-foreground">Rejected {formatDate(request.rejectedAt || "")}</p>
                )}
              </div>
            </div>

            {/* Request-specific details */}
            {request.type === "grooming" && (
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Grooming Service</p>
                    <p className="text-sm text-muted-foreground">
                      {request.groomingService === "premium-wash-and-cut" && "Premium Wash & Cut"}
                      {request.groomingService === "full-grooming" && "Full Grooming Service"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-sm">{formatCurrency(request.price || 0)}</p>
                  </div>
                </div>
              </div>
            )}

            {request.type === "boarding-extension" && (
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Current End Date</p>
                    <p className="text-sm">{formatDate(request.currentEndDate || "")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Extension</p>
                    <p className="text-sm">
                      {request.extensionDetails.duration} {request.extensionDetails.unit}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Media files for completed requests */}
            {request.status === "completed" && request.mediaFiles && (
              <div className="space-y-3">
                <Separator />

                <h3 className="font-medium">{request.mediaFiles.type === "photo" ? "Photos" : "Video"}</h3>

                {request.mediaFiles.type === "photo" && (
                  <div className="grid grid-cols-2 gap-2">
                    {request.mediaFiles.urls.map((url: string, index: number) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Photo ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {request.mediaFiles.type === "video" && (
                  <div className="rounded-md overflow-hidden">
                    <video
                      src={request.mediaFiles.urls[0]}
                      controls
                      className="w-full"
                      poster="/placeholder.svg?height=300&width=400"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Conversation */}
            {request.conversation && request.conversation.length > 0 && (
              <div className="space-y-3">
                <Separator />

                <h3 className="font-medium">Conversation</h3>

                <div className="space-y-3">
                  {request.conversation.map((message: any) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "owner" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-lg p-3
                          ${message.sender === "owner" ? "bg-primary text-primary-foreground" : "bg-muted"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">{formatDate(message.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>

          {request.status === "new" && (
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/webapp/pet-owner/requests/${request.id}/edit`)}
              >
                Edit Request
              </Button>
            </CardFooter>
          )}

          {request.type === "grooming" && request.status === "completed" && (
            <CardFooter>
              <Button className="w-full">
                <DollarSign className="h-4 w-4 mr-2" />
                Pay for Grooming
              </Button>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  )
}

