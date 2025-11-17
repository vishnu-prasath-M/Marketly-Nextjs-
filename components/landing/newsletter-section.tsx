"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function NewsletterSection() {
  const { data: session } = useSession()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  if (!session) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
  }

  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-b from-slate-100 via-slate-100 to-slate-200">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-indigo-500/40 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400 p-[1px] shadow-[0_22px_70px_rgba(15,23,42,0.95)]"
        >
          <div className="flex flex-col gap-6 rounded-[22px] bg-slate-950/90 px-6 py-6 sm:px-8 sm:py-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-200 mb-2">
                Marketly newsletter
              </p>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-2">
                Stay updated with new listings & marketplace insights
              </h2>
              <p className="text-xs md:text-sm text-slate-300/90">
                Receive hand-picked opportunities, product releases, and acquisition insights
                directly in your inbox.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:max-w-xs">
              <div className="flex h-11 items-center rounded-full bg-slate-900/90 px-1.5">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-9 flex-1 border-none bg-transparent px-3 text-xs text-slate-100 placeholder:text-slate-500 focus-visible:ring-0"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-8 rounded-full bg-indigo-500 px-4 text-xs font-medium text-white hover:bg-indigo-400"
                  disabled={subscribed}
                >
                  {subscribed ? "Subscribed" : "Subscribe"}
                </Button>
              </div>
              <p className="text-[11px] text-slate-500">
                No spam, ever. Just high-signal updates from the Marketly team.
              </p>
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
