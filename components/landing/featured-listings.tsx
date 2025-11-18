import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"

const FALLBACK_LISTINGS = [
  {
    id: "fallback-1",
    title: "SaaS analytics dashboard",
    slug: "fallback-1",
    type: "SAAS",
    askingPrice: 49000,
    monthlyRevenue: 4200,
    profitMargin: 78,
  },
  {
    id: "fallback-2",
    title: "Ecommerce brand – home & living",
    slug: "fallback-2",
    type: "ECOMMERCE",
    askingPrice: 87000,
    monthlyRevenue: 9300,
    profitMargin: 62,
  },
  {
    id: "fallback-3",
    title: "Content site – personal finance",
    slug: "fallback-3",
    type: "WEBSITE",
    askingPrice: 32000,
    monthlyRevenue: 3100,
    profitMargin: 80,
  },
]

export async function FeaturedListings() {
  let listings: any[] = []

  try {
    // Prefer featured listings, but always show exactly 3 cards by
    // padding from the broader active marketplace if needed.
    const featured = await prisma.listing.findMany({
      where: { featured: true, status: "active" },
      take: 3,
      orderBy: { createdAt: "desc" },
    })

    listings = featured

    if (listings.length < 3) {
      const extra = await prisma.listing.findMany({
        where: {
          status: "active",
          featured: false,
        },
        take: 3 - listings.length,
        orderBy: { createdAt: "desc" },
      })

      listings = [...listings, ...extra]
    }
  } catch (e) {
    // If the database is unreachable, fall back to static examples
    listings = []
  }

  const displayListings = listings.length > 0 ? listings.slice(0, 3) : FALLBACK_LISTINGS

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),_transparent_65%)]" />
      <Container>
        <div className="relative z-10 mb-12 flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-indigo-600 mb-4">
            Featured deals
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">
            High-signal digital assets
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl">
            A curated snapshot of profitable listings on Marketly. Explore revenue, margins,
            and pricing at a glance.
          </p>
        </div>
        <div className="relative z-10 mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {displayListings.map((listing) => (
            <div key={listing.id} className="h-full">
              <Card className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition-transform duration-300 hover:-translate-y-2 hover:shadow-soft-lg">
                <div className="relative h-28 w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-400 opacity-90" />
                <CardContent className="flex-1 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-1">
                        {listing.type}
                      </p>
                      <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-slate-900">
                        {listing.title}
                      </h3>
                      <div className="space-y-2 text-sm">
                        {typeof listing.monthlyRevenue === "number" && (
                          <div className="flex items-center justify-between text-slate-700">
                            <span className="text-slate-500">Monthly revenue</span>
                            <span className="font-medium">
                              {formatCurrency(listing.monthlyRevenue)}
                            </span>
                          </div>
                        )}
                        {typeof listing.profitMargin === "number" && (
                          <div className="flex items-center justify-between text-slate-700">
                            <span className="text-slate-500">Profit margin</span>
                            <span className="font-semibold text-emerald-500">
                              {listing.profitMargin}%
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-slate-700">
                          <span className="text-slate-500">Asking price</span>
                          <span className="font-semibold text-indigo-600">
                            {formatCurrency(listing.askingPrice)}
                          </span>
                        </div>
                      </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-slate-100 bg-white px-4 py-3 text-[11px] text-slate-500">
                  <span>Ideal for serious buyers</span>
                  <Button size="sm" asChild className="rounded-full px-3 text-xs">
                    <Link href={`/listings/${listing.slug}`}>View details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        <div className="relative z-10 flex justify-center">
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-slate-600/80 bg-slate-950/60 text-slate-100 hover:bg-slate-900/80 backdrop-blur-md"
          >
            <Link href="/listings">View full marketplace</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}


