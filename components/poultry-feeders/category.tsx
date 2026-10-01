import { Reveal } from "@/components/motion/Reveal"
import {
  FaqSection,
  FeatureCards,
  ProseSection,
  ReasonsBand,
  SectionHeading,
} from "@/components/livestock/sections"
import { poultryFeedersCategory as page } from "@/lib/poultryFeeders"

/** Opening copy above the Poultry Feeders product cards. */
export function PoultryFeedersCategoryIntro() {
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

/** The "Our Poultry Feeder & Drinker Range" heading directly above the product grid. */
export function PoultryFeedersRangeHeading() {
  return (
    <Reveal from="up" className="mb-10 max-w-3xl">
      <SectionHeading>{page.rangeTitle}</SectionHeading>
    </Reveal>
  )
}

/** Everything after the range: feeder/drinker types, sizing, setup tips, why us, FAQs. */
export function PoultryFeedersCategoryDetails() {
  return (
    <>
      <FeatureCards items={page.types.items} tint />
      <ProseSection title={page.choosing.title} paragraphs={page.choosing.paragraphs} className="bg-surface-2" />
      <FeatureCards title={page.tips.title} items={page.tips.items} tint />
      <ReasonsBand title={page.reasons.title} items={page.reasons.items} />
      <FaqSection title={page.faqTitle} faqs={page.faqs} />
    </>
  )
}
