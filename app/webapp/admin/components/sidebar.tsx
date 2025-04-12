"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PawPrint,
  Users,
  UserPlus,
  ClipboardList,
  Bell,
  History,
  ChevronLeft,
  Menu,
  ChevronRight,
  LogOut,
  CalendarClock,
} from "lucide-react";
import { FaChartSimple } from "react-icons/fa6";
import { MdPets } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { HiUserAdd } from "react-icons/hi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import {
  VscGitPullRequestNewChanges,
  VscGitPullRequestGoToChanges,
} from "react-icons/vsc";
import { FaHistory } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { LogoutConfirmationDialog } from "@/components/ui/logout-confirmation-dialog";

const menuItems = [
  {
    title: "Dashboard",
    icon: FaChartSimple,
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
    icon: MdPets,
    href: "/webapp/admin/pets",
    section: "management",
    color: "text-emerald-500",
  },
  {
    title: "Pet Owner Management",
    icon: HiUsers,
    href: "/webapp/admin/pet-owners",
    section: "management",
    color: "text-violet-500",
  },
  {
    title: "Pet Owner Registration",
    icon: HiUserAdd,
    href: "/webapp/admin/registration",
    section: "management",
    color: "text-pink-500",
  },
  {
    title: "Boarding Management",
    icon: RiCalendarScheduleFill,
    href: "/webapp/admin/boarding",
    section: "management",
    color: "text-orange-500",
  },
  {
    title: "Request Management",
    icon: VscGitPullRequestGoToChanges,
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
    icon: VscGitPullRequestNewChanges,
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
    icon: FaHistory,
    href: "/webapp/admin/history",
    section: "reports",
    color: "text-cyan-500",
  },
];

interface AdminSidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

export function AdminSidebar({ onCollapse }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  // Add state for notification counters
  const [viewedNotifications, setViewedNotifications] = useState<
    Record<string, boolean>
  >({});

  // Sample notification counts - in a real app, this would come from an API
  const [notificationCounts, setNotificationCounts] = useState({
    "/webapp/admin/requests": 10, // 10 unread new requests (sample data)
    "/webapp/admin/request-management": 5, // 5 unread "In Progress" requests (sample data)
  });

  // Add these refs after the state declarations
  const wasMobile = useRef(false);
  const previousDesktopState = useRef<boolean | undefined>(undefined);

  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Add this at the top of the component
  useEffect(() => {
    const handleError = (error: Error) => {
      console.error("Sidebar error:", error);
      // Prevent complete UI crash by handling errors
    };

    window.addEventListener("error", handleError as any);
    return () => {
      window.removeEventListener("error", handleError as any);
    };
  }, []);
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      // Show confirmation toast
      toast({
        title: "Log Out",
        description: "You will be redirected to the login page.",
      });

      // BACKEND INTEGRATION POINT:
      // Replace this with your actual logout API call
      // Example: await authService.logout();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For now, we'll just clear local storage and redirect
      localStorage.removeItem("user");
      localStorage.removeItem("auth_token");

      // Redirect to login page
      router.push("/webapp/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsLoggingOut(false);
    }
  };
  // Add this useEffect to periodically fetch notification counts
  useEffect(() => {
    // BACKEND INTEGRATION POINT:
    // In a real implementation, you would fetch the actual notification counts from your API
    // The counts should represent:
    // 1. For "/webapp/admin/requests": Number of unread NEW requests
    // 2. For "/webapp/admin/request-management": Number of unread IN PROGRESS requests
    //
    // Example implementation:
    // const fetchNotificationCounts = async () => {
    //   try {
    //     const response = await fetch('/api/admin/notifications/counts');
    //     const data = await response.json();
    //     setNotificationCounts({
    //       "/webapp/admin/requests": data.unreadNewRequestsCount,
    //       "/webapp/admin/request-management": data.unreadInProgressRequestsCount,
    //     });
    //   } catch (error) {
    //     console.error('Failed to fetch notification counts:', error);
    //   }
    // };
    //
    // fetchNotificationCounts();
    // const interval = setInterval(fetchNotificationCounts, 30000); // Refresh every 30 seconds
    //
    // return () => clearInterval(interval);
    // For this demo, we're using fixed sample values (10 and 5)
  }, []);

  // Update the auto-collapse on mobile useEffect
  useEffect(() => {
    if (isMobile && !wasMobile.current) {
      setIsCollapsed(true);
    } else if (
      !isMobile &&
      wasMobile.current &&
      previousDesktopState.current !== undefined
    ) {
      // Restore previous desktop state when returning to desktop
      setIsCollapsed(previousDesktopState.current);
    }

    // Track previous state
    wasMobile.current = isMobile;
  }, [isMobile]);

  // Add a useEffect to track desktop sidebar state
  useEffect(() => {
    if (!isMobile) {
      previousDesktopState.current = isCollapsed;
    }
  }, [isCollapsed, isMobile]);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleSidebar = () => {
    try {
      const newCollapsedState = isMobile ? isCollapsed : !isCollapsed;
      setIsCollapsed(newCollapsedState);

      if (isMobile) {
        setIsMobileMenuOpen(!isMobileMenuOpen);
      }

      // Store desktop state for restoration
      if (!isMobile) {
        previousDesktopState.current = newCollapsedState;
      }

      // Notify parent component
      if (onCollapse) {
        onCollapse(newCollapsedState);
      }

      // Dispatch custom event for other components that need to know about sidebar state
      const event = new CustomEvent("sidebarStateChange", {
        detail: { isCollapsed: newCollapsedState },
      });
      window.dispatchEvent(event as any);
    } catch (error) {
      console.error("Sidebar toggle error:", error);
      // Prevent complete UI crash by handling errors
    }
  };

  const router = useRouter();

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    // Mark notifications as read when clicking on a menu item
    if (notificationCounts[href] && !viewedNotifications[href]) {
      setViewedNotifications((prev) => ({
        ...prev,
        [href]: true,
      }));

      // BACKEND INTEGRATION POINT:
      // Here you would call your API to mark these specific notifications as read
      // For "/webapp/admin/requests": Mark all NEW requests as read
      // For "/webapp/admin/request-management": Mark all IN PROGRESS requests as read
      //
      // Example implementation:
      // if (href === "/webapp/admin/requests") {
      //   fetch('/api/admin/notifications/mark-read', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ type: 'new_requests' })
      //   });
      // } else if (href === "/webapp/admin/request-management") {
      //   fetch('/api/admin/notifications/mark-read', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ type: 'in_progress_requests' })
      //   });
      // }
    }

    // Check if we're already on this page to prevent unnecessary transitions
    if (pathname === href) return;

    try {
      // First, dispatch a custom event to animate the current page out
      const event = new CustomEvent("pageTransitionStart", {
        detail: { href },
      });
      window.dispatchEvent(event);

      // Then navigate after a short delay with error handling
      setTimeout(() => {
        try {
          router.push(href);
        } catch (error) {
          console.error("Navigation error:", error);
          // Fallback to direct navigation if router.push fails
          window.location.href = href;
        }
      }, 300);
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback to direct navigation if anything fails
      window.location.href = href;
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => {
            setIsMobileMenuOpen(false);
            if (onCollapse) onCollapse(true);
          }}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isMobile
            ? isMobileMenuOpen
              ? 280
              : 0
            : isCollapsed
              ? 80
              : 280,
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
            <Link
              href="/webapp/admin/dashboard"
              className="flex items-center gap-2"
            >
              <div className="flex items-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/main-logo-dark-kytTGWlLTF0sp9UhYxhJmTAZ3prDO8.png"
                  alt="Big Paws Logo"
                  width={200}
                  height={60}
                  className="h-8 w-auto sm:h-10 md:h-12"
                />
              </div>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-slate-400 hover:text-white hover:bg-slate-700"
            onClick={toggleSidebar}
          >
            {isCollapsed && !isMobile ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
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
                  el.scrollTop = 0;
                };

                window.addEventListener(
                  "routeChangeComplete",
                  handleRouteChange,
                );
                return () => {
                  window.removeEventListener(
                    "routeChangeComplete",
                    handleRouteChange,
                  );
                };
              } catch (error) {
                console.error("Sidebar scroll error:", error);
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
                    ) : null;
                  }

                  if (!item.href) return null;

                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  // Check if this menu item has notifications
                  const hasNotifications =
                    notificationCounts[item.href] &&
                    !viewedNotifications[item.href];
                  const notificationCount = hasNotifications
                    ? notificationCounts[item.href]
                    : 0;

                  return (
                    <Link
                      key={`item-${index}`}
                      href={item.href}
                      onClick={(e) =>
                        item.href && handleNavigation(e, item.href)
                      }
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all",
                        "hover:bg-slate-700/50 hover:text-white",
                        isActive
                          ? "bg-slate-700/70 text-white font-medium"
                          : "",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-md relative",
                          isActive
                            ? `${item.color} bg-slate-800`
                            : "text-slate-400",
                        )}
                      >
                        <Icon size={18} />

                        {/* Notification counter badge */}
                        {hasNotifications && (
                          <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold bg-red-500 text-white rounded-full px-1">
                            {notificationCount > 99 ? "99+" : notificationCount}
                          </div>
                        )}
                      </div>

                      {(!isCollapsed || (isMobile && isMobileMenuOpen)) && (
                        <span className="text-sm">{item.title}</span>
                      )}

                      {isActive &&
                        (!isCollapsed || (isMobile && isMobileMenuOpen)) && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="ml-auto h-2 w-2 rounded-full bg-blue-500"
                            transition={{ duration: 0.2 }}
                          />
                        )}
                    </Link>
                  );
                });
              } catch (error) {
                console.error("Sidebar menu rendering error:", error);
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
                );
              }
            })()}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-700 p-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700",
              !isCollapsed || (isMobile && isMobileMenuOpen)
                ? "px-3"
                : "px-0 justify-center",
            )}
            onClick={() => setLogoutDialogOpen(true)}
          >
            <BiLogOut size={18} className="mr-2" />
            {(!isCollapsed || (isMobile && isMobileMenuOpen)) && "Log Out"}
          </Button>
        </div>
      </motion.div>
      {/* Logout confirmation dialog */}
      <LogoutConfirmationDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
        title="Log Out"
        description="Are you sure you want to log out from the admin panel?"
        confirmText="Log Out"
      />

      {/* Mobile menu button - only show when sidebar is closed */}
      {isMobile && !isMobileMenuOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-3 z-50 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 lg:hidden"
          onClick={() => {
            setIsMobileMenuOpen(true);
            if (onCollapse) onCollapse(false);
          }}
        >
          <Menu size={24} />
        </Button>
      )}
    </>
  );
}
