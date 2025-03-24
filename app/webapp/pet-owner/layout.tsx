"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Bell,
  User,
  DollarSign,
  LogOut,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import ThemeToggle from "./components/theme-toggle";
import BottomNavigation from "./components/bottom-navigation";
import { getUnreadNotificationsCount } from "../data/sample-data";

export default function PetOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Simple mount effect without dependencies to avoid re-renders
  useEffect(() => {
    setIsMounted(true);
    // No cleanup needed for this simple state
  }, []);

  // Get unread count only once when component mounts
  const unreadCount = getUnreadNotificationsCount();

  //Nav items ni pag desktop view
  const navItems = [
    {
      name: "Home",
      href: "/webapp/pet-owner",
      icon: Home,
      exact: true,
    },
    {
      name: "Requests",
      href: "/webapp/pet-owner/requests",
      icon: FileText,
    },
    {
      name: "Media Archive",
      href: "/webapp/pet-owner/media-archive",
      icon: ImageIcon,
    },
    {
      name: "Notifications",
      href: "/webapp/pet-owner/notifications",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : null,
      badgeColor: "bg-emerald-500 text-white",
    },
    {
      name: "Pricing",
      href: "/webapp/pet-owner/pricing",
      icon: DollarSign,
      iconColor: "text-emerald-600 dark:text-emerald-500",
    },
    {
      name: "Profile",
      href: "/webapp/pet-owner/profile",
      icon: User,
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border dark:border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/webapp/pet-owner" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogo-AkdNb3dVilOpSFaUX922eFxqhj5Dq2.png"
                alt="Big Paws Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-bold text-lg text-foreground dark:text-foreground">
              Big Paws
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isMounted && <ThemeToggle />}
            <Button variant="ghost" size="icon" className="md:hidden" asChild>
              <Link href="/webapp/pet-owner/pricing" aria-label="Pricing">
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
              </Link>
            </Button>
            <Avatar className="h-8 w-8 md:hidden">
              <AvatarImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/default-pic-TTy4UvlTr4nVP0etctSbFI1CUrupvH.png"
                alt="User"
              />
              <AvatarFallback className="bg-primary/10 text-primary dark:bg-primary/20">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:w-64 md:flex md:flex-col md:border-r md:border-border dark:md:border-border/50 md:bg-background/95 md:pt-16">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center gap-2 px-2">
            <Avatar>
              <AvatarImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/default-pic-TTy4UvlTr4nVP0etctSbFI1CUrupvH.png"
                alt="User"
              />
              <AvatarFallback className="bg-primary/10 text-primary dark:bg-primary/20">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground dark:text-foreground">
              Sarah Johnson
              </p>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
              sarah.j@example.com
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-accent text-accent-foreground dark:bg-accent/80"
                      : "text-foreground/90 dark:text-foreground/90",
                  )}
                >
                  <div className="relative">
                    <item.icon className={cn("h-5 w-5", item.iconColor)} />
                    {item.badge && (
                      <span
                        className={cn(
                          "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium",
                          item.badgeColor ||
                            "bg-primary text-primary-foreground",
                        )}
                      >
                        {item.badge > 9 ? "9+" : item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-base">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-4">
            <Button
              variant="outline"
              className="w-full justify-start text-base font-medium text-foreground dark:text-foreground"
              asChild
            >
              <Link href="/webapp/auth/login">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:pl-64">
        <div className="container max-w-screen-md mx-auto p-4 sm:p-6 pb-20 md:pb-6">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
