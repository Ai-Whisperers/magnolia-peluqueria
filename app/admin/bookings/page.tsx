"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  client_name: string;
  phone: string;
  service: string;
  preferred_date: string | null;
  notes: string | null;
  status: string;
  source: string;
  created_at: string;
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  completed: "bg-blue-100 text-blue-700 border-blue-200",
};
const STATUS_OPTIONS = ["pending", "confirmed", "cancelled", "completed"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-PY", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then(r => r.json())
      .then(data => { setBookings(data.error ? [] : data); setLoading(false); })
      .catch(() => { setError("Error al cargar reservas"); setLoading(false); });
  }, []);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      }
    } finally {
      setUpdating(null);
    }
  }

  function exportCSV() {
    const headers = ["Cliente", "Teléfono", "Servicio", "Fecha preferida", "Notas", "Estado", "Fuente", "Creada"];
    const rows = filtered.map(b => [
      b.client_name, b.phone, b.service, b.preferred_date || "", b.notes || "",
      b.status, b.source, formatDate(b.created_at),
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `reservas-magnolia-${new Date().toISOString().split("T")[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }

  const filtered = bookings.filter(b => {
    if (filter !== "all" && b.status !== filter) return false;
    if (search && !b.client_name.toLowerCase().includes(search.toLowerCase()) && !b.phone.includes(search)) return false;
    return true;
  });

  const statusCounts = STATUS_OPTIONS.reduce((acc, s) => { acc[s] = bookings.filter(b => b.status === s).length; return acc; }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="border-b border-zinc-800 bg-zinc-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Gestión de Reservas</h1>
          <div className="flex items-center gap-4">
            <button onClick={exportCSV} disabled={bookings.length === 0}
              className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition-colors disabled:opacity-40">
              Exportar CSV
            </button>
            <a href="/admin" className="text-sm text-zinc-400 hover:text-white transition-colors">← Panel</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters + search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input type="text" placeholder="Buscar por nombre o teléfono..." value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 px-4 py-3 rounded-xl focus:outline-none focus:border-secondary transition-colors" />
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "all" ? "bg-secondary text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}>
              Todas ({bookings.length})
            </button>
            {STATUS_OPTIONS.map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === s ? STATUS_STYLES[s].split(" ")[0] + " text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}>
                {s} ({statusCounts[s] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-zinc-500">Cargando...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-lg font-medium">No hay reservas</p>
            <p className="text-sm mt-1">Las reservas aparecerán aquí cuando alguien complete el formulario</p>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-left">
                    {["Cliente", "Teléfono", "Servicio", "Fecha pref.", "Notas", "Estado", "Acciones", "Recibida"].map(h => (
                      <th key={h} className="px-4 py-3 text-xs text-zinc-500 uppercase tracking-wide font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-4 text-white font-medium">{b.client_name}</td>
                      <td className="px-4 py-4 text-zinc-400">{b.phone}</td>
                      <td className="px-4 py-4 text-zinc-400">{b.service}</td>
                      <td className="px-4 py-4 text-zinc-400 text-xs">{b.preferred_date || "—"}</td>
                      <td className="px-4 py-4 text-zinc-500 text-xs max-w-32 truncate">{b.notes || "—"}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${STATUS_STYLES[b.status] || "bg-zinc-700 text-zinc-300"}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                          disabled={updating === b.id}
                          className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-secondary">
                          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-4 text-zinc-500 text-xs whitespace-nowrap">{formatDate(b.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}