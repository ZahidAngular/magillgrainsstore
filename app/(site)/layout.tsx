import { SmoothScroll } from "@/components/SmoothScroll"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ScrollProgress } from "@/components/motion/ScrollProgress"
import { ScrollToTop } from "@/components/motion/ScrollToTop"
import { site } from "@/lib/site"

/**
 * Chrome for the public website only. The sign-in and dashboard screens live
 * outside this group, so they render on the bare root layout without the
 * header, footer or scroll furniture.
 */

const description = `${site.tagline}. Grains, bird feed, animal feed, fertilizers, hay, garden supplies, poultry feeders and poultry medicine at ${site.address}.`

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description,
  telephone: site.phone,
  email: site.email,
  url: "https://magillgrainsstore.com.au",
  address: {
    "@type": "PostalAddress",
    streetAddress: "574 Magill Road",
    addressLocality: "Magill",
    addressRegion: "SA",
    postalCode: "5072",
    addressCountry: "AU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "12:00",
    },
  ],
}

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>
      <SmoothScroll>
        <ScrollProgress />
        <Header />
        <div id="content">{children}</div>
        <Footer />
        <ScrollToTop />
      </SmoothScroll>
    </>
  )
}
