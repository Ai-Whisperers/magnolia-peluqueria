"use client"
import { loyalty } from "@/lib/config"
import { waLink } from "@/lib/config"
import { ScrollReveal } from "./scroll-reveal"
import { Gift, Star, Award, Crown } from "lucide-react"

const DEFAULT_STEPS = [
  { after: "Primera visita", reward: "Sumás 10 puntos" },
  { after: "50 puntos", reward: "10% descuento" },
  { after: "100 puntos", reward: "Servicio gratis" },
]

export function LoyaltySection() {
  const steps = (loyalty as Record<string, unknown>).steps as { after: string; reward: string }[] | undefined
  const displaySteps = steps ?? DEFAULT_STEPS
  const title = (loyalty as Record<string, unknown>).title as string ?? "Programa de Lealtad"
  const description = ((loyalty as Record<string, unknown>).subtitle ?? (loyalty as Record<string, unknown>).description) as string ?? ""

  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-3">
              <Crown className="w-4 h-4" /> Rewards
            </span>
            <h2 className="font-heading text-4xl font-bold mb-3">{title}</h2>
            {description && <p className="text-white/70 max-w-lg mx-auto">{description}</p>}
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4">
          {displaySteps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">
              <div className="w-14 h-14 rounded-full bg-secondary/10 text-secondary flex items-center justify-center border-2 border-secondary z-10 mb-4">
                {(() => { const Icon = [Gift, Star, Award, Crown][i]; return <Icon className="w-6 h-6" /> })()}
              </div>
              <h4 className="font-semibold text-sm text-primary mb-1">{step.after}</h4>
              <p className="text-xs text-foreground-light max-w-[140px]">{step.reward}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href={waLink("Hola! Quiero enterarme más sobre el Programa Magnolia Rewards")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-secondary text-white font-bold px-10 py-4 rounded-2xl hover:bg-secondary-dark transition-all text-lg"
          >
            <Star className="w-5 h-5" /> Empezar a Acumular
          </a>
          <p className="text-white/50 text-sm mt-3">Sin tarjetas. Solo vení y te mimás.</p>
        </div>
      </div>
    </section>
  )
}
