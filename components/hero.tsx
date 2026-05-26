"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Clock, MapPin, MessageCircle } from "lucide-react"
import { heroSlides, stats, waLink, stats as statsData } from "@/lib/config"

export function Hero() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrent(c => (c + 1) % heroSlides.length)
        setIsTransitioning(false)
      }, 300)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[current]

  return (
    <section className="relative h-[92vh] min-h-[580px] max-h-[900px] overflow-hidden">
      {/* Slides */}
      {heroSlides.map((s, i) => (
        <div key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10" />
          <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center">
        <div className="container-page">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm text-white">
              <MapPin className="w-4 h-4" />
              {slide.badge}
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={waLink("Hola! Quiero reservar una cita")}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary-dark transition-all shadow-lg">
                <MessageCircle className="w-5 h-5" />
                Reservar por WhatsApp
              </a>
              <a href="#servicios"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all border border-white/30">
                Ver Servicios
              </a>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-8 mt-12">
              {statsData.map((s, i) => (
                <div key={i} className="text-white">
                  <div className="text-2xl font-bold">{s.value}{s.suffix ?? ""}</div>
                  <div className="text-sm text-white/70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      <button onClick={() => { setIsTransitioning(true); setCurrent(c => (c - 1 + heroSlides.length) % heroSlides.length); setTimeout(() => setIsTransitioning(false), 300); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all hidden md:flex items-center justify-center">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={() => { setIsTransitioning(true); setCurrent(c => (c + 1) % heroSlides.length); setTimeout(() => setIsTransitioning(false), 300); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all hidden md:flex items-center justify-center">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => { setIsTransitioning(true); setCurrent(i); setTimeout(() => setIsTransitioning(false), 300); }}
            className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-secondary" : "w-2 bg-white/50 hover:bg-white/80"}`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 right-8 hidden lg:flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase rotate-90 origin-center translate-y-8">Scroll</span>
        <div className="animate-bounce mt-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
    </section>
  )
}