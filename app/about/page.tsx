"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="bg-[#F3F4F6]">
      <section className="border-b border-slate-200/60 bg-[#1F2937] text-white">
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 ring-1 ring-white/10"
              >
                About Marketly
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.5 }}
                className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
              >
                A trusted marketplace for modern digital acquisitions.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.5 }}
                className="mt-4 text-sm leading-relaxed text-slate-200 md:text-base"
              >
                Marketly connects vetted buyers and sellers of digital businesses
data-first evaluations, transparent metrics, and a secure negotiation flow.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5 }}
                className="mt-6 flex flex-wrap gap-3"
              >
                <Button className="bg-[#4F46E5] text-white hover:bg-indigo-500" asChild>
                  <a href="/listings">Browse listings</a>
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white/10"
                  asChild
                >
                  <a href="/auth/register">Create a free account</a>
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.5 }}
              className="grid gap-4 text-sm text-slate-200"
            >
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  For buyers
                </p>
                <p className="mt-2 text-sm">
                  Discover vetted SaaS products, apps, content sites and ecommerce
                  brands with clear revenue, profit and traffic metrics.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
                    For sellers
                  </p>
                  <p className="mt-2 text-sm">
                    Showcase your business with premium listing pages and a
                    guided offer pipeline built to maximise trust.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                    Platform
                  </p>
                  <p className="mt-2 text-sm">
                    Role-based access, secure messaging, and admin oversight keep
                    every transaction safe and compliant.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="bg-[#F3F4F6]">
        <Container className="py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:col-span-1">
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Why teams trust Marketly
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Built with operators in mind: reliable data, responsive UI, and
                flows that mirror how real deals get done.
              </p>
            </div>
            <div className="md:col-span-2 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Transparent metrics
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Standardised revenue, profit and traffic fields make it easy to
                  compare opportunities across categories.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Secure conversations
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Built-in messaging keeps buyer–seller communication on-platform
                  with clear context on each listing.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Seller review & roles
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  A structured seller approval flow ensures that only verified
                  operators can publish listings.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Modern, responsive UI
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Crafted for mobile, tablet and desktop with a clean SaaS
                  aesthetic and accessible components.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200/60 bg-white">
        <Container className="py-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Built for both first-time and experienced operators.
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Whether you&apos;re buying your first micro-SaaS or running an
                acquisition roll-up, Marketly gives you a fast, structured way to
                evaluate and negotiate deals.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[140px] rounded-2xl bg-[#1F2937] px-4 py-3 text-xs text-slate-100">
                <p className="font-semibold">Buyers</p>
                <p className="mt-1 text-slate-300">
                  Save time with filters, search and a unified inbox for all
                  conversations.
                </p>
              </div>
              <div className="flex-1 min-w-[140px] rounded-2xl bg-[#4F46E5] px-4 py-3 text-xs text-slate-50">
                <p className="font-semibold">Sellers</p>
                <p className="mt-1 text-slate-100/90">
                  Create structured listings, respond to offers, and track deal
                  momentum from a single dashboard.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
