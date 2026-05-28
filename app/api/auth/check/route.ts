import { NextResponse } from "next/server"

export async function GET() {
  const adminSession = process.env.ADMIN_EMAIL || "admin@magnolia.com"
  
  const authHeader = process.env.__NEXT_COOKIE_SIGNATURE
  const hasSession = authHeader || process.env.HAS_ADMIN_SESSION === "true"
  
  if (hasSession) {
    return NextResponse.json({ ok: true, authenticated: true })
  }
  
  return NextResponse.json({ ok: true, authenticated: false }, { status: 401 })
}