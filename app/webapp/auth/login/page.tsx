"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })

  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Email or phone number is required")
      return false
    }
    if (!formData.password) {
      setError("Password is required")
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError(null)

    // BACKEND INTEGRATION POINT:
    // Replace the setTimeout with actual API call to your backend
    // Example:
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     username: formData.username,
    //     password: formData.password,
    //     rememberMe: formData.rememberMe
    //   })
    // });
    //
    // if (response.ok) {
    //   const data = await response.json();
    //   // Store auth token if needed
    //   // localStorage.setItem('token', data.token);
    //   router.push("/webapp/pet-owner/dashboard");
    // } else {
    //   const data = await response.json();
    //   setError(data.message || 'Invalid credentials');
    // }

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, redirect to pet owner interface
      // In a real app, you would check user role and redirect accordingly
      router.push("/webapp/pet-owner/requests") // Changed from dashboard to requests
      setIsLoading(false)
    }, 1500)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Image */}
      <div className="w-full md:w-1/2 relative h-64 md:h-screen bg-[#2e3357] dark:bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png"
              alt="Big Paws Pet Hotel Logo"
              width={120}
              height={120}
              className="mx-auto mb-4"
            />
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Big Paws Pet Hotel</h1>
            <p className="text-white/80 mt-2 max-w-md mx-auto px-4 text-sm sm:text-base">
              Your pet's home away from home. Login to manage your pet's stay and services.
            </p>
          </motion.div>
        </div>
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

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="text-center">
              <Link href="/webapp/auth/change-password" className="text-sm text-primary hover:underline">
                Change Password
              </Link>
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-center text-sm text-foreground">
                If you don't have an account, please visit Big Paws Pet Hotel for your credentials.
              </p>
            </div>

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

