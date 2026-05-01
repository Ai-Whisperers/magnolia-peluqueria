import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"

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
  title: "Magnolia Peluquería",
  description: "Cortes profesionales, coloración y tratamientos que transforman tu estilo",
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "https://magnolia-peluqueria.paragu-ai.com" },
  openGraph: {
    title: "Magnolia Peluquería",
    description: "Cortes profesionales, coloración y tratamientos que transforman tu estilo",
    url: "https://magnolia-peluqueria.paragu-ai.com",
    siteName: "Magnolia Peluquería",
    locale: "es_PY",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Magnolia Peluquería",
    description: "Cortes profesionales, coloración y tratamientos que transforman tu estilo",
    url: "https://magnolia-peluqueria.paragu-ai.com",
    image: "https://magnolia-peluqueria.paragu-ai.com/images/og-default.jpg",
  }

  return (
    <html lang="es" className={montserrat.variable + " " + playfair.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
