import type { Metadata } from "next"
import { PageHero } from "@/components/PageHero"
import { ProductGrid } from "@/components/ProductGrid"
import { birdSeed } from "@/lib/site"

export const metadata: Metadata = {
  title: "Bird Seed 1 – 10KG",
  description: "Budgie and companion bird seed mixes in small 1KG to 10KG packs.",
}

export default function BirdSeedPage() {
  return (
    <main>
      <PageHero
        eyebrow="Bird Seed 1 – 10KG"
        title="Bird Seed 1 – 10KG"
        description="Small-pack seed mixes for budgies and companion birds."
      />
      <section className="bg-surface-2 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ProductGrid products={birdSeed} />
        </div>
      </section>
    </main>
  )
}
