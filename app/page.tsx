import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { CtaBanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function Home() {
  return (
    <>
      <Header />
      <Hero
        title="Magnolia Peluquería"
        subtitle="Cortes profesionales, coloración y tratamientos que transforman tu estilo en Asunción"
      />
      <Services />
      <CtaBanner />
      <Footer
        businessName="Magnolia Peluquería"
        tagline="Tu Mejor Look en Asunción"
        address="Asunción"
        phone="0981 000 003"
        hours="Mar-Sáb: 9:00 - 19:00"
        waPhone="595981000003"
      />
      <WhatsAppFloat />
    </>
  )
}
