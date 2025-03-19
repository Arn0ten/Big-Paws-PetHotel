"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

/**
 * WebApp Layout Component
 *
 * BACKEND INTEGRATION POINTS:
 * 1. Authentication state management should be implemented here
 * 2. Implement a proper auth provider that:
 *    - Checks for valid session/token on mount
 *    - Provides login/logout functionality
 *    - Handles session expiration
 *    - Redirects unauthenticated users to login page
 *
 * Example implementation:
 * - Create an AuthProvider component that wraps the children
 * - Use React Context to provide auth state and methods
 * - Implement API calls to your backend auth endpoints
 */
export default function ClientWebAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid hydration mismatch with theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className={`${inter.className} min-h-screen bg-background`}>
        {children}
      </div>
    </ThemeProvider>
  );
}
