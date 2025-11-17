"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What types of digital assets can I buy on Marketly?",
    answer:
      "You can discover websites, SaaS tools, apps, digital products, automations, templates, and service-based businesses.",
  },
  {
    question: "How are listings vetted before they go live?",
    answer:
      "Sellers provide financials, traffic data, and key metrics that go through an internal review so buyers can evaluate deals with confidence.",
  },
  {
    question: "Do you offer escrow or protected payments?",
    answer:
      "Yes. Marketly supports secure escrow-style flows to help both parties complete the transaction safely.",
  },
  {
    question: "Can I sell multiple projects under one account?",
    answer:
      "Absolutely. Many founders use Marketly to manage an entire portfolio of digital assets from a single account.",
  },
  {
    question: "What fees does Marketly charge?",
    answer:
      "Fees depend on the plan and the size of the transaction. You will always see transparent pricing before you publish a listing.",
  },
  {
    question: "Is Marketly suitable for first-time buyers?",
    answer:
      "Yes. We are designed for both seasoned operators and first-time buyers, with clear data and guided workflows.",
  },
  {
    question: "Can I communicate with buyers or sellers before committing?",
    answer:
      "Yes. You can chat securely inside Marketly to clarify details, negotiate, and align on transition plans.",
  },
  {
    question: "What happens after a deal closes?",
    answer:
      "We provide a structured handover checklist so both parties can complete access transfer, documentation, and onboarding smoothly.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),_transparent_60%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-10 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700 mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">
            Answers to common questions
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about buying and selling digital assets on Marketly.
          </p>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white/95 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question} className="border-b border-slate-800/70 last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-sm font-medium text-slate-900">
                    {faq.question}
                  </span>
                  <motion.span
                    initial={false}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 border border-slate-200"
                  >
                    <ChevronDown className="h-4 w-4 text-slate-600" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-4 text-sm text-slate-600"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
