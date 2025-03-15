"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("contact")
  const { toast } = useToast()

  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    message: "",
    address: "",
    petInfo: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    additionalNotes: "",
  }

  const [formData, setFormData] = useState(initialFormState)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "a.bautista.129340.tc@umindanao.edu.ph",
          subject: activeTab === "contact" ? "New Customer Inquiry" : "New Home Service Booking",
          formData,
          formType: activeTab,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        toast({
          title: "Form Submitted",
          description:
            activeTab === "contact"
              ? "Thank you for your message! We'll get back to you soon."
              : "Thank you for booking our home service! We'll confirm your appointment shortly.",
          variant: "default",
        })
        setFormData(initialFormState)
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  return (
    <div className="bg-background py-16 sm:py-24" id="contact">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">Get in Touch</h2>
          <p className="mt-4 text-lg text-muted-foreground">We're here to help with all your pet care needs</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="book-service">Book Home Service</TabsTrigger>
            </TabsList>
            <TabsContent value="contact">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="you@example.com"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Your phone number"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="How can we help you?"
                    className="w-full min-h-[100px]"
                  />
                </div>

                <div className="flex justify-center">
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto min-w-[200px]">
                    {isSubmitting ? (
                      <>
                        Sending...
                        <span className="ml-2 inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="book-service">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="you@example.com"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Your phone number"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full address"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="petInfo">Pet Information</Label>
                  <Textarea
                    id="petInfo"
                    name="petInfo"
                    value={formData.petInfo}
                    onChange={handleInputChange}
                    required
                    placeholder="Type, breed, age, and any special needs of your pet"
                    className="w-full min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select
                    name="serviceType"
                    value={formData.serviceType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, serviceType: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic-wash">Basic Wash</SelectItem>
                      <SelectItem value="premium-wash">Premium Wash</SelectItem>
                      <SelectItem value="premium-wash-and-cut">Premium Wash & Cut</SelectItem>
                      <SelectItem value="full-grooming">Full Grooming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <Input
                    id="preferredTime"
                    name="preferredTime"
                    type="time"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    placeholder="Any additional information or requests"
                    className="w-full min-h-[100px]"
                  />
                </div>

                <div className="flex justify-center">
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto min-w-[200px]">
                    {isSubmitting ? (
                      <>
                        Booking...
                        <span className="ml-2 inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                      </>
                    ) : (
                      "Book Home Service"
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>

          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center text-green-600 dark:text-green-400 mt-4"
              >
                {activeTab === "contact"
                  ? "Thank you for your message! We'll get back to you soon."
                  : "Thank you for booking our home service! We'll confirm your appointment shortly."}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

