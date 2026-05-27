/**
 * Centralized site configuration and content.
 * ALL business data lives here — no hardcoded values in components.
 */

import contentData from "@/content/es.json"
import siteConfigData from "@/content/site.json"

export type ColorName = "rose" | "violet" | "amber" | "sky"
export type IconName = "scissors" | "palette" | "sparkles" | "sparkle"

// ─── Content accessors ───────────────────────────────────────────────

export const content = contentData
export const siteConfig = siteConfigData

// ─── Business data shortcuts ────────────────────────────────────────

export const business = contentData.business
export const heroSlides = contentData.hero.slides
export const stats = contentData.stats
export const services = contentData.services.categories
export const gallery = contentData.gallery
export const testimonials = contentData.testimonials
export const reasons = contentData.reasons
export const cta = contentData.cta
export const team = contentData.team
export const beforeAfter = contentData.beforeAfter
export const promotions = contentData.promotions
export const loyalty = contentData.loyalty
export const giftCards = contentData.giftCards
export const faqs = contentData.faqs

// ─── WhatsApp helpers ───────────────────────────────────────────────

export function waLink(message?: string): string {
  const msg = message ?? business.ctaMessage
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(decodeURIComponent(msg))}`
}

export function waLinkForService(serviceName: string): string {
  return waLink(`Hola! Quiero reservar ${serviceName}`)
}

export function waLinkForPromotion(promotionMessage: string): string {
  return waLink(promotionMessage)
}

// ─── Theme shortcuts ────────────────────────────────────────────────

export const theme = siteConfigData.site.theme
export const siteUrl = siteConfigData.site.url

// ─── Color maps ─────────────────────────────────────────────────────

export function getColorMap(color: ColorName): { bg: string; text: string; light: string } {
  const map: Record<ColorName, { bg: string; text: string; light: string }> = {
    rose: { bg: "bg-rose-500", text: "text-rose-500", light: "bg-rose-50" },
    violet: { bg: "bg-violet-500", text: "text-violet-500", light: "bg-violet-50" },
    amber: { bg: "bg-amber-500", text: "text-amber-500", light: "bg-amber-50" },
    sky: { bg: "bg-sky-500", text: "text-sky-500", light: "bg-sky-50" },
  }
  return map[color] ?? map.rose
}

export function getInitialsBg(color: ColorName): string {
  const map: Record<ColorName, string> = {
    rose: "bg-rose-100 text-rose-700",
    violet: "bg-violet-100 text-violet-700",
    amber: "bg-amber-100 text-amber-700",
    sky: "bg-sky-100 text-sky-700",
  }
  return map[color] ?? map.rose
}
