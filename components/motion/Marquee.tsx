"use client"

import { motion } from "framer-motion"

export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items]

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-navy-900 py-5">
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-12 text-sm font-extrabold uppercase tracking-[0.22em] text-navy-100"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
