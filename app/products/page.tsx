import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/PageHero"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal"
import { catalog } from "@/lib/catalog"
import { birdSeed, plainSeed, poultryFeed, poultryFeeders } from "@/lib/site"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Grain, poultry, birds, cat & dog, ruminant, rabbit, garden, fertilizers, hay & mulch, Laucke flour and more.",
}

type Row = { title: string; href: string; count: number }

/**
 * The index is grouped exactly like the store's menu. The four ranges that
 * predate the catalog file still live in lib/site.ts, so they are folded in by
 * hand; everything else is read straight off the catalog.
 */
const fromCatalog = (slug: string): Row => {
  const c = catalog.find((x) => x.slug === slug)
  if (!c) throw new Error(`No catalog entry for ${slug}`)
  return { title: c.title, href: `/${c.slug}`, count: c.products.length }
}

const groups: { name: string; rows: Row[] }[] = [
  {
    name: "Grain",
    rows: [
      fromCatalog("plain-seed-1-10kg"),
      { title: "Plain Seed 20KG", href: "/plain-seed-20-kg", count: plainSeed.length },
    ],
  },
  {
    name: "Poultry",
    rows: [
      { title: "Poultry Feed", href: "/poultry-feed", count: poultryFeed.length },
      { title: "Poultry Feeders", href: "/poultry-feeders", count: poultryFeeders.length },
      fromCatalog("poultry-medicine"),
    ],
  },
  {
    name: "Birds",
    rows: [
      { title: "Bird Seed 1KG-10KG", href: "/bird-seed-1-10kg", count: birdSeed.length },
      fromCatalog("bird-seed-20kg"),
      fromCatalog("passwell-wambaroo-and-vitafarm"),
    ],
  },
  {
    name: "Cat & Dog",
    rows: [fromCatalog("litter"), fromCatalog("food")],
  },
  {
    name: "Ruminant",
    rows: [
      fromCatalog("horse"),
      fromCatalog("cattle"),
      fromCatalog("goat"),
      fromCatalog("ruminant-medicine"),
    ],
  },
  {
    name: "Fertilizers",
    rows: [fromCatalog("fertilizers-1-10kg"), fromCatalog("fertilizers-20-25kg")],
  },
  {
    name: "Others",
    rows: [
      fromCatalog("rabbit-supplies"),
      { title: "Garden Products", href: "/garden-supplies", count: 0 },
      fromCatalog("hay-mulch"),
      fromCatalog("laucke-flour"),
      fromCatalog("pig"),
      fromCatalog("rat-mouse"),
      fromCatalog("kangaroo"),
    ],
  },
]

const total = groups.reduce(
  (n, g) => n + g.rows.reduce((m, r) => m + r.count, 0),
  0
)

export default function ProductsPage() {
  return (
    <main className="bg-surface">
      <PageHero
        eyebrow="Products"
        title="Our Product Range"
        description={`${total} lines across every range we carry, stocked at 574 Magill Road. Prices are per bag or per unit.`}
      />

      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-16 px-6">
          {groups.map((group) => (
            <div key={group.name}>
              <Reveal from="up">
                <span className="flex items-center gap-3">
                  <span className="h-px w-10 rule-gold" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
                    {group.name}
                  </h2>
                </span>
              </Reveal>

              <Stagger className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.rows.map((row) => (
                  <StaggerItem key={row.href}>
                    <Link
                      href={row.href}
                      className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-line bg-surface-2 px-6 py-6 transition duration-500 hover:-translate-y-1 hover:border-gold-400 hover:shadow-[0_24px_60px_-40px_rgba(0,19,119,0.55)]"
                    >
                      <span className="min-w-0">
                        <span className="block text-[17px] font-bold text-ink">
                          {row.title}
                        </span>
                        <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                          {row.count > 0
                            ? `${row.count} ${row.count === 1 ? "line" : "lines"}`
                            : "Ask in store"}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-accent-ink" />
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
