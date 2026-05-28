import postsEsData from "@/content/blog/posts-es.json"
import postsEnData from "@/content/blog/posts-en.json"

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  tags: string[]
  image: string
  content: string
}

export const READING_TIME_WPM = 200

const allPosts: Record<"es" | "en", BlogPost[]> = {
  es: postsEsData.posts as BlogPost[],
  en: postsEnData.posts as BlogPost[],
}

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / READING_TIME_WPM))
}

export function getAllPosts(lang: "es" | "en"): BlogPost[] {
  return allPosts[lang] ?? allPosts.es
}

export function getPostBySlug(slug: string, lang: "es" | "en"): BlogPost | undefined {
  return getAllPosts(lang).find((p) => p.slug === slug)
}

export function getRelatedPosts(slug: string, category: string, lang: "es" | "en"): BlogPost[] {
  return getAllPosts(lang).filter((p) => p.slug !== slug && p.category === category).slice(0, 3)
}
