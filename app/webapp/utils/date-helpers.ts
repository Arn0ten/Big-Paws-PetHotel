/**
 * Utility functions for date formatting and manipulation
 *
 * @note These functions are used across both pet-owner and admin interfaces
 * to ensure consistent date formatting throughout the application
 */

/**
 * Format a date string into a user-friendly format
 *
 * @param dateString - ISO date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return ""

  const date = new Date(dateString)

  // Check if date is today
  const today = new Date()
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  if (isToday) {
    return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
  }

  // Check if date is yesterday
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()

  if (isYesterday) {
    return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
  }

  // Otherwise, return full date
  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/**
 * Format a currency value
 *
 * @param amount - Number to format as currency
 * @param currency - Currency code (default: USD)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency = "PHP"): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Calculate the duration between two dates
 *
 * @param startDate - Start date string
 * @param endDate - End date string
 * @returns Duration object with days, hours, minutes
 */
export const calculateDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const durationMs = end.getTime() - start.getTime()
  const days = Math.floor(durationMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))

  return { days, hours, minutes }
}

