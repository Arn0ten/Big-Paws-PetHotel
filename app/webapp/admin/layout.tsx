"use client";

import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { AdminSidebar } from "./components/sidebar";
import { TopBar } from "./components/top-bar";
import { AdminFooter } from "./components/admin-footer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();
  const wasMobile = useRef(false);
  const previousDesktopState = useRef(false);

  // Simplified state management to avoid transition issues
  useEffect(() => {
    if (isMobile && !wasMobile.current) {
      setIsCollapsed(true);
    } else if (!isMobile && wasMobile.current) {
      setIsCollapsed(previousDesktopState.current);
    }

    wasMobile.current = isMobile;
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      previousDesktopState.current = isCollapsed;
    }
  }, [isCollapsed, isMobile]);

  useEffect(() => {
    const handleSidebarChange = (e: CustomEvent) => {
      setIsCollapsed(e.detail.isCollapsed);
    };

    window.addEventListener("sidebarStateChange" as any, handleSidebarChange);
    return () => {
      window.removeEventListener(
        "sidebarStateChange" as any,
        handleSidebarChange,
      );
    };
  }, []);

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
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
