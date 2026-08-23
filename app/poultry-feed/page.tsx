import type { Metadata } from "next"
import { PageHero } from "@/components/PageHero"
import { ProductGrid } from "@/components/ProductGrid"
import { poultryFeed } from "@/lib/site"

export const metadata: Metadata = {
  title: "Poultry Feed",
  description:
    "Starter, grower, layer and finisher poultry feed including Red Hen, Gamebird, Meatline and Home-Lay ranges.",
}

export default function PoultryFeedPage() {
  return (
    <main>
      <PageHero
        eyebrow="Poultry Feed"
        title="Poultry Feed"
        description="Complete feed for every stage — chick starter through to layer and finisher pellets."
      />
      <section className="bg-surface-2 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ProductGrid products={poultryFeed} />
        </div>
      </section>
    </main>
  )
}
