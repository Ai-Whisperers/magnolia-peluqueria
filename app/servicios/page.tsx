import type { Metadata } from "next"
import { Header } from "@/components/header";
import { Services } from "@/components/services";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export const metadata: Metadata = {
  title: "Servicios y Precios | Magnolia Peluquería",
  description: "Todos nuestros servicios con precios: cortes, coloración, balayage, keratina, botox capilar, peinados para eventos. Reserva por WhatsApp.",
  keywords: ["servicios peluquería Asunción", "precios corte Asunción", "balayage Paraguay precio", "keratina Asunción"],
  openGraph: {
    title: "Servicios y Precios | Magnolia Peluquería",
    description: "Todos nuestros servicios con precios. Cortes, coloración, balayage, keratina y tratamientos capilares.",
  },
};

export default function ServiciosPage() {
  return (
    <>
      <Header />
      <div className="pt-24"><Services /></div>
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
