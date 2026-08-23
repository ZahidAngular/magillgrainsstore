import type { Metadata } from "next"
import { PageHero } from "@/components/PageHero"
import { ProductGrid } from "@/components/ProductGrid"
import { plainSeed } from "@/lib/site"

export const metadata: Metadata = {
  title: "Plain Seed 20 KG",
  description:
    "Wheat, barley, oats, maize, millets, sunflower, safflower, canola and more — all in 20KG bags.",
}

export default function PlainSeedPage() {
  return (
    <main>
      <PageHero
        eyebrow="Plain Seed 20 KG"
        title="Plain Seed 20 KG"
        description="Single-variety grain and seed, bagged at 20KG. Call the store for current pricing on lines marked Call For Price."
      />
      <section className="bg-surface-2 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ProductGrid products={plainSeed} />
        </div>
      </section>
    </main>
  )
}
