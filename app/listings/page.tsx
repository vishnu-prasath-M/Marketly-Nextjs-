import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import { Container } from "@/components/ui/container"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react"

interface ListingsPageProps {
  searchParams: {
    type?: string
    category?: string
    search?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
    minRevenue?: string
    maxRevenue?: string
    minMargin?: string
    maxMargin?: string
  }
}

// Dummy listing data for when DB has fewer than 9 listings
const dummyListings = [
  {
    id: "dummy-1",
    title: "Profitable SaaS Business - Task Management",
    slug: "dummy-1",
    type: "SAAS",
    askingPrice: 45000,
    monthlyRevenue: 3500,
    profitMargin: 75,
    images: [],
    views: 234,
    featured: true,
  },
  {
    id: "dummy-2",
    title: "Ecommerce Store - Fashion & Apparel",
    slug: "dummy-2",
    type: "ECOMMERCE",
    askingPrice: 85000,
    monthlyRevenue: 12000,
    profitMargin: 60,
    images: [],
    views: 456,
    featured: false,
  },
  {
    id: "dummy-3",
    title: "Mobile App - Fitness Tracker",
    slug: "dummy-3",
    type: "APP",
    askingPrice: 65000,
    monthlyRevenue: 8000,
    profitMargin: 70,
    images: [],
    views: 321,
    featured: true,
  },
  {
    id: "dummy-4",
    title: "Content Website - Tech Blog",
    slug: "dummy-4",
    type: "WEBSITE",
    askingPrice: 28000,
    monthlyRevenue: 2500,
    profitMargin: 80,
    images: [],
    views: 189,
    featured: false,
  },
  {
    id: "dummy-5",
    title: "SaaS Platform - CRM Solution",
    slug: "dummy-5",
    type: "SAAS",
    askingPrice: 120000,
    monthlyRevenue: 15000,
    profitMargin: 65,
    images: [],
    views: 567,
    featured: true,
  },
  {
    id: "dummy-6",
    title: "Ecommerce - Electronics Store",
    slug: "dummy-6",
    type: "ECOMMERCE",
    askingPrice: 95000,
    monthlyRevenue: 18000,
    profitMargin: 55,
    images: [],
    views: 432,
    featured: false,
  },
  {
    id: "dummy-7",
    title: "Web App - Project Management Tool",
    slug: "dummy-7",
    type: "APP",
    askingPrice: 75000,
    monthlyRevenue: 10000,
    profitMargin: 72,
    images: [],
    views: 298,
    featured: false,
  },
  {
    id: "dummy-8",
    title: "Content Site - Finance News",
    slug: "dummy-8",
    type: "WEBSITE",
    askingPrice: 35000,
    monthlyRevenue: 4000,
    profitMargin: 78,
    images: [],
    views: 234,
    featured: false,
  },
  {
    id: "dummy-9",
    title: "SaaS - Email Marketing Platform",
    slug: "dummy-9",
    type: "SAAS",
    askingPrice: 55000,
    monthlyRevenue: 6000,
    profitMargin: 68,
    images: [],
    views: 345,
    featured: false,
  },
]

async function ListingsGrid({ searchParams }: ListingsPageProps) {
  const where: any = {
    status: "active",
    ...(searchParams.type && { type: searchParams.type.toUpperCase() as any }),
    ...(searchParams.category && {
      category: {
        slug: searchParams.category,
      },
    }),
    ...(searchParams.search && {
      OR: [
        { title: { contains: searchParams.search, mode: "insensitive" } },
        { shortDescription: { contains: searchParams.search, mode: "insensitive" } },
      ],
    }),
  }

  // Numeric filters
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined
  const minRevenue = searchParams.minRevenue ? Number(searchParams.minRevenue) : undefined
  const maxRevenue = searchParams.maxRevenue ? Number(searchParams.maxRevenue) : undefined
  const minMargin = searchParams.minMargin ? Number(searchParams.minMargin) : undefined
  const maxMargin = searchParams.maxMargin ? Number(searchParams.maxMargin) : undefined

  if (minPrice || maxPrice) {
    where.askingPrice = {
      ...(minPrice && { gte: minPrice }),
      ...(maxPrice && { lte: maxPrice }),
    }
  }

  if (minRevenue || maxRevenue) {
    where.monthlyRevenue = {
      ...(minRevenue && { gte: minRevenue }),
      ...(maxRevenue && { lte: maxRevenue }),
    }
  }

  if (minMargin || maxMargin) {
    where.profitMargin = {
      ...(minMargin && { gte: minMargin }),
      ...(maxMargin && { lte: maxMargin }),
    }
  }

  let orderBy: any = { createdAt: "desc" }

  switch (searchParams.sort) {
    case "price_desc":
      orderBy = { askingPrice: "desc" }
      break
    case "revenue_desc":
      orderBy = { monthlyRevenue: "desc" }
      break
    case "trending":
      orderBy = { views: "desc" }
      break
    default:
      orderBy = { createdAt: "desc" }
  }

  const listings = await prisma.listing.findMany({
    where,
    include: {
      category: true,
      seller: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy,
    take: 50,
  })

  // Ensure we always show exactly 9 listings
  const displayListings = listings.length >= 9 
    ? listings.slice(0, 9)
    : [...listings, ...dummyListings.slice(0, 9 - listings.length)]

  return (
    <>
      {displayListings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No listings found.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayListings.map((listing) => (
            <div
              key={listing.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow duration-300 hover:shadow-soft-lg border border-slate-100"
            >
              <div
                className="aspect-video w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    listing.images && listing.images.length > 0
                      ? `url(${listing.images[0]})`
                      : "linear-gradient(135deg, #4F46E5, #10B981)",
                }}
              />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-base font-semibold leading-tight text-slate-900 line-clamp-2">
                  {listing.title}
                </p>
                <div className="mt-auto pt-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500">Asking Price</p>
                      <p className="text-xl font-bold text-indigo-600">
                        ${listing.askingPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 pt-3 text-sm">
                      <div>
                        <p className="text-xs text-slate-500">Revenue</p>
                        <p className="font-semibold text-slate-900">
                          ${listing.monthlyRevenue.toLocaleString()}/mo
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Profit Margin</p>
                        <p className="font-semibold text-slate-900">
                          {listing.profitMargin}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

function ListingsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-96" />
      ))}
    </div>
  )
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  })

  return (
    <Container className="py-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Marketplace</h1>
          <p className="mt-1 text-sm text-slate-600">
            Find your next digital business to acquire.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Sort by:</span>
          <select
            name="sort"
            defaultValue={searchParams.sort || "newest"}
            className="flex h-10 items-center justify-center gap-2 rounded-xl bg-white pl-4 pr-8 text-sm font-medium text-slate-900 shadow-soft border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
          >
            <option value="newest">Newest</option>
            <option value="price_desc">Highest price</option>
            <option value="revenue_desc">Highest revenue</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      <form
        className="mt-8 grid gap-8 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)]"
        method="GET"
      >
        {/* Left sidebar filters */}
        <aside className="space-y-4 md:sticky md:top-28 md:self-start">
          <h2 className="text-sm font-semibold text-slate-800">Filters</h2>
          <button
            type="button"
            className="flex h-11 w-full items-center justify-between rounded-xl bg-white px-4 text-sm font-medium text-slate-900 shadow-soft border border-slate-200"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-slate-500" />
              Quick filters
            </span>
            <span className="text-xs text-slate-500">(UI only)</span>
          </button>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Type
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="submit"
                name="type"
                value="saas"
                variant="outline"
                className="h-9 rounded-full bg-white px-3 text-xs font-medium text-slate-900 shadow-soft border-slate-200"
              >
                SaaS
              </Button>
              <Button
                type="submit"
                name="type"
                value="ecommerce"
                variant="outline"
                className="h-9 rounded-full bg-white px-3 text-xs font-medium text-slate-900 shadow-soft border-slate-200"
              >
                E-commerce
              </Button>
              <Button
                type="submit"
                name="type"
                value="website"
                variant="outline"
                className="h-9 rounded-full bg-white px-3 text-xs font-medium text-slate-900 shadow-soft border-slate-200"
              >
                Content
              </Button>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Categories
            </p>
            <div className="flex flex-col gap-1">
              <Button
                type="submit"
                name="category"
                value=""
                variant="outline"
                className={`justify-start h-8 rounded-full px-3 text-xs font-medium shadow-soft border ${
                  !searchParams.category
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-900 border-slate-200"
                }`}
              >
                All categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  type="submit"
                  name="category"
                  value={category.slug}
                  variant="outline"
                  className={`justify-start h-8 rounded-full px-3 text-xs font-medium shadow-soft border ${
                    searchParams.category === category.slug
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-900 border-slate-200"
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right content: search + listings */}
        <div>
          <div className="relative mb-6">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              name="search"
              placeholder="Search by name, category, keyword..."
              className="rounded-full border-0 bg-white py-3 pl-11 pr-4 text-slate-900 shadow-soft focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              defaultValue={searchParams.search}
            />
          </div>

          <Suspense fallback={<ListingsSkeleton />}>
            <ListingsGrid searchParams={searchParams} />
          </Suspense>
        </div>
      </form>
    </Container>
  )
}

