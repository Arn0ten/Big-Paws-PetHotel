// "use client"

// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { CheckCircle, Camera, Video, Scissors, Clock, ClipboardList } from "lucide-react"
// import { motion } from "framer-motion"

// interface SuccessDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   title: string
//   description: string
//   type: "photo" | "video" | "grooming" | "boarding-extension" | "custom" | string
// }

// export function SuccessDialog({ open, onOpenChange, title, description, type }: SuccessDialogProps) {
//   // Get the appropriate icon for the request type
//   const getRequestTypeIcon = () => {
//     switch (type) {
//       case "photo":
//         return <Camera className="h-6 w-6 text-blue-600" />
//       case "video":
//         return <Video className="h-6 w-6 text-purple-600" />
//       case "grooming":
//         return <Scissors className="h-6 w-6 text-green-600" />
//       case "boarding-extension":
//         return <Clock className="h-6 w-6 text-amber-600" />
//       default:
//         return <ClipboardList className="h-6 w-6 text-gray-600" />
//     }
//   }

//   // Get the appropriate color class for the request type
//   const getRequestTypeColorClass = () => {
//     switch (type) {
//       case "photo":
//         return "text-blue-600 dark:text-blue-400"
//       case "video":
//         return "text-purple-600 dark:text-purple-400"
//       case "grooming":
//         return "text-green-600 dark:text-green-400"
//       case "boarding-extension":
//         return "text-amber-600 dark:text-amber-400"
//       default:
//         return "text-gray-600 dark:text-gray-400"
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 300,
//                 damping: 20,
//               }}
//             >
//               <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
//             </motion.div>
//           </div>
//           <DialogTitle className="text-center text-xl sm:text-2xl font-semibold mt-4">{title}</DialogTitle>
//           <DialogDescription className="text-center">{description}</DialogDescription>
//         </DialogHeader>
//         <div className="flex justify-center items-center py-4">
//           <div
//             className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-full ${
//               type === "photo"
//                 ? "bg-blue-50 dark:bg-blue-950/20"
//                 : type === "video"
//                   ? "bg-purple-50 dark:bg-purple-950/20"
//                   : type === "grooming"
//                     ? "bg-green-50 dark:bg-green-950/20"
//                     : type === "boarding-extension"
//                       ? "bg-amber-50 dark:bg-amber-950/20"
//                       : "bg-gray-50 dark:bg-gray-950/20"
//             }`}
//           >
//             {getRequestTypeIcon()}
//             <span className={`text-sm font-medium ${getRequestTypeColorClass()}`}>
//               {type === "photo" && "Photo Update"}
//               {type === "video" && "Video Request"}
//               {type === "grooming" && "Grooming Service"}
//               {type === "boarding-extension" && "Boarding Extension"}
//               {type === "custom" && "Custom Request"}
//             </span>
//           </div>
//         </div>
//         <DialogFooter className="sm:justify-center">
//           <Button onClick={() => onOpenChange(false)}>Close</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
