"use client"

import { useState, useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { AdminSidebar } from "./components/sidebar"
import { TopBar } from "./components/top-bar"
import { AdminFooter } from "./components/admin-footer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextPath, setNextPath] = useState<string | null>(null)
  const [hasError, setHasError] = useState(false)

  // Add these refs after the state declarations
  const wasMobile = useRef(false)
  const previousDesktopState = useRef(false)

  useEffect(() => {
    // Only auto-collapse on initial mobile view or when explicitly changing to mobile
    if (isMobile && !wasMobile.current) {
      setIsCollapsed(true)
    } else if (!isMobile && wasMobile.current) {
      // Restore previous state when returning to desktop
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

  // Listen for sidebar state changes
  useEffect(() => {
    const handleSidebarChange = (e: CustomEvent) => {
      setIsCollapsed(e.detail.isCollapsed)
    }

    window.addEventListener("sidebarStateChange" as any, handleSidebarChange)
    return () => {
      window.removeEventListener("sidebarStateChange" as any, handleSidebarChange)
    }
  }, [])

  // Listen for page transition events
  useEffect(() => {
    const handlePageTransition = (e: CustomEvent) => {
      try {
        setIsTransitioning(true)
        setNextPath(e.detail.href)
      } catch (error) {
        console.error("Page transition error:", error)
        setIsTransitioning(false)
        setHasError(true)
        // Reset error state after a delay
        setTimeout(() => setHasError(false), 1000)
      }
    }

    window.addEventListener("pageTransitionStart" as any, handlePageTransition)
    return () => {
      window.removeEventListener("pageTransitionStart" as any, handlePageTransition)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AdminSidebar onCollapse={setIsCollapsed} />
      <div
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          isMobile ? "ml-0" : isCollapsed ? "ml-20" : "ml-[280px]",
        )}
      >
        <TopBar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full max-w-full overflow-hidden">
          <AnimatePresence
            mode="wait"
            onExitComplete={() => {
              if (hasError) {
                setIsTransitioning(false)
                setNextPath(null)
              }
            }}
          >
            <motion.div
              key={pathname}
              initial={{
                opacity: 0,
                x: isTransitioning ? -100 : 100,
              }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.25, 1, 0.5, 1],
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                },
              }}
              exit={{
                opacity: 0,
                x: -100,
                transition: {
                  duration: 0.2,
                  ease: "easeOut",
                },
              }}
              onAnimationComplete={() => {
                setIsTransitioning(false)
                setNextPath(null)
              }}
              onAnimationStart={() => {
                // Reset any error state when animation starts
                setHasError(false)
              }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <AdminFooter />
      </div>
    </div>
  )
}

