import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageHero } from "@/components/PageHero"
import { ProductGrid } from "@/components/ProductGrid"
import { EnquiryPanel } from "@/components/EnquiryPanel"
import {
  categoryFromSlug,
  getCategories,
  getProductsByCategory,
  toSlug,
} from "@/lib/shop"

/**
 * One route for every category in the API. The pages differ only in their
 * heading and product list, so they share this template — and because the
 * categories come from the API, adding one in the dashboard publishes a page
 * without a code change.
 */

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((c) => ({ slug: toSlug(c) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await categoryFromSlug(slug)
  if (!category) return {}
  return {
    title: category,
    description: `${category} at Magill Grain Store, 574 Magill Road, Magill SA 5072.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await categoryFromSlug(slug)
  if (!category) notFound()

  const products = await getProductsByCategory(category)

  return (
    <main className="bg-surface">
      <PageHero eyebrow={category} title={category} />

      {products.length > 0 ? (
        <section className="bg-surface-2 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <ProductGrid products={products} />
          </div>
        </section>
      ) : (
        <EnquiryPanel category={category.toLowerCase()} />
      )}
    </main>
  )
}
