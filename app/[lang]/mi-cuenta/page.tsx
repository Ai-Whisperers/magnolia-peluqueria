import type { Metadata } from "next"
import ClientPortalApp from "./client-portal-app"

export const metadata: Metadata = {
  title: "Mi Cuenta — Magnolia Peluquería",
  description: "Ingresá a tu cuenta, revisá tu historial y puntos de lealtad",
}

export default async function MiCuentaPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ login?: string; phone?: string }>
}) {
  const [{ lang }, sp] = await Promise.all([params, searchParams])
  const showLogin = sp.login === "1" || !!sp.phone
  return <ClientPortalApp lang={lang === "en" ? "en" : "es"} initialShowLogin={showLogin} />
}
