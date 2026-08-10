import type { Metadata } from "next"
import { Header } from "@/components/header"
import { GiftCardsSection } from "@/components/gift-cards"
import { Footer } from "@/components/footer"
import { MessagingFloat } from "@/components/messaging-float"
import { Breadcrumb } from "@/components/breadcrumb"
import { getContent, formatHours } from "@/lib/config"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: `Tarjetas de Regalo | ${c.business.name}`,
    description: "Regalá un momento Magnolia — tarjetas de regalo para cumpleaños, Navidad o cualquier ocasión especial.",
  }
}

export default async function TarjetasRegaloPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <div className="pt-24">
        <div className="container-page max-w-6xl">
          <Breadcrumb lang={lang as "es" | "en"} />
          <div className="mt-4">
            <GiftCardsSection />
          </div>
        </div>
      </div>
      <Footer
        businessName={c.business.name}
        tagline={c.business.tagline}
        address={c.business.address}
        phone={c.business.phoneFormatted}
        hours={formatHours(c.business.hours)}
        waPhone={c.business.messaging}
        lang={lang as "es" | "en"}
      />
      <MessagingFloat lang={lang as "es" | "en"} />
    </>
  )
}
