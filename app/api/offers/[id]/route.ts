export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { status } = body

    const offer = await prisma.offer.findUnique({
      where: { id: params.id },
      include: { listing: true },
    })

    if (!offer) {
      return NextResponse.json(
        { message: "Offer not found" },
        { status: 404 }
      )
    }

    if (offer.sellerId !== session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 403 }
      )
    }

    const updatedOffer = await prisma.offer.update({
      where: { id: params.id },
      data: { status },
    })

    // Create notification for buyer
    await prisma.notification.create({
      data: {
        userId: offer.buyerId,
        type: "offer",
        title: `Offer ${status}`,
        message: `Your offer for ${offer.listing.title} has been ${status.toLowerCase()}`,
        link: `/buyer/dashboard`,
      },
    })

    return NextResponse.json(updatedOffer)
  } catch (error) {
    console.error("Offer update error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const offer = await prisma.offer.findUnique({
      where: { id: params.id },
    })

    if (!offer) {
      return NextResponse.json(
        { message: "Offer not found" },
        { status: 404 }
      )
    }

    if (offer.buyerId !== session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 403 }
      )
    }

    await prisma.offer.update({
      where: { id: params.id },
      data: { status: "WITHDRAWN" },
    })

    return NextResponse.json({ message: "Offer withdrawn" })
  } catch (error) {
    console.error("Offer deletion error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}


