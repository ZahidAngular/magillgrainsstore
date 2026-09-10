import { HomeContent } from "@/components/home/HomeContent"
import { getAllProducts } from "@/lib/shop"

/**
 * Server wrapper for the home page: the body is a client component full of
 * scroll animation, so the featured products are fetched here and handed down.
 *
 * "Featured" is simply the first few products the store has ordered to the top
 * of the catalogue — sortOrder is editable in the dashboard, so the shop
 * chooses what leads the page without a code change.
 */
export default async function HomePage() {
  const products = await getAllProducts()
  const featured = products.slice(0, 6)

  return <HomeContent featured={featured} />
}
