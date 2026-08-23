import type { Metadata } from "next"
import { Instrument_Serif, Inter_Tight } from "next/font/google"
import "./globals.css"
import { SmoothScroll } from "@/components/SmoothScroll"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ScrollProgress } from "@/components/motion/ScrollProgress"
import { ScrollToTop } from "@/components/motion/ScrollToTop"
import { themeInitScript } from "@/components/ThemeToggle"
import { site } from "@/lib/site"

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-custom",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display-custom",
})

const description = `${site.tagline}. Grains, bird feed, animal feed, fertilizers, hay, garden supplies, poultry feeders and poultry medicine at ${site.address}.`

export const metadata: Metadata = {
  metadataBase: new URL("https://magillgrainsstore.com.au"),
  title: {
    default: `${site.name} — Quality Poultry, Bird Grains and Animal Feed`,
    template: `%s | ${site.name}`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    title: `${site.name} — Quality Poultry, Bird Grains and Animal Feed`,
    description,
  },
  twitter: { card: "summary_large_image" },
}

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${interTight.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-surface font-sans text-ink-body">
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
      </body>
    </html>
  )
}
