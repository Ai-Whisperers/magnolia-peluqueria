import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { getContent } from "@/lib/config"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: c.terminos?.meta?.title ?? (lang === "es" ? "Términos y Condiciones" : "Terms of Service"),
    description: c.terminos?.meta?.description,
  }
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  const t = c.terminos ?? {}

  const sectionTitles = lang === "es"
    ? ["1. Aceptación", "2. Turnos y Reservaciones", "3. Pagos", "4. Cancelaciones", "5. Reembolso", "6. Contacto"]
    : ["1. Acceptance", "2. Appointments and Reservations", "3. Payments", "4. Cancellations", "5. Refunds", "6. Contact"]

  const sectionKeys = ["intro", "appointments", "payments", "cancellations", "refunds", "contact"]

  const defaultContent: Record<string, { es: string; en: string }> = {
    intro: {
      es: "Al utilizar los servicios de Magnolia Peluquería, aceptás estos términos y condiciones.",
      en: "By using Magnolia Peluquería services, you accept these terms and conditions.",
    },
    appointments: {
      es: "Los turnos se pueden reservar vía WhatsApp o en persona. Por favor cancelá o reprogramá con al menos 24 horas de anticipación.",
      en: "Appointments can be booked via WhatsApp or in person. Please cancel or reschedule at least 24 hours in advance.",
    },
    payments: {
      es: "El pago se realiza al momento del servicio. Aceptamos efectivo y pago móvil.",
      en: "Payment is due at the time of service. We accept cash and mobile payment.",
    },
    cancellations: {
      es: "Las cancelaciones con menos de 24 horas de anticipación pueden tener un cargo del 50%.",
      en: "Cancellations with less than 24 hours notice may incur a 50% fee.",
    },
    refunds: {
      es: "Los servicios no son reembolsables una vez realizados. Las quejas deben comunicarse dentro de las 48 horas.",
      en: "Services are non-refundable once completed. Complaints must be raised within 48 hours.",
    },
    contact: {
      es: "Para consultas sobre estos términos, escribinos por WhatsApp.",
      en: "For questions about these terms, write to us via WhatsApp.",
    },
  }

  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <main className="min-h-screen bg-white pt-20">
        <div className="container-page py-16 max-w-3xl">
          <div className="mb-10">
            <p className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">
              {lang === "es" ? "Información Legal" : "Legal Information"}
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">
              {t?.title ?? (lang === "es" ? "Términos y Condiciones" : "Terms of Service")}
            </h1>
          </div>

          <div className="space-y-8 text-foreground-light leading-relaxed">
            {sectionTitles.map((title, i) => {
              const key = sectionKeys[i]
              const content = (t?.content as Record<string, string>)?.[key]
                ?? defaultContent[key]?.[lang as "es" | "en"]
                ?? ""

              return (
                <section key={i}>
                  <h2 className="font-heading text-xl font-bold text-primary mb-3">{title}</h2>
                  {key === "contact" && content ? (
                    <p className="text-base mb-3">{content}</p>
                  ) : (
                    <p className="text-base">{content}</p>
                  )}
                  {key === "contact" && (
                    <a
                      href={`https://wa.me/${c.business.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-secondary font-medium hover:underline"
                    >
                      📱 WhatsApp: {c.business.phoneFormatted}
                    </a>
                  )}
                </section>
              )
            })}
          </div>
        </div>
      </main>
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