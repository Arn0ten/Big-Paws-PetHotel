"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
// Import the necessary icons
import { CheckCircle, Search, Filter, Loader2, Calendar, ArrowUpDown, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { SuccessDialog } from "./components/success-dialog"
import EnhancedRequestDialog from "./components/enhanced-request-dialog"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRequestStore, getBoardingDetails } from "@/lib/shared-request-data"
import { PRICING, calculateExtensionCost } from "./data/pricing-data"
import { getRequestTypeLabel } from "./utils/ui-helpers"
import { InProgressRequestCard } from "./components/in-progress-request-card"
import { CompletedRequestCard } from "./components/completed-request-card"
import { RequestCardSkeleton } from "./components/request-card-skeleton"
import { EmptyState } from "./components/empty-state"
import { BoardingDetailsDialog } from "./components/boarding-details-dialog"

// Enhance the tab interface in the main component
export default function RequestManagementPage() {
  const { requests, updateRequest, reset: resetRequests } = useRequestStore()
  const [boardingData, setBoardingData] = useState([])
  const [activeTab, setActiveTab] = useState("in-progress")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [showProcessDialog, setShowProcessDialog] = useState(false)
  const [processingNotes, setProcessingNotes] = useState("")
  const [extensionDate, setExtensionDate] = useState<Date | undefined>(undefined)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGroomingService, setSelectedGroomingService] = useState("premium-wash-and-cut")
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null)
  // const [successDialog, setSuccessDialog] = useState({
  //   open: false,
  //   title: "",
  //   message: "",
  //   type: "",
  // })
  const [hasNewCompletedRequests, setHasNewCompletedRequests] = useState(false)
  const [showBoardingDetailsDialog, setShowBoardingDetailsDialog] = useState(false)
  const [selectedBoardingDetails, setSelectedBoardingDetails] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isSmallCard = useMediaQuery("(max-width: 400px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate price based on request type and details
  useEffect(() => {
    if (!selectedRequest) return

    if (selectedRequest.type === "grooming") {
      const petSize = selectedRequest.petSize || "Medium"
      const serviceType = selectedGroomingService

      // Check if the pet is a cat
      const isCat = selectedRequest.petName?.toLowerCase().includes("cat") || false
      const priceKey = isCat ? `cat-${serviceType}` : serviceType

      if (PRICING.grooming[priceKey] && PRICING.grooming[priceKey][petSize]) {
        setCalculatedPrice(PRICING.grooming[priceKey][petSize])
      } else {
        // Fallback to default pricing
        setCalculatedPrice(PRICING.grooming["premium-wash-and-cut"][petSize])
      }
    } else if (selectedRequest.type === "boarding-extension" && selectedRequest.extensionDetails) {
      const cost = calculateExtensionCost(
        selectedRequest.extensionDetails.duration,
        selectedRequest.extensionDetails.unit,
        selectedRequest.petSize || "Medium",
      )
      setCalculatedPrice(cost)
    } else {
      setCalculatedPrice(null)
    }
  }, [selectedRequest, selectedGroomingService])

  const handleCompleteRequest = () => {
    if (!selectedRequest) return

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      // Update the request status
      updateRequest(selectedRequest.id, {
        status: "completed",
        completedAt: new Date().toISOString(),
        completedBy: "Admin",
        processingNotes: processingNotes,
        // Store media information for display in chat bubbles
        mediaFiles:
          selectedFiles.length > 0
            ? {
                type: selectedRequest.type,
                // In a real implementation, these would be URLs from your storage service
                urls: previewUrls,
                count: selectedFiles.length,
                // Include audio information if this is a video with audio
                audioUrl: selectedRequest.type === "video" ? selectedRequest.selectedAudioUrl : undefined,
                audioName:
                  selectedRequest.type === "video" && selectedRequest.selectedAudioUrl
                    ? selectedRequest.selectedAudioUrl
                        .split("/")
                        .pop()
                        ?.replace(/\.[^/.]+$/, "")
                    : undefined,
                // Include information about merged audio/video if available
                audioMerged: selectedRequest.type === "video" && selectedRequest.audioMerged,
                mergedVideoUrl: selectedRequest.type === "video" && selectedRequest.mergedVideoUrl,
              }
            : undefined,
        ...(extensionDate && {
          extensionApproved: true,
          newEndDate: extensionDate.toISOString(),
        }),
        ...(selectedRequest.type === "grooming" && {
          groomingService: selectedGroomingService,
          price: calculatedPrice,
        }),
        ...(selectedRequest.type === "boarding-extension" && {
          price: calculatedPrice,
        }),
        isNewlyCompleted: true, // Mark as newly completed for highlighting
      })

      // Update the boarding data if needed
      if (selectedRequest.type === "boarding-extension" || selectedRequest.type === "grooming") {
        const boardingDetails = getBoardingDetails(selectedRequest.boardingId)
        if (boardingDetails) {
          setSelectedBoardingDetails(boardingDetails)
        }
      }

      setIsProcessing(false)
      setShowProcessDialog(false)

      // Show success dialog
      // setSuccessDialog({
      //   open: true,
      //   title: "Request Completed Successfully",
      //   message: `The ${getRequestTypeLabel(selectedRequest.type).toLowerCase()} for ${selectedRequest.petName} has been completed.`,
      //   type: selectedRequest.type,
      // })

      // Set new completed requests flag
      setHasNewCompletedRequests(true)

      // Immediately switch to the completed tab to show the user where the request went
      setActiveTab("completed")

      // Reset form state
      setSelectedRequest(null)
      setProcessingNotes("")
      setSelectedFiles([])
      setPreviewUrls([])
      setExtensionDate(undefined)
      setSelectedGroomingService("premium-wash-and-cut")
    }, 1500)
  }

  // Add a useEffect to handle dialog sequencing
  useEffect(() => {
    // If success dialog closes and we have boarding details to show, open that dialog
    if ( selectedBoardingDetails) {
      // Small delay to prevent dialog overlap
      const timer = setTimeout(() => {
        setShowBoardingDetailsDialog(true)
        // Clear the selected boarding details after showing the dialog
        // to prevent it from showing again if success dialog opens for another reason
        setSelectedBoardingDetails(null)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [selectedBoardingDetails])

  // Modify the handleUndoAccept function to immediately return the request to "new" status without confirmation dialog

  const handleUndoAccept = (request: any) => {
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      // Update the request status back to "new" (not in-progress)
      updateRequest(request.id, {
        status: "new", // Change to "new" instead of "in-progress"
        undoTimestamp: new Date().toISOString(),
        undoBy: "Admin",
        // Keep the original data but mark as undone
        _previousData: {
          status: request.status,
          processingNotes: request.processingNotes,
        },
      })

      setIsProcessing(false)

      // Show success toast
      toast({
        title: "Request Returned to New Requests",
        description: `The ${getRequestTypeLabel(request.type).toLowerCase()} for ${request.petName} has been returned to the New Requests tab.`,
        duration: 5000,
      })
    }, 800)
  }

  // Remove the confirmUndoAccept function since we're no longer using the confirmation dialog

  // Update the search functionality to trigger refresh before displaying results
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsLoading(true)

    // Simulate search delay and refresh data
    setTimeout(() => {
      // In a real implementation, you would call your API here
      // For example: fetchRequests(query)

      // For the mock implementation, we're just refreshing the existing data
      resetRequests()
      setIsLoading(false)
    }, 800)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setSearchQuery("")
    setFilterType("all")

    // Simulate refreshing data
    setTimeout(() => {
      resetRequests()
      setIsLoading(false)
    }, 1500)
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  // Filter and sort requests based on active tab, search query, and filter type
  const filteredAndSortedRequests = requests
    .filter((request) => {
      // Filter by tab - this ensures requests are only shown in their appropriate tabs
      if (activeTab === "in-progress" && request.status !== "in-progress") return false
      if (activeTab === "completed" && request.status !== "completed") return false

      // Filter by search query
      const searchLower = searchQuery.toLowerCase()
      if (
        searchQuery &&
        !request.petName.toLowerCase().includes(searchLower) &&
        !request.petOwnerName.toLowerCase().includes(searchLower) &&
        !request.description.toLowerCase().includes(searchLower)
      ) {
        return false
      }

      // Filter by request type
      if (filterType !== "all" && request.type !== filterType) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      if (activeTab === "completed") {
        // Sort completed requests by completion date - newest first
        const dateA = new Date(a.completedAt || a.createdAt).getTime()
        const dateB = new Date(b.completedAt || b.createdAt).getTime()
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB
      } else {
        // Sort in-progress requests by creation date
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB
      }
    })
    // Add a property to identify newly completed requests (completed in the last hour)
    .map((request) => {
      if (request.status === "completed" && request.completedAt) {
        const completedTime = new Date(request.completedAt).getTime()
        const oneHourAgo = Date.now() - 60 * 60 * 1000
        const isNew = completedTime > oneHourAgo || request.isNewlyCompleted === true
        return {
          ...request,
          isNewlyCompleted: isNew,
        }
      }
      return request
    })

  // Reset new completed requests flag when switching to completed tab
  useEffect(() => {
    if (activeTab === "completed") {
      setHasNewCompletedRequests(false)
    }
  }, [activeTab])

  // Handle file selection for multiple files
  const handleMultipleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(files)

    // Generate preview URLs for the selected files
    const newPreviewUrls: string[] = []
    files.forEach((file) => {
      newPreviewUrls.push(URL.createObjectURL(file))
    })
    setPreviewUrls(newPreviewUrls)
  }

  // Remove a specific file from the selected files
  const handleRemoveSelectedFile = (index: number) => {
    const updatedFiles = [...selectedFiles]
    updatedFiles.splice(index, 1)
    setSelectedFiles(updatedFiles)

    const updatedPreviewUrls = [...previewUrls]
    URL.revokeObjectURL(updatedPreviewUrls[index])
    updatedPreviewUrls.splice(index, 1)
    setPreviewUrls(updatedPreviewUrls)
  }

  // Clean up search timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 300,
        }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Request Management</h1>
        <p className="text-muted-foreground">Process and complete approved requests from pet owners.</p>
      </motion.div>

      {/* Search and filter controls */}
      <div className="flex flex-row items-center gap-4 flex-wrap md:flex-nowrap mb-6">
        {/* Left side - Search and Filters */}
        <div className="flex flex-wrap gap-2 items-center w-full">
          <div className="relative flex-1 min-w-0 md:w-[300px]">
            <Input
              placeholder="Search by pet name, owner, or description..."
              className="pl-9 h-10"
              value={searchQuery}
              onChange={(e) => {
                const query = e.target.value
                setSearchQuery(query)
                setIsSearching(true)

                // Clear any existing timeout
                if (searchTimeoutRef.current) {
                  clearTimeout(searchTimeoutRef.current)
                }

                // Set a new timeout for the search
                searchTimeoutRef.current = setTimeout(() => {
                  handleSearch(query)
                  setIsSearching(false)
                }, 300)
              }}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <Search className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs font-medium"
                onClick={() => {
                  setSearchQuery("")
                  handleSearch("")
                  setIsSearching(false)
                }}
                aria-label="Clear search"
              >
                Clear
              </Button>
            )}
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px] h-10">
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

          <Button
            variant="outline"
            className="flex items-center gap-1.5 h-10 px-3"
            onClick={toggleSortOrder}
            title={sortOrder === "desc" ? "Newest first" : "Oldest first"}
          >
            <Calendar className="h-3.5 w-3.5" />
            <ArrowUpDown className="h-3 w-3" />
            <span className="sr-only md:not-sr-only md:inline-block md:ml-1 text-xs">
              {sortOrder === "desc" ? "Newest" : "Oldest"}
            </span>
          </Button>

          {(searchQuery || filterType !== "all") && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSearchQuery("")
                setFilterType("all")
                handleSearch("")
                setIsSearching(false)
              }}
              title="Clear filters"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Enhanced Tab Interface */}
      <div className="bg-card rounded-lg shadow-sm border">
        <Tabs defaultValue="in-progress" className="w-full" onValueChange={setActiveTab}>
          <div className="px-4 pt-4">
            <TabsList className="w-full grid grid-cols-2 h-14 p-1 bg-muted/30 dark:bg-muted/20 rounded-lg">
              <TabsTrigger
                value="in-progress"
                className={`flex items-center justify-center gap-2 rounded-md transition-all h-12 text-base ${
                  activeTab === "in-progress"
                    ? "bg-background shadow-sm font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Loader2 className="h-5 w-5" />
                <span className="hidden sm:inline">In Progress</span>
                <span className="sm:hidden">In Progress</span>
                <Badge
                  variant={activeTab === "in-progress" ? "default" : "secondary"}
                  className="ml-1 text-xs px-2 py-0 h-5"
                >
                  {requests.filter((r) => r.status === "in-progress").length}
                </Badge>
              </TabsTrigger>

              <TabsTrigger
                value="completed"
                className={`flex items-center justify-center gap-2 rounded-md transition-all h-12 text-base relative ${
                  activeTab === "completed"
                    ? "bg-background shadow-sm font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <CheckCircle className="h-5 w-5" />
                <span className="hidden sm:inline">Completed</span>
                <span className="sm:hidden">Completed</span>
                <Badge
                  variant={activeTab === "completed" ? "default" : "secondary"}
                  className="ml-1 text-xs px-2 py-0 h-5"
                >
                  {requests.filter((r) => r.status === "completed").length}
                </Badge>
                {hasNewCompletedRequests && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 10 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center animate-pulse">
                      <span className="sr-only">New</span>
                      <span aria-hidden="true">!</span>
                    </Badge>
                  </motion.div>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="in-progress" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[600px]">
              {isLoading ? (
                // Skeleton loading for cards
                Array.from({ length: 6 }).map((_, index) => <RequestCardSkeleton key={index} />)
              ) : filteredAndSortedRequests.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState message="No requests in progress" />
                </div>
              ) : (
                <>
                  <AnimatePresence>
                    {filteredAndSortedRequests.map((request) => (
                      <InProgressRequestCard
                        key={request.id}
                        request={request}
                        onProcess={() => {
                          setSelectedRequest(request)
                          if (request.type === "grooming" && request.groomingService) {
                            setSelectedGroomingService(request.groomingService)
                          }
                          setActiveTab("process")
                          setShowProcessDialog(true)
                        }}
                        onViewDetails={() => {
                          setSelectedRequest(request)
                          if (request.type === "grooming" && request.groomingService) {
                            setSelectedGroomingService(request.groomingService)
                          }
                          setActiveTab("info")
                          setShowProcessDialog(true)
                        }}
                        onUndoAccept={() => handleUndoAccept(request)}
                      />
                    ))}
                  </AnimatePresence>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[600px]">
              {isLoading ? (
                // Skeleton loading for cards
                Array.from({ length: 6 }).map((_, index) => <RequestCardSkeleton key={index} />)
              ) : filteredAndSortedRequests.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState message="No completed requests found" />
                </div>
              ) : (
                <>
                  <AnimatePresence>
                    {filteredAndSortedRequests.map((request) => (
                      <CompletedRequestCard key={request.id} request={request} />
                    ))}
                  </AnimatePresence>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Request Dialog */}
      <EnhancedRequestDialog
        open={showProcessDialog}
        onOpenChange={setShowProcessDialog}
        request={selectedRequest}
        onComplete={handleCompleteRequest}
        isProcessing={isProcessing}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedFiles={selectedFiles}
        previewUrls={previewUrls}
        handleMultipleFileSelect={handleMultipleFileSelect}
        handleRemoveSelectedFile={handleRemoveSelectedFile}
      />

      {/* Success Dialog */}
      {/* <SuccessDialog
        open={successDialog.open}
        onOpenChange={(open) => setSuccessDialog({ ...successDialog, open })}
        title={successDialog.title}
        description={successDialog.message}
        type={successDialog.type as any}
      /> */}

      {/* Boarding Details Dialog */}
      <BoardingDetailsDialog
        open={showBoardingDetailsDialog}
        onOpenChange={setShowBoardingDetailsDialog}
        selectedBoardingDetails={selectedBoardingDetails}
        isMobile={isMobile}
      />
    </div>
  )
}

