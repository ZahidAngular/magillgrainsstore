"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/orders"
import { cn } from "@/lib/utils"

/**
 * Header shortcut back to the cart. Only a handful of products can be bought
 * online and the rest of the site is call-or-visit, so it stays out of the way
 * until something is in the cart — an empty cart icon on every page would make
 * the whole site read as a web shop.
 */
export function CartButton({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const cart = useCart()
  const count = cart?.reduce((sum, l) => sum + l.quantity, 0) ?? 0
  if (count === 0) return null

  const badge = count > 99 ? "99+" : String(count)

  return (
    <Link
      href="/checkout"
      onClick={onNavigate}
      aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
      className={cn(
        "relative grid h-11 w-11 place-items-center rounded-lg border border-line text-ink transition hover:bg-surface-3",
        className
      )}
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold-400 px-1 text-[11px] font-extrabold leading-none text-navy-990 shadow-sm">
        {badge}
      </span>
    </Link>
  )
}
