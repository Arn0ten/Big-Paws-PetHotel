"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react";
// Updated imports to use admin-specific files
import { AuthLayout } from "../components/AuthLayout";
import { login } from "../services/authService";
import type { LoginFormData } from "../types";
// Import validation utilities
import { isValidEmail, isValidPhone } from "../utils/validation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Add field-specific error states
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  // Add contact type detection
  const [contactType, setContactType] = useState<"email" | "phone">("email");
  const router = useRouter();

  // Handle email/phone input change with contact type detection
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Detect if input is email or phone
    if (value.includes("@")) {
      setContactType("email");
    } else {
      setContactType("phone");
    }

    // Clear error for this field
    if (formErrors.email) {
      setFormErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    // Clear error for this field
    if (formErrors.password) {
      setFormErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate email/phone
    if (!email.trim()) {
      errors.email = "Email or phone number is required";
    } else if (contactType === "email" && !isValidEmail(email)) {
      errors.email = "Please enter a valid email address";
    } else if (contactType === "phone" && !isValidPhone(email)) {
      errors.email = "Please enter a valid phone number (numbers only)";
    }

    // Validate password
    if (!password.trim()) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form first
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formData: LoginFormData = {
        username: email,
        password,
        rememberMe: false,
        role: "admin",
      };

      const response = await login(formData);

      if (response.success) {
        router.push("/webapp/admin/dashboard");
      } else {
        setError(
          response.error || "Invalid email or password. Please try again.",
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Phone Number</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="admin@example.com or phone number"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className={formErrors.email ? "border-destructive" : ""}
                />
                {email && (
                  <p className="text-xs text-muted-foreground">
                    {contactType === "email"
                      ? "Using email for login"
                      : "Using phone number for login"}
                  </p>
                )}
                {formErrors.email && (
                  <p className="text-destructive text-sm">{formErrors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className={formErrors.password ? "border-destructive" : ""}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="text-destructive text-sm">
                    {formErrors.password}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link
            href="/webapp/auth/admin/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
          <Button
            variant="secondary"
            asChild
            className="mt-4 font-medium shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to Website
            </Link>
          </Button>
          <Button variant="link" asChild className="mt-2">
            <Link href="/webapp/auth/pet-owner/login">Pet Owner Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
