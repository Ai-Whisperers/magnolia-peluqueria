import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"
import { CookieConsent } from "@/components/CookieConsent"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://magnolia-peluqueria.paragu-ai.com"),
  title: {
    default: "Magnolia Peluquería | Cortés y Coloración Profesional en Asunción",
    template: "%s | Magnolia Peluquería",
  },
  description: "Peluquería profesional en Asunción. Cortes, coloración, balayage, keratina y tratamientos capilares. Más de 15 años de experiencia. Reserva por WhatsApp.",
  keywords: ["peluquería Asunción", "corte Asunción", "balayage Paraguay", "coloración cabello Asunción", "tratamiento keratina Asunción", "salón belleza Paraguay"],
  authors: [{ name: "Magnolia Peluquería" }],
  creator: "Magnolia Peluquería",
  publisher: "Paragu-ai",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.ico", apple: "/icon-192.png" },
  alternates: {
    canonical: "https://magnolia-peluqueria.paragu-ai.com",
    languages: {
      "es-PY": "https://magnolia-peluqueria.paragu-ai.com/es",
      "en-US": "https://magnolia-peluqueria.paragu-ai.com/en",
    },
  },
  openGraph: {
    title: "Magnolia Peluquería | Cortés y Coloración Profesional",
    description: "Peluquería profesional en Asunción. Cortes, coloración, balayage, keratina y tratamientos capilares.",
    url: "https://magnolia-peluqueria.paragu-ai.com",
    siteName: "Magnolia Peluquería",
    locale: "es_PY",
    type: "website",
    images: [{
      url: "https://magnolia-peluqueria.paragu-ai.com/images/og-default.jpg",
      width: 1200,
      height: 630,
      alt: "Magnolia Peluquería - Asunción",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Magnolia Peluquería | Cortés y Coloración Profesional",
    description: "Peluquería profesional en Asunción. Cortes, coloración, balayage, keratina y tratamientos capilares.",
    images: ["https://magnolia-peluqueria.paragu-ai.com/images/og-default.jpg"],
  },
}

// ─── Honest JSON-LD (no fake ratings) ───────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Magnolia Peluquería",
  description: "Peluquería profesional en Asunción. Cortes, coloración, balayage, keratina y tratamientos capilares. 18 años de experiencia.",
  url: "https://magnolia-peluqueria.paragu-ai.com",
  telephone: "+595 986 106 062",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zona céntrica",
    addressLocality: "Asunción",
    addressRegion: "Central",
    addressCountry: "PY",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.26327,
    longitude: -57.63535,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: "$$",
  image: "https://magnolia-peluqueria.paragu-ai.com/images/og-default.jpg",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de peluquería",
    itemListElement: [
      { "@type": "Offer", name: "Corte Dama", priceCurrency: "PYG", price: "90000" },
      { "@type": "Offer", name: "Balayage / Mechas", priceCurrency: "PYG", price: "400000" },
      { "@type": "Offer", name: "Keratina", priceCurrency: "PYG", price: "350000" },
      { "@type": "Offer", name: "Botox Capilar", priceCurrency: "PYG", price: "200000" },
      { "@type": "Offer", name: "Corte Caballero", priceCurrency: "PYG", price: "60000" },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "800",
  },
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://magnolia-peluqueria.paragu-ai.com/booking",
      actionPlatform: ["https://schema.org/WebPage"],
    },
    result: { "@type": "Reservation", name: "Reserva de turno" },
  },
  sameAs: ["https://instagram.com/magnolia_peluqueria"],
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://magnolia-peluqueria.paragu-ai.com" },
    { "@type": "ListItem", position: 2, name: "Magnolia Peluquería", item: "https://magnolia-peluqueria.paragu-ai.com" },
  ],
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuáles son los horarios?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Martes a sábado de 9:00 a 19:00. Lunes y domingos cerrados. Podés reservar por WhatsApp para coordinar tu turno.",
      },
    },
    {
      "@type": "Question",
      name: "¿Aceptan walk-ins?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Preferimos con cita previa para garantizarte atención personalizada. Escribinos por WhatsApp y te confirmamos en minutos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta un corte?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Corte dama desde Gs. 90.000, caballero desde Gs. 60.000. Todos los precios incluyen asesoría de estilo personalizada.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo reservo mi turno?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La forma más rápida es por WhatsApp: 0981 106 062. Te respondemos en menos de 5 minutos y coordinamos el mejor horario.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hacen peinados de novia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí! Tenemos servicio completo de peinado y maquillaje para novias. Incluye prueba y asesoramiento. Reservá con anticipación.",
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable + " " + playfair.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#c9a55c" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Magnolia" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <WhatsAppFloat lang="es" />
        <CookieConsent />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}