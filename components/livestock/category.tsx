import { Reveal } from "@/components/motion/Reveal"
import {
  FaqSection,
  FeatureCards,
  ProseSection,
  ReasonsBand,
  SectionHeading,
} from "@/components/livestock/sections"
import { livestockCategory as page } from "@/lib/livestock"

/** Opening copy above the Livestock product cards. */
export function LivestockCategoryIntro() {
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

/** Everything the brief puts after the range: range, choosing, why us, FAQs. */
export function LivestockCategoryDetails() {
  return (
    <>
      <FeatureCards title={page.range.title} items={page.range.items} tint />
      <ProseSection title={page.choosing.title} paragraphs={page.choosing.paragraphs} className="bg-surface-2" />
      <ReasonsBand title={page.reasons.title} items={page.reasons.items} />
      <FaqSection title={page.faqTitle} faqs={page.faqs} />
    </>
  )
}
