"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Video, X, Play, Pause, Volume2, VolumeX, Music } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { formatTime } from "../../utils/helpers"

interface VideoUploadProps {
  selectedFile: File | null
  previewUrl: string | null
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: () => void
  maxDuration?: number
  onAudioSelect?: (audioUrl: string | null, audioName: string | null) => void
}

export function VideoUpload({
  selectedFile,
  previewUrl,
  onFileSelect,
  onRemoveFile,
  maxDuration = 60,
  onAudioSelect,
}: VideoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [isOverDuration, setIsOverDuration] = useState(false)
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null)

  // Audio options (these would typically come from an API)
  const audioOptions = [
    {
      id: "pets-background-music",
      name: "Pets Background Music",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pets-background-music-funny-cute-sweet-cat-dog-animals-249668-9lhrvWjMrc7w6eWBDwGLlFCDeqzqwE.mp3",
      description: "Funny, cute & sweet cat/dog animals music",
    },
    {
      id: "quirky-fun",
      name: "Quirky Fun & Bright",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quirky-fun-and-bright-commercial-social-pets-kids-159155-vJOXAJgkrFumHR3utpbMGVOFsihaM2.mp3",
      description: "Commercial social pets & kids music",
    },
    {
      id: "cats-and-dogs",
      name: "Cats and Dogs",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cats-and-dogs-music-funny-happy-cute-pets-background-intro-theme-269362-MZRRsXAoYoMVqNqQFBt35k6hHhcZcU.mp3",
      description: "Funny happy cute pets background theme",
    },
    {
      id: "candy-store",
      name: "Candy Store Heist",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/candy-store-heist-300793-WyEi7PIhtCCY3YUGbw8fqnrHXK9jqi.mp3",
      description: "Upbeat playful music",
    },
    {
      id: "funny-pets-1",
      name: "Funny Pets",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/funny-pets-262921-jtpIlfivFw1ND4vYjipCpaMQy6JtBW.mp3",
      description: "Cheerful pet-themed music",
    },
    {
      id: "funny-pets-music",
      name: "Funny Pets Music",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/funny-pets-music-dog-cat-puppy-kitty-bunny-background-intro-theme-259686-gVDGsCMnvjV7sf798dQXskjKjgtovE.mp3",
      description: "Dog, cat, puppy, kitty, bunny background theme",
    },
    {
      id: "funny-pets-2",
      name: "Funny Pets 2",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/funny-pets-272033-w6q9rfNbjTt467s66F0fuzullBANnw.mp3",
      description: "Playful pet soundtrack",
    },
    {
      id: "pets-music",
      name: "Pets Music",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pets-music-dog-cat-puppy-kitty-shelter-background-intro-theme-259661-QMeJhfCaL9fqDOv8vEtdE1i1DWEiML.mp3",
      description: "Dog, cat, puppy, kitty shelter background theme",
    },
    {
      id: "cute-pets-music",
      name: "Cute Pets Music",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cute-pets-music-cat-dog-puppy-kitty-vlog-background-intro-theme-269379-k0KGuznah3i0H1eAeFqjzKcct9FQoP.mp3",
      description: "Cat, dog, puppy, kitty vlog background theme",
    },
    {
      id: "none",
      name: "No Background Music",
      url: null,
      description: "Original video audio only",
    },
  ];

  // Handle file input click
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Handle video metadata loaded
  const handleMetadataLoaded = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration
      setDuration(videoDuration)

      // Check if video is over the max duration
      if (maxDuration && videoDuration > maxDuration) {
        setIsOverDuration(true)
      } else {
        setIsOverDuration(false)
      }
    }
  }

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle seeking
  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0]
      videoRef.current.volume = newVolume
      setVolume(newVolume)

      if (newVolume === 0) {
        setIsMuted(true)
      } else {
        setIsMuted(false)
      }
    }
  }

  // Handle mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume
        videoRef.current.muted = false
      } else {
        videoRef.current.volume = 0
        videoRef.current.muted = true
      }

      setIsMuted(!isMuted)
    }
  }

  // Handle audio selection
  const handleAudioSelect = (audioId: string) => {
    const selectedOption = audioOptions.find((option) => option.id === audioId)

    if (selectedOption && selectedOption.url) {
      setSelectedAudio(audioId)
      if (onAudioSelect) {
        onAudioSelect(selectedOption.url, selectedOption.name)
      }
    } else {
      setSelectedAudio(null)
      if (onAudioSelect) {
        onAudioSelect(null, null)
      }
    }
  }

  // Reset video when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.src = ""
        videoRef.current.load()
      }
    }
  }, [])

  return (
    <div className="space-y-4">
      {!selectedFile ? (
        <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-8 text-muted-foreground">
          <Video className="h-10 w-10 mb-4" />
          <p className="mb-2 text-sm">Drag and drop a video file here or click to browse</p>
          <p className="text-xs mb-4">Maximum video length: {maxDuration} seconds</p>
          <Button type="button" onClick={handleFileInputClick}>
            Select Video
          </Button>
          <input ref={fileInputRef} type="file" accept="video/*" onChange={onFileSelect} className="hidden" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-md overflow-hidden bg-black aspect-video">
            <video
              ref={videoRef}
              src={previewUrl || undefined}
              className="w-full h-full"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleMetadataLoaded}
              onEnded={() => setIsPlaying(false)}
              muted={isMuted}
            />

            {/* Video controls overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex flex-col gap-2">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={0.01}
                  onValueChange={handleSeek}
                  className="w-full"
                />

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={togglePlay}
                      className="h-8 w-8 text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>

                    <span className="text-xs text-white">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className="h-8 w-8 text-white hover:bg-white/20"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>

                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Warning for videos over max duration */}
            {isOverDuration && (
              <div className="absolute top-0 left-0 right-0 bg-red-500/90 text-white p-2 text-sm text-center">
                Video exceeds maximum duration of {maxDuration} seconds. Please select a shorter video.
              </div>
            )}
          </div>

          {/* Video details and actions */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {Math.round(duration)} seconds
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRemoveFile}
              className="text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>

          {/* Background music selection */}
          {onAudioSelect && (
            <div className="space-y-2 border rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Music className="h-4 w-4" />
                <Label className="font-medium">Background Music</Label>
              </div>

              <RadioGroup value={selectedAudio || "none"} onValueChange={handleAudioSelect} className="space-y-2">
                {audioOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={`audio-${option.id}`} />
                    <Label htmlFor={`audio-${option.id}`} className="text-sm">
                      {option.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <p className="text-xs text-muted-foreground mt-2">
                Select background music to enhance your video. The original audio will be replaced.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}





