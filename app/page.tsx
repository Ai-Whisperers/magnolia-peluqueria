import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { WhyUs } from "@/components/why-us"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { BeforeAfter } from "@/components/before-after"
import { Services } from "@/components/services"
import { InstagramFeed } from "@/components/instagram-feed"
import { Location } from "@/components/location"
import { CtaBanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <WhyUs />
      <Gallery />
      <Testimonials />
      <BeforeAfter />
      <Services />
      <InstagramFeed />
      <Location />
      <CtaBanner
        waPhone="595986106062"
        message="Hola!%20Quiero%20reservar%20una%20cita%20en%20Magnolia"
      />
      <Footer
        businessName="Magnolia Peluquería"
        tagline="Tu Mejor Look en Asunción"
        address="Asunción, Paraguay"
        phone="0981 106 062"
        hours="Mar-Sáb: 9:00 - 19:00"
        waPhone="595986106062"
      />
      <WhatsAppFloat />
    </>
  )
}