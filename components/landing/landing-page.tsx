import { HeroSection } from "./hero-section"
import { CategoriesSection } from "./categories-section"
import { FeaturedListings } from "./featured-listings"
import { SuccessStories } from "./success-stories"
import { CTASection } from "./cta-section"
import { HowItWorksSection } from "./how-it-works-section"
import { FloatingContactButton } from "@/components/layout/floating-contact-button"
import { FAQSection } from "./faq-section"
import { NewsletterSection } from "./newsletter-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <div id="marketplace">
          <CategoriesSection />
        </div>
        <FeaturedListings />
        <HowItWorksSection />
        <SuccessStories />
        <FAQSection />
        <NewsletterSection />
        <CTASection />
        <FloatingContactButton />
      </main>
    </div>
  )
}

