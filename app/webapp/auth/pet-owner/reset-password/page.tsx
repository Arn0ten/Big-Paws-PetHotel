"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
// Updated imports to use pet-owner specific files
import AuthLayout from "../components/AuthLayout"
import { resetPassword } from "../services/authService"
import { usePasswordValidation } from "../hooks/usePasswordValidation"
import PasswordStrengthMeter from "../components/PasswordStrengthMeter"
import type { PasswordResetFormData } from "../types"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [contact, setContact] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  const { passwordStrength, passwordErrors, validatePassword } = usePasswordValidation()

  useEffect(() => {
    // Get token and contact from URL parameters
    const tokenParam = searchParams.get("token")
    const contactParam = searchParams.get("contact")

    if (tokenParam) setToken(tokenParam)
    if (contactParam) setContact(contactParam)

    // Redirect if token or contact is missing
    if (!tokenParam || !contactParam) {
      setError("Invalid or missing reset parameters. Please request a new password reset link.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate passwords
    if (!validatePassword(password)) {
      setError("Please fix the password issues before continuing.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (!token || !contact) {
      setError("Invalid reset parameters. Please request a new password reset link.")
      return
    }

    setIsLoading(true)

    try {
      const formData: PasswordResetFormData = {
        token,
        contact,
        password,
      }

      const response = await resetPassword(formData)

      if (response.success) {
        setIsSuccess(true)
      } else {
        setError(response.error || "Failed to reset password. Please try again.")
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            {isSuccess ? "Password reset successful!" : "Create a new password for your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!token || !contact ? (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Invalid or expired reset link. Please request a new password reset.
              </p>
              <Button asChild className="mt-2">
                <Link href="/webapp/auth/pet-owner/forgot-password">Request New Reset Link</Link>
              </Button>
            </div>
          ) : isSuccess ? (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Your password has been successfully reset. You can now log in with your new password.
              </p>
              <Button asChild className="mt-2">
                <Link href="/webapp/auth/pet-owner/login">Go to Login</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <PasswordStrengthMeter password={password} strength={passwordStrength} errors={passwordErrors} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-sm text-red-500">Passwords do not match</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button variant="outline" asChild className="w-full">
            <Link href="/webapp/auth/pet-owner/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
