import { site } from "@/lib/site"

/**
 * Extra content for product cards, keyed by the product name as the dashboard
 * stores it. Products come from the API, so the only link between a card and
 * its page is the name — matched case-insensitively so a change in
 * capitalisation in the dashboard doesn't drop the link.
 *
 * Kept free of JSX and icons: the product grid is a client component, and this
 * is all it needs to ship to the browser.
 */
export type CardExtra = {
  /** Where the whole card leads, and the label of its call to action. */
  action: { href: string; label: string; kind: "page" | "phone" }
}

const cardExtras: Record<string, CardExtra> = {
  "day old sexed chick": {
    action: { href: "/shop/livestock/day-old-chick", label: "Read more", kind: "page" },
  },
  "day old meat birds": {
    action: { href: "/shop/livestock/day-old-meat-birds", label: "Read more", kind: "page" },
  },
  pullets: {
    action: { href: "/shop/livestock/pullets", label: "Read more", kind: "page" },
  },
  // The brief's "roaster" tab: no page, just a backorder button. Card copy for
  // every product lives in the dashboard's Description field.
  "rooster available on request": {
    action: { href: site.phoneHref, label: "Can be Backordered", kind: "phone" },
  },
}

export function cardExtra(name: string): CardExtra | undefined {
  return cardExtras[name.trim().toLowerCase()]
}

/** Every product page path, for the sitemap. */
export const productPagePaths = Object.values(cardExtras)
  .filter((e) => e.action.kind === "page")
  .map((e) => e.action.href)
