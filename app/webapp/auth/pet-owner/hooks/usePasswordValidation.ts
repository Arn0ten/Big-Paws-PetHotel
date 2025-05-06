"use client";

/**
 * Pet Owner Password Validation Hook
 *
 * A custom hook that handles password validation logic for pet owner users.
 */

import { useState, useEffect } from "react";
import type { PasswordCriteria } from "../types";

interface UsePasswordValidationProps {
  password?: string;
  confirmPassword?: string;
}

interface UsePasswordValidationReturn {
  passwordStrength: number;
  passwordCriteria: PasswordCriteria;
  isValid: boolean;
  passwordErrors: string[];
  validatePassword: (password: string) => boolean;
}

export function usePasswordValidation({
  password = "",
  confirmPassword = "",
}: UsePasswordValidationProps = {}): UsePasswordValidationReturn {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordCriteria, setPasswordCriteria] = useState<PasswordCriteria>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
    match: false,
  });
  const [isValid, setIsValid] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  useEffect(() => {
    // Check criteria
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
      match: password === confirmPassword && password !== "",
    };

    setPasswordCriteria(criteria);

    // Calculate strength percentage
    const criteriaCount = Object.values(criteria).filter(Boolean).length;
    const strengthPercentage = Math.floor((criteriaCount / 6) * 100);
    setPasswordStrength(strengthPercentage);

    // Password is valid if all criteria are met
    setIsValid(Object.values(criteria).every(Boolean));

    // Set errors
    const errors: string[] = [];
    if (!criteria.length)
      errors.push("Password must be at least 8 characters long");
    if (!criteria.uppercase)
      errors.push("Password must contain at least one uppercase letter");
    if (!criteria.lowercase)
      errors.push("Password must contain at least one lowercase letter");
    if (!criteria.number)
      errors.push("Password must contain at least one number");
    if (!criteria.symbol)
      errors.push("Password must contain at least one special character");
    if (confirmPassword && !criteria.match)
      errors.push("Passwords do not match");

    setPasswordErrors(errors);
  }, [password, confirmPassword]);

  const validatePassword = (pwd: string): boolean => {
    return (
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[^A-Za-z0-9]/.test(pwd)
    );
  };

  return {
    passwordStrength,
    passwordCriteria,
    isValid,
    passwordErrors,
    validatePassword,
  };
}
