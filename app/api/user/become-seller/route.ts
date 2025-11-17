import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { role: "SELLER" },
    })

    return NextResponse.json({ message: "Role updated to SELLER", user })
  } catch (error) {
    console.error("Role update error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}


