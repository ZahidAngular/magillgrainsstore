"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef, type ReactNode } from "react"

/**
 * Pulls its child a few pixels toward the cursor while hovered. Motion values
 * are written directly from pointer events, so this never triggers a re-render.
 */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 220, damping: 18, mass: 0.4 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}
