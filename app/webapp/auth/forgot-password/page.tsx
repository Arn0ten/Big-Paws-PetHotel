"use client"

import type React from "react"

/**
 * Forgot Password Page Component
 *
 * This component allows users to request a password reset by providing
 * their email address or phone number. It handles validation and submission
 * to the backend API.
 *
 * Features:
 * - Email/phone validation
 * - Success state with animated confirmation
 * - Error handling and loading states
 */

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Smartphone, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AuthLayout } from "../components/AuthLayout"
import { requestPasswordReset } from "../services/authService"
import { validateContact } from "../utils/validation"
import type { PasswordResetRequestFormData } from "../types"

export default function ForgotPasswordPage() {
  // State management
  const [contact, setContact] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      // Call the password reset request service
      const formData: PasswordResetRequestFormData = { contact }
      const response = await requestPasswordReset(formData)

      if (response.success) {
        setIsSubmitted(true)
      } else {
        setError(response.error || "Failed to send reset instructions")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Password reset request error:", err)
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
                <h1 className="text-2xl font-bold text-foreground">Forgot Password</h1>
                <p className="text-muted-foreground mt-2">
                  Enter your email address or phone number to receive password reset instructions
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
                    "Send Reset Instructions"
                  )}
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
                <p className="text-lg break-words text-sm sm:text-lg">
                  Password reset instructions have been sent. Please check your{" "}
                  {contact.includes("@") ? "email" : "SMS"} at:
                </p>
                <p className="font-bold mt-2 text-base sm:text-lg break-all bg-white/20 dark:bg-black/20 p-2 rounded-md">
                  {contact}
                </p>
              </div>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                Try Another Email or Phone
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 text-center">
          <Link href="/webapp/auth/login" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft size={16} className="mr-1" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  )
}

