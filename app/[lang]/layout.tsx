import type { Metadata } from "next"
import { MagnoliaLocalBusinessJsonLd } from "@/components/JsonLd"
import { CookieConsent } from "@/components/CookieConsent"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { ScrollToTop } from "@/components/scroll-to-top"
import { siteConfig } from "@/lib/config"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isSpanish = lang === "es"

  return {
    title: isSpanish
      ? "Magnolia Peluquería | Tu Mejor Look en Asunción"
      : "Magnolia Peluquería | Your Best Look in Asunción",
    description: isSpanish
      ? "Peluquería profesional en Asunción, Paraguay. Balayage, cortes, coloración, keratina y más. Reserva por Messaging."
      : "Professional hair salon in Asunción, Paraguay. Balayage, cuts, coloring, keratin and more. Book via Messaging.",
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_PY" : "en_US",
      alternateLocale: lang === "es" ? "en_US" : "es_PY",
      siteName: "Magnolia Peluquería",
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return (
    <>
      <MagnoliaLocalBusinessJsonLd url={`https://magnolia-peluqueria.paragu-ai.com/${lang}`} />
      <ScrollToTop />
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
      {siteConfig?.features?.exitIntentPopup !== false && (
        <ExitIntentPopup lang={lang as "es" | "en"} />
      )}
      <CookieConsent lang={lang as "es" | "en"} />
    </>
  )
}
