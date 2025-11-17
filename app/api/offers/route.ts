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
    const { listingId, amount, message } = body

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { seller: true },
    })

    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      )
    }

    if (listing.sellerId === session.user.id) {
      return NextResponse.json(
        { message: "Cannot make offer on your own listing" },
        { status: 400 }
      )
    }

    const offer = await prisma.offer.create({
      data: {
        buyerId: session.user.id,
        sellerId: listing.sellerId,
        listingId,
        amount,
        message,
        status: "PENDING",
      },
    })

    // Create notification for seller
    await prisma.notification.create({
      data: {
        userId: listing.sellerId,
        type: "offer",
        title: "New Offer Received",
        message: `You received a new offer of ${amount} for ${listing.title}`,
        link: `/seller/offers`,
      },
    })

    return NextResponse.json(offer, { status: 201 })
  } catch (error) {
    console.error("Offer creation error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // "sent" or "received"

    let offers
    if (type === "sent") {
      offers = await prisma.offer.findMany({
        where: { buyerId: session.user.id },
        include: {
          listing: {
            select: {
              id: true,
              title: true,
              slug: true,
              images: true,
            },
          },
          seller: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      })
    } else {
      offers = await prisma.offer.findMany({
        where: { sellerId: session.user.id },
        include: {
          listing: {
            select: {
              id: true,
              title: true,
              slug: true,
              images: true,
            },
          },
          buyer: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      })
    }

    return NextResponse.json(offers)
  } catch (error) {
    console.error("Offers fetch error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}


