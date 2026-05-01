import { Clock, Scissors } from "lucide-react"

const cats = [{"name": "Cortes", "items": [{"name": "Corte Dama", "price": "Gs. 90.000", "desc": "Corte profesional con asesoría de estilo", "duration": "40 min"}, {"name": "Corte Caballero", "price": "Gs. 60.000", "desc": "Corte de cabello masculino", "duration": "30 min"}, {"name": "Corte Infantil", "price": "Gs. 50.000", "desc": "Corte para niños hasta 12 años", "duration": "25 min"}]}, {"name": "Coloración", "items": [{"name": "Coloración Completa", "price": "Gs. 250.000", "desc": "Coloración profesional con productos premium", "duration": "90 min"}, {"name": "Balayage", "price": "Gs. 400.000", "desc": "Técnica francesa de mechas degradadas", "duration": "2 horas"}, {"name": "Mechas", "price": "Gs. 300.000", "desc": "Mechas tradicionales con papel", "duration": "90 min"}]}, {"name": "Tratamientos", "items": [{"name": "Keratina", "price": "Gs. 350.000", "desc": "Alisado progresivo con keratina", "duration": "2 horas"}, {"name": "Botox Capilar", "price": "Gs. 200.000", "desc": "Tratamiento reconstructor capilar", "duration": "60 min"}, {"name": "Nutrición Capilar", "price": "Gs. 120.000", "desc": "Tratamiento nutritivo intensivo", "duration": "40 min"}]}]

export function Services() {
  return (
    <section className="py-20 bg-background" id="servicios">
      <div className="container-page">
        <h2 className="font-heading text-3xl font-bold text-center text-primary mb-2">Nuestros Servicios</h2>
        <p className="text-center text-foreground-light mb-12 max-w-xl mx-auto">Realzá tu belleza natural</p>
        <div className="space-y-10">
          {cats.map((cat: any, ci: number) => (
            <div key={ci}>
              <h3 className="font-heading text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Scissors className="w-5 h-5 text-secondary" /> {cat.name}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((svc: any, si: number) => (
                  <div key={si} className="bg-white rounded-xl p-5 border border-border shadow-sm hover:shadow-md hover:border-secondary/30 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground">{svc.name}</h4>
                      <span className="text-secondary font-bold whitespace-nowrap ml-2">{svc.price}</span>
                    </div>
                    <p className="text-sm text-foreground-light">{svc.desc}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-foreground-muted">
                      <Clock className="w-3 h-3" /> {svc.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
