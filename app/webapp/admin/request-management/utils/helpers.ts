import { addHours, addDays, parseISO } from "date-fns"
import type { Request, PetSize, BoardingExtension } from "../types"
import { BOARDING_RATES } from "../types"

/**
 * Helper functions for the request management module
 *
 * BACKEND INTEGRATION NOTES:
 * - These functions can be shared across modules
 * - Consider moving them to a shared utility library
 */

// Format currency in Philippine Peso
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Format date with or without time
export const formatDate = (dateString: string, includeTime = true): string => {
  if (!dateString) return "N/A"

  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    return "Invalid Date"
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }

  return new Intl.DateTimeFormat("en-PH", options).format(date)
}

// Calculate the time difference between two dates in a human-readable format
export function getTimeDifference(startDate: string, endDate: string): string {
  if (!startDate || !endDate) return "N/A"

  try {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffInMs = end.getTime() - start.getTime()

    // Convert to days
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (days === 0) {
      // Less than a day, show hours
      const hours = Math.floor(diffInMs / (1000 * 60 * 60))
      return `${hours} hour${hours !== 1 ? "s" : ""}`
    } else if (days < 7) {
      // Less than a week, show days
      return `${days} day${days !== 1 ? "s" : ""}`
    } else {
      // More than a week, show weeks and days
      const weeks = Math.floor(days / 7)
      const remainingDays = days % 7

      if (remainingDays === 0) {
        return `${weeks} week${weeks !== 1 ? "s" : ""}`
      } else {
        return `${weeks} week${weeks !== 1 ? "s" : ""} and ${remainingDays} day${remainingDays !== 1 ? "s" : ""}`
      }
    }
  } catch (error) {
    console.error("Error calculating time difference:", error)
    return "Invalid Date"
  }
}

export const calculateExtensionEndDate = (currentEndDate: string, duration: string, unit: "hours" | "days"): string => {
  const date = parseISO(currentEndDate)
  const durationNum = Number.parseInt(duration)

  if (unit === "hours") {
    return addHours(date, durationNum).toISOString()
  } else {
    return addDays(date, durationNum).toISOString()
  }
}

export const calculateExtensionCost = (extension: BoardingExtension, petSize: PetSize): number => {
  const durationNum = Number.parseInt(extension.duration)
  const rate = extension.unit === "hours" ? BOARDING_RATES.hourly[petSize] : BOARDING_RATES.daily[petSize]

  return durationNum * rate
}

export const getMediaType = (file: File): "image" | "video" | null => {
  if (file.type.startsWith("image/")) return "image"
  if (file.type.startsWith("video/")) return "video"
  return null
}

export const createObjectURL = (file: File): string => {
  return URL.createObjectURL(file)
}

export const revokeObjectURL = (url: string) => {
  URL.revokeObjectURL(url)
}

// Validate video duration
export const validateVideoDuration = async (file: File, maxDuration = 60): Promise<boolean> => {
  return new Promise((resolve) => {
    const video = document.createElement("video")
    video.preload = "metadata"

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src)
      const duration = video.duration
      resolve(duration <= maxDuration)
    }

    video.onerror = () => {
      resolve(false)
    }

    video.src = URL.createObjectURL(file)
  })
}

// NOTE FOR BACKEND: Replace these utility functions with actual API calls
export const uploadMedia = async (file: File): Promise<string> => {
  // Simulate upload delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return createObjectURL(file)
}

export const searchRequests = (requests: Request[], query: string): Request[] => {
  const searchLower = query.toLowerCase()
  return requests.filter(
    (request) =>
      request.petName.toLowerCase().includes(searchLower) ||
      request.petOwnerName.toLowerCase().includes(searchLower) ||
      request.description.toLowerCase().includes(searchLower),
  )
}

export const filterRequests = (requests: Request[], status: string, type: string): Request[] => {
  return requests.filter((request) => {
    if (status && request.status !== status) return false
    if (type !== "all" && request.type !== type) return false
    return true
  })
}

export const markRequestAsNew = (request: Request): Request => {
  return {
    ...request,
    isNew: true,
  }
}

