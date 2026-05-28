import type { Metadata } from "next"
import "../globals.css"
import { MagnoliaLocalBusinessJsonLd } from "@/components/JsonLd"
import { CookieConsent } from "@/components/CookieConsent"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
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
      ? "Peluquería profesional en Asunción, Paraguay. Balayage, cortes, coloración, keratina y más. Reserva por WhatsApp."
      : "Professional hair salon in Asunción, Paraguay. Balayage, cuts, coloring, keratin and more. Book via WhatsApp.",
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
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <MagnoliaLocalBusinessJsonLd url={`https://magnolia-peluqueria.paragu-ai.com/${lang}`} />
      </head>
      <body className="antialiased">
        {children}
        {siteConfig?.features?.exitIntentPopup !== false && (
          <ExitIntentPopup lang={lang as "es" | "en"} />
        )}
        <CookieConsent lang={lang as "es" | "en"} />
      </body>
    </html>
  )
}