"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const images = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480571878_548286108271303_2393865756725072190_n.jpg-XId4dxCDSDXyIRptjCYGKbbW1cpkmp.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480899995_642061011656747_972779387843409689_n.jpg-qdPkAESKW0ppJDAeBKGbpCwthU8aVT.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481266669_619546497482268_7852519735591331140_n.jpg-D8OzlF1s2jCKTDw5JeGw0vYZaP25lG.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480064874_3971175603130199_8445389685285733814_n.jpg-29Q4fg1oUXATRcruRlRvtyqiPaoFps.jpeg",
]

export default function LoginSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Pet hotel image ${currentIndex + 1}`}
              fill
              className="object-cover blur-[2px]"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slideshow indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

