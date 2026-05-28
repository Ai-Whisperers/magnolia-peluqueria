import type { MetadataRoute } from "next"
export const dynamic = "force-static"
export default function sitemap(): MetadataRoute.Sitemap {
  const domain = "https://magnolia-peluqueria.paragu-ai.com"
  const pages = ["/", "/servicios", "/contacto", "/nosotros", "/faq", "/booking", "/privacidad", "/terminos"]
  return pages.map(page => ({
    url: `${domain}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "/" ? "weekly" : page === "/booking" ? "weekly" : "monthly",
    priority: page === "/" ? 1.0 : page === "/booking" ? 0.9 : 0.6,
  }))
}
