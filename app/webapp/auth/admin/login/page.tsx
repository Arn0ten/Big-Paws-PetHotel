"use client"

import type React from "react"

/**
 * Admin Login Page Component
 *
 * This component handles admin authentication by collecting and validating
 * login credentials, then sending them to the backend for verification.
 *
 * Features:
 * - Email/phone and password validation
 * - Remember me functionality
 * - Password visibility toggle
 * - Error handling and loading states
 * - Links to forgot password and other pages
 * - Enhanced security for admin access
 */

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, AlertCircle, Loader2, Shield } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import LoginSlideshow from "@/app/webapp/components/LoginSlideshow"
import { login } from "@/app/webapp/auth/services/authService"
import type { LoginFormData } from "@/app/webapp/auth/types"
import { validateContact } from "@/app/webapp/auth/utils/validation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Lock, AlertTriangle } from "lucide-react"

export default function AdminLoginPage() {
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

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null)

  const router = useRouter()

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)

    // Security check - verify if user has admin access rights
    const checkAdminAccess = async () => {
      try {
        // This would be replaced with an actual API call in production
        const hasAccess = await checkAdminAccessRights()
        if (!hasAccess) {
          // Log unauthorized access attempt
          console.warn("Unauthorized admin access attempt detected")
        }
      } catch (err) {
        console.error("Error checking admin access:", err)
      }
    }

    checkAdminAccess()
  }, [])

  // Mock function to check admin access rights - would be replaced with actual API call
  const checkAdminAccessRights = async (): Promise<boolean> => {
    // In a real implementation, this would check session/cookies/tokens
    return Promise.resolve(true)
  }

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
      // Call the authentication service with admin role flag
      const response = await login({
        ...formData,
        role: "admin", // Explicitly request admin authentication
      })

      if (response.success) {
        // BACKEND INTEGRATION POINT:
        // Store authentication token and user data
        // Example:
        // if (response.token) {
        //   localStorage.setItem('admin_token', response.token)
        //   sessionStorage.setItem('admin_user', JSON.stringify(response.user))
        // }

        // Redirect to admin dashboard
        router.push("/webapp/admin/dashboard")
      } else {
        setError(response.error || "Invalid admin credentials")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Admin login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Opens a dialog with the specified title and content
   *
   * @param title - The title of the dialog
   * @param content - The content to display in the dialog
   */
  const openDialog = (title: string, content: React.ReactNode) => {
    setDialogTitle(title)
    setDialogContent(content)
    setDialogOpen(true)
  }

  // Legal content for the Terms & Privacy dialog
  const legalContent = (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8 text-center">Terms & Privacy Policy</h1>
            <p className="text-center mb-8 text-muted-foreground">
              Last Updated: January 15, 2025 | Effective Date: February 1, 2025
            </p>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-8 border border-blue-200 dark:border-blue-800">
              <p className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <span>
                  This document is governed by the laws of the Republic of the Philippines, including but not limited to
                  the Data Privacy Act of 2012 (Republic Act No. 10173), the Consumer Act of the Philippines (Republic
                  Act No. 7394), and the E-Commerce Act (Republic Act No. 8792), as amended by subsequent legislation
                  through 2025.
                </span>
              </p>
            </div>

            <section className="mb-12 bg-card rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-2xl font-semibold m-0">Terms of Service</h2>
              </div>

              <h3 className="text-xl font-semibold mb-4">1. Service Agreement</h3>
              <p className="mb-4">
                By using Big Paws Pet Hotel services, you agree to comply with and be bound by the following terms and
                conditions. We reserve the right to modify these terms at any time, with changes taking effect upon
                posting to this site. Your continued use of our services constitutes acceptance of these terms.
              </p>

              <h3 className="text-xl font-semibold mb-4">2. Pet Care Services</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  All pets must be up-to-date with vaccinations as required by the Philippine Veterinary Medical
                  Association and the Bureau of Animal Industry
                </li>
                <li>
                  Owners must disclose any known health conditions, with liability for non-disclosure as stipulated
                  under Philippine Civil Code Article 1170
                </li>
                <li>
                  We reserve the right to refuse service to aggressive pets in accordance with the Animal Welfare Act of
                  the Philippines (Republic Act No. 8485 as amended by RA 10631)
                </li>
                <li>
                  24-hour notice is required for cancellations, with applicable fees as detailed in our service contract
                </li>
                <li>
                  Emergency veterinary care may be sought at our discretion, with costs billed to the pet owner as
                  permitted by Philippine law
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">3. Payment Terms</h3>
              <p className="mb-4">
                Payment is required at the time of service. We accept cash, credit cards, and digital payments including
                GCash, Maya, and other Philippine electronic payment systems. All prices are in Philippine Pesos (PHP)
                and include applicable Value Added Tax (VAT) as required by the National Internal Revenue Code, as
                amended by the CREATE Act of 2021 and subsequent tax regulations through 2025.
              </p>

              <h3 className="text-xl font-semibold mb-4">4. Limitation of Liability</h3>
              <p className="mb-4">
                In accordance with Philippine Civil Code Articles 1170-1174, our liability is limited to cases of
                willful misconduct or gross negligence. We are not liable for force majeure events including but not
                limited to natural disasters, as recognized under Philippine jurisprudence and the Civil Code.
              </p>
            </section>

            <section className="mb-12 bg-card rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Lock className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-2xl font-semibold m-0">Privacy Policy</h2>
              </div>

              <p className="mb-4">
                This Privacy Policy complies with the Data Privacy Act of 2012 (Republic Act No. 10173) and its
                Implementing Rules and Regulations, as well as all applicable National Privacy Commission (NPC)
                Circulars and Guidelines through 2025.
              </p>

              <h3 className="text-xl font-semibold mb-4">1. Information Collection</h3>
              <p className="mb-4">We collect information necessary to provide pet care services, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Owner contact information (name, address, phone number, email)</li>
                <li>Pet health records and medical history</li>
                <li>Emergency contact details</li>
                <li>Service preferences and special instructions</li>
                <li>
                  Payment information processed in compliance with Bangko Sentral ng Pilipinas (BSP) Circular No. 1048
                  and subsequent regulations
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">2. Information Usage</h3>
              <p className="mb-4">
                Your information is used solely for providing pet care services and will never be sold to third parties.
                As the data controller and processor under the Data Privacy Act, we may use your contact information to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Confirm appointments and service bookings</li>
                <li>Send service reminders and follow-ups</li>
                <li>Share important updates about your pet's care</li>
                <li>Provide emergency notifications</li>
                <li>Process payments and generate receipts</li>
                <li>Comply with legal requirements and government regulations</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">3. Data Security</h3>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information and maintain
                confidentiality in accordance with NPC Circular No. 16-01 on Security of Personal Data in Government
                Processing and subsequent security guidelines. These measures include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments and updates</li>
                <li>Staff training on data protection</li>
                <li>Access controls and authentication procedures</li>
                <li>Data breach notification protocols as required by NPC Circular No. 16-03</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">4. Data Subject Rights</h3>
              <p className="mb-4">
                Under the Data Privacy Act of 2012, you have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Right to be informed</li>
                <li>Right to access</li>
                <li>Right to object</li>
                <li>Right to erasure or blocking</li>
                <li>Right to damages</li>
                <li>Right to file a complaint</li>
                <li>Right to rectify inaccuracies</li>
                <li>Right to data portability</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact our Data Protection Officer using the contact information
                below.
              </p>

              <h3 className="text-xl font-semibold mb-4">5. Cookies and Tracking</h3>
              <p className="mb-4">
                Our website uses cookies and similar technologies to enhance user experience and collect usage data. You
                may manage cookie preferences through your browser settings. Our cookie usage complies with the NPC's
                guidelines on online privacy and the E-Commerce Act.
              </p>

              <h3 className="text-xl font-semibold mb-4">6. Third-Party Services</h3>
              <p className="mb-4">
                We may use third-party services for payment processing, email communication, and other business
                functions. These service providers are required to maintain the confidentiality of your information and
                comply with Philippine data protection laws.
              </p>
            </section>

            <section className="bg-card rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-2xl font-semibold m-0">Contact Information</h2>
              </div>
              <p className="mb-4">
                If you have any questions about our Terms of Service or Privacy Policy, please contact us:
              </p>
              <ul className="list-none pl-6 mb-4">
                <li className="mb-2">📞 Phone: +63 950 189 0933</li>
                <li className="mb-2">📧 Email: galojanlloyn18@gmail.com</li>
                <li className="mb-2">📍 Address: Bonifacio St., Tagum City, Davao del Norte, Philippines 8100</li>
              </ul>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Data Protection Officer:</strong> Lloyn Galojan
                  <br />
                  <strong>Email:</strong> dpo@bigpawspethotel.ph
                  <br />
                  <strong>Phone:</strong> +63 950 189 0933
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  For complaints not resolved by our DPO, you may contact the National Privacy Commission:
                  <br />
                  5th Floor, Delegation Building, PICC Complex, Roxas Boulevard, Pasay City, Metro Manila
                  <br />
                  Email: info@privacy.gov.ph
                </p>
                <p className="text-sm text-muted-foreground mt-4">© 2025 Big Paws Pet Hotel. All rights reserved.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )

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
            <div className="flex justify-center mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Admin Login</h2>
            <p className="text-muted-foreground">Access the administrative dashboard</p>
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
                <Link href="/webapp/auth/admin/forgot-password" className="text-sm text-primary hover:underline">
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
              <Link href="/webapp/auth/admin/change-password" className="text-sm text-primary hover:underline">
                Change Password
              </Link>
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-center text-sm text-foreground">
                <Shield className="inline-block h-4 w-4 mr-1 text-primary" />
                This is a secure administrative area. Unauthorized access attempts are logged and monitored.
              </p>
            </div>

            {/* Terms and Privacy */}
            <div className="text-center text-xs text-muted-foreground mt-6">
              <p>
                By logging in, you agree to our{" "}
                <button
                  onClick={() => openDialog("Terms & Privacy Policy", legalContent)}
                  className="text-primary hover:underline"
                  type="button"
                >
                  Terms of Service
                </button>
                {"  "}and{" "}
                <button
                  onClick={() => openDialog("Terms & Privacy Policy", legalContent)}
                  className="text-primary hover:underline"
                  type="button"
                >
                  Privacy Policy
                </button>
                .
              </p>
            </div>
          </form>

          <div className="mt-8 text-center space-y-4">
            <Button variant="outline" asChild>
              <Link href="/">Back to Welcome</Link>
            </Button>

            <Button variant="default" asChild className="ml-4">
              <Link href="/webapp/auth/pet-owner/login">Pet Owner Login</Link>
            </Button>
          </div>

          {/* Terms & Privacy Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{dialogTitle}</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh]">
                <div className="p-4">{dialogContent}</div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </div>
  )
}
