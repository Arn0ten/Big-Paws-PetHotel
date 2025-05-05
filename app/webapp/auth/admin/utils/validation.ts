/**
 * Admin Authentication Validation Utilities
 *
 * This file contains validation functions used across admin authentication components.
 * Admin validation includes stricter password requirements.
 */

// Validate email format
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate phone number format (simple check for numbers only)
export function isValidPhone(phone: string): boolean {
  return /^\d+$/.test(phone);
}

// Validate contact (email or phone)
export function validateContact(contact: string): {
  isValid: boolean;
  error?: string;
} {
  if (!contact.trim()) {
    return { isValid: false, error: "Email or phone number is required" };
  }

  if (contact.includes("@") && !isValidEmail(contact)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  // Philippine phone number validation (starts with 09 and has 11 digits total)
  if (!contact.includes("@")) {
    // Check if it's a Philippine mobile number (09XXXXXXXXX format)
    const isPhilippineFormat = /^09\d{9}$/.test(contact);
    if (!isPhilippineFormat) {
      return {
        isValid: false,
        error: "Please enter a valid Philippine phone number (09XXXXXXXXX)",
      };
    }
  }

  return { isValid: true };
}

// Validate password with stricter requirements for admin
export function validatePassword(
  password: string,
  isAdmin = true,
): { isValid: boolean; error?: string } {
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }

  // Admin passwords require at least 10 characters
  if (isAdmin && password.length < 10) {
    return {
      isValid: false,
      error: "Admin password must be at least 10 characters long",
    };
  } else if (!isAdmin && password.length < 8) {
    return {
      isValid: false,
      error: "Password must be at least 8 characters long",
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one uppercase letter",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one lowercase letter",
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one number",
    };
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one special character",
    };
  }

  // Admin passwords require at least 2 special characters
  if (isAdmin) {
    const specialChars = password.match(/[^A-Za-z0-9]/g) || [];
    if (specialChars.length < 2) {
      return {
        isValid: false,
        error: "Admin password must contain at least two special characters",
      };
    }
  }

  return { isValid: true };
}

// Validate password confirmation
export function validatePasswordConfirmation(
  password: string,
  confirmPassword: string,
): { isValid: boolean; error?: string } {
  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" };
  }

  return { isValid: true };
}
