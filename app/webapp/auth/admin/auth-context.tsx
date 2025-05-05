"use client"

import type React from "react"
import { createContext, useState, useEffect } from "react"
import { login as authLogin } from "./services/authService"

// Define the User type
type User = {
  id?: string
  name?: string
  email?: string
  role?: string
  avatar?: string
}

// Define the AuthContext type
type AuthContextType = {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper functions for admin auth
const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  try {
    const userJson = localStorage.getItem("admin_user")
    return userJson ? JSON.parse(userJson) : null
  } catch (error) {
    console.error("Error getting current admin user:", error)
    return null
  }
}

const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  if (typeof window === "undefined") return {} as User

  try {
    const currentUserJson = localStorage.getItem("admin_user")
    const currentUser = currentUserJson ? JSON.parse(currentUserJson) : {}
    const updatedUser = { ...currentUser, ...userData }
    localStorage.setItem("admin_user", JSON.stringify(updatedUser))
    return updatedUser
  } catch (error) {
    console.error("Error updating admin user profile:", error)
    throw new Error("Failed to update admin user profile")
  }
}

const authLogout = async (): Promise<void> => {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem("admin_user")
    localStorage.removeItem("admin_token")
  } catch (error) {
    console.error("Error during admin logout:", error)
    throw new Error("Failed to logout admin")
  }
}

// AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        console.error("Admin auth check error:", err)
        setError("Failed to authenticate admin")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authLogin({ username: email, password, rememberMe: true, role: "admin" })
      
      if (response.success && response.user && response.token) {
        // Store user and token in localStorage
        localStorage.setItem("admin_user", JSON.stringify(response.user))
        localStorage.setItem("admin_token", response.token)
        setUser(response.user)
      } else {
        throw new Error(response.error || "Failed to login as admin")
      }
    } catch (err: any) {
      console.error("Admin login error:", err)
      setError(err.message || "Failed to login as admin")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setIsLoading(true)
    try {
      await authLogout()
      setUser(null)
    } catch (err: any) {
      console.error("Admin logout error:", err)
      setError(err.message || "Failed to logout admin")
    } finally {
      setIsLoading(false)
    }
  }

  // Update user function
  const updateUser = async (userData: Partial<User>) => {
    setIsLoading(true)
    try {
      const updatedUser = await updateUserProfile(userData)
      setUser((prev) => (prev ? { ...prev, ...updatedUser } : updatedUser))
    } catch (err: any) {
      console.error("Update admin user error:", err)\
      setError(err.message || "Failed to update
