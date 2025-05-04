"use client"

import type React from "react"

/**
 * Pet Owner Change Password Page Component
 *
 * This component allows pet owners to request a password change by providing
 * their email address or phone number. It handles validation, submission
 * to the backend API, and dynamic navigation based on the user's origin.
 *
 * Features:
 * - Email/phone validation
 * - Dynamic back button based on origin
 * - Success state with animated confirmation
 * - Error handling and loading states
 */

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Smartphone, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { AuthLayout } from "@/app/webapp/auth/components/AuthLayout"
import { changePassword } from "@/app/webapp/auth/services/authService"
import { validateContact } from "@/app/webapp/auth/utils/validation"
import type { PasswordResetRequestFormData, ChangePasswordOrigin } from "@/app/webapp/auth/types"

export default function PetOwnerChangePasswordPage() {
  const router = useRouter()

  // State management
  const [origin, setOrigin] = useState<ChangePasswordOrigin>("login")
  const [contact, setContact] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Detect where the user came from
  useEffect(() => {
    // Check for origin in query parameters
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search)
      const fromParam = searchParams.get("from")

      if (fromParam === "pet-owner") {
        setOrigin("pet-owner")
      } else {
        // Try to detect referrer
        const referrer = document.referrer
        if (referrer && referrer.includes("/webapp/pet-owner")) {
          setOrigin("pet-owner")
        } else {
          setOrigin("login")
        }
      }
    }
  }, [])

  /**
   * Handle back button click based on origin
   */
  const handleBack = () => {
    switch (origin) {
      case "pet-owner":
        router.push("/webapp/pet-owner/profile")
        break
      default:
        router.push("/webapp/auth/pet-owner/login")
    }
  }

  /**
   * Validate form inputs before submission
   *
   * @returns {boolean} - Whether the form is valid
   */
  const validateForm = (): boolean => {
    const validation = validateContact(contact)
    if (!validation.isValid) {
      setError(validation.error || "Invalid contact information")
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
      // Call the change password service with pet-owner role flag
      const formData: PasswordResetRequestFormData = {
        contact,
        role: "pet-owner", // Explicitly request pet-owner password change
      }
      const response = await changePassword(formData)

      if (response.success) {
        setIsSubmitted(true)
      } else {
        setError(response.error || "Failed to send change password instructions")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Change password request error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-card rounded-xl shadow-lg p-4 sm:p-8"
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-foreground">Change Password</h1>
                <p className="text-muted-foreground mt-2">
                  Enter your email address or phone number to receive password change instructions
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Field */}
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-foreground">
                    Email Address or Phone Number
                  </Label>
                  <Input
                    id="contact"
                    type="text"
                    placeholder="Enter your email or phone number"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value)
                      if (error) setError(null)
                    }}
                    disabled={isLoading}
                    className={`bg-background ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>

                {/* Back Button */}
                <Button type="button" variant="outline" className="w-full mt-3" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {origin === "pet-owner" ? "Back to Profile" : "Back to Login"}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-4"
            >
              {/* Success Message with Animation */}
              <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-6 rounded-lg mb-6">
                {contact.includes("@") ? (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex justify-center mb-4"
                  >
                    <motion.div
                      animate={{
                        rotate: [-5, 5, -5, 5, -5, 5, -5, 0],
                        x: [-2, 2, -2, 2, -2, 2, -2, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2,
                      }}
                    >
                      <Mail className="w-16 h-16 text-green-500" />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex justify-center mb-4"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, -3, 0, 3, 0],
                        scale: [1, 1.05, 1, 1.05, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 0.5,
                      }}
                    >
                      <Smartphone className="w-16 h-16 text-green-500" />
                    </motion.div>
                  </motion.div>
                )}
                <p className="text-base sm:text-lg break-words">
                  Password change instructions have been sent. Please check your{" "}
                  {contact.includes("@") ? "email" : "SMS"} at:
                </p>
                <p className="font-bold mt-2 text-base sm:text-lg break-all bg-white/20 dark:bg-black/20 p-2 rounded-md">
                  {contact}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleBack} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {origin === "pet-owner" ? "Back to Profile" : "Back to Login"}
                </Button>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  Try Another Email or Phone
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>
            For testing purposes:{" "}
            <Link href="/webapp/auth/pet-owner/reset-password" className="text-primary hover:underline">
              Go directly to reset password page
            </Link>
          </p>
        </div>
      </motion.div>
    </AuthLayout>
  )
}
