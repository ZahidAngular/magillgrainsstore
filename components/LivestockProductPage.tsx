import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BadgeCheck, Clock, MapPin, Phone, PhoneCall } from "lucide-react"
import { PageHero } from "@/components/PageHero"
import { Reveal } from "@/components/motion/Reveal"
import {
  FaqSection,
  FeatureCards,
  ProseSection,
  ReasonsBand,
  SectionHeading,
} from "@/components/livestock/sections"
import type { LivestockContent } from "@/lib/livestock"
import { getProductsByCategory } from "@/lib/shop"
import { site } from "@/lib/site"

const SITE_URL = "https://magillgrainstore.com.au"
const CATEGORY = { label: "Livestock", href: "/shop/livestock" }

export function livestockMetadata(page: LivestockContent): Metadata {
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: page.path },
  }
}

/** The brief's three schemas; the price is read from the dashboard at build time. */
async function schemas(page: LivestockContent) {
  const url = `${SITE_URL}${page.path}`
  const products = await getProductsByCategory("Livestock")
  const product = products.find(
    (p) => p.name.trim().toLowerCase() === page.productName.toLowerCase()
  )
  const price = product?.sizes.find((s) => s.price > 0)?.price

  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: page.name,
      description: page.schema.description,
      url,
      brand: { "@type": "Brand", name: "Magill Grain Store" },
      category: "Livestock",
      // An Offer without a price is invalid, so it's left out rather than guessed.
      ...(price
        ? {
            offers: {
              "@type": "Offer",
              priceCurrency: "AUD",
              price: price.toFixed(2),
              availability: "https://schema.org/InStock",
              url,
              seller: {
                "@type": "LocalBusiness",
                name: "Magill Grain Store",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "574 Magill Road",
                  addressLocality: "Magill",
                  addressRegion: "SA",
                  postalCode: "5072",
                  addressCountry: "AU",
                },
              },
            },
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Livestock", item: `${SITE_URL}/shop/livestock` },
        { "@type": "ListItem", position: 3, name: page.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.schema.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ]
}

export async function LivestockProductPage({ page }: { page: LivestockContent }) {
  const jsonLd = await schemas(page)

  return (
    <main className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageHero parent={CATEGORY} eyebrow={page.name} title={page.h1} />

      {/* Intro — with the store's contact card alongside */}
      <section className="bg-surface-2 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
          <Reveal from="right" className="lg:col-span-7">
            <SectionHeading>{page.intro.title}</SectionHeading>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-ink-body md:text-[17px]">
              {page.intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal from="left" delay={0.1} className="lg:col-span-5">
            <aside className="rounded-3xl border border-line bg-surface-3 p-8 lg:sticky lg:top-32">
              <ul className="space-y-5 text-sm">
                <li className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-400/15 text-gold-500">
                    <Phone className="h-4 w-4" />
                  </span>
                  <a href={site.phoneHref} className="self-center text-lg font-extrabold text-ink transition hover:text-accent-ink">
                    {site.phone}
                  </a>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-400/15 text-gold-500">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <a href={site.mapUrl} target="_blank" rel="noreferrer" className="self-center font-semibold text-ink-body transition hover:text-ink">
                    {site.address}
                  </a>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-400/15 text-gold-500">
                    <Clock className="h-4 w-4" />
                  </span>
                  <dl className="grid flex-1 gap-1.5 self-center">
                    {site.hours.map((h) => (
                      <div key={h.day} className="flex justify-between gap-3">
                        <dt className="font-semibold text-ink-body">{h.day}</dt>
                        <dd className="text-right font-bold text-ink">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              </ul>

              <a
                href={site.phoneHref}
                className="mt-8 flex items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-navy-700"
              >
                <PhoneCall className="h-4 w-4 text-gold-400" />
                Call {site.phone}
              </a>
              <Link
                href={CATEGORY.href}
                className="group mt-3 flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-xs font-extrabold uppercase tracking-wide text-ink transition hover:border-gold-400"
              >
                <ArrowLeft className="h-4 w-4 text-gold-500 transition-transform group-hover:-translate-x-1" />
                Back to Livestock
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      <ProseSection
        title={page.compare.title}
        paragraphs={page.compare.paragraphs}
        aside={
          page.compare.note && (
            <div className="flex h-full gap-4 rounded-2xl border border-gold-400/50 bg-gold-400/10 p-8">
              <BadgeCheck className="mt-0.5 h-6 w-6 shrink-0 text-gold-500" />
              <p className="text-base leading-relaxed text-ink md:text-[17px]">{page.compare.note}</p>
            </div>
          )
        }
      />
      <FeatureCards title={page.care.title} items={page.care.items} />
      <ReasonsBand title={page.reasons.title} items={page.reasons.items} />
      <FaqSection faqs={page.faqs} back={{ label: "Back to Livestock", href: CATEGORY.href }} />
    </main>
  )
}
