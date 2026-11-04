import type { Metadata } from "next"
import { site } from "@/lib/site"

/** The home page's own title and description — short enough to show in full in search results. */
export const homeTitle = "Magill Grain Store | Poultry, Bird Seed, Grains & Feed"
export const homeDescription =
  "Fresh Farm Chicken and animal feed at your door step. Grains, bird feed, animal feed, fertilizers, hay and garden supplies at 574 Magill Road, Magill SA 5072."

/** The card image app/opengraph-image.tsx draws; restated because a page-level openGraph drops the layout's. */
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `${site.name} — Quality Poultry, Bird Seeds, Grains and Premium Animal feed`,
}

/**
 * A page's social-sharing tags, built from the title and description it already
 * has, so a shared link names that page rather than the whole site, and every
 * page states its own address (og:url).
 *
 * A page-level `openGraph` replaces the layout's rather than merging with it, so
 * this restates the layout's fixed fields (type, locale, site name, image) itself.
 */
export function withSocial(meta: Metadata, path: string): Metadata {
  const t = meta.title
  const title =
    typeof t === "string"
      ? `${t} | ${site.name}`
      : t && typeof t === "object" && "absolute" in t && t.absolute
        ? t.absolute
        : undefined
  const description = meta.description ?? undefined

  return {
    ...meta,
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: site.name,
      url: path,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [shareImage.url],
    },
  }
}
