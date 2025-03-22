"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Check,
  X,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ThemeToggle } from "@/components/theme-toggle";
import { Progress } from "@/components/ui/progress";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
    match: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Check password strength and criteria whenever password changes
  useEffect(() => {
    const { password, confirmPassword } = formData;

    // Check criteria
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
      match: password === confirmPassword && password !== "",
    };

    setPasswordCriteria(criteria);

    // Calculate strength percentage
    const criteriaCount = Object.values(criteria).filter(Boolean).length;
    const strengthPercentage = Math.floor((criteriaCount / 6) * 100);
    setPasswordStrength(strengthPercentage);
  }, [formData]);

  const validateForm = () => {
    const { contact, password, confirmPassword } = formData;

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

    if (!password) {
      setError("Password is required");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return false;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return false;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number");
      return false;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      setError("Password must contain at least one special character");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    // BACKEND INTEGRATION POINT:
    // Replace the setTimeout with actual API call to your backend
    // Example:
    // const response = await fetch('/api/auth/reset-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     email: formData.contact,
    //     password: formData.password
    //   })
    // });
    //
    // if (response.ok) {
    //   setShowSuccessModal(true);
    // } else {
    //   const data = await response.json();
    //   setError(data.message || 'Failed to reset password');
    // }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 30) return "bg-red-500";
    if (passwordStrength < 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full border-b py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/webapp" className="text-xl font-bold text-foreground">
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
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground">
              Reset Password
            </h1>
            <p className="text-muted-foreground mt-2">
              Enter your email/phone and create a new strong password
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
                name="contact"
                type="text"
                placeholder="Enter your email or phone number"
                value={formData.contact}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`bg-background ${error && !formData.contact ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                New Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your new password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`bg-background ${error && !formData.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`bg-background ${
                  error &&
                  (!formData.confirmPassword ||
                    formData.password !== formData.confirmPassword)
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>

            {/* Password strength meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Password Strength
                </span>
                <span className="text-sm font-medium">
                  {passwordStrength < 40
                    ? "Weak"
                    : passwordStrength < 70
                      ? "Medium"
                      : "Strong"}
                </span>
              </div>
              <Progress
                value={passwordStrength}
                className={`h-2 ${getStrengthColor()}`}
              />
            </div>

            {/* Password requirements */}
            <div className="bg-muted/50 p-4 rounded-md space-y-2">
              <h3 className="text-sm font-medium mb-2">
                Password Requirements:
              </h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  {passwordCriteria.length ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span>At least 8 characters long</span>
                </li>
                <li className="flex items-center">
                  {passwordCriteria.uppercase ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span>At least one uppercase letter (A-Z)</span>
                </li>
                <li className="flex items-center">
                  {passwordCriteria.lowercase ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span>At least one lowercase letter (a-z)</span>
                </li>
                <li className="flex items-center">
                  {passwordCriteria.number ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span>At least one number (0-9)</span>
                </li>
                <li className="flex items-center">
                  {passwordCriteria.symbol ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span>At least one special character (!@#$%^&*)</span>
                </li>
                <li className="flex items-center">
                  {passwordCriteria.match ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span>Passwords match</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/30 p-3 rounded-md">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Example:</span> "Bigpaws123!" is a
                strong password that meets all requirements.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>

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

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-card rounded-xl shadow-xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 10 }}
                className="mx-auto rounded-full bg-green-100 dark:bg-green-900/30 p-3 w-20 h-20 flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </motion.div>

              <h2 className="text-2xl font-bold mb-4">Password Updated!</h2>
              <p className="text-muted-foreground mb-6">
                Your password has been successfully updated. You can now log in
                with your new password.
              </p>

              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  // Redirect to login page after a short delay
                  setTimeout(() => {
                    window.location.href = "/webapp/auth/login";
                  }, 300);
                }}
                className="w-full"
              >
                Go to Login
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
