import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AnimatedStats } from "@/components/animated-stats"
import { Gallery } from "@/components/gallery"
import { Services } from "@/components/services"
import { Promotions } from "@/components/promotions"
import { TeamSection } from "@/components/team-section"
import { Testimonials } from "@/components/testimonials"
import { GiftCardsSection } from "@/components/gift-cards"
import { LoyaltySection } from "@/components/loyalty"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { getContent } from "@/lib/config"
import { business, heroSlides } from "@/lib/config"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: `${c.business.name} | ${c.business.tagline}`,
    description: c.business.tagline,
  }
}

export default async function LangHomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")

  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <Hero lang={lang as "es" | "en"} />
      <AnimatedStats lang={lang as "es" | "en"} />
      <Services lang={lang as "es" | "en"} />
      <Gallery />
      <Promotions lang={lang as "es" | "en"} />
      <TeamSection />
      <Testimonials />
      <LoyaltySection />
      <GiftCardsSection />
      <Footer
        businessName={c.business.name}
        tagline={c.business.tagline}
        address={c.business.address}
        phone={c.business.phoneFormatted}
        hours={c.business.hours}
        waPhone={c.business.whatsapp}
        lang={lang as "es" | "en"}
      />
      <WhatsAppFloat lang={lang as "es" | "en"} />
    </>
  )
}