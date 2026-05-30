import { SuccessContent } from "./success-content"

interface SuccessProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function ReservationSuccessPage({ params, searchParams }: SuccessProps) {
  const [{ lang }, query] = await Promise.all([params, searchParams])
  return <SuccessContent lang={lang || "es"} query={query} />
}
