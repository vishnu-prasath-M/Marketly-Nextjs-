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
    <section className="py-20 bg-secondary/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Marketly</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Marketly is the premier marketplace for buying and selling digital
            businesses. We connect entrepreneurs with profitable opportunities,
            making it easy to start, grow, or exit your digital venture.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-background rounded-xl p-8 shadow-soft">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To democratize access to digital business ownership by creating a
              transparent, secure, and efficient marketplace. We believe everyone
              should have the opportunity to own and grow a profitable digital
              business, whether you're buying your first asset or selling your
              successful venture.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-background rounded-xl p-8 shadow-soft">
            <h3 className="text-2xl font-semibold mb-4">Why Trust Marketly?</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Buyers and sellers trust Marketly because we provide:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  Verified listings with real financial data and traffic metrics
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  Secure escrow services for safe transactions
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  Expert support throughout the buying and selling process
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  Transparent pricing and no hidden fees
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <Card className="h-full hover:shadow-soft-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
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


