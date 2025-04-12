// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { RefreshCw, Trash2, Plus } from "lucide-react"

// interface MediaFile {
//   file: File
//   url: string
//   id: string
// }

// interface MediaPreviewProps {
//   files?: MediaFile[]
//   url?: string
//   onRemove?: (index: number) => void
//   onReplace?: () => void
//   onAddMore?: () => void
//   type: "photo" | "video" | "image"
//   maxFiles?: number
//   maxVideoDuration?: number // in seconds
//   className?: string
// }

// export function MediaPreview({
//   files = [],
//   url,
//   onRemove,
//   onReplace,
//   onAddMore,
//   type,
//   maxFiles = 5,
//   maxVideoDuration = 60, // 1 minute default
//   className,
// }: MediaPreviewProps) {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [fullscreen, setFullscreen] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [videoDuration, setVideoDuration] = useState<number | null>(null)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [zoom, setZoom] = useState(1)
//   const [rotation, setRotation] = useState(0)
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const [isUploading, setIsUploading] = useState(false)

//   const videoRef = useRef<HTMLVideoElement>(null)
//   const fullscreenVideoRef = useRef<HTMLVideoElement>(null)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const thumbnailsRef = useRef<HTMLDivElement>(null)

//   // Simulate upload progress for demo
//   useEffect(() => {
//     if (files.length > 0 && !isUploading) {
//       setIsUploading(true)
//       setUploadProgress(0)

//       const interval = setInterval(() => {
//         setUploadProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(interval)
//             setIsUploading(false)
//             return 100
//           }
//           return prev + 5
//         })
//       }, 100)

//       return () => clearInterval(interval)
//     }
//   }, [files.length])

//   // Clean up URLs when component unmounts
//   useEffect(() => {
//     return () => {
//       files.forEach((file) => URL.revokeObjectURL(file.url))
//     }
//   }, [files])

//   // Stop video when dialog closes
//   useEffect(() => {
//     if (!fullscreen && videoRef.current) {
//       videoRef.current.pause()
//       setIsPlaying(false)
//     }
//   }, [fullscreen])

//   // Check video duration when video is loaded
//   const handleVideoLoad = () => {
//     if (videoRef.current && type === "video") {
//       const duration = videoRef.current.duration
//       setVideoDuration(duration)

//       if (duration > maxVideoDuration) {
//         setError(`Video is too long (${Math.round(duration)}s). Maximum allowed is ${maxVideoDuration} seconds.`)
//         // Disable play button or add other UI indication
//       } else {
//         setError(null)
//       }
//     }
//   }

//   const handleNext = () => {
//     if (currentIndex < files.length - 1) {
//       setCurrentIndex(currentIndex + 1)
//     }
//   }

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1)
//     }
//   }

//   const handleThumbnailClick = (index: number) => {
//     setCurrentIndex(index)
//   }

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause()
//       } else {
//         videoRef.current.play()
//       }
//       setIsPlaying(!isPlaying)
//     }
//   }

//   const handleFullscreenTogglePlay = () => {
//     if (fullscreenVideoRef.current) {
//       if (isPlaying) {
//         fullscreenVideoRef.current.pause()
//       } else {
//         fullscreenVideoRef.current.play()
//       }
//       setIsPlaying(!isPlaying)
//     }
//   }

//   const handleZoomIn = () => {
//     setZoom((prev) => Math.min(prev + 0.25, 3))
//   }

//   const handleZoomOut = () => {
//     setZoom((prev) => Math.max(prev - 0.25, 0.5))
//   }

//   const handleRotate = () => {
//     setRotation((prev) => (prev + 90) % 360)
//   }

//   const resetView = () => {
//     setZoom(1)
//     setRotation(0)
//   }

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
//   if (!files || files.length === 0) {
//     return (
//       <div className="space-y-3">
//         <div className="flex justify-between items-center">
//           <h3 className="text-sm font-medium">{type === "image" ? `0 Photo` : "Video"} Selected</h3>
//           <div className="flex gap-2">
//             {type === "image" && files.length < maxFiles && onAddMore && (
//               <Button variant="outline" size="sm" onClick={onAddMore}>
//                 <Plus className="h-3 w-3 mr-1" />
//                 Add More
//               </Button>
//             )}
//             {onReplace && (
//               <Button variant="outline" size="sm" onClick={onReplace}>
//                 <RefreshCw className="h-3 w-3 mr-1" />
//                 Replace
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   }

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

// export default MediaPreview
