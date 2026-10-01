import { Reveal } from "@/components/motion/Reveal"
import {
  FaqSection,
  FeatureCards,
  ProseSection,
  ReasonsBand,
  SectionHeading,
} from "@/components/livestock/sections"
import { gritCategory as page } from "@/lib/grit"

/** Opening copy above the Grit product cards. */
export function GritCategoryIntro() {
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

/** The "Our Grit Range" heading that sits directly above the product grid. */
export function GritRangeHeading() {
  return (
    <Reveal from="up" className="mb-10 max-w-3xl">
      <SectionHeading>{page.rangeTitle}</SectionHeading>
    </Reveal>
  )
}

/** Everything the doc puts after the range: grit types, the comparison, why us, FAQs. */
export function GritCategoryDetails() {
  return (
    <>
      <FeatureCards items={page.types.items} tint />
      <ProseSection title={page.compare.title} paragraphs={page.compare.paragraphs} className="bg-surface-2" />
      <ReasonsBand title={page.reasons.title} items={page.reasons.items} />
      <FaqSection title={page.faqTitle} faqs={page.faqs} />
    </>
  )
}
