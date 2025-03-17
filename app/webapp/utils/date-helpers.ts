/**
 * Date Helper Functions
 *
 * This file contains helper functions for working with dates.
 * Backend developers can modify these to work with actual API data.
 */

/**
 * Format a date string
 * @param dateString The ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}

/**
 * Format a date string with day of week
 * @param dateString The ISO date string
 * @returns Formatted date string with day of week
 */
export const formatDateWithDay = (dateString: string): string => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}

/**
 * Format a date string as a date only
 * @param dateString The ISO date string
 * @returns Formatted date string without time
 */
export const formatDateOnly = (dateString: string): string => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

/**
 * Calculate the difference between two dates in days
 * @param startDate The start date
 * @param endDate The end date
 * @returns The difference in days
 */
export const getDaysDifference = (startDate: string, endDate: string): number => {
  if (!startDate || !endDate) return 0
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

/**
 * Check if a date is in the past
 * @param dateString The ISO date string
 * @returns True if the date is in the past
 */
export const isDateInPast = (dateString: string): boolean => {
  if (!dateString) return false
  const date = new Date(dateString)
  const now = new Date()
  return date < now
}

/**
 * Check if a date is in the future
 * @param dateString The ISO date string
 * @returns True if the date is in the future
 */
export const isDateInFuture = (dateString: string): boolean => {
  if (!dateString) return false
  const date = new Date(dateString)
  const now = new Date()
  return date > now
}

