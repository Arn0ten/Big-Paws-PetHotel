/**
 * Password Strength Meter Component for Admin
 *
 * This component displays a visual representation of password strength
 * and optionally shows criteria for a strong password.
 */

import { CheckCircle2, XCircle, CheckCircle, Circle } from "lucide-react"
import type { PasswordCriteria } from "../types"

interface PasswordStrengthMeterProps {
  strength: number
  criteria: PasswordCriteria
  showCriteria?: boolean
  isAdmin?: boolean
}

const getCriteriaText = (key: keyof PasswordCriteria, isAdmin: boolean): string => {
  switch (key) {
    case "length":
      return isAdmin ? "At least 10 characters" : "At least 8 characters"
    case "uppercase":
      return "At least 1 uppercase letter"
    case "lowercase":
      return "At least 1 lowercase letter"
    case "number":
      return "At least 1 number"
    case "symbol":
      return "At least 1 special character"
    case "specialRequirement":
      return "At least 2 special characters"
    case "match":
      return "Passwords match"
    default:
      return ""
  }
}

export function PasswordStrengthMeter({
  strength,
  criteria,
  showCriteria = false,
  isAdmin = true,
}: PasswordStrengthMeterProps) {
  // Determine color based on strength
  const getColor = () => {
    if (strength < 30) return "bg-red-500"
    if (strength < 60) return "bg-yellow-500"
    if (strength < 80) return "bg-blue-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-2">
      {/* Strength bar */}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${getColor()}`}
          style={{ width: `${strength}%` }}
        />
      </div>

      {/* Strength label */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Weak</span>
        <span>Strong</span>
      </div>

      {/* Password criteria checklist */}
      {showCriteria && (
        <div className="space-y-2 mt-3">
          <p className="text-sm font-medium">Password requirements:</p>
          <ul className="space-y-1 text-sm">
            {Object.entries(criteria).map(([key, value]) => {
              const criteriaText = getCriteriaText(key as keyof PasswordCriteria, isAdmin)
              return (
                <li key={key} className="flex items-center">
                  {value ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground mr-2" />
                  )}
                  <span className={value ? "text-green-500" : "text-muted-foreground"}>{criteriaText}</span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

function CriteriaItem({ isValid, text }: { isValid: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {isValid ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-muted-foreground" />
      )}
      <span className={isValid ? "text-foreground" : "text-muted-foreground"}>{text}</span>
    </div>
  )
}
