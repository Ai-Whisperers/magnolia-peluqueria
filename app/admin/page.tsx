"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CalendarDays, Tag, Clock, ChevronRight, AlertCircle, CheckCircle, ExternalLink } from "lucide-react";

type Booking = { id: string; client_name: string; phone: string; service: string; preferred_date: string | null; status: string; created_at: string };
type Promotion = { id: string; title: string; badge: string | null; is_active: boolean; expires_at: string | null };

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

function StatCard({ icon: Icon, label, value, sub, color }: { icon: any; label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm font-medium text-zinc-400">{label}</p>
      {sub && <p className="text-xs text-zinc-600 mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [promos, setPromos] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [notConfigured, setNotConfigured] = useState(false);

  useEffect(() => {
    async function load() {
      const [bRes, pRes] = await Promise.allSettled([
        fetch("/api/admin/bookings"),
        fetch("/api/admin/promotions"),
      ]);
      if (bRes.status === "fulfilled" && bRes.value.ok) {
        const bData = await bRes.value.json();
        if (Array.isArray(bData)) { setBookings(bData); }
        else { setNotConfigured(true); }
      } else {
        setNotConfigured(true);
      }
      if (pRes.status === "fulfilled" && pRes.value.ok) {
        const pData = await pRes.value.json();
        if (Array.isArray(pData)) setPromos(pData);
      }
      setLoading(false);
    }
    load();
  }, []);

  const lastBooking = bookings[0];
  const activePromos = promos.filter(p => p.is_active).length;
  const pendingBookings = bookings.filter(b => b.status === "pending").length;

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("es-PY", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  }

  if (notConfigured) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Supabase no está configurado</h2>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Para activar el panel admin, agregá las variables de entorno en el archivo <code className="text-amber-400 font-mono">.env.local</code> del proyecto:
          </p>
          <div className="bg-zinc-950 rounded-xl p-4 text-left mb-6 font-mono text-sm space-y-2">
            <p className="text-zinc-300">NEXT_PUBLIC_SUPABASE_URL=</p>
            <p className="text-zinc-300">SUPABASE_SERVICE_ROLE_KEY=</p>
          </div>
          <p className="text-xs text-zinc-600">
            Luego corré el schema SQL en el editor de Supabase: <code className="text-zinc-500">supabase/schema.sql</code>
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/admin/content" className="text-sm text-amber-400 hover:text-amber-300 font-medium">
              Editar contenido →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Panel de Administración</h1>
            <p className="text-sm text-zinc-500">Magnolia Peluquería</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/content" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Contenido
            </Link>
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.href = "/admin/login";
              }}
              className="text-sm text-zinc-500 hover:text-red-400 transition-colors"
            >
              Cerrar sesión
            </button>
            <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5" /> Ver sitio
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard icon={CalendarDays} label="Total reservas" value={bookings.length} sub="todas" color="bg-secondary/10 text-secondary" />
          <StatCard icon={Clock} label="Pendientes" value={pendingBookings} sub="requieren confirmación" color="bg-amber-500/10 text-amber-400" />
          <StatCard icon={Tag} label="Promociones activas" value={activePromos} sub={`de ${promos.length} totales`} color="bg-violet-500/10 text-violet-400" />
        </div>

        {/* Last booking info */}
        {lastBooking && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <h2 className="text-white font-semibold">Última reserva recibida</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wide">Cliente</p>
                <p className="text-white font-medium">{lastBooking.client_name}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wide">Servicio</p>
                <p className="text-white font-medium">{lastBooking.service}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wide">Fecha</p>
                <p className="text-white font-medium">{lastBooking.preferred_date || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wide">Recibida</p>
                <p className="text-white font-medium">{formatDate(lastBooking.created_at)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Recent bookings */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-8">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <h2 className="text-white font-semibold">Reservas recientes</h2>
            <Link href="/admin/bookings" className="text-sm text-secondary hover:text-secondary-dark font-medium flex items-center gap-1">
              Ver todas <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          {bookings.length === 0 && !loading ? (
            <div className="p-12 text-center text-zinc-500">
              <CalendarDays className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No hay reservas todavía</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-left">
                    <th className="px-6 py-3 text-xs text-zinc-500 uppercase tracking-wide font-semibold">Cliente</th>
                    <th className="px-6 py-3 text-xs text-zinc-500 uppercase tracking-wide font-semibold">Teléfono</th>
                    <th className="px-6 py-3 text-xs text-zinc-500 uppercase tracking-wide font-semibold">Servicio</th>
                    <th className="px-6 py-3 text-xs text-zinc-500 uppercase tracking-wide font-semibold">Fecha pref.</th>
                    <th className="px-6 py-3 text-xs text-zinc-500 uppercase tracking-wide font-semibold">Estado</th>
                    <th className="px-6 py-3 text-xs text-zinc-500 uppercase tracking-wide font-semibold">Recibida</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 10).map((b) => (
                    <tr key={b.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{b.client_name}</td>
                      <td className="px-6 py-4 text-zinc-400">{b.phone}</td>
                      <td className="px-6 py-4 text-zinc-400">{b.service}</td>
                      <td className="px-6 py-4 text-zinc-400">{b.preferred_date || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${STATUS_STYLES[b.status] || "bg-zinc-700 text-zinc-300"}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-500">{formatDate(b.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/admin/bookings" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-secondary/30 transition-all group">
            <CalendarDays className="w-8 h-8 text-secondary mb-4" />
            <h3 className="text-white font-semibold mb-1">Gestionar Reservas</h3>
            <p className="text-zinc-500 text-sm">Confirmar, cancelar o exportar reservas</p>
            <p className="text-secondary text-sm font-medium mt-3 group-hover:underline">Ir a reservas →</p>
          </Link>
          <Link href="/admin/promotions" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-secondary/30 transition-all group">
            <Tag className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-white font-semibold mb-1">Promociones</h3>
            <p className="text-zinc-500 text-sm">Crear y editar promociones activas</p>
            <p className="text-secondary text-sm font-medium mt-3 group-hover:underline">Ir a promociones →</p>
          </Link>
        </div>
      </div>
    </div>
  );
}