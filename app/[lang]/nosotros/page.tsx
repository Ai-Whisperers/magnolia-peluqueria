import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { TeamSection } from "@/components/team-section"
import { Testimonials } from "@/components/testimonials"
import { LoyaltySection } from "@/components/loyalty"
import { GiftCardsSection } from "@/components/gift-cards"
import { getContent } from "@/lib/config"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Award, Clock, Users, Star } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: `Nosotros | ${c.business.name}`,
    description: `${c.business.name} — Conocé a nuestro equipo, nuestra historia y por qué nos eligen miles de clientas en Asunción.`,
  }
}

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  const t = c.about ?? {}
  const heroTitle = t.heroTitle ?? (lang === "es"
    ? "18 Años Haciendo Brillar a Asunción"
    : "18 Years Making Asunción Shine")
  const heroSubtitle = t.heroSubtitle ?? (lang === "es"
    ? "Magnolia nació en 2008 de la pasión de Lidia por crear un espacio donde cada mujer se sienta única."
    : "Magnolia was born in 2008 from Lidia's passion to create a space where every woman feels unique.")

  const valuesData = t.values ?? []
  const values = valuesData.length > 0 ? valuesData : [
    { icon: "Star", label: lang === "es" ? "Excelencia" : "Excellence", desc: lang === "es" ? "Cada servicio se entrega con el máximo cuidado." : "Every service is delivered with maximum care." },
    { icon: "Users", label: lang === "es" ? "Comunidad" : "Community", desc: lang === "es" ? "Más que clientas, somos una comunidad." : "More than clients, we are a community." },
    { icon: "Award", label: lang === "es" ? "Formación Constante" : "Constant Training", desc: lang === "es" ? "Actualización constante con cursos internacionales." : "Constant updates with international courses." },
    { icon: "Clock", label: lang === "es" ? "Puntualidad" : "Punctuality", desc: lang === "es" ? "Respetamos tu tiempo." : "We respect your time." },
  ]
  const iconMap: Record<string, any> = { Star, Users, Award, Clock }

  return (
    <>
      <Header lang={lang as "es" | "en"} />
      {/* Hero */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 3px 3px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-4">
            {lang === "es" ? "Nuestra Historia" : "Our Story"}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">{heroTitle}</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">{heroSubtitle}</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-14">
              <h2 className="font-heading text-4xl font-bold text-primary mb-3">
                {lang === "es" ? "Lo que nos Define" : "What Defines Us"}
              </h2>
              <p className="text-foreground-light">
                {lang === "es" ? "Los valores que guían cada servicio." : "The values that guide every service."}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v: any, i: number) => {
              const Icon = iconMap[v.icon] ?? Star
              return (
                <ScrollReveal key={i} delay={i * 100} direction="up">
                  <div className="text-center p-6 rounded-2xl bg-surface-muted hover:bg-secondary/5 transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-secondary font-bold" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-primary mb-2">{v.label}</h3>
                    <p className="text-sm text-foreground-light leading-relaxed">{v.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <TeamSection />
      <LoyaltySection />
      <GiftCardsSection />
      <Testimonials />

      <Footer
        businessName={c.business.name}
        tagline={c.business.tagline}
        address={c.business.address}
        phone={c.business.phoneFormatted}
        hours={c.business.hours}
        waPhone={c.business.whatsapp}
        lang={lang as "es" | "en"}
      />
      <WhatsAppFloat lang={lang as "es" | "en"} />
    </>
  )
}
