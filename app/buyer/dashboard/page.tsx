import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { ShoppingBag, MessageSquare, Heart, TrendingUp } from "lucide-react"

export default async function BuyerDashboard() {
  const session = await auth()
  if (!session?.user) {
    redirect("/auth/login")
  }

  const [offers, savedListings, recentMessages] = await Promise.all([
    prisma.offer.findMany({
      where: { buyerId: session.user.id },
      include: {
        listing: {
          select: {
            title: true,
            slug: true,
            images: true,
            askingPrice: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.savedListing.findMany({
      where: { userId: session.user.id },
      include: {
        listing: {
          select: {
            title: true,
            slug: true,
            images: true,
            askingPrice: true,
          },
        },
      },
      take: 5,
    }),
    prisma.conversation.findMany({
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
    }),
  ])

  return (
    <Container className="py-8">
      <PageHeader
        title="Buyer Dashboard"
        description="Manage your offers, saved listings, and messages"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Offers</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offers.length}</div>
            <p className="text-xs text-muted-foreground">
              Offers pending review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Listings</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedListings.length}</div>
            <p className="text-xs text-muted-foreground">
              Listings you saved
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentMessages.length}</div>
            <p className="text-xs text-muted-foreground">
              Active conversations
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Offers</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/buyer/offers">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {offers.length > 0 ? (
              <div className="space-y-4">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <Link
                        href={`/listings/${offer.listing.slug}`}
                        className="font-medium hover:text-primary"
                      >
                        {offer.listing.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Offer: {formatCurrency(offer.amount)} • Status:{" "}
                        {offer.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No offers yet
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Saved Listings</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/buyer/saved">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {savedListings.length > 0 ? (
              <div className="space-y-4">
                {savedListings.map((saved) => (
                  <div
                    key={saved.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <Link
                        href={`/listings/${saved.listing.slug}`}
                        className="font-medium hover:text-primary"
                      >
                        {saved.listing.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(saved.listing.askingPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No saved listings
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-auto py-4">
                <Link href="/listings">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <div className="text-left">
                    <div className="font-semibold">Explore Listings</div>
                    <div className="text-xs text-muted-foreground">
                      Browse available businesses
                    </div>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4">
                <Link href="/buyer/offers">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <div className="text-left">
                    <div className="font-semibold">View Offers</div>
                    <div className="text-xs text-muted-foreground">
                      Track your offers
                    </div>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4">
                <Link href="/buyer/messages">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <div className="text-left">
                    <div className="font-semibold">Messages</div>
                    <div className="text-xs text-muted-foreground">
                      Chat with sellers
                    </div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}


