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
    <section className="relative py-20 bg-slate-950">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mb-12 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-indigo-100/90 mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-50 mb-3">
            Simple, transparent pricing
          </h2>
          <p className="text-sm md:text-base text-slate-300/90 max-w-2xl mx-auto">
            Start for free, then upgrade when you are ready to list, promote, or scale
            your portfolio of digital assets.
          </p>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <Card
                  className={`h-full flex flex-col relative overflow-hidden ${
                    plan.popular
                      ? "border-indigo-500/80 shadow-[0_24px_70px_rgba(79,70,229,0.6)] scale-105"
                      : "border-slate-700/70 hover:border-indigo-500/70 hover:shadow-[0_20px_60px_rgba(15,23,42,0.9)] transition-all shadow-[0_16px_45px_rgba(15,23,42,0.85)]"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 flex items-center gap-1 rounded-bl-xl bg-gradient-to-l from-indigo-500 via-indigo-500/90 to-indigo-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-50">
                      <Crown className="h-3 w-3" />
                      Recommended
                    </div>
                  )}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-50`}
                  />
                  <CardHeader className="relative bg-slate-950/60">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    </div>
                    <CardDescription className="text-slate-300/90">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-slate-50">
                        {plan.price}
                      </span>
                      <span className="ml-2 text-sm text-slate-400">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="relative flex-1 bg-slate-950/40">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-200/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="relative bg-slate-950/60">
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


