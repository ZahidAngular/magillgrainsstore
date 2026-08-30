import Link from "next/link"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/Logo"
import { megaMenus, services, site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="mesh-navy relative text-navy-100">
      <div className="grain-texture absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <Logo tone="light" />
          <p className="mt-5 text-sm leading-relaxed text-navy-200">
            {site.tagline}. Quality poultry, bird grains and animal feed supplied
            to South Australian farms, breeders and backyard flocks.
          </p>
        </div>

        {/* One column per mega menu, subdivided by the store's own group names,
            so the footer lists every product page the header does. */}
        {megaMenus.map((menu) => (
          <div key={menu.label}>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold-400">
              {menu.label}
            </h3>
            <div className="mt-5 space-y-5">
              {menu.groups.map((group) => (
                <div key={group.name}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-navy-200/70">
                    {group.name}
                  </p>
                  <ul className="mt-2 space-y-2 text-sm">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="transition hover:text-white"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold-400">
            Our Services
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold-400">
            Get In Touch
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={site.mapUrl} target="_blank" rel="noreferrer" className="transition hover:text-white">
                {site.address}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={site.phoneHref} className="transition hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`mailto:${site.email}`} className="break-all transition hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <div className="space-y-1">
                {site.hours.map((h) => (
                  <p key={h.day}>
                    <span className="text-white">{h.day}</span> — {h.time}
                  </p>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-navy-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>ABN registered · Proudly serving South Australia</p>
        </div>
      </div>
    </footer>
  )
}
