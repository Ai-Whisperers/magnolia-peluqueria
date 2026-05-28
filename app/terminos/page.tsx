import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Magnolia Peluquería",
  description: "Términos y condiciones de Magnolia Peluquería. Información sobre nuestros servicios, reservas y políticas.",
  openGraph: {
    title: "Términos y Condiciones | Magnolia Peluquería",
    description: "Conocé nuestras políticas y condiciones de servicio.",
  },
}

export default function TerminosPage() {
  return (
    <>
      <Header />
      <main className="bg-background py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-primary mb-8">Términos y Condiciones</h1>
          <div className="prose prose-sm max-w-none text-foreground-light space-y-4">
            <p>Al utilizar los servicios de Magnolia Peluquería, aceptás los siguientes términos y condiciones.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Servicios</h2>
            <p>Nos reservamos el derecho de modificar nuestros servicios, precios y horarios sin previo aviso. Todos los precios están expresados en guaraníes (Gs.) e incluyen IVA.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Reservas y cancelaciones</h2>
            <p>Las reservas se confirman vía WhatsApp. Cancelaciones con menos de 2 horas de anticipación pueden estar sujetas a cargos.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Responsabilidad</h2>
            <p>Magnolia Peluquería no se responsabiliza por objetos personales perdidos en nuestras instalaciones. Los clientes son responsables de su propia seguridad durante la utilización de nuestros servicios.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Modificaciones</h2>
            <p>Nos reservamos el derecho de actualizar estos términos en cualquier momento. Los cambios serán publicados en esta página.</p>
            <p className="text-xs text-foreground-light mt-8">Última actualización: mayo 2026</p>
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
