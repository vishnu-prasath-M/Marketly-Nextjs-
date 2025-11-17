import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import { ListingCard } from "@/components/listings/listing-card"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface ListingsPageProps {
  searchParams: {
    type?: string
    category?: string
    search?: string
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
  const listings = await prisma.listing.findMany({
    where: {
      status: "active",
      ...(searchParams.type && { type: searchParams.type.toUpperCase() as any }),
      ...(searchParams.search && {
        OR: [
          { title: { contains: searchParams.search, mode: "insensitive" } },
          { shortDescription: { contains: searchParams.search, mode: "insensitive" } },
        ],
      }),
    },
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
    take: 50,
  })

  // Ensure we always show exactly 9 listings
  const displayListings = listings.length >= 9 
    ? listings.slice(0, 9)
    : [...listings, ...dummyListings.slice(0, 9 - listings.length)]

  if (displayListings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No listings found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayListings.map((listing) => (
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
  return (
    <Container className="py-8">
      <PageHeader
        title="Browse Listings"
        description="Discover profitable digital businesses for sale"
      />
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search listings..."
            className="pl-10"
            defaultValue={searchParams.search}
          />
        </div>
        <Select defaultValue={searchParams.type || "all"}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="saas">SaaS</SelectItem>
            <SelectItem value="ecommerce">Ecommerce</SelectItem>
            <SelectItem value="app">App</SelectItem>
            <SelectItem value="website">Website</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Suspense fallback={<ListingsSkeleton />}>
        <ListingsGrid searchParams={searchParams} />
      </Suspense>
    </Container>
  )
}

