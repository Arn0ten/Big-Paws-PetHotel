"use client"

/**
 * Password Validation Hook
 *
 * A custom hook that handles password validation logic.
 * This centralizes the password validation rules and provides a reusable way
 * to check password strength and criteria across different components.
 */

import { useState, useEffect } from "react"
import type { PasswordCriteria } from "../types"

interface UsePasswordValidationProps {
  password: string
  confirmPassword?: string
}

interface UsePasswordValidationReturn {
  passwordStrength: number
  passwordCriteria: PasswordCriteria
  isValid: boolean
}

export function usePasswordValidation({
  password,
  confirmPassword = "",
}: UsePasswordValidationProps): UsePasswordValidationReturn {
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordCriteria, setPasswordCriteria] = useState<PasswordCriteria>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
    match: false,
  })
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    // Check criteria
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
      match: password === confirmPassword && password !== "",
    }

    setPasswordCriteria(criteria)

    // Calculate strength percentage
    const criteriaCount = Object.values(criteria).filter(Boolean).length
    const strengthPercentage = Math.floor((criteriaCount / 6) * 100)
    setPasswordStrength(strengthPercentage)

    // Password is valid if all criteria are met
    setIsValid(Object.values(criteria).every(Boolean))
  }, [password, confirmPassword])

  return {
    passwordStrength,
    passwordCriteria,
    isValid,
  }
}

