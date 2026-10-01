import type { ReactNode } from "react"
import Link from "next/link"
import {
  Boxes,
  Container,
  Droplets,
  GlassWater,
  MapPin,
  PhoneCall,
  Ruler,
  Umbrella,
  Wheat,
} from "lucide-react"
import { site } from "@/lib/site"
import type { Block, Faq } from "@/lib/livestock"

/*
 * The Poultry Feeders category page (/shop/poultry-feeders). No client brief
 * exists for this one, so the copy is written in-house in the same structure
 * as the briefed pages. Facts only: the sizes are the dashboard's own range
 * (yellow base feeders 2–12KG, red base drinkers 1–12L, drinkers priced on
 * request). Prices are left to the cards, which read them live.
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

/** Links inside the navy "why buy" band, where the page's accent gold reads. */
function NavyA({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-bold text-gold-400 underline decoration-gold-400/50 underline-offset-4 hover:decoration-gold-400">
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

const faqs: Faq[] = [
  {
    q: "What sizes of poultry feeders do you sell?",
    a: "Our yellow base poultry feeders come in 2KG, 4KG, 7KG, 9KG and 12KG sizes.",
  },
  {
    q: "What sizes of poultry drinkers do you sell?",
    a: "Our red base poultry drinkers come in 1L, 2L, 4L, 6L, 8L and 12L sizes.",
  },
  {
    q: "How much do your poultry drinkers cost?",
    a: "Drinker prices can change, so call (08) 8331 8159 for current pricing on each size.",
  },
  {
    q: "Which feeder size should I choose?",
    a: "It depends on how many birds you keep and how often you want to refill. Smaller sizes suit chicks and small flocks, and larger sizes suit bigger flocks. Our team can help you choose.",
  },
  {
    q: "Do you sell poultry feed as well?",
    a: "Yes. We stock starter, grower, layer and finisher feeds, plus grit and shellgrit, so you can buy your feeder and feed together.",
  },
  {
    q: "How often should I clean my poultry drinker?",
    a: "Check drinkers every day and rinse them out regularly. Clean water helps keep your flock healthy.",
  },
  {
    q: "Are all sizes always in stock?",
    a: "Stock can change, so call (08) 8331 8159 to confirm the size you need is available before visiting.",
  },
  {
    q: "Where can I buy poultry feeders near Adelaide?",
    a: "Magill Grain Store is at 574 Magill Road, Magill SA 5072, in Adelaide's eastern suburbs. Call (08) 8331 8159 for current stock.",
  },
]

export const poultryFeedersCategory = {
  metaTitle: "Poultry Feeders & Drinkers | Chicken Feeders | Magill SA",
  metaDescription:
    "Buy poultry feeders and drinkers in Magill, SA. Yellow base feeders from 2KG to 12KG and red base drinkers from 1L to 12L. Call (08) 8331 8159.",
  h1: "Poultry Feeders & Drinkers | Yellow Base Feeders & Red Base Drinkers | Magill Grain Store",
  intro: {
    title: "Poultry Feeders and Drinkers for Backyard Flocks",
    paragraphs: [
      <>
        Clean feed and fresh water are the two things every flock needs, every
        day. Magill Grain Store stocks yellow base poultry feeders and red base
        poultry drinkers in a range of sizes, so you can match your setup to
        your flock, from a few backyard hens to a larger coop.
      </>,
      <>
        Buying locally means you can pick up your feeder, drinker and feed in
        one trip, and ask our team which size suits your birds before you buy.
      </>,
    ],
  },
  rangeTitle: "Our Poultry Feeder & Drinker Range",
  types: {
    items: [
      {
        icon: Container,
        title: "Yellow Base Poultry Feeders",
        body: (
          <>
            Available in 2KG, 4KG, 7KG, 9KG and 12KG sizes. Smaller feeders
            suit chicks and small flocks, while larger feeders hold more feed
            between refills.
          </>
        ),
      },
      {
        icon: Droplets,
        title: "Red Base Poultry Drinkers",
        body: (
          <>
            Available in 1L, 2L, 4L, 6L, 8L and 12L sizes. Smaller drinkers
            suit chicks in a brooder, while larger drinkers keep more water
            available for growing and adult birds. Call (08) 8331 8159 for
            current drinker prices.
          </>
        ),
      },
    ] satisfies Block[],
  },
  choosing: {
    title: "How to Choose the Right Feeder and Drinker Size",
    paragraphs: [
      <>
        The right size depends on how many birds you keep and how often you
        want to refill. A small feeder or drinker is easy to keep clean and
        suits day old chicks in a brooder. For laying hens or a bigger flock, a
        larger feeder and drinker means fewer refills and less chance of your
        birds running out during the day. It&apos;s common to start with a
        small size for chicks and move up as they grow.
      </>,
    ],
  },
  tips: {
    title: "Tips for Setting Up Poultry Feeders and Drinkers",
    items: [
      {
        icon: Umbrella,
        title: "Keep Feed Clean and Dry",
        body: (
          <>
            Place feeders under cover and off wet ground to help keep feed dry
            and cut down on waste.
          </>
        ),
      },
      {
        icon: GlassWater,
        title: "Check Water Every Day",
        body: (
          <>
            Clean water matters as much as feed. Check drinkers daily, top
            them up, and rinse them out regularly.
          </>
        ),
      },
      {
        icon: Wheat,
        title: "Match the Feed to Your Birds",
        body: (
          <>
            A feeder is only as good as the feed in it. We stock{" "}
            <A href="/shop/poultry-feed">poultry feed</A> for every stage, from
            chick starter to layer pellets, along with{" "}
            <A href="/shop/grit">grit and shellgrit</A>.
          </>
        ),
      },
    ] satisfies Block[],
  },
  reasons: {
    title: "Why Buy Poultry Feeders & Drinkers From Magill Grain Store",
    items: [
      {
        icon: Boxes,
        title: "Feeders, Drinkers and Feed in One Place",
        body: (
          <>
            Pick up your feeder and drinker alongside poultry feed, grit and{" "}
            <NavyA href="/shop/livestock">livestock</NavyA> such as day old
            chicks and pullets.
          </>
        ),
      },
      {
        icon: Ruler,
        title: "A Size for Every Setup",
        body: (
          <>
            Five feeder sizes and six drinker sizes, from a small brooder setup
            to a larger flock.
          </>
        ),
      },
      {
        icon: PhoneCall,
        title: "Local Advice Before You Buy",
        body: (
          <>
            Not sure which size you need? Call <Tel /> and we&apos;ll help you
            choose the right feeder and drinker for your flock.
          </>
        ),
      },
      {
        icon: MapPin,
        title: "Your Local Grain Store in Magill",
        body: (
          <>
            Visit us at 574 Magill Road, Magill SA 5072, serving backyard flock
            keepers across Adelaide&apos;s eastern suburbs.
          </>
        ),
      },
    ] satisfies Block[],
  },
  faqTitle: "Frequently Asked Questions About Poultry Feeders",
  faqs,
  collectionSchema: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Poultry Feeders & Drinkers",
    description:
      "Buy poultry feeders and drinkers in Magill, SA. Yellow base feeders from 2KG to 12KG and red base drinkers from 1L to 12L.",
    url: "https://magillgrainstore.com.au/shop/poultry-feeders",
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
          name: "Poultry Feeders",
          item: "https://magillgrainstore.com.au/shop/poultry-feeders",
        },
      ],
    },
  },
  // Every question on the page, so the schema matches what visitors see.
  faqSchema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
}
