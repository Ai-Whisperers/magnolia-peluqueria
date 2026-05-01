"use client";
import { Sparkles, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  const w = "https://wa.me/59521558289?text=Hola!%20Quiero%20agendar%20una%20cita%20en%20Magnolia%20Peluquer%C3%ADa";
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a]/90 via-[#1a1a1a] to-[#1a1a1a]">
      <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] bg-cover bg-center opacity-10"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Magnolia Peluquería</h1>
        <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">Cortes profesionales, coloración y tratamientos que transforman tu estilo</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={w} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-[#b76e79] text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-[#b76e79]/90 hover:scale-105 transition-all shadow-lg">
            <Sparkles className="w-5 h-5" /> Reservar Cita
          </a>
          <Link href="/servicios"
             className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-white/10 transition-all">
            Ver Servicios
          </Link>
        </div>
        <div className="mt-6 flex items-center justify-center gap-1 text-white/60 text-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-semibold text-white">4.7</span>
          <span>(216 reseñas)</span>
        </div>
      </div>
    </section>
  );
}
