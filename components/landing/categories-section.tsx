"use client"

import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  Globe,
  Smartphone,
  Sparkles,
  Box,
  Bot,
  LayoutTemplate,
  Headphones,
} from "lucide-react"

const categories = [
  {
    name: "Websites",
    description: "Content sites, blogs, and media properties",
    icon: Globe,
    href: "/listings?type=website",
    gradient: "from-indigo-500/90 via-sky-500/80 to-emerald-400/80",
  },
  {
    name: "Apps",
    description: "Mobile and web applications with traction",
    icon: Smartphone,
    href: "/listings?type=app",
    gradient: "from-fuchsia-500/90 via-purple-500/80 to-indigo-500/80",
  },
  {
    name: "SaaS Tools",
    description: "Subscription products with recurring revenue",
    icon: Sparkles,
    href: "/listings?type=saas",
    gradient: "from-emerald-400/90 via-teal-400/80 to-sky-400/80",
  },
  {
    name: "Digital Products",
    description: "Courses, assets, and info products",
    icon: Box,
    href: "/listings?type=digital-product",
    gradient: "from-amber-400/90 via-orange-500/80 to-rose-500/80",
  },
  {
    name: "Automations",
    description: "No-code workflows and automation kits",
    icon: Bot,
    href: "/listings?type=automation",
    gradient: "from-sky-400/90 via-indigo-500/80 to-emerald-400/80",
  },
  {
    name: "Templates",
    description: "Design, Notion, and product templates",
    icon: LayoutTemplate,
    href: "/listings?type=template",
    gradient: "from-violet-500/90 via-fuchsia-500/80 to-rose-500/80",
  },
  {
    name: "Services",
    description: "Agencies and done-for-you offerings",
    icon: Headphones,
    href: "/listings?type=service",
    gradient: "from-emerald-400/90 via-lime-400/80 to-amber-400/80",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900">
            Explore premium categories
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            From SaaS tools to automation kits, Marketly gives you a colorful, curated
            overview of high-quality digital assets.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link href={category.href}>
                  <Card className="relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all duration-300 group cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(15,23,42,0.15)]">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-emerald-400 opacity-0 group-hover:opacity-95 transition-opacity duration-300" />
                    <CardContent className="relative p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-col gap-2">
                          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/90 text-white shadow-lg group-hover:bg-white group-hover:text-slate-900">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-base font-semibold text-slate-900 group-hover:text-white">
                            {category.name}
                          </h3>
                        </div>
                        <span className="rounded-full border border-slate-300/80 bg-slate-50/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 group-hover:border-white/80 group-hover:bg-white/10 group-hover:text-white">
                          Explore
                        </span>
                      </div>
                      <p className="mt-3 text-xs text-slate-500 group-hover:text-slate-50/95">
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


