import type { ReactNode } from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  Award,
  Bird,
  Drumstick,
  Egg,
  HeartHandshake,
  Layers,
  PhoneCall,
  ShoppingBasket,
  Thermometer,
  Warehouse,
  Wheat,
} from "lucide-react"
import { site } from "@/lib/site"

/*
 * Livestock product pages. Every word here is the client's SEO brief — the
 * "products of livestock" Google Doc, one tab per product — copied as written.
 * Do not paraphrase; edit the doc first, then mirror it here.
 */

export type Block = { icon: LucideIcon; title: string; body: ReactNode }
export type Faq = { q: string; a: string }

export type LivestockContent = {
  /** URL path, from the brief's "Suggested URL". */
  path: string
  /** The product's name as the dashboard stores it — used to read its price. */
  productName: string
  /** Last breadcrumb and schema product name. */
  name: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: { title: string; paragraphs: ReactNode[] }
  compare: { title: string; paragraphs: ReactNode[]; note?: ReactNode }
  care: { title: string; items: Block[] }
  reasons: { title: string; items: Block[] }
  faqs: Faq[]
  schema: { description: string; faqs: Faq[] }
}

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

export const dayOldChick: LivestockContent = {
  path: "/shop/livestock/day-old-chick",
  productName: "DAY OLD SEXED CHICK",
  name: "Day Old Sexed Chicks",
  metaTitle: "Day Old Chicks | Guaranteed Pullets | Magill SA",
  metaDescription:
    "Buy day old sexed chicks in Magill, SA at hatch for guaranteed pullets. Healthy, locally supplied stock. Call (08) 8331 8159 to check availability.",
  h1: "Day Old Sexed Chicks, Guaranteed Pullets | Magill Grain Store",
  intro: {
    title: "What Are Day Old Chicks?",
    paragraphs: [
      <>
        Day old sexed chicks are newly hatched chicks that have had their gender
        identified shortly after hatching, so you know you&apos;re buying pullets
        (female, future egg-layers) rather than an unsexed, random batch. For
        backyard keepers focused on eggs rather than raising cockerels, sexed
        chicks remove the guesswork.
      </>,
      <>
        At Magill Grain Store, our sexed chicks are supplied fresh and handled
        with care from hatch to pickup, giving your new flock the healthiest
        possible start.
      </>,
    ],
  },
  compare: {
    title: "Why Choose Chicks Over Unsexed (Straight Run)",
    paragraphs: [
      <>
        Unsexed or &ldquo;straight run&rdquo; chicks are sold as a random mixed
        batch roughly half pullets, half cockerels and cost less as a result.
        Sexed chicks cost a little more per bird, but you know exactly what
        you&apos;re getting: pullets that will grow into layers, without the
        extra work of rehoming or raising cockerels you didn&apos;t plan for.
      </>,
    ],
    note: (
      <>
        Sexing accuracy is very high, though not guaranteed to be exact most
        hatcheries and suppliers quote accuracy in the high 90% range rather
        than 100%.
      </>
    ),
  },
  care: {
    title: "Caring for Newly Hatched Chicks",
    items: [
      {
        icon: Warehouse,
        title: "Brooder Setup",
        body: (
          <>
            A draft-free brooder box with clean bedding, kept at a consistent
            temperature, is essential for the first few weeks.
          </>
        ),
      },
      {
        icon: Thermometer,
        title: "Heat Source",
        body: (
          <>
            Day old chicks need supplementary heat typically starting around
            35°C in week one and gradually reduced as they feather up.
          </>
        ),
      },
      {
        icon: Wheat,
        title: "Starter Feed & Water",
        body: (
          <>
            A chick starter crumble and constant access to clean water support
            healthy early growth. <A href="/shop/grit">Grit</A> isn&apos;t
            needed until chicks move onto <A href="/shop/grains">grain</A> or
            free-range.
          </>
        ),
      },
    ],
  },
  reasons: {
    title: "Why Buy Day Old Chicks From Magill Grain Store",
    items: [
      {
        icon: HeartHandshake,
        title: "Locally Supplied, Handled With Care",
        body: (
          <>
            Our chicks are sourced and handled to minimise stress before they
            reach your brooder.
          </>
        ),
      },
      {
        icon: ShoppingBasket,
        title: "Everything to Get Started, In One Place",
        body: (
          <>
            Starter feed, feeders, drinkers and heat lamps are all available
            in-store alongside your chicks.
          </>
        ),
      },
      {
        icon: PhoneCall,
        title: "Local Advice for First Time Keepers",
        body: (
          <>
            New to raising chicks? Call <Tel /> we&apos;ll walk you through
            brooder setup, feeding and what to expect in the first few weeks.
          </>
        ),
      },
      {
        icon: Award,
        title: "Trusted by South Australian Flock Keepers Since 1998",
        body: (
          <>
            Decades of experience supplying livestock and feed to backyard
            keepers across Adelaide&apos;s eastern suburbs.
          </>
        ),
      },
    ],
  },
  faqs: [
    {
      q: "What does “sexed” mean for day old chicks?",
      a: "A sexed chick has had its gender identified shortly after hatching, letting buyers choose specifically pullets (female, future layers) rather than a random unsexed batch.",
    },
    {
      q: "Are sexed chicks 100% guaranteed to be female?",
      a: "Sexing accuracy is very high but not absolute typically in the high 90% range. Ask our team about the accuracy on current stock.",
    },
    {
      q: "How do I care for day old sexed chicks when I get them home?",
      a: "They need a warm, draft-free brooder, a heat source (around 35°C in week one), chick starter feed and constant clean water.",
    },
    {
      q: "When will my sexed chicks start laying eggs?",
      a: "Most breeds start laying between 18 and 22 weeks of age, depending on breed and season.",
    },
    {
      q: "Is day old sexed chicks always in stock?",
      a: "Availability depends on hatching schedules. Call (08) 8331 8159 to check current stock and breeds available.",
    },
    {
      q: "What breed are the sexed chicks you sell?",
      a: "Breed availability varies by batch ask our team for current breed options and their laying characteristics.",
    },
    {
      q: "Do I need grit for day old chicks?",
      a: "No, grit isn't needed until chicks move onto grain or start free-ranging. Starter crumble alone is sufficient in the early weeks.",
    },
    {
      q: "What if I want a rooster instead of a pullet?",
      a: "Sexed chicks are specifically sold as pullets. If you're after a rooster, these are available on request rather than held as standard stock call (08) 8331 8159 to check availability.",
    },
  ],
  schema: {
    description:
      "Day old chicks sexed at hatch to guarantee pullets, sourced and handled locally in Magill, South Australia.",
    faqs: [
      {
        q: "What does 'sexed' mean for day old chicks?",
        a: "A sexed chick has had its gender identified shortly after hatching, letting buyers choose specifically pullets rather than a random unsexed batch.",
      },
      {
        q: "Are sexed chicks 100% guaranteed to be female?",
        a: "Sexing accuracy is very high but not absolute typically in the high 90% range.",
      },
    ],
  },
}

export const dayOldMeatBirds: LivestockContent = {
  path: "/shop/livestock/day-old-meat-birds",
  productName: "DAY OLD MEAT BIRDS",
  name: "Day Old Meat Birds",
  metaTitle: "Day Old Meat Birds | Meat Bird Chicks | Magill SA",
  metaDescription:
    "Buy day old meat birds in Magill, SA healthy meat bird chicks for home-raised poultry. Locally supplied. Call (08) 8331 8159 for availability.",
  h1: "Day Old Meat Birds | Meat Bird Chicks for Home-Raised Poultry | Magill Grain Store",
  intro: {
    title: "What Are Day Old Meat Birds?",
    paragraphs: [
      <>
        Day old meat birds are newly hatched chicks from breeds selected
        specifically for meat production faster growth, better feed conversion,
        and a heavier frame than standard laying breeds. They&apos;re the
        starting point for households and small farms wanting to raise their
        own poultry for the table.
      </>,
      <>
        At Magill Grain Store, our meat bird chicks are supplied fresh and
        handled with care, giving your batch the healthiest possible start.
      </>,
    ],
  },
  compare: {
    title: "Meat Birds vs Laying Breeds | What’s the Difference?",
    paragraphs: [
      <>
        Laying breeds are bred to convert feed into eggs over a long productive
        life. Meat birds are bred for the opposite rapid growth and muscle
        development over a short 6–10 week period, ready for processing much
        sooner than a dual-purpose or layer breed would be.
      </>,
    ],
  },
  care: {
    title: "Raising Day Old Meat Birds",
    items: [
      {
        icon: Warehouse,
        title: "Brooder Setup",
        body: (
          <>
            Like any <A href="/shop/livestock">day old chick</A>, meat birds
            need a warm, draft free brooder with clean bedding for the first few
            weeks before moving to grow out space.
          </>
        ),
      },
      {
        icon: Thermometer,
        title: "Heat Source",
        body: (
          <>
            Start around 35°C in week one, gradually reducing as birds feather
            up meat breeds often need slightly more floor space per bird due to
            faster weight gain.
          </>
        ),
      },
      {
        icon: Wheat,
        title: "Feed for Growth",
        body: (
          <>
            Meat birds need a higher protein starter and grower feed than layer
            breeds to support their rapid growth rate ask our team which feed
            matches your birds&apos; age and stage.
          </>
        ),
      },
    ],
  },
  reasons: {
    title: "Why Buy Day Old Meat Birds From Magill Grain Store",
    items: [
      {
        icon: HeartHandshake,
        title: "Locally Supplied, Handled With Care",
        body: (
          <>
            Our meat bird chicks are sourced and handled to reduce stress before
            they reach your brooder.
          </>
        ),
      },
      {
        icon: ShoppingBasket,
        title: "Everything to Get Started, In One Place",
        body: (
          <>
            Starter and grower feed, feeders, drinkers and heat lamps are all
            available in-store alongside your chicks.
          </>
        ),
      },
      {
        icon: PhoneCall,
        title: "Local Advice for First Time Meat Bird Keepers",
        body: (
          <>
            Raising meat birds for the first time? Call <Tel /> we&apos;ll talk
            through brooder setup, feed schedule and processing timelines.
          </>
        ),
      },
      {
        icon: Award,
        title: "Trusted by South Australian Flock Keepers Since 1998",
        body: (
          <>
            Decades of experience supplying{" "}
            <NavyA href="/shop/livestock">livestock</NavyA> and{" "}
            <NavyA href="/shop/poultry-feed">feed</NavyA> to backyard keepers
            and small farms across Adelaide&apos;s eastern suburbs.
          </>
        ),
      },
    ],
  },
  faqs: [
    {
      q: "How long does it take to raise a meat bird to processing weight?",
      a: "Most meat bird breeds reach processing weight in around 6–10 weeks, depending on the breed and feeding regime.",
    },
    {
      q: "What feed do day old meat birds need?",
      a: "Meat birds generally need a higher-protein starter feed than layer breeds, moving to a grower feed as they mature. Ask our team for the right feed schedule.",
    },
    {
      q: "Do meat birds need different housing to layer chicks?",
      a: "The early brooder setup is similar, but meat birds often need more floor space as they grow due to faster weight gain and a heavier frame.",
    },
    {
      q: "Can I keep meat birds and laying hens together?",
      a: "They can be raised together as chicks, but because meat birds grow much faster, many keepers separate them once feed and space needs start to differ.",
    },
    {
      q: "Is day old meat birds always in stock?",
      a: "Availability depends on hatching schedules. Call (08) 8331 8159 to check current stock and breeds available.",
    },
    {
      q: "What breed are the meat birds you sell?",
      a: "Breed availability varies by batch ask our team for current options and expected growth timelines.",
    },
    {
      q: "Do day old meat birds need grit?",
      a: "No, grit isn't needed until birds move onto grain or start free-ranging. Starter feed alone is sufficient in the early weeks.",
    },
  ],
  schema: {
    description:
      "Day old meat bird chicks, sourced and handled locally in Magill, South Australia, for home-raised poultry.",
    faqs: [
      {
        q: "How long does it take to raise a meat bird to processing weight?",
        a: "Most meat bird breeds reach processing weight in around 6–10 weeks, depending on the breed and feeding regime.",
      },
      {
        q: "What feed do day old meat birds need?",
        a: "Meat birds generally need a higher-protein starter feed than layer breeds, moving to a grower feed as they mature.",
      },
    ],
  },
}

export const pullets: LivestockContent = {
  path: "/shop/livestock/pullets",
  productName: "PULLETS",
  name: "Pullets",
  metaTitle: "Pullets for Sale | Point of Lay | Magill SA",
  metaDescription:
    "Buy pullets in Magill, SA young hens close to laying age, ready sooner than day old chicks. Locally supplied. Call (08) 8331 8159.",
  h1: "Pullets for Sale | Point of Lay Hens | Magill Grain Store",
  intro: {
    title: "What Are Pullets?",
    paragraphs: [
      <>
        Pullets are young hens that haven&apos;t yet reached full maturity
        typically sold close to point of lay, meaning they&apos;ll start
        producing eggs soon after you bring them home. For anyone who wants eggs
        without the weeks of brooding, heat lamps and starter feed that day old
        chicks need, pullets are the faster route to a productive flock.
      </>,
      <>
        At Magill Grain Store, our pullets are sourced and handled locally, so
        they arrive settled and ready to integrate into your existing setup.
      </>,
    ],
  },
  compare: {
    title: "Pullets vs Day Old Chicks | Which Should You Choose?",
    paragraphs: [
      <>
        Day old chicks need a full brooder setup and 18–22 weeks before they
        start laying, but give you full control from the very start. Pullets
        skip that early stage you&apos;re buying a young hen close to laying
        age, with less daily care required and eggs much sooner. If you&apos;re
        new to keeping poultry or just want eggs without the brooding period,
        pullets are usually the simpler choice.
      </>,
    ],
  },
  care: {
    title: "Settling New Pullets Into Your Flock",
    items: [
      {
        icon: Bird,
        title: "Introducing Pullets to an Existing Flock",
        body: (
          <>
            New birds should be introduced gradually housing them within sight
            of an existing flock for a few days before mixing can reduce pecking
            order stress.
          </>
        ),
      },
      {
        icon: Wheat,
        title: "Feed for Point of Lay",
        body: (
          <>
            As pullets approach laying age, they should move from a grower feed
            onto a layer pellet with added calcium to support egg production.
          </>
        ),
      },
      {
        icon: Layers,
        title: "Grit and Shellgrit",
        body: (
          <>
            Once pullets start laying, <A href="/shop/grit">shellgrit</A>{" "}
            supports strong eggshell formation, while poultry grit aids
            digestion if they&apos;re also fed grain or free-range.
          </>
        ),
      },
    ],
  },
  reasons: {
    title: "Why Buy Pullets From Magill Grain Store",
    items: [
      {
        icon: HeartHandshake,
        title: "Locally Supplied, Handled With Care",
        body: (
          <>
            Our pullets are sourced and handled to minimise stress before they
            reach your coop.
          </>
        ),
      },
      {
        icon: ShoppingBasket,
        title: "Everything to Get Started, In One Place",
        body: (
          <>
            Layer feed, <NavyA href="/shop/grit">shellgrit</NavyA>, feeders and
            drinkers are all available in-store alongside your pullets.
          </>
        ),
      },
      {
        icon: PhoneCall,
        title: "Local Advice on Introducing New Birds",
        body: (
          <>
            Adding pullets to an existing flock? Call <Tel /> we&apos;ll talk
            you through introductions, feed changes and what to expect as they
            come into lay.
          </>
        ),
      },
      {
        icon: Award,
        title: "Trusted by South Australian Flock Keepers Since 1998",
        body: (
          <>
            Decades of experience supplying{" "}
            <NavyA href="/shop/livestock">livestock</NavyA> and feed to
            backyard keepers and small farms across Adelaide&apos;s eastern
            suburbs.
          </>
        ),
      },
    ],
  },
  faqs: [
    {
      q: "What age are pullets when I buy them?",
      a: "Pullet age can vary by batch call (08) 8331 8159 to check the current age and expected time to lay for available stock.",
    },
    {
      q: "How soon will pullets start laying eggs?",
      a: "Point of lay pullets typically start laying within a few weeks of purchase, though timing can vary by breed and season.",
    },
    {
      q: "Can I mix pullets with my existing flock straight away?",
      a: "It's best to introduce them gradually housing pullets within sight of the existing flock for a few days before mixing helps reduce pecking-order stress.",
    },
    {
      q: "What feed should I give pullets?",
      a: "As pullets approach laying age, move them onto a layer pellet with added calcium to support egg production.",
    },
    {
      q: "Do pullets need grit?",
      a: "Yes, shellgrit supports eggshell strength once they start laying, and poultry grit aids digestion if they're also fed grain or free-range.",
    },
    {
      q: "Are pullets always in stock?",
      a: "Availability depends on hatching and rearing schedules. Call (08) 8331 8159 to check current stock and breeds available.",
    },
    {
      q: "What breed are the pullets you sell?",
      a: "Breed availability varies by batch ask our team for current options and their laying characteristics.",
    },
  ],
  schema: {
    description:
      "Point of lay pullets, sourced and handled locally in Magill, South Australia, ready to start laying soon after purchase.",
    faqs: [
      {
        q: "What age are pullets when I buy them?",
        a: "Pullet age can vary by batch call ahead to check the current age and expected time to lay for available stock.",
      },
      {
        q: "How soon will pullets start laying eggs?",
        a: "Point of lay pullets typically start laying within a few weeks of purchase, though timing can vary by breed and season.",
      },
    ],
  },
}

/*
 * Roosters have no page of their own — the brief's "roaster" tab is a line of
 * copy (on the card, see lib/productPages) and this schema for /shop/livestock.
 */
export const roosterSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Roosters",
  description:
    "Roosters available on request at Magill Grain Store not held as standard stock. Call to check current availability and breed options.",
  brand: { "@type": "Brand", name: "Magill Grain Store" },
  category: "Livestock",
  offers: {
    "@type": "Offer",
    priceCurrency: "AUD",
    price: "0",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "AUD",
      valueAddedTaxIncluded: "true",
      description: "Call for pricing",
    },
    availability: "https://schema.org/BackOrder",
    url: "https://magillgrainstore.com.au/shop/livestock",
    seller: {
      "@type": "LocalBusiness",
      name: "Magill Grain Store",
      telephone: "+61883318159",
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

export const livestockPages = [dayOldChick, dayOldMeatBirds, pullets]

/**
 * The Livestock category page (/shop/livestock) — the "livestock" tab of the
 * client's "category" doc, word for word. Intro sits above the product cards,
 * everything else below them.
 */
export const livestockCategory = {
  metaTitle: "Livestock for Sale | Day Old Chicks & Pullets | Magill SA",
  metaDescription:
    "Livestock for sale in Magill, SA day old chicks, meat birds and pullets. Healthy stock from a trusted local supplier. Call (08) 8331 8159.",
  h1: "Livestock for Sale | Day Old Chicks, Meat Birds & Pullets | Magill Grain Store",
  intro: {
    title: "Quality Livestock for Backyard Flocks & Small Farms",
    paragraphs: [
      <>
        Magill Grain Store supplies live poultry stock to backyard flock owners,
        breeders and small acreage farms throughout South Australia. Starting a
        flock from scratch or adding to an existing flock? Our livestock range
        includes day old chicks, meat birds and pullets.
      </>,
      <>
        Buying your livestock locally means healthier stock with less transport
        stress and a supplier who can tell you exactly what breed, age and setup
        is suitable for what you&apos;re planning to keep.
      </>,
    ],
  },
  range: {
    title: "Our Livestock Range",
    items: [
      {
        icon: Bird,
        title: "Day Old Chicks",
        body: (
          <>
            The most common starting point for a new flock day old chicks let
            you raise birds from the very beginning, ideal for both egg layers
            and meat breeds.
          </>
        ),
      },
      {
        icon: Drumstick,
        title: "Meat Birds",
        body: (
          <>
            Purpose-raised meat bird breeds for households and small farms
            looking to raise their own poultry for the table.
          </>
        ),
      },
      {
        icon: Egg,
        title: "Pullets",
        body: (
          <>
            Young hens close to laying age a good option if you want eggs sooner
            without raising chicks from day one.
          </>
        ),
      },
    ] satisfies Block[],
  },
  choosing: {
    title: "Choosing the Right Livestock for Your Flock",
    paragraphs: [
      <>
        New to keeping poultry, or adding to an established flock? The right
        starting point depends on how quickly you want eggs, how much space you
        have, and whether you&apos;re raising for eggs, meat or both. Day old
        chicks need the most setup a brooder, heat lamp and time but give you
        full control from the start. Pullets are ready to lay sooner, with less
        early-stage care required.
      </>,
    ],
  },
  reasons: {
    title: "Why Buy Livestock From Magill Grain Store",
    items: [
      {
        icon: HeartHandshake,
        title: "Healthy, Well Cared For Stock",
        body: (
          <>
            Our livestock is sourced and handled with care before it reaches
            you, reducing stress and giving your flock the best start.
          </>
        ),
      },
      {
        icon: PhoneCall,
        title: "Local Knowledge, Straight Answers",
        body: (
          <>
            Not sure whether to start with chicks or pullets? Call <Tel />{" "}
            we&apos;ll talk through what suits your setup and experience level.
          </>
        ),
      },
      {
        icon: ShoppingBasket,
        title: "Everything Your New Livestock Needs, in One Place",
        body: (
          <>
            From day-old chicks to grower feed, feeders and drinkers, we stock
            everything to get a new flock started under one roof.
          </>
        ),
      },
      {
        icon: Award,
        title: "Serving South Australian Flock Owners Since 1998",
        body: (
          <>
            Decades of experience supplying livestock and feed to backyard
            keepers and small farms across Adelaide&apos;s eastern suburbs.
          </>
        ),
      },
    ] satisfies Block[],
  },
  faqTitle: "Frequently Asked Questions About Livestock",
  faqs: [
    {
      q: "What’s the difference between day old chicks and pullets?",
      a: "Day old chicks are newly hatched and need a brooder and heat source before they can go outside, while pullets are young hens close to laying age that need less early-stage setup.",
    },
    {
      q: "How do I care for day old chicks?",
      a: "Day old chicks need a warm, draft-free brooder, a heat lamp, chick starter feed and clean water. Ask our team for a full setup guide when you buy.",
    },
    {
      q: "What age are pullets when I buy them?",
      a: "Pullet age can vary by batch call (08) 8331 8159 to check the current age and expected time to lay for available stock.",
    },
    {
      q: "Do you sell meat bird breeds?",
      a: "Yes, we stock meat bird breeds suited to households and small farms raising their own poultry for the table.",
    },
    {
      q: "Is livestock always in stock?",
      a: "Availability depends on hatching and supply schedules. Call ahead to confirm current stock of chicks, pullets or meat birds before visiting.",
    },
    {
      q: "What else do I need when I buy livestock?",
      a: "New livestock generally needs appropriate feed, a feeder and drinker, and for day old chicks a brooder and heat lamp. We stock all of this in-store.",
    },
    {
      q: "Do you sell roosters?",
      a: "Roosters are available on request rather than kept as standard stock. Call (08) 8331 8159 to check current availability and breed options.",
    },
  ] satisfies Faq[],
}
