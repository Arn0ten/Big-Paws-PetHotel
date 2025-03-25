"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  PawPrint,
  Loader2,
  ChevronRight,
  Info,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const router = useRouter();
  const controls = useAnimation();
  const headerRef = useRef<HTMLDivElement>(null);

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
  ];

  useEffect(() => {
    setMounted(true);

    // Animate the header on scroll
    const handleScroll = () => {
      if (window.scrollY > 10) {
        headerRef.current?.classList.add(
          "shadow-md",
          "bg-background/95",
          "backdrop-blur-sm",
        );
        headerRef.current?.classList.remove("bg-transparent");
      } else {
        headerRef.current?.classList.remove(
          "shadow-md",
          "bg-background/95",
          "backdrop-blur-sm",
        );
        headerRef.current?.classList.add("bg-transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Rotate through features
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(featureInterval);
    };
  }, [features.length]);

  const handleLogin = () => {
    setIsLoading(true);
    controls.start({
      scale: [1, 0.95, 1],
      transition: { duration: 0.3 },
    });

    setTimeout(() => {
      router.push("/webapp/auth/login");
      setIsLoading(false);
    }, 300);
  };

  if (!mounted) {
    return null;
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
            <span className="font-bold text-xl text-foreground">
              Big Paws Pet Hotel
            </span>
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
                <h1 className="text-white text-3xl sm:text-4xl font-bold">
                  Pet Owner Portal
                </h1>
                <p className="text-white/90 mt-2 max-w-2xl mx-auto">
                  Your gateway to premium pet care services
                </p>
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

            <h2 className="text-2xl font-bold text-foreground mb-3">
              Welcome to Your Portal
            </h2>
            <p className="text-muted-foreground mb-6">
              Access your pet's information, manage bookings, and request
              special services all in one place.
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
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    {features[activeFeature].icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {features[activeFeature].title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {features[activeFeature].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={controls}
              >
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
                      <PawPrint className="h-5 w-5" />
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
            <Link
              href="/support"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Help & Support
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/terms-privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms & Privacy
            </Link>
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
    </div>
  );
}
