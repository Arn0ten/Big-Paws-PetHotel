// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Play, Pause, X, Search, Clock } from "lucide-react"
// import type { AudioFile } from "../../data/audio-files"
// import { Badge } from "@/components/ui/badge"

// interface AudioSelectorProps {
//   audioFiles: AudioFile[]
//   onSelect: (audioUrl: string) => void
//   onClose: () => void
// }

// export function AudioSelector({ audioFiles, onSelect, onClose }: AudioSelectorProps) {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [playingAudio, setPlayingAudio] = useState<string | null>(null)
//   const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

//   // Get unique categories from audio files
//   const categories = Array.from(new Set(audioFiles.map((file) => file.category).filter(Boolean))) as string[]

//   // Filter audio files based on search query and selected category
//   const filteredAudioFiles = audioFiles.filter((file) => {
//     const matchesSearch =
//       file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (file.description && file.description.toLowerCase().includes(searchQuery.toLowerCase()))
//     const matchesCategory = selectedCategory ? file.category === selectedCategory : true
//     return matchesSearch && matchesCategory
//   })

//   const handlePlayPause = (audioUrl: string) => {
//     if (playingAudio === audioUrl) {
//       // Already playing this audio, pause it
//       if (audioElement) {
//         audioElement.pause()
//         setPlayingAudio(null)
//       }
//     } else {
//       // Stop current audio if any
//       if (audioElement) {
//         audioElement.pause()
//       }

//       // Play new audio
//       const newAudio = new Audio(audioUrl)
//       newAudio.volume = 0.7
//       newAudio.play()
//       newAudio.onended = () => {
//         setPlayingAudio(null)
//         setAudioElement(null)
//       }

//       setPlayingAudio(audioUrl)
//       setAudioElement(newAudio)
//     }
//   }

//   const handleSelect = (audioUrl: string) => {
//     // Stop any playing audio
//     if (audioElement) {
//       audioElement.pause()
//       setPlayingAudio(null)
//       setAudioElement(null)
//     }

//     onSelect(audioUrl)
//   }

//   const formatDuration = (seconds?: number) => {
//     if (!seconds) return "Unknown"
//     const mins = Math.floor(seconds / 60)
//     const secs = Math.floor(seconds % 60)
//     return `${mins}:${secs.toString().padStart(2, "0")}`
//   }

//   return (
//     <Card className="p-4 border shadow-md">
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-base font-medium">Select Background Music</h3>
//         <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
//           <X className="h-4 w-4" />
//         </Button>
//       </div>

//       <div className="flex flex-col gap-3 mb-3">
//         <div className="relative">
//           <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search music..."
//             className="pl-8"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <div className="flex flex-wrap gap-1">
//           <Button
//             variant={selectedCategory === null ? "default" : "outline"}
//             size="sm"
//             onClick={() => setSelectedCategory(null)}
//             className="text-xs h-7"
//           >
//             All
//           </Button>
//           {categories.map((category) => (
//             <Button
//               key={category}
//               variant={selectedCategory === category ? "default" : "outline"}
//               size="sm"
//               onClick={() => setSelectedCategory(category)}
//               className="text-xs h-7"
//             >
//               {category}
//             </Button>
//           ))}
//         </div>
//       </div>

//       <ScrollArea className="h-[250px] pr-4">
//         <div className="space-y-2">
//           {filteredAudioFiles.length === 0 ? (
//             <p className="text-center text-muted-foreground py-4">No audio files found</p>
//           ) : (
//             filteredAudioFiles.map((file) => (
//               <div
//                 key={file.id}
//                 className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
//               >
//                 <div className="flex items-center gap-3 flex-1">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="h-8 w-8 rounded-full bg-primary/10"
//                     onClick={() => handlePlayPause(file.url)}
//                   >
//                     {playingAudio === file.url ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
//                   </Button>

//                   <div className="flex-1 min-w-0">
//                     <div className="font-medium truncate">{file.name}</div>
//                     <div className="text-xs text-muted-foreground truncate">{file.description}</div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center text-xs text-muted-foreground">
//                     <Clock className="h-3 w-3 mr-1" />
//                     {formatDuration(file.duration)}
//                   </div>

//                   {file.category && (
//                     <Badge variant="outline" className="text-xs">
//                       {file.category}
//                     </Badge>
//                   )}

//                   <Button variant="ghost" size="sm" onClick={() => handleSelect(file.url)} className="ml-2">
//                     Select
//                   </Button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </ScrollArea>
//     </Card>
//   )
// }
