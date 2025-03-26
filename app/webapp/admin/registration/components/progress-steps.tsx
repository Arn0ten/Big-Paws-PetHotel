"use client";

import { cn } from "@/lib/utils";
import { User, Home, Phone } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
  totalSteps?: number;
}

// Update the ProgressSteps component to fix the alignment issue
export function ProgressSteps({
  currentStep,
  totalSteps = 3,
}: ProgressStepsProps) {
  return (
    <div className="w-full py-4 sm:py-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="relative">
          {/* Progress bar background */}
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted" />

          {/* Active progress bar */}
          <div
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {/* Personal Info */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-500",
                  currentStep >= 1
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-background text-muted-foreground",
                )}
              >
                <User className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Personal</span>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-500",
                  currentStep >= 2
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-background text-muted-foreground",
                )}
              >
                <Home className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Address</span>
            </div>

            {/* Emergency Contact */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-500",
                  currentStep >= 3
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-background text-muted-foreground",
                )}
              >
                <Phone className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium whitespace-nowrap">
                Emergency Contact
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
