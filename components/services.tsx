"use client"
import { useState } from "react"
import { Scissors, Palette, Sparkles, Sparkle, Clock, ChevronDown } from "lucide-react"
import { services, waLinkForService, getColorMap, ColorName } from "@/lib/config"
import type { Lang } from "@/lib/config"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  scissors: Scissors,
  palette: Palette,
  sparkles: Sparkles,
  sparkle: Sparkle,
}

interface ServicesProps {
  lang: Lang
}

export function Services({ lang }: ServicesProps) {
  const [openCat, setOpenCat] = useState<string | null>(null)

  const labels = {
    es: { header: "Servicios", sub: "Servicios profesionales con productos de alta gama. Cada tratamiento incluye diagnóstico personalizado.", book: "Reservar" },
    en: { header: "Services", sub: "Professional services with premium products. Every treatment includes a personalized diagnosis.", book: "Book" },
  }
  const l = labels[lang] ?? labels.es

  return (
    <section className="py-20 bg-background" id="servicios">
      <div className="container-page">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" /> {l.header}
          </span>
          <h2 className="font-heading text-4xl font-bold text-primary mb-4">Nuestros Servicios</h2>
          <p className="text-foreground-light max-w-xl mx-auto">{l.sub}</p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {services.map(cat => {
            const Icon = ICON_MAP[cat.icon] ?? Sparkles
            return (
              <button
                key={cat.name}
                onClick={() => setOpenCat(openCat === cat.name ? null : cat.name)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                  openCat === cat.name || openCat === null
                    ? "bg-primary text-white shadow"
                    : "bg-white text-foreground border border-gray-200 hover:border-primary/30"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
                {cat.items.some(i => i.popular) && (
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                )}
              </button>
            )
          })}
        </div>

        {/* Service list */}
        <div className="space-y-4">
          {services.filter(c => openCat === null || c.name === openCat).map(cat => {
            const Icon = ICON_MAP[cat.icon] ?? Sparkles
            const colors = getColorMap(cat.color as ColorName)
            return (
              <div key={cat.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className={`flex items-center gap-3 px-6 py-4 bg-gradient-to-r ${colors.light} to-white border-b border-gray-100`}>
                  <div className={`w-10 h-10 rounded-xl ${colors.bg}/10 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary flex-1">{cat.name}</h3>
                  <button onClick={() => setOpenCat(openCat === cat.name ? null : cat.name)}
                    className="text-foreground-muted hover:text-foreground transition-colors p-1">
                    <ChevronDown className={`w-5 h-5 transition-transform ${openCat === cat.name ? "rotate-180" : ""}`} />
                  </button>
                </div>

                <div className="divide-y divide-gray-50">
                  {cat.items.map((svc, si) => (
                    <div key={si} className="px-6 py-5 hover:bg-gray-50/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{svc.name}</h4>
                            {svc.popular && (
                              <span className="bg-secondary/10 text-secondary text-xs font-bold px-2 py-0.5 rounded-full">Más popular</span>
                            )}
                          </div>
                          <p className="text-sm text-foreground-light leading-relaxed">{svc.desc}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-foreground-muted">
                            <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                              <Clock className="w-3 h-3" /> {svc.duration}
                            </span>
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end gap-3">
                          <span className="font-bold text-primary text-lg whitespace-nowrap">{svc.price}</span>
                          <a href={waLinkForService(svc.name)} target="_blank" rel="noopener noreferrer"
                            className="text-xs bg-secondary text-white px-4 py-2 rounded-full font-semibold hover:bg-secondary-dark transition-colors whitespace-nowrap">
                            {l.book}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}