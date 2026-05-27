"use client"
import { giftCards } from "@/lib/config"
import { waLink } from "@/lib/config"
import { ScrollReveal } from "./scroll-reveal"
import { Sparkle, Star, Crown, Heart, Gift } from "lucide-react"

const ICON_NAMES = ["sparkle", "star", "crown", "heart"]

function GiftCard({ card, index }: { card: (typeof giftCards)[number]; index: number }) {
  const iconName = ICON_NAMES[index % ICON_NAMES.length]
  const colors = [
    "from-rose-400 to-rose-600",
    "from-violet-400 to-violet-600",
    "from-amber-400 to-amber-600",
    "from-sky-400 to-sky-600",
  ]
  const gradient = colors[index % colors.length]
  const isEven = index % 2 === 0

  return (
    <ScrollReveal delay={index * 80} direction="down">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col">
        <div className={`h-2 bg-gradient-to-r ${gradient}`} />
        <div className="p-6 flex flex-col flex-1">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-4 text-white`}>
            {iconName === "sparkle" && <Sparkle className="w-7 h-7" />}
            {iconName === "star" && <Star className="w-7 h-7" />}
            {iconName === "crown" && <Crown className="w-7 h-7" />}
            {iconName === "heart" && <Heart className="w-7 h-7" />}
          </div>
          <h3 className="font-heading text-lg font-bold text-primary text-center mb-2">{card.name}</h3>
          <p className="text-sm text-foreground-light text-center mb-4 flex-1">{card.desc}</p>
          <div className="flex items-center justify-center mb-5">
            <span className="font-heading text-3xl font-bold text-primary">{card.price}</span>
          </div>
          <a
            href={waLink(`Hola! Quiero comprar una Tarjeta de Regalo: ${card.name} - ${card.price}`)}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full inline-flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm transition-all ${
              isEven
                ? "bg-secondary text-white hover:bg-secondary-dark"
                : "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white"
            }`}
          >
            <Gift className="w-4 h-4" /> Comprar Tarjeta
          </a>
        </div>
      </div>
    </ScrollReveal>
  )
}

export function GiftCardsSection() {
  return (
    <section className="py-20 bg-surface-muted">
      <div className="max-w-6xl mx-auto px-4">
        <ScrollReveal direction="up">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-3">
              <Gift className="w-4 h-4" /> Tarjetas de Regalo
            </span>
            <h2 className="font-heading text-4xl font-bold text-primary mb-3">Regala un Momento Magnolia</h2>
            <p className="text-foreground-light max-w-lg mx-auto">Tarjetas de regalo perfectas para cumpleanos, Navidad o simplemente para mimar a alguien especial.</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftCards.map((card, i) => <GiftCard key={i} card={card} index={i} />)}
        </div>
        <div className="text-center mt-10">
          <p className="text-sm text-foreground-light">
            Necesitas un valor personalizado?{" "}
            <a
              href={waLink("Hola! Quiero una tarjeta de regalo con un valor personalizado")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary font-semibold hover:underline"
            >
              Escribinos por WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
