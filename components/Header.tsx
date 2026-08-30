"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react"
import { Logo } from "@/components/Logo"
import { MegaPanel } from "@/components/MegaPanel"
import { ThemeToggle } from "@/components/ThemeToggle"
import { megaMenus, site } from "@/lib/site"
import { cn } from "@/lib/utils"

const simpleLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Escape closes whichever layer is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setOpenMenu(null)
      setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  /**
   * A short close delay keeps the panel alive while the pointer crosses the gap
   * between the trigger and the panel below it; without it the menu snaps shut
   * mid-travel.
   */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const closeAll = () => {
    setOpenMenu(null)
    setMobileOpen(false)
    setMobileSection(null)
  }

  const menuIsActive = (label: string) => {
    const menu = megaMenus.find((m) => m.label === label)
    return (
      menu?.groups.some((g) => g.items.some((i) => i.href === pathname)) ?? false
    )
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
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

      {/* Main bar */}
      <div
        className={cn(
          "relative border-b border-line/60 bg-surface-2/95 backdrop-blur transition-shadow",
          (scrolled || openMenu) &&
            "shadow-[0_10px_40px_-24px_rgba(0,19,119,0.55)]"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
          <Link href="/" aria-label={`${site.name} home`} onClick={closeAll}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setOpenMenu(null)}
                className={cn(
                  "rounded-lg px-3.5 py-2.5 text-sm font-bold uppercase tracking-wide transition",
                  pathname === link.href
                    ? "text-ink"
                    : "text-ink-body hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}

            {megaMenus.map((menu) => {
              const isOpen = openMenu === menu.label
              return (
                <button
                  key={menu.label}
                  type="button"
                  aria-expanded={isOpen}
                  onMouseEnter={() => {
                    cancelClose()
                    setOpenMenu(menu.label)
                  }}
                  onMouseLeave={scheduleClose}
                  onClick={() => setOpenMenu(isOpen ? null : menu.label)}
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3.5 py-2.5 text-sm font-bold uppercase tracking-wide transition",
                    isOpen || menuIsActive(menu.label)
                      ? "text-ink"
                      : "text-ink-body hover:text-ink"
                  )}
                >
                  {menu.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
              )
            })}

            <Link
              href="/contact-us"
              onMouseEnter={() => setOpenMenu(null)}
              className={cn(
                "rounded-lg px-3.5 py-2.5 text-sm font-bold uppercase tracking-wide transition",
                pathname === "/contact-us"
                  ? "text-ink"
                  : "text-ink-body hover:text-ink"
              )}
            >
              Contact
            </Link>
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
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="grid h-11 w-11 place-items-center rounded-lg border border-line text-ink lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop mega panel */}
        {megaMenus.map((menu) => (
          <div
            key={menu.label}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className={cn(
              "absolute inset-x-0 top-full hidden border-b border-line bg-surface-2 shadow-[0_28px_60px_-32px_rgba(0,19,119,0.5)] transition-all duration-200 lg:block",
              openMenu === menu.label
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-2 opacity-0"
            )}
          >
            <div className="mx-auto max-w-7xl px-6 py-8">
              <MegaPanel
                menu={menu}
                pathname={pathname}
                onNavigate={() => setOpenMenu(null)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto border-b border-line bg-surface-2 lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-6 py-4">
            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAll}
                className={cn(
                  "block rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide",
                  pathname === link.href ? "text-ink" : "text-ink-body"
                )}
              >
                {link.label}
              </Link>
            ))}

            {megaMenus.map((menu) => {
              const expanded = mobileSection === menu.label
              return (
                <div key={menu.label}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileSection(expanded ? null : menu.label)
                    }
                    className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide text-ink-body"
                  >
                    {menu.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        expanded && "rotate-180"
                      )}
                    />
                  </button>
                  {expanded && (
                    <div className="ml-3 space-y-4 border-l border-line pl-3 pb-2">
                      {menu.groups.map((group) => (
                        <div key={group.name}>
                          <p className="px-3 pt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-ink">
                            {group.name}
                          </p>
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeAll}
                              className={cn(
                                "block rounded-lg px-3 py-2.5 text-sm font-semibold",
                                pathname === item.href
                                  ? "text-ink"
                                  : "text-ink-body"
                              )}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            <Link
              href="/contact-us"
              onClick={closeAll}
              className={cn(
                "block rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide",
                pathname === "/contact-us" ? "text-ink" : "text-ink-body"
              )}
            >
              Contact
            </Link>

            <a
              href={site.phoneHref}
              onClick={closeAll}
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
