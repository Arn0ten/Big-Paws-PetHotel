"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Mail,
  Smartphone,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ForgotPasswordPage() {
  const [contact, setContact] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!contact.trim()) {
      setError("Email or phone number is required");
      return false;
    }

    // Basic email validation
    if (contact.includes("@") && !contact.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Basic phone validation (simple check for numbers only)
    if (!contact.includes("@") && !contact.match(/^\d+$/)) {
      setError("Please enter a valid phone number (numbers only)");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    // BACKEND INTEGRATION POINT:
    // Replace the setTimeout with actual API call to your backend
    // Example:
    // const response = await fetch('/api/auth/forgot-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     contact: contact,
    //     contactType: contact.includes('@') ? 'email' : 'phone'
    //   })
    // });
    //
    // if (response.ok) {
    //   setIsSubmitted(true);
    // } else {
    //   const data = await response.json();
    //   setError(data.message || 'Failed to send reset instructions');
    // }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full border-b py-3 sm:py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/webapp"
            className="text-lg sm:text-xl font-bold text-foreground"
          >
            Big Paws Pet Hotel
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg bg-card rounded-xl shadow-lg p-4 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-foreground">
                    Forgot Password
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Enter your email address or phone number to receive password
                    reset instructions
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-foreground">
                      Email Address or Phone Number
                    </Label>
                    <Input
                      id="contact"
                      type="text"
                      placeholder="Enter your email or phone number"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                        if (error) setError(null);
                      }}
                      disabled={isLoading}
                      className={`bg-background ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Instructions"
                    )}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="text-center py-4"
              >
                <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-6 rounded-lg mb-6">
                  {contact.includes("@") ? (
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="flex justify-center mb-4"
                    >
                      <motion.div
                        animate={{
                          rotate: [-5, 5, -5, 5, -5, 5, -5, 0],
                          x: [-2, 2, -2, 2, -2, 2, -2, 0],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 2,
                        }}
                      >
                        <Mail className="w-16 h-16 text-green-500" />
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="flex justify-center mb-4"
                    >
                      <motion.div
                        animate={{
                          rotate: [0, -3, 0, 3, 0],
                          scale: [1, 1.05, 1, 1.05, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 0.5,
                        }}
                      >
                        <Smartphone className="w-16 h-16 text-green-500" />
                      </motion.div>
                    </motion.div>
                  )}
                  <p className="text-lg break-words text-sm sm:text-lg">
                    Password reset instructions have been sent. Please check
                    your {contact.includes("@") ? "email" : "SMS"} at:
                  </p>
                  <p className="font-bold mt-2 text-base sm:text-lg break-all bg-white/20 dark:bg-black/20 p-2 rounded-md">
                    {contact}
                  </p>
                </div>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  Try Another Email or Phone
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center">
            <Link
              href="/webapp/auth/login"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Login
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="border-t py-6">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
          <p>
            &copy; {new Date().getFullYear()} Big Paws Pet Hotel. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
