"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Clock, FileText } from "lucide-react"
import Link from "next/link"

export default function NewRequestPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to requests page after submission
    router.push("/webapp/pet-owner/requests")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild className="text-foreground dark:text-foreground">
          <Link href="/webapp/pet-owner/requests">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-foreground">New Request</h1>
          <p className="text-base text-muted-foreground dark:text-muted-foreground/90">
            Submit a new service request for your pet
          </p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground dark:text-foreground">
                <FileText className="h-5 w-5 text-primary" />
                Request Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-base">
                  Request Type
                </Label>
                <Select required>
                  <SelectTrigger id="type" className="text-base">
                    <SelectValue placeholder="Select request type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boarding">Pet Boarding</SelectItem>
                    <SelectItem value="grooming">Pet Grooming</SelectItem>
                    <SelectItem value="daycare">Day Care</SelectItem>
                    <SelectItem value="other">Other Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pet" className="text-base">
                  Select Pet
                </Label>
                <Select required>
                  <SelectTrigger id="pet" className="text-base">
                    <SelectValue placeholder="Choose your pet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="max">Max (Golden Retriever)</SelectItem>
                    <SelectItem value="bella">Bella (Persian Cat)</SelectItem>
                    <SelectItem value="rocky">Rocky (Beagle)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-base">
                    Start Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input type="date" id="startDate" required className="pl-10 text-base" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime" className="text-base">
                    Preferred Time
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input type="time" id="startTime" required className="pl-10 text-base" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base">
                  Additional Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requirements or concerns..."
                  className="min-h-[100px] text-base resize-none"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="button" variant="outline" className="flex-1 text-base" asChild>
              <Link href="/webapp/pet-owner/requests">Cancel</Link>
            </Button>
            <Button type="submit" className="flex-1 text-base" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

