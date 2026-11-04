import Image from "next/image"

/**
 * The store's logo: the supplied illustrated artwork, transparent, in two
 * colourings — navy (logo.png) for light backgrounds, and cream (logo-dark.png,
 * the same artwork with the navy turned cream) for dark ones.
 *
 * The header follows the theme: navy in light mode, cream in dark mode (the
 * switch is CSS, .logo-for-light / .logo-for-dark in globals.css, so it never
 * flashes the wrong one). `tone="light"` is for placements that are always on
 * navy — the footer and the sign-in screen — which always use the cream logo,
 * shown larger.
 */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  if (tone === "light") {
    return (
      <Image
        src="/images/site/logo-dark.png"
        alt="Magill Grain Store"
        width={528}
        height={392}
        className="h-24 w-auto md:h-28"
      />
    )
  }

  const size = "h-12 w-auto sm:h-14"
  return (
    <span className="inline-flex">
      <Image
        src="/images/site/logo.png"
        alt="Magill Grain Store"
        width={528}
        height={392}
        priority
        className={`logo-for-light ${size}`}
      />
      <Image
        src="/images/site/logo-dark.png"
        alt=""
        aria-hidden
        width={528}
        height={392}
        priority
        className={`logo-for-dark ${size}`}
      />
    </span>
  )
}
