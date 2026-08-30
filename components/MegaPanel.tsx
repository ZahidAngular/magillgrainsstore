"use client"

import Link from "next/link"
import * as Icons from "lucide-react"
import { ArrowRight, Phone } from "lucide-react"
import type { MegaMenu } from "@/lib/site"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * Resolves the icon named in the menu data. Lucide exports a large surface, so
 * this is indexed rather than switched; anything unrecognised falls back to a
 * neutral mark instead of throwing at render time.
 */
function MenuIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = (Icons as unknown as Record<string, Icons.LucideIcon>)[name]
  const Resolved = Cmp ?? Icons.Package
  return <Resolved className={className} />
}

export function MegaPanel({
  menu,
  pathname,
  onNavigate,
}: {
  menu: MegaMenu
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
      <div>
        <div className="flex items-baseline justify-between gap-6">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
            {menu.eyebrow}
          </span>
          <Link
            href="/products"
            onClick={onNavigate}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink-body transition hover:text-ink"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/*
         * One column per group, headed by the store's own group name, so the
         * menu reads the way theirs did.
         *
         * Every colour is a gold tint or a semantic ink token, never a fixed
         * navy: surface-3 chips with navy-700 icons vanished in dark mode where
         * both resolve to near-black, and surface-3 sits *darker* than the panel,
         * so an "active" row read as a hole punched in it.
         */}
        <div className="mt-7 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {menu.groups.map((group) => (
            <div key={group.name}>
              <h3 className="border-b border-line pb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-body">
                {group.name}
              </h3>

              <div className="mt-2 space-y-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-start gap-3 rounded-xl p-2.5 transition duration-200",
                        active ? "bg-gold-400/12" : "hover:bg-gold-400/10"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg transition duration-200",
                          active
                            ? "bg-gold-400 text-navy-950"
                            : "bg-gold-400/15 text-accent-ink group-hover:bg-gold-400 group-hover:text-navy-950"
                        )}
                      >
                        <MenuIcon name={item.icon} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[14px] font-bold leading-snug text-ink">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-[12.5px] leading-[1.45] text-ink-body">
                          {item.blurb}
                        </span>
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="rounded-2xl border border-gold-400/25 bg-gold-400/[0.07] p-7">
        <h3 className="display text-[1.6rem] leading-tight text-ink">
          Not sure what you need?
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-body">
          Tell us what you keep and how many. We&apos;ll point you at the right
          bag and the right size — no upselling.
        </p>
        <a
          href={site.phoneHref}
          onClick={onNavigate}
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-700"
        >
          <Phone className="h-4 w-4 text-gold-400" />
          {site.phone}
        </a>
        <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-body">
          Mon–Fri 8:30–5 · Sat 8–12
        </p>
      </aside>
    </div>
  )
}
