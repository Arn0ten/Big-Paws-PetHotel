/**
 * PENDING REGISTRATION TYPES
 *
 * This file contains type definitions for the pending registration module.
 * These types are used across components to ensure type safety.
 */

export interface PendingRegistration {
  id: string
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  fullAddress?: string // Pre-concatenated address from backend
  registrationDate: string
  status: "pending" | "approved" | "rejected"
  notes?: string
}
