"use client";

import type React from "react";

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
import { AlertCircle, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import {
  validatePassword,
  validatePasswordConfirmation,
} from "../utils/validation";
import { resetPassword } from "../services/authService";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { PasswordStrengthMeter } from "../components/PasswordStrengthMeter";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const contact = searchParams.get("contact") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
                <Alert className="bg-primary/10 border-primary/20">
                  <AlertDescription className="text-center py-2">
                    Your password has been successfully reset. You can now log
                    in with your new password.
                  </AlertDescription>
                </Alert>
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
                  <Input
                    id="password"
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="bg-background"
                  />
                </div>

                <PasswordStrengthMeter
                  strength={passwordStrength}
                  criteria={passwordCriteria}
                  showCriteria={true}
                  isAdmin={true}
                />

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

                  <Button variant="outline" asChild className="w-full">
                    <Link href="/webapp/auth/admin/login">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Admin Login
                    </Link>
                  </Button>
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
