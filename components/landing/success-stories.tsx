"use client"

import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const stories = [
  {
    name: "Sarah Johnson",
    role: "Bought SaaS Business",
    image: "",
    quote:
      "Found the perfect SaaS product on Marketly. The process was smooth and transparent. Highly recommend!",
    amount: "$45,000",
  },
  {
    name: "Michael Chen",
    role: "Sold Ecommerce Store",
    image: "",
    quote:
      "Sold my ecommerce store in just 2 weeks. The platform made it easy to connect with serious buyers.",
    amount: "$120,000",
  },
  {
    name: "Emily Rodriguez",
    role: "Bought Content Site",
    image: "",
    quote:
      "Marketly helped me find a profitable content site that aligned with my interests. Great experience!",
    amount: "$28,000",
  },
]

export function SuccessStories() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_60%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mb-12 text-center"
        >
          <span className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 mb-4">
            Proof in the numbers
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">
            Success stories from our marketplace
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Founders, operators, and investors across the world use Marketly to buy and sell
            meaningful digital assets.
          </p>
        </motion.div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <Card className="group h-full overflow-hidden border border-slate-200 bg-white/90 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-emerald-200/70 via-transparent to-indigo-200/70" />
                <CardContent className="relative p-6 flex flex-col items-center text-center">
                  <Avatar className="h-14 w-14 mb-4 shadow-md">
                    <AvatarImage src={story.image} />
                    <AvatarFallback className="bg-slate-900 text-slate-50 text-lg font-semibold">
                      {story.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mb-4">
                    <p className="font-semibold text-slate-900 text-sm md:text-base">
                      {story.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{story.role}</p>
                    <p className="mt-1 text-xs font-medium text-emerald-600">
                      Deal size {story.amount}
                    </p>
                  </div>
                  <Quote className="h-6 w-6 text-emerald-500 mb-3" />
                  <p className="text-sm md:text-[15px] text-slate-700 italic leading-relaxed">
                    "{story.quote}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}


