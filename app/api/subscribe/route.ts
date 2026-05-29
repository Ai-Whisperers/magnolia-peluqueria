import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { email, name, lang = "es" } = body

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email requerido" }, { status: 400 })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 })
  }

  // Try to save to Supabase if configured
  if (supabaseAdmin) {
    try {
      await supabaseAdmin.from("newsletter_subscribers").upsert(
        { email, name: name || null, lang, created_at: new Date().toISOString() },
        { onConflict: "email" }
      )
    } catch {
      // Silent fail — return success regardless
    }
  }

  return NextResponse.json({ success: true })
}
