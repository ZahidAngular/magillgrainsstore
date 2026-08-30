export const site = {
  name: "Magill Grain Store",
  tagline: "Fresh Farm Chicken and animal feed at your door step",
  phone: "(08) 8331 8159",
  phoneHref: "tel:+61883318159",
  email: "magillgrainstore@gmail.com",
  address: "574 Magill Road, Magill SA 5072",
  mapUrl:
    "https://www.google.com/maps/place/Magill+Grain+Store/@-34.9132015,138.6772072,17z",
  hours: [
    { day: "Monday — Friday", time: "8:30am – 5pm" },
    { day: "Saturday", time: "8am – 12pm" },
    { day: "Sunday / Public Holiday", time: "Closed" },
  ],
}

export type NavItem = {
  label: string
  href: string
  children?: NavItem[]
}

export type MegaItem = {
  label: string
  href: string
  /** Lucide icon name, resolved in the MegaPanel. */
  icon: string
  blurb: string
}

export type MegaGroup = {
  /** The store's own group heading, kept word for word. */
  name: string
  items: MegaItem[]
}

export type MegaMenu = {
  label: string
  href: string
  eyebrow: string
  groups: MegaGroup[]
}

/**
 * The store's menu, preserved group for group and label for label.
 *
 * Their bar carried 13 top-level items and 23 pages. Nineteen labels will not
 * fit across one row at any sane size — they wrapped to three lines and pushed
 * the last two off screen — so the tree is split across two panels. The
 * original group headings (Grain, Poultry, Birds, Cat & Dog, Ruminant,
 * Fertilizers, Others) survive as column headings inside those panels, so no
 * label from the source menu is lost.
 *
 * One heading is ours: "Garden & Farm". Rabbit Supplies, Garden Supplies,
 * Hay & Mulch and Laucke Flour were top-level items with no parent group, and
 * a column needs something above it. The four page labels are unchanged.
 */
export const megaMenus: MegaMenu[] = [
  {
    label: "Animal Feed",
    href: "/products",
    eyebrow: "Grain · Poultry · Birds · Ruminant",
    groups: [
      {
        name: "Grain",
        items: [
          {
            label: "Plain Seed 1KG-10KG",
            href: "/plain-seed-1-10kg",
            icon: "Wheat",
            blurb: "Single-variety grain in small packs.",
          },
          {
            label: "Plain Seed 20KG",
            href: "/plain-seed-20-kg",
            icon: "Package",
            blurb: "Wheat, barley, maize and millets by the bag.",
          },
        ],
      },
      {
        name: "Poultry",
        items: [
          {
            label: "Poultry Feed",
            href: "/poultry-feed",
            icon: "Egg",
            blurb: "Starter, grower, layer and finisher pellets.",
          },
          {
            label: "Poultry Feeders",
            href: "/poultry-feeders",
            icon: "Container",
            blurb: "Yellow base feeders and red base drinkers.",
          },
          {
            label: "Poultry Medicine",
            href: "/poultry-medicine",
            icon: "Pill",
            blurb: "Treatments and tonics for the flock.",
          },
        ],
      },
      {
        name: "Birds",
        items: [
          {
            label: "Bird Seed 1KG-10KG",
            href: "/bird-seed-1-10kg",
            icon: "Bird",
            blurb: "Budgie and companion bird mixes.",
          },
          {
            label: "Bird Seed 20KG",
            href: "/bird-seed-20kg",
            icon: "Feather",
            blurb: "Bulk canary, finch, parrot and pigeon mixes.",
          },
          {
            label: "Passwell, Wambaroo And Vitafarm",
            href: "/passwell-wambaroo-and-vitafarm",
            icon: "Award",
            blurb: "Hand-rearing formulas and specialist nutrition.",
          },
        ],
      },
      {
        name: "Ruminant",
        items: [
          {
            label: "Horse",
            href: "/horse",
            icon: "PawPrint",
            blurb: "Mare & foal, pony mixes and performance feeds.",
          },
          {
            label: "Cattle",
            href: "/cattle",
            icon: "Beef",
            blurb: "Stock nuts, sheep nuts and calf weaner pellets.",
          },
          {
            label: "Goat",
            href: "/goat",
            icon: "Milk",
            blurb: "Goat feed and minerals — ask in store.",
          },
          {
            label: "Ruminant Medicine",
            href: "/ruminant-medicine",
            icon: "Stethoscope",
            blurb: "Drenches and animal health lines.",
          },
        ],
      },
    ],
  },
  {
    label: "Pet & Garden",
    href: "/products",
    eyebrow: "Cat & Dog · Fertilizers · Garden · Others",
    groups: [
      {
        name: "Cat & Dog",
        items: [
          {
            label: "Litter",
            href: "/litter",
            icon: "Cat",
            blurb: "Cat litters from attapulgite to natural.",
          },
          {
            label: "Food",
            href: "/food",
            icon: "Bone",
            blurb: "Cat and dog food across every size.",
          },
        ],
      },
      {
        name: "Fertilizers",
        items: [
          {
            label: "Fertilizers 1KG-10KG",
            href: "/fertilizers-1-10kg",
            icon: "Droplet",
            blurb: "Powdered, liquid and pelletised in small packs.",
          },
          {
            label: "Fertilizers 20KG-25KG",
            href: "/fertilizers-20-25kg",
            icon: "Droplets",
            blurb: "Bulk fertiliser for gardens and paddocks.",
          },
        ],
      },
      {
        name: "Garden & Farm",
        items: [
          {
            label: "Rabbit Supplies",
            href: "/rabbit-supplies",
            icon: "Rabbit",
            blurb: "Jack Rabbit pellets, pet mix and rabbit hay.",
          },
          {
            label: "Garden Supplies",
            href: "/garden-supplies",
            icon: "Flower2",
            blurb: "Mulch, fertilisers and potting mixes.",
          },
          {
            label: "Hay & Mulch",
            href: "/hay-mulch",
            icon: "Sprout",
            blurb: "Lucerne, oaten and meadow hay, chaff and straw.",
          },
          {
            label: "Laucke Flour",
            href: "/laucke-flour",
            icon: "Croissant",
            blurb: "Bread mixes and baking flours by the bag.",
          },
        ],
      },
      {
        name: "Others",
        items: [
          {
            label: "Pig",
            href: "/pig",
            icon: "PiggyBank",
            blurb: "Pig feed and supplies — ask in store.",
          },
          {
            label: "Rat & Mouse",
            href: "/rat-mouse",
            icon: "Rat",
            blurb: "Rat and mouse feed and supplies.",
          },
          {
            label: "Kangaroo",
            href: "/kangaroo",
            icon: "Squirrel",
            blurb: "Kangaroo and native animal feed.",
          },
        ],
      },
    ],
  },
]

/** Every product page, flattened — used by the footer and the nav fallback. */
export const megaItems: MegaItem[] = megaMenus.flatMap((m) =>
  m.groups.flatMap((g) => g.items)
)

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  ...megaMenus.map((m) => ({
    label: m.label,
    href: m.href,
    children: m.groups.flatMap((g) =>
      g.items.map((i) => ({ label: i.label, href: i.href }))
    ),
  })),
  { label: "Contact Us", href: "/contact-us" },
]

export type Product = { name: string; price: string; image?: string }

export const featuredProducts: Product[] = [
  {
    name: "Duck & Goose Finisher 20KG",
    price: "$34 each",
    image: "/images/products/duck-goose-finisher.jpg",
  },
  {
    name: "Meatline Finisher",
    price: "$34 each",
    image: "/images/products/meatline-finisher.jpg",
  },
  {
    name: "Home-Lay Pellet 30KG",
    price: "$38 each",
    image: "/images/products/home-lay-pellet.jpg",
  },
  {
    name: "Extra Egg Layer Pellet 20KG",
    price: "1 for $25.50 & 2 for $47 each",
    image: "/images/products/extra-egg-layer-pellet.jpg",
  },
  {
    name: "Gamebird Finisher 20KG",
    price: "$34 each",
    image: "/images/products/gamebird-finisher.jpg",
  },
  {
    name: "Gamebird Main MP 20KG",
    price: "$34 each",
    image: "/images/products/gamebird-main-mp.jpg",
  },
]

export const poultryFeed: Product[] = [
  { name: "Duck & Goose Finisher 20KG", price: "$34 each", image: "/images/products/duck-goose-finisher.jpg" },
  { name: "Meatline Finisher", price: "$34 each", image: "/images/products/meatline-finisher.jpg" },
  { name: "Home-Lay Pellet 30KG", price: "$38 each", image: "/images/products/home-lay-pellet.jpg" },
  { name: "Extra Egg Layer Pellet 20KG", price: "1 for $25.50 & 2 for $47 each", image: "/images/products/extra-egg-layer-pellet.jpg" },
  { name: "Gamebird Finisher 20KG", price: "$34 each", image: "/images/products/gamebird-finisher.jpg" },
  { name: "Gamebird Main MP 20KG", price: "$34 each", image: "/images/products/gamebird-main-mp.jpg" },
  { name: "Gamebird Breeder 20 KG", price: "$34 each" },
  { name: "Gamebird Starter 20KG", price: "$34 each" },
  { name: "Duck and Goose Starter", price: "$34 each" },
  { name: "Meatline Starter", price: "$33 each" },
  { name: "Chick Starter", price: "$34 each" },
  { name: "Pullet Grower MP", price: "$34 each" },
  { name: "Hi Lay Mash", price: "1 for $34 and 2 for $64" },
  { name: "Red Hen Chick 20KG", price: "$33 each" },
  { name: "Red Hen Pulllet 20KG", price: "$28 each" },
  { name: "Red Hen Meat Bird 20KG", price: "$28 each" },
  { name: "Showbird Breeder MP", price: "1 for $34 and 2 for $64" },
  { name: "Red Hen Seventeen 20KG", price: "1 for $34 & 2 for $64" },
  { name: "Red Hen Layer 20KG", price: "1 for $34 & 2 for $64" },
  { name: "Red Hen Free Range 20KG", price: "1 for $34 & 2 for $64" },
]

export const poultryFeeders: Product[] = [
  { name: "Yellow Base Feeder 12KG", price: "$32.50 each" },
  { name: "Yellow Base Feeder 9KG", price: "$30 each" },
  { name: "Yellow Base Feeder 7KG", price: "$26 each" },
  { name: "Yellow Base Feeder 4KG", price: "$15.50 each" },
  { name: "Yellow Base Feeder 2KG", price: "$8.50 each" },
  { name: "Red Base Drinker 12L", price: "Call For Price" },
  { name: "Red Base Drinker 8L", price: "Call For Price" },
  { name: "Red Base Drinker 6L", price: "Call For Price" },
  { name: "Red Base Drinker 4L", price: "Call For Price" },
  { name: "Red Base Drinker 2L", price: "Call For Price" },
  { name: "Red Base Drinker 1L", price: "Call For Price" },
]

export const plainSeed: Product[] = [
  { name: "Wheat 20KG", price: "$18.50" },
  { name: "Soak Seed Mix 20KG", price: "Call For Price" },
  { name: "Shellgrit-Fine 20KG", price: "$16.50" },
  { name: "Shellgrit – Coarse 20KG", price: "$16.50" },
  { name: "Rolled Oat 20KG", price: "Call For Price" },
  { name: "Peas 20KG", price: "Call For Price" },
  { name: "Feed Oat 20KG", price: "Call For Price" },
  { name: "Mung Bean 20KG", price: "Call For Price" },
  { name: "Maw/Poppy Seed 20KG", price: "Call For Price" },
  { name: "Maize 20KG", price: "Call For Price" },
  { name: "Hulled Oat 20KG", price: "Call For Price" },
  { name: "Crush Barley 20KG", price: "Call For Price" },
  { name: "Cracked Maize 20KG", price: "Call For Price" },
  { name: "Cracked Lupins 20KG", price: "Call For Price" },
  { name: "Barley 20KG", price: "Call For Price" },
  { name: "Lupins 20KG", price: "Call For Price" },
  { name: "White French Millet 20KG", price: "Call For Price" },
  { name: "Sunflower Seed (Grey Striped) 20KG", price: "Call For Price" },
  { name: "Sunflower Seed (Black) 20KG", price: "Call For Price" },
  { name: "Safflower Seed 20KG", price: "Call For Price" },
  { name: "Panicum Seed 20KG", price: "Call For Price" },
  { name: "Red Panicum Seed 20KG", price: "Call For Price" },
  { name: "Rape Seed (Canola) 20KG", price: "Call For Price" },
  { name: "Niger Seed 20KG", price: "Call For Price" },
  { name: "Milo Sorgum 20KG", price: "Call For Price" },
  { name: "Linseed Seed 20KG", price: "Call For Price" },
  { name: "Jap Millet 20 KG", price: "Call For Price" },
  { name: "Canary Seed 20KG", price: "Call For Price" },
]

export const birdSeed: Product[] = [
  { name: "Budgie Mix 2KG", price: "$7.00" },
  { name: "Budgie Mix 1KG", price: "$3.50" },
]

export const services = [
  "Grains",
  "Bird Feed",
  "Animal Feed",
  "Fertilizers",
  "Hay and Mulch",
  "Garden Supplies",
  "Poultry Feeders",
  "Poultry Medicine",
]

/*
 * The only usable photography from the old site is low-resolution product
 * packshots, which look wrong blown up as full-bleed imagery. These render as
 * typographic cards instead — no image, so nothing is stretched or mislabelled.
 */
export const offerings = [
  {
    title: "Poultry & Chickens",
    body: "Starter, grower, layer and finisher feed for every stage of the flock.",
  },
  {
    title: "Animal & Bird Feed",
    body: "Plain seed, mixes and pellets for aviaries, ruminants and pets.",
  },
  {
    title: "Fertilizers & Hay",
    body: "Blood and bone, mulch, hay and garden supplies by the bag or bale.",
  },
  {
    title: "Poultry Feeders",
    body: "Yellow base feeders and red base drinkers from 1L to 12KG.",
  },
]

export const pillars = [
  {
    title: "Expert Farmers",
    body: "We source our grains directly from expert farmers who combine generations of knowledge with modern, sustainable practices.",
  },
  {
    title: "Fresh Harvest",
    body: "Our fresh harvest grains are carefully selected at peak maturity to preserve their natural flavor and nutrients.",
  },
  {
    title: "Modern Technology",
    body: "We source from farmers who embrace modern technology to grow smarter, more efficient, and more sustainable crops. By combining innovation with experience, they ensure higher quality harvests with care for the land and future generations.",
  },
]

export const records = [
  { label: "Success Rate", value: 98, suffix: "%" },
  { label: "Clients Dealt", value: 50, suffix: "+" },
  { label: "Expert Team", value: 12, suffix: "" },
  { label: "Positive Reviews", value: 96, suffix: "%" },
]

export const testimonials = [
  {
    quote:
      "Consistently fresh feed and honest advice every single visit. Our flock has never been healthier since we switched.",
    name: "Ron Burnwood",
    role: "Backyard flock keeper, Rostrevor",
  },
  {
    quote:
      "The team knows their grains inside out. Prices are fair and the bags are always ready when I arrive.",
    name: "Lily Granger",
    role: "Aviary breeder, Norwood",
  },
  {
    quote:
      "Reliable delivery straight to the farm gate. Genuinely the best grain store in the eastern suburbs.",
    name: "Jeson Foxx",
    role: "Small acreage, Athelstone",
  },
]

export const ranges = [
  "Red Hen",
  "Gamebird",
  "Meatline",
  "Home-Lay",
  "Hi Lay",
  "Showbird",
]

/* ─────────────────────────────────────────────────────────────────────────
 * Garden Products — copied verbatim from the store's own archived page:
 * web.archive.org/web/20250211062735/magillgrainstore.com.au/garden-products/
 * Wording is the store's, not ours. Do not paraphrase.
 * ──────────────────────────────────────────────────────────────────────── */

export const gardenIntro = [
  "You love your backyard garden, don’t you? Sitting on lush green grass, with crisp wind blowing across your face, a warm cup of coffee in your hands and happy sun God shining bright on your head – the feeling is beyond words!",
  "Having a lush green garden is not as difficult as it sounds. With Magill Grain Store’s assortment of gardening products like fertilizers, manure, potting mixes, and vegetable seeds, you can have the garden of your dreams in least amount of time – we make it that easy for you!",
]

export const gardenProductsLead =
  "Whether you are an expert gardener or a novice – we have an ideal product to suit all your requirements and to fit every budget. See the list of our products here. If you need something that’s not listed here, give us a call or visit us in store – we will arrange it for you!"

export const gardenCategories = [
  {
    title: "Mulch",
    body: "We stock mulch hay in our warehouse, making it available round – the – year to you! We provide pea straws, mulch in varying colours as well as sugar cane and Lucerne mulch.",
  },
  {
    title: "Fertilisers",
    body: "We offer a comprehensive collection of fertilisers – powdered, liquid as well as pelletised – that are safe and user friendly. Renourish your soil with Magill Grain Store’s fertilisers.",
  },
  {
    title: "Potting Mix",
    body: "Our bouquet of potting mixes includes professional orchid mixes, seed and cutting mixes and eco potting mixes. These are ideal for growing fruits, vegetables, flowers, herbs as well as suitable for garden beds and planter boxes alike.",
  },
]

export const gardenClosing =
  "Choose Magill Grain Store for your garden and landscaping needs and benefit from our superior quality products and exceptional customer service!"

/* Supplier logos carried on the store's own site. */
export const brands = [
  { name: "Brunnings", image: "/images/brands/brunnings.png" },
  { name: "Bushmans Tanks", image: "/images/brands/bushmans-tanks.png" },
  { name: "Wombaroo", image: "/images/brands/wombaroo.png" },
  { name: "Laucke", image: "/images/brands/laucke.png" },
  { name: "Barastoc", image: "/images/brands/barastoc.png" },
  { name: "Petforce", image: "/images/brands/petforce.png" },
]

/* Full weekday hours as published on the store's archived contact block. */
/**
 * Times are the store's own strings, character for character — hyphen and no
 * spaces on weekdays, spaced en-dash on Saturday. Tidying the punctuation into
 * one house style would be rewriting their opening hours.
 */
export const fullHours = [
  { day: "Monday", time: "8:00am-5:00pm" },
  { day: "Tuesday", time: "8:00am-5:00pm" },
  { day: "Wednesday", time: "8:00am-5:00pm" },
  { day: "Thursday", time: "8:00am-5:00pm" },
  { day: "Friday", time: "8:00am-5:00pm" },
  { day: "Saturday", time: "8:00 am–12:00 pm" },
  { day: "Sunday & Public Holidays", time: "Closed" },
]

export const storeContact = {
  addressLines: ["574 Magill Rd", "MAGILL", "SA 5072"],
  phone: "8331 8159",
  fax: "83644087",
  email: "magillgrainstore@gmail.com",
}

export const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Magill-Grain-Store-556594704546167/",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCTDHhwbYUwjch7QGN_AzWqg",
  },
]
