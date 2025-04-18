// "use client"

// import { Home, FileText, Bell, User, LogOut } from "lucide-react"
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { Button } from "@/components/ui/button"
// import { Menu } from "lucide-react"
// import { Separator } from "@/components/ui/separator"
// import Link from "next/link"

// const navItems = [
//   { label: "Home", icon: <Home className="h-5 w-5" />, href: "/webapp/pet-owner/dashboard" },
//   { label: "Requests", icon: <FileText className="h-5 w-5" />, href: "/webapp/pet-owner/requests" },
//   { label: "Notifications", icon: <Bell className="h-5 w-5" />, href: "/webapp/pet-owner/notifications" },
//   { label: "Profile", icon: <User className="h-5 w-5" />, href: "/webapp/pet-owner/profile" },
// ]

// const MobileNavbar = () => {
//   // BACKEND INTEGRATION POINT:
//   // Implement actual logout functionality here
//   // This should clear the user's session/token and redirect to login page
//   const handleLogout = () => {
//     // Example implementation:
//     // 1. Clear local storage/cookies
//     // localStorage.removeItem('authToken');
//     // 2. Redirect to login page
//     window.location.href = "/webapp/auth/login"
//   }

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="ghost" size="icon">
//           <Menu className="h-5 w-5" />
//         </Button>
//       </SheetTrigger>
//       <SheetContent side="left" className="w-full sm:w-64">
//         <SheetHeader>
//           <SheetTitle>Menu</SheetTitle>
//           <SheetDescription>Navigate through the app.</SheetDescription>
//         </SheetHeader>
//         <Separator className="my-2" />
//         <div className="grid gap-4 py-4">
//           {navItems.map((item) => (
//             <Link href={item.href} key={item.label} className="flex items-center space-x-2">
//               {item.icon}
//               <span>{item.label}</span>
//             </Link>
//           ))}

//           <Separator className="my-2" />

//           <button
//             onClick={handleLogout}
//             className="flex items-center space-x-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
//           >
//             <LogOut className="h-5 w-5" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </SheetContent>
//     </Sheet>
//   )
// }

// export default MobileNavbar
