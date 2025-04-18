  /**
 * Utility functions for theme management
 */

/**
 * Get the current theme from localStorage or system preference
 *
 * @returns 'dark' or 'light'
 */
export const getTheme = (): string => {
  if (typeof window === "undefined") return "light"

  // Check localStorage first
  const storedTheme = localStorage.getItem("theme")
  if (storedTheme) {
    return storedTheme
  }

  // Fall back to system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

/**
 * Set the theme in localStorage and apply it to the document
 *
 * @param theme - 'dark' or 'light'
 */
export const setTheme = (theme: string): void => {
  if (typeof window === "undefined") return

  localStorage.setItem("theme", theme)

  // Apply theme to document
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

/**
 * Toggle between dark and light themes
 */
export const toggleTheme = (): void => {
  const currentTheme = getTheme()
  const newTheme = currentTheme === "dark" ? "light" : "dark"
  setTheme(newTheme)
}

