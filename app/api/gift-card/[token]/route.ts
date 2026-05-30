import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 })
  }

  const { token } = await params

  const { data: card, error } = await supabaseAdmin
    .from("gift_cards")
    .select("code, amount_gs, balance_gs, buyer_name, recipient_name, message, design, status, expires_at")
    .or(`token.eq.${token},code.eq.${token}`)
    .single()

  if (error || !card) {
    return NextResponse.json({ error: "not_found" }, { status: 404 })
  }

  return NextResponse.json(card)
}
