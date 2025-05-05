/**
 * Utility function to determine if a contact is an email or phone number
 */
export function isEmail(contact: string): boolean {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(contact);
}

export function isPhoneNumber(contact: string): boolean {
  // Philippine phone number: 09XXXXXXXXX or +639XXXXXXXXX
  const phoneRegex = /^(09\d{9}|\+639\d{9})$/;
  return phoneRegex.test(contact.replace(/\s+/g, ""));
}

export function getContactType(contact: string): "email" | "phone" | "unknown" {
  if (isEmail(contact)) return "email";
  if (isPhoneNumber(contact)) return "phone";
  return "unknown";
}
