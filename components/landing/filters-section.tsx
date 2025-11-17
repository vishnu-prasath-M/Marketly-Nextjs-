"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { SlidersHorizontal, ArrowUpDown } from "lucide-react"

export function FiltersSection() {
  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-b from-slate-100 via-slate-100 to-slate-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.25),_transparent_60%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="relative z-10 mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters & sorting
            </p>
            <h2 className="mt-2 text-xl md:text-2xl font-semibold text-slate-900">
              Shape the marketplace around what you care about
            </h2>
          </div>
          <p className="max-w-md text-xs md:text-sm text-slate-600">
            Quickly explore listings by category, price, revenue, and margins—then sort by
            what matters most to you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="relative z-10 rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-[0_18px_45px_rgba(15,23,42,0.16)]"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Category filter */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-700">Category</label>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none ring-indigo-500/40 focus:border-indigo-500 focus:ring-2">
                <option value="">All categories</option>
                <option value="website">Websites</option>
                <option value="app">Apps</option>
                <option value="saas">SaaS tools</option>
                <option value="digital-product">Digital products</option>
                <option value="automation">Automations</option>
                <option value="template">Templates</option>
                <option value="service">Services</option>
              </select>
            </div>

            {/* Price range */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-700">Price range</label>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span>$0</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-indigo-500"
                />
                <span>$1M+</span>
              </div>
            </div>

            {/* Monthly revenue */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-700">Monthly revenue</label>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span>$0</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-indigo-500"
                />
                <span>$100k+</span>
              </div>
            </div>

            {/* Profit margin */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-700">Profit margin</label>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span>0%</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-500"
                />
                <span>90%+</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 text-xs md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-slate-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live filters are illustrative
              </span>
              <span>Adjust them on the full marketplace page for deeper control.</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-700">
                <ArrowUpDown className="h-3.5 w-3.5" />
                <select className="bg-transparent text-[11px] outline-none">
                  <option value="newest">Newest</option>
                  <option value="revenue">Highest revenue</option>
                  <option value="margin">Highest margin</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
              <Button size="sm" variant="outline" className="border-slate-600/80 text-slate-100">
                View all filters
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
