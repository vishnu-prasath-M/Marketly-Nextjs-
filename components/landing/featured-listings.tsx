import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"

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
        <div className="relative z-10 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.length > 0
            ? listings.map((listing) => (
                <div key={listing.id} className="h-full">
                  <Card className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_26px_90px_rgba(15,23,42,0.18)]">
                    <div className="relative h-32 w-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-emerald-400 opacity-90" />
                    <CardContent className="flex-1 p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-1">
                        {listing.type}
                      </p>
                      <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-slate-900">
                        {listing.title}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between text-slate-700">
                          <span className="text-slate-500">Monthly revenue</span>
                          <span className="font-medium">
                            {formatCurrency(listing.monthlyRevenue)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-700">
                          <span className="text-slate-500">Profit margin</span>
                          <span className="font-semibold text-emerald-500">
                            {listing.profitMargin}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-700">
                          <span className="text-slate-500">Asking price</span>
                          <span className="font-semibold text-indigo-600">
                            {formatCurrency(listing.askingPrice)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-4 text-xs text-slate-500">
                      <span>Ideal for serious buyers</span>
                      <Button size="sm" asChild className="rounded-full px-4">
                        <Link href={`/listings/${listing.slug}`}>View details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-full rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.9)] animate-pulse"
                >
                  <div className="mb-4 h-32 w-full rounded-2xl bg-slate-800/80" />
                  <div className="mb-3 h-4 w-2/3 rounded-full bg-slate-800" />
                  <div className="mb-2 h-3 w-1/2 rounded-full bg-slate-800" />
                  <div className="mt-4 flex gap-2">
                    <div className="h-3 w-16 rounded-full bg-slate-800" />
                    <div className="h-3 w-20 rounded-full bg-slate-800" />
                  </div>
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


