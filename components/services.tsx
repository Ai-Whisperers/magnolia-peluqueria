import { Clock, Scissors } from "lucide-react";

const cats = [
  {
    "category": "Cortes",
    "items": [
      {
        "name": "Corte Dama",
        "price": "Gs. 80.000",
        "desc": "Corte y style profesional con lavado",
        "duration": "45 min"
      },
      {
        "name": "Corte Caballero",
        "price": "Gs. 50.000",
        "desc": "Corte moderno y cl\u00e1sico",
        "duration": "30 min"
      },
      {
        "name": "Corte Ni\u00f1o",
        "price": "Gs. 40.000",
        "desc": "Para los m\u00e1s peque\u00f1os",
        "duration": "25 min"
      }
    ]
  },
  {
    "category": "Coloraci\u00f3n",
    "items": [
      {
        "name": "Coloraci\u00f3n Completa",
        "price": "Desde Gs. 150.000",
        "desc": "Cobertura total con color profesional",
        "duration": "90 min"
      },
      {
        "name": "Balayage",
        "price": "Desde Gs. 200.000",
        "desc": "T\u00e9cnica francesa de degradado natural",
        "duration": "150 min"
      },
      {
        "name": "Mechas",
        "price": "Desde Gs. 180.000",
        "desc": "Reflejos naturales para dar brillo",
        "duration": "120 min"
      }
    ]
  },
  {
    "category": "Tratamientos",
    "items": [
      {
        "name": "Keratina",
        "price": "Gs. 250.000",
        "desc": "Alisado y reparaci\u00f3n intensiva",
        "duration": "120 min"
      },
      {
        "name": "Hidrataci\u00f3n Profunda",
        "price": "Gs. 80.000",
        "desc": "Tratamiento capilar nutritivo",
        "duration": "45 min"
      },
      {
        "name": "Masaje Scalp",
        "price": "Gs. 60.000",
        "desc": "Relajaci\u00f3n y salud del cuero cabelludo",
        "duration": "30 min"
      }
    ]
  }
];

export function Services() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-heading text-3xl font-bold text-center text-primary mb-2">Nuestros Servicios</h2>
        <p className="text-center text-foreground-light mb-12 max-w-xl mx-auto">Transformamos tu estilo con profesionalismo y dedicación</p>
        <div className="space-y-10">
          {cats.map((cat: any, ci: number) => (
            <div key={ci}>
              <h3 className="font-heading text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Scissors className="w-5 h-5 text-secondary" /> {cat.category}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((svc: any, si: number) => (
                  <div key={si} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground">{svc.name}</h4>
                      <span className="text-secondary font-bold whitespace-nowrap ml-2">{svc.price}</span>
                    </div>
                    <p className="text-sm text-foreground-light">{svc.desc}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-foreground-light">
                      <Clock className="w-3 h-3" /> {svc.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="https://wa.me/59521558289?text=Hola!%20Quiero%20agendar%20una%20cita%20en%20Magnolia%20Peluquer%C3%ADa" target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-all shadow-md">
            Reservar Ahora
          </a>
        </div>
      </div>
    </section>
  );
}
