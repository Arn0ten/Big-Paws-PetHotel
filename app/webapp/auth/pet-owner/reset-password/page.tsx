"use client"

import type React from "react"

/**
 * Pet Owner Reset Password Page Component
 *
 * This component allows pet owners to set a new password after receiving a reset link.
 * It handles password validation, strength checking, and submission to the backend API.
 *
 * Features:
 * - Password strength meter
 * - Password validation with visual feedback
 * - Success modal with animation
 * - Error handling and loading states
 */

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, AlertCircle, Loader2, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AuthLayout } from "@/app/webapp/auth/components/AuthLayout"
import { PasswordStrengthMeter } from "@/app/webapp/auth/components/PasswordStrengthMeter"
import { usePasswordValidation } from "@/app/webapp/auth/hooks/usePasswordValidation"
import { resetPassword } from "@/app/webapp/auth/services/authService"
import { validateContact, validatePassword, validatePasswordConfirmation } from "@/app/webapp/auth/utils/validation"
import type { PasswordResetFormData } from "@/app/webapp/auth/types"

export default function PetOwnerResetPasswordPage() {
  // State management
  const [formData, setFormData] = useState<PasswordResetFormData>({
    contact: "",
    password: "",
    confirmPassword: "",
    role: "pet-owner", // Explicitly set pet-owner role
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Use the password validation hook
  const { passwordStrength, passwordCriteria } = usePasswordValidation({
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  })

  /**
   * Handle input field changes
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  /**
   * Validate form inputs before submission
   *
   * @returns {boolean} - Whether the form is valid
   */
  const validateForm = (): boolean => {
    // Validate contact (email or phone)
    const contactValidation = validateContact(formData.contact)
    if (!contactValidation.isValid) {
      setError(contactValidation.error || "Invalid contact information")
      return false
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      setError(passwordValidation.error || "Invalid password")
      return false
    }

    // Validate password confirmation
    const confirmValidation = validatePasswordConfirmation(formData.password, formData.confirmPassword)
    if (!confirmValidation.isValid) {
      setError(confirmValidation.error || "Passwords do not match")
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
      // Call the reset password service with pet-owner role
      const response = await resetPassword(formData)

      if (response.success) {
        setShowSuccessModal(true)
      } else {
        setError(response.error || "Failed to reset password")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Password reset error:", err)
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
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
          <p className="text-muted-foreground mt-2">Enter your email/phone and create a new strong password</p>
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
              name="contact"
              type="text"
              placeholder="Enter your email or phone number"
              value={formData.contact}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`bg-background ${error && !formData.contact ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              New Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your new password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`bg-background ${error && !formData.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`bg-background ${
                error && (!formData.confirmPassword || formData.password !== formData.confirmPassword)
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
            />
          </div>

          {/* Password Strength Meter */}
          <PasswordStrengthMeter passwordStrength={passwordStrength} passwordCriteria={passwordCriteria} />

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/webapp/auth/pet-owner/login" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft size={16} className="mr-1" /> Back to Login
          </Link>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-card rounded-xl shadow-xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 10 }}
                className="mx-auto rounded-full bg-green-100 dark:bg-green-900/30 p-3 w-20 h-20 flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </motion.div>

              <h2 className="text-2xl font-bold mb-4">Password Updated!</h2>
              <p className="text-muted-foreground mb-6">
                Your password has been successfully updated. You can now log in with your new password.
              </p>

              <Button
                onClick={() => {
                  setShowSuccessModal(false)
                  // Redirect to login page after a short delay
                  setTimeout(() => {
                    window.location.href = "/webapp/auth/pet-owner/login"
                  }, 300)
                }}
                className="w-full"
              >
                Go to Login
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}
