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
    .from("promotions")
    .select("*")
    .order("sort_order");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "Supabase no configurado" }, { status: 503 });
  }
  const body = await request.json();
  const { title, subtitle, badge, wa_message, color, expires_at, is_active } = body;
  if (!title) return NextResponse.json({ error: "title requerido" }, { status: 400 });
  const { data, error } = await supabaseAdmin
    .from("promotions")
    .insert({ title, subtitle, badge, wa_message, color: color || "secondary", expires_at, is_active: is_active ?? true })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "Supabase no configurado" }, { status: 503 });
  }
  const { id, ...updates } = await request.json();
  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });
  const { data, error } = await supabaseAdmin
    .from("promotions")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "Supabase no configurado" }, { status: 503 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });
  const { error } = await supabaseAdmin.from("promotions").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}