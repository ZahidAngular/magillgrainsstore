import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageHero } from "@/components/PageHero"
import { ProductGrid } from "@/components/ProductGrid"
import { EnquiryPanel } from "@/components/EnquiryPanel"
import { Reveal } from "@/components/motion/Reveal"
import { catalog, categoryBySlug } from "@/lib/catalog"

/**
 * One route for every category carried over from the store's own site. The
 * pages differ only in their copy and product list, so they share a template
 * rather than repeating the same JSX eighteen times.
 *
 * Several categories are genuinely empty on the source site (Goat, Pig,
 * Kangaroo, the medicine pages). They still get a page — the nav links to
 * them — and fall back to the enquiry panel instead of an empty grid.
 */

export function generateStaticParams() {
  return catalog.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cat = categoryBySlug.get(slug)
  if (!cat) return {}
  return {
    title: cat.title,
    description:
      cat.intro[0]?.slice(0, 160) ??
      `${cat.title} at Magill Grain Store, 574 Magill Road, Magill SA 5072.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cat = categoryBySlug.get(slug)
  if (!cat) notFound()

  return (
    <main className="bg-surface">
      <PageHero eyebrow={cat.title} title={cat.title} />

      {cat.intro.length > 0 && (
        <section className="bg-surface py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal from="up">
              <span className="block h-px w-10 rule-gold" />
            </Reveal>
            {cat.intro.map((para, i) => (
              <Reveal key={i} from="up" delay={0.08 * (i + 1)}>
                <p className="mt-7 text-[17px] leading-relaxed text-ink-body">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {cat.products.length > 0 ? (
        <section className="bg-surface-2 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <ProductGrid products={cat.products} />
          </div>
        </section>
      ) : (
        <EnquiryPanel category={cat.title.toLowerCase()} />
      )}
    </main>
  )
}
