import type { Metadata } from "next"
import ClientPortalApp from "./client-portal-app"

export const metadata: Metadata = {
  title: "Mi Cuenta — Magnolia Peluquería",
  description: "Ingresá a tu cuenta, revisá tu historial y puntos de lealtad",
}

export default async function MiCuentaPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return <ClientPortalApp lang={lang === "en" ? "en" : "es"} />
}
