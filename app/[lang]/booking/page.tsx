import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { BookingForm } from "@/components/booking-form"
import { isSupabaseConfigured } from "@/lib/supabase"
import { Calendar } from "lucide-react"
import { getContent } from "@/lib/config"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: `Reservar | ${c.business.name}`,
    description: `Reservá tu turno en ${c.business.name} vía WhatsApp o completa el formulario.`,
  }
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  const t = c.booking ?? {}
  const title = t.title ?? (lang === "es" ? "Reservá tu Turno" : "Book an Appointment")
  const subtitle = t.subtitle ?? (lang === "es"
    ? "Completá los datos y te contactamos por WhatsApp en menos de 5 minutos."
    : "Fill in the form and we'll contact you via WhatsApp in under 5 minutes.")

  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <section className="py-20 bg-gradient-to-br from-background to-amber-50/30">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6">
              <Calendar className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="font-heading text-4xl font-bold text-primary mb-3">{title}</h1>
            <p className="text-foreground-light">{subtitle}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <BookingForm supabaseConfigured={isSupabaseConfigured} />
          </div>
        </div>
      </section>
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
