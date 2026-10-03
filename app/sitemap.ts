import type { MetadataRoute } from "next"
import { nav } from "@/lib/site"
import { productPagePaths } from "@/lib/productPages"

export const dynamic = "force-static"

const BASE = "https://magillgrainstore.com.au"

const legalPaths = [
  "/compliance",
  "/cookie-policy",
  "/disclaimer",
  "/privacy-policy",
  "/returns-refunds-policy",
  "/terms-and-conditions",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/"])

  for (const item of nav) {
    paths.add(item.href)
    for (const child of item.children ?? []) {
      paths.add(child.href)
    }
  }
  for (const path of productPagePaths) paths.add(path)
  for (const path of legalPaths) paths.add(path)

  return [...paths].map((path) => ({
    url: `${BASE}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }))
}
