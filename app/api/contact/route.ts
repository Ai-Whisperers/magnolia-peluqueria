import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: Request) {
  const { email, name, message, source } = await request.json()

  if (!email || !name) {
    return NextResponse.json({ error: "Email y nombre son requeridos" }, { status: 400 })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 })
  }

  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from("contacts").upsert(
      { email, name: name || null, message: message || null, source: source || "exit-popup" },
      { onConflict: "email" }
    )

    if (!error) {
      return NextResponse.json({ ok: true })
    }
  }

  // Graceful degradation — don't block the user experience
  return NextResponse.json({ ok: true, degraded: true })
}