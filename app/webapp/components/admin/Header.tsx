"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, LogOut, Menu, Users, Settings, BarChart } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function AdminHeader() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = () => {
    setIsLoggingOut(true)
    // Simulate logout process
    setTimeout(() => {
      router.push("/webapp/auth/login")
      setIsLoggingOut(false)
    }, 1000)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/webapp" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png"
              alt="Big Paws Pet Hotel Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <span className="font-bold text-lg hidden sm:inline-block">Admin Portal</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/webapp/admin/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            <BarChart className="h-4 w-4 inline-block mr-1" />
            Dashboard
          </Link>
          <Link href="/webapp/admin/customers" className="text-sm font-medium transition-colors hover:text-primary">
            <Users className="h-4 w-4 inline-block mr-1" />
            Customers
          </Link>
          <Link href="/webapp/admin/settings" className="text-sm font-medium transition-colors hover:text-primary">
            <Settings className="h-4 w-4 inline-block mr-1" />
            Settings
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                <Link
                  href="/webapp/admin/dashboard"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  <BarChart className="h-4 w-4 inline-block mr-1" />
                  Dashboard
                </Link>
                <Link
                  href="/webapp/admin/customers"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  <Users className="h-4 w-4 inline-block mr-1" />
                  Customers
                </Link>
                <Link
                  href="/webapp/admin/settings"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  <Settings className="h-4 w-4 inline-block mr-1" />
                  Settings
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

