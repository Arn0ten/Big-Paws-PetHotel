// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { ThemeToggle } from "@/components/theme-toggle";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Settings, User, LogOut, Archive } from "lucide-react";
// import { useRouter } from "next/navigation";
// // import MediaArchive from "./media-archive"

// /**
//  * Pet Owner Topbar Component
//  *
//  * This component displays the top navigation bar for pet owners.
//  * It includes the theme toggle, user menu, and media archive button.
//  *
//  * BACKEND INTEGRATION:
//  * 1. Replace the hardcoded user data with data from the authentication context
//  * 2. Implement proper logout functionality
//  */
// export function Topbar() {
//   const router = useRouter();
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const [showArchive, setShowArchive] = useState(false);

//   const handleLogout = () => {
//     setIsLoggingOut(true);
//     // Simulate logout process
//     setTimeout(() => {
//       router.push("/webapp/auth/login");
//       setIsLoggingOut(false);
//     }, 1000);
//   };

//   return (
//     <>
//       <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-end py-4">
//           <div className="flex items-center space-x-4">
//             {/* Media Archive Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setShowArchive(true)}
//               className="relative h-8 w-8 rounded-full"
//               title="Media Archive"
//             >
//               <Archive className="h-5 w-5 text-foreground/80" />
//             </Button>

//             <ThemeToggle />

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   className="relative h-8 w-8 rounded-full"
//                 >
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage
//                       src="https://github.com/shadcn.png"
//                       alt="Admin"
//                     />
//                     <AvatarFallback className="bg-primary text-primary-foreground">
//                       AJ
//                     </AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">
//                       Arneabell J
//                     </p>
//                     <p className="text-xs leading-none text-muted-foreground">
//                       a.bautista.tc@umindanao.edu.ph
//                     </p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <User className="mr-2 h-4 w-4" />
//                   <span>Profile</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Settings className="mr-2 h-4 w-4" />
//                   <span>Settings</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setShowArchive(true)}>
//                   <Archive className="mr-2 h-4 w-4" />
//                   <span>Media Archive</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem
//                   onClick={handleLogout}
//                   className="cursor-pointer"
//                 >
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </div>

//       {/* Media Archive Dialog */}
//       <Dialog open={showArchive} onOpenChange={setShowArchive}>
//         <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0">
//           <DialogHeader className="p-6 pb-0">
//             <DialogTitle className="text-2xl font-bold flex items-center gap-2">
//               <Archive className="h-6 w-6" />
//               Media Archive
//             </DialogTitle>
//             <DialogDescription>
//               View and download photos and videos of your pets
//             </DialogDescription>
//           </DialogHeader>
//           <div className="p-6 pt-2">
//             <MediaArchive />
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
