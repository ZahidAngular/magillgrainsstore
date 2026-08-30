import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, Mail, MapPin, Phone, Printer } from "lucide-react"
import { PageHero } from "@/components/PageHero"
import { BrandStrip } from "@/components/BrandStrip"
import { Magnetic } from "@/components/motion/Magnetic"
import { Parallax } from "@/components/motion/Parallax"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal"
import {
  fullHours,
  gardenCategories,
  gardenClosing,
  gardenIntro,
  gardenProductsLead,
  site,
  socials,
  storeContact,
} from "@/lib/site"

export const metadata: Metadata = {
  title: "Garden Products",
  description:
    "Fertilizers, manure, potting mixes and vegetable seeds — mulch, fertilisers and potting mix for the garden of your dreams.",
}

export default function GardenSuppliesPage() {
  return (
    <main className="bg-surface">
      {/* No hero description: the store's opening paragraph carries the page
          and is set below at reading size — repeating it here duplicated it. */}
      <PageHero eyebrow="Garden Products" title="Garden Products" />

      {/* ── Intro: store's own copy beside their own garden photograph ──── */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div>
            <Reveal from="right">
              <span className="block h-px w-10 rule-gold" />
              <span className="mt-5 block text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
                Your Backyard, Sorted
              </span>
            </Reveal>
            {gardenIntro.map((para, i) => (
              <Reveal key={i} from="right" delay={0.08 * (i + 1)}>
                <p className="mt-7 text-[17px] leading-relaxed text-ink-body">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal from="left">
            <Parallax
              distance={30}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-surface-3"
            >
              <Image
                src="/images/garden/garden-hero.jpg"
                alt="Garden products at Magill Grain Store"
                fill
                sizes="(max-width: 1024px) 100vw, 34rem"
                className="scale-105 object-cover"
              />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* ── Products lead-in ───────────────────────────────────────────── */}
      <section className="bg-surface-2 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal from="up" className="mx-auto max-w-3xl text-center">
            <span className="mx-auto block h-px w-10 rule-gold" />
            <h2 className="display mt-6 text-4xl text-ink md:text-[3.2rem]">
              Products
            </h2>
            <p className="mt-7 text-[17px] leading-relaxed text-ink-body">
              {gardenProductsLead}
            </p>
          </Reveal>

          <Stagger className="mt-16 grid gap-6 lg:grid-cols-3">
            {gardenCategories.map((cat) => (
              <StaggerItem key={cat.title}>
                <article className="group h-full rounded-[1.6rem] border border-line bg-surface p-9 transition duration-500 hover:-translate-y-2 hover:border-gold-400 hover:shadow-[0_30px_70px_-40px_rgba(0,19,119,0.5)]">
                  <h3 className="display text-[2rem] text-ink">{cat.title}</h3>
                  <span className="mt-4 block h-px w-10 rule-gold transition-all duration-500 group-hover:w-20" />
                  <p className="mt-6 text-[15px] leading-relaxed text-ink-body">
                    {cat.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Closing statement ──────────────────────────────────────────── */}
      <section className="mesh-navy relative overflow-hidden py-20 md:py-24">
        <div className="grain-texture absolute inset-0" />
        <Reveal
          from="up"
          className="relative mx-auto max-w-4xl px-6 text-center"
        >
          <p className="display text-[1.9rem] leading-snug text-white sm:text-4xl">
            {gardenClosing}
          </p>
          <Magnetic className="mt-10 inline-block">
            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-4 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-gold-300"
            >
              Talk To Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </Reveal>
      </section>

      <BrandStrip />

      {/* ── Contact + hours, exactly as the store publishes them ────────── */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
          <Reveal from="right">
            <div className="h-full rounded-[1.6rem] border border-line bg-surface-2 p-9">
              <span className="block h-px w-10 rule-gold" />
              <h2 className="display mt-6 text-[2.2rem] text-ink">
                Contact Us
              </h2>

              <ul className="mt-8 space-y-6 text-[15px]">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <a
                    href={site.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-ink transition hover:text-accent-ink"
                  >
                    {storeContact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </a>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <span className="text-ink-body">
                    P:{" "}
                    <a
                      href={site.phoneHref}
                      className="font-semibold text-ink transition hover:text-accent-ink"
                    >
                      {storeContact.phone}
                    </a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <Printer className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <span className="text-ink-body">
                    F: <span className="font-semibold text-ink">{storeContact.fax}</span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <span className="text-ink-body">
                    E:{" "}
                    <a
                      href={`mailto:${storeContact.email}`}
                      className="break-all font-semibold text-ink transition hover:text-accent-ink"
                    >
                      {storeContact.email}
                    </a>
                  </span>
                </li>
              </ul>

              <div className="mt-9 flex flex-wrap gap-3 border-t border-line pt-7">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-line px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition hover:border-gold-400 hover:text-accent-ink"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal from="left">
            <div className="h-full rounded-[1.6rem] border border-line bg-surface-2 p-9">
              <span className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gold-500" />
                <span className="h-px w-10 rule-gold" />
              </span>
              <h2 className="display mt-6 text-[2.2rem] text-ink">Hours</h2>

              <ul className="mt-8 divide-y divide-line text-[15px]">
                {fullHours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-baseline justify-between gap-6 py-4"
                  >
                    <span className="font-semibold text-ink">{h.day}</span>
                    <span
                      className={
                        h.time === "Closed"
                          ? "text-ink-muted"
                          : "text-ink-body"
                      }
                    >
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
