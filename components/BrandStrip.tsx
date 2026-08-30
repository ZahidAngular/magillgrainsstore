import Image from "next/image"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal"
import { brands } from "@/lib/site"

/**
 * Supplier logos the store actually carries. They arrive as greyscale PNGs at
 * mixed aspect ratios, so each sits in a fixed-height box and is contained
 * rather than cropped — scaling them to a common width would make the wide
 * marks (Laucke, Wombaroo) tower over the square ones.
 */
export function BrandStrip({
  heading = "Brands We Stock",
}: {
  heading?: string
}) {
  return (
    <section className="border-y border-line bg-surface-3 py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal from="up" className="flex items-center justify-center gap-3">
          <span className="h-px w-10 rule-gold" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
            {heading}
          </span>
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <StaggerItem key={brand.name}>
              <div className="relative mx-auto h-12 w-full max-w-[9rem]">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="144px"
                  className="object-contain opacity-55 transition duration-500 hover:opacity-100"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
