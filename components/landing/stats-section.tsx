"use client"

import { Container } from "@/components/ui/container"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { motion } from "framer-motion"

const stats = [
  { label: "Monthly Users", value: 15000, suffix: "+" },
  { label: "Transactions", value: 2300000, prefix: "$", suffix: "+" },
  { label: "Listings Sold", value: 500, suffix: "+" },
  { label: "Active Listings", value: 1200, suffix: "+" },
]

export function StatsSection() {
  return (
    <section className="relative py-16 md:py-20 bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.3),_transparent_55%)]" />
      <Container>
        <div className="relative z-10 mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300/80 mb-2">
            Marketly in numbers
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
            A trusted marketplace built for serious deals
          </h2>
        </div>
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group rounded-2xl border border-slate-700/60 bg-slate-900/70 px-4 py-4 md:px-5 md:py-5 shadow-[0_18px_40px_rgba(15,23,42,0.90)] backdrop-blur-xl hover:border-indigo-500/70 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.95)] transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400/80">
                  {stat.label}
                </p>
                <span className="h-6 w-6 rounded-full bg-indigo-500/10 border border-indigo-400/40 group-hover:bg-indigo-500/20 transition-colors" />
              </div>
              <div className="text-2xl md:text-3xl font-semibold text-slate-50">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-400/90">
                Verified platform activity
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}


