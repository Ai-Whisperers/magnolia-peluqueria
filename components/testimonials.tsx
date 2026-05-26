import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "María Fernández",
    initials: "MF",
    color: "bg-rose-400",
    quote: "Llevo 2 años yendo a Magnolia. El mejor balayage que me han hecho en mi vida. La atención es impecable, me escuchan y siempre mevan bien.",
    service: "Balayage + Corte",
    stars: 5,
  },
  {
    name: "Carmen López",
    initials: "CL",
    color: "bg-violet-400",
    quote: "Me encantó el tratamiento de keratina. El cabello quedó súper suave y duró más de 3 meses. La relación calidad-precio es excelente.",
    service: "Keratina",
    stars: 5,
  },
  {
    name: "Ana Martínez",
    initials: "AM",
    color: "bg-amber-400",
    quote: "La única peluquería donde siento que me escuchan de verdad. El ambiente es hermoso, muy tranquilo, y los precios muy justos.",
    service: "Coloración + Tratamiento",
    stars: 5,
  },
  {
    name: "Claudia Rodríguez",
    initials: "CR",
    color: "bg-sky-400",
    quote: "Fuí para mi boda y me hicieron un peinado espectacular. Todas las invitadas preguntaron dónde me había hecho el pelo. ¡100% recomendado!",
    service: "Peinado para Eventos",
    stars: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="container-page">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-4">
            <Star className="w-4 h-4" /> Reseñas
          </span>
          <h2 className="font-heading text-4xl font-bold text-primary mb-4">
            Lo que dicen nuestras clientas
          </h2>
          <p className="text-foreground-light max-w-lg mx-auto">
            Más de 800 mujeres confían en Magnolia cada mes. Estas son algunas de sus experiencias.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all relative">
              {/* Quote icon */}
              <Quote className="absolute top-5 right-5 w-8 h-8 text-secondary/10" />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6 text-sm italic">"{t.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-secondary">{t.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google reviews link */}
        <div className="mt-10 text-center">
          <a href="https://www.google.com/maps/place/Magnolia+Peluquer%C3%ADa" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-light hover:text-secondary transition-colors">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            Ver todas las reseñas en Google
            <span className="text-secondary font-bold">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}