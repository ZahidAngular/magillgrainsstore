import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/PageHero"
import { Stagger, StaggerItem } from "@/components/motion/Reveal"
import { birdSeed, plainSeed, poultryFeed, poultryFeeders } from "@/lib/site"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our full range: plain seed, poultry feed, poultry feeders, bird seed, rabbit supplies and garden supplies.",
}

const categories = [
  {
    title: "Plain Seed 20 KG",
    href: "/plain-seed-20-kg",
    count: plainSeed.length,
    image: "/images/site/animal-feed.jpg",
    blurb: "Wheat, barley, maize, millets, sunflower and more — bagged at 20KG.",
  },
  {
    title: "Poultry Feed",
    href: "/poultry-feed",
    count: poultryFeed.length,
    image: "/images/products/home-lay-pellet.jpg",
    blurb: "Starters, growers, layers and finishers for every stage of the flock.",
  },
  {
    title: "Poultry Feeders",
    href: "/poultry-feeders",
    count: poultryFeeders.length,
    image: "/images/site/poultry-feeders.jpg",
    blurb: "Yellow base feeders and red base drinkers from 1L to 12KG.",
  },
  {
    title: "Bird Seed 1 – 10KG",
    href: "/bird-seed-1-10kg",
    count: birdSeed.length,
    image: "/images/site/birds.jpg",
    blurb: "Small-pack budgie and companion bird mixes.",
  },
  {
    title: "Rabbit Supplies",
    href: "/rabbit-supplies",
    count: 0,
    image: "/images/site/cats.jpg",
    blurb: "Pellets, hay and bedding — call the store for current stock.",
  },
  {
    title: "Garden Supplies",
    href: "/garden-supplies",
    count: 0,
    image: "/images/site/dog-breeds.jpg",
    blurb: "Fertilizers, hay and mulch for the home garden and small acreage.",
  },
]

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Products"
        title="Our Product Range"
        description="Grains, feed, feeders and supplies stocked daily at 574 Magill Road. Prices are listed per bag or per unit."
      />

      <section className="bg-surface-2 py-20 md:py-28">
        <Stagger className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <StaggerItem key={cat.href}>
              <Link
                href={cat.href}
                className="group block h-full overflow-hidden rounded-2xl border border-line bg-surface-2 transition duration-500 hover:-translate-y-2 hover:border-gold-400/60 hover:shadow-[0_30px_70px_-38px_rgba(0,19,119,0.6)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-3">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy-950/0 transition duration-500 group-hover:bg-navy-950/20" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-extrabold text-ink">
                      {cat.title}
                    </h2>
                    {cat.count > 0 && (
                      <span className="rounded-full bg-surface-3 px-3 py-1 text-xs font-bold text-ink">
                        {cat.count} items
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-body">
                    {cat.blurb}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-muted transition group-hover:text-ink">
                    View range
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </main>
  )
}
