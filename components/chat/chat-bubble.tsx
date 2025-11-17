"use client"

import { formatRelativeTime } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatBubbleProps {
  message: string
  senderId: string
  currentUserId: string
  senderName: string
  senderImage?: string
  timestamp: Date | string
}

export function ChatBubble({
  message,
  senderId,
  currentUserId,
  senderName,
  senderImage,
  timestamp,
}: ChatBubbleProps) {
  const isOwn = senderId === currentUserId

  return (
    <div
      className={cn(
        "flex items-end space-x-2 mb-4",
        isOwn && "flex-row-reverse space-x-reverse"
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={senderImage} />
        <AvatarFallback>{senderName.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "flex flex-col max-w-[70%]",
          isOwn ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-lg px-4 py-2",
            isOwn
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          )}
        >
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {formatRelativeTime(timestamp)}
        </span>
      </div>
    </div>
  )
}


