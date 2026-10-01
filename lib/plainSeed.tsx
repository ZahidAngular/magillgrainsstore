import type { ReactNode } from "react"
import {
  Bird,
  Droplet,
  Flower2,
  Gem,
  Layers,
  Leaf,
  PhoneCall,
  Package,
  ShieldCheck,
  Sparkles,
  Sprout,
  Truck,
  Wheat,
} from "lucide-react"
import { site } from "@/lib/site"
import type { Block, Faq } from "@/lib/livestock"

/*
 * The Plain Seed category page (/shop/plain-seed) — the "plain seed" tab of
 * the client's "category" Google Doc, copied as written. Do not paraphrase;
 * edit the doc first, then mirror it here.
 */

function Tel() {
  return (
    <a href={site.phoneHref} className="font-extrabold text-gold-400 hover:underline">
      (08) 8331 8159
    </a>
  )
}

export const plainSeedCategory = {
  metaTitle: "Buy Plain Seed | Canary, Millet & Sunflower | Magill SA",
  metaDescription:
    "Buy plain seed in Magill, SA canary, millet and sunflower seed by the bag. Fresh bird seed for aviaries & pigeons. Call (08) 8331 8159.",
  h1: "Buy Plain Seed | Canary, Millet & Sunflower Seed | Magill Grain Store",
  intro: {
    title: "Quality Plain Seed for Birds & Aviaries",
    paragraphs: [
      <>
        Magill Grain Store stocks a full range of plain seed for aviary
        birds, pigeons and backyard flocks canary seed, millet and sunflower,
        sold by the bag rather than pre-mixed. Many bird keepers prefer to
        build their own blend, and plain seed gives you full control over
        what goes into it.
      </>,
      <>
        Whether you&apos;re feeding a single aviary, a pigeon loft or
        supplementing a mixed seed diet, our plain seed range is sourced
        fresh and sold in the bag sizes you actually need no forced bundles,
        no unnecessary extras.
      </>,
    ],
  },
  rangeTitle: "Our Plain Seed Range",
  types: {
    items: [
      {
        icon: Bird,
        title: "Canary Seed",
        body: (
          <>
            A staple plain seed for canaries and small finches, often used as
            the base of a custom seed mix.
          </>
        ),
      },
      {
        icon: Wheat,
        title: "Millet",
        body: (
          <>
            A favourite among aviary birds and pigeons, millet is commonly
            fed loose or mixed with other plain seed for variety.
          </>
        ),
      },
      {
        icon: Flower2,
        title: "Sunflower Seed",
        body: (
          <>
            A high energy plain seed popular with parrots and larger aviary
            birds, often used as a treat or supplement in a broader diet.
          </>
        ),
      },
      {
        icon: Droplet,
        title: "Linseed",
        body: (
          <>
            Linseed is an oil-rich plain seed valued for its omega content,
            often added in small amounts to support coat and feather
            condition.
          </>
        ),
      },
      {
        icon: Layers,
        title: "Milo/Sorgum",
        body: (
          <>
            Milo (sorghum) is an energy-dense plain seed commonly fed to
            poultry and larger aviary birds as part of a mixed diet.
          </>
        ),
      },
      {
        icon: Sparkles,
        title: "Niger Seed",
        body: (
          <>
            Niger seed is a tiny, oil-rich seed favoured by finches and
            canaries, popular for feeders due to its fine size and high fat
            content.
          </>
        ),
      },
      {
        icon: Sprout,
        title: "Panicum Seed",
        body: (
          <>
            Panicum seed is a small, easily digestible plain seed widely used
            as a base ingredient in finch and canary seed mixes.
          </>
        ),
      },
      {
        icon: Leaf,
        title: "Rape Seed (Canola)",
        body: (
          <>
            Rape seed (canola) is a small oil-rich seed often included in
            wild bird and finch mixes for added variety and nutrition.
          </>
        ),
      },
      {
        icon: Gem,
        title: "Red Panicum Seed",
        body: (
          <>
            Red panicum seed is a coloured variant of panicum, popular in
            decorative and premium finch seed blends.
          </>
        ),
      },
    ] satisfies Block[],
  },
  why: {
    title: "Why Buy Plain Seed by the Bag",
    paragraphs: [
      <>
        Pre-mixed seed blends aren&apos;t right for every bird. Buying plain
        seed by the bag lets breeders and aviary keepers mix their own
        ratios more millet for finches, more sunflower for larger parrots
        instead of paying for filler they don&apos;t need.
      </>,
    ],
  },
  reasons: {
    title: "Why Choose Magill Grain Store for Plain Seed",
    items: [
      {
        icon: ShieldCheck,
        title: "Fresh Stock, Checked Regularly",
        body: (
          <>
            Our plain seed is checked for freshness and quality before it
            goes on the shelf stale seed is a common cause of picky eaters
            and wasted feed.
          </>
        ),
      },
      {
        icon: Package,
        title: "Buy the Exact Amount You Need",
        body: (
          <>
            From small bags for a single cage to bulk quantities for larger
            aviaries, we stock plain seed in a range of sizes.
          </>
        ),
      },
      {
        icon: PhoneCall,
        title: "Local Advice on Seed Mixes",
        body: (
          <>
            Not sure what ratio of canary seed, millet and sunflower suits
            your birds? Call <Tel />{" "}
            and we&apos;ll help you get it right.
          </>
        ),
      },
      {
        icon: Truck,
        title: "Doorstep Delivery Across Eastern Adelaide",
        body: (
          <>
            Bulk seed bags delivered to your door across Adelaide&apos;s
            eastern suburbs.
          </>
        ),
      },
    ] satisfies Block[],
  },
  faqTitle: "Frequently Asked Questions About Plain Seed",
  faqs: [
    {
      q: "What is plain seed used for?",
      a: "Plain seed canary seed, millet and sunflower is used by bird keepers and breeders to feed aviary birds, pigeons and finches, either on its own or mixed into a custom blend.",
    },
    {
      q: "What's the difference between plain seed and bird seed mixes?",
      a: "Plain seed is sold as a single seed type, letting you build your own ratio. Bird seed mixes are pre-blended for a specific bird type. Both have their place depending on how much control you want over your birds' diet.",
    },
    {
      q: "Is millet good for all birds?",
      a: "Millet is well suited to finches, canaries and pigeons, but larger parrots often need a higher proportion of sunflower or a specialist mix. Ask our team which ratio suits your birds.",
    },
    {
      q: "Can I mix my own bird seed using plain seed?",
      a: "Yes many breeders and aviary keepers buy canary seed, millet and sunflower separately and mix their own blend to suit their birds' specific needs.",
    },
    {
      q: "What bag sizes do you offer for plain seed?",
      a: "We stock plain seed in a range of sizes, from small bags for a single cage up to bulk quantities for larger aviaries call us to check current sizes and pricing.",
    },
    {
      q: "Do you deliver plain seed in Adelaide?",
      a: "Yes, we deliver plain seed and other feed products across Adelaide's eastern suburbs. Call (08) 8331 8159 to check delivery to your area.",
    },
  ] satisfies Faq[],
  /** The doc's "Example JSON-LD" — CollectionPage + Breadcrumb, copied as written. */
  collectionSchema: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Plain Seed",
    description:
      "Buy plain seed in Magill, SA canary, millet and sunflower seed by the bag.",
    url: "https://magillgrainstore.com.au/shop/plain-seed",
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
          name: "Plain Seed",
          item: "https://magillgrainstore.com.au/shop/plain-seed",
        },
      ],
    },
  },
}
