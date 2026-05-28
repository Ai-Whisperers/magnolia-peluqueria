import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { FAQAccordion } from "@/components/faq-accordion"
import { HelpCircle, MessageCircle } from "lucide-react"
import { waLink } from "@/lib/config"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Magnolia Peluquería",
  description: "Respondemos todas tus dudas: horarios, precios, servicios, reservas y más. Todo lo que necesitás saber sobre Magnolia Peluquería en Asunción.",
  keywords: ["FAQ peluquería", "preguntas frecuentes peluquería Asunción", "horarios Magnolia", "precios corte Asunción"],
  openGraph: {
    title: "Preguntas Frecuentes | Magnolia Peluquería",
    description: "Todo lo que necesitás saber antes de tu visita a Magnolia.",
  },
}

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="bg-background py-20">
        <div className="max-w-3xl mx-auto px-4">
          {/* Page header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6">
              <HelpCircle className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="font-heading text-4xl font-bold text-primary mb-3">Preguntas Frecuentes</h1>
            <p className="text-foreground-light mb-8">Todo lo que necesitás saber sobre Magnolia Peluquería</p>
            {/* Quick WhatsApp CTA */}
            <a
              href={waLink("Hola! Tengo una consulta que no está en las FAQs")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-white font-bold px-6 py-3 rounded-xl hover:bg-secondary-dark transition-all"
            >
              <MessageCircle className="w-5 h-5" /> Tengo otra pregunta
            </a>
          </div>

          {/* FAQ Accordion — client island */}
          <FAQAccordion />

          {/* Still have questions */}
          <div className="mt-14 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-8 text-center">
            <h3 className="font-heading text-xl font-bold text-primary mb-3">¿No encontraste lo que buscabas?</h3>
            <p className="text-foreground-light text-sm mb-6">Escribinos por WhatsApp y te respondemos en menos de 5 minutos.</p>
            <a
              href={waLink("Hola! Tengo una consulta sobre sus servicios")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-white font-bold px-8 py-4 rounded-xl hover:bg-secondary-dark transition-all"
            >
              <MessageCircle className="w-5 h-5" /> Escribir por WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer
        businessName="Magnolia Peluquería"
        tagline="Tu Mejor Look en Asunción"
        address="Asunción"
        phone="0981 106 062"
        hours="Mar-Sáb: 9:00 - 19:00"
        waPhone="595986106062"
      />
      <WhatsAppFloat />
    </>
  )
}