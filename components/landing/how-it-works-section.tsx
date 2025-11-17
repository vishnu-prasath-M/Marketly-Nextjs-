"use client"

import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ShieldCheck, MessageCircle, HandCoins, UploadCloud } from "lucide-react"

const steps = [
  {
    icon: UploadCloud,
    title: "List your asset",
    description:
      "Create a high-conviction listing for your website, app, SaaS, or digital product in minutes.",
  },
  {
    icon: HandCoins,
    title: "Receive qualified offers",
    description:
      "Reach verified buyers with real intent. Compare offers, terms, and timelines side by side.",
  },
  {
    icon: MessageCircle,
    title: "Chat securely",
    description:
      "Discuss metrics, diligence, and transition plans in a secure, audit-friendly environment.",
  },
  {
    icon: ShieldCheck,
    title: "Close deal safely",
    description:
      "Use Marketly escrow and guided handover to complete the transaction with confidence.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative py-18 md:py-20 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),_transparent_60%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mb-10 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700 mb-4">
            How it works
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">
            From listing to close in four steps
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            A guided, secure workflow for buying and selling digital assets—designed for
            founders, operators, and investors.
          </p>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Card className="h-full border border-slate-200 bg-white backdrop-blur-xl shadow-[0_16px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_70px_rgba(15,23,42,0.14)] hover:-translate-y-1.5 transition-all">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 border border-indigo-200">
                        <Icon className="h-5 w-5 text-indigo-500" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
