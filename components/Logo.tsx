export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="13" fill="currentColor" />
      <path
        d="M24 10.5c-2.4 2-3.6 4.3-3.6 6.9 0 2.6 1.2 4.9 3.6 6.9 2.4-2 3.6-4.3 3.6-6.9 0-2.6-1.2-4.9-3.6-6.9Z"
        className="fill-gold-400"
      />
      <path
        d="M16.6 17.4c-.5 3 .1 5.6 1.9 7.5 1.8 2 4.3 2.9 7.4 2.9-.4-3-1.7-5.4-3.8-7-2-1.7-4.2-2.8-5.5-3.4ZM31.4 17.4c.5 3-.1 5.6-1.9 7.5-1.8 2-4.3 2.9-7.4 2.9.4-3 1.7-5.4 3.8-7 2-1.7 4.2-2.8 5.5-3.4Z"
        className="fill-gold-400/70"
      />
      <path
        d="M24 26.5v11"
        className="stroke-gold-400"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Logo({
  tone = "dark",
}: {
  tone?: "dark" | "light"
}) {
  const isLight = tone === "light"
  return (
    <span className="flex items-center gap-3">
      <LogoMark
        className={`h-11 w-11 ${isLight ? "text-white/10" : "text-ink"}`}
      />
      <span className="leading-tight">
        <span
          className={`block text-[17px] font-extrabold tracking-tight ${
            isLight ? "text-white" : "text-ink"
          }`}
        >
          Magill Grain Store
        </span>
        {/* Hidden on the narrowest phones: the tracked-out line runs ~190px,
            which pushed the header past 375px and scrolled every page
            sideways. Returns at `sm`, where there is room for it. */}
        <span
          className={`hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em] sm:block ${
            isLight ? "text-gold-400" : "text-ink-muted"
          }`}
        >
          Magill · South Australia
        </span>
      </span>
    </span>
  )
}
