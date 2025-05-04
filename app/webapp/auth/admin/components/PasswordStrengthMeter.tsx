/**
 * Admin Password Strength Meter Component
 *
 * This component displays a visual indicator of password strength
 * and a list of password requirements with their status.
 * It includes additional requirements specific to admin accounts.
 */

import { Check, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { PasswordCriteria } from "../types"

interface PasswordStrengthMeterProps {
  passwordStrength: number
  passwordCriteria: PasswordCriteria
}

export function PasswordStrengthMeter({ passwordStrength, passwordCriteria }: PasswordStrengthMeterProps) {
  // Determine the color based on password strength
  const getStrengthColor = () => {
    if (passwordStrength < 30) return "bg-red-500"
    if (passwordStrength < 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  // Get the strength label
  const getStrengthLabel = () => {
    if (passwordStrength < 40) return "Weak"
    if (passwordStrength < 70) return "Medium"
    return "Strong"
  }

  return (
    <div className="space-y-4">
      {/* Password strength meter */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Password Strength</span>
          <span className="text-sm font-medium">{getStrengthLabel()}</span>
        </div>
        <Progress value={passwordStrength} className={`h-2 ${getStrengthColor()}`} />
      </div>

      {/* Password requirements */}
      <div className="bg-muted/50 p-4 rounded-md space-y-2">
        <h3 className="text-sm font-medium mb-2">Admin Password Requirements:</h3>
        <ul className="space-y-1 text-sm">
          <li className="flex items-center">
            {passwordCriteria.length ? (
              <Check className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <X className="h-4 w-4 text-red-500 mr-2" />
            )}
            <span>At least 10 characters long</span>
          </li>
          <li className="flex items-center">
            {passwordCriteria.uppercase ? (
              <Check className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <X className="h-4 w-4 text-red-500 mr-2" />
            )}
            <span>At least one uppercase letter (A-Z)</span>\
