"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react"
import { Logo } from "@/components/Logo"
import { ThemeToggle } from "@/components/ThemeToggle"
import { nav, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const close = () => {
    setOpen(false)
    setExpanded(null)
  }

  const isActive = (item: (typeof nav)[number]) =>
    pathname === item.href ||
    item.children?.some((c) => c.href === pathname) ||
    false

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-navy-950 text-navy-100 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2.5 text-[13px]">
          <p className="font-medium tracking-wide text-gold-300">{site.tagline}</p>
          <div className="flex items-center gap-6">
            <a
              href={site.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <MapPin className="h-3.5 w-3.5 text-gold-400" />
              {site.address}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-gold-400" />
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-line/60 bg-surface-2/95 backdrop-blur transition-shadow",
          scrolled && "shadow-[0_10px_40px_-24px_rgba(0,19,119,0.55)]"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" aria-label={`${site.name} home`}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition",
                    isActive(item)
                      ? "bg-surface-3 text-ink"
                      : "text-ink-body hover:bg-surface-3 hover:text-ink"
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full w-64 translate-y-2 rounded-xl border border-line bg-surface-2 p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block rounded-lg px-3 py-2.5 text-sm font-semibold transition",
                          pathname === child.href
                            ? "bg-navy-900 text-white"
                            : "text-ink-body hover:bg-surface-3 hover:text-ink"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-700 sm:flex"
            >
              <Phone className="h-4 w-4 text-gold-400" />
              {site.phone}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-11 w-11 place-items-center rounded-lg border border-line text-ink lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-line bg-surface-2 lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-6 py-4">
            {nav.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={close}
                    className={cn(
                      "flex-1 rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide",
                      isActive(item) ? "text-ink" : "text-ink-body"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label}`}
                      onClick={() =>
                        setExpanded((v) => (v === item.href ? null : item.href))
                      }
                      className="grid h-9 w-9 place-items-center rounded-lg text-ink"
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition",
                          expanded === item.href && "rotate-180"
                        )}
                      />
                    </button>
                  )}
                </div>
                {item.children && expanded === item.href && (
                  <div className="ml-3 border-l border-line pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={close}
                        className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-body"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href={site.phoneHref}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-navy-900 px-5 py-3.5 text-sm font-bold text-white"
            >
              <Phone className="h-4 w-4 text-gold-400" />
              {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
