import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export const metadata = { title: "Contacto — Magnolia Peluquería", description: "Visitanos o contactanos por WhatsApp." };

export default function ContactoPage() {
  return (
    <>
      <Header />
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-primary mb-2">Contacto</h1>
          <p className="text-foreground-light mb-10">Estamos para ayudarte</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Dirección</p>
                  <p className="text-sm text-foreground-light">Bartolome De Las Casas 206 esq, Asunción</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Teléfono</p>
                  <p className="text-sm text-foreground-light">(021) 558 289</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Horarios</p>
                  <p className="text-sm text-foreground-light">Lun-Sáb: 9:00 - 20:00</p>
                  <p className="text-sm text-foreground-light">Domingo: Cerrado</p>
                </div>
              </div>
              <a href="https://wa.me/59521558289?text=Hola!%20Quiero%20agendar%20una%20cita%20en%20Magnolia%20Peluquer%C3%ADa" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 bg-[#25d366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#25d366]/90 transition-all">
                <MessageCircle className="w-5 h-5" /> Contactar por WhatsApp
              </a>
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm h-[300px]">
              <iframe src={"https://maps.google.com/maps?q="+encodeURIComponent("Bartolome De Las Casas 206 esq, Asunción")+"&output=embed"}
                width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
