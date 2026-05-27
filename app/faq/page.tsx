"use client"
import { useState } from "react"
import { faqs } from "@/lib/config"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react"
import { waLink } from "@/lib/config"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <Header />
      <main className="bg-background py-20">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6">
              <HelpCircle className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="font-heading text-4xl font-bold text-primary mb-3">Preguntas Frecuentes</h1>
            <p className="text-foreground-light mb-8">Todo lo que necesitás saber sobre Magnolia Peluqueria</p>
            {/* Quick WhatsApp CTA */}
            <a
              href={waLink("Hola! Tengo una consulta que no esta en las FAQs")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-white font-bold px-6 py-3 rounded-xl hover:bg-secondary-dark transition-all"
            >
              <MessageCircle className="w-5 h-5" /> Tengo otra pregunta
            </a>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm transition-all"
                open={openIndex === i}
              >
                <summary
                  onClick={(e) => { e.preventDefault(); setOpenIndex(openIndex === i ? null : i) }}
                  className="px-6 py-5 font-semibold text-foreground cursor-pointer hover:text-secondary transition-colors list-none flex items-center justify-between"
                >
                  <span className="flex-1 pr-4">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </summary>
                <div className={`px-6 pb-5 text-foreground-light text-sm leading-relaxed border-t border-gray-100 pt-4 transition-all ${openIndex === i ? "opacity-100" : "hidden"}`}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-14 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-8 text-center">
            <h3 className="font-heading text-xl font-bold text-primary mb-3">No encontraste lo que buscabas?</h3>
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
        businessName="Magnolia Peluqueria"
        tagline="Tu Mejor Look en Asuncion"
        address="Asuncion"
        phone="0981 106 062"
        hours="Mar-Sab: 9:00 - 19:00"
        waPhone="595986106062"
      />
      <WhatsAppFloat />
    </>
  )
}
