import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal"
import type { Block, Faq } from "@/lib/livestock"
import { site } from "@/lib/site"

/*
 * The building blocks shared by the Livestock category page and its product
 * pages, so the two read as one section of the site.
 */

export function SectionHeading({
  children,
  light,
  center,
}: {
  children: string
  light?: boolean
  center?: boolean
}) {
  return (
    <>
      <h2 className={`text-3xl font-extrabold tracking-tight md:text-4xl ${light ? "text-white" : "text-ink"}`}>
        {children}
      </h2>
      <span className={`mt-5 block h-1 w-14 rounded-full bg-gold-400 ${center ? "mx-auto" : ""}`} />
    </>
  )
}

/** Heading plus body copy on a card with a gold rule — for a single block of prose. */
export function ProseSection({
  title,
  paragraphs,
  aside,
  className = "bg-surface-3",
}: {
  title: string
  paragraphs: ReactNode[]
  /** Optional callout beside the prose. */
  aside?: ReactNode
  className?: string
}) {
  return (
    <section className={`${className} py-20 md:py-24`}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal from="up" className="max-w-3xl">
          <SectionHeading>{title}</SectionHeading>
        </Reveal>

        <div className={`mt-10 grid gap-6 ${aside ? "lg:grid-cols-5" : "max-w-4xl"}`}>
          <Reveal from="up" className={aside ? "lg:col-span-3" : undefined}>
            <div className="h-full space-y-5 rounded-2xl border border-line border-l-4 border-l-gold-400 bg-surface-2 p-8 text-base leading-relaxed text-ink-body md:text-[17px]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
          {aside && (
            <Reveal from="up" delay={0.1} className="lg:col-span-2">
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

/** Three numbered cards with an icon each. `tint` swaps the section and card backgrounds. */
export function FeatureCards({
  title,
  items,
  tint,
}: {
  /** Omit when the heading above this block already covers it. */
  title?: string
  items: Block[]
  tint?: boolean
}) {
  return (
    <section className={`${tint ? "bg-surface-3" : "bg-surface-2"} py-20 md:py-28`}>
      <div className="mx-auto max-w-7xl px-6">
        {title && (
          <Reveal from="up" className="max-w-3xl">
            <SectionHeading>{title}</SectionHeading>
          </Reveal>
        )}

        <Stagger className={`mt-12 grid gap-6 ${items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {items.map((item, i) => (
            <StaggerItem key={item.title} className="h-full">
              <div className={`group relative h-full overflow-hidden rounded-2xl border border-line ${tint ? "bg-surface-2" : "bg-surface-3"} p-8 transition duration-500 hover:-translate-y-2 hover:border-gold-400/60 hover:shadow-[0_30px_70px_-40px_rgba(0,19,119,0.6)]`}>
                <span className="absolute right-6 top-5 text-5xl font-extrabold text-ink/5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-gold-400 transition duration-500 group-hover:bg-gold-400 group-hover:text-navy-990">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-extrabold text-ink">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-gold-400"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-body md:text-[15px]">{item.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/** The navy "why buy from us" band. */
export function ReasonsBand({ title, items }: { title: string; items: Block[] }) {
  return (
    <section className="mesh-navy relative overflow-hidden py-20 md:py-28">
      <div className="grain-texture absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal from="up" className="max-w-3xl">
          <SectionHeading light>{title}</SectionHeading>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <div className="flex h-full gap-5 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition duration-500 hover:border-gold-400/50 hover:bg-white/10">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-400 text-navy-990">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-100 md:text-[15px]">{item.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/** FAQ accordion, first answer open, closing with the page's two next steps. */
export function FaqSection({
  title = "Frequently Asked Questions",
  faqs,
  back,
}: {
  title?: string
  faqs: Faq[]
  /** Where "back" goes; omitted on the category page itself. */
  back?: { label: string; href: string }
}) {
  return (
    <section className="bg-surface-2 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal from="up" className="text-center">
          <SectionHeading center>{title}</SectionHeading>
        </Reveal>

        {/* Two per row; items-start so opening one answer doesn't stretch its neighbour. */}
        <Stagger className="mt-12 grid items-start gap-4 md:grid-cols-2">
          {faqs.map((faq, i) => (
            <StaggerItem key={faq.q}>
              <details
                open={i === 0}
                className="group rounded-2xl border border-line bg-surface-3 transition open:border-gold-400/60 open:bg-surface-2 open:shadow-[0_24px_60px_-44px_rgba(0,19,119,0.6)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left text-base font-extrabold text-ink md:px-8 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-gold-500 transition duration-300 group-open:rotate-45 group-open:border-gold-400 group-open:bg-gold-400 group-open:text-navy-990">
                    <span className="text-xl leading-none">+</span>
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-ink-body md:px-8 md:text-[15px]">{faq.a}</p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal from="up" className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {back && (
            <Link
              href={back.href}
              className="group inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-ink transition hover:border-gold-400"
            >
              <ArrowLeft className="h-4 w-4 text-gold-500 transition-transform group-hover:-translate-x-1" />
              {back.label}
            </Link>
          )}
          <a
            href={site.phoneHref}
            className="group inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-navy-700"
          >
            Call {site.phone}
            <ArrowRight className="h-4 w-4 text-gold-400 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
