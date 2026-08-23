"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { WordReveal } from "@/components/motion/Reveal"

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <section className="mesh-navy relative overflow-hidden">
      <div className="grain-texture absolute inset-0" />
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-navy-700/40 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-navy-200"
        >
          <Link href="/" className="transition hover:text-gold-400">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gold-400">{eyebrow ?? title}</span>
        </motion.nav>

        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          <WordReveal text={title} />
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-navy-200"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
