/**
 * Authentication Types
 *
 * This file contains all the type definitions used across the authentication components.
 * Centralizing types helps maintain consistency and makes it easier to update them.
 */

// Common form state types
export interface LoginFormData {
  username: string
  password: string
  rememberMe: boolean
}

export interface PasswordResetRequestFormData {
  contact: string
}

export interface PasswordResetFormData {
  contact: string
  password: string
  confirmPassword: string
}

// Password criteria validation type
export interface PasswordCriteria {
  length: boolean
  uppercase: boolean
  lowercase: boolean
  number: boolean
  symbol: boolean
  match: boolean
}

// API response types
export interface AuthResponse {
  success: boolean
  message?: string
  token?: string
  user?: UserData
  error?: string
}

export interface UserData {
  id: string
  name: string
  email: string
  phone?: string
  role: "pet-owner" | "admin" | "staff"
  profileImage?: string
}

// Navigation origin for change password
export type ChangePasswordOrigin = "pet-owner" | "admin" | "login"

