"use client";

import type React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  ArrowRight,
  Loader2,
  ArrowLeft,
  CheckCircle,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import {
  validatePassword,
  validatePasswordConfirmation,
} from "../utils/validation";
import { resetPassword } from "../services/authService";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const contact = searchParams.get("contact") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { passwordStrength, passwordCriteria, isValid } = usePasswordValidation(
    {
      password,
      confirmPassword,
      isAdmin: true,
    },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate password
    const passwordValidation = validatePassword(password, true);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.error);
      return;
    }

    // Validate password confirmation
    const confirmValidation = validatePasswordConfirmation(
      password,
      confirmPassword,
    );
    if (!confirmValidation.isValid) {
      setError(confirmValidation.error);
      return;
    }

    if (!isValid) {
      setError("Please ensure your password meets all the requirements");
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword({
        contact,
        password,
        confirmPassword,
        role: "admin",
      });
      if (response.success) {
        setIsSuccess(true);
      } else {
        setError(response.error || "Failed to reset password");
      }
    } catch (err) {
      console.error("Password reset error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout showBackToLogin showBackToWelcome>
      <div className="w-full max-w-md">
        <Card className="border-border/40 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Reset Admin Password
            </CardTitle>
            <CardDescription className="text-center">
              Create a new secure password for your admin account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isSuccess ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <FaCheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-center">
                    Password Reset Successful!
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Your password has been successfully reset. You can now log
                    in with your new password.
                  </p>
                </div>
                <Button asChild className="w-full">
                  <a href="/webapp/auth/admin/login">
                    Go to Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="New password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="bg-background font-medium pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      className="bg-background font-medium pr-10"
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
                </div>

                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="flex items-center mb-2">
                    <p className="text-sm font-medium">
                      Password requirements:
                    </p>
                  </div>

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
                          {key === "length" && "At least 10 characters"}
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
                  </div>

                  <div className="mt-3 bg-blue-50 p-2 rounded-md border border-blue-100 flex items-start">
                    <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-blue-700 font-medium">
                        Example format:
                      </p>
                      <p className="text-sm text-blue-700 font-bold">
                        Bigpaws2025!!
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        Includes uppercase, lowercase, numbers, and special
                        characters
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !isValid}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting Password...
                      </>
                    ) : (
                      <>
                        Reset Password
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  {/* <Button variant="outline" asChild className="w-full">
                    <Link href="/webapp/auth/admin/login">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Admin Login
                    </Link>
                  </Button> */}
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Admin passwords require higher security standards.
            </p>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  );
}
