import { Reveal } from "@/components/motion/Reveal"
import { FaqSection, ProseSection, SectionHeading } from "@/components/livestock/sections"
import { birdSeedCategory as page } from "@/lib/birdSeed"

/** Opening copy above the Bird Seed product cards. */
export function BirdSeedCategoryIntro() {
  return (
    <section className="bg-surface-2 pt-20 md:pt-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-12 lg:gap-16">
        <Reveal from="right" className="lg:col-span-5">
          <SectionHeading>{page.intro.title}</SectionHeading>
        </Reveal>
        <Reveal from="left" delay={0.1} className="lg:col-span-7">
          <div className="space-y-5 text-base leading-relaxed text-ink-body md:text-[17px]">
            {page.intro.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** The "Explore Our Bird Seed Range" heading directly above the product grid. */
export function BirdSeedRangeHeading() {
  return (
    <Reveal from="up" className="mb-10 max-w-3xl">
      <SectionHeading>{page.rangeTitle}</SectionHeading>
    </Reveal>
  )
}

/** Everything the doc puts after the range: choosing a seed, the local supplier note, FAQs. */
export function BirdSeedCategoryDetails() {
  return (
    <>
      <ProseSection title={page.choosing.title} paragraphs={page.choosing.paragraphs} />
      <ProseSection title={page.local.title} paragraphs={page.local.paragraphs} />
      <FaqSection faqs={page.faqs} />
    </>
  )
}
