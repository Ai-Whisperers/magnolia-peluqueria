import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "María Fernández",
    quote: "Llevo 2 años yendo a Magnolia. El mejor balayage que me han hecho en mi vida. La atención es impecable.",
    service: "Balayage + Corte",
  },
  {
    name: "Carmen López",
    quote: "Me encantó el tratamiento de keratina. El cabello quedó súper suave y duró más de 3 meses.",
    service: "Keratina",
  },
  {
    name: "Ana Martínez",
    quote: "La única peluquería donde siento que me escuchan. El ambiente es hermoso y los precios muy justos.",
    service: "Coloración + Tratamiento",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-primary mb-2">
            Lo que dicen nuestras clientas
          </h2>
          <p className="text-foreground-light">
            Más de 200 mujeres confían en Magnolia cada mes
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-background rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-secondary/40 mb-3" />
              <p className="text-foreground leading-relaxed mb-4 italic">"{t.quote}"</p>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-secondary">{t.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}