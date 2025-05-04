// /**
//  * Authentication Validation Utilities
//  *
//  * This file contains validation functions used across authentication components.
//  * Centralizing validation logic ensures consistency and makes it easier to update.
//  */

// // Validate email format
// export function isValidEmail(email: string): boolean {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
// }

// // Validate phone number format (simple check for numbers only)
// export function isValidPhone(phone: string): boolean {
//   return /^\d+$/.test(phone)
// }

// // Validate contact (email or phone)
// export function validateContact(contact: string): { isValid: boolean; error?: string } {
//   if (!contact.trim()) {
//     return { isValid: false, error: "Email or phone number is required" }
//   }

//   if (contact.includes("@") && !isValidEmail(contact)) {
//     return { isValid: false, error: "Please enter a valid email address" }
//   }

//   if (!contact.includes("@") && !isValidPhone(contact)) {
//     return { isValid: false, error: "Please enter a valid phone number (numbers only)" }
//   }

//   return { isValid: true }
// }

// // Validate password
// export function validatePassword(password: string): { isValid: boolean; error?: string } {
//   if (!password) {
//     return { isValid: false, error: "Password is required" }
//   }

//   if (password.length < 8) {
//     return { isValid: false, error: "Password must be at least 8 characters long" }
//   }

//   if (!/[A-Z]/.test(password)) {
//     return { isValid: false, error: "Password must contain at least one uppercase letter" }
//   }

//   if (!/[a-z]/.test(password)) {
//     return { isValid: false, error: "Password must contain at least one lowercase letter" }
//   }

//   if (!/[0-9]/.test(password)) {
//     return { isValid: false, error: "Password must contain at least one number" }
//   }

//   if (!/[^A-Za-z0-9]/.test(password)) {
//     return { isValid: false, error: "Password must contain at least one special character" }
//   }

//   return { isValid: true }
// }

// // Validate password confirmation
// export function validatePasswordConfirmation(
//   password: string,
//   confirmPassword: string,
// ): { isValid: boolean; error?: string } {
//   if (password !== confirmPassword) {
//     return { isValid: false, error: "Passwords do not match" }
//   }

//   return { isValid: true }
// }
