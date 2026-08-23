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

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Plain Seed 20 KG", href: "/plain-seed-20-kg" },
      { label: "Poultry Feed", href: "/poultry-feed" },
      { label: "Poultry Feeders", href: "/poultry-feeders" },
      { label: "Bird Seed 1 – 10KG", href: "/bird-seed-1-10kg" },
      { label: "Rabbit Supplies", href: "/rabbit-supplies" },
      { label: "Garden Supplies", href: "/garden-supplies" },
    ],
  },
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
