"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { ChatBubble } from "@/components/chat/chat-bubble"
import { ChatInput } from "@/components/chat/chat-input"
import { useSession } from "next-auth/react"
import { Skeleton } from "@/components/ui/skeleton"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function ChatContent() {
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const listingId = searchParams.get("listingId")
  const sellerId = searchParams.get("sellerId")
  const conversationId = searchParams.get("conversationId")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { data: messages = [], mutate } = useSWR(
    conversationId ? `/api/chat/messages?conversationId=${conversationId}` : null,
    fetcher,
    {
      refreshInterval: 3000, // Poll every 3 seconds as fallback
    }
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!conversationId) {
      // Create conversation first if needed
      const response = await fetch("/api/chat/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, sellerId }),
      })
      const conv = await response.json()
      if (conv.id) {
        window.history.pushState({}, "", `?conversationId=${conv.id}`)
      }
    }

    await fetch("/api/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: conversationId || "",
        content: message,
      }),
    })

    mutate()
  }

  if (!session) {
    return (
      <Container className="py-8">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Please sign in to chat</p>
          </CardContent>
        </Card>
      </Container>
    )
  }

  return (
    <Container className="py-8">
      <Card className="h-[600px] flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No messages yet. Start the conversation!
            </div>
          ) : (
            <div>
              {messages.map((message: any) => (
                <ChatBubble
                  key={message.id}
                  message={message.content}
                  senderId={message.senderId}
                  currentUserId={session?.user?.id || ""}
                  senderName={message.sender.name || "User"}
                  senderImage={message.sender.image}
                  timestamp={message.createdAt}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </CardContent>
        <ChatInput onSend={handleSendMessage} />
      </Card>
    </Container>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading chat...</div>}>
      <ChatContent />
    </Suspense>
  )
}