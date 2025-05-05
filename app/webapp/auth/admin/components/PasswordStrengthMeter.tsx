/**
 * Password Strength Meter Component for Admin
 *
 * This component displays a visual representation of password strength
 * and optionally shows criteria for a strong password.
 */

import { CheckCircle2, XCircle } from "lucide-react"
import type { PasswordCriteria } from "../types"

interface PasswordStrengthMeterProps {
  strength: number
  criteria: PasswordCriteria
  showCriteria?: boolean
  isAdmin?: boolean
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
        <div className="mt-4 space-y-1 text-sm">
          <p className="font-medium mb-2">Password requirements:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            <CriteriaItem
              isValid={criteria.length}
              text={isAdmin ? "At least 10 characters" : "At least 8 characters"}
            />
            <CriteriaItem isValid={criteria.uppercase} text="At least 1 uppercase letter" />
            <CriteriaItem isValid={criteria.lowercase} text="At least 1 lowercase letter" />
            <CriteriaItem isValid={criteria.number} text="At least 1 number" />
            <CriteriaItem isValid={criteria.symbol} text="At least 1 special character" />
            {isAdmin && (
              <CriteriaItem isValid={criteria.specialRequirement || false} text="At least 2 special characters" />
            )}
            <CriteriaItem isValid={criteria.match} text="Passwords match" />
          </div>
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
