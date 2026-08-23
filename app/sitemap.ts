import type { MetadataRoute } from "next"
import { nav } from "@/lib/site"

const BASE = "https://magillgrainsstore.com.au"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/"])

  for (const item of nav) {
    paths.add(item.href)
    for (const child of item.children ?? []) {
      paths.add(child.href)
    }
  }

  return [...paths].map((path) => ({
    url: `${BASE}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }))
}
