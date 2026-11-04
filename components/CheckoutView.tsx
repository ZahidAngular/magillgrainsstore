"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Clock, Loader2, MapPin, Minus, Phone, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { getProductsByCategory } from "@/lib/shop"
import {
  MAX_QUANTITY,
  OrderRefusedError,
  cartTotal,
  clearCart,
  money,
  placeOrder,
  removeFromCart,
  rememberReceipt,
  repriceCart,
  setQuantity,
  useCart,
} from "@/lib/orders"
import { site } from "@/lib/site"

const input =
  "w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm outline-none transition focus:border-navy-500"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.16em] text-ink">{label}</span>
      {children}
    </label>
  )
}

/** The checkout: what's in the order, who it's for, and a pickup-in-store confirmation. */
export function CheckoutView() {
  const router = useRouter()
  const cart = useCart()
  const [dropped, setDropped] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  // The prices in the cart are as they were when the item went in. Refresh them
  // from the catalogue so what the customer sees is what the server will charge,
  // and drop anything that has since gone off sale.
  useEffect(() => {
    let active = true
    getProductsByCategory("Livestock").then((products) => {
      if (!active || products.length === 0) return
      const { dropped } = repriceCart(products)
      if (dropped.length > 0) setDropped(dropped)
    })
    return () => {
      active = false
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!cart || cart.length === 0 || submitting) return

    const form = new FormData(e.currentTarget)
    // A field only a bot fills in: pretend it worked and send nothing.
    if (form.get("website")) {
      clearCart()
      router.push("/checkout/success")
      return
    }

    setSubmitting(true)
    setError("")
    try {
      const order = await placeOrder(
        {
          customerName: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? ""),
          notes: String(form.get("notes") ?? ""),
        },
        cart
      )
      rememberReceipt(order)
      clearCart()
      router.push("/checkout/success")
    } catch (err) {
      setError(err instanceof OrderRefusedError ? err.message : "Something went wrong placing your order. Please try again, or call us.")
      setSubmitting(false)
    }
  }

  if (cart === undefined) {
    return <section className="bg-surface-2 py-16 md:py-24"><div className="mx-auto h-64 max-w-7xl px-6" /></section>
  }

  if (cart.length === 0) {
    return (
      <section className="bg-surface-2 py-16 md:py-24">
        <div className="mx-auto max-w-xl px-6 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-400/15 text-gold-500">
            <ShoppingBag className="h-7 w-7" />
          </span>
          <h2 className="mt-6 text-2xl font-extrabold text-ink">Your order is empty</h2>
          <p className="mt-3 text-ink-body">
            {dropped.length > 0
              ? `${dropped.join(", ")} is no longer available to order online. Please call us on ${site.phone}.`
              : "Choose something from our livestock and it will appear here."}
          </p>
          <Link
            href="/shop/livestock"
            className="mt-8 inline-flex rounded-full bg-navy-900 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-navy-700"
          >
            Browse livestock
          </Link>
        </div>
      </section>
    )
  }

  const total = cartTotal(cart)

  return (
    <section className="bg-surface-2 py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.1fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-2xl font-extrabold text-ink">Your details</h2>

          <Field label="Name">
            <input required name="name" autoComplete="name" maxLength={120} className={input} />
          </Field>
          <Field label="Email">
            <input required type="email" name="email" autoComplete="email" maxLength={200} className={input} />
          </Field>
          <Field label="Phone">
            <input required type="tel" name="phone" autoComplete="tel" maxLength={40} className={input} />
          </Field>
          <Field label="Notes (optional)">
            <textarea
              name="notes"
              rows={3}
              maxLength={600}
              placeholder="e.g. the day you'd like to collect"
              className={`${input} resize-y`}
            />
          </Field>

          {/* Hidden from people; bots fill in every field they find. */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {dropped.length > 0 && (
            <p role="status" className="rounded-xl border border-gold-400/40 bg-gold-400/10 px-4 py-3 text-sm font-semibold text-ink">
              {dropped.join(", ")} is no longer available to order online and has been removed.
            </p>
          )}
          {error && (
            <p role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-navy-700 disabled:opacity-60"
          >
            {submitting ? (
              <>
                Placing order
                <Loader2 className="h-4 w-4 animate-spin text-gold-400" />
              </>
            ) : (
              <>Place order · {money(total)}</>
            )}
          </button>
          <p className="text-xs text-ink-muted">
            You pay in store when you collect. We&apos;ll call or email if we need to confirm anything.
          </p>
        </form>

        <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-3xl border border-line bg-surface-3 p-6 md:p-8">
            <h2 className="text-xl font-extrabold text-ink">Your order</h2>
            <ul className="mt-5 divide-y divide-line">
              {cart.map((line) => (
                <li key={line.productId} className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="font-bold leading-snug text-ink">{line.name}</p>
                    <p className="text-sm text-ink-body">
                      {line.size ? `${line.size} · ` : ""}
                      {money(line.unitPrice)} each
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <div className="flex items-center rounded-full border border-line">
                      <button
                        type="button"
                        aria-label={`Fewer ${line.name}`}
                        onClick={() => setQuantity(line.productId, line.quantity - 1)}
                        disabled={line.quantity <= 1}
                        className="grid h-9 w-9 place-items-center text-ink transition hover:text-accent-ink disabled:opacity-40"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <input
                        aria-label={`Quantity of ${line.name}`}
                        inputMode="numeric"
                        value={line.quantity}
                        onChange={(e) => setQuantity(line.productId, Number(e.target.value.replace(/\D/g, "")))}
                        className="h-9 w-12 bg-transparent text-center text-sm font-bold text-ink outline-none"
                      />
                      <button
                        type="button"
                        aria-label={`More ${line.name}`}
                        onClick={() => setQuantity(line.productId, line.quantity + 1)}
                        disabled={line.quantity >= MAX_QUANTITY}
                        className="grid h-9 w-9 place-items-center text-ink transition hover:text-accent-ink disabled:opacity-40"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="w-16 text-right font-extrabold text-accent-ink">
                      {money(line.unitPrice * line.quantity)}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove ${line.name}`}
                      onClick={() => removeFromCart(line.productId)}
                      className="text-ink-muted transition hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-baseline justify-between border-t border-line pt-5">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-ink">Total</span>
              <span className="text-2xl font-extrabold text-accent-ink">{money(total)}</span>
            </div>
          </div>

          <div className="rounded-3xl border border-gold-400/40 bg-gold-400/10 p-6 md:p-8">
            <h2 className="text-lg font-extrabold text-ink">Pickup in store</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-body">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>{site.address}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.day} className="block">
                      {h.day}: <strong className="text-ink">{h.time}</strong>
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <a href={site.phoneHref} className="font-bold text-ink hover:text-accent-ink">
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
