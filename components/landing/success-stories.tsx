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
    <section className="py-20 bg-secondary/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real transactions from real entrepreneurs
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="text-muted-foreground mb-6 italic">
                    "{story.quote}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={story.image} />
                      <AvatarFallback>
                        {story.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{story.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {story.role}
                      </p>
                      <p className="text-sm font-medium text-primary mt-1">
                        {story.amount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}


