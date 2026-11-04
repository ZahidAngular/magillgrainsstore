import type { Metadata } from "next"
import { Instrument_Serif, Inter_Tight } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { themeInitScript } from "@/components/ThemeToggle"
import { homeDescription, homeTitle } from "@/lib/seo"
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

const description = homeDescription

export const metadata: Metadata = {
  metadataBase: new URL("https://magillgrainstore.com.au"),
  title: {
    default: homeTitle,
    template: `%s | ${site.name}`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    title: homeTitle,
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
      <body className="bg-surface font-sans text-ink-body">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CGVW1CNXQE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CGVW1CNXQE');`}
        </Script>
      </body>
    </html>
  )
}
