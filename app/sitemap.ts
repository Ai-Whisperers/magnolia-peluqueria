import type { MetadataRoute } from "next"
export const dynamic = "force-static"
export default function sitemap(): MetadataRoute.Sitemap {
  const domain = "https://magnolia-peluqueria.paragu-ai.com"
  const staticPages = [
    { path: "/", priority: 1.0, freq: "weekly" as const },
    { path: "/servicios", priority: 0.9, freq: "monthly" as const },
    { path: "/contacto", priority: 0.6, freq: "monthly" as const },
    { path: "/nosotros", priority: 0.6, freq: "monthly" as const },
    { path: "/faq", priority: 0.6, freq: "monthly" as const },
    { path: "/booking", priority: 0.9, freq: "weekly" as const },
    { path: "/privacidad", priority: 0.3, freq: "yearly" as const },
    { path: "/terminos", priority: 0.3, freq: "yearly" as const },
  ]
  // ── Blog post slugs from JSON content ──────────────────────────────
  const { getPosts } = require("@/lib/blog")
  const posts = getPosts("es").concat(getPosts("en"))
  const blogPages = posts.map((p: { slug: string; updatedAt?: string; publishedAt?: string }) => ({
    url: `${domain}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt ?? Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
  const staticSitemap = staticPages.map(({ path, priority, freq }) => ({
    url: `${domain}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }))
  return [...staticSitemap, ...blogPages]
}
