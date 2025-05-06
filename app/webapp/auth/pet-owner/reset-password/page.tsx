"use client";

import type React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  Info,
} from "lucide-react";
// Updated imports to use pet-owner specific files
import { AuthLayout } from "../components/AuthLayout";
import { usePasswordValidation } from "../hooks/usePasswordValidation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState<string>("demo-token"); // Default demo token
  const [contact, setContact] = useState<string>("demo-contact"); // Default demo contact

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    passwordStrength,
    passwordCriteria,
    isValid,
    passwordErrors,
    validatePassword,
  } = usePasswordValidation({
    password,
    confirmPassword,
  });

  useEffect(() => {
    // Get token and contact from URL parameters
    const tokenParam = searchParams.get("token");
    const contactParam = searchParams.get("contact");

    if (tokenParam) setToken(tokenParam);
    if (contactParam) setContact(contactParam);

    // Show warning if token or contact is missing, but don't prevent form display
    if (!tokenParam || !contactParam) {
      setError(
        "This is a demonstration. In a real scenario, you would need a valid reset link.",
      );
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords
    if (!validatePassword(password)) {
      setError("Please fix the password issues before continuing.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      // For demo purposes, always succeed
      setTimeout(() => {
        setIsSuccess(true);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Password reset error:", err);
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            {isSuccess
              ? "Password reset successful!"
              : "Create a new password for your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert
              variant={
                error.includes("demonstration") ? "default" : "destructive"
              }
              className="mb-4"
            >
              <Info
                className={`h-4 w-4 ${error.includes("demonstration") ? "" : "hidden"}`}
              />
              <AlertCircle
                className={`h-4 w-4 ${error.includes("demonstration") ? "hidden" : ""}`}
              />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isSuccess ? (
            <div className="text-center space-y-4">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <FaCheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">
                  Password Reset Successful!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your password has been successfully reset. You can now log in
                  with your new password.
                </p>
              </div>
              <Button asChild className="mt-2 w-full">
                <Link href="/webapp/auth/pet-owner/login">Go to Login</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      className="pr-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-sm text-red-500">
                      Passwords do not match
                    </p>
                  )}
                </div>

                <div className="bg-muted/50 p-3 rounded-md mt-2">
                  <p className="text-sm font-medium mb-2">
                    Password requirements:
                  </p>
                  <div className="space-y-1">
                    {Object.entries(passwordCriteria).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        {value ? (
                          <FaCheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm ${value ? "text-green-500 font-medium" : "text-muted-foreground"}`}
                        >
                          {key === "length" && "At least 8 characters"}
                          {key === "uppercase" && "At least 1 uppercase letter"}
                          {key === "lowercase" && "At least 1 lowercase letter"}
                          {key === "number" && "At least 1 number"}
                          {key === "symbol" && "At least 1 special character"}
                          {key === "match" && "Passwords match"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          passwordStrength < 30
                            ? "bg-red-500"
                            : passwordStrength < 60
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {passwordStrength < 30
                        ? "Weak password"
                        : passwordStrength < 60
                          ? "Moderate password"
                          : "Strong password"}
                    </p>
                    <div className="mt-3 bg-blue-50 p-2 rounded-md border border-blue-100 flex items-start">
                      <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-blue-700 font-medium">
                          Example format:
                        </p>
                        <p className="text-sm text-blue-700 font-bold">
                          Bigpaws2025!
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Includes uppercase, lowercase, numbers, and special
                          character
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}
        </CardContent>
        {/* <CardFooter className="flex flex-col space-y-2">
          <Button variant="outline" asChild className="w-full">
            <Link href="/webapp/auth/pet-owner/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
        </CardFooter> */}
      </Card>
    </AuthLayout>
  );
}
