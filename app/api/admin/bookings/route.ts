import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase no configurado. Agregá NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY al .env" },
      { status: 503 }
    );
  }
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "Supabase no configurado" }, { status: 503 });
  }
  const { id, status } = await request.json();
  if (!id || !status) return NextResponse.json({ error: "id y status requeridos" }, { status: 400 });
  const allowed = ["pending", "confirmed", "cancelled", "completed"];
  if (!allowed.includes(status)) return NextResponse.json({ error: "status inválido" }, { status: 400 });
  const { error } = await supabaseAdmin.from("bookings").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}