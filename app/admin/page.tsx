"use client";
import { useState, useEffect } from "react";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

type Booking = {
  id: string;
  created_at: string;
  client_name: string;
  phone: string;
  service: string;
  preferred_date: string | null;
  notes: string | null;
  status: string;
};

type Promotion = {
  id: string;
  title: string;
  subtitle: string | null;
  badge: string | null;
  wa_message: string | null;
  is_active: boolean;
  expires_at: string | null;
  sort_order: number;
};

export default function AdminDashboard() {
  const [tab, setTab] = useState<"bookings" | "promotions">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState(new Date());

  async function loadBookings() {
    if (!isSupabaseConfigured || !supabaseAdmin) return;
    const { data } = await supabaseAdmin.from("bookings").select("*").order("created_at", { ascending: false }).limit(50);
    setBookings(data || []);
  }

  async function loadPromotions() {
    if (!isSupabaseConfigured || !supabaseAdmin) return;
    const { data } = await supabaseAdmin.from("promotions").select("*").order("sort_order");
    setPromotions(data || []);
  }

  async function updateBookingStatus(id: string, status: string) {
    if (!supabaseAdmin) return;
    await supabaseAdmin.from("bookings").update({ status }).eq("id", id);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  }

  async function togglePromotion(id: string, is_active: boolean) {
    if (!supabaseAdmin) return;
    await supabaseAdmin.from("promotions").update({ is_active }).eq("id", id);
    setPromotions(prev => prev.map(p => p.id === id ? { ...p, is_active } : p));
  }

  useEffect(() => {
    if (tab === "bookings") loadBookings();
    else loadPromotions();
    setLoading(false);
  }, [tab]);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString("es-PY", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  }

  const pending = bookings.filter(b => b.status === "pending").length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Top bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Panel Magnolia</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {isSupabaseConfigured ? "Conectado a Supabase" : "Supabase no configurado — modo demo"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-zinc-400">Última actualización</p>
            <p className="text-sm text-zinc-300">{lastRefresh.toLocaleTimeString("es-PY")}</p>
          </div>
          <button
            onClick={() => { loadBookings(); loadPromotions(); setLastRefresh(new Date()); }}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            ↻ Refrescar
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-6 pt-6">
        {(["bookings", "promotions"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-t-lg text-sm font-semibold transition-all relative
              ${tab === t ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            {t === "bookings" ? "Reservas" : "Promociones"}
            {t === "bookings" && pending > 0 && (
              <span className="ml-2 bg-amber-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">{pending}</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {!isSupabaseConfigured ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 text-center">
            <p className="text-amber-400 font-bold mb-1">Supabase no configurado</p>
            <p className="text-zinc-400 text-sm">Agregá las variables de entorno para activar el panel.</p>
          </div>
        ) : tab === "bookings" ? (
          <>
            {loading ? (
              <div className="text-zinc-500 text-center py-12">Cargando reservas...</div>
            ) : bookings.length === 0 ? (
              <div className="bg-zinc-900 rounded-xl p-12 text-center">
                <p className="text-zinc-400">No hay reservas todavía.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map(b => (
                  <div key={b.id} className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-white">{b.client_name}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            b.status === "pending" ? "bg-amber-500/20 text-amber-400" :
                            b.status === "confirmed" ? "bg-green-500/20 text-green-400" :
                            "bg-red-500/20 text-red-400"
                          }`}>
                            {b.status === "pending" ? "Pendiente" : b.status === "confirmed" ? "Confirmado" : "Cancelado"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-zinc-400">
                          <p>📞 <a href={`https://wa.me/${b.phone.replace(/\D/g,"")}`} className="text-secondary hover:underline" target="_blank" rel="noopener noreferrer">{b.phone}</a></p>
                          <p>✂️ {b.service}</p>
                          {b.preferred_date && <p>📅 {b.preferred_date}</p>}
                          {b.notes && <p className="col-span-2 text-zinc-500">📝 {b.notes}</p>}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-zinc-500 mb-2">{formatDate(b.created_at)}</p>
                        {b.status === "pending" && (
                          <div className="flex gap-2">
                            <button onClick={() => updateBookingStatus(b.id, "confirmed")} className="text-xs bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg transition-colors">✓ Confirmar</button>
                            <button onClick={() => updateBookingStatus(b.id, "cancelled")} className="text-xs bg-red-600/50 hover:bg-red-500/50 text-white px-3 py-1.5 rounded-lg transition-colors">✗ Cancelar</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promotions.map(p => (
              <div key={p.id} className={`bg-zinc-900 rounded-xl p-5 border ${p.is_active ? "border-zinc-700" : "border-zinc-800 opacity-60"}`}>
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.is_active ? "bg-green-500/20 text-green-400" : "bg-zinc-700 text-zinc-500"}`}>
                    {p.is_active ? "Activa" : "Inactiva"}
                  </span>
                  <button
                    onClick={() => togglePromotion(p.id, !p.is_active)}
                    className={`text-xs px-3 py-1 rounded-lg transition-all ${p.is_active ? "bg-zinc-700 hover:bg-zinc-600 text-zinc-300" : "bg-green-600 hover:bg-green-500 text-white"}`}
                  >
                    {p.is_active ? "Desactivar" : "Activar"}
                  </button>
                </div>
                <h3 className="font-bold text-white mb-1">{p.title}</h3>
                <p className="text-sm text-zinc-400">{p.subtitle}</p>
                {p.expires_at && (
                  <p className="text-xs text-zinc-500 mt-2">⏱️ Vence: {new Date(p.expires_at).toLocaleDateString("es-PY")}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}