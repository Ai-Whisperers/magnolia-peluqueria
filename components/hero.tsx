"use client"
import { Sparkles } from "lucide-react"
import Link from "next/link"

interface HeroProps {
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  waPhone?: string
}

export function Hero({
  title,
  subtitle,
  ctaLabel = "Reservar",
  ctaHref,
  secondaryLabel = "Ver Servicios",
  secondaryHref = "/servicios",
  waPhone = "595986106062",
}: HeroProps) {
  const waMsg = `Hola!%20Quiero%20informaci%C3%B3n%20sobre%20sus%20servicios`
  const waLink = ctaHref || `https://wa.me/${waPhone}?text=${waMsg}`

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
          alt="Peluquería Magnolia"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />
      </div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block bg-secondary/80 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
          Asunción · Paraguay
        </span>
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-secondary/90 hover:scale-105 transition-all shadow-xl shadow-secondary/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {ctaLabel}
          </a>
          <Link href={secondaryHref}
            className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/10 transition-all backdrop-blur-sm">
            {secondaryLabel}
          </Link>
        </div>
        <div className="mt-12 flex items-center justify-center gap-8 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-secondary"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>+200 clientas atendidas</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30" />
          <div className="hidden sm:flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Mar-Sáb 9:00 - 19:00</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </section>
  )
}
