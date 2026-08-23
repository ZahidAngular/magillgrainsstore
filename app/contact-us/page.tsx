import type { Metadata } from "next"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { PageHero } from "@/components/PageHero"
import { ContactForm } from "@/components/ContactForm"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Call ${site.phone}, email ${site.email} or visit us at ${site.address}.`,
}

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact Us"
        title="Get in Touch"
        description="Questions about feed, pricing or delivery? We're here six days a week."
      />

      <section className="bg-surface-2 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.1fr]">
          <Stagger className="space-y-6">
            <InfoCard icon={Phone} title="Numbers">
              <p className="text-sm text-ink-body">General Inquiries</p>
              <a
                href={site.phoneHref}
                className="text-lg font-extrabold text-ink transition hover:text-accent-ink"
              >
                {site.phone}
              </a>
            </InfoCard>

            <InfoCard icon={Mail} title="Email">
              <a
                href={`mailto:${site.email}`}
                className="break-all text-lg font-extrabold text-ink transition hover:text-accent-ink"
              >
                {site.email}
              </a>
            </InfoCard>

            <InfoCard icon={MapPin} title="Address">
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-extrabold text-ink transition hover:text-accent-ink"
              >
                {site.address}
              </a>
            </InfoCard>

            <InfoCard icon={Clock} title="Business Hours">
              <ul className="space-y-2 text-sm">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="font-semibold text-ink">{h.day}</span>
                    <span className="text-ink-body">{h.time}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          </Stagger>

          <Reveal from="left" className="rounded-3xl border border-line bg-surface-3 p-8 md:p-10">
            <h2 className="text-2xl font-extrabold text-ink">
              Send Us a Message
            </h2>
            <p className="mt-3 text-sm text-ink-body">
              Fill in the form and we&apos;ll get back to you during business
              hours.
            </p>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <Reveal from="up" className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl border border-line">
            <iframe
              title="Magill Grain Store location"
              src="https://www.google.com/maps?q=574+Magill+Road,+Magill+SA+5072&output=embed"
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </main>
  )
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Phone
  title: string
  children: React.ReactNode
}) {
  return (
    <StaggerItem>
      <div className="group flex gap-5 rounded-2xl border border-line bg-surface-2 p-6 transition duration-500 hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-[0_24px_60px_-40px_rgba(0,19,119,0.6)]">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-400 transition duration-500 group-hover:bg-gold-400 group-hover:text-navy-950">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-accent-ink">
            {title}
          </h3>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </StaggerItem>
  )
}
