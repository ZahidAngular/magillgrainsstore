import type { Metadata } from "next"
import { withSocial } from "@/lib/seo"
import { ProductsIndex } from "@/components/ProductsIndex"

export const metadata: Metadata = withSocial({
  title: "Products",
  description:
    "Grain, poultry, birds, cat & dog, ruminant, rabbit, garden, fertilizers, hay and more — every range we stock at Magill Grain Store in Adelaide.",
}, "/products")

export default function ProductsPage() {
  return (
    <main className="bg-surface">
      <ProductsIndex />
    </main>
  )
}
