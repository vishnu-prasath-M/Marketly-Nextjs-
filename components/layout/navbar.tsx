"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Store,
  Menu,
  X,
  MessageCircle,
  UserRound,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Marketplace", href: "/listings", match: "/listings" },
  { label: "Pricing", href: "/pricing", match: "/pricing" },
  { label: "About Us", href: "/#about", match: "#about" },
]

export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeHash, setActiveHash] = useState("")

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    const handleHash = () => setActiveHash(window.location.hash || "")
    handleHash()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("hashchange", handleHash)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", handleHash)
    }
  }, [])

  if (pathname?.startsWith("/admin")) {
    return null
  }

  const handleNav = (href: string) => {
    if (href.startsWith("/#")) {
      const section = href.split("#")[1]
      if (pathname === "/") {
        const el = document.getElementById(section)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        router.push(href)
      }
    } else {
      router.push(href)
    }
    setDrawerOpen(false)
  }

  const isActive = (link: (typeof navLinks)[number]) => {
    if (link.match.startsWith("#")) {
      return pathname === "/" && activeHash === link.match
    }
    return pathname?.startsWith(link.match)
  }

  const renderLinks = (variant: "desktop" | "mobile") =>
    navLinks.map((link) => (
      <button
        key={link.label}
        onClick={() => handleNav(link.href)}
        className={cn(
          "relative text-sm font-medium transition-all duration-300 group",
          variant === "desktop"
            ? "text-slate-600 hover:text-slate-900"
            : "w-full text-left text-slate-200"
        )}
      >
        <span className={cn(isActive(link) && "text-indigo-500")}>
          {link.label}
        </span>
        <span
          className={cn(
            "absolute left-0 right-0 -bottom-1 mx-auto h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300",
            isActive(link)
              ? "w-full opacity-100"
              : "w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-60"
          )}
        />
      </button>
    ))

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-xl transition-all duration-500",
          isScrolled && "shadow-[0_18px_40px_-20px_rgba(15,23,42,0.35)]"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-0">
          <Link
            href="/"
            className="flex items-center space-x-2 rounded-2xl bg-white/70 px-3 py-2 text-slate-900 shadow-sm transition hover:shadow-[0_0_20px_rgba(79,70,229,0.2)]"
          >
            <Store className="h-5 w-5 text-indigo-600" />
            <span className="font-semibold tracking-tight">Marketly</span>
          </Link>

          <div className="hidden items-center space-x-6 md:flex">
            {renderLinks("desktop")}
          </div>

          <div className="hidden items-center space-x-3 md:flex">
            {session ? (
              <>
                <Link
                  href="/messages"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:scale-105 hover:bg-slate-200"
                >
                  <MessageCircle className="h-5 w-5" />
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 rounded-full bg-slate-900/5 px-2 py-1 transition hover:shadow-lg">
                      <Avatar className="h-9 w-9 border border-slate-200">
                        <AvatarImage src={session.user?.image || ""} />
                        <AvatarFallback className="bg-indigo-600 text-white">
                          {session.user?.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-semibold text-slate-800">
                        {session.user?.name || "Profile"}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 rounded-2xl border-slate-100 shadow-2xl">
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold text-slate-900">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {session.user?.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center space-x-2">
                        <UserRound className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    {session.user?.role === "BUYER" && (
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center space-x-2">
                          <span>Become a Seller</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {session.user?.role === "SELLER" && (
                      <DropdownMenuItem asChild>
                        <Link href="/seller/dashboard" className="flex items-center space-x-2">
                          <span>Seller Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-slate-700" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button className="bg-indigo-600 text-white hover:bg-indigo-500" asChild>
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 transition hover:border-indigo-300 hover:text-indigo-600 md:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center space-x-2">
                  <div className="rounded-xl bg-slate-800 p-2">
                    <Store className="h-5 w-5 text-indigo-400" />
                  </div>
                  <span className="text-lg font-semibold">Marketly</span>
                </div>
                <button
                  className="rounded-full border border-white/20 p-2"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="border-t border-white/10 px-4 py-6 space-y-4">
                <div className="space-y-2">{renderLinks("mobile")}</div>
                <div className="h-px bg-white/10" />
                {session ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 rounded-2xl bg-white/10 p-3">
                      <Avatar className="h-11 w-11">
                        <AvatarImage src={session.user?.image || ""} />
                        <AvatarFallback className="bg-indigo-500 text-white">
                          {session.user?.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-slate-300">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="ghost"
                        className="justify-start text-slate-200 hover:bg-white/10"
                        asChild
                      >
                        <Link href="/profile">Profile</Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start text-slate-200 hover:bg-white/10"
                        asChild
                      >
                        <Link href="/messages">Messages</Link>
                      </Button>
                      {session.user?.role === "SELLER" && (
                        <Button
                          variant="ghost"
                          className="justify-start text-slate-200 hover:bg-white/10"
                          asChild
                        >
                          <Link href="/seller/dashboard">Seller Dashboard</Link>
                        </Button>
                      )}
                      {session.user?.role === "BUYER" && (
                        <Button
                          variant="ghost"
                          className="justify-start text-slate-200 hover:bg-white/10"
                          asChild
                        >
                          <Link href="/profile">Become a Seller</Link>
                        </Button>
                      )}
                      <Button
                        className="justify-start bg-white text-slate-900 hover:bg-slate-100"
                        onClick={() => signOut()}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      variant="ghost"
                      className="w-full border border-white/20 text-white hover:bg-white/10"
                      asChild
                    >
                      <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button
                      className="w-full bg-indigo-500 text-white hover:bg-indigo-400"
                      asChild
                    >
                      <Link href="/auth/register">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

