"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PawPrint, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    // Use a safer approach to navigation
    setTimeout(() => {
      router.push("/webapp/auth/login");
      setIsLoading(false);
    }, 100);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full border-b py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
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
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/">
              <Button variant="outline">Back to Website</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          {/* Welcome Banner - Fixed overlay that works in both light/dark mode */}
          <div className="relative h-56 w-full rounded-t-2xl overflow-hidden mb-6 shadow-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480571878_548286108271303_2393865756725072190_n.jpg-XId4dxCDSDXyIRptjCYGKbbW1cpkmp.jpeg"
              alt="Pet Hotel"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center px-4"
              >
                <h1 className="text-white text-3xl sm:text-4xl font-bold">
                  Welcome Back!
                </h1>
                <p className="text-white/90 mt-2 max-w-2xl mx-auto">
                  Your furry friends are waiting for you
                </p>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <motion.div
            className="bg-card rounded-xl p-6 shadow-lg border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Pet Management Portal
            </h2>
            <p className="text-muted-foreground mb-6">
              Access your pet's information, manage bookings, and request
              special services.
            </p>

            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="w-full flex items-center justify-center gap-2 h-12"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <PawPrint className="h-5 w-5" />
                      <span>Sign In to Portal</span>
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

      {/* Footer */}
      {/* <footer className="border-t py-6">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm px-6">
          <p>
            &copy; {new Date().getFullYear()} Big Paws Pet Hotel. All rights
            reserved.
          </p>
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
