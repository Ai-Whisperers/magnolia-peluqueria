import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { businessData } from "@/lib/config"

export async function POST(request: Request) {
  const body = await request.json()
  const { client_name, phone, service, preferred_date, notes } = body

  if (!client_name || !phone || !service) {
    return NextResponse.json({ error: "Nombre, WhatsApp y servicio son requeridos" }, { status: 400 })
  }

  // Try Supabase first
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from("bookings").insert({
      client_name,
      phone,
      service,
      preferred_date: preferred_date || null,
      notes: notes || null,
      source: "booking-page",
      status: "pending",
    })

    if (!error) {
      return NextResponse.json({ ok: true, method: "database" })
    }
  }

  // Fallback: return WhatsApp deep link so nothing is lost
  const lang = "es"
  const waPhone = businessData(lang as "es" | "en").whatsapp
  const waMsg = encodeURIComponent(
    `¡Hola! Quiero reservarme un turno en Magnolia Peluquería.\n\n👤 Nombre: ${client_name}\n📞 WhatsApp: ${phone}\n✂️ Servicio: ${service}${preferred_date ? `\n📅 Fecha preferida: ${preferred_date}` : ""}${notes ? `\n📝 Notas: ${notes}` : ""}`
  )

  return NextResponse.json({
    ok: false,
    error: "base_de_datos_no_disponible",
    fallback_url: `https://wa.me/${waPhone}?text=${waMsg}`,
    message: "La base de datos no está disponible. Podés reservar directo por WhatsApp.",
  })
}