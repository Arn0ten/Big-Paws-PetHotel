"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"

interface FloatingImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  alt?: string
  description?: string
  additionalInfo?: string
  price?: string
}

export default function FloatingImageModal({
  isOpen,
  onClose,
  imageSrc,
  alt = "Image",
  description,
  additionalInfo,
  price,
}: FloatingImageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-background rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex flex-col md:flex-row h-full">
              <div className="relative w-full h-[50vh] md:h-[80vh] md:w-2/3 my-4 md:my-0">
                <Image
                  src={imageSrc || "/placeholder.svg"}
                  alt={alt}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  quality={100}
                />
              </div>
              <div className="p-6 md:w-1/3 overflow-y-auto">
                {description && <p className="text-lg font-semibold mb-4">{description}</p>}
                {additionalInfo && <p className="text-sm text-muted-foreground mb-4">{additionalInfo}</p>}
                {price && <p className="text-xl font-bold text-primary">{price}</p>}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

