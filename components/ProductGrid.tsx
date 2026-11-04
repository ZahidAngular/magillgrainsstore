"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Phone, Wheat } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { BuyNowButton } from "@/components/BuyNowButton"
import type { Product } from "@/lib/api"
import { canBuyOnline } from "@/lib/orders"
import { cardExtra, type CardExtra } from "@/lib/productPages"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * The card's footer: label plus round icon, all one link. Its ::after stretches
 * over the whole card (the article is `relative`), so the card, the label and
 * the arrow all open the same thing.
 */
function CardAction({ extra, buy }: { extra: CardExtra; buy?: React.ReactNode }) {
  // A product that can be bought online swaps the round arrow for a Buy now
  // pill. A button can't sit inside the link, so the label stays the link (its
  // ::after still covers the card) and the pill sits beside it, above the cover.
  if (buy && extra.action.kind === "page") {
    return (
      <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
        <Link
          href={extra.action.href}
          className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors duration-300 after:absolute after:inset-0 after:z-10 after:content-[''] group-hover:decoration-gold-400"
        >
          {extra.action.label}
        </Link>
        {buy}
      </div>
    )
  }

  const className =
    "mt-auto flex items-center justify-between gap-4 border-t border-line pt-5 after:absolute after:inset-0 after:z-10 after:content-['']"
  const content = (
    <>
      <span className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors duration-300 group-hover:decoration-gold-400">
        {extra.action.label}
      </span>
      <span
        aria-hidden
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy-900 text-gold-400 shadow-[0_10px_24px_-12px_rgba(0,19,119,0.8)] transition duration-500 group-hover:bg-gold-400 group-hover:text-navy-990"
      >
        {extra.action.kind === "page" ? (
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
        ) : (
          <Phone className="h-4 w-4" />
        )}
      </span>
    </>
  )

  return extra.action.kind === "page" ? (
    <Link href={extra.action.href} className={className}>
      {content}
    </Link>
  ) : (
    <a href={extra.action.href} className={className}>
      {content}
    </a>
  )
}

const columnClasses = {
  two: "sm:grid-cols-2",
  four: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const

export function ProductGrid({
  products,
  columns = "four",
  highlightId,
}: {
  products: Product[]
  columns?: keyof typeof columnClasses
  /** A product to call out after arriving from search — glows green, then fades. */
  highlightId?: number | null
}) {
  // Several products can glow at once — clicking a new search result must not
  // cut short one that's already mid-glow, so each id keeps its own 2-minute
  // timer rather than one shared "currently highlighted" value.
  const [highlighted, setHighlighted] = useState<Set<number>>(new Set())
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())
  const scrolledFor = useRef<number | null>(null)

  useEffect(() => {
    if (!highlightId) return

    const existing = timers.current.get(highlightId)
    if (existing) clearTimeout(existing)

    setHighlighted((prev) => new Set(prev).add(highlightId))

    const timer = setTimeout(() => {
      setHighlighted((prev) => {
        const next = new Set(prev)
        next.delete(highlightId)
        return next
      })
      timers.current.delete(highlightId)
    }, 120_000)
    timers.current.set(highlightId, timer)
  }, [highlightId])

  useEffect(() => {
    const allTimers = timers.current
    return () => {
      allTimers.forEach((t) => clearTimeout(t))
    }
  }, [])

  useEffect(() => {
    if (!highlightId || scrolledFor.current === highlightId) return
    const el = document.getElementById(`product-${highlightId}`)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
      scrolledFor.current = highlightId
    }
  }, [highlightId, products])

  return (
    <div className={cn("grid gap-6", columnClasses[columns])}>
      {products.map((product, i) => {
        const extra = cardExtra(product.name)
        const isHighlighted = highlighted.has(product.productId)
        return (
        <motion.article
          key={product.productId}
          id={`product-${product.productId}`}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.55,
            delay: Math.min(i, 7) * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-2 transition duration-500 hover:-translate-y-2 hover:border-gold-400/60 hover:shadow-[0_34px_80px_-46px_rgba(0,19,119,0.65)]",
            isHighlighted &&
              "border-green-500 ring-2 ring-green-500/60 hover:border-green-500"
          )}
        >
          {/* Deliberately light in both themes: photos with a white backdrop are
              the common case, so a dark tile would ring each one with a halo. */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-bone-100 to-white">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={`${product.name} – ${product.category} at ${site.name}`}
                title={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover transition duration-[900ms] ease-out group-hover:scale-[1.07]"
              />
            ) : (
              <div className="grid h-full place-items-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-surface-2 text-ink-muted shadow-sm transition duration-500 group-hover:text-gold-500">
                  <Wheat className="h-9 w-9" />
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-4 border-t border-line p-6">
            <h3 className="text-base font-bold leading-snug text-ink">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-[13px] leading-relaxed text-ink-body">
                {product.description}
              </p>
            )}

            {/*
             * Priced pack sizes read as a small list — the store sells the same
             * product in several bags at different prices. Lines the store has
             * never priced show their own wording instead.
             *
             * Nothing is invented to fill a gap: a size left blank in the price
             * list stays blank, and a product with neither sizes nor wording
             * shows no price line at all. The site has to read exactly like the
             * store's spreadsheets.
             *
             * Deliberately top-aligned: the list length varies from one to five
             * rows, and pushing it to the bottom of an equal-height card left a
             * gap between the name and its prices on the shorter ones.
             */}
            <div>
              {product.sizes.length > 0 ? (
                <ul className="space-y-1.5">
                  {product.sizes.map((s) => (
                    <li
                      key={s.productSizeId ?? `${s.size}-${s.priceType}`}
                      className="flex items-baseline justify-between gap-3 text-[14px]"
                    >
                      <span className="font-semibold text-ink-body">
                        {s.size}
                      </span>
                      <span className="font-extrabold text-accent-ink">
                        ${s.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : product.priceNote ? (
                <p className="text-[15px] font-extrabold leading-snug text-accent-ink">
                  {product.priceNote}
                </p>
              ) : null}
            </div>

            {/* The whole card is the link; the footer makes that obvious. Only
                products that can be bought online get the Buy now pill. */}
            {extra && (
              <CardAction
                extra={extra}
                buy={canBuyOnline(product) ? <BuyNowButton product={product} compact /> : null}
              />
            )}
          </div>
        </motion.article>
        )
      })}
    </div>
  )
}
