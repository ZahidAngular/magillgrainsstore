import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { site } from "@/lib/site"

export default function NotFound() {
  return (
    <main className="mesh-navy relative flex min-h-[70vh] items-center overflow-hidden">
      <div className="grain-texture absolute inset-0" />
      <div className="relative mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-[6rem] font-extrabold leading-none text-gold-400 md:text-[8rem]">
          404
        </p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          This page has flown the coop
        </h1>
        <p className="mt-5 text-base leading-relaxed text-navy-200">
          The page you were after doesn&apos;t exist any more. Head back to the
          product range, or give us a call and we&apos;ll point you the right
          way.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-navy-990 transition hover:bg-gold-300"
          >
            Back to home
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:border-white/40 hover:bg-white/5"
          >
            <Phone className="h-4 w-4 text-gold-400" />
            {site.phone}
          </a>
        </div>
      </div>
    </main>
  )
}
