"use client"

/**
 * Buying online: the order being built in the browser, and placing it.
 *
 * Only some categories can be bought online so far — see ONLINE_CATEGORIES.
 * Everything else on the site stays a catalogue, exactly as before.
 *
 * What is never sent is a price. The browser says which product and how many;
 * the API looks the price up and works out the total, so the figures shown here
 * are a quote the server then confirms.
 */

import { useMemo, useSyncExternalStore } from "react"
import { ORDERS_API_ENABLED, SHOP_ENABLED } from "@/lib/shopFlag"
import { API_BASE, SITE_NAME, type ApiResponse, type Product } from "@/lib/api"

/** Categories whose products carry a Buy Now button. */
const ONLINE_CATEGORIES = ["livestock"]

/** The cart's quantity ceiling — matches what the API accepts per line. */
export const MAX_QUANTITY = 1000

/* ------------------------------------------------------------------ */
/* Which products can be bought                                        */
/* ------------------------------------------------------------------ */

/** The one priced size a product is sold at, or null when it can't be bought online. */
export function onlineSize(product: Product) {
  if (!ONLINE_CATEGORIES.includes(product.category.trim().toLowerCase())) return null
  if (!product.isActive) return null
  const priced = product.sizes.filter(
    (s) => s.price > 0 && (s.priceType ?? "RETAIL").toUpperCase() === "RETAIL"
  )
  // A product with several sizes would need a size picker; none has one yet.
  return priced.length === 1 && priced[0].productSizeId ? priced[0] : null
}

export const canBuyOnline = (product: Product) => SHOP_ENABLED && onlineSize(product) !== null

/* ------------------------------------------------------------------ */
/* The cart                                                            */
/* ------------------------------------------------------------------ */

export type CartLine = {
  productId: number
  productSizeId: number
  name: string
  size: string
  /** What one cost when it went in; the checkout refreshes it from the catalogue. */
  unitPrice: number
  quantity: number
}

const CART_KEY = "mgs.cart.v1"
const CART_EVENT = "mgs-cart-change"

const noLines: CartLine[] = []

function readRaw(): string {
  try {
    return window.localStorage.getItem(CART_KEY) ?? ""
  } catch {
    return ""
  }
}

function parseCart(raw: string): CartLine[] {
  if (!raw) return noLines
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return noLines
    return parsed.filter(
      (l): l is CartLine =>
        !!l &&
        typeof l.productId === "number" &&
        typeof l.productSizeId === "number" &&
        typeof l.name === "string" &&
        typeof l.unitPrice === "number" &&
        typeof l.quantity === "number" &&
        l.quantity > 0
    )
  } catch {
    return noLines
  }
}

function writeCart(lines: CartLine[]) {
  try {
    if (lines.length === 0) window.localStorage.removeItem(CART_KEY)
    else window.localStorage.setItem(CART_KEY, JSON.stringify(lines))
  } catch {
    // Private window or blocked site data: the cart just won't persist.
  }
  window.dispatchEvent(new Event(CART_EVENT))
}

function subscribe(onChange: () => void) {
  window.addEventListener(CART_EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(CART_EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

/**
 * The cart, read from this device. `undefined` until the browser has been
 * asked, so a page can tell "empty" from "not looked yet" and avoid flashing
 * an empty-cart message at someone who has items in it.
 */
export function useCart(): CartLine[] | undefined {
  const raw = useSyncExternalStore<string | null>(subscribe, readRaw, () => null)
  return useMemo(() => (raw === null ? undefined : parseCart(raw)), [raw])
}

export function addToCart(product: Product) {
  const size = onlineSize(product)
  if (!size?.productSizeId) return

  const lines = [...parseCart(readRaw())]
  const existing = lines.find((l) => l.productId === product.productId)
  if (existing) {
    existing.quantity = Math.min(existing.quantity + 1, MAX_QUANTITY)
    existing.unitPrice = size.price
  } else {
    lines.push({
      productId: product.productId,
      productSizeId: size.productSizeId,
      name: product.name,
      size: size.size,
      unitPrice: size.price,
      quantity: 1,
    })
  }
  writeCart(lines)
}

export function setQuantity(productId: number, quantity: number) {
  const q = Math.max(1, Math.min(Math.floor(quantity) || 1, MAX_QUANTITY))
  writeCart(parseCart(readRaw()).map((l) => (l.productId === productId ? { ...l, quantity: q } : l)))
}

export function removeFromCart(productId: number) {
  writeCart(parseCart(readRaw()).filter((l) => l.productId !== productId))
}

export function clearCart() {
  writeCart([])
}

/** Brings stored lines in line with the live catalogue; drops any no longer for sale. */
export function repriceCart(products: Product[]): { dropped: string[] } {
  const lines = parseCart(readRaw())
  const dropped: string[] = []
  const next: CartLine[] = []

  for (const line of lines) {
    const product = products.find((p) => p.productId === line.productId)
    const size = product ? onlineSize(product) : null
    if (!product || !size?.productSizeId) {
      dropped.push(line.name)
      continue
    }
    next.push({
      ...line,
      name: product.name,
      size: size.size,
      productSizeId: size.productSizeId,
      unitPrice: size.price,
    })
  }

  if (JSON.stringify(next) !== JSON.stringify(lines)) writeCart(next)
  return { dropped }
}

export const cartTotal = (lines: CartLine[]) =>
  lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0)

/* ------------------------------------------------------------------ */
/* Placing an order                                                    */
/* ------------------------------------------------------------------ */

export type OrderDetails = {
  customerName: string
  email: string
  phone: string
  notes: string
}

export type PlacedOrder = {
  orderNumber: string
  customerName: string
  email: string
  total: number
  items: { productName: string; sizeLabel: string; unitPrice: number; quantity: number; lineTotal: number }[]
}

/** The server's own words when it refuses an order — worth showing as written. */
export class OrderRefusedError extends Error {}

/**
 * Stand-in until /api/orders is published: the order is printed to the browser
 * console and a receipt is built here, numbered from the clock. Nothing is
 * sent anywhere, so the store does not receive these orders.
 */
function logOrder(details: OrderDetails, lines: CartLine[]): PlacedOrder {
  const items = lines.map((l) => ({
    productName: l.name,
    sizeLabel: l.size,
    unitPrice: l.unitPrice,
    quantity: l.quantity,
    lineTotal: l.unitPrice * l.quantity,
  }))
  const order: PlacedOrder = {
    orderNumber: `MGS-${Date.now().toString(36).toUpperCase()}`,
    customerName: details.customerName.trim(),
    email: details.email.trim(),
    total: cartTotal(lines),
    items,
  }
  console.log("[Magill order]", {
    ...order,
    phone: details.phone.trim(),
    notes: details.notes.trim() || null,
    siteName: SITE_NAME,
    placedAt: new Date().toISOString(),
  })
  return order
}

export async function placeOrder(details: OrderDetails, lines: CartLine[]): Promise<PlacedOrder> {
  if (!ORDERS_API_ENABLED) return logOrder(details, lines)

  let res: Response
  try {
    res = await fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        siteName: SITE_NAME,
        customerName: details.customerName.trim(),
        email: details.email.trim(),
        phone: details.phone.trim(),
        notes: details.notes.trim() || null,
        items: lines.map((l) => ({
          productId: l.productId,
          productSizeId: l.productSizeId,
          quantity: l.quantity,
        })),
      }),
    })
  } catch {
    throw new OrderRefusedError("We couldn't reach the store just now. Please try again, or call us.")
  }

  let body: ApiResponse<PlacedOrder> | null = null
  try {
    body = (await res.json()) as ApiResponse<PlacedOrder>
  } catch {
    // A gateway error page rather than the API.
  }

  if (!res.ok || !body?.success || !body.data) {
    throw new OrderRefusedError(
      body?.message || "We couldn't place your order. Please try again, or call us."
    )
  }
  return body.data
}

/* ------------------------------------------------------------------ */
/* The receipt, for the confirmation page                              */
/* ------------------------------------------------------------------ */

const RECEIPT_KEY = "mgs.receipt.v1"

export function rememberReceipt(order: PlacedOrder) {
  try {
    window.sessionStorage.setItem(RECEIPT_KEY, JSON.stringify(order))
  } catch {
    // The confirmation page then just asks them to check their email.
  }
}

function readReceiptRaw(): string {
  try {
    return window.sessionStorage.getItem(RECEIPT_KEY) ?? ""
  } catch {
    return ""
  }
}

const noSubscribe = () => () => {}

/** The order just placed in this tab; null until the browser is asked, then null again if none. */
export function useReceipt(): PlacedOrder | null | undefined {
  const raw = useSyncExternalStore<string | null>(noSubscribe, readReceiptRaw, () => null)
  return useMemo(() => {
    if (raw === null) return undefined
    if (!raw) return null
    try {
      return JSON.parse(raw) as PlacedOrder
    } catch {
      return null
    }
  }, [raw])
}

export const money = (amount: number) => `$${amount.toFixed(2)}`
