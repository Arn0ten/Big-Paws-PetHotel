"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { login as authLogin, logout as authLogout, getCurrentUser, updateUserProfile } from "../utils/auth-utils"

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
        console.error("Auth check error:", err)
        setError("Failed to authenticate")
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
      const user = await authLogin(email, password)
      setUser(user)
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Failed to login")
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
      console.error("Logout error:", err)
      setError(err.message || "Failed to logout")
    } finally {
      setIsLoading(false)
    }
  }

  // Update user function
  const updateUser = async (userData: Partial<User>) => {
    setIsLoading(true)
    try {
      // BACKEND INTEGRATION POINT:
      // This should call your API to update the user profile
      // Example API call:
      // const updatedUser = await fetch('/api/users/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      //   },
      //   body: JSON.stringify(userData)
      // }).then(res => res.json());

      // Mock implementation
      const updatedUser = await updateUserProfile(userData)
      setUser((prev) => (prev ? { ...prev, ...updatedUser } : updatedUser))
    } catch (err: any) {
      console.error("Update user error:", err)
      setError(err.message || "Failed to update user")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
