import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"
import { CookieConsent } from "@ai-whisperers/seo"
import { WhatsAppFloat } from "@ai-whisperers/whatsapp"

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
  alternates: { canonical: "https://magnolia-peluqueria.paragu-ai.com" },
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
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Magnolia Peluquería",
  description: "Peluquería profesional en Asunción. Cortes, coloración y tratamientos capilares.",
  url: "https://magnolia-peluqueria.paragu-ai.com",
  telephone: "+595986106062",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Asunción",
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "100",
  },
  image: "https://magnolia-peluqueria.paragu-ai.com/images/og-default.jpg",
  sameAs: [
    "https://instagram.com/magnolia_peluqueria",
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable + " " + playfair.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <WhatsAppFloat phone="+595986106062" />
        <CookieConsent />
      </body>
    </html>
  )
}