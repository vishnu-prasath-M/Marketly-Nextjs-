import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { Plus, Package, MessageSquare, DollarSign } from "lucide-react"

export default async function SellerDashboard() {
  const session = await auth()
  if (!session?.user || session.user.role !== "SELLER") {
    redirect("/")
  }

  const [listings, offers, messages] = await Promise.all([
    prisma.listing.findMany({
      where: { sellerId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.offer.findMany({
      where: { sellerId: session.user.id, status: "PENDING" },
      include: {
        listing: {
          select: {
            title: true,
            slug: true,
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

  const totalRevenue = listings.reduce(
    (sum, listing) => sum + listing.monthlyRevenue,
    0
  )

  return (
    <Container className="py-8">
      <PageHeader
        title="Seller Dashboard"
        description="Manage your listings, offers, and messages"
      >
        <Button asChild>
          <Link href="/seller/listings/create">
            <Plus className="mr-2 h-4 w-4" />
            Add New Listing
          </Link>
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{listings.length}</div>
            <p className="text-xs text-muted-foreground">
              Listings for sale
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Offers</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offers.length}</div>
            <p className="text-xs text-muted-foreground">
              Offers to review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">Per month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Listings</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/seller/listings">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {listings.length > 0 ? (
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <Link
                        href={`/listings/${listing.slug}`}
                        className="font-medium hover:text-primary"
                      >
                        {listing.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(listing.askingPrice)} • {listing.status}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/seller/listings/edit/${listing.id}`}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No listings yet. Create your first listing!
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending Offers</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/seller/offers">View All</Link>
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
                        {formatCurrency(offer.amount)} from {offer.buyer.name}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/seller/offers/${offer.id}`}>
                          Review
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No pending offers
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}


