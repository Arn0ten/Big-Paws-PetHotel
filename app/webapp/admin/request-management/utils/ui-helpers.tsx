import { Camera, Video, Scissors, Clock, FileText } from "lucide-react"
import type { PaymentStatus, BoardingStatus } from "../../boarding/types"

// Request type icon mapping
export const getRequestTypeIcon = (type: string) => {
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

// Request type label mapping
export const getRequestTypeLabel = (type: string) => {
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

// Card styling helpers
export const getCardBorderColor = (type: string, isUrgent: boolean) => {
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

export const getCardBgColor = (type: string, isUrgent: boolean) => {
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

// Pricing data for services
export const PRICING = {
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
export const calculateExtensionCost = (duration: string, unit: string, petSize: string): number => {
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

// Sample data for demonstration
export const sampleRequests = [
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
  // ... other sample requests (truncated for brevity)
]

// Sample boarding data
export const sampleBoardingData = [
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
  // ... other sample boarding data (truncated for brevity)
]

