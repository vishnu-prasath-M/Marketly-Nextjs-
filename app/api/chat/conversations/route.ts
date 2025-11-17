import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { listingId, sellerId } = body

    // Find or create conversation
    let conversation = await prisma.conversation.findFirst({
      where: {
        listingId: listingId || undefined,
        participants: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        participants: true,
      },
    })

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          listingId: listingId || null,
          participants: {
            create: [
              { userId: session.user.id },
              { userId: sellerId },
            ],
          },
        },
        include: {
          participants: true,
        },
      })
    }

    return NextResponse.json(conversation)
  } catch (error) {
    console.error("Conversation creation error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}


