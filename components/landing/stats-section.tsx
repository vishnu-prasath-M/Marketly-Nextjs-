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
    <section className="py-20 bg-secondary/30">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}


