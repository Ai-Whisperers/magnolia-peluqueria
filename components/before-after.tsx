"use client"
import { useState } from "react"

export function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50)

  return (
    <section className="py-20 bg-gradient-to-b from-background to-white">
      <div className="container-page">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-4">
            Resultados
          </span>
          <h2 className="font-heading text-4xl font-bold text-primary mb-4">
            Transformaciones Reales
          </h2>
          <p className="text-foreground-light max-w-lg mx-auto">
            Deslizá el control para ver el antes y después de algunos de nuestros trabajos.
          </p>
        </div>

        {/* Before/After Slider */}
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-100 shadow-xl border border-gray-200 select-none">
            {/* After image (background) */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80"
                alt="Resultado después"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-white/90 text-primary text-sm font-bold px-4 py-2 rounded-full shadow">DESPUÉS</span>
              </div>
            </div>

            {/* Before image (foreground, clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1595476108010-b4d1ef1b45e9?w=800&q=80"
                alt="Antes"
                className="w-full h-full object-cover"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="bg-white/90 text-primary text-sm font-bold px-4 py-2 rounded-full shadow">ANTES</span>
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>
          </div>

          {/* Instruction */}
          <p className="text-center text-foreground-muted text-sm mt-4">
            ← Deslizá para comparar →
          </p>
        </div>
      </div>
    </section>
  )
}