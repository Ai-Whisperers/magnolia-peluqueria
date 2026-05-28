import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { BookingForm } from "@/components/booking-form";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Reservar Turno | Magnolia Peluquería",
  description: "Reservá tu turno en Magnolia Peluquería en menos de 2 minutos. Cortes, coloración, balayage, keratina y más. Martes a sábado.",
  keywords: ["reservar turno peluquería Asunción", "cita peluquería Asunción", "turno Magnolia"],
  openGraph: {
    title: "Reservar Turno | Magnolia Peluquería",
    description: "Reservá tu turno en menos de 2 minutos. Te respondemos por WhatsApp.",
  },
};

export default function BookingPage() {
  return (
    <>
      <Header />
      <section className="py-20 bg-gradient-to-br from-background to-amber-50/30">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6">
              <Calendar className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="font-heading text-4xl font-bold text-primary mb-3">Reservá tu Turno</h1>
            <p className="text-foreground-light">Completá los datos y te contactamos por WhatsApp en menos de 5 minutos.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <BookingForm supabaseConfigured={isSupabaseConfigured} />
          </div>
        </div>
      </section>
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
  );
}