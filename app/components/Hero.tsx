"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AnimatedBackground from "./AnimatedBackground"
import FlipCards from "./FlipCards"
import { Shield, Heart, Clock, Award, Star } from "lucide-react"

const services = ["Pet Hotel", "Pet Grooming", "Pet Supplies", "Home Service"]

const stats = [
  { icon: Shield, label: "Years Experience", value: "5+" },
  { icon: Heart, label: "Happy Pets", value: "1000+" },
  { icon: Clock, label: "Hours Care", value: "24/7" },
  { icon: Star, label: "Rating", value: "4.8" },
]

export default function Hero() {
  const [currentService, setCurrentService] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentService((prev) => (prev + 1) % services.length)
        setIsVisible(true)
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>, tab: string) => {
    e.preventDefault()
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        const tabTrigger = document.querySelector(`[data-state="inactive"][value="${tab}"]`) as HTMLButtonElement
        if (tabTrigger) {
          tabTrigger.click()
        }
      }, 100)
    }
  }

  return (
    <div className="bg-background py-20 md:py-32 overflow-hidden relative">
      <AnimatedBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div className="mb-4 inline-block">
              <Badge variant="outline" className="text-primary border-primary">
                <Award className="w-4 h-4 mr-2" />
                Reliable Pet Care Provider
              </Badge>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <motion.span
                className="text-primary block mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Quality Pet Care
              </motion.span>
              <motion.span
                className="text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Your Local Choice for
              </motion.span>
              <motion.div
                className="text-3xl md:text-4xl lg:text-5xl text-primary mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <AnimatePresence mode="wait">
                  {isVisible && (
                    <motion.span
                      key={currentService}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block"
                    >
                      {services[currentService]}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </h1>

            <motion.p
              className="mt-6 text-xl text-muted-foreground max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              We offer reliable pet care services including comfortable hotel stays, professional grooming, quality
              supplies, and convenient home services. Our dedicated team is committed to providing attentive care for
              your pets.
            </motion.p>

            <motion.div
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="text-center p-4 rounded-lg bg-primary/5"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="#contact" onClick={(e) => scrollToContact(e, "contact")}>
                  Contact Us
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="#contact" onClick={(e) => scrollToContact(e, "book-service")}>
                  Book Home Service
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden bg-primary/5"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png"
              alt="Big Paws Pet Hotel and Grooming Logo"
              fill
              className="object-contain rounded-2xl p-12"
              priority
              quality={100}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Pet Care Services</h2>
          <FlipCards />
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/5 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
    </div>
  )
}

