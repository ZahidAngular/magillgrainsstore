import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/PageHero"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal"
import { getAllProducts } from "@/lib/shop"
import { megaMenus } from "@/lib/site"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Grain, poultry, birds, cat & dog, ruminant, rabbit, garden, fertilizers, hay and more — every range we stock.",
}

export default async function ProductsPage() {
  const products = await getAllProducts()

  // How many products sit in each category, counted from the API itself.
  const counts = new Map<string, number>()
  for (const p of products) counts.set(p.category, (counts.get(p.category) ?? 0) + 1)

  // Grouped the way the menu groups them, so the index and the nav agree.
  const groups = megaMenus.flatMap((menu) =>
    menu.groups.map((group) => ({
      name: group.name,
      rows: group.items.map((item) => ({
        title: item.label,
        href: item.href,
        blurb: item.blurb,
        count: counts.get(item.label) ?? 0,
      })),
    }))
  )

  return (
    <main className="bg-surface">
      <PageHero
        eyebrow="Products"
        title="Our Product Range"
        description={`${products.length} lines across every range we carry, stocked at 574 Magill Road. Prices are per bag or per unit.`}
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
                      className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-line bg-surface-2 px-6 py-6 transition duration-500 hover:-translate-y-1 hover:border-gold-400 hover:shadow-[0_24px_60px_-40px_rgba(0,19,119,0.55)]"
                    >
                      <span className="min-w-0">
                        <span className="block text-[17px] font-bold text-ink">
                          {row.title}
                        </span>
                        <span className="mt-1.5 block text-[13px] leading-relaxed text-ink-body">
                          {row.blurb}
                        </span>
                        <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                          {row.count > 0
                            ? `${row.count} ${row.count === 1 ? "line" : "lines"}`
                            : "Ask in store"}
                        </span>
                      </span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-accent-ink" />
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
