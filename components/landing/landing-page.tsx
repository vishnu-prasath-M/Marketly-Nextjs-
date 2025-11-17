import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "./hero-section"
import { CategoriesSection } from "./categories-section"
import { StatsSection } from "./stats-section"
import { FeaturedListings } from "./featured-listings"
import { SuccessStories } from "./success-stories"
import { PricingSection } from "./pricing-section"
import { AboutSection } from "./about-section"
import { CTASection } from "./cta-section"
import { FloatingContactButton } from "@/components/layout/floating-contact-button"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <div id="marketplace">
          <CategoriesSection />
        </div>
        <StatsSection />
        <FeaturedListings />
        <SuccessStories />
        <div id="pricing">
          <PricingSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

