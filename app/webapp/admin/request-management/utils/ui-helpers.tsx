import { Camera, Video, Scissors, Clock, FileText } from "lucide-react"

/**
 * UI Helper functions for request management
 *
 * BACKEND INTEGRATION NOTES:
 * - These functions can be shared across modules
 * - Consider moving them to a shared utility library
 */

// Get the appropriate icon for a request type
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

// Get the human-readable label for a request type
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

// Get the appropriate border color for a request card
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

// Get the appropriate background color for a request card
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

// Get the appropriate badge color for a request type
export const getRequestTypeBadgeClass = (type: string) => {
  switch (type) {
    case "photo":
      return "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
    case "video":
      return "bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300"
    case "grooming":
      return "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
    case "boarding-extension":
      return "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-300"
    case "custom":
      return "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
    default:
      return ""
  }
}

// Get the appropriate icon background color for a request type
export const getIconBgClass = (type: string) => {
  switch (type) {
    case "photo":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
    case "video":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
    case "grooming":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
    case "boarding-extension":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
    case "custom":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    default:
      return ""
  }
}

