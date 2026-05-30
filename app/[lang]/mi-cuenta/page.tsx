import type { Metadata } from "next"
import ClientPortal from "./client-portal"

export const metadata: Metadata = {
  title: "Mi Cuenta — Magnolia Peluquería",
  description: "Consultá tu historial, tarjetas de regalo y puntos de lealtad",
}

export default async function MiCuentaPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return <ClientPortal lang={lang === "en" ? "en" : "es"} />
}
