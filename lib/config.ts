import contentEsData from "@/content/es.json"
import contentEnData from "@/content/en.json"
import siteConfigData from "@/content/site.json"

export type ColorName = "rose" | "violet" | "amber" | "sky"
export type IconName = "scissors" | "palette" | "sparkles" | "sparkle"
export type Lang = "es" | "en"

export const siteConfig = siteConfigData
export const theme = siteConfigData.site.theme
export const siteUrl = siteConfigData.site.url

// ── i18n content accessors ──────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonContent = Record<string, any>
const contents: Record<Lang, JsonContent> = {
  es: contentEsData as JsonContent,
  en: contentEnData as JsonContent,
}

export function getContent(lang: Lang = "es") {
  return contents[lang] ?? contents.es
}

export function businessData(lang: Lang = "es")  { return getContent(lang).business }
export function heroSlidesData(lang: Lang = "es") { return getContent(lang).hero.slides }
export function statsData(lang: Lang = "es")        { return getContent(lang).stats }
export function servicesData(lang: Lang = "es")    { return getContent(lang).services.categories }
export function galleryData(lang: Lang = "es")     { return getContent(lang).gallery }
export function testimonialsData(lang: Lang = "es"){ return getContent(lang).testimonials }
export function reasonsData(lang: Lang = "es")    { return getContent(lang).reasons }
export function ctaData(lang: Lang = "es")         { return getContent(lang).cta }
export function teamData(lang: Lang = "es")        { return getContent(lang).team }
export function beforeAfterData(lang: Lang = "es"){ return getContent(lang).beforeAfter }
export function promotionsData(lang: Lang = "es") { return getContent(lang).promotions }
export function loyaltyData(lang: Lang = "es")    { return getContent(lang).loyalty }
export function giftCardsData(lang: Lang = "es")   { return getContent(lang).giftCards }
export function faqsData(lang: Lang = "es")        { return getContent(lang).faqs }

// ── Backwards-compatible static exports (Spanish default) ───────
export const content     = contentEsData
export const business    = contentEsData.business
export const heroSlides  = contentEsData.hero.slides
export const stats       = contentEsData.stats
export const services    = contentEsData.services.categories
export const gallery     = contentEsData.gallery
export const testimonials= contentEsData.testimonials
export const reasons     = contentEsData.reasons
export const cta         = contentEsData.cta
export const team        = contentEsData.team
export const beforeAfter = contentEsData.beforeAfter
export const promotions  = contentEsData.promotions
export const loyalty     = contentEsData.loyalty
export const giftCards   = contentEsData.giftCards
export const faqs        = contentEsData.faqs

// ── WhatsApp helpers ─────────────────────────────────────────────
export function waLink(message?: string): string {
  const b = contentEsData.business
  const msg = message ?? b.ctaMessage
  return `https://wa.me/${b.whatsapp}?text=${encodeURIComponent(decodeURIComponent(msg))}`
}

export function waLinkLang(message: string, lang: Lang): string {
  const b = getContent(lang).business
  return `https://wa.me/${b.whatsapp}?text=${encodeURIComponent(decodeURIComponent(message))}`
}

export function waLinkForService(serviceName: string): string {
  return waLink(`Hola! Quiero reservar ${serviceName}`)
}

export function waLinkForPromotion(title = "una promoción"): string {
  return waLink(`Hola! Quiero saber más sobre ${title} de Magnolia`)
}

// ── Style helpers ───────────────────────────────────────────────
export function getColorMap(color: ColorName) {
  const map: Record<ColorName, { bg: string; text: string; light: string }> = {
    rose:    { bg: "bg-rose-500",    text: "text-rose-500",    light: "bg-rose-50"    },
    violet:  { bg: "bg-violet-500",  text: "text-violet-500",  light: "bg-violet-50"  },
    amber:   { bg: "bg-amber-500",   text: "text-amber-500",   light: "bg-amber-50"   },
    sky:     { bg: "bg-sky-500",     text: "text-sky-500",     light: "bg-sky-50"    },
  }
  return map[color] ?? map.rose
}

export function getInitialsBg(color: ColorName): string {
  const map: Record<ColorName, string> = {
    rose:    "bg-rose-100 text-rose-700",
    violet:  "bg-violet-100 text-violet-700",
    amber:   "bg-amber-100 text-amber-700",
    sky:     "bg-sky-100 text-sky-700",
  }
  return map[color] ?? map.rose
}

// ── Translations ────────────────────────────────────────────────
export const t = {
  es: {
    navHome: "Inicio", navServices: "Servicios", navAbout: "Nosotros",
    navBooking: "Reservar", navFAQ: "FAQ", navContact: "Contacto",
    bookCta: "Reservar", bookCtaMobile: "Reservar por WhatsApp",
    closed: "Cerrado", openNow: "Abierto ahora",
  },
  en: {
    navHome: "Home", navServices: "Services", navAbout: "About",
    navBooking: "Book", navFAQ: "FAQ", navContact: "Contact",
    bookCta: "Book Now", bookCtaMobile: "Book via WhatsApp",
    closed: "Closed", openNow: "Open now",
  },
} as const

export type Translations = typeof t.es