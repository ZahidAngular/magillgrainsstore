import { Reveal } from "@/components/motion/Reveal"
import { ProseSection, SectionHeading } from "@/components/livestock/sections"
import { cattleHorseCategory as page } from "@/lib/cattleHorse"

/** Opening copy above the Cattle & Horse product cards. */
export function CattleHorseCategoryIntro() {
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

/** The "Explore Our Cattle and Horse Feed Range" heading directly above the product grid. */
export function CattleHorseRangeHeading() {
  return (
    <Reveal from="up" className="mb-10 max-w-3xl">
      <SectionHeading>{page.rangeTitle}</SectionHeading>
    </Reveal>
  )
}

/** Everything the doc puts after the range: choosing a feed, and the local supplier note. */
export function CattleHorseCategoryDetails() {
  return (
    <>
      <ProseSection title={page.choosing.title} paragraphs={page.choosing.paragraphs} />
      <ProseSection
        title={page.local.title}
        paragraphs={page.local.paragraphs}
        className="bg-surface-2"
      />
    </>
  )
}
