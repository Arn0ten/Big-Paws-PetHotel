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
import { validateContact } from "../utils/validation";
import { changePassword } from "../services/authService";
import Link from "next/link";
import { motion } from "framer-motion";
import EmailSentAnimation from "@/app/webapp/components/animations/EmailSentAnimation";
import PhoneSentAnimation from "@/app/webapp/components/animations/PhoneSentAnimation";
import { getContactType } from "@/app/webapp/utils/contact-validator";

export default function ChangePasswordPage() {
  const [contact, setContact] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate contact
    const validation = validateContact(contact);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setIsLoading(true);
    try {
      const response = await changePassword({ contact, role: "admin" });
      if (response.success) {
        setIsSuccess(true);
      } else {
        setError(
          response.error || "Failed to send password change instructions",
        );
      }
    } catch (err) {
      console.error("Password change request error:", err);
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
              Change Admin Password
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email address or phone number and we&apos;ll send you
              instructions to change your password.
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
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {getContactType(contact) === "email" ? (
                      <EmailSentAnimation email={contact} />
                    ) : getContactType(contact) === "phone" ? (
                      <PhoneSentAnimation phoneNumber={contact} />
                    ) : (
                      <AlertDescription className="text-center py-2">
                        Password change instructions have been sent. Please
                        check your email or phone for further instructions.
                      </AlertDescription>
                    )}
                  </motion.div>
                </Alert>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="contact"
                    type="text"
                    placeholder="Email or phone number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    disabled={isLoading}
                    className="bg-background"
                  />
                </div>

                <div className="flex flex-col space-y-3">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Instructions...
                      </>
                    ) : (
                      <>
                        Send Instructions
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
              Admin access only. For security reasons, verification may be
              required.
            </p>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  );
}
