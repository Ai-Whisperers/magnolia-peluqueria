import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { createSessionToken } from "@/lib/client-auth"

export async function POST(request: Request) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 })
  }

  const { phone, code } = await request.json()
  if (!phone || !code) {
    return NextResponse.json({ error: "Teléfono y código son requeridos" }, { status: 400 })
  }

  const cleaned = phone.replace(/\D/g, "")

  const { data: records, error } = await supabaseAdmin
    .from("otp_codes")
    .select("*")
    .eq("phone", cleaned)
    .eq("code", code)
    .eq("verified", false)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)

  if (error || !records || records.length === 0) {
    return NextResponse.json({ error: "Código inválido o expirado" }, { status: 401 })
  }

  await supabaseAdmin
    .from("otp_codes")
    .update({ verified: true })
    .eq("id", records[0].id)

  await supabaseAdmin
    .from("clients")
    .upsert({ phone: cleaned }, { onConflict: "phone" })

  const token = createSessionToken(cleaned)

  const response = NextResponse.json({ ok: true, phone: cleaned })
  response.cookies.set("magnolia_client_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  })
  return response
}
