import type { ReactNode } from "react"
import Link from "next/link"
import { Bird, Boxes, Layers, MapPin, PhoneCall, Shell, Truck } from "lucide-react"
import { site } from "@/lib/site"
import type { Block, Faq } from "@/lib/livestock"

/*
 * The Grit category page (/shop/grit) — the "grit" tab of the client's
 * "category" Google Doc, copied as written. Do not paraphrase; edit the doc
 * first, then mirror it here.
 *
 * The doc has no links on this tab; "grain" below links to /shop/grains on
 * our own initiative, the same cross-link the grain and livestock pages
 * already make, since it's the one word in this copy that names another
 * category by its exact term.
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

export const gritCategory = {
  metaTitle: "Buy Grit for Poultry | Shellgrit & Canunda | Magill SA",
  metaDescription:
    "Buy grit in Magill, SA shellgrit, poultry grit and Canunda grit for healthy digestion and strong eggshells. Call (08) 8331 8159.",
  h1: "Buy Grit for Poultry | Shellgrit, Poultry Grit & Canunda Grit | Magill Grain Store",
  intro: {
    title: "Quality Grit for Healthy Digestion & Strong Eggshells",
    paragraphs: [
      <>
        Grit is one of the most overlooked essentials in a backyard flock&apos;s
        diet birds have no teeth, so they rely on grit in their gizzard to
        grind down <A href="/shop/grains">grain</A>{" "}
        and pellets. Magill Grain Store stocks shellgrit, poultry grit and
        Canunda grit, each suited to a different role in your flock&apos;s
        health.
      </>,
      <>
        Without enough grit, birds can struggle to digest their feed
        properly, and laying hens may produce thinner, weaker eggshells.
        It&apos;s a small, inexpensive addition that makes a real difference.
      </>,
    ],
  },
  rangeTitle: "Our Grit Range",
  types: {
    items: [
      {
        icon: Shell,
        title: "Shellgrit - Coarse",
        body: (
          <>
            Shellgrit - coarse is crushed shell in a larger particle size,
            primarily calcium carbonate, supporting strong eggshell formation
            in laying hens while lasting longer in the feeder.
          </>
        ),
      },
      {
        icon: Layers,
        title: "Shellgrit - Fine",
        body: (
          <>
            Shellgrit - fine is a finer ground crushed shell, primarily
            calcium carbonate, offering the same eggshell-strengthening
            benefits as coarse shellgrit but easier for smaller or younger
            birds to consume.
          </>
        ),
      },
      {
        icon: Bird,
        title: "Poultry Grit",
        body: (
          <>
            Poultry grit is an insoluble grit that sits in the gizzard,
            helping birds physically grind down grain and pellets for better
            digestion.
          </>
        ),
      },
      {
        icon: MapPin,
        title: "Fine Canunda Grit",
        body: (
          <>
            Fine Canunda grit is a natural insoluble grit sourced from South
            Australia, popular with local poultry keepers for its consistency
            and quality.
          </>
        ),
      },
    ] satisfies Block[],
  },
  compare: {
    title: "Shellgrit vs Poultry Grit | What's the Difference?",
    paragraphs: [
      <>
        Shellgrit dissolves and mainly supplies calcium for eggshell
        strength. Poultry grit (including Canunda grit) doesn&apos;t dissolve
        it stays in the gizzard and helps physically break down food. Most
        flocks benefit from having both available.
      </>,
    ],
  },
  reasons: {
    title: "Why Choose Magill Grain Store for Grit",
    items: [
      {
        icon: Boxes,
        title: "A Genuine Range, Not Just One Option",
        body: (
          <>
            Shellgrit, poultry grit and Canunda grit stocked separately, so
            your flock gets what it actually needs.
          </>
        ),
      },
      {
        icon: PhoneCall,
        title: "Local Advice on What Your Flock Needs",
        body: (
          <>
            Not sure what your birds need? Call <Tel />.
          </>
        ),
      },
      {
        icon: MapPin,
        title: "Sourced for South Australian Flocks",
        body: (
          <>
            Canunda grit sourced locally, reflecting decades of supplying SA
            poultry keepers.
          </>
        ),
      },
      {
        icon: Truck,
        title: "Doorstep Delivery Across Eastern Adelaide",
        body: <>Grit delivered alongside your regular feed order.</>,
      },
    ] satisfies Block[],
  },
  faqTitle: "Frequently Asked Questions",
  faqs: [
    {
      q: "Do chickens really need grit?",
      a: "Yes. Chickens have no teeth, so they rely on grit in their gizzard to grind down grain and pellets.",
    },
    {
      q: "What's the difference between shellgrit and poultry grit?",
      a: "Shellgrit dissolves and mainly provides calcium for eggshell strength, while poultry grit (like Canunda grit) is insoluble and helps physically grind food.",
    },
    {
      q: "How often should I give my chickens grit?",
      a: "Most keepers offer grit free choice in a separate container.",
    },
    {
      q: "Do chickens on pellets still need grit?",
      a: "Yes, even birds on complete pellet feed benefit, especially if also fed grain, scraps or free-range.",
    },
    {
      q: "What is Canunda grit?",
      a: "A natural insoluble grit sourced from South Australia, used to support digestion.",
    },
    {
      q: "Can grit help with weak or thin eggshells?",
      a: "Shellgrit specifically can help, as it supplies calcium for stronger eggshell formation.",
    },
  ] satisfies Faq[],
  /** The doc's "Schema Markup" section, copied as written. */
  collectionSchema: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Grit",
    description: "Buy grit in Magill, SA shellgrit, poultry grit and Canunda grit",
    url: "https://magillgrainstore.com.au/shop/grit",
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
          name: "Grit",
          item: "https://magillgrainstore.com.au/shop/grit",
        },
      ],
    },
  },
  faqSchema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do chickens really need grit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Chickens have no teeth, so they rely on grit in their gizzard to grind down grain and pellets.",
        },
      },
      {
        "@type": "Question",
        name: "What's the difference between shellgrit and poultry grit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shellgrit dissolves and mainly provides calcium for eggshell strength, while poultry grit is insoluble and helps physically grind food.",
        },
      },
    ],
  },
}
