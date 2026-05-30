import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ADMIN_PREFIX = "/admin"
const PUBLIC_ADMIN_ROUTES = ["/admin/login", "/admin/api/"]
const CLIENT_PREFIX = "/mi-cuenta"
const PUBLIC_AUTH_ROUTES = ["/api/auth/otp/", "/api/auth/logout", "/api/auth/login"]

function getSecret(): string {
  return process.env.CLIENT_AUTH_SECRET || process.env.ADMIN_AUTH_SECRET || "magnolia-default-secret-change-me"
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload))
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("")
}

async function verifyClientSession(token: string): Promise<string | null> {
  const parts = token.split(".")
  if (parts.length !== 4) return null
  const [expRaw, nonce, phone, signature] = parts
  if (!expRaw || !nonce || !phone || !signature) return null

  const expected = await hmacSign(`${expRaw}.${nonce}.${phone}`, getSecret())
  if (expected !== signature) return null

  const exp = Number(expRaw)
  if (!Number.isFinite(exp)) return null
  if (exp <= Math.floor(Date.now() / 1000)) return null

  return phone
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next()
  }

  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (PUBLIC_ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
      return NextResponse.next()
    }
    const sessionCookie = request.cookies.get("admin_session")
    if (!sessionCookie?.value) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  if (pathname.startsWith(CLIENT_PREFIX)) {
    const sessionCookie = request.cookies.get("magnolia_client_session")
    if (!sessionCookie?.value) {
      const lang = pathname.startsWith("/mi-cuenta") ? "es" : "es"
      const loginUrl = new URL(`/${lang}/mi-cuenta`, request.url)
      loginUrl.searchParams.set("login", "1")
      return NextResponse.redirect(loginUrl)
    }

    const phone = await verifyClientSession(sessionCookie.value)
    if (!phone) {
      const loginUrl = new URL("/es/mi-cuenta", request.url)
      loginUrl.searchParams.set("login", "1")
      const response = NextResponse.redirect(loginUrl)
      response.cookies.set("magnolia_client_session", "", { maxAge: 0, path: "/" })
      return response
    }

    const response = NextResponse.next()
    response.headers.set("x-client-phone", phone)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/mi-cuenta/:path*", "/es/mi-cuenta/:path*", "/en/mi-cuenta/:path*"],
}
