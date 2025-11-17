export const runtime = "nodejs"

import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/providers/auth-provider"
import { FloatingContactButton } from "@/components/layout/floating-contact-button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { validateEnv } from "@/lib/env"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Marketly - Premium Digital Marketplace",
  description: "Buy and sell digital businesses, websites, apps, and SaaS products",
}

// Validate environment variables on server start
if (typeof window === "undefined") {
  try {
    validateEnv()
  } catch (error) {
    console.error("Environment validation failed:", error)
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-slate-50">
            {children}
            <Footer />
          </main>
          <Toaster />
          <FloatingContactButton />
        </AuthProvider>
      </body>
    </html>
  )
}

