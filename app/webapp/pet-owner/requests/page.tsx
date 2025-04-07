"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  FileText,
  Camera,
  Video,
  Scissors,
  Search,
  Filter,
  Calendar,
  ArrowUpDown,
  Info,
  Loader2,
} from "lucide-react"
import { getPetOwnerRequests } from "@/app/webapp/data/sample-data"
import { formatDate } from "@/app/webapp/utils/date-utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

// Add a cancel button to each request in the list view
// Add a confirmation dialog for cancellation

// First, add the AlertDialog imports
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

// Add state for the confirmation dialog
// Add these after the existing useState declarations

/**
 * Enhanced Pet Owner Requests Page
 *
 * BACKEND INTEGRATION POINTS:
 * 1. Replace getPetOwnerRequests() with actual API call
 *    - Endpoint: GET /api/pet-owner/requests
 *    - Query parameters:
 *      - status: Filter by status (all, pending, approved, completed, rejected)
 *      - type: Filter by request type (photo, video, grooming, boarding-extension, custom)
 *      - search: Search term for filtering requests
 *      - sort: Sort order (asc, desc)
 *      - page: Page number for pagination
 *      - limit: Number of items per page
 *
 * 2. Add proper error handling and loading states for API calls
 *
 * 3. Implement pagination for requests
 *    - Add page number and limit to API call
 *    - Add pagination UI components
 *
 * 4. Add analytics tracking for request management
 *    - Track which request types are most viewed
 *    - Monitor filter usage
 */
export default function PetOwnerRequestsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("pending")
  const [isLoading, setIsLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const { toast } = useToast()
  const [requestToCancel, setRequestToCancel] = useState(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  // Add this CSS class to hide scrollbars
  useEffect(() => {
    // Add CSS to hide scrollbars but keep functionality
    const style = document.createElement("style")
    style.textContent = `
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    // Simulate API call
    const fetchRequests = async () => {
      try {
        setIsLoading(true)

        // BACKEND INTEGRATION:
        // Replace this with actual API call to fetch all requests
        // Example:
        // const response = await fetch(
        //   `/api/pet-owner/requests?type=${filterType}&search=${searchQuery}&sort=${sortOrder}`
        // );
        // if (!response.ok) throw new Error('Failed to fetch requests');
        // const data = await response.json();
        // setRequests(data);

        // For demo, we'll use the sample data
        await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
        const data = getPetOwnerRequests()
        setRequests(data)
      } catch (error) {
        console.error("Error fetching requests:", error)
        setError("Failed to load your requests. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchRequests()
  }, [filterType, searchQuery, sortOrder])

  // Handle "New Request" button click with error handling
  const handleNewRequest = () => {
    try {
      // Use replace instead of push to avoid navigation history issues
      router.replace("/webapp/pet-owner/requests/new")
    } catch (error) {
      console.error("Navigation error:", error)
      // Fallback redirect if the router fails
      window.location.href = "/webapp/pet-owner/requests/new"
    }
  }

  // Get request type icon
  const getRequestTypeIcon = (type) => {
    switch (type) {
      case "photo":
        return <Camera className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "grooming":
        return <Scissors className="h-4 w-4" />
      case "boarding-extension":
        return <Clock className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
      case "new":
        return (
          <div className="self-start">
            <Badge className="bg-yellow-600 text-white inline-flex whitespace-nowrap">
              <Clock className="h-3 w-3 mr-1" /> Pending
            </Badge>
          </div>
        )
      case "approved":
      case "in-progress":
        return (
          <div className="self-start">
            <Badge className="bg-green-600 text-white inline-flex whitespace-nowrap">
              <CheckCircle2 className="h-3 w-3 mr-1" /> In Progress
            </Badge>
          </div>
        )
      case "completed":
        return (
          <div className="self-start">
            <Badge className="bg-blue-600 text-white inline-flex whitespace-nowrap">
              <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
            </Badge>
          </div>
        )
      case "rejected":
        return (
          <div className="self-start">
            <Badge className="bg-red-600 text-white inline-flex whitespace-nowrap">
              <XCircle className="h-3 w-3 mr-1" /> Rejected
            </Badge>
          </div>
        )
      default:
        return (
          <div className="self-start">
            <Badge className="bg-gray-600 text-white">
              <AlertCircle className="h-3 w-3 mr-1" /> {status}
            </Badge>
          </div>
        )
    }
  }

  // Helper function to render requests list based on status
  const renderRequestsList = (status) => {
    const statusRequests = requests
      .filter((request) => {
        // Match the request status with the tab status
        // Handle both "pending" and "new" statuses for the Pending tab
        if (status === "pending" && (request.status === "pending" || request.status === "new")) {
          return true
        }
        return request.status === status
      })
      .filter((request) => {
        // Apply additional filters (type and search)
        if (filterType !== "all" && request.type !== filterType) return false

        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          return (
            request.title?.toLowerCase().includes(query) ||
            request.petName?.toLowerCase().includes(query) ||
            request.description?.toLowerCase().includes(query)
          )
        }

        return true
      })
      .sort((a, b) => {
        // Sort by date
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB
      })

    if (isLoading) {
      return (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-1/4 bg-muted animate-pulse rounded"></div>
                      <div className="h-3 w-1/3 bg-muted animate-pulse rounded"></div>
                    </div>
                    <div className="h-5 w-16 bg-muted animate-pulse rounded-full"></div>
                  </div>
                  <div className="h-3 w-full bg-muted animate-pulse rounded"></div>
                  <div className="h-3 w-2/3 bg-muted animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )
    }

    if (statusRequests.length === 0) {
      return (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <FileText className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground mb-4">No {status.replace("-", " ")} requests found</p>
              <Button onClick={handleNewRequest} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create New Request
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {statusRequests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Link href={`/webapp/pet-owner/requests/${request.id}`} passHref>
                  <div className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex items-center justify-center h-8 w-8 rounded-full 
                          ${request.type === "photo" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : ""}
                          ${request.type === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" : ""}
                          ${request.type === "grooming" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : ""}
                          ${request.type === "boarding-extension" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" : ""}
                          ${request.type === "custom" ? "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300" : ""}
                        `}
                        >
                          {getRequestTypeIcon(request.type)}
                        </div>
                        <h3 className="font-semibold text-foreground dark:text-foreground">{request.title}</h3>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pet</p>
                        <p className="text-sm text-foreground dark:text-foreground">{request.petName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Request Date</p>
                        <p className="text-sm text-foreground dark:text-foreground">{formatDate(request.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                        <p className="text-sm text-foreground dark:text-foreground">
                          {formatDate(request.updatedAt || request.createdAt)}
                        </p>
                      </div>
                    </div>

                    {(request.status === "pending" || request.status === "new") && (
                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setRequestToCancel(request)
                            setShowCancelConfirm(true)
                          }}
                          className="text-xs"
                        >
                          Cancel Request
                        </Button>
                      </div>
                    )}

                    {request.status === "rejected" && request.rejectionReason && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-700/30">
                        <p className="text-sm font-medium text-red-700 dark:text-red-400">Rejection Reason:</p>
                        <p className="text-sm text-red-600 dark:text-red-300">{request.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  // Add the handleCancelRequest function here, outside of renderRequestsList
  const handleCancelRequest = () => {
    if (!requestToCancel) return

    setIsCancelling(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would call an API to cancel the request
      // For demo, we'll just update the local state
      setRequests((prev) => prev.filter((r) => r.id !== requestToCancel.id))

      setIsCancelling(false)
      setShowCancelConfirm(false)
      setRequestToCancel(null)

      toast({
        title: "Request Cancelled",
        description: "Your request has been successfully cancelled.",
        duration: 5000,
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-foreground">Service Requests</h1>
          <p className="text-base text-muted-foreground dark:text-muted-foreground/90">
            View and manage your service requests
          </p>
        </div>

        <Button onClick={handleNewRequest} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="my-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Enhanced Search and Filter Bar */}
      <div className="flex flex-row flex-wrap gap-3 items-center mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by pet name, title, or description..."
            className="pl-9 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs font-medium"
              onClick={() => {
                setSearchQuery("")
              }}
              aria-label="Clear search"
            >
              Clear
            </Button>
          )}
        </div>

        <div className="w-auto min-w-[140px]">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="h-10">
              <div className="flex items-center gap-1.5 text-sm">
                <Filter className="h-3.5 w-3.5" />
                <span className="truncate">
                  {filterType === "all"
                    ? "All Types"
                    : filterType === "photo"
                      ? "Photos"
                      : filterType === "video"
                        ? "Videos"
                        : filterType === "grooming"
                          ? "Grooming"
                          : filterType === "boarding-extension"
                            ? "Extensions"
                            : filterType === "custom"
                              ? "Custom"
                              : "Filter"}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="photo">Photo Updates</SelectItem>
              <SelectItem value="video">Video Requests</SelectItem>
              <SelectItem value="grooming">Grooming</SelectItem>
              <SelectItem value="boarding-extension">Boarding Extensions</SelectItem>
              <SelectItem value="custom">Custom Requests</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-auto">
          <Button
            variant="outline"
            className="flex items-center gap-1.5 h-10 px-3"
            onClick={toggleSortOrder}
            title={sortOrder === "desc" ? "Newest first" : "Oldest first"}
          >
            <Calendar className="h-3.5 w-3.5" />
            <ArrowUpDown className="h-3 w-3" />
            <span className="hidden sm:inline-block sm:ml-1 text-xs">{sortOrder === "desc" ? "Newest" : "Oldest"}</span>
          </Button>
        </div>
      </div>

      {/* Cancellation Policy Note */}
      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 mb-4">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-300">Request Cancellation Policy</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-400">
          You can cancel requests that are in <Badge className="bg-yellow-600 text-white font-normal">Pending</Badge>{" "}
          status. Once a request is <Badge className="bg-green-600 text-white font-normal">In Progress</Badge>, it
          cannot be cancelled.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="pending" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="flex w-full overflow-x-auto scrollbar-hide mb-4">
          <TabsTrigger className="flex-grow sm:flex-grow-0" value="pending">
            Pending
          </TabsTrigger>
          <TabsTrigger className="flex-grow sm:flex-grow-0" value="in-progress">
            In Progress
          </TabsTrigger>
          <TabsTrigger className="flex-grow sm:flex-grow-0" value="completed">
            Completed
          </TabsTrigger>
          <TabsTrigger className="flex-grow sm:flex-grow-0" value="rejected">
            Rejected
          </TabsTrigger>
        </TabsList>

        {/* Individual TabsContent for each status */}
        <TabsContent value="pending" className="mt-0">
          {renderRequestsList("pending")}
        </TabsContent>

        <TabsContent value="in-progress" className="mt-0">
          {renderRequestsList("in-progress")}
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          {renderRequestsList("completed")}
        </TabsContent>

        <TabsContent value="rejected" className="mt-0">
          {renderRequestsList("rejected")}
        </TabsContent>
      </Tabs>

      <AlertDialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep Request</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelRequest}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isCancelling}
            >
              {isCancelling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Yes, Cancel Request"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

