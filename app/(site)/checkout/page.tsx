import type { Metadata } from "next"
import { PageHero } from "@/components/PageHero"
import { CheckoutView } from "@/components/CheckoutView"
import { notFound } from "next/navigation"
import { SHOP_ENABLED } from "@/lib/shopFlag"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Place your order and collect it in store at Magill Grain Store.",
  // A working page, not something to find in search results.
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  if (!SHOP_ENABLED) notFound()
  return (
    <main className="bg-surface">
      <PageHero eyebrow="Checkout" title="Place Your Order" description="Order online and collect in store." />
      <CheckoutView />
    </main>
  )
}
