"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Bell, User, ImageIcon } from "lucide-react";
import { AiFillHome } from "react-icons/ai";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { IoNotifications } from "react-icons/io5";
import { MdPermMedia } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { getUnreadNotificationsCount } from "@/app/webapp/data/sample-data";
// BACKEND: Replace this with an API call to get the actual unread count
// Example: const [unreadCount, setUnreadCount] = useState(0)
//          useEffect(() => { fetch('/api/notifications/unread/count').then(res => res.json()).then(data => setUnreadCount(data.count)) }, [])

export default function BottomNavigation() {
  const pathname = usePathname();
  const unreadCount = getUnreadNotificationsCount();

  const navItems = [
    {
      name: "Home",
      href: "/webapp/pet-owner",
      icon: AiFillHome,
      exact: true,
    },
    {
      name: "Requests",
      href: "/webapp/pet-owner/requests",
      icon: VscGitPullRequestNewChanges,
    },
    {
      name: "Media",
      href: "/webapp/pet-owner/media-archive",
      icon: MdPermMedia,
    },
    {
      name: "Notifications",
      href: "/webapp/pet-owner/notifications",
      icon: IoNotifications,
      badge: unreadCount > 0 ? unreadCount : null,
      // BACKEND IMPLEMENTATION:
      // 1. The unreadCount should be fetched from the API when the component mounts
      // 2. Create an endpoint like GET /api/notifications/unread/count that returns the count
      // 3. Implement real-time updates using WebSockets or polling to update the badge
      // 4. When a notification is marked as read, decrement the count
      // 5. Store the read/unread status in the database for each notification
      // 6. Add a markAsRead endpoint: POST /api/notifications/:id/read
      // 7. Add a markAllAsRead endpoint: POST /api/notifications/read-all
      badgeColor: "bg-emerald-500 text-white",
    },
    {
      name: "Profile",
      href: "/webapp/pet-owner/profile",
      icon: FaUserAlt,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border dark:border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3",
                isActive
                  ? "text-primary"
                  : "text-foreground/80 dark:text-foreground/70 hover:text-foreground dark:hover:text-foreground",
              )}
            >
              <div className="relative">
                <item.icon className={cn("h-5 w-5", item.iconColor)} />
                {item.badge && (
                  <span
                    className={cn(
                      "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium",
                      item.badgeColor || "bg-primary text-primary-foreground",
                    )}
                  >
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
