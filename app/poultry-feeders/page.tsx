import type { Metadata } from "next"
import { PageHero } from "@/components/PageHero"
import { ProductGrid } from "@/components/ProductGrid"
import { poultryFeeders } from "@/lib/site"

export const metadata: Metadata = {
  title: "Poultry Feeders",
  description:
    "Yellow base feeders from 2KG to 12KG and red base drinkers from 1L to 12L.",
}

export default function PoultryFeedersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Poultry Feeders"
        title="Poultry Feeders"
        description="Durable feeders and drinkers sized for backyard coops through to commercial sheds."
      />
      <section className="bg-surface-2 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ProductGrid products={poultryFeeders} />
        </div>
      </section>
    </main>
  )
}
