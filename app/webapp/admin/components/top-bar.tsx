"use client";

import { useState } from "react";
import { Bell, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function TopBar() {
  const [notifications, setNotifications] = useState(3);
  const router = useRouter();
  const { toast } = useToast();

  // Handle navigation to profile and settings
  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Handle logout with confirmation
  const handleLogout = () => {
    try {
      // Show confirmation toast
      toast({
        title: "Logging out...",
        description: "You will be redirected to the login page.",
      });

      // BACKEND INTEGRATION POINT:
      // Replace this with your actual logout API call
      // Example: await authService.logout();

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
    }
  };

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="flex flex-1 items-center md:ml-16 lg:ml-0">
        {/* Search bar removed as requested */}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigateTo("/webapp/admin/notifications")}
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                >
                  {notifications}
                </Badge>
              </motion.div>
            )}
          </Button>
        </div>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/default-images/default-pic.png"
                  alt="Admin"
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  AJ
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin Jenie</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@bigpaws.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigateTo("/webapp/admin/settings/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigateTo("/webapp/admin/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
