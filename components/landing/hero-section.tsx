"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-20 md:py-32">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-secondary/50 rounded-full px-4 py-2 mb-6">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                Join 15,000+ entrepreneurs buying and selling digital businesses
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Buy & Sell Digital Businesses
              <span className="block text-primary mt-2">
                The Premium Marketplace
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover profitable websites, SaaS products, ecommerce stores, and
              apps. Join thousands of entrepreneurs building their digital
              empire.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/listings">
                  Browse Listings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/register">Start Selling</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}


