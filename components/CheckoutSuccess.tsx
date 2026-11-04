"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { money, useReceipt } from "@/lib/orders"
import { site } from "@/lib/site"

/** Confirmation after an order: the reference to quote at the counter, and what to do next. */
export function CheckoutSuccess() {
  const receipt = useReceipt()

  if (receipt === undefined) {
    return <section className="bg-surface-2 py-16 md:py-24"><div className="mx-auto h-64 max-w-7xl px-6" /></section>
  }

  return (
    <section className="bg-surface-2 py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-3xl border border-line bg-surface-3 p-8 text-center md:p-12">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-400/20 text-accent-ink">
            <Check className="h-8 w-8" />
          </span>
          <h2 className="mt-6 text-2xl font-extrabold text-ink md:text-3xl">
            {receipt ? "Thanks — your order is in" : "Thanks for your order"}
          </h2>

          {receipt ? (
            <>
              <p className="mt-3 text-ink-body">
                Your order number is{" "}
                <strong className="text-lg tracking-wider text-ink">{receipt.orderNumber}</strong>. Quote it when you
                collect.
              </p>

              <ul className="mt-8 divide-y divide-line border-y border-line text-left">
                {receipt.items.map((item, i) => (
                  <li key={i} className="flex justify-between gap-4 py-3 text-sm">
                    <span className="text-ink-body">
                      {item.quantity} × <span className="font-bold text-ink">{item.productName}</span>
                      {item.sizeLabel ? ` (${item.sizeLabel})` : ""}
                    </span>
                    <span className="font-bold text-ink">{money(item.lineTotal)}</span>
                  </li>
                ))}
                <li className="flex justify-between gap-4 py-4">
                  <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-ink">Total to pay in store</span>
                  <span className="text-xl font-extrabold text-accent-ink">{money(receipt.total)}</span>
                </li>
              </ul>
            </>
          ) : (
            <p className="mt-3 text-ink-body">We&apos;ll be in touch to confirm it.</p>
          )}

          <p className="mt-8 text-sm text-ink-body">
            Collect from <strong className="text-ink">{site.address}</strong>. Questions? Call{" "}
            <a href={site.phoneHref} className="font-extrabold text-accent-ink underline decoration-gold-400 underline-offset-4">
              {site.phone}
            </a>
            .
          </p>

          <Link
            href="/shop/livestock"
            className="mt-8 inline-flex rounded-full bg-navy-900 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-navy-700"
          >
            Back to livestock
          </Link>
        </div>
      </div>
    </section>
  )
}
