import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { business } from "@/lib/config"

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 })
  }

  const { phone } = await request.json()
  if (!phone || phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json({ error: "Ingresá un número de Messaging válido" }, { status: 400 })
  }

  const cleaned = phone.replace(/\D/g, "")

  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
  const { count } = await supabaseAdmin
    .from("otp_codes")
    .select("*", { count: "exact", head: true })
    .eq("phone", cleaned)
    .gt("created_at", fiveMinAgo)

  if (count && count >= 3) {
    return NextResponse.json({ error: "Demasiados intentos. Esperá 5 minutos." }, { status: 429 })
  }

  const code = generateCode()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

  await supabaseAdmin.from("otp_codes").insert({
    phone: cleaned,
    code,
    expires_at: expiresAt,
  })

  const waMsg = encodeURIComponent(`Tu código de verificación Magnolia es: ${code}. Válido por 10 minutos.`)
  const waUrl = `tel:+${business.messaging}?text=${waMsg}`

  return NextResponse.json({ ok: true, waUrl, phone: cleaned })
}
