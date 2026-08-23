import type { Metadata } from "next"
import { PageHero } from "@/components/PageHero"
import { EnquiryPanel } from "@/components/EnquiryPanel"

export const metadata: Metadata = {
  title: "Garden Supplies",
  description: "Fertilizers, hay and mulch for the home garden and small acreage.",
}

export default function GardenSuppliesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Garden Supplies"
        title="Garden Supplies"
        description="Fertilizers, hay and mulch for the home garden and small acreage."
      />
      <EnquiryPanel category="garden supplies" />
    </main>
  )
}
