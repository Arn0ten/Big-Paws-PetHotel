"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Activity,
  CalendarIcon,
  Download,
  Filter,
  Image,
  Loader2,
  MoreHorizontal,
  RefreshCw,
  Search,
  Trash2,
  User,
  Video,
  PawPrint,
  Home,
  FileText,
  CheckSquare,
} from "lucide-react"
import { formatCurrency, formatDate } from "../request-management/utils/helpers"
import { HistoryTableSkeleton } from "./components/history-table-skeleton"
import { MediaCardSkeleton } from "./components/media-card-skeleton"

// Types for history module
interface HistoryEntry {
  id: string
  timestamp: string
  module: "pet-owner" | "pet" | "boarding" | "request" | "request-management"
  action: string
  description: string
  performedBy: string
  status?: string
  petId?: string
  petName?: string
  ownerId?: string
  ownerName?: string
  amount?: number
  requestId?: string
  requestType?: string
  mediaUrl?: string
  mediaType?: "image" | "video"
}

interface MediaEntry {
  id: string
  timestamp: string
  petName: string
  ownerName: string
  requestId: string
  requestType: "photo" | "video"
  description: string
  mediaUrls: string[]
  mediaTypes: ("image" | "video")[]
  completedBy: string
  completedAt: string
}

// Generate sample history data based on existing sample data from other modules
// BACKEND INTEGRATION: Replace this with actual API calls to fetch history data
const generateSampleHistoryData = (): HistoryEntry[] => {
  const historyEntries: HistoryEntry[] = []

  // Add pet owner registration entries
  historyEntries.push({
    id: "hist-001",
    timestamp: "2023-11-01T09:30:00Z",
    module: "pet-owner",
    action: "register",
    description: "New pet owner registered",
    performedBy: "Admin",
    status: "completed",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
  })

  historyEntries.push({
    id: "hist-002",
    timestamp: "2023-11-02T14:15:00Z",
    module: "pet-owner",
    action: "register",
    description: "New pet owner registered",
    performedBy: "Admin",
    status: "completed",
    ownerId: "owner-002",
    ownerName: "John Reyes",
  })

  // Add pet registration entries
  historyEntries.push({
    id: "hist-003",
    timestamp: "2023-11-03T10:45:00Z",
    module: "pet",
    action: "add",
    description: "New pet added",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
  })

  historyEntries.push({
    id: "hist-004",
    timestamp: "2023-11-04T11:20:00Z",
    module: "pet",
    action: "add",
    description: "New pet added",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-002",
    petName: "Max",
    ownerId: "owner-002",
    ownerName: "John Reyes",
  })

  // Add boarding entries
  historyEntries.push({
    id: "hist-005",
    timestamp: "2023-11-05T08:30:00Z",
    module: "boarding",
    action: "check-in",
    description: "Pet checked in for boarding",
    performedBy: "Admin",
    status: "active",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    amount: 1200.0,
  })

  historyEntries.push({
    id: "hist-006",
    timestamp: "2023-11-10T16:45:00Z",
    module: "boarding",
    action: "release",
    description: "Pet released from boarding",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    amount: 1200.0,
  })

  // Add request entries
  historyEntries.push({
    id: "hist-007",
    timestamp: "2023-11-12T09:15:00Z",
    module: "request",
    action: "submit",
    description: "Photo request submitted",
    performedBy: "Maria Santos",
    status: "pending",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    requestId: "req-001",
    requestType: "photo",
  })

  historyEntries.push({
    id: "hist-008",
    timestamp: "2023-11-13T10:30:00Z",
    module: "request-management",
    action: "complete",
    description: "Photo request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    requestId: "req-001",
    requestType: "photo",
    mediaUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480482738_1313694739908622_3258219043748175422_n.jpg-h82Fu5ySXkmxOsVKDXMHYJeYmLIuQp.jpeg",
    mediaType: "image",
  })

  historyEntries.push({
    id: "hist-009",
    timestamp: "2023-11-14T13:45:00Z",
    module: "request",
    action: "submit",
    description: "Video request submitted",
    performedBy: "John Reyes",
    status: "pending",
    petId: "pet-002",
    petName: "Max",
    ownerId: "owner-002",
    ownerName: "John Reyes",
    requestId: "req-002",
    requestType: "video",
  })

  historyEntries.push({
    id: "hist-010",
    timestamp: "2023-11-15T14:20:00Z",
    module: "request-management",
    action: "complete",
    description: "Video request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-002",
    petName: "Max",
    ownerId: "owner-002",
    ownerName: "John Reyes",
    requestId: "req-002",
    requestType: "video",
    mediaUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481813534_9269122403125682_8683199565701118176_n-YujoMBZG0mFO5VkwYqBIUTYsW1DMhu.mp4",
    mediaType: "video",
  })

  // Add grooming request entries
  historyEntries.push({
    id: "hist-011",
    timestamp: "2023-11-16T09:00:00Z",
    module: "request",
    action: "submit",
    description: "Grooming request submitted",
    performedBy: "Maria Santos",
    status: "pending",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    requestId: "req-003",
    requestType: "grooming",
  })

  historyEntries.push({
    id: "hist-012",
    timestamp: "2023-11-17T11:30:00Z",
    module: "request-management",
    action: "complete",
    description: "Grooming request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    requestId: "req-003",
    requestType: "grooming",
    amount: 450.0,
  })

  // Add more recent entries
  historyEntries.push({
    id: "hist-013",
    timestamp: "2023-11-18T15:20:00Z",
    module: "request",
    action: "submit",
    description: "Photo request submitted",
    performedBy: "John Reyes",
    status: "pending",
    petId: "pet-002",
    petName: "Max",
    ownerId: "owner-002",
    ownerName: "John Reyes",
    requestId: "req-004",
    requestType: "photo",
  })

  historyEntries.push({
    id: "hist-014",
    timestamp: "2023-11-19T16:45:00Z",
    module: "request-management",
    action: "complete",
    description: "Photo request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-002",
    petName: "Max",
    ownerId: "owner-002",
    ownerName: "John Reyes",
    requestId: "req-004",
    requestType: "photo",
    mediaUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-eBCIfrOnAMU3j7AdmdBsFEHVtwj1B3.jpeg",
    mediaType: "image",
  })

  // Add more entries with different pet owners and pets
  historyEntries.push({
    id: "hist-015",
    timestamp: "2023-11-20T09:30:00Z",
    module: "pet-owner",
    action: "register",
    description: "New pet owner registered",
    performedBy: "Admin",
    status: "completed",
    ownerId: "owner-003",
    ownerName: "Ana Gonzales",
  })

  historyEntries.push({
    id: "hist-016",
    timestamp: "2023-11-21T10:15:00Z",
    module: "pet",
    action: "add",
    description: "New pet added",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-003",
    petName: "Luna",
    ownerId: "owner-003",
    ownerName: "Ana Gonzales",
  })

  historyEntries.push({
    id: "hist-017",
    timestamp: "2023-11-22T11:30:00Z",
    module: "boarding",
    action: "check-in",
    description: "Pet checked in for boarding",
    performedBy: "Admin",
    status: "active",
    petId: "pet-003",
    petName: "Luna",
    ownerId: "owner-003",
    ownerName: "Ana Gonzales",
    amount: 1500.0,
  })

  historyEntries.push({
    id: "hist-018",
    timestamp: "2023-11-23T14:45:00Z",
    module: "request",
    action: "submit",
    description: "Video request submitted",
    performedBy: "Ana Gonzales",
    status: "pending",
    petId: "pet-003",
    petName: "Luna",
    ownerId: "owner-003",
    ownerName: "Ana Gonzales",
    requestId: "req-005",
    requestType: "video",
  })

  historyEntries.push({
    id: "hist-019",
    timestamp: "2023-11-24T15:30:00Z",
    module: "request-management",
    action: "complete",
    description: "Video request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-003",
    petName: "Luna",
    ownerId: "owner-003",
    ownerName: "Ana Gonzales",
    requestId: "req-005",
    requestType: "video",
    mediaUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481817843_9277714875675610_7115125575926345799_n-lCz1vZTDTYlcmAGIgVjrqw52ElqlYm.mp4",
    mediaType: "video",
  })

  // Add more recent entries
  historyEntries.push({
    id: "hist-020",
    timestamp: "2023-11-25T09:15:00Z",
    module: "request",
    action: "submit",
    description: "Photo request submitted",
    performedBy: "Maria Santos",
    status: "pending",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    requestId: "req-006",
    requestType: "photo",
  })

  historyEntries.push({
    id: "hist-021",
    timestamp: "2023-11-26T10:30:00Z",
    module: "request-management",
    action: "complete",
    description: "Photo request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    requestId: "req-006",
    requestType: "photo",
    mediaUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480179834_591444434054760_4947462491439067277_n.jpg-Qw8WkLTKBxeNvm3ONUyfBLybRRPvMS.jpeg",
    mediaType: "image",
  })

  historyEntries.push({
    id: "hist-022",
    timestamp: "2023-11-27T13:45:00Z",
    module: "boarding",
    action: "release",
    description: "Pet released from boarding",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-003",
    petName: "Luna",
    ownerId: "owner-003",
    ownerName: "Ana Gonzales",
    amount: 1500.0,
  })

  // Add more entries with different pet owners and pets
  historyEntries.push({
    id: "hist-023",
    timestamp: "2023-11-28T09:30:00Z",
    module: "pet-owner",
    action: "register",
    description: "New pet owner registered",
    performedBy: "Admin",
    status: "completed",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
  })

  historyEntries.push({
    id: "hist-024",
    timestamp: "2023-11-29T10:15:00Z",
    module: "pet",
    action: "add",
    description: "New pet added",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-004",
    petName: "Coco",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
  })

  historyEntries.push({
    id: "hist-025",
    timestamp: "2023-11-30T11:30:00Z",
    module: "boarding",
    action: "check-in",
    description: "Pet checked in for boarding",
    performedBy: "Admin",
    status: "active",
    petId: "pet-004",
    petName: "Coco",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
    amount: 1350.0,
  })

  historyEntries.push({
    id: "hist-026",
    timestamp: "2023-12-01T14:45:00Z",
    module: "request",
    action: "submit",
    description: "Photo request submitted",
    performedBy: "Carlos Tan",
    status: "pending",
    petId: "pet-004",
    petName: "Coco",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
    requestId: "req-007",
    requestType: "photo",
  })

  historyEntries.push({
    id: "hist-027",
    timestamp: "2023-12-02T15:30:00Z",
    module: "request-management",
    action: "complete",
    description: "Photo request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-004",
    petName: "Coco",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
    requestId: "req-007",
    requestType: "photo",
    mediaUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480899995_642061011656747_972779387843409689_n.jpg-gv2UZ0xlTvegRblatIzGKymComv675.jpeg",
    mediaType: "image",
  })

  historyEntries.push({
    id: "hist-028",
    timestamp: "2023-12-03T09:15:00Z",
    module: "request",
    action: "submit",
    description: "Video request submitted",
    performedBy: "Carlos Tan",
    status: "pending",
    petId: "pet-004",
    petName: "Coco",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
    requestId: "req-008",
    requestType: "video",
  })

  historyEntries.push({
    id: "hist-029",
    timestamp: "2023-12-04T10:30:00Z",
    module: "request-management",
    action: "complete",
    description: "Video request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-004",
    petName: "Coco",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
    requestId: "req-008",
    requestType: "video",
    mediaUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481680804_28744805481832748_1861448157952924189_n-m1zXsrLzL2RY0AU2hpcPlGnpl7SsJR.mp4",
    mediaType: "video",
  })

  historyEntries.push({
    id: "hist-030",
    timestamp: "2023-12-05T13:45:00Z",
    module: "boarding",
    action: "release",
    description: "Pet released from boarding",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-004",
    petName: "Coco",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
    amount: 1350.0,
  })

  // Add one more recent entry
  historyEntries.push({
    id: "hist-031",
    timestamp: "2023-12-06T09:30:00Z",
    module: "request",
    action: "submit",
    description: "Photo request submitted",
    performedBy: "Ana Gonzales",
    status: "pending",
    petId: "pet-003",
    petName: "Luna",
    ownerId: "owner-003",
    ownerName: "Ana Gonzales",
    requestId: "req-009",
    requestType: "photo",
  })

  historyEntries.push({
    id: "hist-032",
    timestamp: "2023-12-07T10:15:00Z",
    module: "request-management",
    action: "complete",
    description: "Photo request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-003",
    petName: "Luna",
    ownerId: "owner-003",
    ownerName: "Ana Gonzales",
    requestId: "req-009",
    requestType: "photo",
    mediaUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480613347_1009147024599744_449517268461532420_n.jpg-ZHcZKb2RVfqO1JjzFC8Vb93D7Go5Ld.jpeg",
    mediaType: "image",
  })

  return historyEntries.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })
}

// Generate sample media entries based on history data
// BACKEND INTEGRATION: Replace this with actual API calls to fetch media data
const generateSampleMediaData = (historyData: HistoryEntry[]): MediaEntry[] => {
  const mediaEntries: MediaEntry[] = []

  // Filter history entries for completed media requests
  const completedMediaRequests = historyData.filter(
    (entry) =>
      entry.module === "request-management" &&
      entry.action === "complete" &&
      (entry.requestType === "photo" || entry.requestType === "video") &&
      entry.mediaUrl,
  )

  // Create media entries from completed requests
  completedMediaRequests.forEach((entry) => {
    if (entry.requestType === "photo" || entry.requestType === "video") {
      mediaEntries.push({
        id: entry.id,
        timestamp: entry.timestamp,
        petName: entry.petName || "",
        ownerName: entry.ownerName || "",
        requestId: entry.requestId || "",
        requestType: entry.requestType as "photo" | "video",
        description: entry.description,
        mediaUrls: entry.mediaUrl ? [entry.mediaUrl] : [],
        mediaTypes: entry.mediaType ? [entry.mediaType] : [],
        completedBy: entry.performedBy,
        completedAt: entry.timestamp,
      })
    }
  })

  return mediaEntries.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })
}

// Update module names and icons
const getModuleIcon = (module: string) => {
  switch (module) {
    case "pet-owner":
      return <User className="h-4 w-4 text-blue-500" />
    case "pet":
      return <PawPrint className="h-4 w-4 text-green-500" />
    case "boarding":
      return <Home className="h-4 w-4 text-orange-500" />
    case "request":
      return <FileText className="h-4 w-4 text-purple-500" />
    case "request-management":
      return <CheckSquare className="h-4 w-4 text-indigo-500" />
    default:
      return <Activity className="h-4 w-4 text-gray-500" />
  }
}

// Update module labels
const getModuleLabel = (module: string) => {
  switch (module) {
    case "pet-owner":
      return "Pet Owner Management"
    case "pet":
      return "Pet Management"
    case "boarding":
      return "Boarding Management"
    case "request":
      return "Requests"
    case "request-management":
      return "Request Management"
    default:
      return module
  }
}

// Helper function to render status badge
const getStatusBadge = (status: string | undefined) => {
  switch (status) {
    case "completed":
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700/50"
        >
          Completed
        </Badge>
      )
    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700/50"
        >
          Pending
        </Badge>
      )
    case "active":
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50"
        >
          Active
        </Badge>
      )
    case "deleted":
      return (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700/50"
        >
          Deleted
        </Badge>
      )
    case "updated":
      return (
        <Badge
          variant="outline"
          className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700/50"
        >
          Updated
        </Badge>
      )
    default:
      return (
        <Badge
          variant="outline"
          className="bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-700/50"
        >
          Unknown
        </Badge>
      )
  }
}

// Helper function to render media type badge
const getMediaTypeBadge = (mediaType: string) => {
  switch (mediaType) {
    case "photo":
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50"
        >
          <Image className="h-3 w-3 mr-1" />
          Photo
        </Badge>
      )
    case "video":
      return (
        <Badge
          variant="outline"
          className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700/50"
        >
          <Video className="h-3 w-3 mr-1" />
          Video
        </Badge>
      )
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("activity")
  const [historyData, setHistoryData] = useState<HistoryEntry[]>([])
  const [mediaData, setMediaData] = useState<MediaEntry[]>([])
  const [filteredHistory, setFilteredHistory] = useState<HistoryEntry[]>([])
  const [filteredMedia, setFilteredMedia] = useState<MediaEntry[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [moduleFilter, setModuleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [mediaTypeFilter, setMediaTypeFilter] = useState("all")
  const [petOwnerFilter, setPetOwnerFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null)
  const [selectedMedia, setSelectedMedia] = useState<MediaEntry | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showMediaDetailsDialog, setShowMediaDetailsDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const { toast } = useToast()
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Fetch history data on component mount
  useEffect(() => {
    // BACKEND INTEGRATION: Replace with actual API call
    // Example:
    // const fetchHistoryData = async () => {
    //   try {
    //     setIsLoading(true)
    //     const response = await fetch('/api/admin/history')
    //     if (!response.ok) throw new Error('Failed to fetch history data')
    //     const data = await response.json()
    //     setHistoryData(data)
    //     setFilteredHistory(data)
    //     setIsLoading(false)
    //   } catch (error) {
    //     console.error('Error fetching history data:', error)
    //     toast({
    //       title: "Error",
    //       description: "Failed to load history data. Please try again.",
    //       variant: "destructive",
    //     })
    //     setIsLoading(false)
    //   }
    // }
    // fetchHistoryData()

    // Simulate API call with sample data
    setTimeout(() => {
      const sampleHistoryData = generateSampleHistoryData()
      setHistoryData(sampleHistoryData)
      setFilteredHistory(sampleHistoryData)

      const sampleMediaData = generateSampleMediaData(sampleHistoryData)
      setMediaData(sampleMediaData)
      setFilteredMedia(sampleMediaData)

      setIsLoading(false)
    }, 1000)
  }, [])

  // Apply filters to history data
  useEffect(() => {
    if (historyData.length === 0) return

    let filtered = [...historyData]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (entry) =>
          (entry.description && entry.description.toLowerCase().includes(query)) ||
          (entry.petName && entry.petName.toLowerCase().includes(query)) ||
          (entry.ownerName && entry.ownerName.toLowerCase().includes(query)) ||
          (entry.performedBy && entry.performedBy.toLowerCase().includes(query)),
      )
    }

    // Apply module filter
    if (moduleFilter !== "all") {
      filtered = filtered.filter((entry) => entry.module === moduleFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((entry) => entry.status === statusFilter)
    }

    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter)
      filterDate.setHours(0, 0, 0, 0)

      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.timestamp)
        entryDate.setHours(0, 0, 0, 0)
        return entryDate.getTime() === filterDate.getTime()
      })
    }

    // Apply sort order
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime()
      const dateB = new Date(b.timestamp).getTime()
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })

    setFilteredHistory(filtered)
  }, [historyData, searchQuery, moduleFilter, statusFilter, dateFilter, sortOrder])

  // Apply filters to media data
  useEffect(() => {
    if (mediaData.length === 0) return

    let filtered = [...mediaData]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (entry) =>
          (entry.description && entry.description.toLowerCase().includes(query)) ||
          (entry.petName && entry.petName.toLowerCase().includes(query)) ||
          (entry.ownerName && entry.ownerName.toLowerCase().includes(query)) ||
          (entry.completedBy && entry.completedBy.toLowerCase().includes(query)),
      )
    }

    // Apply media type filter
    if (mediaTypeFilter !== "all") {
      filtered = filtered.filter((entry) => entry.requestType === mediaTypeFilter)
    }

    // Apply pet owner filter
    if (petOwnerFilter !== "all") {
      filtered = filtered.filter((entry) => entry.ownerName === petOwnerFilter)
    }

    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter)
      filterDate.setHours(0, 0, 0, 0)

      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.timestamp)
        entryDate.setHours(0, 0, 0, 0)
        return entryDate.getTime() === filterDate.getTime()
      })
    }

    // Apply sort order
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime()
      const dateB = new Date(b.timestamp).getTime()
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })

    setFilteredMedia(filtered)
  }, [mediaData, searchQuery, mediaTypeFilter, petOwnerFilter, dateFilter, sortOrder])

  // Handle refresh button click
  const handleRefresh = () => {
    setIsLoading(true)
    setSearchQuery("")
    setModuleFilter("all")
    setStatusFilter("all")
    setDateFilter(undefined)
    setMediaTypeFilter("all")
    setPetOwnerFilter("all")

    // BACKEND INTEGRATION: Replace with actual API call
    // Example:
    // const refreshData = async () => {
    //   try {
    //     const response = await fetch('/api/admin/history')
    //     if (!response.ok) throw new Error('Failed to fetch history data')
    //     const data = await response.json()
    //     setHistoryData(data)
    //     setFilteredHistory(data)
    //
    //     const mediaResponse = await fetch('/api/admin/media')
    //     if (!mediaResponse.ok) throw new Error('Failed to fetch media data')
    //     const mediaData = await mediaResponse.json()
    //     setMediaData(mediaData)
    //     setFilteredMedia(mediaData)
    //
    //     setIsLoading(false)
    //     toast({
    //       title: "Success",
    //       description: "Data refreshed successfully",
    //     })
    //   } catch (error) {
    //     console.error('Error refreshing data:', error)
    //     toast({
    //       title: "Success",
    //       description: "Data refreshed successfully",
    //     })
    //   } catch (error) {
    //     console.error('Error refreshing data:', error)
    //     toast({
    //       title: "Error",
    //       description: "Failed to refresh data. Please try again.",
    //       variant: "destructive",
    //     })
    //     setIsLoading(false)
    //   }
    // }
    // refreshData()

    // Simulate API call with sample data
    setTimeout(() => {
      const sampleHistoryData = generateSampleHistoryData()
      setHistoryData(sampleHistoryData)
      setFilteredHistory(sampleHistoryData)

      const sampleMediaData = generateSampleMediaData(sampleHistoryData)
      setMediaData(sampleMediaData)
      setFilteredMedia(sampleMediaData)

      setIsLoading(false)
      toast({
        title: "Success",
        description: "Data refreshed successfully",
      })
    }, 1000)
  }

  // Handle view details button click
  const handleViewDetails = (entry: HistoryEntry) => {
    setSelectedEntry(entry)
    setShowDetailsDialog(true)
  }

  // Handle view media details button click
  const handleViewMediaDetails = (entry: MediaEntry) => {
    setSelectedMedia(entry)
    setShowMediaDetailsDialog(true)
  }

  // Handle delete button click
  const handleDelete = (id: string) => {
    setEntryToDelete(id)
    setShowDeleteDialog(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (!entryToDelete) return

    setIsLoading(true)

    // BACKEND INTEGRATION: Replace with actual API call
    // Example:
    // const deleteEntry = async () => {
    //   try {
    //     const response = await fetch(`/api/admin/history/${entryToDelete}`, {
    //       method: 'DELETE',
    //     })
    //     if (!response.ok) throw new Error('Failed to delete entry')
    //
    //     // Update local state
    //     setHistoryData(prev => prev.filter(entry => entry.id !== entryToDelete))
    //     setFilteredHistory(prev => prev.filter(entry => entry.id !== entryToDelete))
    //
    //     // Also remove from media data if it exists there
    //     setMediaData(prev => prev.filter(entry => entry.id !== entryToDelete))
    //     setFilteredMedia(prev => prev.filter(entry => entry.id !== entryToDelete))
    //
    //     setIsLoading(false)
    //     toast({
    //       title: "Success",
    //       description: "Entry deleted successfully",
    //     })
    //   } catch (error) {
    //     console.error('Error deleting entry:', error)
    //     toast({
    //       title: "Error",
    //       description: "Failed to delete entry. Please try again.",
    //       variant: "destructive",
    //     })
    //     setIsLoading(false)
    //   }
    // }
    // deleteEntry()

    // Simulate API call
    setTimeout(() => {
      // Update local state
      setHistoryData((prev) => prev.filter((entry) => entry.id !== entryToDelete))
      setFilteredHistory((prev) => prev.filter((entry) => entry.id !== entryToDelete))

      // Also remove from media data if it exists there
      setMediaData((prev) => prev.filter((entry) => entry.id !== entryToDelete))
      setFilteredMedia((prev) => prev.filter((entry) => entry.id !== entryToDelete))

      setIsLoading(false)
      setShowDeleteDialog(false)
      setEntryToDelete(null)

      toast({
        title: "Success",
        description: "Entry deleted successfully",
      })
    }, 1000)
  }

  // Get unique pet owners for filter
  const uniquePetOwners = Array.from(new Set(mediaData.map((entry) => entry.ownerName)))

  // Get module icon
  const getModuleIcon = (module: string) => {
    switch (module) {
      case "pet-owner":
        return <User className="h-4 w-4 text-blue-500" />
      case "pet":
        return <PawPrint className="h-4 w-4 text-green-500" />
      case "boarding":
        return <Home className="h-4 w-4 text-orange-500" />
      case "request":
        return <FileText className="h-4 w-4 text-purple-500" />
      case "request-management":
        return <CheckSquare className="h-4 w-4 text-indigo-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  // Get module label
  const getModuleLabel = (module: string) => {
    switch (module) {
      case "pet-owner":
        return "Pet Owner Management"
      case "pet":
        return "Pet Management"
      case "boarding":
        return "Boarding Management"
      case "request":
        return "Requests"
      case "request-management":
        return "Request Management"
      default:
        return module
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">History</h1>
        <p className="text-muted-foreground">View historical data, activity logs, and media archives.</p>
      </div>

      <Tabs defaultValue="activity" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Activity Log</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span>Media Archive</span>
          </TabsTrigger>
        </TabsList>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by pet, owner, or description..."
                  className="pl-9 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                <Select value={moduleFilter} onValueChange={setModuleFilter}>
                  <SelectTrigger className="w-full sm:w-[140px] h-10">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Filter className="h-3.5 w-3.5" />
                      <span className="truncate">
                        {moduleFilter === "all" ? "All Modules" : getModuleLabel(moduleFilter)}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    <SelectItem value="pet-owner">Pet Owner Management</SelectItem>
                    <SelectItem value="pet">Pet Management</SelectItem>
                    <SelectItem value="boarding">Boarding Management</SelectItem>
                    <SelectItem value="request">Requests</SelectItem>
                    <SelectItem value="request-management">Request Management</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[140px] h-10">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Filter className="h-3.5 w-3.5" />
                      <span className="truncate">{statusFilter === "all" ? "All Status" : statusFilter}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full sm:w-[140px] h-10 justify-start text-left font-normal",
                        !dateFilter && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
                    {dateFilter && (
                      <div className="p-3 border-t border-border">
                        <Button variant="ghost" className="w-full" onClick={() => setDateFilter(undefined)}>
                          Clear
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>

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

          {/* Activity Table */}
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  <HistoryTableSkeleton />
                </div>
              ) : filteredHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Activity className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No activity found</h3>
                  <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search query</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Timestamp</TableHead>
                        <TableHead>Module</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Pet / Owner</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHistory.map((entry) => (
                        <TableRow
                          key={entry.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleViewDetails(entry)}
                        >
                          <TableCell className="font-medium">{formatDate(entry.timestamp)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getModuleIcon(entry.module)}
                              <span>{getModuleLabel(entry.module)}</span>
                            </div>
                          </TableCell>
                          <TableCell>{entry.description}</TableCell>
                          <TableCell>
                            {entry.petName && <div className="font-medium">{entry.petName}</div>}
                            {entry.ownerName && <div className="text-sm text-muted-foreground">{entry.ownerName}</div>}
                          </TableCell>
                          <TableCell>{getStatusBadge(entry.status)}</TableCell>
                          <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleViewDetails(entry)}>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(entry.id)}
                                  className="text-red-600 dark:text-red-400"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Archive Tab */}
        <TabsContent value="media" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by pet, owner, or description..."
                  className="pl-9 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                <Select value={mediaTypeFilter} onValueChange={setMediaTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[140px] h-10">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Filter className="h-3.5 w-3.5" />
                      <span className="truncate">
                        {mediaTypeFilter === "all" ? "All Media" : mediaTypeFilter === "photo" ? "Photos" : "Videos"}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Media</SelectItem>
                    <SelectItem value="photo">Photos</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={petOwnerFilter} onValueChange={setPetOwnerFilter}>
                  <SelectTrigger className="w-full sm:w-[140px] h-10">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Filter className="h-3.5 w-3.5" />
                      <span className="truncate">{petOwnerFilter === "all" ? "All Owners" : petOwnerFilter}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Owners</SelectItem>
                    {uniquePetOwners.map((owner) => (
                      <SelectItem key={owner} value={owner}>
                        {owner}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full sm:w-[140px] h-10 justify-start text-left font-normal",
                        !dateFilter && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
                    {dateFilter && (
                      <div className="p-3 border-t border-border">
                        <Button variant="ghost" className="w-full" onClick={() => setDateFilter(undefined)}>
                          Clear
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>

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

          {/* Media Gallery */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <MediaCardSkeleton />
              <MediaCardSkeleton />
              <MediaCardSkeleton />
              <MediaCardSkeleton />
              <MediaCardSkeleton />
              <MediaCardSkeleton />
              <MediaCardSkeleton />
              <MediaCardSkeleton />
            </div>
          ) : filteredMedia.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <Image className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No media found</h3>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search query</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMedia.map((media) => (
                <Card
                  key={media.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleViewMediaDetails(media)}
                >
                  <div className="relative aspect-video bg-muted">
                    {media.requestType === "photo" && media.mediaUrls.length > 0 && (
                      <>
                        <img
                          src={media.mediaUrls[0] || "/placeholder.svg"}
                          alt={`Photo of ${media.petName}`}
                          className="w-full h-full object-cover"
                        />
                        {media.mediaUrls.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                            +{media.mediaUrls.length - 1} more
                          </div>
                        )}
                      </>
                    )}
                    {media.requestType === "video" && media.mediaUrls[0] && (
                      <div className="relative w-full h-full bg-black flex items-center justify-center">
                        <video src={media.mediaUrls[0]} className="w-full h-full object-contain" controls={false} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="rounded-full bg-black/50 p-3">
                            <Video className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">{getMediaTypeBadge(media.requestType)}</div>
                  </div>
                  <CardContent className="p-3">
                    <div className="font-medium truncate">{media.petName}</div>
                    <div className="text-sm text-muted-foreground truncate">{media.ownerName}</div>
                    <div className="text-xs text-muted-foreground mt-1">{formatDate(media.timestamp)}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className={`${isMobile ? "max-w-[95%]" : "sm:max-w-md"} max-h-[90vh] overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle className="text-xl">Activity Details</DialogTitle>
            <DialogDescription>Detailed information about this activity</DialogDescription>
          </DialogHeader>

          {selectedEntry && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Timestamp</span>
                  <div className="text-base font-medium mt-1">{formatDate(selectedEntry.timestamp)}</div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Module</span>
                  <div className="text-base font-medium mt-1 flex items-center gap-2">
                    {getModuleIcon(selectedEntry.module)}
                    <span>{getModuleLabel(selectedEntry.module)}</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Description</span>
                <div className="text-base font-medium mt-1">{selectedEntry.description}</div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Performed By</span>
                <div className="text-base font-medium mt-1">{selectedEntry.performedBy}</div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Status</span>
                <div className="text-base font-medium mt-1">{getStatusBadge(selectedEntry.status)}</div>
              </div>

              {(selectedEntry.petName || selectedEntry.ownerName) && (
                <div className="grid grid-cols-2 gap-4">
                  {selectedEntry.petName && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Pet</span>
                      <div className="text-base font-medium mt-1">{selectedEntry.petName}</div>
                    </div>
                  )}

                  {selectedEntry.ownerName && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Owner</span>
                      <div className="text-base font-medium mt-1">{selectedEntry.ownerName}</div>
                    </div>
                  )}
                </div>
              )}

              {selectedEntry.amount && (
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Amount</span>
                  <div className="text-base font-medium mt-1 text-green-600 dark:text-green-400">
                    {formatCurrency(selectedEntry.amount)}
                  </div>
                </div>
              )}

              {selectedEntry.mediaUrl && (
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Media</span>
                  <div className="mt-1 bg-muted rounded-md overflow-hidden">
                    {selectedEntry.mediaType === "image" && (
                      <img
                        src={selectedEntry.mediaUrl || "/placeholder.svg"}
                        alt="Media"
                        className="w-full h-auto object-contain"
                      />
                    )}
                    {selectedEntry.mediaType === "video" && (
                      <video src={selectedEntry.mediaUrl} controls className="w-full h-auto" />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDetailsDialog(false)
                if (selectedEntry) {
                  handleDelete(selectedEntry.id)
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Media Details Dialog */}
      <Dialog open={showMediaDetailsDialog} onOpenChange={setShowMediaDetailsDialog}>
        <DialogContent className={`${isMobile ? "max-w-[95%]" : "max-w-3xl"} max-h-[90vh] overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle className="text-xl">Media Details</DialogTitle>
            <DialogDescription>Detailed view of the media request</DialogDescription>
          </DialogHeader>

          {selectedMedia && (
            <div className="space-y-4 py-4">
              {selectedMedia.mediaUrls.length > 0 && (
                <div className="space-y-4">
                  {selectedMedia.requestType === "photo" ? (
                    selectedMedia.mediaUrls.length === 1 ? (
                      <div className="bg-muted rounded-md overflow-hidden">
                        <img
                          src={selectedMedia.mediaUrls[0] || "/placeholder.svg"}
                          alt={`Photo of ${selectedMedia.petName}`}
                          className="w-full h-auto object-contain max-h-[400px]"
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Media Gallery ({selectedMedia.mediaUrls.length} items)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedMedia.mediaUrls.map((url, index) => (
                            <div key={index} className="bg-muted rounded-md overflow-hidden">
                              <img
                                src={url || "/placeholder.svg"}
                                alt={`Photo ${index + 1} of ${selectedMedia.petName}`}
                                className="w-full h-auto object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="bg-muted rounded-md overflow-hidden">
                      <video src={selectedMedia.mediaUrls[0]} controls className="w-full h-auto max-h-[400px]" />
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Pet Name</span>
                  <div className="text-base font-medium mt-1">{selectedMedia.petName}</div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Owner Name</span>
                  <div className="text-base font-medium mt-1">{selectedMedia.ownerName}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Request Type
                  </span>
                  <div className="text-base font-medium mt-1">{getMediaTypeBadge(selectedMedia.requestType)}</div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Completed By
                  </span>
                  <div className="text-base font-medium mt-1">{selectedMedia.completedBy}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Requested On
                  </span>
                  <div className="text-base font-medium mt-1">{formatDate(selectedMedia.timestamp)}</div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Completed On
                  </span>
                  <div className="text-base font-medium mt-1">{formatDate(selectedMedia.completedAt)}</div>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Description</span>
                <div className="text-base mt-1">{selectedMedia.description}</div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMediaDetailsDialog(false)}>
              Close
            </Button>
            <Button
              variant="default"
              onClick={() => {
                // BACKEND INTEGRATION: Implement download functionality
                // For multiple media items, consider creating a zip file
                if (selectedMedia && selectedMedia.mediaUrls.length > 0) {
                  if (selectedMedia.mediaUrls.length === 1) {
                    // Download single file
                    window.open(selectedMedia.mediaUrls[0], "_blank")
                  } else {
                    // BACKEND INTEGRATION: For multiple files, implement a zip download
                    // For now, just open the first one
                    toast({
                      title: "Multiple files",
                      description: "Backend integration needed for downloading multiple files as a zip.",
                    })
                    window.open(selectedMedia.mediaUrls[0], "_blank")
                  }
                }
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              {selectedMedia && selectedMedia.mediaUrls.length > 1 ? "Download All" : "Download"}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowMediaDetailsDialog(false)
                if (selectedMedia) {
                  handleDelete(selectedMedia.id)
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this entry from the history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

