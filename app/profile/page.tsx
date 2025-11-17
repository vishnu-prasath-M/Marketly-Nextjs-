import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, User, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { BecomeSellerButton } from "./become-seller-button"

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/auth/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) {
    redirect("/auth/login")
  }

  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
    take: 5,
  })


  return (
    <Container className="py-8">
      <PageHeader title="Profile" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.image || ""} />
                  <AvatarFallback className="text-2xl">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{user.name || "User"}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <Badge className="mt-2 capitalize">{user.role}</Badge>
                </div>
              </div>
              
              {user.role === "BUYER" && (
                <BecomeSellerButton />
              )}
            </CardContent>
          </Card>

          {conversations && conversations.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Messages</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/buyer/messages">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Conversation</p>
                          {conversation.messages[0] && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {conversation.messages[0].content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {user.role === "SELLER" && (
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/seller/dashboard">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Seller Dashboard
                  </Link>
                </Button>
              )}
              {user.role === "BUYER" && (
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/buyer/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    Buyer Dashboard
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/listings">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Listings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}

