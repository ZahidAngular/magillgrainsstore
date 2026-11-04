import type { Metadata } from "next"
import { PageHero } from "@/components/PageHero"
import { CheckoutSuccess } from "@/components/CheckoutSuccess"
import { notFound } from "next/navigation"
import { SHOP_ENABLED } from "@/lib/shopFlag"

export const metadata: Metadata = {
  title: "Order Placed",
  robots: { index: false, follow: false },
}

export default function CheckoutSuccessPage() {
  if (!SHOP_ENABLED) notFound()
  return (
    <main className="bg-surface">
      <PageHero eyebrow="Checkout" title="Order Placed" />
      <CheckoutSuccess />
    </main>
  )
}
