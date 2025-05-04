/**
 * Admin Authentication Layout Component
 *
 * This component provides a consistent layout for all admin authentication pages.
 * It includes a header, main content area, and footer.
 */

import type { ReactNode } from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

interface AuthLayoutProps {
  children: ReactNode
  showBackToLogin?: boolean
  showBackToWelcome?: boolean
}

export function AuthLayout({ children, showBackToLogin = false, showBackToWelcome = false }: AuthLayoutProps) {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full border-b py-3 sm:py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/webapp" className="text-lg sm:text-xl font-bold text-foreground">
            Big Paws Pet Hotel <span className="text-primary">Admin</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6">{children}</main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} Big Paws Pet Hotel. All rights reserved.</p>
          {(showBackToLogin || showBackToWelcome) && (
            <div className="mt-2">
              {showBackToLogin && (
                <Link href="/webapp/auth/admin/login" className="text-primary hover:underline">
                  Back to Admin Login
                </Link>
              )}
              {showBackToWelcome && (
                <Link href="/webapp" className="text-primary hover:underline ml-4">
                  Back to Welcome
                </Link>
              )}
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}
