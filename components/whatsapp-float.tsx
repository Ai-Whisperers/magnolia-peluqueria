"use client"
import { MessageCircle } from "lucide-react"
import { waLink } from "@/lib/config"

export function WhatsAppFloat({ lang = "es" }: { lang?: "es" | "en" }) {
  const msg = lang === "es" ? "Hola! Quiero información sobre sus servicios" : "Hi! I want more information about your services"
  return (
    <a href={waLink(msg)}
      target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all"
      aria-label="Contactar por WhatsApp">
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}