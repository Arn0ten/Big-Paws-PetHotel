"use client"

/**
 * Admin Password Validation Hook
 *
 * A custom hook that handles password validation logic for admin users.
 * This includes stricter validation rules for admin passwords.
 */

import { useState, useEffect } from "react"
import type { PasswordCriteria } from "../types"

interface UsePasswordValidationProps {
  password: string
  confirmPassword?: string
  isAdmin?: boolean
}

interface UsePasswordValidationReturn {
  passwordStrength: number
  passwordCriteria: PasswordCriteria
  isValid: boolean
}

export function usePasswordValidation({
  password,
  confirmPassword = "",
  isAdmin = true,
}: UsePasswordValidationProps): UsePasswordValidationReturn {
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordCriteria, setPasswordCriteria] = useState<PasswordCriteria>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
    match: false,
    specialRequirement: false,
  })
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    // Check criteria
    const criteria = {
      length: isAdmin ? password.length >= 10 : password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
      match: password === confirmPassword && password !== "",
      specialRequirement: isAdmin ? (password.match(/[^A-Za-z0-9]/g) || []).length >= 2 : true,
    }

    setPasswordCriteria(criteria)

    // Calculate strength percentage - for admin, include the special requirement
    const criteriaCount = Object.values(criteria).filter(Boolean).length
    const totalCriteria = isAdmin ? 7 : 6
    const strengthPercentage = Math.floor((criteriaCount / totalCriteria) * 100)
    setPasswordStrength(strengthPercentage)

    // Password is valid if all criteria are met
    setIsValid(Object.values(criteria).every(Boolean))
  }, [password, confirmPassword, isAdmin])

  return {
    passwordStrength,
    passwordCriteria,
    isValid,
  }
}
