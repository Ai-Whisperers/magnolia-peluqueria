import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { TeamSection } from "@/components/team-section"
import { Testimonials } from "@/components/testimonials"
import { LoyaltySection } from "@/components/loyalty"
import { GiftCardsSection } from "@/components/gift-cards"
import { business } from "@/lib/config"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Award, Clock, Users, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Nosotros | Magnolia Peluquería",
  description: "18 años haciendo brillar a Asunción. Conocé a nuestro equipo de estilistas profesionales. Reservá tu turno.",
  keywords: ["peluquería Asunción historia", "equipo Magnolia peluquería", "estilistas profesionales Asunción"],
  openGraph: {
    title: "Nosotros | Magnolia Peluquería",
    description: "18 años haciendo brillar a Asunción. Conocé a nuestro equipo de estilistas profesionales.",
  },
}

const values = [
  { icon: Star, label: "Excelencia", desc: "Cada servicio se entrega con el máximo cuidado y atención al detalle." },
  { icon: Users, label: "Comunidad", desc: "Más que clientas, somos una comunidad que se siente cómoda y bienvenida." },
  { icon: Award, label: "Formación Constante", desc: "Nuestro equipo se actualiza constantemente con cursos internacionales." },
  { icon: Clock, label: "Puntualidad", desc: "Respetamos tu tiempo. Los turnos empiezan a horario." },
]

export default function NosotrosPage() {
  return (
    <>
      <Header />
      {/* Hero */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 3px 3px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-4">Nuestra Historia</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">18 Años Haciendo Brillar a Asunción</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Magnolia nació en 2008 de la pasión de Lidia por crear un espacio donde cada mujer se sienta única.
            Hoy, más de 800 clientas confían en nosotros para su mejor look.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-14">
              <h2 className="font-heading text-4xl font-bold text-primary mb-3">Lo que nos Define</h2>
              <p className="text-foreground-light">Los valores que guían cada servicio que brindamos.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={v.label} delay={i * 100} direction="up">
                <div className="text-center p-6 rounded-2xl bg-surface-muted hover:bg-secondary/5 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-6 h-6 text-secondary font-bold" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-primary mb-2">{v.label}</h3>
                  <p className="text-sm text-foreground-light leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team reusable section */}
      <TeamSection />
      <LoyaltySection />
      <GiftCardsSection />
      <Testimonials />

      <Footer
        businessName={business.name}
        tagline={business.tagline}
        address={business.address}
        phone={business.phoneFormatted}
        hours={business.hours}
        waPhone={business.whatsapp}
      />
      <WhatsAppFloat />
    </>
  )
}