"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Film, Upload, Trash2, X, Maximize, Minimize, Volume2, VolumeX, Music, AlertCircle } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { AudioSelector } from "./audio-selector"
import { audioFiles } from "../../data/audio-files"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface VideoUploadProps {
  selectedFile: File | null
  previewUrl: string | null
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: () => void
  maxDuration?: number // in seconds
  onAudioSelect?: (audioUrl: string | null) => void
}

// Update the VideoUpload component to include better validation and fix audio issues
export function VideoUpload({
  selectedFile,
  previewUrl,
  onFileSelect,
  onRemoveFile,
  maxDuration = 60,
  onAudioSelect,
}: VideoUploadProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showAudioSelector, setShowAudioSelector] = useState(false)
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [videoDuration, setVideoDuration] = useState<number | null>(null)
  const [isVideoDurationValid, setIsVideoDurationValid] = useState(true)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [audioVolume, setAudioVolume] = useState(0.7) // Default volume at 70%
  const [showDurationError, setShowDurationError] = useState(false)
  const [selectedAudioName, setSelectedAudioName] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const handleAudioSelect = (audioUrl: string) => {
    const selectedAudioFile = audioFiles.find((a) => a.url === audioUrl)
    setSelectedAudio(audioUrl)
    setSelectedAudioName(selectedAudioFile?.name || null)
    setShowAudioSelector(false)

    // When audio is selected, mute the original video audio
    if (videoRef.current) {
      videoRef.current.muted = true
      setIsMuted(true)
    }

    // Notify parent component about audio selection
    if (onAudioSelect) {
      onAudioSelect(audioUrl)
    }
  }

  // Handle video metadata loaded to check duration
  const handleVideoMetadata = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration
      setVideoDuration(duration)

      // Check if video is too long
      const isValid = duration <= maxDuration
      setIsVideoDurationValid(isValid)

      // Show error message if video is too long
      if (!isValid) {
        setShowDurationError(true)

        // Auto-remove the invalid video after 5 seconds
        setTimeout(() => {
          if (!isVideoDurationValid) {
            onRemoveFile()
            setShowDurationError(false)
          }
        }, 5000)
      } else {
        setShowDurationError(false)
      }
    }
  }

  // Validate video file before accepting it
  const validateVideoFile = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const video = document.createElement("video")
      video.preload = "metadata"

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src)
        const duration = video.duration

        if (duration > maxDuration) {
          resolve(false)
        } else {
          resolve(true)
        }
      }

      video.onerror = () => {
        resolve(false)
      }

      video.src = URL.createObjectURL(file)
    })
  }

  // Sync audio with video playback - fixed to ensure proper synchronization
  useEffect(() => {
    const videoElement = videoRef.current
    const audioElement = audioRef.current

    if (!videoElement || !audioElement || !selectedAudio) return

    const handlePlay = () => {
      audioElement.currentTime = videoElement.currentTime
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error)
      })
      setIsVideoPlaying(true)
    }

    const handlePause = () => {
      audioElement.pause()
      setIsVideoPlaying(false)
    }

    const handleTimeUpdate = () => {
      // Keep audio in sync with video
      if (Math.abs(audioElement.currentTime - videoElement.currentTime) > 0.3) {
        audioElement.currentTime = videoElement.currentTime
      }

      // Ensure audio doesn't play beyond video duration
      if (videoElement.currentTime >= videoElement.duration - 0.1) {
        audioElement.pause()
      }
    }

    const handleEnded = () => {
      audioElement.pause()
      audioElement.currentTime = 0
      setIsVideoPlaying(false)
    }

    const handleSeeking = () => {
      // Update audio time when video is seeking
      audioElement.currentTime = videoElement.currentTime
    }

    // Set audio volume
    audioElement.volume = audioVolume

    videoElement.addEventListener("play", handlePlay)
    videoElement.addEventListener("pause", handlePause)
    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("ended", handleEnded)
    videoElement.addEventListener("seeking", handleSeeking)

    // If video is already playing when audio is selected, start audio
    if (!videoElement.paused && !videoElement.ended) {
      handlePlay()
    }

    return () => {
      videoElement.removeEventListener("play", handlePlay)
      videoElement.removeEventListener("pause", handlePause)
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("ended", handleEnded)
      videoElement.removeEventListener("seeking", handleSeeking)

      // Ensure audio is stopped when component unmounts
      audioElement.pause()
    }
  }, [selectedAudio, audioVolume])

  // Update parent component when audio selection changes
  useEffect(() => {
    if (onAudioSelect) {
      onAudioSelect(selectedAudio)
    }
  }, [selectedAudio, onAudioSelect])

  // Cleanup function to stop audio when component unmounts
  useEffect(() => {
    return () => {
      // Stop audio playback when component unmounts
      if (audioRef.current) {
        audioRef.current.pause()
      }
      // Stop video playback when component unmounts
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [])

  // Handle file selection with validation
  const handleVideoFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Validate file type
      if (!file.type.startsWith("video/")) {
        alert("Please select a valid video file")
        return
      }

      // Validate duration before accepting
      const isValid = await validateVideoFile(file)

      if (!isValid) {
        setShowDurationError(true)
        setTimeout(() => setShowDurationError(false), 5000)
        return
      }

      // Reset audio selection when a new video is uploaded
      setSelectedAudio(null)
      setSelectedAudioName(null)
      if (onAudioSelect) {
        onAudioSelect(null)
      }

      // Pass the file to parent component
      onFileSelect(e)
    }
  }

  // Remove audio when removing video
  const handleRemoveVideo = () => {
    setSelectedAudio(null)
    setSelectedAudioName(null)
    if (onAudioSelect) {
      onAudioSelect(null)
    }
    onRemoveFile()
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="video-upload" className="text-base font-medium">
          Upload Video
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Upload a short video of the pet to share with the owner (max {maxDuration} seconds).
        </p>

        {showDurationError && (
          <Alert variant="destructive" className="mb-3">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Video too long</AlertTitle>
            <AlertDescription>
              The video duration exceeds the maximum allowed ({maxDuration} seconds). Please upload a shorter video.
            </AlertDescription>
          </Alert>
        )}

        {selectedFile === null ? (
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
            <Input
              id="video-upload"
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoFileSelect}
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <Film className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground text-center">
                Drag and drop or click to upload a video (max {maxDuration} seconds)
              </p>
              <Button variant="outline" onClick={handleFileInputClick} className="mt-2">
                <Upload className="h-4 w-4 mr-2" />
                Select Video
              </Button>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
              <div className="text-sm font-medium truncate max-w-full">
                {selectedFile.name}
                {videoDuration && (
                  <Badge variant="outline" className="ml-2">
                    {Math.round(videoDuration)} seconds
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" onClick={handleFileInputClick} className="flex-1 sm:flex-none">
                  <Upload className="h-3 w-3 mr-1" />
                  Replace
                </Button>
                <Button variant="outline" size="sm" onClick={handleRemoveVideo} className="flex-1 sm:flex-none">
                  <Trash2 className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
            </div>

            {!isVideoDurationValid && (
              <Alert variant="destructive" className="mb-3">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Video too long</AlertTitle>
                <AlertDescription>
                  The video duration exceeds the maximum allowed ({maxDuration} seconds). Please upload a shorter video.
                </AlertDescription>
              </Alert>
            )}

            {/* Video Preview */}
            {previewUrl && (
              <div className="relative mt-2">
                {/* Full screen overlay */}
                {isFullScreen && (
                  <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 text-white"
                      onClick={toggleFullScreen}
                    >
                      <Minimize className="h-6 w-6" />
                    </Button>

                    <video
                      src={previewUrl}
                      controls
                      className="max-h-[90vh] max-w-[90vw]"
                      ref={videoRef}
                      onLoadedMetadata={handleVideoMetadata}
                      muted={isMuted || !!selectedAudio}
                    >
                      Your browser does not support the video tag.
                    </video>

                    {selectedAudio && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full flex items-center">
                        <Music className="h-4 w-4 mr-2" />
                        {selectedAudioName || "Background Music"}
                      </div>
                    )}
                  </div>
                )}

                {/* Regular preview */}
                <div className="relative rounded-md overflow-hidden">
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-[300px] object-contain bg-black/5"
                    ref={videoRef}
                    onLoadedMetadata={handleVideoMetadata}
                    muted={isMuted || !!selectedAudio}
                  >
                    Your browser does not support the video tag.
                  </video>

                  {/* Audio element for background music */}
                  {selectedAudio && <audio ref={audioRef} src={selectedAudio} loop={false} hidden />}

                  {/* Video controls */}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-black/20 text-white hover:bg-black/30"
                      onClick={toggleFullScreen}
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-black/20 text-white hover:bg-black/30"
                      onClick={toggleMute}
                      disabled={!!selectedAudio}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Audio indicator */}
                  {selectedAudio && (
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center">
                      <Music className="h-3 w-3 mr-1" />
                      <span>With Music</span>
                    </div>
                  )}
                </div>

                {/* Audio controls */}
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <Label className="text-sm font-medium">Background Music</Label>
                    <Button variant="outline" size="sm" onClick={() => setShowAudioSelector(!showAudioSelector)}>
                      <Music className="h-4 w-4 mr-2" />
                      {selectedAudio ? "Change Music" : "Add Music"}
                    </Button>
                  </div>

                  {selectedAudio && (
                    <div className="p-3 bg-muted rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center">
                        <Music className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm truncate max-w-[150px] sm:max-w-[200px]">
                          {selectedAudioName || "Background Music"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={audioVolume}
                          onChange={(e) => setAudioVolume(Number.parseFloat(e.target.value))}
                          className="w-full sm:w-24"
                          aria-label="Audio volume"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 flex-shrink-0"
                          onClick={() => {
                            setSelectedAudio(null)
                            setSelectedAudioName(null)
                            if (onAudioSelect) onAudioSelect(null)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {showAudioSelector && (
                    <div className="max-w-full overflow-x-auto">
                      <AudioSelector
                        audioFiles={audioFiles}
                        onSelect={handleAudioSelect}
                        onClose={() => setShowAudioSelector(false)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Hidden input for file selection */}
            <Input
              id="video-upload"
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoFileSelect}
            />
          </div>
        )}
      </div>
    </div>
  )
}

