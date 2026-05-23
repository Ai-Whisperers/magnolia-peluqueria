import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ChevronDown } from "lucide-react"

export const metadata = { title: "Preguntas Frecuentes — Magnolia Peluquería" }

const faqs = [{'q': '¿Cuáles son los horarios?', 'a': 'Martes a sábado de 9:00 a 19:00. Lunes cerrado.'}, {'q': '¿Aceptan walk-ins?', 'a': 'Preferimos con cita previa para garantizarte atención. Contactanos por WhatsApp.'}, {'q': '¿Qué servicios ofrecen?', 'a': 'Cortes femeninos y masculinos, coloración, balayage, mechas, tratamientos capilares y peinados.'}, {'q': '¿Trabajan con extensiones?', 'a': 'Sí, ofrecemos colocación y mantenimiento de extensiones capilares.'}, {'q': '¿Cuánto cuesta un corte?', 'a': 'Los precios varían según el servicio. Contactanos por WhatsApp para un presupuesto personalizado.'}]

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="bg-background py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-4xl font-bold text-primary text-center mb-2">Preguntas Frecuentes</h1>
          <p className="text-center text-foreground-light mb-12">Todo lo que necesitás saber sobre Magnolia Peluquería</p>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <summary className="px-6 py-4 font-medium text-foreground cursor-pointer hover:text-secondary transition-colors list-none flex items-center justify-between">
                  {item.q}
                  <ChevronDown className="w-4 h-4 text-foreground-light shrink-0" />
                </summary>
                <p className="px-6 pb-4 text-foreground-light text-sm">{item.a}</p>
              </details>
            ))}
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
