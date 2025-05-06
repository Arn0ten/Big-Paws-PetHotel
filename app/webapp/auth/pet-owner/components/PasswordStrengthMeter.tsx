/**
 * Password Strength Meter Component for Pet Owners
 *
 * This component displays a visual representation of password strength
 * and optionally shows criteria for a strong password.
 */

import { CheckCircle2, XCircle } from "lucide-react";
import type { PasswordCriteria } from "../types";

interface PasswordStrengthMeterProps {
  strength: number;
  criteria: PasswordCriteria;
  showCriteria?: boolean;
}

export function PasswordStrengthMeter({
  strength,
  criteria,
  showCriteria = false,
}: PasswordStrengthMeterProps) {
  // Update PasswordStrengthMeter component for better color transitions and visual feedback
  // Determine color based on strength
  const getColor = () => {
    if (strength < 30) return "bg-red-500";
    if (strength < 60) return "bg-yellow-500"; // Changed from bg-yellow-500
    if (strength < 80) return "bg-blue-500";
    return "bg-green-500";
  };

  // Add strength label text based on percentage
  const getStrengthLabel = () => {
    if (strength < 30) return "Weak";
    if (strength < 60) return "Fair";
    if (strength < 80) return "Good";
    return "Strong";
  };

  return (
    <div className="space-y-2">
      {/* Strength bar with label */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Password strength:</span>
          <span
            className={`font-medium ${
              strength < 30
                ? "text-red-500"
                : strength < 60
                  ? "text-yellow-500"
                  : strength < 80
                    ? "text-blue-500"
                    : "text-green-500"
            }`}
          >
            {getStrengthLabel()}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getColor()}`}
            style={{ width: `${strength}%` }}
          />
        </div>
      </div>

      {/* Password criteria checklist */}
      {showCriteria && (
        <div className="mt-4 space-y-2 text-sm">
          <p className="font-medium mb-2">Password requirements:</p>
          <div className="grid grid-cols-1 gap-2">
            <CriteriaItem
              isValid={criteria.length}
              text="At least 8 characters"
            />
            <CriteriaItem
              isValid={criteria.uppercase}
              text="At least 1 uppercase letter"
            />
            <CriteriaItem
              isValid={criteria.lowercase}
              text="At least 1 lowercase letter"
            />
            <CriteriaItem isValid={criteria.number} text="At least 1 number" />
            <CriteriaItem
              isValid={criteria.symbol}
              text="At least 1 special character"
            />
            {"match" in criteria && (
              <CriteriaItem isValid={criteria.match} text="Passwords match" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CriteriaItem({ isValid, text }: { isValid: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {isValid ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-muted-foreground" />
      )}
      <span className={isValid ? "text-foreground" : "text-muted-foreground"}>
        {text}
      </span>
    </div>
  );
}
