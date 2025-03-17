"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Video, Scissors, Clock, FileText, ArrowLeft, AlertTriangle, X } from "lucide-react"
import { formatDate } from "../../../utils/date-helpers"
import Image from "next/image"
import Link from "next/link"

// Sample data for demonstration
const sampleRequests = [
  {
    id: "req-001",
    type: "photo",
    petName: "Max",
    petId: "pet-1",
    status: "completed",
    createdAt: "2025-03-10T10:30:00Z",
    completedAt: "2025-03-10T14:45:00Z",
    description: "Would love to see how Max is doing today!",
    mediaFiles: {
      type: "photo",
      urls: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
      count: 2,
    },
    adminNotes: "Here are some photos of Max playing in the yard today. He's having a great time!",
  },
  {
    id: "req-002",
    type: "grooming",
    petName: "Max",
    petId: "pet-1",
    status: "in-progress",
    createdAt: "2025-03-11T09:15:00Z",
    description: "Please give Max a bath and trim his nails.",
    groomingService: "premium-wash-and-cut",
    price: 450,
    adminNotes: "We've scheduled Max's grooming for tomorrow at 2:00 PM. We'll update you once it's completed.",
  },
  {
    id: "req-003",
    type: "boarding-extension",
    petName: "Max",
    petId: "pet-1",
    status: "new",
    createdAt: "2025-03-12T11:30:00Z",
    description: "Need to extend Max's stay by 2 more days.",
    extensionDetails: {
      duration: "2",
      unit: "days",
    },
    currentEndDate: "2025-03-15T18:00:00Z",
    adminNotes: "",
  },
  {
    id: "req-004",
    type: "video",
    petName: "Max",
    petId: "pet-1",
    status: "rejected",
    createdAt: "2025-03-07T16:20:00Z",
    rejectedAt: "2025-03-07T18:45:00Z",
    description: "Would like a short video of Max playing.",
    rejectedBy: "Admin",
    rejectionReason:
      "We're unable to record a video at this time as Max is resting. We can try again tomorrow if you'd like.",
    adminNotes: "",
  },
  {
    id: "req-005",
    type: "photo",
    petName: "Luna",
    petId: "pet-2",
    status: "rejected",
    createdAt: "2025-03-05T13:25:00Z",
    rejectedAt: "2025-03-05T15:40:00Z",
    description: "Would love to see some photos of Luna today.",
    rejectedBy: "Admin",
    rejectionReason: "Luna was sleeping most of the day. We'll try to take photos tomorrow when she's more active.",
    adminNotes: "",
  },
]

export default function RequestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [request, setRequest] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch request details
    const fetchRequest = async () => {
      try {
        // In a real implementation, this would be an API call
        // const response = await fetch(`/api/requests/${params.id}`);
        // const data = await response.json();

        // Using sample data for now
        await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
        const foundRequest = sampleRequests.find((req) => req.id === params.id)

        if (foundRequest) {
          setRequest(foundRequest)
        } else {
          // Handle not found
          router.push("/webapp/pet-owner/requests")
        }
      } catch (error) {
        console.error("Error fetching request:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchRequest()
    }
  }, [params.id, router])

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
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
          >
            New
          </Badge>
        )
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800"
          >
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800"
          >
            Completed
          </Badge>
        )
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800"
          >
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-3/4 bg-muted animate-pulse rounded-md"></div>
        <div className="h-64 bg-muted animate-pulse rounded-md"></div>
        <div className="h-32 bg-muted animate-pulse rounded-md"></div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold text-foreground">Request Not Found</h2>
        <p className="text-muted-foreground mt-2">The request you're looking for doesn't exist or has been removed.</p>
        <Button variant="outline" className="mt-6" asChild>
          <Link href="/webapp/pet-owner/requests">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Requests
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="text-foreground hover:bg-foreground/5"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`
                  p-2 rounded-full
                  ${request.type === "photo" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : ""}
                  ${request.type === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" : ""}
                  ${request.type === "grooming" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : ""}
                  ${request.type === "boarding-extension" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" : ""}
                  ${request.type === "custom" ? "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300" : ""}
                `}
                >
                  {getRequestTypeIcon(request.type)}
                </div>
                <div>
                  <CardTitle className="text-foreground">{getRequestTypeLabel(request.type)}</CardTitle>
                  <CardDescription>For {request.petName}</CardDescription>
                </div>
              </div>
              {getRequestStatusBadge(request.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Request Details</h3>
              <div className="bg-muted/30 p-3 rounded-md text-foreground">{request.description}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Requested On</h3>
                <p className="text-foreground">{formatDate(request.createdAt)}</p>
              </div>

              {request.status === "completed" && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Completed On</h3>
                  <p className="text-foreground">{formatDate(request.completedAt || "")}</p>
                </div>
              )}

              {request.status === "rejected" && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Rejected On</h3>
                  <p className="text-foreground">{formatDate(request.rejectedAt || "")}</p>
                </div>
              )}
            </div>

            {/* Type-specific details */}
            {request.type === "boarding-extension" && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Extension Details</h3>
                <div className="bg-muted/30 p-3 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current End Date</p>
                      <p className="text-foreground font-medium">{formatDate(request.currentEndDate || "")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Extension Requested</p>
                      <p className="text-foreground font-medium">
                        {request.extensionDetails?.duration} {request.extensionDetails?.unit}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {request.type === "grooming" && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Grooming Service</h3>
                <div className="bg-muted/30 p-3 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Service Type</p>
                      <p className="text-foreground font-medium">
                        {request.groomingService?.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-foreground font-medium">₱{request.price?.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">(To be paid during pickup)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Admin notes */}
            {request.adminNotes && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes from Staff</h3>
                <div className="bg-primary/5 border border-primary/10 p-3 rounded-md text-foreground">
                  {request.adminNotes}
                </div>
              </div>
            )}

            {/* Rejection reason */}
            {request.status === "rejected" && request.rejectionReason && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Reason for Rejection</h3>
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 p-3 rounded-md text-red-700 dark:text-red-300">
                  {request.rejectionReason}
                </div>
              </div>
            )}

            {/* Media content for completed photo/video requests */}
            {request.status === "completed" && request.type === "photo" && request.mediaFiles?.urls && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Photos</h3>
                <div className="grid grid-cols-2 gap-3">
                  {request.mediaFiles.urls.map((url: string, index: number) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                      <Image src={url || "/placeholder.svg"} alt={`Photo ${index + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {request.status === "completed" && request.type === "video" && request.mediaFiles?.url && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Video</h3>
                <div className="relative aspect-video rounded-md overflow-hidden border">
                  <video
                    src={request.mediaFiles.url}
                    controls
                    className="w-full h-full"
                    poster="/placeholder.svg?height=400&width=600"
                  />
                </div>
              </div>
            )}

            {/* No media content for rejected photo/video requests */}
            {request.status === "rejected" && (request.type === "photo" || request.type === "video") && (
              <div className="bg-muted/30 p-6 rounded-md flex flex-col items-center justify-center">
                <X className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium text-foreground">No Media Available</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  This request was rejected, so no {request.type === "photo" ? "photos" : "video"} were provided.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={() => router.back()} className="text-foreground hover:bg-foreground/5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Requests
            </Button>

            {request.status === "rejected" && (
              <Link href="/webapp/pet-owner/requests/new">
                <Button>Try Again</Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

