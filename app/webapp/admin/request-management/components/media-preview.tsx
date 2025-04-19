// "use client"

// import { Button } from "@/components/ui/button"
// import { Trash2, Plus, RefreshCw } from "lucide-react"

// interface MediaPreviewProps {
//   files?: { url: string; id: string }[]
//   url?: string
//   type: "image" | "video"
//   onRemove?: (index: number) => void
//   onReplace?: () => void
//   onAddMore?: () => void
//   maxFiles?: number
//   maxVideoDuration?: number
//   className?: string
// }

// export function MediaPreview({
//   files,
//   url,
//   type,
//   onRemove,
//   onReplace,
//   onAddMore,
//   maxFiles = 5,
//   maxVideoDuration = 60,
//   className,
// }: MediaPreviewProps) {
//   // If a single URL is provided (used in the enhanced request dialog)
//   if (url) {
//     return (
//       <div className={className}>
//         {type === "image" ? (
//           <img
//             src={url || "/placeholder.svg"}
//             alt="Preview"
//             className="max-w-full rounded-md object-contain max-h-[300px]"
//           />
//         ) : (
//           <video src={url} controls className="max-w-full rounded-md max-h-[300px]">
//             Your browser does not support the video tag.
//           </video>
//         )}
//       </div>
//     )
//   }

//   // If multiple files are provided (used in the request form)
//   if (!files || files.length === 0) return null

//   return (
//     <div className="space-y-3">
//       <div className="flex justify-between items-center">
//         <h3 className="text-sm font-medium">
//           {type === "image" ? `${files.length} Photo${files.length > 1 ? "s" : ""}` : "Video"} Selected
//         </h3>
//         <div className="flex gap-2">
//           {type === "image" && files.length < maxFiles && onAddMore && (
//             <Button variant="outline" size="sm" onClick={onAddMore}>
//               <Plus className="h-3 w-3 mr-1" />
//               Add More
//             </Button>
//           )}
//           {onReplace && (
//             <Button variant="outline" size="sm" onClick={onReplace}>
//               <RefreshCw className="h-3 w-3 mr-1" />
//               Replace
//             </Button>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//         {files.map((file, index) => (
//           <div key={file.id} className="relative group">
//             {type === "image" ? (
//               <img
//                 src={file.url || "/placeholder.svg"}
//                 alt={`Preview ${index + 1}`}
//                 className="w-full h-24 object-cover rounded-md"
//               />
//             ) : (
//               <video
//                 src={file.url}
//                 className="w-full h-24 object-cover rounded-md"
//                 onLoadedMetadata={(e) => {
//                   const video = e.currentTarget
//                   if (video.duration > maxVideoDuration) {
//                     // Handle video too long error
//                     console.warn(`Video is too long (${video.duration}s). Maximum allowed is ${maxVideoDuration}s.`)
//                   }
//                 }}
//               />
//             )}
//             {onRemove && (
//               <Button
//                 variant="destructive"
//                 size="icon"
//                 className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
//                 onClick={() => onRemove(index)}
//               >
//                 <Trash2 className="h-3 w-3" />
//               </Button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
