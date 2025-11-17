"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Store, Twitter, Linkedin, Github, Send } from "lucide-react"

const linkColumns = [
  {
    title: "Explore",
    links: [
      { label: "Marketplace", href: "/listings" },
      { label: "Pricing", href: "/#pricing" },
      { label: "About Us", href: "/#about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Support", href: "/contact" },
      { label: "Terms & Policies", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
]

const socialLinks = [
  { label: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "GitHub", icon: Github, href: "https://github.com" },
  { label: "Telegram", icon: Send, href: "https://t.me" },
]

export function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith("/admin")) {
    return null
  }

  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-12 space-y-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="rounded-2xl bg-white/10 p-2">
                <Store className="h-5 w-5 text-emerald-400" />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Marketly
              </span>
            </Link>
            <p className="text-sm text-slate-400">
              A premium marketplace to buy and sell digital businesses with
              confidence. Built for modern founders.
            </p>
          </div>

          {linkColumns.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                {group.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center text-slate-200 transition hover:translate-x-1 hover:text-emerald-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Stay Connected
            </h3>
            <div className="flex space-x-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:scale-105 hover:bg-white/20"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between space-y-3 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:space-y-0">
          <p>© {new Date().getFullYear()} Marketly. All rights reserved.</p>
          <p className="text-slate-400">
            Crafted with care for modern entrepreneurs.
          </p>
        </div>
      </div>
    </footer>
  )
}
