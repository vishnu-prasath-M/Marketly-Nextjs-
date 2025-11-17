import { Container } from "@/components/ui/container"
import { ListingCard } from "@/components/listings/listing-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export async function FeaturedListings() {
  const listings = await prisma.listing.findMany({
    where: { featured: true, status: "active" },
    take: 6,
    include: {
      category: true,
      seller: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <section className="py-20 bg-background">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Listings
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hand-picked premium digital businesses
          </p>
        </div>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                id={listing.id}
                title={listing.title}
                slug={listing.slug}
                type={listing.type}
                askingPrice={listing.askingPrice}
                monthlyRevenue={listing.monthlyRevenue}
                profitMargin={listing.profitMargin}
                images={listing.images}
                views={listing.views}
                featured={listing.featured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured listings yet.</p>
          </div>
        )}
        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/listings">View All Listings</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}

