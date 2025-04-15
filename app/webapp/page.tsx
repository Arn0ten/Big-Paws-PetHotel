"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PawPrint, Loader2, ChevronRight, Info, Calendar, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Shield, FileText, Lock, AlertTriangle, HelpCircle, Mail, Phone } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const router = useRouter()
  const controls = useAnimation()
  const headerRef = useRef<HTMLDivElement>(null)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null)

  const openDialog = (title: string, content: React.ReactNode) => {
    setDialogTitle(title)
    setDialogContent(content)
    setDialogOpen(true)
  }

  // Features for the rotating highlight
  const features = [
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Boarding Reservations",
      description: "Schedule stays for your pets with ease",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Service Requests",
      description: "Request grooming, training, and more",
    },
    {
      icon: <Info className="h-5 w-5" />,
      title: "Pet Updates",
      description: "Receive photos and updates during your pet's stay",
    },
  ]

  useEffect(() => {
    setMounted(true)

    // Animate the header on scroll
    const handleScroll = () => {
      if (window.scrollY > 10) {
        headerRef.current?.classList.add("shadow-md", "bg-background/95", "backdrop-blur-sm")
        headerRef.current?.classList.remove("bg-transparent")
      } else {
        headerRef.current?.classList.remove("shadow-md", "bg-background/95", "backdrop-blur-sm")
        headerRef.current?.classList.add("bg-transparent")
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Rotate through features
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(featureInterval)
    }
  }, [features.length])

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

  const supportContent = (
    <div className="flex flex-col min-h-[50vh]">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-12 bg-card rounded-lg p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <HelpCircle className="h-6 w-6 mr-2 text-primary" />
            <h2 className="text-2xl font-semibold m-0">Help & Support</h2>
          </div>

          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-4">
            Our customer support team is available 24/7 to assist you with any questions or concerns.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <Mail className="h-5 w-5 mr-2 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-muted-foreground">support@bigpawspethotel.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-2 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Phone</h4>
                <p className="text-muted-foreground">+63 (2) 8123 4567</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">FAQs</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">What are your operating hours?</h4>
              <p className="text-muted-foreground">We are open 24/7 for pet check-in and check-out.</p>
            </div>

            <div>
              <h4 className="font-medium">Do you provide food for pets?</h4>
              <p className="text-muted-foreground">
                Yes, we provide premium pet food, but you can also bring your pet's regular food if preferred.
              </p>
            </div>

            <div>
              <h4 className="font-medium">What happens in case of a medical emergency?</h4>
              <p className="text-muted-foreground">
                We have veterinarians on call 24/7 and partnerships with nearby animal hospitals for immediate care if
                needed.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/webapp/auth/login")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Decorative angled shapes */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-2xl"></div>

        {/* Angled shape that matches logo color scheme */}
        <div className="hidden md:block absolute top-0 right-0 w-1/3 h-screen transform -skew-x-12 origin-top-right z-0">
          <div className="w-full h-full bg-gradient-to-b from-primary/20 to-primary/5"></div>
        </div>

        {/* Small decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-primary/30 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-primary/20 rounded-full"></div>
        <div className="absolute top-2/3 right-1/3 w-8 h-8 bg-primary/15 rounded-full"></div>
      </div>

      {/* Header */}
      <header
        ref={headerRef}
        className="w-full py-4 px-6 fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png"
              alt="Big Paws Pet Hotel Logo"
              width={50}
              height={50}
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl text-foreground">Big Paws Pet Hotel</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ThemeToggle />
            <Link href="/">
              <Button variant="outline" className="hidden sm:flex">
                Back to Website
              </Button>
              <Button variant="outline" size="icon" className="sm:hidden">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 pt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          {/* Welcome Banner */}
          <div className="relative h-56 w-full rounded-t-2xl overflow-hidden mb-6 shadow-lg group">
            <Image
              src="/pet-hotel-3.jpg"
              alt="Pet Hotel"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center px-4"
              >
                <h1 className="text-white text-3xl sm:text-4xl font-bold">Pet Owner Portal</h1>
                <p className="text-white/90 mt-2 max-w-2xl mx-auto">Your gateway to premium pet care services</p>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <motion.div
            className="bg-card rounded-xl p-6 shadow-lg border relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Decorative corner accent */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/10 transform rotate-45"></div>

            <h2 className="text-2xl font-bold text-foreground mb-3">Welcome to Your Portal</h2>
            <p className="text-muted-foreground mb-6">
              Access your pet's information, manage bookings, and request special services all in one place.
            </p>

            {/* Feature Highlight */}
            <div className="mb-6 bg-muted/50 rounded-lg p-4 h-24 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <div className="bg-primary/10 p-2 rounded-full text-primary">{features[activeFeature].icon}</div>
                  <div>
                    <h3 className="font-medium text-foreground">{features[activeFeature].title}</h3>
                    <p className="text-sm text-muted-foreground">{features[activeFeature].description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} animate={controls}>
                <Button
                  size="lg"
                  className="w-full flex items-center justify-center gap-2 h-12 relative overflow-hidden group"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  <span className="absolute inset-0 w-full h-full bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Enter Portal</span>
                    </>
                  )}
                </Button>
              </motion.div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                <span>New to Big Paws?</span>
                <Link href="/" className="text-primary hover:underline">
                  Learn more
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="mt-6 flex justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => openDialog("Help & Support", supportContent)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Help & Support
            </button>
            <span className="text-muted-foreground">•</span>
            <button
              onClick={() => openDialog("Terms & Privacy Policy", legalContent)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms & Privacy
            </button>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer
      <footer className="border-t py-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm px-6">
          <p>&copy; {new Date().getFullYear()} Big Paws Pet Hotel. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/terms-privacy" className="hover:underline">
              Terms & Privacy
            </Link>
          </p>
        </div>
      </footer> */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-1">{dialogContent}</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

