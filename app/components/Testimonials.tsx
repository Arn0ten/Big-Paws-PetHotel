"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote, Star, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

const initialTestimonials = [
  {
    id: 1,
    name: "Arneabell Bautista",
    pet: "Max the Golden Retriever",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smilingsog.jpg-0uRYHAW64K5XChiJCiBqKPpa8huJpa.jpeg",
    quote: "The care and attention my Max receives at Big Paws is exceptional. The staff treats him like family!",
    rating: 5,
  },
  {
    id: 2,
    name: "Kenneth Tan",
    pet: "Luna the Persian Cat",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sleepingcat.jpg-XBZkH31jxxrEenX8zw783gMVMMOV8P.jpeg",
    quote: "Luna comes back happy and beautifully groomed every time. Best pet care service in Tagum City!",
    rating: 5,
  },
  {
    id: 3,
    name: "Jhon Andrie Canedo",
    pet: "Charlie the Spaniel",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/saddog.jpg-IzpczZnSuAJK5nWRM8a6SoInZq5rB0.jpeg",
    quote: "Professional service, clean facilities, and caring staff. Couldn't ask for better care for Charlie.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    pet: "",
    quote: "",
    rating: 5,
    image: "/placeholder.svg",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000) // Auto-rotate every 5 seconds

    return () => clearInterval(timer)
  }, [testimonials.length])

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const lastSubmission = localStorage.getItem("lastTestimonialSubmission")
    const currentDate = new Date().toDateString()

    if (lastSubmission === currentDate) {
      toast({
        title: "Submission Limit Reached",
        description: "You can only submit one testimonial per day. Please try again tomorrow.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newTestimonial = {
        id: testimonials.length + 1,
        ...formData,
      }
      setTestimonials([...testimonials, newTestimonial])
      setShowForm(false)
      setFormData({
        name: "",
        pet: "",
        quote: "",
        rating: 5,
        image: "/placeholder.svg",
      })

      localStorage.setItem("lastTestimonialSubmission", currentDate)

      toast({
        title: "Testimonial Submitted",
        description: "Thank you for sharing your experience!",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your testimonial. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-24 bg-secondary relative overflow-hidden" id="testimonials">
      {/* Background decorative elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-10 left-10 text-primary/10 text-[200px]">
          <Quote />
        </div>
        <div className="absolute bottom-10 right-10 text-primary/10 text-[200px] transform rotate-180">
          <Quote />
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground">Real experiences from our valued pet parents</p>
          <Button onClick={() => setShowForm(!showForm)} className="mt-4">
            {showForm ? "Close Form" : "Share Your Experience"}
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <form onSubmit={handleSubmit} className="bg-background rounded-xl p-6 space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pet">Pet's Name and Breed</Label>
                  <Input
                    id="pet"
                    value={formData.pet}
                    onChange={(e) => setFormData({ ...formData, pet: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="quote">Your Experience</Label>
                  <Textarea
                    id="quote"
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating })}
                        className={`p-1 ${formData.rating >= rating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="image">Your Picture (Optional)</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload size={16} />
                      Upload Image
                    </Button>
                    {formData.image !== "/placeholder.svg" && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={formData.image || "/placeholder.svg"}
                          alt="Uploaded image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Testimonial"}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-background rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <div className="relative h-64 w-full rounded-xl overflow-hidden">
                    <Image
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].pet}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
                  >
                    <Quote className="w-6 h-6" />
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>
                  <blockquote className="text-xl italic">{testimonials[currentIndex].quote}</blockquote>
                  <div className="border-l-4 border-primary pl-4 mt-4">
                    <p className="font-semibold">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[currentIndex].pet}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full hover:scale-110 transition-transform"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full hover:scale-110 transition-transform"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

