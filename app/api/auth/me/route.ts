import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/client-auth"

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("magnolia_client_session")?.value
  const result = verifySessionToken(token)

  if (!result) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true, phone: result.phone })
}
