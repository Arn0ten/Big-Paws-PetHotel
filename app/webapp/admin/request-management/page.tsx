"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Camera,
  Video,
  Scissors,
  Clock,
  FileText,
  CheckCircle,
  Search,
  Filter,
  Loader2,
  AlertCircle,
  RefreshCw,
  DollarSign,
  Bell,
  Calendar,
  ArrowUpDown,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { SuccessDialog } from "./components/success-dialog"
import type { BoardingStatus, PaymentStatus } from "../boarding/types"
import { formatCurrency, formatDate } from "./utils/helpers"
import { EnhancedRequestDialog } from "./components/enhanced-request-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ChatBubble } from "./components/chat-bubble"

// Utility functions for request management
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

// Pricing data for services from the uploaded images
// NOTE FOR BACKEND: Replace with actual pricing data from database
const PRICING = {
  grooming: {
    // For dogs
    "basic-wash": {
      Small: 180,
      Medium: 220,
      Large: 280,
      XLarge: 320,
    },
    "premium-wash": {
      Small: 300,
      Medium: 450,
      Large: 550,
      XLarge: 850,
    },
    "premium-wash-and-cut": {
      Small: 450,
      Medium: 600,
      Large: 650,
      XLarge: 850,
    },
    "full-grooming": {
      Small: 500,
      Medium: 650,
      Large: 700,
      XLarge: 800,
    },
    // For cats
    "cat-basic-wash": {
      Small: 150,
      Medium: 200,
      Large: 250,
      XLarge: 280,
    },
    "cat-premium-wash": {
      Small: 200,
      Medium: 250,
      Large: 300,
      XLarge: 350,
    },
  },
  boarding: {
    hourly: {
      Small: 25,
      Medium: 30,
      Large: 40,
      XLarge: 50,
    },
    daily: {
      Small: 320,
      Medium: 400,
      Large: 480,
      XLarge: 550,
    },
  },
  catHotel: {
    standard: {
      Kitten: 300,
      Adult: 400,
    },
    extraGuest: {
      SmallToMedium: 200,
      Large: 300,
    },
  },
}

// Calculate boarding extension cost
// NOTE FOR BACKEND: Implement proper calculation based on actual boarding rates
const calculateExtensionCost = (duration: string, unit: string, petSize: string): number => {
  const durationNum = Number.parseInt(duration)

  if (!petSize || !PRICING.boarding) return 0

  switch (unit) {
    case "hours":
      return durationNum * PRICING.boarding.hourly[petSize as keyof typeof PRICING.boarding.hourly]
    case "days":
      return durationNum * PRICING.boarding.daily[petSize as keyof typeof PRICING.boarding.daily]
    case "weeks":
      return durationNum * 7 * PRICING.boarding.daily[petSize as keyof typeof PRICING.boarding.daily]
    default:
      return 0
  }
}

// Sample data for demonstration - shared with boarding management module
// NOTE FOR BACKEND: Replace with API call to fetch requests
const sampleRequests = [
  {
    id: "req-001",
    type: "photo",
    petName: "Max",
    petId: "pet-001",
    petOwnerId: "owner-001",
    petOwnerName: "John Smith",
    status: "in-progress",
    createdAt: "2025-03-10T10:30:00Z",
    description: "Would love to see how Max is doing today!",
    isUrgent: false,
    petSize: "Medium",
    boardingId: "board-001",
  },
  {
    id: "req-002",
    type: "grooming",
    petName: "Bella",
    petId: "pet-002",
    petOwnerId: "owner-002",
    petOwnerName: "Sarah Johnson",
    status: "in-progress",
    createdAt: "2025-03-09T14:15:00Z",
    description: "Please give Bella a bath and trim her nails.",
    isUrgent: true,
    groomingService: "premium-wash-and-cut",
    price: 600,
    petSize: "Medium",
    boardingId: "board-002",
  },
  {
    id: "req-003",
    type: "boarding-extension",
    petName: "Charlie",
    petId: "pet-003",
    petOwnerId: "owner-003",
    petOwnerName: "Michael Brown",
    status: "in-progress",
    createdAt: "2025-03-08T09:45:00Z",
    description: "Need to extend Charlie's stay by 2 more days.",
    extensionDetails: {
      duration: "2",
      unit: "days",
    },
    currentEndDate: "2025-03-10T12:00:00Z",
    price: 800,
    isUrgent: true,
    petSize: "Medium",
    boardingId: "board-003",
  },
  {
    id: "req-004",
    type: "video",
    petName: "Luna",
    petId: "pet-004",
    petOwnerId: "owner-004",
    petOwnerName: "Emily Davis",
    status: "completed",
    createdAt: "2025-03-07T16:20:00Z",
    completedAt: "2025-03-07T18:45:00Z",
    description: "Would like a short video of Luna playing.",
    isUrgent: false,
    completedBy: "Admin",
    petSize: "Small",
    boardingId: "board-004",
  },
  {
    id: "req-005",
    type: "photo",
    petName: "Rocky",
    petId: "pet-005",
    petOwnerId: "owner-005",
    petOwnerName: "David Wilson",
    status: "completed",
    createdAt: "2025-03-06T11:10:00Z",
    completedAt: "2025-03-06T14:30:00Z",
    description: "Would like to see a photo of Rocky during playtime.",
    isUrgent: false,
    completedBy: "Admin",
    petSize: "Large",
    boardingId: "board-005",
  },
  {
    id: "req-006",
    type: "grooming",
    petName: "Daisy",
    petId: "pet-006",
    petOwnerId: "owner-006",
    petOwnerName: "Jennifer Taylor",
    status: "in-progress",
    createdAt: "2025-03-05T13:25:00Z",
    description: "Daisy needs a full grooming session with special attention to her ears.",
    isUrgent: false,
    groomingService: "full-grooming",
    price: 650,
    petSize: "Medium",
    boardingId: "board-006",
  },
  {
    id: "req-007",
    type: "boarding-extension",
    petName: "Cooper",
    petId: "pet-007",
    petOwnerId: "owner-007",
    petOwnerName: "Robert Johnson",
    status: "completed",
    createdAt: "2025-03-04T09:15:00Z",
    completedAt: "2025-03-04T11:30:00Z",
    description: "Need to extend Cooper's stay by 3 more days due to delayed flight.",
    extensionDetails: {
      duration: "3",
      unit: "days",
    },
    currentEndDate: "2025-03-07T12:00:00Z",
    price: 1440,
    isUrgent: true,
    completedBy: "Admin",
    processingNotes: "Extended stay approved. Owner notified via email about additional charges.",
    petSize: "Large",
    boardingId: "board-007",
  },
  {
    id: "req-008",
    type: "custom",
    petName: "Milo",
    petId: "pet-008",
    petOwnerId: "owner-008",
    petOwnerName: "Amanda Clark",
    status: "in-progress",
    createdAt: "2025-03-03T15:40:00Z",
    description: "Can you make sure Milo gets his medication at 3pm every day? It's in his bag.",
    isUrgent: true,
    petSize: "Small",
    boardingId: "board-008",
  },
  {
    id: "req-009",
    type: "video",
    petName: "Zoe",
    petId: "pet-009",
    petOwnerId: "owner-009",
    petOwnerName: "Thomas Wright",
    status: "in-progress",
    createdAt: "2025-03-02T10:20:00Z",
    description: "Would love to see a video of Zoe playing with other dogs if possible.",
    isUrgent: false,
    petSize: "Medium",
    boardingId: "board-009",
  },
  {
    id: "req-010",
    type: "grooming",
    petName: "Bailey",
    petId: "pet-010",
    petOwnerId: "owner-010",
    petOwnerName: "Sophia Martinez",
    status: "completed",
    createdAt: "2025-03-01T14:10:00Z",
    completedAt: "2025-03-01T16:45:00Z",
    description: "Bailey needs a bath and nail trim.",
    groomingService: "premium-wash-and-cut",
    price: 450,
    isUrgent: false,
    completedBy: "Admin",
    processingNotes: "Bailey was very cooperative during the grooming session.",
    petSize: "Small",
    boardingId: "board-010",
  },
  // Adding hourly boarding extension request
  {
    id: "req-011",
    type: "boarding-extension",
    petName: "Buddy",
    petId: "pet-011",
    petOwnerId: "owner-011",
    petOwnerName: "James Wilson",
    status: "in-progress",
    createdAt: "2025-03-11T08:30:00Z",
    description: "Need to extend Buddy's daycare by 4 more hours.",
    extensionDetails: {
      duration: "4",
      unit: "hours",
    },
    currentEndDate: "2025-03-11T17:00:00Z",
    price: 120,
    isUrgent: false,
    petSize: "Medium",
    boardingId: "board-011",
  },
  {
    id: "req-012",
    type: "boarding-extension",
    petName: "Coco",
    petId: "pet-012",
    petOwnerId: "owner-012",
    petOwnerName: "Lisa Thompson",
    status: "in-progress",
    createdAt: "2025-03-11T09:15:00Z",
    description: "Need to extend Coco's daycare by 2 more hours due to traffic.",
    extensionDetails: {
      duration: "2",
      unit: "hours",
    },
    currentEndDate: "2025-03-11T18:00:00Z",
    price: 50,
    isUrgent: true,
    petSize: "Small",
    boardingId: "board-012",
  },
]

// Sample boarding data that matches with the requests
// NOTE FOR BACKEND: Replace with API call to fetch boarding data
const sampleBoardingData = [
  {
    id: "board-001",
    pet: { id: "pet-001", name: "Max", size: "Medium" },
    owner: { id: "owner-001", name: "John Smith" },
    startDate: "2025-03-05T10:00:00Z",
    endDate: "2025-03-12T10:00:00Z",
    boardingStatus: "Boarding" as BoardingStatus,
    paymentStatus: "Paid" as PaymentStatus,
    totalPrice: 2800,
  },
  {
    id: "board-002",
    pet: { id: "pet-002", name: "Bella", size: "Medium" },
    owner: { id: "owner-002", name: "Sarah Johnson" },
    startDate: "2025-03-06T14:00:00Z",
    endDate: "2025-03-13T14:00:00Z",
    boardingStatus: "Boarding" as BoardingStatus,
    paymentStatus: "Paid" as PaymentStatus,
    totalPrice: 2800,
  },
  {
    id: "board-003",
    pet: { id: "pet-003", name: "Charlie", size: "Medium" },
    owner: { id: "owner-003", name: "Michael Brown" },
    startDate: "2025-03-03T09:00:00Z",
    endDate: "2025-03-10T12:00:00Z",
    boardingStatus: "Boarding" as BoardingStatus,
    paymentStatus: "Paid" as PaymentStatus,
    totalPrice: 2800,
  },
  {
    id: "board-004",
    pet: { id: "pet-004", name: "Luna", size: "Small" },
    owner: { id: "owner-004", name: "Emily Davis" },
    startDate: "2025-03-01T16:00:00Z",
    endDate: "2025-03-08T16:00:00Z",
    boardingStatus: "Boarding" as BoardingStatus,
    paymentStatus: "Paid" as PaymentStatus,
    totalPrice: 2240,
  },
  {
    id: "board-005",
    pet: { id: "pet-005", name: "Rocky", size: "Large" },
    owner: { id: "owner-005", name: "David Wilson" },
    startDate: "2025-03-01T11:00:00Z",
    endDate: "2025-03-08T11:00:00Z",
    boardingStatus: "Boarding" as BoardingStatus,
    paymentStatus: "Paid" as PaymentStatus,
    totalPrice: 3360,
  },
  {
    id: "board-006",
    pet: { id: "pet-006", name: "Daisy", size: "Medium" },
    owner: { id: "owner-006", name: "Jennifer Taylor" },
    startDate: "2025-03-01T13:00:00Z",
    endDate: "2025-03-08T13:00:00Z",
    boardingStatus: "Boarding" as BoardingStatus,
    paymentStatus: "Paid" as PaymentStatus,
    totalPrice: 2800,
  },
  {
    id: "board-007",
    pet: { id: "pet-007", name: "Cooper", size: "Large" },
    owner: { id: "owner-007", name: "Robert Johnson" },
    startDate: "2025-03-01T09:00:00Z",
    endDate: "2025-03-07T12:00:00Z",
    boardingStatus: "Done Boarding" as BoardingStatus,
    paymentStatus: "Paid" as PaymentStatus,
    totalPrice: 3360,
    additionalCharges: 1440,
    additionalChargesReason: "3-day extension",
  },
  {
    id: "board-008",
    pet: { id: "pet-008", name: "Milo", size: "Small" },
    owner: { id: "owner-008", name: "Amanda Clark" },
    startDate: "2025-03-01T15:00:00Z",
    endDate: "2025-03-08T15:00:00Z",
    boardingStatus: "Boarding" as BoardingStatus,
    paymentStatus: "Paid" as PaymentStatus,
    totalPrice: 2240,
  },
  {
    id: "board-009",
    pet: { id: "pet-009", name: "Zoe", size: "Medium" },
    owner: { id: "owner-009", name: "Thomas Wright" },
    startDate: "2025-02-25T10:00:00Z",
    endDate: "2025-03-04T10:00:00Z",
    boardingStatus: "Boarding" as BoardingStatus,
    paymentStatus: "Paid" as PaymentStatus,
    totalPrice: 2800,
  },
  {
    id: "board-010",
    pet: { id: "pet-010", name: "Bailey", size: "Small" },
    owner: { id: "owner-010", name: "Sophia Martinez" },
    startDate: "2025-02-25T14:00:00Z",
    endDate: "2025-03-04T14:00:00Z",
    boardingStatus: "Done Boarding" as BoardingStatus,
    paymentStatus: "Paid" as PaymentStatus,
    totalPrice: 2240,
    additionalCharges: 450,
    additionalChargesReason: "Grooming service",
  },
  {
    id: "board-011",
    pet: { id: "pet-011", name: "Buddy", size: "Medium" },
    owner: { id: "owner-011", name: "James Wilson" },
    startDate: "2025-03-11T09:00:00Z",
    endDate: "2025-03-11T17:00:00Z",
    boardingStatus: "Boarding" as BoardingStatus,
    paymentStatus: "Paid" as PaymentStatus,
    totalPrice: 240, // 8 hours of daycare
  },
  {
    id: "board-012",
    pet: { id: "pet-012", name: "Coco", size: "Small" },
    owner: { id: "owner-012", name: "Lisa Thompson" },
    startDate: "2025-03-11T10:00:00Z",
    endDate: "2025-03-11T18:00:00Z",
    boardingStatus: "Boarding" as BoardingStatus,
    paymentStatus: "Paid" as PaymentStatus,
    totalPrice: 200, // 8 hours of daycare
  },
]

// Update the interface for InProgressRequestCard to include onUndoAccept
interface InProgressRequestCardProps {
  request: any
  onProcess: () => void
  onUndoAccept?: () => void
  onViewDetails: () => void // Add this new prop for viewing details
}

interface CompletedRequestCardProps {
  request: any
}

// Enhance the tab interface in the main component
export default function RequestManagementPage() {
  const [requests, setRequests] = useState(sampleRequests)
  const [boardingData, setBoardingData] = useState(sampleBoardingData)
  const [activeTab, setActiveTab] = useState("in-progress")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [showProcessDialog, setShowProcessDialog] = useState(false)
  const [processingNotes, setProcessingNotes] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [extensionDate, setExtensionDate] = useState<Date | undefined>(undefined)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGroomingService, setSelectedGroomingService] = useState("premium-wash-and-cut")
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null)
  const [successDialog, setSuccessDialog] = useState({
    open: false,
    title: "",
    message: "",
    type: "",
  })
  const [hasNewCompletedRequests, setHasNewCompletedRequests] = useState(false)
  const [showBoardingDetailsDialog, setShowBoardingDetailsDialog] = useState(false)
  const [selectedBoardingDetails, setSelectedBoardingDetails] = useState<any>(null)
  const [showUndoAcceptDialog, setShowUndoAcceptDialog] = useState(false)
  const [undoAcceptMessage, setUndoAcceptMessage] = useState("")
  const [requestToUndo, setRequestToUndo] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isSmallCard = useMediaQuery("(max-width: 400px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  // Calculate price based on request type and details
  // NOTE FOR BACKEND: Implement proper price calculation on actual service rates
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

  // Modify the handleCompleteRequest function to immediately remove the completed request from the In Progress tab

  // Update the handleCompleteRequest function to handle multiple files
  const handleCompleteRequest = () => {
    if (!selectedRequest) return

    setIsProcessing(true)

    // NOTE FOR BACKEND: Replace with actual API call to update request status
    setTimeout(() => {
      // BACKEND INTEGRATION:
      // 1. Upload the selected files to your storage (S3, Azure Blob, etc.)
      // 2. Store the URLs in the database
      // 3. Associate them with the request record

      // Update the request status
      const updatedRequests = requests.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
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
            }
          : req,
      )

      setRequests(updatedRequests)

      // Update the boarding data if needed
      if (selectedRequest.type === "boarding-extension" || selectedRequest.type === "grooming") {
        const updatedBoardingData = boardingData.map((boarding) => {
          if (boarding.id === selectedRequest.boardingId) {
            // For boarding extension
            if (selectedRequest.type === "boarding-extension" && extensionDate) {
              // Create a record of the additional charge
              const additionalService = {
                name: `${selectedRequest.extensionDetails.duration} ${selectedRequest.extensionDetails.unit} extension`,
                price: calculatedPrice || 0,
                requestId: selectedRequest.id,
                timestamp: new Date().toISOString(),
              }

              // Get existing additional services or initialize empty array
              const existingServices = boarding.additionalServices || []

              return {
                ...boarding,
                endDate: extensionDate.toISOString(),
                paymentStatus: "Pending" as PaymentStatus, // Change to pending regardless of previous status
                totalPrice: boarding.totalPrice + (calculatedPrice || 0),
                additionalServices: [...existingServices, additionalService],
                updatedAt: new Date().toISOString(),
                lastModifiedBy: "Admin",
                lastModificationReason: "Boarding extension approved",
              }
            }

            // For grooming service
            if (selectedRequest.type === "grooming") {
              // Create a record of the grooming service
              const groomingService = {
                name: `Grooming: ${selectedGroomingService.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`,
                price: calculatedPrice || 0,
                requestId: selectedRequest.id,
                timestamp: new Date().toISOString(),
              }

              // Get existing additional services or initialize empty array
              const existingServices = boarding.additionalServices || []

              return {
                ...boarding,
                paymentStatus: "Pending" as PaymentStatus, // Change to pending regardless of previous status
                totalPrice: boarding.totalPrice + (calculatedPrice || 0),
                additionalServices: [...existingServices, groomingService],
                updatedAt: new Date().toISOString(),
                lastModifiedBy: "Admin",
                lastModificationReason: "Grooming service added",
              }
            }
          }
          return boarding
        })

        setBoardingData(updatedBoardingData)

        // Find the updated boarding details to show in the dialog
        const updatedBoarding = updatedBoardingData.find((b) => b.id === selectedRequest.boardingId)
        if (updatedBoarding) {
          setSelectedBoardingDetails(updatedBoarding)
        }
      }

      setIsProcessing(false)
      setShowProcessDialog(false)

      // Show success dialog
      setSuccessDialog({
        open: true,
        title: "Request Completed Successfully",
        message: `The ${getRequestTypeLabel(selectedRequest.type).toLowerCase()} for ${selectedRequest.petName} has been completed.`,
        type: selectedRequest.type,
      })

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
    if (!successDialog.open && selectedBoardingDetails) {
      // Small delay to prevent dialog overlap
      const timer = setTimeout(() => {
        setShowBoardingDetailsDialog(true)
        // Clear the selected boarding details after showing the dialog
        // to prevent it from showing again if success dialog opens for another reason
        setSelectedBoardingDetails(null)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [successDialog.open, selectedBoardingDetails])

  const handleUndoAccept = (request: any) => {
    setRequestToUndo(request)
    setUndoAcceptMessage("")
    setShowUndoAcceptDialog(true)
  }

  const confirmUndoAccept = () => {
    if (!requestToUndo) return

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      // Update the request status back to "new" (not in-progress)
      const updatedRequests = requests.map((req) =>
        req.id === requestToUndo.id
          ? {
              ...req,
              status: "new", // Change to "new" instead of "in-progress"
              undoReason: undoAcceptMessage,
              undoTimestamp: new Date().toISOString(),
              undoBy: "Admin",
              // Keep the original data but mark as undone
              _previousData: {
                status: req.status,
                processingNotes: req.processingNotes,
              },
            }
          : req,
      )

      setRequests(updatedRequests)
      setIsProcessing(false)
      setShowUndoAcceptDialog(false)

      // Show success toast
      toast({
        title: "Request Returned to New Requests",
        description: `The ${getRequestTypeLabel(requestToUndo.type).toLowerCase()} for ${requestToUndo.petName} has been returned to the New Requests tab.`,
        duration: 5000,
      })

      // Reset state
      setRequestToUndo(null)
      setUndoAcceptMessage("")
    }, 1500)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setSearchQuery("")
    setFilterType("all")

    // NOTE FOR BACKEND: Replace with actual API call to refresh data
    setTimeout(() => {
      // Simulate refreshing data
      setRequests([...sampleRequests])
      setIsLoading(false)
    }, 1500)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsLoading(true)

    // NOTE FOR BACKEND: Replace with actual API call to search requests
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleReplaceFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  // Modify the filteredAndSortedRequests to highlight newly completed requests
  // Update the filteredAndSortedRequests function to properly filter requests based on the active tab
  // This ensures that completed requests are immediately removed from the In Progress tab
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
    updatedPreviewUrls.splice(index, 1)
    setPreviewUrls(updatedPreviewUrls)
  }

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

      {/* Update the search bar, filter, date filter and refresh section to be more responsive
         Replace the existing flex container with this improved version */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by pet name, owner, or description..."
              className="pl-9 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
            />
          </div>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[140px] h-10">
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

            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isLoading}
              className="h-10 w-10 flex-shrink-0"
              title="Refresh data"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
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
      <SuccessDialog
        open={successDialog.open}
        onOpenChange={(open) => setSuccessDialog({ ...successDialog, open })}
        title={successDialog.title}
        description={successDialog.message}
        type={successDialog.type as any}
      />

      {/* Boarding Details Dialog */}
      <Dialog open={showBoardingDetailsDialog} onOpenChange={setShowBoardingDetailsDialog}>
        <DialogContent className={`${isMobile ? "max-w-[95%]" : "sm:max-w-md"} max-h-[90vh] overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle className="text-xl">Boarding Payment Updated</DialogTitle>
            <DialogDescription>The boarding record has been updated with additional charges.</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {selectedBoardingDetails && (
              <>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md">
                  <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-300">
                    <Bell className="h-4 w-4" />
                    <span className="font-medium">Payment Status Updated:</span>
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-800"
                    >
                      Pending
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Pet</span>
                    <div className="text-base font-medium mt-1">{selectedBoardingDetails.pet.name}</div>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Owner</span>
                    <div className="text-base font-medium mt-1">{selectedBoardingDetails.owner.name}</div>
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Original Total
                  </span>
                  <div className="text-base font-medium mt-1">
                    {formatCurrency(
                      selectedBoardingDetails.totalPrice - (selectedBoardingDetails.additionalCharges || 0),
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Additional Charges
                  </span>
                  <div className="mt-1 p-3 bg-green-50 border border-green-100 rounded-md text-green-700 dark:bg-green-950/20 dark:border-green-800 dark:text-green-300 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="text-lg font-medium">
                      {formatCurrency(selectedBoardingDetails.additionalCharges || 0)}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({selectedBoardingDetails.additionalChargesReason})
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">New Total</span>
                  <div className="text-xl font-bold mt-1 text-green-700 dark:text-green-400">
                    {formatCurrency(selectedBoardingDetails.totalPrice)}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <div className="text-sm text-blue-800 dark:text-blue-300">
                    <p className="font-medium mb-1">Next Steps:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Notify the pet owner about the additional charges</li>
                      <li>Collect payment before pet release</li>
                      <li>Update payment status in Boarding Management</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button onClick={() => setShowBoardingDetailsDialog(false)} className="w-full">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Undo Accept Dialog - Update the title and description */}
      <Dialog open={showUndoAcceptDialog} onOpenChange={setShowUndoAcceptDialog}>
        <DialogContent className={`${isMobile ? "max-w-[95%]" : "sm:max-w-md"}`}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Return Request to New
            </DialogTitle>
            <DialogDescription>
              This will move the request back to the "New Requests" tab. Please provide a reason for this change that
              will be visible to the pet owner.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="undo-reason" className="font-medium">
                Reason for Returning Request
              </Label>
              <Textarea
                id="undo-reason"
                placeholder="Enter the reason for returning this request to the New Requests tab..."
                value={undoAcceptMessage}
                onChange={(e) => setUndoAcceptMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                This message will be sent to the pet owner to explain why their request is being returned to the New
                Requests tab for reassignment or further evaluation.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUndoAcceptDialog(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={confirmUndoAccept}
              disabled={!undoAcceptMessage.trim() || isProcessing}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Return"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Update the InProgressRequestCard component to enhance labels and values
function InProgressRequestCard({ request, onProcess, onUndoAccept, onViewDetails }: InProgressRequestCardProps) {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isSmallCard = useMediaQuery("(max-width: 400px)")

  const getCardBorderColor = (type: string, isUrgent: boolean) => {
    if (isUrgent) return "border-red-300 dark:border-red-800"

    switch (type) {
      case "photo":
        return "border-blue-200 dark:border-blue-800"
      case "video":
        return "border-purple-200 dark:border-purple-800"
      case "grooming":
        return "border-green-200 dark:border-green-800"
      case "boarding-extension":
        return "border-amber-200 dark:border-amber-800"
      case "custom":
        return "border-gray-200 dark:border-gray-700"
      default:
        return ""
    }
  }

  const getCardBgColor = (type: string, isUrgent: boolean) => {
    if (isUrgent) return "bg-red-50 dark:bg-red-950/20"

    switch (type) {
      case "photo":
        return "bg-blue-50 dark:bg-blue-950/20"
      case "video":
        return "bg-purple-50 dark:bg-purple-950/20"
      case "grooming":
        return "bg-green-50 dark:bg-green-950/20"
      case "boarding-extension":
        return "bg-amber-50 dark:bg-amber-950/20"
      case "custom":
        return "bg-gray-50 dark:bg-gray-950/20"
      default:
        return ""
    }
  }

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

// Update the CompletedRequestCard component to enhance labels and values
function CompletedRequestCard({ request }: CompletedRequestCardProps) {
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

            {/* Show media thumbnail if available */}
            {request.mediaFiles && (request.type === "photo" || request.type === "video") && (
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

                {request.mediaFiles && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Media</h3>
                    <div className="mt-2 p-3 bg-muted rounded-md text-center text-muted-foreground">
                      {request.mediaFiles.count || 1} {request.type}
                      {request.mediaFiles.count > 1 ? "s" : ""} uploaded
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
                {request.mediaFiles && (
                  <ChatBubble
                    sender={request.completedBy || "Admin"}
                    message={`Here's the ${
                      request.type === "photo" ? (request.mediaFiles.count > 1 ? "photos" : "photo") : "video"
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

              {/* Removed chat input area - no longer needed */}
              <div className="p-4 border-t">
                <div className="text-center text-sm text-muted-foreground">This conversation is completed</div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Enhance the RequestCardSkeleton component with better animation
function RequestCardSkeleton() {
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

function EmptyState({ message = "No requests found" }: { message?: string }) {
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

