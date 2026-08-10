import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Promotions } from "@/components/promotions"
import { Footer } from "@/components/footer"
import { MessagingFloat } from "@/components/messaging-float"
import { Breadcrumb } from "@/components/breadcrumb"
import { getContent, formatHours } from "@/lib/config"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: `Ofertas | ${c.business.name}`,
    description: "Promociones y ofertas exclusivas en cortes, coloración y tratamientos capilares en Asunción.",
  }
}

export default async function OfertasPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <div className="pt-24">
        <div className="container-page max-w-5xl">
          <Breadcrumb lang={lang as "es" | "en"} />
          <div className="mt-4">
            <Promotions lang={lang as "es" | "en"} />
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
