"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Phone, Wheat } from "lucide-react"
import type { Product } from "@/lib/site"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const columnClasses = {
  two: "sm:grid-cols-2",
  four: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const

export function ProductGrid({
  products,
  columns = "four",
}: {
  products: Product[]
  columns?: keyof typeof columnClasses
}) {
  return (
    <div className={cn("grid gap-6", columnClasses[columns])}>
      {products.map((product, i) => (
        <motion.article
          key={product.name}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.55,
            delay: Math.min(i, 7) * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-2 transition duration-500 hover:-translate-y-2 hover:border-gold-400/60 hover:shadow-[0_34px_80px_-46px_rgba(0,19,119,0.65)]"
        >
          {/* Deliberately light in both themes: every packshot is photographed
              on white, so a dark tile would ring each bag with a white halo. */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-bone-100 to-white">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                className="object-contain p-7 transition duration-[900ms] ease-out group-hover:scale-[1.07]"
              />
            ) : (
              <div className="grid h-full place-items-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-surface-2 text-ink-muted shadow-sm transition duration-500 group-hover:text-gold-500">
                  <Wheat className="h-9 w-9" />
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-3 border-t border-line p-6">
            <h3 className="text-base font-bold leading-snug text-ink">
              {product.name}
            </h3>
            <p className="mt-auto text-[15px] font-extrabold leading-snug text-accent-ink">
              {product.price}
            </p>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-muted transition hover:text-ink"
            >
              <Phone className="h-3.5 w-3.5" />
              Order by phone
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
