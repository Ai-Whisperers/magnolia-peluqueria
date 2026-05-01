import { MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="font-heading text-lg font-bold mb-3">Magnolia Peluquería</h3>
            <p className="text-sm text-white/70">Tu Mejor Look en Asunción</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">Enlaces</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-white/80 hover:text-white">Inicio</Link>
              <Link href="/servicios" className="text-white/80 hover:text-white">Servicios</Link>
              <Link href="/contacto" className="text-white/80 hover:text-white">Contacto</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">Horarios</h4>
            <div className="text-sm text-white/80 space-y-1">
              <p><Clock className="w-3 h-3 inline mr-2" />Lun-Sáb: 9:00 - 20:00</p>
              <p className="ml-5">Dom: Cerrado</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">Contacto</h4>
            <div className="text-sm text-white/80 space-y-2">
              <p><MapPin className="w-3 h-3 inline mr-2" />Bartolome De Las Casas 206 esq, Asunción</p>
              <p><Phone className="w-3 h-3 inline mr-2" />(021) 558 289</p>
              <a href="https://wa.me/59521558289?text=Hola!%20Quiero%20agendar%20una%20cita%20en%20Magnolia%20Peluquer%C3%ADa" target="_blank" rel="noopener noreferrer" className="text-[#b76e79] hover:text-[#b76e79]/80 block mt-2">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/20 pt-6 text-center text-xs text-white/50">
          © 2026 Magnolia Peluquería. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
