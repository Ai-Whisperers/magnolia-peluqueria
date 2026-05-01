"use client";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a href="https://wa.me/59521558289?text=Hola!%20Quiero%20agendar%20una%20cita%20en%20Magnolia%20Peluquer%C3%ADa" target="_blank" rel="noopener noreferrer"
       className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all"
       aria-label="Contactar por WhatsApp">
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
