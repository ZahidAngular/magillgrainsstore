import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { PageHero } from "@/components/PageHero"
import { CategoryProducts } from "@/components/CategoryProducts"
import { categoryFromSlug, getCategories, toSlug } from "@/lib/shop"
import { livestockCategory, roosterSchema } from "@/lib/livestock"
import { LivestockCategoryDetails, LivestockCategoryIntro } from "@/components/livestock/category"
import { grainsCategory } from "@/lib/grains"
import {
  GrainsCategoryDetails,
  GrainsCategoryIntro,
  GrainsRangeHeading,
} from "@/components/grains/category"
import { plainSeedCategory } from "@/lib/plainSeed"
import {
  PlainSeedCategoryDetails,
  PlainSeedCategoryIntro,
  PlainSeedRangeHeading,
} from "@/components/plain-seed/category"
import { gritCategory } from "@/lib/grit"
import { GritCategoryDetails, GritCategoryIntro, GritRangeHeading } from "@/components/grit/category"
import { poultryFeedCategory } from "@/lib/poultryFeed"
import {
  PoultryFeedCategoryDetails,
  PoultryFeedCategoryIntro,
  PoultryFeedRangeHeading,
} from "@/components/poultry-feed/category"
import { poultryFeedersCategory } from "@/lib/poultryFeeders"
import {
  PoultryFeedersCategoryDetails,
  PoultryFeedersCategoryIntro,
  PoultryFeedersRangeHeading,
} from "@/components/poultry-feeders/category"

/**
 * One route for every category in the API. The pages differ only in their
 * heading and product list, so they share this template — and because the
 * categories come from the API, adding one in the dashboard publishes a page
 * without a code change.
 *
 * Livestock, Grains, Plain Seed, Grit, Poultry Feed and Poultry Feeders are
 * the exceptions so far: each gets its own title, H1 and copy around the
 * product list — the first four from the client's SEO brief, the two Poultry
 * pages written in-house in the same voice since no brief covers them.
 */

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((c) => ({ slug: toSlug(c) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await categoryFromSlug(slug)
  if (!category) return {}
  if (slug === "livestock")
    return {
      title: { absolute: livestockCategory.metaTitle },
      description: livestockCategory.metaDescription,
      alternates: { canonical: "/shop/livestock" },
    }
  if (slug === "grains")
    return {
      title: { absolute: grainsCategory.metaTitle },
      description: grainsCategory.metaDescription,
      alternates: { canonical: "/shop/grains" },
    }
  if (slug === "plain-seed")
    return {
      title: { absolute: plainSeedCategory.metaTitle },
      description: plainSeedCategory.metaDescription,
      alternates: { canonical: "/shop/plain-seed" },
    }
  if (slug === "grit")
    return {
      title: { absolute: gritCategory.metaTitle },
      description: gritCategory.metaDescription,
      alternates: { canonical: "/shop/grit" },
    }
  if (slug === "poultry-feed")
    return {
      title: { absolute: poultryFeedCategory.metaTitle },
      description: poultryFeedCategory.metaDescription,
      alternates: { canonical: "/shop/poultry-feed" },
    }
  if (slug === "poultry-feeders")
    return {
      title: { absolute: poultryFeedersCategory.metaTitle },
      description: poultryFeedersCategory.metaDescription,
      alternates: { canonical: "/shop/poultry-feeders" },
    }
  return {
    title: category,
    description: `${category} at Magill Grain Store, 574 Magill Road, Magill SA 5072.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await categoryFromSlug(slug)
  if (!category) notFound()
  const isLivestock = slug === "livestock"
  const isGrains = slug === "grains"
  const isPlainSeed = slug === "plain-seed"
  const isGrit = slug === "grit"
  const isPoultryFeed = slug === "poultry-feed"
  const isPoultryFeeders = slug === "poultry-feeders"

  const heroTitle = isLivestock
    ? livestockCategory.h1
    : isGrains
      ? grainsCategory.h1
      : isPlainSeed
        ? plainSeedCategory.h1
        : isGrit
          ? gritCategory.h1
          : isPoultryFeed
            ? poultryFeedCategory.h1
            : isPoultryFeeders
              ? poultryFeedersCategory.h1
              : category

  return (
    <main className="bg-surface">
      {isLivestock && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(roosterSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      {isGrains && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(grainsCategory.collectionSchema).replace(/</g, "\\u003c"),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(grainsCategory.faqSchema).replace(/</g, "\\u003c"),
            }}
          />
        </>
      )}
      {isPlainSeed && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(plainSeedCategory.collectionSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      {isGrit && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(gritCategory.collectionSchema).replace(/</g, "\\u003c"),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(gritCategory.faqSchema).replace(/</g, "\\u003c"),
            }}
          />
        </>
      )}
      {isPoultryFeed && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(poultryFeedCategory.collectionSchema).replace(/</g, "\\u003c"),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(poultryFeedCategory.faqSchema).replace(/</g, "\\u003c"),
            }}
          />
        </>
      )}
      {isPoultryFeeders && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(poultryFeedersCategory.collectionSchema).replace(/</g, "\\u003c"),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(poultryFeedersCategory.faqSchema).replace(/</g, "\\u003c"),
            }}
          />
        </>
      )}
      <PageHero eyebrow={category} title={heroTitle} />
      {isLivestock && <LivestockCategoryIntro />}
      {isGrains && <GrainsCategoryIntro />}
      {isPlainSeed && <PlainSeedCategoryIntro />}
      {isGrit && <GritCategoryIntro />}
      {isPoultryFeed && <PoultryFeedCategoryIntro />}
      {isPoultryFeeders && <PoultryFeedersCategoryIntro />}
      <Suspense fallback={null}>
        <CategoryProducts
          category={category}
          heading={
            isGrains ? (
              <GrainsRangeHeading />
            ) : isPlainSeed ? (
              <PlainSeedRangeHeading />
            ) : isGrit ? (
              <GritRangeHeading />
            ) : isPoultryFeed ? (
              <PoultryFeedRangeHeading />
            ) : isPoultryFeeders ? (
              <PoultryFeedersRangeHeading />
            ) : undefined
          }
        />
      </Suspense>
      {isLivestock && <LivestockCategoryDetails />}
      {isGrains && <GrainsCategoryDetails />}
      {isPlainSeed && <PlainSeedCategoryDetails />}
      {isGrit && <GritCategoryDetails />}
      {isPoultryFeed && <PoultryFeedCategoryDetails />}
      {isPoultryFeeders && <PoultryFeedersCategoryDetails />}
    </main>
  )
}
