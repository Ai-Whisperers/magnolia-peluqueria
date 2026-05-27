"use client"
import { promotions } from "@/lib/config"
import { waLinkForPromotion } from "@/lib/config"
import { ScrollReveal } from "./scroll-reveal"
import { Gift, Sparkles, Users, ArrowRight, Clock, Tag } from "lucide-react"

const BADGE_ICONS: Record<string, React.ReactNode> = {
  "Solo nuevas clientas": <Sparkles className="w-3.5 h-3.5" />,
  "Combo del mes": <Gift className="w-3.5 h-3.5" />,
  "Programa de referidos": <Users className="w-3.5 h-3.5" />,
}

function PromotionCard({ promo, index }: { promo: (typeof promotions)[number]; index: number }) {
  const isExpiresSoon = promo.expires && new Date(promo.expires) <= new Date(Date.now() + 14 * 86400000)

  return (
    <ScrollReveal delay={index * 100} direction="up">
      <div className={`relative bg-white rounded-2xl border ${isExpiresSoon ? "border-amber-200" : "border-gray-100"} shadow-sm hover:shadow-md transition-all overflow-hidden group`}>
        {/* Color indicator strip */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${index === 0 ? "bg-gradient-to-r from-amber-400 to-amber-600" : index === 1 ? "bg-gradient-to-r from-secondary to-secondary-dark" : "bg-gradient-to-r from-primary to-primary-light"}`} />

        <div className="pt-6 p-6">
          {/* Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${index === 0 ? "bg-amber-50 text-amber-700" : index === 1 ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>
              {BADGE_ICONS[promo.badge]}
              {promo.badge}
            </span>
            {isExpiresSoon && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                <Clock className="w-3 h-3" /> Vence pronto
              </span>
            )}
          </div>

          {/* Content */}
          <h3 className="font-heading text-xl font-bold text-primary mb-2">{promo.title}</h3>
          <p className="text-sm text-foreground-light leading-relaxed mb-6">{promo.subtitle}</p>

          {/* CTA */}
          <a
            href={waLinkForPromotion(promo.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl transition-all ${
              index === 0
                ? "bg-amber-500 text-white hover:bg-amber-600"
                : index === 1
                ? "bg-secondary text-white hover:bg-secondary-dark"
                : "bg-primary text-white hover:bg-primary-light"
            }`}
          >
            <Tag className="w-4 h-4" /> Reservar Ahora
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </ScrollReveal>
  )
}

export function PromotionsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <ScrollReveal direction="up">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-3">
              <Tag className="w-4 h-4" /> Ofertas Activas
            </span>
            <h2 className="font-heading text-4xl font-bold text-primary mb-3">Promociones del Mes</h2>
            <p className="text-foreground-light max-w-lg mx-auto">Descuentos y combos para que te mimés a vos o a alguien especial.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((p, i) => <PromotionCard key={i} promo={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
