"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { X } from "lucide-react";

export default function VideoSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const [isFloating, setIsFloating] = useState(false);
  const [hasClosedFloating, setHasClosedFloating] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (ref.current && !hasClosedFloating) {
        const rect = ref.current.getBoundingClientRect();
        setIsFloating(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasClosedFloating]);

  const handleClose = () => {
    setIsFloating(false);
    setHasClosedFloating(true);
  };

  return (
    <>
      {/* Main Video Section */}
      <section className="py-16 bg-background" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Experience Big Paws Pet Hotel & Grooming Services
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Take a virtual tour of our facilities and see why pets love
              staying with us.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-video w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg"
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="video-montage.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      {/* Floating Mini Video */}
      {isFloating && (
        <div className="fixed bottom-4 right-4 w-80 aspect-video rounded-lg overflow-hidden shadow-lg z-50 bg-black/50">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 z-10 bg-black/50 p-1 rounded-full hover:bg-black/70"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="video-montage.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
}
