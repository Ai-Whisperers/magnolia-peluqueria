import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { getContent } from "@/lib/config"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: `${c.business.name} | Política de Privacidad`,
    description: `Política de privacidad de ${c.business.name} — cómo protegemos tus datos personales.`,
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  const p = c.privacidad ?? {}

  const sectionTitles = lang === "es"
    ? ["1. Introducción", "2. Datos que Recopilamos", "3. Cookies", "4. Tus Derechos", "5. Contacto", "6. Actualizaciones"]
    : ["1. Introduction", "2. Data We Collect", "3. Cookies", "4. Your Rights", "5. Contact", "6. Updates"]

  const sectionKeys = ["intro", "data_collection", "cookies", "rights", "contact", "updates"]

  const defaultContent: Record<string, { es: string; en: string }> = {
    intro: {
      es: "Magnolia Peluquería respeta tu privacidad. Nos comprometemos a proteger tus datos personales.",
      en: "Magnolia Peluquería respects your privacy. We are committed to protecting your personal data.",
    },
    data_collection: {
      es: "Recopilamos tu información de contacto únicamente para fines de reservas. Tus datos nunca se comparten con terceros.",
      en: "We collect your contact information only for appointment purposes. Your data is never shared with third parties.",
    },
    cookies: {
      es: "Este sitio web utiliza cookies para mejorar tu experiencia. Podés rechazar las cookies no esenciales.",
      en: "This website uses cookies to improve your experience. You can decline non-essential cookies.",
    },
    rights: {
      es: "Tenés derecho a acceder, corregir o eliminar tus datos personales. Escribinos por WhatsApp para ejercer estos derechos.",
      en: "You have the right to access, correct, or delete your personal data. Write to us via WhatsApp to exercise these rights.",
    },
    contact: {
      es: "Para consultas de privacidad, contactanos por WhatsApp.",
      en: "For privacy concerns, contact us via WhatsApp.",
    },
    updates: {
      es: "Esta política puede actualizarse periódicamente. La fecha de última actualización se indica al final.",
      en: "This policy may be updated periodically. The last update date is indicated at the bottom.",
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
              {p?.title ?? (lang === "es" ? "Política de Privacidad" : "Privacy Policy")}
            </h1>
          </div>

          <div className="space-y-8 text-foreground-light leading-relaxed">
            {sectionTitles.map((title, i) => {
              const key = sectionKeys[i]
              const content = (p?.content as Record<string, string>)?.[key]
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

          <p className="text-xs text-foreground-muted mt-12 text-right">
            {lang === "es" ? "Última actualización:" : "Last updated:"} Mayo 2026
          </p>
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