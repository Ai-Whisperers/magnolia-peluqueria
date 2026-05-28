"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { waLink } from "@/lib/config";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Calendar,
  User,
  Phone,
  Scissors,
  MessageCircle,
  Clock,
} from "lucide-react";

const SERVICES = [
  { value: "Corte Dama", label: "Corte Dama", duration: "45 min", icon: "✂️" },
  { value: "Corte Caballero", label: "Corte Caballero", duration: "30 min", icon: "💇" },
  { value: "Coloración Completa", label: "Coloración Completa", duration: "2.5 hrs", icon: "🎨" },
  { value: "Balayage / Mechas", label: "Balayage / Mechas", duration: "3 hrs", icon: "✨" },
  { value: "Keratina", label: "Keratina / Alisado", duration: "3 hrs", icon: "💆" },
  { value: "Botox Capilar", label: "Botox Capilar", duration: "2 hrs", icon: "🧴" },
  { value: "Peinado para Evento", label: "Peinado para Evento", duration: "1.5 hrs", icon: "👗" },
  { value: "Maquillaje", label: "Maquillaje", duration: "1 hr", icon: "💄" },
  { value: "Otro", label: "Otro / Consultar", duration: "—", icon: "❓" },
];

const STEPS = [
  { id: 1, label: "Servicio", icon: Scissors },
  { id: 2, label: "Tus datos", icon: User },
  { id: 3, label: "Fecha", icon: Calendar },
  { id: 4, label: "Confirmar", icon: Check },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((step, i) => {
        const done = step.id < current;
        const active = step.id === current;
        const Icon = step.icon;
        return (
          <div key={step.id} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
              ${done ? "bg-secondary text-white" : active ? "bg-secondary text-white ring-4 ring-secondary/20" : "bg-gray-100 text-gray-400"}`}
            >
              {done ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-0.5 rounded ${step.id < current ? "bg-secondary" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function BookingForm({ supabaseConfigured }: { supabaseConfigured: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [serviceLabel, setServiceLabel] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canNext = step === 1 ? service : step === 2 ? name.trim() && phone.trim() : true;

  function handleNext() {
    if (!canNext) return;
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    if (supabaseConfigured) {
      try {
        const res = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ client_name: name, phone, service: serviceLabel, preferred_date: preferredDate, notes }),
        });
        if (!res.ok) throw new Error("Failed");
      } catch (_) {
        // fallback to WhatsApp
      }
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  function getWhatsAppMessage() {
    const dateText = preferredDate ? `\n📅 Fecha preferida: ${preferredDate}` : "";
    const notesText = notes ? `\n📝 Notas: ${notes}` : "";
    return `¡Hola! Quiero reservarme un turno en Magnolia Peluquería.\n\n👤 Nombre: ${name}\n📞 Teléfono: ${phone}\n✂️ Servicio: ${serviceLabel}${dateText}${notesText}`;
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-secondary" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-primary mb-3">¡Casi listo!</h3>
        <p className="text-foreground-light mb-8 max-w-sm mx-auto">
          Completá tu reserva enviándonos un mensaje por WhatsApp con tus datos.
        </p>
        <a
          href={`https://wa.me/595986106062?text=${encodeURIComponent(getWhatsAppMessage())}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#20BD5A] transition-all text-lg"
        >
          <MessageCircle className="w-6 h-6" />
          Reservar por WhatsApp
        </a>
        <p className="text-xs text-foreground-muted mt-4">
          Te respondemos en menos de 5 minutos
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <StepIndicator current={step} />

      {/* STEP 1: Service */}
      {step === 1 && (
        <ScrollReveal direction="up">
          <div className="space-y-3">
            <h3 className="font-heading text-xl font-bold text-primary mb-1">¿Qué servicio necesitás?</h3>
            <p className="text-foreground-light text-sm mb-6">Elegí el servicio principal para tu turno.</p>
            <div className="grid grid-cols-1 gap-3">
              {SERVICES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => { setService(s.value); setServiceLabel(s.label); }}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all
                    ${service === s.value ? "border-secondary bg-secondary/5" : "border-gray-100 hover:border-gray-200 bg-white"}`}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{s.label}</p>
                    <p className="text-xs text-foreground-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {s.duration}
                    </p>
                  </div>
                  {service === s.value && <Check className="w-5 h-5 text-secondary" />}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* STEP 2: Personal info */}
      {step === 2 && (
        <ScrollReveal direction="up">
          <div className="space-y-5">
            <h3 className="font-heading text-xl font-bold text-primary mb-1">Tus datos de contacto</h3>
            <p className="text-foreground-light text-sm mb-4">Los usamos solo para confirmar tu turno.</p>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Nombre completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="María García"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-secondary outline-none transition-all text-foreground bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">WhatsApp</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0981 123 456"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-secondary outline-none transition-all text-foreground bg-white"
              />
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* STEP 3: Date + notes */}
      {step === 3 && (
        <ScrollReveal direction="up">
          <div className="space-y-5">
            <h3 className="font-heading text-xl font-bold text-primary mb-1">¿Cuándo querés venir?</h3>
            <p className="text-foreground-light text-sm mb-4">Martes a Sábado, 9:00 – 19:00.</p>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Fecha preferida</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-secondary outline-none transition-all text-foreground bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Notas adicionales <span className="text-foreground-muted font-normal">(opcional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tengo el cabello teñido de rubio, quiero mantener el tono..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-secondary outline-none transition-all text-foreground bg-white resize-none"
              />
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* STEP 4: Confirm */}
      {step === 4 && (
        <ScrollReveal direction="up">
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-primary mb-1">Confirmá tu reserva</h3>
            <p className="text-foreground-light text-sm mb-4">Revisá que todo esté bien antes de enviar.</p>
            {[
              { label: "Servicio", value: serviceLabel },
              { label: "Nombre", value: name },
              { label: "WhatsApp", value: phone },
              { label: "Fecha preferida", value: preferredDate || "A confirmar" },
              ...(notes ? [{ label: "Notas", value: notes }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-wide">{label}</p>
                  <p className="font-semibold text-foreground mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-8 pt-4">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-foreground-light font-medium px-4 py-3 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" /> Volver
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canNext || submitting}
          className={`flex-1 flex items-center justify-center gap-2 font-bold px-6 py-4 rounded-xl transition-all
            ${canNext ? "bg-secondary text-white hover:bg-secondary-dark" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
        >
          {step === 4 ? (
            submitting ? "Enviando..." : <>
              <MessageCircle className="w-5 h-5" /> Reservar por WhatsApp
            </>
          ) : (
            <>Continuar <ChevronRight className="w-5 h-5" /></>
          )}
        </button>
      </div>
    </div>
  );
}