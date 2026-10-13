import Link from "next/link"
import { site } from "@/lib/site"
import type { Faq } from "@/lib/livestock"

/*
 * The Bird Seed category page (/shop/bird-seed) — the "Bird Seed Adelaide |
 * Bird Food & Seed Mixes | Magill" Google Doc, first tab, copied as written.
 * Do not paraphrase; edit the doc first, then mirror it here.
 *
 * The doc has no links and no schema markup section. The phone number below is
 * linked to tel: like the other category pages do — the words are unchanged.
 * The doc's heading for the FAQs is "FAQs"; the shared FAQ section's usual
 * "Frequently Asked Questions" title is used so it matches the other pages.
 *
 * The product cards on this page come from the dashboard, not from this file;
 * the doc's second tab ("Other page") is already the product names and
 * descriptions saved there.
 */

function Tel() {
  return (
    <Link
      href={site.phoneHref}
      className="font-extrabold text-accent-ink underline decoration-gold-400 underline-offset-4 hover:decoration-2"
    >
      (08) 8331 8159
    </Link>
  )
}

export const birdSeedCategory = {
  metaTitle: "Bird Seed Adelaide | Bird Food & Seed Mixes | Magill",
  metaDescription:
    "Shop bird seed and specialist bird food in Magill, Adelaide. Explore canary, finch, parrot and pigeon mixes. Call (08) 8331 8159.",
  h1: "Bird Seed & Specialist Bird Food in Adelaide",
  intro: {
    title: "Quality Bird Seed and Bird Food in Magill, Adelaide",
    paragraphs: [
      <>
        Magill Grain Store stocks a range of bird seed mixes and specialist
        bird food for bird owners and breeders. Our selection includes canary,
        finch, parrot, budgie and pigeon mixes, with options for different bird
        types and feeding requirements.
      </>,
      <>
        Visit our store at 574 Magill Road, Magill, or contact our team to
        check current stock, available bag sizes and the most suitable mix for
        your birds.
      </>,
    ],
  },
  rangeTitle: "Explore Our Bird Seed Range",
  choosing: {
    title: "How to Choose the Right Bird Seed",
    paragraphs: [
      <>
        Different bird species have different nutritional requirements. Choose
        a seed mix formulated for your particular bird rather than relying on a
        general wild bird seed blend. Breeding birds may also have different
        dietary needs from non-breeding birds.
      </>,
      <>
        Always check the product label for ingredients, feeding instructions
        and suitability. Fresh water and a balanced, species appropriate diet
        are important parts of bird care.
      </>,
    ],
  },
  local: {
    title: "Your Local Bird Seed Supplier in Adelaide",
    paragraphs: [
      <>
        Magill Grain Store serves bird owners, breeders and local households
        from 574 Magill Road, Magill SA 5072. Our team can help you check
        available bird seed products, bag sizes and prices.
      </>,
      <>
        Call <Tel /> to enquire about current stock before visiting.
      </>,
    ],
  },
  faqs: [
    {
      q: "What bird seed can I buy in Adelaide?",
      a: "Magill Grain Store stocks canary, finch, parrot, budgie and pigeon mixes, subject to availability. Contact us to confirm current products and bag sizes.",
    },
    {
      q: "Which bird seed is suitable for canaries?",
      a: "Choose a canary specific mix that matches your bird's needs. Check the ingredients and feeding instructions, particularly for breeding birds.",
    },
    {
      q: "What food is suitable for budgies and parrots?",
      a: "Budgies and parrots need species appropriate diets. Suitable formulated food, fresh water and other recommended foods should form part of their care. Ask an avian veterinarian for individual dietary advice.",
    },
    {
      q: "Can I use the same seed mix for every bird?",
      a: "No. Different bird species have different nutritional needs. Choose a mix formulated for your bird rather than assuming one product suits all birds.",
    },
    {
      q: "What can I feed my bird if I run out of bird seed?",
      a: "The safest temporary option depends on the species. Use a suitable food already recommended for your bird and arrange a replacement supply promptly. Avoid unfamiliar foods and seek avian veterinary advice if unsure.",
    },
    {
      q: "What foods should I avoid giving pet birds?",
      a: "Avoid chocolate, caffeine, alcohol and avocado. Never assume human foods or wild bird seed mixes are suitable for every pet bird.",
    },
    {
      q: "Where can I buy pigeon mix and pigeon pellets in Magill?",
      a: "Magill Grain Store at 574 Magill Road, Magill SA 5072, stocks pigeon mix and pigeon pellets. Contact us on (08) 8331 8159 to confirm availability.",
    },
  ] satisfies Faq[],
}
