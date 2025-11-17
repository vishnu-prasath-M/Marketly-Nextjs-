export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "SELLER" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Only sellers can create listings" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const {
      title,
      slug,
      type,
      categoryId,
      askingPrice,
      monthlyRevenue,
      profitMargin,
      domainAge,
      monthlyTraffic,
      shortDescription,
      fullDescription,
      images = [],
    } = body

    const listing = await prisma.listing.create({
      data: {
        title,
        slug,
        type,
        categoryId,
        askingPrice,
        monthlyRevenue,
        profitMargin,
        domainAge,
        monthlyTraffic,
        shortDescription,
        fullDescription,
        images,
        sellerId: session.user.id,
        status: "active",
      },
    })

    return NextResponse.json(listing, { status: 201 })
  } catch (error: any) {
    console.error("Listing creation error:", error)
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}


