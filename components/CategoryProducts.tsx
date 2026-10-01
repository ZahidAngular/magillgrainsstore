"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { ProductGrid } from "@/components/ProductGrid"
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton"
import { EnquiryPanel } from "@/components/EnquiryPanel"
import { categoryProductListSchema, getProductsByCategory, type Product } from "@/lib/shop"

/**
 * Fetches this category's products in the browser, after the static page has
 * loaded — so a price edited in the dashboard shows up on next page load even
 * though the HTML itself is a static file with no server behind it.
 */
export function CategoryProducts({
  category,
  heading,
}: {
  category: string
  /** Optional copy above the grid, for a category with its own SEO brief. */
  heading?: ReactNode
}) {
  const [products, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    let active = true
    getProductsByCategory(category).then((data) => {
      if (active) setProducts(data)
    })
    return () => {
      active = false
    }
  }, [category])

  if (products === null) {
    return (
      <section className="bg-surface-2 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {heading}
          <ProductGridSkeleton />
        </div>
      </section>
    )
  }

  return products.length > 0 ? (
    <section className="bg-surface-2 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categoryProductListSchema(products, category)),
        }}
      />
      <div className="mx-auto max-w-7xl px-6">
        {heading}
        <ProductGrid products={products} />
      </div>
    </section>
  ) : (
    <EnquiryPanel category={category.toLowerCase()} />
  )
}
