import { addHours, addDays, parseISO } from "date-fns"
import type { Request, PetSize, BoardingExtension } from "../types"
import { BOARDING_RATES } from "../types"

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount)
}

export const formatDate = (dateString: string, includeTime = true): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(includeTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
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

