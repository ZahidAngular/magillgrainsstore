import type { Metadata } from "next"
import { Instrument_Serif, Inter_Tight } from "next/font/google"
import "./globals.css"
import { themeInitScript } from "@/components/ThemeToggle"
import { site } from "@/lib/site"

/**
 * Document shell only — fonts, theme boot and metadata. The public site's
 * header, footer and scroll furniture live in app/(site)/layout.tsx so the
 * sign-in and dashboard screens can render without them.
 */

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
    default: `${site.name} — Quality Poultry, Bird Seeds, Grains and Premium Animal feed`,
    template: `%s | ${site.name}`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    title: `${site.name} — Quality Poultry, Bird Seeds, Grains and Premium Animal feed`,
    description,
  },
  twitter: { card: "summary_large_image" },
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
      <body className="bg-surface font-sans text-ink-body">{children}</body>
    </html>
  )
}
