import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { BeforeAfterSection } from "@/components/before-after"
import { Location } from "@/components/location"
import { CtaBanner } from "@/components/cta-banner"
import { AnimatedStats } from "@/components/animated-stats"
import { TeamSection } from "@/components/team-section"
import { PromotionsSection } from "@/components/promotions"
import { LoyaltySection } from "@/components/loyalty"
import { GiftCardsSection } from "@/components/gift-cards"
import { business } from "@/lib/config"
import { waLink } from "@/lib/config"

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <AnimatedStats />
      <Services />
      <BeforeAfterSection />
      <PromotionsSection />
      <LoyaltySection />
      <GiftCardsSection />
      <TeamSection />
      <Testimonials />
      <Gallery />
      <CtaBanner
        waPhone={business.whatsapp}
        message="Hola! Quiero reservarme un turno en Magnolia"
      />
      <Location />
      <Footer
        businessName={business.name}
        tagline={business.tagline}
        address={business.address}
        phone={business.phoneFormatted}
        hours={business.hours}
        waPhone={business.whatsapp}
      />
      <WhatsAppFloat />
    </>
  )
}
