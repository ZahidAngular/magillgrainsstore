"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

/**
 * One masked line of a display heading: the text slides up from behind a hard
 * clip edge rather than fading in.
 *
 * Two traps this deliberately avoids:
 *
 * 1. The observer ref sits on the OUTER mask, never the inner span. The inner
 *    span starts translated 108% down and renders outside the mask, so when it
 *    was the observed element inside a pinned `sticky` column it could stay
 *    outside the root bounds forever — never animating, leaving the heading
 *    permanently invisible.
 * 2. The inner span carries its own `initial`/`animate` instead of inheriting
 *    variants from the mask. Variant propagation silently failed here and every
 *    heading on the page stayed hidden.
 */
export function Line({
  children,
  index = 0,
  inView = false,
}: {
  children: ReactNode
  index?: number
  inView?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, amount: 0 })
  const show = inView ? seen : true

  return (
    <span ref={ref} className="line-mask">
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        animate={{ y: show ? "0%" : "108%" }}
        transition={{
          duration: 1,
          delay: 0.08 + index * 0.09,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}
