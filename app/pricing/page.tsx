"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

const plans = [
  {
    id: "annual",
    name: "Annual Plan",
    price: "$49/year",
    original: "$149",
    highlightLabel: "Most Popular",
    description: "Best for active buyers who want full access to premium listings and tools.",
    primary: true,
    badge: "Save 65%",
    cta: "Start Annual Plan",
  },
  {
    id: "lifetime",
    name: "Lifetime Plan",
    price: "$249 one-time",
    original: "$449",
    highlightLabel: "Lifetime Access",
    description: "For serious buyers who want permanent access and priority support.",
    primary: true,
    badge: "Lifetime Access",
    cta: "Get Lifetime Access",
  },
  {
    id: "free",
    name: "Free Viewer",
    price: "$0",
    original: "",
    highlightLabel: "",
    description: "Browse the marketplace and explore opportunities at no cost.",
    primary: false,
    badge: "",
    cta: "Browse Marketplace",
  },
]

const buyerFeatures = [
  "Browse verified listings",
  "View financial metrics",
  "Send offers",
  "Secure messaging",
  "Save favorite listings",
  "Email alerts for new listings",
  "Unlimited browsing",
  "Access to premium listings",
]

const lifetimeExtra = ["Priority support"]

const faqs = [
  {
    q: "Who is this pricing for?",
    a: "These plans are designed exclusively for buyers on Marketly who want better access to listings, insights, and tools.",
  },
  {
    q: "Can I upgrade from Free to Annual or Lifetime later?",
    a: "Yes. You can upgrade at any time from your account settings. Your new plan will activate immediately after payment.",
  },
  {
    q: "Do you offer refunds?",
    a: "We do not typically offer refunds, but if something goes wrong, reach out to our support team and we'll review your case.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We support all major credit and debit cards through our secure payment provider.",
  },
  {
    q: "Will my subscription renew automatically?",
    a: "The Annual plan renews automatically each year. You can cancel renewal at any time from your billing settings.",
  },
  {
    q: "Is seller pricing included here?",
    a: "No. Sellers can list their businesses for free on Marketly. We only take a 5% commission on successful exits.",
  },
]

export default function PricingPage() {
  return (
    <div className="bg-[#F3F4F6]">
      {/* Hero */}
      <section className="border-b border-slate-200/60 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-900/95 text-white">
        <Container className="py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 ring-1 ring-white/10"
            >
              Buyer Pricing
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            >
              Choose the plan that fits your goals.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.5 }}
              className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base"
            >
              Unlock full access to premium listings, financials, and tools designed for serious buyers.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Pricing cards */}
      <section className="bg-[#F3F4F6]">
        <Container className="py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end"
          >
            <div>
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Buyer plans built for modern acquisitions
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Start with Free to explore the marketplace, then upgrade to Annual or Lifetime when you&apos;re ready to move.
              </p>
            </div>
            <p className="text-xs text-slate-500">
              Cancel or upgrade anytime. No hidden fees.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const isPrimary = plan.primary
              const isLifetime = plan.id === "lifetime"

              return (
                <motion.div
                  key={plan.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  custom={index}
                  className={`relative flex flex-col rounded-2xl border bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isPrimary
                      ? "border-slate-900/10"
                      : "border-slate-200/80"
                  }`}
                >
                  {plan.highlightLabel && (
                    <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                      {plan.highlightLabel}
                    </div>
                  )}
                  {plan.badge && (
                    <div className="mt-1 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 ring-1 ring-emerald-200">
                      {plan.badge}
                    </div>
                  )}

                  <div className="mt-3 space-y-1">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-semibold text-slate-900">
                        {plan.price}
                      </p>
                      {plan.original && (
                        <p className="text-xs text-slate-400 line-through">
                          {plan.original}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mt-5">
                    <Button
                      size="lg"
                      className={`w-full justify-center text-sm font-semibold ${
                        isPrimary
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    {isLifetime && (
                      <p className="mt-2 text-[11px] text-slate-500">
                        One-time payment. No renewals. Lifetime access to buyer features.
                      </p>
                    )}
                  </div>

                  <div className="mt-6 space-y-2 text-xs">
                    {buyerFeatures.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="mt-[2px] h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                    {isLifetime && (
                      <div className="flex items-start gap-2">
                        <Check className="mt-[2px] h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-slate-700">Priority support</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Optional comparison section */}
      <section className="border-t border-slate-200/60 bg-white">
        <Container className="py-10 md:py-14">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 md:text-base">
                Compare buyer plans
              </h3>
              <p className="mt-1 text-xs text-slate-500 md:text-sm">
                See what&apos;s included in Free versus Annual and Lifetime.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60">
            <div className="grid grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] text-xs font-medium text-slate-500">
              <div className="border-b border-slate-200/70 bg-slate-50 px-4 py-3 text-left">
                Feature
              </div>
              <div className="border-b border-l border-slate-200/70 bg-slate-50 px-4 py-3 text-center">
                Free
              </div>
              <div className="border-b border-l border-slate-200/70 bg-slate-50 px-4 py-3 text-center">
                Annual
              </div>
              <div className="border-b border-l border-slate-200/70 bg-slate-50 px-4 py-3 text-center">
                Lifetime
              </div>
            </div>

            {[
              "Browse verified listings",
              "View financial metrics",
              "Send offers",
              "Secure messaging",
              "Save favorite listings",
              "Email alerts for new listings",
              "Access to premium listings",
              "Priority support",
            ].map((feature) => {
              const isPremiumOnly = feature === "Priority support"

              return (
                <div
                  key={feature}
                  className="grid grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] text-xs text-slate-700"
                >
                  <div className="border-t border-slate-200 bg-white px-4 py-3">
                    {feature}
                  </div>
                  <div className="flex items-center justify-center border-t border-l border-slate-200 bg-white/80">
                    {!isPremiumOnly && (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-center border-t border-l border-slate-200 bg-white/80">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                  <div className="flex items-center justify-center border-t border-l border-slate-200 bg-white/80">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Seller commission note */}
      <section className="border-t border-slate-200/60 bg-[#F3F4F6]">
        <Container className="py-10">
          <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 text-sm text-slate-800 shadow-sm">
            <p className="font-medium text-slate-900">Selling?</p>
            <p className="mt-1 text-sm text-slate-700">
              Sellers can list for free. Marketly only takes a 5% commission on successful exits.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200/60 bg-white">
        <Container className="py-12 md:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Pricing FAQs
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Answers to common questions about buyer plans on Marketly.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((item, index) => (
                <AccordionItem
                  key={item.q}
                  value={`faq-${index}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 px-4"
                >
                  <AccordionTrigger className="text-left text-sm font-medium text-slate-900">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-slate-600">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* CTA footer */}
      <section className="border-t border-slate-200/60 bg-slate-900 text-white">
        <Container className="py-10 md:py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-lg font-semibold md:text-xl">
                Start your plan today.
              </h2>
              <p className="mt-1 text-xs text-slate-300 md:text-sm">
                Join serious buyers using Marketly to discover, evaluate, and acquire digital businesses.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-white text-slate-900 hover:bg-slate-100">
                Start Annual Plan
              </Button>
              <Button className="bg-emerald-500 text-white hover:bg-emerald-400">
                Get Lifetime Access
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
