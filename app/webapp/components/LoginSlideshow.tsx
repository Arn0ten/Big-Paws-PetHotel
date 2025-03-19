"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/pet-hotel-1.jpg",
  "/pet-hotel-2.jpg",
  "/pet-hotel-3.jpg",
  "/pet-hotel-4.jpg",
  "/pet-hotel-5.jpg",
];

export default function LoginSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background color overlay */}
      <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] z-10" />

      {/* Logo and text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png"
            alt="Big Paws Pet Hotel Logo"
            width={120}
            height={120}
            className="mx-auto mb-4"
          />
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-md">
            Big Paws Pet Hotel
          </h1>
          <p className="text-white/90 mt-2 max-w-md mx-auto px-4 text-sm sm:text-base drop-shadow-md">
            Your pet's home away from home. Login to manage your pet's stay and
            services.
          </p>
        </motion.div>
      </div>

      {/* Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Pet hotel image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
