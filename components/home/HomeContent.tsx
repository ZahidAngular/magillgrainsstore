"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Phone,
  Sparkles,
  Truck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Counter } from "@/components/Counter"
import { Monogram } from "@/components/Monogram"
import { ProductGrid } from "@/components/ProductGrid"
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton"
import { getAllProducts, type Product } from "@/lib/shop"
import { Line } from "@/components/motion/LineReveal"
import { Magnetic } from "@/components/motion/Magnetic"
import { Marquee } from "@/components/motion/Marquee"
import { Parallax } from "@/components/motion/Parallax"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal"
import { ScrollHighlight } from "@/components/motion/ScrollHighlight"
import {
  offerings,
  pillars,
  ranges,
  records,
  services,
  site,
  testimonials,
} from "@/lib/site"

const pillarIcons = [BadgeCheck, Leaf, Sparkles]

const badges = [
  { icon: Truck, title: "Doorstep Delivery", body: "Across Adelaide's eastern suburbs." },
  { icon: BadgeCheck, title: "Quality Assured", body: "Every batch checked before dispatch." },
  { icon: Leaf, title: "Farm Direct", body: "Straight from expert Australian growers." },
]

export function HomeContent() {
  const [featured, setFeatured] = useState<Product[] | null>(null)

  // "Featured" is simply the first few products the store has ordered to the
  // top of the catalogue — sortOrder is editable in the dashboard. Fetched in
  // the browser so a reorder shows up on the next visit, not the next deploy.
  useEffect(() => {
    let active = true
    getAllProducts().then((products) => {
      if (active) setFeatured(products.slice(0, 6))
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <main className="bg-surface">
      <Hero />

      <Marquee items={ranges.map((r) => `${r} range in stock`)} />

      {/* ── Editorial statement: words light up on scroll ─────────────── */}
      <section className="bg-surface py-24 md:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal from="up">
            <span className="flex items-center gap-3">
              <span className="h-px w-10 rule-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
                Since 1998 · Magill, South Australia
              </span>
            </span>
          </Reveal>
          <ScrollHighlight
            className="display mt-10 text-[2.1rem] text-ink sm:text-5xl lg:text-[3.6rem]"
            text="We supply the grain, feed and farm goods that keep South Australian flocks, aviaries and paddocks in condition — sourced direct, checked by hand, priced without theatre."
          />
        </div>
      </section>

      {/* ── Featured: sticky editorial column + grid ─────────────────── */}
      <section className="bg-surface-2 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal from="right">
            <div className="lg:sticky lg:top-32">
              <span className="block h-px w-10 rule-gold" />
              <span className="mt-5 block text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
                Featured Products
              </span>
              <h2 className="display mt-5 text-4xl text-ink md:text-[3.2rem]">
                <Line inView index={0}>
                  Best sellers
                </Line>
                <Line inView index={1}>
                  <span className="display-italic text-accent-ink">from our store</span>
                </Line>
              </h2>
              <p className="mt-7 max-w-sm text-[17px] leading-relaxed text-ink-body">
                A snapshot of what our customers reorder most. Full pricing
                across every range sits on the product pages.
              </p>
              <Magnetic className="mt-10 inline-block">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 rounded-full bg-navy-900 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-navy-700"
                >
                  View All Products
                  <ArrowRight className="h-4 w-4 text-gold-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          {featured === null ? (
            <ProductGridSkeleton count={6} />
          ) : (
            <ProductGrid products={featured} columns="two" />
          )}
        </div>
      </section>

      {/* ── About: overlapping offset images ─────────────────────────── */}
      <section className="bg-surface-3 py-20 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <Reveal from="right" className="relative">
            <Parallax
              distance={28}
              className="relative aspect-[4/3] w-[86%] overflow-hidden rounded-[2rem] border border-line bg-surface-2"
            >
              <Image
                src="/images/site/about-big.jpg"
                alt="Magill Grain Store produce"
                fill
                sizes="(max-width: 1024px) 86vw, 32rem"
                className="scale-105 object-cover"
              />
            </Parallax>
            {/* Typographic card, not a second photo — the only other assets are
                packshots, which read as clutter overlapping a lifestyle shot. */}
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-10 right-0 w-[46%] rounded-[1.6rem] border border-navy-900/10 bg-navy-900 px-7 py-7 shadow-2xl"
            >
              <p className="display text-[2.6rem] leading-none text-gold-400">
                8
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-navy-100">
                Supply categories in store
              </p>
            </motion.div>
          </Reveal>

          <div className="mt-16 lg:mt-0">
            <Reveal from="left">
              <span className="block h-px w-10 rule-gold" />
              <span className="mt-5 block text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
                About Us
              </span>
            </Reveal>
            <h2 className="display mt-5 text-4xl text-ink md:text-[3.4rem]">
              <Line inView index={0}>
                Dedicated to quality
              </Line>
              <Line inView index={1}>
                poultry &amp;{" "}
                <span className="display-italic text-accent-ink">premium feed</span>
              </Line>
            </h2>
            <Reveal from="left" delay={0.1}>
              <p className="mt-7 text-[17px] leading-relaxed text-ink-body">
                We are based in Magill and have spent decades supplying grain,
                feed and farm supplies to the local community. From backyard
                hens to commercial breeders, we stock the right feed at the
                right price and back it with honest, practical advice.
              </p>
            </Reveal>

            <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <StaggerItem key={s}>
                  <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3.5 text-sm font-semibold text-ink transition hover:border-gold-400 hover:shadow-sm">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-gold-500" />
                    {s}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal from="up" delay={0.1}>
              <Magnetic className="mt-11 inline-block">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-full bg-navy-900 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-navy-700"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 text-gold-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Offerings: full-bleed edge-to-edge tiles ─────────────────── */}
      <section className="bg-surface-2 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal from="up">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
              What We Offer
            </span>
          </Reveal>
          <h2 className="display mt-5 text-4xl text-ink md:text-[3.4rem]">
            <Line inView index={0}>
              Everything your flock
            </Line>
            <Line inView index={1}>
              <span className="display-italic">and garden needs</span>
            </Line>
          </h2>
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-navy-900/15 bg-navy-900/15 sm:grid-cols-2 lg:grid-cols-4">
            {offerings.map((item, i) => (
              <StaggerItem key={item.title}>
                <div className="group relative flex h-full flex-col justify-between gap-10 bg-surface p-8 transition duration-500 hover:bg-navy-900">
                  <span className="display text-2xl text-ink-muted transition duration-500 group-hover:text-gold-400">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="display text-[1.85rem] text-ink transition duration-500 group-hover:text-white">
                      {item.title}
                    </h3>
                    <span className="mt-4 block h-[3px] w-10 rounded-full bg-gold-500 transition-all duration-500 group-hover:w-24" />
                    <p className="mt-5 text-sm leading-relaxed text-ink-body transition duration-500 group-hover:text-navy-100">
                      {item.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Pillars: numbered editorial list ─────────────────────────── */}
      <section className="bg-surface-3 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal from="up" className="max-w-2xl">
            <span className="block h-px w-10 rule-gold" />
            <span className="mt-5 block text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
              Why Magill
            </span>
          </Reveal>
          <h2 className="display mt-5 max-w-3xl text-4xl text-ink md:text-[3.4rem]">
            <Line inView index={0}>
              Three things we never
            </Line>
            <Line inView index={1}>
              <span className="display-italic text-accent-ink">compromise on</span>
            </Line>
          </h2>

          <Stagger className="mt-16 divide-y divide-line border-y border-line">
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[i]
              return (
                <StaggerItem key={pillar.title}>
                  <div className="group grid gap-6 py-11 md:grid-cols-[6rem_1fr_1.3fr] md:items-start md:gap-10">
                    <span className="display text-5xl tabular-nums text-ink-muted transition duration-500 group-hover:text-accent-ink">
                      0{i + 1}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-400 transition duration-500 group-hover:bg-gold-400 group-hover:text-navy-990">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="display text-[1.75rem] text-ink">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-[17px] leading-relaxed text-ink-body">
                      {pillar.body}
                    </p>
                  </div>
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>
      </section>

      {/* ── Records ──────────────────────────────────────────────────── */}
      <section className="mesh-navy relative overflow-hidden py-24 md:py-28">
        <div className="grain-texture absolute inset-0" />
        {/* Kept very low — at 0.13 the rooster read as a photo competing with
            the headline rather than as background texture. */}
        <Parallax distance={55} className="absolute inset-0">
          <Image
            src="/images/site/records-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="scale-125 object-cover opacity-[0.05] blur-[2px]"
          />
        </Parallax>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal from="up">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
                Our Records
              </span>
            </Reveal>
            <h2 className="display mt-5 text-4xl text-white md:text-[3.4rem]">
              <Line inView index={0}>
                Excellence documented
              </Line>
            </h2>
          </div>

          <Stagger className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {records.map((record) => (
              <StaggerItem key={record.label}>
                <div className="rounded-2xl border border-white/10 bg-surface-2/[0.04] px-6 py-10 text-center backdrop-blur transition duration-500 hover:border-gold-400/40 hover:bg-surface-2/[0.08]">
                  <p className="display text-6xl text-gold-400">
                    <Counter value={record.value} suffix={record.suffix} />
                  </p>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-navy-200">
                    {record.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="bg-surface-2 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal from="up">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
                Testimonials
              </span>
            </Reveal>
            <h2 className="display mt-5 text-4xl text-ink md:text-[3.4rem]">
              <Line inView index={0}>
                What people say
              </Line>
              <Line inView index={1}>
                <span className="display-italic text-accent-ink">about us</span>
              </Line>
            </h2>
          </div>

          <Stagger className="mt-16 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-9 transition duration-500 hover:-translate-y-2 hover:border-gold-400/60 hover:bg-surface-2 hover:shadow-[0_34px_80px_-46px_rgba(0,19,119,0.65)]">
                  <span
                    aria-hidden
                    className="display text-6xl leading-none text-gold-500"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="-mt-3 flex-1 text-[17px] leading-relaxed text-ink-body">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                    <Monogram name={t.name} />
                    <span>
                      <span className="block text-sm font-bold text-ink">
                        {t.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-muted">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="mesh-navy relative overflow-hidden py-20 md:py-24">
        <div className="grain-texture absolute inset-0" />
        <Reveal
          from="up"
          className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 text-center lg:flex-row lg:text-left"
        >
          <div>
            <h2 className="display text-4xl text-white md:text-[3rem]">
              Need feed today?
            </h2>
            <p className="mt-4 text-[17px] text-navy-200">
              Open six days a week. Call {site.phone} or visit {site.address}.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Magnetic>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-4 text-sm font-bold uppercase tracking-wide text-navy-990 transition hover:bg-gold-300"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Magnetic>
            <Magnetic>
              <Link
                href="/contact-us"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:border-white/40 hover:bg-surface-2/5"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 text-gold-400 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </main>
  )
}

/* ──────────────────────────────────────────────────────────────────── */

type Slide = {
  id: string
  kicker: string
  /** The middle line is set in the gold italic, as on the original hero. */
  lines: [string, string, string]
  body: string
  cta: { label: string; href: string }
  image: string
  /** CSS object-position for photos that need cropping to the 16:10 frame. */
  position?: string
  alt: string
}

const slides: Slide[] = [
  {
    id: "welcome",
    kicker: `Welcome to ${site.name}`,
    lines: ["Quality Poultry,", "Bird Seeds, Grains", "and Premium Animal feed"],
    body: `${site.tagline}. Trusted by South Australian farmers, breeders and backyard flock keepers — sourced fresh, priced fairly, stocked daily at 574 Magill Road.`,
    cta: { label: "Browse Products", href: "/products" },
    image: "/images/site/chickens.jpg",
    alt: "Free range chickens at an Australian farm",
  },
  {
    id: "grains",
    kicker: "Grains & Poultry Feed",
    lines: ["Fresh Grain,", "Feed & Pellets", "by the Bag"],
    body: "Lupins, barley, wheat and maize from 1KG to 20KG, plus starter, grower, layer and finisher pellets for every stage of the flock.",
    cta: { label: "Shop Grains", href: "/shop/grains" },
    image: "/images/site/about-big.jpg",
    // A square photo in a 16:10 frame: keep the hen and the eggs, trim the rafters.
    position: "50% 100%",
    alt: "A hen resting on a nest box of eggs in a sunlit barn",
  },
  {
    id: "birds",
    kicker: "Bird Seed",
    lines: ["Seed Mixes for", "Every Bird,", "Big and Small"],
    body: "Budgie, canary, finch, parrot and pigeon mixes, plus hand-rearing formulas and specialist nutrition.",
    cta: { label: "Shop Bird Seed", href: "/shop/bird-seed" },
    image: "/images/site/hero-birds.jpg",
    alt: "A blue and yellow macaw",
  },
]

const SLIDE_MS = 6500

const arrowButton =
  "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-navy-990/40 text-white backdrop-blur transition hover:border-gold-400 hover:bg-gold-400 hover:text-navy-990"

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const touchStartX = useRef<number | null>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const go = useCallback((step: number) => {
    setIndex((i) => (i + step + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  // One timeout per slide, so a manual click restarts the full interval
  // instead of flipping again a moment later.
  useEffect(() => {
    if (paused || reducedMotion) return
    const timer = setTimeout(() => go(1), SLIDE_MS)
    return () => clearTimeout(timer)
  }, [index, paused, reducedMotion, go])

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const dx = e.changedTouches[0].clientX - touchStartX.current
        touchStartX.current = null
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
      }}
      className="mesh-navy relative overflow-hidden"
    >
      <div className="grain-texture absolute inset-0" />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-navy-700/40 blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-16 lg:pb-24 lg:pt-28">
        <motion.div style={{ y: copyY, opacity: copyOpacity }}>
          {/*
           * Every slide's copy sits in the same grid cell, so the hero is always
           * as tall as the tallest slide and the page below never jumps when
           * the slide changes. Only the active one is visible, focusable, and
           * the page's <h1>.
           */}
          <div className="grid">
            {slides.map((slide, i) => {
              const active = i === index
              const Heading = active ? "h1" : "div"
              return (
                <div
                  key={slide.id}
                  aria-hidden={!active}
                  className={cn(
                    "[grid-area:1/1] transition-[opacity,visibility] duration-500",
                    active ? "opacity-100" : "pointer-events-none invisible opacity-0"
                  )}
                >
                  <div key={active ? "on" : "off"}>
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="flex items-center gap-3"
                    >
                      <span className="h-px w-10 rule-gold" />
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
                        {slide.kicker}
                      </span>
                    </motion.div>

                    <Heading className="display mt-9 text-[3.1rem] text-white sm:text-[4.4rem] lg:text-[5.6rem]">
                      <Line index={0}>{slide.lines[0]}</Line>
                      <Line index={1}>
                        <span className="display-italic text-gold-400">
                          {slide.lines[1]}
                        </span>
                      </Line>
                      <Line index={2}>{slide.lines[2]}</Line>
                    </Heading>

                    <motion.p
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.6 }}
                      className="mt-9 max-w-xl text-[17px] leading-relaxed text-navy-200"
                    >
                      {slide.body}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.75 }}
                      className="mt-11 flex flex-wrap items-center gap-4"
                    >
                      <Magnetic>
                        <Link
                          href={slide.cta.href}
                          className="group inline-flex items-center gap-2 rounded-full bg-gold-400 px-9 py-4.5 text-sm font-bold uppercase tracking-wide text-navy-990 transition hover:bg-gold-300"
                        >
                          {slide.cta.label}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Magnetic>
                      <Magnetic>
                        <a
                          href={site.phoneHref}
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-9 py-4.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition hover:border-white/40 hover:bg-surface-2/5"
                        >
                          <Phone className="h-4 w-4 text-gold-400" />
                          {site.phone}
                        </a>
                      </Magnetic>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/*
         * The source photo is 1080x675. Cropping it to a tall portrait threw
         * away most of those pixels and upscaled the rest, which is why it read
         * as blurry. Holding close to the native 16:10 and capping the column
         * at 30rem keeps it near 1:1 with the source even at DPR 2.
         */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 34 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[30rem] space-y-4"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-white/10">
            <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
              {slides.map((slide, i) => (
                <div
                  key={slide.id}
                  aria-hidden={i !== index}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-[900ms] ease-out",
                    i === index ? "opacity-100" : "opacity-0"
                  )}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 90vw, 30rem"
                    style={slide.position ? { objectPosition: slide.position } : undefined}
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-990/60 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="rounded-[1.75rem] border border-white/10 bg-surface-2/[0.04] px-7 py-6 backdrop-blur-xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-400">
              Open six days
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {site.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span className="text-white">{h.day}</span>
                  <span className="text-navy-200">{h.time}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Left / right arrows, in the gutters on desktop. */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className={cn(arrowButton, "absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 lg:grid")}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next slide"
          className={cn(arrowButton, "absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 lg:grid")}
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots, with the arrows flanking them on smaller screens. */}
        <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className={cn(arrowButton, "lg:hidden")}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-500",
                  i === index ? "w-8 bg-gold-400" : "w-2.5 bg-white/30 hover:bg-white/60"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className={cn(arrowButton, "lg:hidden")}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <Stagger className="mx-auto grid max-w-7xl divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {badges.map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title}>
              <div className="flex items-start gap-4 py-8 sm:px-8">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400/12 text-gold-400">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-white">
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-navy-200">{body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
