import type { ReactNode } from "react"
import Link from "next/link"
import {
  Layers,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Snowflake,
  Sprout,
  Truck,
  Wheat,
} from "lucide-react"
import { site } from "@/lib/site"
import type { Block, Faq } from "@/lib/livestock"

/*
 * The Grains category page (/shop/grains) — the "grain page" tab of the
 * client's "category" Google Doc, copied as written. Do not paraphrase; edit
 * the doc first, then mirror it here.
 */

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-bold text-accent-ink underline decoration-gold-400 underline-offset-4 hover:decoration-2"
    >
      {children}
    </Link>
  )
}

function Tel() {
  return (
    <a href={site.phoneHref} className="font-extrabold text-gold-400 hover:underline">
      (08) 8331 8159
    </a>
  )
}

export const grainsCategory = {
  metaTitle: "Buy Grain Online | Grain Store Magill SA | Magill Grain Store",
  metaDescription:
    "Buy quality grain in Magill, SA lupins, barley, wheat & maize, 1kg to 20kg. Fresh grain from Australian growers. Local delivery. Call (08) 8331 8159.",
  h1: "Buy Grain Online | Lupins, Barley, Wheat & Maize | Magill Grain Store",
  intro: {
    title: "Quality Grain for Poultry, Livestock & Backyard Flocks",
    paragraphs: [
      <>
        At Magill Grain Store, our grain range is the backbone of what we
        sell. We stock lupins, barley, wheat and maize the four grains South
        Australian poultry keepers, small acreage owners and{" "}
        <A href="/shop/livestock">livestock</A> farmers rely on most in bag
        sizes from 1kg right up to 20kg.
      </>,
      <>
        Every grain we sell is sourced directly from Australian growers and
        checked for freshness before it goes on the shelf. Whether
        you&apos;re feeding six backyard hens or supplementing a paddock of
        cattle, we&apos;ll help you work out which grain and which bag size
        actually suits what you keep.
      </>,
    ],
  },
  rangeTitle: "Our Grain Range",
  types: {
    items: [
      {
        icon: Sprout,
        title: "Lupins",
        body: (
          <>
            A high protein grain widely used as a supplementary feed for
            poultry and livestock, popular with backyard flock keepers across
            Adelaide.
          </>
        ),
      },
      {
        icon: Layers,
        title: "Barley",
        body: (
          <>
            A versatile grain used for poultry, cattle and horses, often mixed
            into feed rations for extra energy and bulk.
          </>
        ),
      },
      {
        icon: Wheat,
        title: "Wheat",
        body: (
          <>
            One of the most commonly fed grains for backyard chickens and
            mixed flocks, offering a good energy source when combined with
            pellets.
          </>
        ),
      },
      {
        icon: Snowflake,
        title: "Maize",
        body: (
          <>
            A high energy grain favoured for poultry and livestock feed,
            especially useful during colder months when animals need extra
            calories.
          </>
        ),
      },
    ] satisfies Block[],
  },
  sizes: {
    title: "Grain Bag Sizes From 1kg to 20kg",
    paragraphs: [
      <>
        We know one size doesn&apos;t fit every backyard or farm. Our grain is
        available in a full range of bag sizes 1kg for a small trial batch,
        right through to 20kg for regular feeding so you&apos;re not paying
        for more grain than you&apos;ll use, or running back to the store
        every week.
      </>,
    ],
  },
  reasons: {
    title: "Why Buy Grain From Magill Grain Store?",
    items: [
      {
        icon: MapPin,
        title: "Sourced Directly From Australian Growers",
        body: (
          <>
            We buy our grain straight from local growers, cutting out extra
            middlemen so you get fresher grain at a fairer price.
          </>
        ),
      },
      {
        icon: ShieldCheck,
        title: "Freshness Checked Before Sale",
        body: (
          <>
            Every batch of grain is checked for quality and freshness before
            it reaches our shelves and yours.
          </>
        ),
      },
      {
        icon: PhoneCall,
        title: "Local Advice on Which Grain to Choose",
        body: (
          <>
            Not sure whether your flock needs barley, wheat or a mix? Call us
            on <Tel />{" "}
            we&apos;ll help you choose the right grain for what you keep.
          </>
        ),
      },
      {
        icon: Truck,
        title: "Doorstep Delivery Across Eastern Adelaide",
        body: (
          <>
            Heavy grain bags delivered to your door across Adelaide&apos;s
            eastern suburbs no lifting 20kg bags into the car.
          </>
        ),
      },
    ] satisfies Block[],
  },
  faqTitle: "Frequently Asked Questions About Buying Grain",
  faqs: [
    {
      q: "What grain is best for backyard chickens?",
      a: "Wheat and barley are the most commonly fed grains for backyard chickens, usually given alongside a layer pellet to balance their diet. Lupins are also a good high protein supplement.",
    },
    {
      q: "How much grain should I feed my chickens per day?",
      a: "Grain should generally make up no more than 10–20% of a chicken's diet, with the rest coming from a complete pellet feed. Ask our team in-store for guidance based on your flock size.",
    },
    {
      q: "What's the difference between lupins, barley, wheat and maize?",
      a: "Lupins are high in protein, barley is a versatile energy source, wheat is the most common all-round grain, and maize is high energy useful in colder months. Most flocks do well on a mix rather than a single grain.",
    },
    {
      q: "What bag sizes does Magill Grain Store offer for grain?",
      a: "Our grain is available from 1kg up to 20kg bags, so you can buy a small amount to trial or stock up in bulk.",
    },
    {
      q: "Do you deliver grain in Adelaide?",
      a: "Yes, we deliver grain and other feed products across Adelaide's eastern suburbs. Call (08) 8331 8159 to check delivery to your area.",
    },
    {
      q: "Can grain be fed to animals other than poultry?",
      a: "Yes. Barley, wheat and maize are also commonly fed to cattle and horses, usually as part of a mixed ration alongside hay and other feed.",
    },
  ] satisfies Faq[],
  /** The doc's "Example combined JSON-LD" — CollectionPage + Breadcrumb, copied as written. */
  collectionSchema: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Grains",
    description:
      "Buy quality grain in Magill, SA lupins, barley, wheat and maize, 1kg to 20kg.",
    url: "https://magillgrainstore.com.au/shop/grains",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://magillgrainstore.com.au/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Grains",
          item: "https://magillgrainstore.com.au/shop/grains",
        },
      ],
    },
  },
  /** The doc's "FAQPage schema" example — one question, copied as written. */
  faqSchema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What grain is best for backyard chickens?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wheat and barley are the most commonly fed grains for backyard chickens, usually given alongside a layer pellet to balance their diet.",
        },
      },
    ],
  },
}
