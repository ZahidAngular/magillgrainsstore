import { API_BASE, SITE_NAME, type Product } from "@/lib/api"

/**
 * Server-side reads of the shop catalogue.
 *
 * These run on the server, so they call the API directly rather than going
 * through lib/api's browser client — no token is involved, the product list is
 * public and always scoped by site name.
 *
 * Nothing is cached: the point of moving the catalogue onto the API is that a
 * price edited in the dashboard shows on the site immediately.
 */

export type { Product }

/** URL segment for a category, e.g. "Cattle & Horse" -> "cattle-horse". */
export function toSlug(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

type ApiResponse<T> = { success: boolean; message: string; data: T | null }
type Paged<T> = { items: T[]; totalCount: number }

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}/api${path}`, { cache: "no-store" })
    if (!res.ok) return null
    const body = (await res.json()) as ApiResponse<T>
    return body.data
  } catch {
    // The site must still render if the API is down; callers fall back to empty.
    return null
  }
}

export async function getCategories(): Promise<string[]> {
  return (
    (await get<string[]>(`/products/categories?siteName=${encodeURIComponent(SITE_NAME)}`)) ?? []
  )
}

/** Every product on the site. The catalogue is a few hundred lines, so one call is enough. */
export async function getAllProducts(): Promise<Product[]> {
  const page = await get<Paged<Product>>(
    `/products?siteName=${encodeURIComponent(SITE_NAME)}&page=1&pageSize=100`
  )
  if (!page) return []

  const products = [...page.items]
  // pageSize is capped at 100 server-side, so walk the remaining pages.
  const pages = Math.ceil(page.totalCount / 100)
  for (let p = 2; p <= pages; p++) {
    const next = await get<Paged<Product>>(
      `/products?siteName=${encodeURIComponent(SITE_NAME)}&page=${p}&pageSize=100`
    )
    if (next) products.push(...next.items)
  }
  return products
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const page = await get<Paged<Product>>(
    `/products?siteName=${encodeURIComponent(SITE_NAME)}&category=${encodeURIComponent(category)}&pageSize=100`
  )
  return page?.items ?? []
}

/** Resolves a URL slug back to the category name the API stores. */
export async function categoryFromSlug(slug: string): Promise<string | null> {
  const categories = await getCategories()
  return categories.find((c) => toSlug(c) === slug) ?? null
}

/** How a product's price reads on the site: its sizes, or the store's wording. */
export function priceLines(product: Product): string[] {
  if (product.sizes.length > 0)
    return product.sizes.map((s) =>
      s.size ? `${s.size} — $${s.price.toFixed(2)}` : `$${s.price.toFixed(2)}`
    )
  return product.priceNote ? [product.priceNote] : []
}
