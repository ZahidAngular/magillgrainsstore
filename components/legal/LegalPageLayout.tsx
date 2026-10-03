import { PageHero } from "@/components/PageHero"

export function LegalPageLayout({
  title,
  description,
  lastUpdated,
  intro,
  children,
}: {
  title: string
  description?: string
  lastUpdated: string
  intro?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <main>
      <PageHero title={title} description={description} />
      <section className="bg-surface-2 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm font-bold text-ink-muted">
            Last updated: {lastUpdated}
          </p>
          {intro && (
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-body">
              {intro}
            </div>
          )}
          <div className="mt-12 space-y-12">{children}</div>
        </div>
      </section>
    </main>
  )
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-extrabold text-ink md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-body">
        {children}
      </div>
    </section>
  )
}

export function LegalSubheading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-bold text-ink">{children}</h3>
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}
