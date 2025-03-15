"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  PawPrint,
  Users,
  UserPlus,
  ClipboardList,
  Bell,
  History,
  Settings,
  ChevronLeft,
  Menu,
  ChevronRight,
  LogOut,
  CalendarClock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/webapp/admin/dashboard",
    section: "main",
    color: "text-blue-500",
  },
  {
    title: "MANAGEMENT",
    section: "management",
    type: "header",
  },
  {
    title: "Pet Management",
    icon: PawPrint,
    href: "/webapp/admin/pets",
    section: "management",
    color: "text-emerald-500",
  },
  {
    title: "Pet Owner Management",
    icon: Users,
    href: "/webapp/admin/pet-owners",
    section: "management",
    color: "text-violet-500",
  },
  {
    title: "Pet Owner Registration",
    icon: UserPlus,
    href: "/webapp/admin/registration",
    section: "management",
    color: "text-pink-500",
  },
  {
    title: "Boarding Management",
    icon: CalendarClock,
    href: "/webapp/admin/boarding",
    section: "management",
    color: "text-orange-500",
  },
  {
    title: "Request Management",
    icon: ClipboardList,
    href: "/webapp/admin/request-management",
    section: "management",
    color: "text-amber-500",
  },
  {
    title: "REQUESTS",
    section: "requests",
    type: "header",
  },
  {
    title: "Requests",
    icon: Bell,
    href: "/webapp/admin/requests",
    section: "requests",
    color: "text-red-500",
  },
  {
    title: "REPORTS",
    section: "reports",
    type: "header",
  },
  {
    title: "History",
    icon: History,
    href: "/webapp/admin/history",
    section: "reports",
    color: "text-cyan-500",
  },
  {
    title: "SETTINGS",
    section: "settings",
    type: "header",
  },
  {
    title: "System Settings",
    icon: Settings,
    href: "/webapp/admin/settings",
    section: "settings",
    color: "text-gray-500",
  },
]

interface AdminSidebarProps {
  onCollapse?: (collapsed: boolean) => void
}

export function AdminSidebar({ onCollapse }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Add these refs after the state declarations
  const wasMobile = useRef(false)
  const previousDesktopState = useRef<boolean | undefined>(undefined)

  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Add this at the top of the component
  useEffect(() => {
    const handleError = (error: Error) => {
      console.error("Sidebar error:", error)
      // Prevent complete UI crash by handling errors
    }

    window.addEventListener("error", handleError as any)
    return () => {
      window.removeEventListener("error", handleError as any)
    }
  }, [])

  // Update the auto-collapse on mobile useEffect
  useEffect(() => {
    if (isMobile && !wasMobile.current) {
      setIsCollapsed(true)
    } else if (!isMobile && wasMobile.current && previousDesktopState.current !== undefined) {
      // Restore previous desktop state when returning to desktop
      setIsCollapsed(previousDesktopState.current)
    }

    // Track previous state
    wasMobile.current = isMobile
  }, [isMobile])

  // Add a useEffect to track desktop sidebar state
  useEffect(() => {
    if (!isMobile) {
      previousDesktopState.current = isCollapsed
    }
  }, [isCollapsed, isMobile])

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleSidebar = () => {
    try {
      const newCollapsedState = isMobile ? isCollapsed : !isCollapsed
      setIsCollapsed(newCollapsedState)

      if (isMobile) {
        setIsMobileMenuOpen(!isMobileMenuOpen)
      }

      // Store desktop state for restoration
      if (!isMobile) {
        previousDesktopState.current = newCollapsedState
      }

      // Notify parent component
      if (onCollapse) {
        onCollapse(newCollapsedState)
      }

      // Dispatch custom event for other components that need to know about sidebar state
      const event = new CustomEvent("sidebarStateChange", {
        detail: { isCollapsed: newCollapsedState },
      })
      window.dispatchEvent(event as any)
    } catch (error) {
      console.error("Sidebar toggle error:", error)
      // Prevent complete UI crash by handling errors
    }
  }

  const router = useRouter()

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    // Check if we're already on this page to prevent unnecessary transitions
    if (pathname === href) return

    try {
      // First, dispatch a custom event to animate the current page out
      const event = new CustomEvent("pageTransitionStart", {
        detail: { href },
      })
      window.dispatchEvent(event)

      // Then navigate after a short delay with error handling
      setTimeout(() => {
        try {
          router.push(href)
        } catch (error) {
          console.error("Navigation error:", error)
          // Fallback to direct navigation if router.push fails
          window.location.href = href
        }
      }, 300)
    } catch (error) {
      console.error("Navigation error:", error)
      // Fallback to direct navigation if anything fails
      window.location.href = href
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => {
            setIsMobileMenuOpen(false)
            if (onCollapse) onCollapse(true)
          }}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isMobile ? (isMobileMenuOpen ? 280 : 0) : isCollapsed ? 80 : 280,
          x: isMobile && !isMobileMenuOpen ? -280 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white",
          "border-r border-slate-700 shadow-xl overflow-hidden",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {(!isCollapsed || (isMobile && isMobileMenuOpen)) && (
            <Link href="/webapp/admin/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                <PawPrint size={18} />
              </div>
              <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Big Paws
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-slate-400 hover:text-white hover:bg-slate-700"
            onClick={toggleSidebar}
          >
            {isCollapsed && !isMobile ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>

        <div
          className="h-[calc(100vh-8rem)] overflow-y-auto px-2 py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
          ref={(el) => {
            // Add a ref to properly manage the scrollbar
            if (el) {
              try {
                // Reset scroll position on route changes to prevent scroll position issues
                const handleRouteChange = () => {
                  el.scrollTop = 0
                }

                window.addEventListener("routeChangeComplete", handleRouteChange)
                return () => {
                  window.removeEventListener("routeChangeComplete", handleRouteChange)
                }
              } catch (error) {
                console.error("Sidebar scroll error:", error)
                // Continue rendering even if scroll handling fails
              }
            }
          }}
        >
          {/* Wrap the navigation in an error boundary */}
          <nav className="space-y-1">
            {(() => {
              try {
                return menuItems.map((item, index) => {
                  if (item.type === "header") {
                    return !isCollapsed || (isMobile && isMobileMenuOpen) ? (
                      <div
                        key={`header-${index}`}
                        className="px-4 py-2 text-xs font-semibold text-slate-400 mt-4 first:mt-0"
                      >
                        {item.title}
                      </div>
                    ) : null
                  }

                  if (!item.href) return null

                  const isActive = pathname === item.href
                  const Icon = item.icon

                  return (
                    <Link
                      key={`item-${index}`}
                      href={item.href}
                      onClick={(e) => item.href && handleNavigation(e, item.href)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all",
                        "hover:bg-slate-700/50 hover:text-white",
                        isActive ? "bg-slate-700/70 text-white font-medium" : "",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-md",
                          isActive ? `${item.color} bg-slate-800` : "text-slate-400",
                        )}
                      >
                        <Icon size={18} />
                      </div>

                      {(!isCollapsed || (isMobile && isMobileMenuOpen)) && (
                        <span className="text-sm">{item.title}</span>
                      )}

                      {isActive && (!isCollapsed || (isMobile && isMobileMenuOpen)) && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto h-2 w-2 rounded-full bg-blue-500"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  )
                })
              } catch (error) {
                console.error("Sidebar menu rendering error:", error)
                // Fallback UI if menu rendering fails
                return (
                  <div className="p-4 text-slate-300">
                    <p>Menu loading error. Please try refreshing.</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-slate-300 border-slate-600"
                      onClick={() => window.location.reload()}
                    >
                      Refresh
                    </Button>
                  </div>
                )
              }
            })()}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-700 p-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700",
              !isCollapsed || (isMobile && isMobileMenuOpen) ? "px-3" : "px-0 justify-center",
            )}
          >
            <LogOut size={18} className="mr-2" />
            {(!isCollapsed || (isMobile && isMobileMenuOpen)) && "Log Out"}
          </Button>
        </div>
      </motion.div>

      {/* Mobile menu button - only show when sidebar is closed */}
      {isMobile && !isMobileMenuOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-3 z-50 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 lg:hidden"
          onClick={() => {
            setIsMobileMenuOpen(true)
            if (onCollapse) onCollapse(false)
          }}
        >
          <Menu size={24} />
        </Button>
      )}
    </>
  )
}

