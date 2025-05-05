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
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
// Updated imports to use pet-owner specific files
import { AuthLayout } from "../components/AuthLayout";
import { requestPasswordReset } from "../services/authService";
import { validateContact } from "../utils/validation";
import type { PasswordResetRequestFormData } from "../types";
import EmailSentAnimation from "@/app/webapp/components/animations/EmailSentAnimation";
import PhoneSentAnimation from "@/app/webapp/components/animations/PhoneSentAnimation";
import { getContactType } from "@/app/webapp/utils/contact-validator";

export default function ForgotPasswordPage() {
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate contact information
    const contactValidation = validateContact(contact);
    if (!contactValidation.isValid) {
      setError(
        contactValidation.error || "Please enter a valid email or phone number",
      );
      return;
    }

    setIsLoading(true);

    try {
      const formData: PasswordResetRequestFormData = {
        contact,
      };

      const response = await requestPasswordReset(formData);

      if (response.success) {
        setIsSuccess(true);
      } else {
        setError(
          response.error || "Failed to process your request. Please try again.",
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Password reset request error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            {isSuccess
              ? "Password reset instructions sent!"
              : "Enter your email or phone number to receive password reset instructions"}
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
            <div className="text-center space-y-4">
              {getContactType(contact) === "email" ? (
                <EmailSentAnimation email={contact} />
              ) : getContactType(contact) === "phone" ? (
                <PhoneSentAnimation phoneNumber={contact} />
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    We've sent instructions to reset your password to{" "}
                    <span className="font-medium text-foreground">
                      {contact}
                    </span>
                    . Please check your inbox and follow the instructions.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    If you don't receive an email within a few minutes, check
                    your spam folder or try again.
                  </p>
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Email or Phone Number</Label>
                <Input
                  id="contact"
                  type="text"
                  placeholder="Enter your email or phone number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  disabled={isLoading}
                  required
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
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button variant="outline" asChild className="w-full">
            <Link href="/webapp/auth/pet-owner/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
