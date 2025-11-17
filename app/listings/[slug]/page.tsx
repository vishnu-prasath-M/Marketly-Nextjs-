import { notFound } from "next/navigation"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { OfferButton } from "./offer-button"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { MessageCircle, TrendingUp, Calendar, Eye } from "lucide-react"
import { auth } from "@/lib/auth"
import Link from "next/link"

interface ListingPageProps {
  params: {
    slug: string
  }
}

export default async function ListingPage({ params }: ListingPageProps) {
  const session = await auth()
  const listing = await prisma.listing.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      seller: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
        },
      },
    },
  })

  if (!listing) {
    notFound()
  }

  // Increment views
  await prisma.listing.update({
    where: { id: listing.id },
    data: { views: { increment: 1 } },
  })

  const isOwner = session?.user?.id === listing.sellerId
  const canMakeOffer = session && !isOwner && session.user?.role !== "ADMIN"

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card>
            <CardContent className="p-0">
              {listing.images && listing.images.length > 0 ? (
                <div className="relative h-96 w-full">
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
              ) : (
                <div className="h-96 w-full bg-secondary flex items-center justify-center rounded-t-xl">
                  <p className="text-muted-foreground">No image available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Title and Basic Info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="capitalize">
                      {listing.type}
                    </Badge>
                    <Badge variant="outline">{listing.category.name}</Badge>
                    {listing.featured && (
                      <Badge className="bg-primary">Featured</Badge>
                    )}
                  </div>
                  <CardTitle className="text-3xl">{listing.title}</CardTitle>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">
                    {formatCurrency(listing.askingPrice)}
                  </p>
                  <p className="text-sm text-muted-foreground">Asking Price</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                {listing.shortDescription}
              </p>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="technical">Technical Details</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">
                      {listing.fullDescription}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="financials" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Monthly Revenue
                      </p>
                      <p className="text-2xl font-bold">
                        {formatCurrency(listing.monthlyRevenue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Profit Margin
                      </p>
                      <p className="text-2xl font-bold">
                        {listing.profitMargin}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Asking Price
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(listing.askingPrice)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Monthly Traffic
                      </p>
                      <p className="text-2xl font-bold">
                        {formatNumber(listing.monthlyTraffic || 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="technical" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Domain Age
                      </p>
                      <p className="text-lg font-semibold">
                        {listing.domainAge} months
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="text-lg font-semibold capitalize">
                        {listing.type}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Seller Info */}
          <Card>
            <CardHeader>
              <CardTitle>Seller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={listing.seller.image || ""} />
                  <AvatarFallback>
                    {listing.seller.name?.charAt(0).toUpperCase() || "S"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{listing.seller.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {listing.seller.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Views</span>
                </div>
                <span className="font-semibold">
                  {formatNumber(listing.views)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Revenue</span>
                </div>
                <span className="font-semibold">
                  {formatCurrency(listing.monthlyRevenue)}/mo
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Domain Age</span>
                </div>
                <span className="font-semibold">{listing.domainAge} mo</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {canMakeOffer && (
            <OfferButton listingId={listing.id} askingPrice={listing.askingPrice} sellerId={listing.sellerId} />
          )}
        </div>
      </div>
    </Container>
  )
}

