import type { Metadata } from "next"
import { ProductsIndex } from "@/components/ProductsIndex"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Grain, poultry, birds, cat & dog, ruminant, rabbit, garden, fertilizers, hay and more — every range we stock.",
}

export default function ProductsPage() {
  return (
    <main className="bg-surface">
      <ProductsIndex />
    </main>
  )
}
