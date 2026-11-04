"use client"

import { useRouter } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import type { Product } from "@/lib/api"
import { addToCart, canBuyOnline } from "@/lib/orders"

/**
 * Adds the product to the order and goes straight to the checkout. Renders
 * nothing for a product that can't be bought online, so a card or page can drop
 * it in without checking first.
 *
 * Sits above the product card's stretched link (z-20 over its z-10), so a click
 * here buys rather than opening the card.
 */
export function BuyNowButton({
  product,
  className = "",
  compact = false,
}: {
  product: Product
  className?: string
  /** A smaller pill that sits in a row, instead of the full-width button. */
  compact?: boolean
}) {
  const router = useRouter()
  if (!canBuyOnline(product)) return null

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(product)
        router.push("/checkout")
      }}
      className={`relative z-20 inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 font-extrabold uppercase text-navy-990 transition hover:bg-gold-500 ${
        compact
          ? "shrink-0 px-5 py-3 text-xs tracking-[0.12em]"
          : "w-full px-6 py-3.5 text-[13px] tracking-[0.14em]"
      } ${className}`}
    >
      <ShoppingBag className="h-4 w-4" />
      Buy now
    </button>
  )
}
