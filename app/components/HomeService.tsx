"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { useRef, useState } from "react"
import { Clock, Shield, Heart, Sparkles, Scissors, Bath, Brush } from "lucide-react"
import FloatingImageModal from "./FloatingImageModal"

const services = [
  {
    icon: Bath,
    title: "Basic Wash",
    description: "A thorough bath with premium shampoo, blow-dry, and light brushing to keep your pet clean and fresh.",
  },
  {
    icon: Scissors,
    title: "Full Grooming",
    description:
      "Complete grooming session including bath, haircut, nail trimming, ear cleaning, and styling to make your pet look their best.",
  },
  {
    icon: Brush,
    title: "De-shedding Treatment",
    description:
      "Specialized treatment to reduce shedding, remove loose fur, and promote a healthier coat for your pet.",
  },
]

const benefits = [
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book appointments at your convenience, including weekends and holidays",
  },
  {
    icon: Shield,
    title: "Professional Care",
    description: "Experienced groomers trained in handling all breeds and temperaments",
  },
  {
    icon: Heart,
    title: "Stress-Free Experience",
    description: "Your pet stays comfortable in their familiar environment",
  },
  {
    icon: Sparkles,
    title: "Premium Products",
    description: "We use high-quality, pet-safe grooming products",
  },
]

export default function HomeService() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [selectedImage, setSelectedImage] = useState<{
    src: string
    alt: string
    description: string
  } | null>(null)

  const handleImageClick = (image: {
    src: string
    alt: string
    description: string
  }) => {
    setSelectedImage(image)
  }

  return (
    <section className="py-12 sm:py-16 bg-background relative overflow-hidden" id="home-service">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Professional Home Service</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Experience premium pet grooming in the comfort of your home
          </p>
        </motion.div>

        {/* Enhanced Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="bg-muted rounded-lg p-4 sm:p-6">
            <p className="text-sm sm:text-lg leading-relaxed text-muted-foreground">
              Our professional home grooming service brings the complete salon experience directly to your doorstep. We
              understand that some pets feel anxious in unfamiliar environments, which is why we offer this convenient
              solution. Our mobile grooming unit is fully equipped with professional-grade tools and products, ensuring
              your pet receives the same high-quality care as they would in our salon.
            </p>
          </div>
        </motion.div>

        {/* Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 sm:p-6 h-full flex flex-col">
                <service.icon className="w-8 h-8 sm:w-12 sm:h-12 text-primary mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground flex-grow">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-dUdeXRCKeBtvmEeaHYPzvcTnstNErO.jpeg",
              alt: "Happy groomed Pomeranian",
              description: "Professional grooming at your doorstep",
            },
            {
              src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480613347_1009147024599744_449517268461532420_n.jpg-KSIaVaU2mrH3uGGVoaKgkJbRr9P404.jpeg",
              alt: "Professional grooming service",
              description: "Expert groomers with years of experience",
            },
            {
              src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480179834_591444434054760_4947462491439067277_n.jpg-nNVWae7YcB6CEEXe9MyxtQQBmKo0o5.jpeg",
              alt: "Grooming result",
              description: "Satisfaction guaranteed results",
            },
          ].map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-center px-4 text-sm sm:text-base">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full max-w-5xl mx-auto mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
              Take a Tour of Our Store
            </h2>
            <p className="mt-4 text-sm sm:text-lg text-muted-foreground">
              Take a tour of our Pet Store and see why pets love staying with us.
            </p>
          </div>
          <div className="relative aspect-[6/4] rounded-xl overflow-hidden shadow-lg">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay loop muted playsInline>
              <source src="/videos/home-service.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Convenience</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Professional grooming services delivered right to your doorstep, saving you time and reducing pet travel
              stress.
            </p>
          </Card>
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Professional Equipment</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Our mobile grooming unit comes fully equipped with professional-grade tools and products.
            </p>
          </Card>
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Experienced Groomers</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Skilled professionals who provide personalized attention and care for your pet in familiar surroundings.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" asChild className="text-sm sm:text-base">
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                const contactSection = document.getElementById("contact")
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" })
                  setTimeout(() => {
                    const bookServiceTab = document.querySelector(
                      '[data-state="inactive"][value="book-service"]',
                    ) as HTMLButtonElement
                    if (bookServiceTab) {
                      bookServiceTab.click()
                    }
                  }, 100)
                }
              }}
            >
              Book Home Service
            </Link>
          </Button>
        </motion.div>

        {/* Note section */}
        <div className="mt-12 bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground font-semibold">
            Note: All pets must be fully vaccinated and have anti-rabies shots before using our services.
          </p>
        </div>
      </div>

      {/* Floating Image Modal */}
      <FloatingImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.src || ""}
        alt={selectedImage?.alt || ""}
        description={selectedImage?.description || ""}
      />
    </section>
  )
}

