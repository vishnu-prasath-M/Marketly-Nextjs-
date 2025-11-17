"use client"

import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Shield, Zap, Users, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure Transactions",
    description:
      "All transactions are protected with industry-leading security measures and escrow services.",
  },
  {
    icon: Zap,
    title: "Fast & Efficient",
    description:
      "Connect with buyers and sellers quickly. Complete deals in days, not months.",
  },
  {
    icon: Users,
    title: "Trusted Community",
    description:
      "Join thousands of verified entrepreneurs buying and selling digital businesses.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description:
      "Over $2.3M in successful transactions. Real businesses, real results.",
  },
]

export function AboutSection() {
  return (
    <section className="relative py-20 bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.25),_transparent_60%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center mb-10"
        >
          <span className="inline-flex items-center rounded-full border border-slate-500/50 bg-slate-800/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-100/90 mb-4">
            About Marketly
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-50 mb-3">
            Built for modern digital acquisitions
          </h2>
          <p className="text-sm md:text-base text-slate-300/90 max-w-3xl mx-auto">
            Marketly is the premier marketplace for buying and selling digital businesses.
            We connect operators and founders with vetted, high-quality assets.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 max-w-4xl mx-auto mb-10"
        >
          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.9)] backdrop-blur-xl">
            <h3 className="text-2xl font-semibold mb-3 text-slate-50">Our mission</h3>
            <p className="text-sm md:text-base text-slate-300/90 leading-relaxed">
              To democratize access to digital business ownership through a transparent,
              secure, and efficient marketplace. Whether you are buying your first asset or
              exiting a portfolio company, Marketly gives you the infrastructure and
              confidence to move quickly.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 max-w-4xl mx-auto mb-12"
        >
          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.9)] backdrop-blur-xl">
            <h3 className="text-2xl font-semibold mb-3 text-slate-50">Why teams trust Marketly</h3>
            <p className="text-sm md:text-base text-slate-300/90 leading-relaxed mb-4">
              Buyers and sellers choose Marketly because we combine rigorous vetting with a
              frictionless transaction experience:
            </p>
            <ul className="space-y-2 text-sm text-slate-300/90">
              <li className="flex items-start">
                <span className="mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Verified listings with real financial data and traffic metrics</span>
              </li>
              <li className="flex items-start">
                <span className="mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Secure escrow services for safe, end-to-end transactions</span>
              </li>
              <li className="flex items-start">
                <span className="mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Expert support from first conversation through handover</span>
              </li>
              <li className="flex items-start">
                <span className="mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Transparent pricing with no hidden fees</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full border border-slate-700/70 bg-slate-900/70 hover:border-indigo-500/70 hover:shadow-[0_20px_60px_rgba(15,23,42,0.9)] transition-all backdrop-blur-xl">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 mb-4 border border-indigo-400/40">
                      <Icon className="h-8 w-8 text-indigo-300" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-50">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-300/90">
                      {feature.description}
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


