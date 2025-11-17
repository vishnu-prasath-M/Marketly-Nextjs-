"use client"

import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Check, Sparkles, TrendingUp, Crown } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free Plan",
    description: "Perfect for buyers getting started",
    price: "$0",
    period: "forever",
    features: [
      "Browse all listings",
      "Save favorite listings",
      "Basic search & filters",
      "View listing details",
      "Contact sellers",
      "Community support",
    ],
    cta: "Get Started",
    icon: Sparkles,
    popular: false,
    gradient: "from-secondary/50 to-background",
  },
  {
    name: "Seller Plan",
    description: "Everything you need to sell your business",
    price: "$29",
    period: "per month",
    features: [
      "List unlimited businesses",
      "Receive & manage offers",
      "Priority customer support",
      "Messaging with buyers",
      "Analytics dashboard",
      "Email notifications",
      "Listing management tools",
    ],
    cta: "Start Selling",
    icon: TrendingUp,
    popular: true,
    gradient: "from-primary/20 to-secondary/20",
  },
  {
    name: "Pro Seller Plan",
    description: "Advanced features for serious sellers",
    price: "$99",
    period: "per month",
    features: [
      "Everything in Seller Plan",
      "Priority listing placement",
      "Featured listing badges",
      "Advanced analytics & insights",
      "Dedicated account manager",
      "Custom listing templates",
      "API access",
      "White-label options",
    ],
    cta: "Go Pro",
    icon: Crown,
    popular: false,
    gradient: "from-accent/20 to-primary/20",
  },
]

export function PricingSection() {
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  className={`h-full flex flex-col relative overflow-hidden ${
                    plan.popular
                      ? "border-primary shadow-soft-lg scale-105"
                      : "hover:shadow-soft-lg transition-all"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg text-xs font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-50`}
                  />
                  <CardHeader className="relative">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">
                        /{plan.period}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="relative flex-1">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="relative">
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                      asChild
                    >
                      <Link href="/auth/register">{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}


