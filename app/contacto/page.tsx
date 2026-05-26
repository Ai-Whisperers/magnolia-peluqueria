import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react"
import { business } from "@/lib/config"

function waLinkStatic(msg: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(decodeURIComponent(msg))}`
}

export const metadata = { title: "Contacto — Magnolia Peluquería" }

export default function ContactoPage() {
  return (
    <>
      <Header />
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-3">
            <MessageCircle className="w-4 h-4" /> Contacto
          </span>
          <h1 className="font-heading text-4xl font-bold text-primary mb-2">Encontranos</h1>
          <p className="text-foreground-light mb-12">Estamos para ayudarte. Respondemos por WhatsApp en menos de 5 minutos.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Info cards */}
            <div className="space-y-4">
              {[
                { icon: MapPin, label: "Dirección", value: business.address, sub: "Asunción, Paraguay" },
                { icon: Phone, label: "Teléfono", value: business.phoneFormatted, sub: "Llamanos o escribinos" },
                { icon: Clock, label: "Horarios", value: business.hours, sub: business.hoursClosed },
              ].map(({ icon: Icon, label, value, sub }, i) => (
                <div key={i} className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase tracking-wide mb-1">{label}</p>
                    <p className="font-semibold text-foreground">{value}</p>
                    <p className="text-sm text-foreground-light mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}

              {/* Instagram */}
              <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-pink-200 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#E1306C" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wide mb-1">Instagram</p>
                  <p className="font-semibold text-foreground group-hover:text-pink-500 transition-colors">@{business.instagram}</p>
                </div>
              </a>
            </div>

            {/* WhatsApp CTA card */}
            <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl p-8 text-white flex flex-col justify-center">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-heading text-2xl font-bold mb-3">Reservá por WhatsApp</h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                La forma más rápida de reservar tu turno. Te respondemos en menos de 5 minutos.
              </p>
              <a href={waLinkStatic("Hola! Quiero reservarme un turno en Magnolia")} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-secondary font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-all text-center">
                <MessageCircle className="w-5 h-5" />
                Escribir ahora
              </a>
              <p className="text-white/60 text-sm mt-4 text-center">Sin esperar. Sin llamar. directo al punto.</p>
            </div>
          </div>
        </div>
      </section>
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
