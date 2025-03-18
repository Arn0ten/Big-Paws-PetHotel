/**
 * DATE UTILITY FUNCTIONS
 *
 * This file contains utility functions for formatting dates and times.
 *
 * =====================================================================
 * BACKEND INTEGRATION INSTRUCTIONS:
 * =====================================================================
 *
 * 1. These functions can be used as-is with real API data
 * 2. Consider adding timezone support for international users
 * 3. Ensure consistent date formatting across the application
 */

/**
 * Format a date string or Date object into a human-readable format
 * @param dateInput The date string or Date object
 * @param options Formatting options
 * @returns Formatted date string
 */
export const formatDate = (dateInput: string | Date | undefined, options?: Intl.DateTimeFormatOptions): string => {
  if (!dateInput) return "N/A"

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput

  // Default options if none provided
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }

  // Merge provided options with defaults
  const formattingOptions = options ? { ...defaultOptions, ...options } : defaultOptions

  try {
    return new Intl.DateTimeFormat("en-US", formattingOptions).format(date)
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid Date"
  }
}

/**
 * Format a date as a relative time (e.g., "2 hours ago")
 * @param dateInput The date string or Date object
 * @returns Relative time string
 */
export const formatRelativeTime = (dateInput: string | Date | undefined): string => {
  if (!dateInput) return "N/A"

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()

  // Convert to seconds
  const diffSec = Math.floor(diffMs / 1000)

  // Less than a minute
  if (diffSec < 60) {
    return "just now"
  }

  // Less than an hour
  if (diffSec < 3600) {
    const minutes = Math.floor(diffSec / 60)
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  }

  // Less than a day
  if (diffSec < 86400) {
    const hours = Math.floor(diffSec / 3600)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  }

  // Less than a week
  if (diffSec < 604800) {
    const days = Math.floor(diffSec / 86400)
    return `${days} day${days > 1 ? "s" : ""} ago`
  }

  // Default to standard date format
  return formatDate(date)
}

/**
 * Format a duration in minutes to a readable format
 * @param minutes Duration in minutes
 * @returns Formatted duration string (e.g., "2h 30m")
 */
export const formatDuration = (minutes: number): string => {
  if (!minutes || minutes < 0) return "0m"

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes}m`
  }

  if (remainingMinutes === 0) {
    return `${hours}h`
  }

  return `${hours}h ${remainingMinutes}m`
}

/**
 * Format a date range between two dates
 * @param startDate Start date string or Date object
 * @param endDate End date string or Date object
 * @returns Formatted date range string
 */
export const formatDateRange = (startDate: string | Date | undefined, endDate: string | Date | undefined): string => {
  if (!startDate || !endDate) return "N/A"

  const start = typeof startDate === "string" ? new Date(startDate) : startDate
  const end = typeof endDate === "string" ? new Date(endDate) : endDate

  // Same day
  if (start.toDateString() === end.toDateString()) {
    return `${formatDate(start, { month: "short", day: "numeric" })} ${formatDate(start, { hour: "numeric", minute: "numeric", hour12: true })} - ${formatDate(end, { hour: "numeric", minute: "numeric", hour12: true })}`
  }

  // Different days
  return `${formatDate(start)} - ${formatDate(end)}`
}

