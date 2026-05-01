import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Magnolia Peluquería — Tu Mejor Look en Asunción",
  description: "Cortes profesionales, coloración y tratamientos que transforman tu estilo",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Magnolia Peluquería — Tu Mejor Look en Asunción",
    description: "Cortes profesionales, coloración y tratamientos que transforman tu estilo",
    locale: "es_PY",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
