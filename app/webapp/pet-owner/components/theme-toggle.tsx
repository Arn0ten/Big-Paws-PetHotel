"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTheme, setTheme } from "../../utils/theme-helpers";

export default function ThemeToggle({
  onThemeChange,
}: {
  onThemeChange?: (theme: string) => void;
}) {
  const [theme, setThemeState] = useState<string>("light");

  useEffect(() => {
    const currentTheme = getTheme();
    setThemeState(currentTheme);
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
    onThemeChange?.(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setThemeState(newTheme);
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    onThemeChange?.(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="border border-gray-300"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
