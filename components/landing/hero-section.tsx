"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-20 h-72 w-72 rounded-[40px] bg-gradient-to-br from-indigo-500/60 via-fuchsia-500/40 to-emerald-400/40 blur-3xl opacity-80" />
        <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-[40px] bg-gradient-to-tr from-emerald-400/55 via-sky-400/45 to-indigo-500/40 blur-3xl opacity-75" />
        <div className="absolute inset-y-6 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.28),_transparent_60%)] opacity-90" />
      </div>
      <Container>
        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-center pb-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center space-x-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 backdrop-blur-md shadow-sm mb-6">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <span className="text-xs font-medium tracking-wide text-slate-700">
                Trusted by 15,000+ founders & operators
              </span>
            </div>
            <div className="relative mb-6">
              <div className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-[46px] bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.25),_transparent_70%)]" />
              <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                Buy & Sell Digital Assets
                <span className="block bg-gradient-to-r from-indigo-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent mt-2">
                  With Confidence
                </span>
              </h1>
            </div>
            <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              Marketly is the curated marketplace for acquiring and exiting premium
              websites, SaaS apps, ecommerce brands, and digital products. Every
              asset is vetted so you can move fast—without losing trust.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto shadow-md">
                <Link href="/listings">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              >
                <Link href="/auth/register">Become a Seller</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-col gap-4 text-sm text-slate-600 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div>
                  <p className="font-medium">Live deals closing every week</p>
                  <p className="text-xs text-slate-500">$2.3M+ in verified transaction volume</p>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-slate-500">
                <span>Verified buyers & sellers</span>
                <span className="hidden sm:inline-block h-4 w-px bg-slate-700" />
                <span>Secure escrow workflows</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-[0_24px_80px_rgba(15,23,42,0.25)]">
              <div className="pointer-events-none absolute -top-10 right-4 h-20 w-20 rounded-full bg-gradient-to-b from-indigo-400/40 to-transparent blur-2xl opacity-80" />
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Live marketplace</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">Premium assets this week</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 border border-emerald-200">
                  Curated
                </span>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="font-medium text-slate-900">SaaS billing platform</p>
                    <p className="text-xs text-slate-500">MRR $12.4k · Churn 2.1%</p>
                  </div>
                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs text-yellow-600 border border-yellow-200">
                    4.2x ARR
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="font-medium text-slate-900">Content site network</p>
                    <p className="text-xs text-slate-500">Profit margin 78% · SEO moat</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-600 border border-emerald-200">
                    New
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="font-medium text-slate-900">DTC ecommerce brand</p>
                    <p className="text-xs text-slate-500">$480k TTM · 62% repeat</p>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs text-indigo-600 border border-indigo-200">
                    Featured
                  </span>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                <span>Real-time interest from verified buyers</span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live now
                </span>
              </div>
            </div>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-6 -bottom-8 h-28 w-28 rounded-3xl border border-indigo-500/50 bg-indigo-500/10 backdrop-blur-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -left-4 top-10 h-20 w-20 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}


