"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChatBubble } from "./chat-bubble"

interface HistoryDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  messages: {
    sender: string
    content: string
    timestamp: string
    avatar: string
    isAdmin: boolean
    type?: string
    media?: {
      url: string
      type: "image" | "video"
      urls?: string[]
      audioUrl?: string
      audioName?: string
      audioMerged?: boolean
      mergedVideoUrl?: string
    }
  }[]
}

const HistoryDetailsDialog: React.FC<HistoryDetailsDialogProps> = ({ open, onOpenChange, messages }) => {
  // Add state to manage dialog visibility when media is fullscreen
  const [isDialogVisible, setIsDialogVisible] = useState(true)
  const [isMediaFullscreen, setIsMediaFullscreen] = useState(false)

  // Handle fullscreen open
  const handleFullscreenOpen = () => {
    setIsDialogVisible(false)
    setIsMediaFullscreen(true)
  }

  // Handle fullscreen close (close both dialogs)
  const handleFullscreenClose = () => {
    setIsDialogVisible(false)
    setIsMediaFullscreen(false)
    onOpenChange(false)
  }

  // Handle back button click (return to chat dialog)
  const handleFullscreenBackClick = () => {
    setIsDialogVisible(true)
    setIsMediaFullscreen(false)
  }

  return (
    <Dialog
      open={open && (isDialogVisible || isMediaFullscreen)}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          setIsDialogVisible(false)
          setIsMediaFullscreen(false)
        }
        onOpenChange(newOpen)
      }}
    >
      <DialogContent
        className={`sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 max-w-[95vw] w-full ${!isDialogVisible ? "hidden" : ""}`}
      >
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Request Timeline</DialogTitle>
          <DialogDescription>Complete history of interactions for this request</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-6 pt-2">
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              sender={message.sender}
              message={message.content}
              timestamp={message.timestamp}
              avatar={message.avatar}
              isAdmin={message.isAdmin}
              type={message.type}
              media={message.media}
              onFullscreenOpen={handleFullscreenOpen}
              onFullscreenClose={handleFullscreenClose}
              onFullscreenBackClick={handleFullscreenBackClick}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default HistoryDetailsDialog

