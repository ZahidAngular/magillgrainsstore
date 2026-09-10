import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BadgeCheck } from "lucide-react"
import { PageHero } from "@/components/PageHero"
import { Counter } from "@/components/Counter"
import { Parallax } from "@/components/motion/Parallax"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal"
import { pillars, records, services, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "We are based in Magill. Our services include grains, bird feed, animal feed, fertilizers, hay and mulch, garden supplies, poultry feeders and poultry medicine.",
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About Us"
        description="We are based in Magill, supplying quality grain, feed and farm supplies to South Australia."
      />

      <section className="overflow-hidden bg-surface-2 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <Reveal from="right">
            <Parallax distance={34} className="overflow-hidden rounded-3xl border border-line">
              <Image
                src="/images/site/about-big.png"
                alt="Magill Grain Store"
                width={900}
                height={700}
                className="h-full w-full scale-110 object-cover"
              />
            </Parallax>
          </Reveal>

          <div>
            <Reveal from="left">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-accent-ink">
                Who We Are
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                Dedicated to Quality Poultry and Premium Pet Food
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-body">
                We are based in Magill. From backyard hens to commercial
                breeders, our shelves carry the grains, pellets, feeders and
                garden supplies that keep South Australian animals healthy — all
                backed by honest, practical advice from people who know the
                products.
              </p>
              <h3 className="mt-10 text-sm font-extrabold uppercase tracking-[0.18em] text-ink">
                Our services include
              </h3>
            </Reveal>

            <Stagger className="mt-5 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <StaggerItem key={s}>
                  <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-3 px-4 py-3 text-sm font-semibold text-ink transition hover:border-gold-400 hover:bg-surface-2">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-gold-500" />
                    {s}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="bg-surface-3 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Stagger className="grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div className="group h-full rounded-2xl border border-line bg-surface-2 p-8 transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_-40px_rgba(0,19,119,0.6)]">
                  <h3 className="text-xl font-extrabold text-ink">
                    {pillar.title}
                  </h3>
                  <span className="mt-3 block h-1 w-10 rounded-full bg-gold-400 transition-all duration-500 group-hover:w-20" />
                  <p className="mt-5 text-sm leading-relaxed text-ink-body">
                    {pillar.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mesh-navy relative overflow-hidden py-16">
        <div className="grain-texture absolute inset-0" />
        <Stagger className="relative mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {records.map((record) => (
            <StaggerItem key={record.label}>
              <div className="text-center">
                <p className="text-4xl font-extrabold text-gold-400">
                  <Counter value={record.value} suffix={record.suffix} />
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-navy-100">
                  {record.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-surface-2 py-20">
        <Reveal
          from="up"
          className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center"
        >
          <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
            Visit us at {site.address}
          </h2>
          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-navy-700"
          >
            Contact Us
            <ArrowRight className="h-4 w-4 text-gold-400 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
