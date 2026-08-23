"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { useRef } from "react"

/**
 * Resting opacity for a word that has not been scrolled past yet.
 *
 * Measured, not guessed: navy-900 composited over the bone surface needs
 * opacity >= 0.462 to clear the 3:1 WCAG bar for large text (0.3 lands at only
 * 1.95:1). 0.5 keeps a margin while the brighten to 1.0 still reads clearly.
 * Do not lower this for a stronger effect.
 */
const DIM = 0.5

/**
 * Editorial statement whose words brighten one by one as the block scrolls
 * through the viewport — the progress drives opacity per word, so it reads as
 * the text "lighting up" rather than a single fade.
 */
export function ScrollHighlight({
  text,
  className = "",
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.28"],
  })

  const words = text.split(" ")
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    )
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1.6) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [DIM, 1])
  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}
