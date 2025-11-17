"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { motion } from "framer-motion"
import { Eye, TrendingUp } from "lucide-react"

interface ListingCardProps {
  id: string
  title: string
  slug: string
  type: string
  askingPrice: number
  monthlyRevenue: number
  profitMargin: number
  images: string[]
  views: number
  featured?: boolean
}

export function ListingCard({
  id,
  title,
  slug,
  type,
  askingPrice,
  monthlyRevenue,
  profitMargin,
  images,
  views,
  featured = false,
}: ListingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/listings/${slug}`}>
        <Card className="group overflow-hidden hover:shadow-soft-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
          <div className="relative h-48 w-full overflow-hidden bg-secondary">
            {images && images.length > 0 ? (
              <Image
                src={images[0]}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
            {featured && (
              <Badge className="absolute top-2 right-2 bg-primary">
                Featured
              </Badge>
            )}
            <Badge
              variant="secondary"
              className="absolute top-2 left-2 capitalize"
            >
              {type}
            </Badge>
          </div>
          <CardContent className="p-4 flex-1">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Asking Price
                </span>
                <span className="font-semibold text-primary">
                  {formatCurrency(askingPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Monthly Revenue
                </span>
                <span className="font-medium">
                  {formatCurrency(monthlyRevenue)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Profit Margin
                </span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium">{profitMargin}%</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{formatNumber(views)} views</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}


