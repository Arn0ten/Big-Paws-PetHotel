"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTheme, setTheme } from "../../utils/theme-helpers"

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<string>("light")

  useEffect(() => {
    // Initialize theme on component mount
    const currentTheme = getTheme()
    setThemeState(currentTheme)

    // Apply theme to document
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setThemeState(newTheme)
    setTheme(newTheme)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="text-primary"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}

