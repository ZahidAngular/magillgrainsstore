import Link from "next/link"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import { Reveal } from "@/components/motion/Reveal"
import { site } from "@/lib/site"

export function EnquiryPanel({ category }: { category: string }) {
  return (
    <section className="bg-surface-2 py-16 md:py-24">
      <Reveal from="up" className="mx-auto max-w-3xl rounded-3xl border border-line bg-surface-3 px-8 py-12 text-center">
        <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
          Stock changes weekly
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-body">
          Our {category} range moves quickly. Give us a call or drop in and
          we&apos;ll tell you exactly what&apos;s on the floor today.
        </p>
        <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
          <a
            href={site.phoneHref}
            className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 px-4 py-3 font-semibold text-ink transition hover:border-gold-400"
          >
            <Phone className="h-4 w-4 text-gold-500" />
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 px-4 py-3 font-semibold text-ink transition hover:border-gold-400"
          >
            <Mail className="h-4 w-4 text-gold-500" />
            Email us
          </a>
          <a
            href={site.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 px-4 py-3 font-semibold text-ink transition hover:border-gold-400"
          >
            <MapPin className="h-4 w-4 text-gold-500" />
            Visit store
          </a>
        </div>
        <Link
          href="/products"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-navy-700"
        >
          Back to all products
          <ArrowRight className="h-4 w-4 text-gold-400" />
        </Link>
      </Reveal>
    </section>
  )
}
