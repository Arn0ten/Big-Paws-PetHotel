"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import RequestForm from "../components/request-form"
import SuccessDialog from "@/app/webapp/components/success-dialog"
import { createRequest } from "@/app/webapp/data/sample-data"
import { useToast } from "@/hooks/use-toast"

/**
 * NewRequestPage Component
 *
 * This page allows pet owners to create new service requests.
 *
 * API Integration Points:
 * 1. Form submission - POST /api/requests
 * 2. Pet data fetching - GET /api/pets?boarding=true
 *
 * @returns {JSX.Element} The new request page component
 */
export default function NewRequestPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successData, setSuccessData] = useState({
    title: "",
    message: "",
  })
  const { toast } = useToast()

  /**
   * Handle form submission
   *
   * @param {any} data - The form data
   *
   * API Integration:
   * - Replace with a fetch call to POST /api/requests
   * - Handle success/error responses appropriately
   * - Update UI based on response
   */
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)

    try {
      // In a real implementation, this would be an API call
      // const response = await fetch('/api/requests', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      //
      // if (!response.ok) throw new Error('Failed to create request');
      // const result = await response.json();

      // For now, we use the sample data helper
      const result = createRequest(data)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success dialog
      setSuccessData({
        title: "Request Submitted Successfully",
        message: `Your ${data.type.replace("-", " ")} request has been submitted and will be processed shortly.`,
      })
      setShowSuccess(true)
    } catch (error) {
      console.error("Error submitting request:", error)

      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
      setIsSubmitting(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    router.push("/webapp/pet-owner/requests")
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="text-foreground dark:text-foreground hover:bg-foreground/5 dark:hover:bg-foreground/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-foreground">New Request</h1>
        <p className="text-muted-foreground dark:text-muted-foreground/90">Create a new service request for your pet</p>
      </motion.div>

      <RequestForm onSubmit={handleSubmit} onCancel={() => router.back()} isSubmitting={isSubmitting} />

      <SuccessDialog
        title={successData.title}
        message={successData.message}
        isOpen={showSuccess}
        onClose={handleSuccessClose}
      />
    </div>
  )
}

