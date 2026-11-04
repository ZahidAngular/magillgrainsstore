import type { Metadata } from "next"
import { PageHero } from "@/components/PageHero"
import { CheckoutSuccess } from "@/components/CheckoutSuccess"

export const metadata: Metadata = {
  title: "Order Placed",
  robots: { index: false, follow: false },
}

export default function CheckoutSuccessPage() {
  return (
    <main className="bg-surface">
      <PageHero eyebrow="Checkout" title="Order Placed" />
      <CheckoutSuccess />
    </main>
  )
}
