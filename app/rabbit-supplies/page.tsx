import type { Metadata } from "next"
import { PageHero } from "@/components/PageHero"
import { EnquiryPanel } from "@/components/EnquiryPanel"

export const metadata: Metadata = {
  title: "Rabbit Supplies",
  description: "Rabbit pellets, hay and bedding — call the store for current stock and pricing.",
}

export default function RabbitSuppliesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Rabbit Supplies"
        title="Rabbit Supplies"
        description="Pellets, hay and bedding for rabbits and guinea pigs."
      />
      <EnquiryPanel category="rabbit supplies" />
    </main>
  )
}
