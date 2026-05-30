"use client"

import { useState } from "react"
import { Phone, Gift, Star, Clock, ArrowLeft, Loader2, MessageCircle, History, Award } from "lucide-react"
import { business } from "@/lib/config"

type ClientData = {
  id: string
  phone: string
  name: string | null
  email: string | null
  tier: string
  visits: number
  total_points: number
  recent_visits: { id: string; services: string[] | null; total_gs: number | null; paid_via: string | null; created_at: string }[]
  gift_cards: { code: string; amount_gs: number; balance_gs: number; status: string; expires_at: string | null; created_at: string }[]
  loyalty_history: { points: number; reason: string | null; created_at: string }[]
}

const TIER_INFO: Record<string, { label: string; color: string; icon: string; next: string }> = {
  bronce: { label: "Bronce", color: "bg-amber-100 text-amber-700 border-amber-200", icon: "🥉", next: "80 pts → Plata" },
  plata: { label: "Plata", color: "bg-gray-100 text-gray-600 border-gray-300", icon: "🥈", next: "200 pts → Oro" },
  oro: { label: "Oro", color: "bg-yellow-100 text-yellow-700 border-yellow-300", icon: "🥇", next: "¡Nivel máximo!" },
}

function formatGs(n: number | null) {
  if (!n) return "—"
  return `Gs. ${n.toLocaleString("es-PY")}`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-PY", { day: "numeric", month: "short", year: "numeric" })
}

const STATUS_COLORS: Record<string, string> = {
  active: "text-green-600",
  partial: "text-amber-600",
  redeemed: "text-gray-400",
  expired: "text-red-400",
}

export default function ClientPortal({ lang }: { lang: "es" | "en" }) {
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [client, setClient] = useState<ClientData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<"overview" | "visits" | "cards" | "loyalty">("overview")

  async function lookup() {
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length < 8) {
      setError(lang === "es" ? "Ingresá un número de WhatsApp válido" : "Enter a valid WhatsApp number")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/client/${cleaned}`)
      if (!res.ok) {
        setClient(null)
        setError(lang === "es" ? "No encontramos una cuenta con ese número. ¡Reservá tu primer turno para crear tu perfil!" : "No account found with that number")
        return
      }
      const data = await res.json()
      setClient(data)
    } catch {
      setError(lang === "es" ? "Error de conexión" : "Connection error")
    } finally {
      setLoading(false)
    }
  }

  if (!client) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-rose-500" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
              {lang === "es" ? "Mi Cuenta" : "My Account"}
            </h1>
            <p className="text-gray-500 mb-8">
              {lang === "es"
                ? "Ingresá tu número de WhatsApp para ver tu historial, tarjetas de regalo y puntos."
                : "Enter your WhatsApp number to see your history, gift cards, and points."}
            </p>
            <div className="flex gap-2 mb-4">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && lookup()}
                placeholder="0981 234567"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              />
              <button
                onClick={lookup}
                disabled={loading}
                className="bg-gray-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "→"}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="text-xs text-gray-400 mt-6">
              {lang === "es"
                ? "¿No tenés cuenta? ¡Reservá tu primer turno y se crea automáticamente!"
                : "No account? Book your first appointment and it's created automatically!"}
            </p>
            <a
              href="/es/reserva"
              className="inline-flex items-center gap-2 text-sm text-rose-500 font-semibold hover:underline mt-2"
            >
              {lang === "es" ? "Reservar turno" : "Book appointment"}
            </a>
          </div>
        </div>
      </div>
    )
  }

  const tierInfo = TIER_INFO[client.tier] || TIER_INFO.bronce

  return (
    <div className="min-h-[80vh] max-w-3xl mx-auto px-4 py-10">
      <button
        onClick={() => { setClient(null); setPhone("") }}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {lang === "es" ? "Buscar otro número" : "Search another number"}
      </button>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-rose-400 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold">{client.name || (lang === "es" ? "Cliente" : "Client")}</h1>
              <p className="text-white/80 text-sm">{client.phone}</p>
            </div>
            <div className="text-4xl">{tierInfo.icon}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-gray-100 p-0">
          <div className="text-center py-4">
            <p className="text-2xl font-bold text-gray-900">{client.visits}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">{lang === "es" ? "Visitas" : "Visits"}</p>
          </div>
          <div className="text-center py-4">
            <p className="text-2xl font-bold text-gray-900">{client.total_points}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">{lang === "es" ? "Puntos" : "Points"}</p>
          </div>
          <div className="text-center py-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${tierInfo.color}`}>
              {tierInfo.label}
            </span>
            <p className="text-xs text-gray-400 mt-1">{tierInfo.next}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
        {([
          { key: "overview", icon: <Award className="w-4 h-4" />, label: lang === "es" ? "Resumen" : "Overview" },
          { key: "visits", icon: <History className="w-4 h-4" />, label: lang === "es" ? "Visitas" : "Visits" },
          { key: "cards", icon: <Gift className="w-4 h-4" />, label: lang === "es" ? "Tarjetas" : "Cards" },
          { key: "loyalty", icon: <Star className="w-4 h-4" />, label: lang === "es" ? "Puntos" : "Points" },
        ] as const).map(({ key, icon, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              tab === key ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">
              {lang === "es" ? "Actividad reciente" : "Recent activity"}
            </h3>
            {client.recent_visits.length === 0 ? (
              <p className="text-gray-400 text-sm">{lang === "es" ? "Sin visitas registradas" : "No visits recorded"}</p>
            ) : (
              <div className="space-y-3">
                {client.recent_visits.slice(0, 3).map((v) => (
                  <div key={v.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {v.services ? v.services.join(", ") : (lang === "es" ? "Visita" : "Visit")}
                      </p>
                      <p className="text-xs text-gray-400">{formatDate(v.created_at)}</p>
                    </div>
                    {v.total_gs && <p className="text-sm font-bold text-gray-700">{formatGs(v.total_gs)}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
          {client.gift_cards.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-3">
                {lang === "es" ? "Mis tarjetas" : "My cards"}
              </h3>
              <div className="space-y-2">
                {client.gift_cards.slice(0, 3).map((gc) => (
                  <div key={gc.code} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-mono font-bold text-gray-700">{gc.code}</p>
                      <p className="text-xs text-gray-400">{formatGs(gc.amount_gs)}</p>
                    </div>
                    <span className={`text-sm font-bold ${STATUS_COLORS[gc.status] || "text-gray-400"}`}>
                      {gc.status === "active" ? formatGs(gc.balance_gs) : gc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <a
            href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
              `Hola! Soy ${client.name || "cliente"} (${client.phone}). Quiero consultar sobre mi cuenta.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold w-full py-3 rounded-xl hover:bg-[#20BD5A] transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            {lang === "es" ? "Consultar por WhatsApp" : "Contact via WhatsApp"}
          </a>
        </div>
      )}

      {tab === "visits" && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-heading font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            {lang === "es" ? "Historial de visitas" : "Visit history"}
          </h3>
          {client.recent_visits.length === 0 ? (
            <p className="text-gray-400 text-sm">{lang === "es" ? "Sin visitas registradas aún" : "No visits recorded yet"}</p>
          ) : (
            <div className="space-y-3">
              {client.recent_visits.map((v) => (
                <div key={v.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {v.services ? v.services.join(", ") : (lang === "es" ? "Visita" : "Visit")}
                    </p>
                    <p className="text-xs text-gray-400">{formatDate(v.created_at)}</p>
                  </div>
                  <div className="text-right">
                    {v.total_gs && <p className="text-sm font-bold text-gray-700">{formatGs(v.total_gs)}</p>}
                    {v.paid_via && <p className="text-xs text-gray-400">{v.paid_via}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "cards" && (
        <div className="space-y-4">
          {client.gift_cards.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <Gift className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400">{lang === "es" ? "No tenés tarjetas de regalo" : "You have no gift cards"}</p>
              <a href="/es#gift-cards" className="inline-flex items-center gap-1 text-sm text-rose-500 font-semibold hover:underline mt-2">
                {lang === "es" ? "Comprar una tarjeta" : "Buy a card"}
              </a>
            </div>
          ) : (
            client.gift_cards.map((gc) => (
              <div key={gc.code} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-lg font-bold text-gray-900">{gc.code}</p>
                  <span className={`text-xs font-bold uppercase ${STATUS_COLORS[gc.status] || "text-gray-400"}`}>{gc.status}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{lang === "es" ? "Monto original" : "Original amount"}: {formatGs(gc.amount_gs)}</span>
                  <span className="font-bold text-gray-700">
                    {lang === "es" ? "Saldo" : "Balance"}: {formatGs(gc.balance_gs)}
                  </span>
                </div>
                {gc.expires_at && (
                  <p className="text-xs text-gray-400 mt-1">{lang === "es" ? "Expira" : "Expires"}: {formatDate(gc.expires_at)}</p>
                )}
                {gc.status !== "redeemed" && gc.status !== "expired" && (
                  <a
                    href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                      `Hola! Quiero usar mi tarjeta ${gc.code} con saldo ${formatGs(gc.balance_gs)}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#25D366] font-semibold hover:underline mt-3"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {lang === "es" ? "Usar por WhatsApp" : "Use via WhatsApp"}
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {tab === "loyalty" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="text-4xl mb-2">{tierInfo.icon}</div>
            <p className="text-4xl font-bold text-gray-900">{client.total_points}</p>
            <p className="text-sm text-gray-400">{lang === "es" ? "puntos acumulados" : "points accumulated"}</p>
            <p className="text-xs text-gray-400 mt-1">{tierInfo.next}</p>
          </div>
          {client.loyalty_history.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <Star className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400">{lang === "es" ? "Ganá puntos con cada visita completada" : "Earn points with each completed visit"}</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">
                {lang === "es" ? "Historial de puntos" : "Points history"}
              </h3>
              <div className="space-y-3">
                {client.loyalty_history.map((l, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm text-gray-700">{l.reason || (lang === "es" ? "Punto" : "Point")}</p>
                      <p className="text-xs text-gray-400">{formatDate(l.created_at)}</p>
                    </div>
                    <span className={`font-bold text-sm ${l.points > 0 ? "text-green-600" : "text-red-500"}`}>
                      {l.points > 0 ? "+" : ""}{l.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
