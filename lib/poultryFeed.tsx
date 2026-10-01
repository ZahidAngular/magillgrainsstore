import { Award, Boxes, Drumstick, Egg, PhoneCall, ShieldCheck, Sprout } from "lucide-react"
import { site } from "@/lib/site"
import type { Block, Faq } from "@/lib/livestock"

/*
 * The Poultry Feed category page (/shop/poultry-feed). No client brief exists
 * for this one, so this copy is written in-house, in the same voice and
 * structure as the pages the client's brief did cover (Grains, Plain Seed,
 * Grit) — real facts only (the dashboard's own product range, the site's
 * "since 1998" history already used elsewhere), no invented claims.
 */

function Tel() {
  return (
    <a href={site.phoneHref} className="font-extrabold text-gold-400 hover:underline">
      (08) 8331 8159
    </a>
  )
}

export const poultryFeedCategory = {
  metaTitle: "Poultry Feed | Starter, Layer & Meat Bird Pellets | Magill SA",
  metaDescription:
    "Buy poultry feed in Magill, SA chick starter, layer, grower and meat bird pellets. Trusted local supplier since 1998. Call (08) 8331 8159.",
  h1: "Poultry Feed for Every Life Stage | Starter to Layer | Magill Grain Store",
  intro: {
    title: "Quality Poultry Feed for Every Stage of Your Flock",
    paragraphs: [
      <>
        Magill Grain Store stocks a full range of poultry feed for backyard
        flocks, show birds and gamebirds from chick starter through to layer
        and meat bird pellets. Feeding the right pellet at the right stage
        makes the biggest difference to your flock&apos;s health and egg
        production.
      </>,
      <>
        Every feed we stock is sourced from trusted Australian manufacturers
        and kept fresh on our shelves. Not sure which pellet suits your
        birds? Our team can point you to the right bag for your flock&apos;s
        age and purpose.
      </>,
    ],
  },
  rangeTitle: "Our Poultry Feed Range",
  types: {
    items: [
      {
        icon: Egg,
        title: "Chick Starter",
        body: (
          <>
            A high protein starter crumble for day old chicks and young
            birds, supporting strong early growth before they move onto
            grower feed.
          </>
        ),
      },
      {
        icon: Sprout,
        title: "Pullet Grower",
        body: (
          <>
            A grower pellet for pullets moving on from starter feed,
            balancing protein and energy as birds develop toward point of
            lay.
          </>
        ),
      },
      {
        icon: Award,
        title: "Layer Feed",
        body: (
          <>
            A complete layer pellet with added calcium, formulated to
            support strong eggshells and consistent egg production in laying
            hens.
          </>
        ),
      },
      {
        icon: Drumstick,
        title: "Meat Bird Feed",
        body: (
          <>
            A higher energy pellet for meat bird breeds, supporting fast,
            healthy growth through to processing weight.
          </>
        ),
      },
    ] satisfies Block[],
  },
  compare: {
    title: "Starter, Grower, Layer or Meat Bird | Which Feed Does Your Flock Need?",
    paragraphs: [
      <>
        The right feed depends on your birds&apos; age and purpose. Day old
        chicks need a starter crumble, pullets move onto a grower pellet as
        they mature, laying hens do best on a calcium enriched layer feed,
        and meat bird breeds need a higher energy finisher to reach weight.
        Ask our team if you&apos;re not sure which stage your flock is at.
      </>,
    ],
  },
  reasons: {
    title: "Why Buy Poultry Feed From Magill Grain Store",
    items: [
      {
        icon: Boxes,
        title: "Feed for Every Stage, In One Place",
        body: (
          <>
            From starter crumble to layer pellets and meat bird finisher, we
            stock feed for every stage of your flock under one roof.
          </>
        ),
      },
      {
        icon: PhoneCall,
        title: "Local Advice on the Right Feed",
        body: (
          <>
            Not sure whether your flock needs grower or layer feed? Call{" "}
            <Tel />
            {" "}we&apos;ll help you pick the right pellet.
          </>
        ),
      },
      {
        icon: ShieldCheck,
        title: "Fresh Stock, Turned Over Regularly",
        body: (
          <>
            Our feed is stocked in volumes that turn over quickly, so
            what you buy is fresh rather than sitting on a shelf for months.
          </>
        ),
      },
      {
        icon: Award,
        title: "Serving South Australian Flock Keepers Since 1998",
        body: (
          <>
            Decades of experience supplying poultry feed to backyard
            keepers, show bird breeders and small farms across
            Adelaide&apos;s eastern suburbs.
          </>
        ),
      },
    ] satisfies Block[],
  },
  faqTitle: "Frequently Asked Questions About Poultry Feed",
  faqs: [
    {
      q: "What feed should I give day old chicks?",
      a: "Day old chicks need a chick starter crumble, a high protein feed formulated to support their early growth before they move onto a grower or layer pellet.",
    },
    {
      q: "When should I switch my pullets from grower to layer feed?",
      a: "Most keepers switch to a layer pellet once pullets are close to point of lay, usually around 16-18 weeks, since layer feed contains calcium that starter and grower feeds don't.",
    },
    {
      q: "What's the difference between layer and meat bird feed?",
      a: "Layer feed is formulated with added calcium to support egg production, while meat bird feed is higher in energy and protein to support fast growth to processing weight.",
    },
    {
      q: "Can I feed grain instead of pellets?",
      a: "Grain can supplement a diet but shouldn't replace a complete pellet feed on its own, since pellets are formulated with vitamins and minerals grain alone doesn't provide.",
    },
    {
      q: "Do you stock feed for gamebirds and show birds?",
      a: "Yes, we stock dedicated gamebird and ShowBird breeder lines alongside our standard poultry feed range.",
    },
    {
      q: "Do you deliver poultry feed in Adelaide?",
      a: "Yes, we deliver poultry feed and other feed products across Adelaide's eastern suburbs. Call (08) 8331 8159 to check delivery to your area.",
    },
  ] satisfies Faq[],
  collectionSchema: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Poultry Feed",
    description:
      "Buy poultry feed in Magill, SA chick starter, layer, grower and meat bird pellets.",
    url: "https://magillgrainstore.com.au/shop/poultry-feed",
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
          name: "Poultry Feed",
          item: "https://magillgrainstore.com.au/shop/poultry-feed",
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
        name: "What feed should I give day old chicks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Day old chicks need a chick starter crumble, a high protein feed formulated to support their early growth before they move onto a grower or layer pellet.",
        },
      },
      {
        "@type": "Question",
        name: "What's the difference between layer and meat bird feed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Layer feed is formulated with added calcium to support egg production, while meat bird feed is higher in energy and protein to support fast growth to processing weight.",
        },
      },
    ],
  },
}
