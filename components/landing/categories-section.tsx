"use client"

import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Code, ShoppingCart, Smartphone, Globe } from "lucide-react"

const categories = [
  {
    name: "SaaS",
    description: "Software as a Service businesses",
    icon: Code,
    href: "/listings?type=saas",
    color: "text-blue-500",
  },
  {
    name: "Ecommerce",
    description: "Online stores and marketplaces",
    icon: ShoppingCart,
    href: "/listings?type=ecommerce",
    color: "text-green-500",
  },
  {
    name: "Apps",
    description: "Mobile and web applications",
    icon: Smartphone,
    href: "/listings?type=app",
    color: "text-purple-500",
  },
  {
    name: "Websites",
    description: "Content sites and blogs",
    icon: Globe,
    href: "/listings?type=website",
    color: "text-orange-500",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-20 bg-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Categories
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find the perfect digital business in your niche
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={category.href}>
                  <Card className="h-full hover:shadow-soft-lg transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className={`h-8 w-8 ${category.color} group-hover:text-primary-foreground`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}


