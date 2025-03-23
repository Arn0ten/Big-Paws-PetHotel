"use client"

import type React from "react"

/**
 * Login Page Component
 *
 * This component handles user authentication by collecting and validating
 * login credentials, then sending them to the backend for verification.
 *
 * Features:
 * - Email/phone and password validation
 * - Remember me functionality
 * - Password visibility toggle
 * - Error handling and loading states
 * - Links to forgot password and other pages
 */

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import LoginSlideshow from "@/app/webapp/components/LoginSlideshow"
import { login } from "../services/authService"
import type { LoginFormData } from "../types"
import { validateContact } from "../utils/validation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  // State management
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
    rememberMe: false,
  })

  const router = useRouter()

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * Handle input field changes
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  /**
   * Handle checkbox state changes
   *
   * @param {boolean} checked - New checkbox state
   */
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  /**
   * Validate form inputs before submission
   *
   * @returns {boolean} - Whether the form is valid
   */
  const validateForm = (): boolean => {
    // Validate username (email or phone)
    const contactValidation = validateContact(formData.username)
    if (!contactValidation.isValid) {
      setError(contactValidation.error || "Invalid email or phone number")
      return false
    }

    // Validate password
    if (!formData.password) {
      setError("Password is required")
      return false
    }

    return true
  }

  /**
   * Handle form submission
   *
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError(null)

    try {
      // Call the authentication service
      const response = await login(formData)

      if (response.success) {
        // BACKEND INTEGRATION POINT:
        // Store authentication token and user data
        // Example:
        // if (response.token) {
        //   localStorage.setItem('token', response.token)
        //   sessionStorage.setItem('user', JSON.stringify(response.user))
        // }

        // Redirect based on user role
        if (response.user?.role === "admin") {
          router.push("/webapp/admin/dashboard")
        } else {
          router.push("/webapp/pet-owner/requests")
        }
      } else {
        setError(response.error || "Invalid credentials")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Don't render anything until client-side hydration is complete
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Image Slideshow */}
      <div className="w-full md:w-1/2 relative h-64 md:h-screen overflow-hidden">
        <LoginSlideshow />
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 bg-background flex items-center justify-center p-4 sm:p-6 md:p-10 relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Login</h2>
            <p className="text-muted-foreground">Access your pet management account</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">
                Email or Phone Number
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your email or phone number"
                value={formData.username}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`bg-background ${error && !formData.username ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <Link href="/webapp/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`bg-background pr-10 ${error && !formData.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={handleCheckboxChange}
                disabled={isLoading}
              />
              <label
                htmlFor="rememberMe"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            {/* Change Password Link */}
            <div className="text-center">
              <Link href="/webapp/auth/change-password" className="text-sm text-primary hover:underline">
                Change Password
              </Link>
            </div>

            {/* Registration Info */}
            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-center text-sm text-foreground">
                If you don't have an account, please visit Big Paws Pet Hotel for your credentials.
              </p>
            </div>

            {/* Terms and Privacy */}
            <div className="text-center text-xs text-muted-foreground mt-6">
              <p>
                By logging in, you agree to our{" "}
                <Link href="/terms-privacy" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/terms-privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </form>

          <div className="mt-8 text-center space-y-4">
            <Button variant="outline" asChild>
              <Link href="/webapp">Back to Welcome</Link>
            </Button>

            <Button variant="default" asChild className="ml-4">
              <Link href="/webapp/admin/dashboard">Admin Login</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

