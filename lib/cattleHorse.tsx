import Link from "next/link"
import { site } from "@/lib/site"

/*
 * The Cattle & Horse category page (/shop/cattle-horse) — the "Cattle & Horse
 * Feed SEO Content" Google Doc, first tab, copied as written. Do not
 * paraphrase; edit the doc first, then mirror it here.
 *
 * The doc has no links. The phone number below is linked to tel: like the
 * other category pages do — the words are unchanged.
 *
 * The product cards on this page come from the dashboard, not from this file;
 * the doc's second tab ("sub product") is already the product names and
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

export const cattleHorseCategory = {
  metaTitle: "Horse & Livestock Feed Adelaide | Magill Grain Store",
  metaDescription:
    "Shop horse, cattle, goat and sheep feed in Magill, Adelaide. Explore livestock feed and calf milk products. Call (08) 8331 8159.",
  h1: "Horse, Cattle & Livestock Feed in Adelaide",
  intro: {
    title: "Horse and Livestock Feed in Magill, Adelaide",
    paragraphs: [
      <>
        Magill Grain Store supplies a range of animal feed products for horse
        owners, livestock keepers, farmers and small acreage properties across
        Adelaide and South Australia. Our range includes horse feed, cattle
        feed, goat mix, sheep feed, calf milk replacers and other livestock
        feeding products.
      </>,
      <>
        Whether you care for horses, raise calves or manage goats and sheep,
        our team can help you check available products, bag sizes and feeding
        information.
      </>,
    ],
  },
  rangeTitle: "Explore Our Cattle and Horse Feed Range",
  choosing: {
    title: "Choosing the Right Livestock Feed",
    paragraphs: [
      <>
        Feed requirements vary according to species, age, body condition,
        activity level and production needs. Horses, cattle, goats, sheep and
        alpacas have different nutritional requirements, so a feed intended
        for one species should not automatically be used for another.
      </>,
      <>
        Review the manufacturer&apos;s feeding instructions and nutritional
        analysis before choosing a product. If you&apos;re unsure which option
        is suitable, contact Magill Grain Store for product information.
      </>,
    ],
  },
  local: {
    title: "Your Local Livestock Feed Supplier in Adelaide",
    paragraphs: [
      <>
        Visit Magill Grain Store at 574 Magill Road, Magill SA 5072 to explore
        our range of horse feed and livestock supplies. Contact us to confirm
        product availability, bag sizes and current prices before visiting.
      </>,
      <>
        Call <Tel /> for enquiries.
      </>,
    ],
  },
}
