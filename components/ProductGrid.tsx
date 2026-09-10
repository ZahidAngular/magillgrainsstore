"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Wheat } from "lucide-react"
import type { Product } from "@/lib/api"
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
          key={product.productId}
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
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
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

          <div className="flex flex-1 flex-col gap-4 border-t border-line p-6">
            <h3 className="text-base font-bold leading-snug text-ink">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-[13px] leading-relaxed text-ink-body">
                {product.description}
              </p>
            )}

            {/*
             * Priced pack sizes read as a small list — the store sells the same
             * product in several bags at different prices. Lines the store has
             * never priced fall back to their own wording instead.
             *
             * Deliberately top-aligned: the list length varies from one to five
             * rows, and pushing it to the bottom of an equal-height card left a
             * gap between the name and its prices on the shorter ones.
             */}
            <div>
              {product.sizes.length > 0 ? (
                <ul className="space-y-1.5">
                  {product.sizes.map((s) => (
                    <li
                      key={s.productSizeId ?? `${s.size}-${s.priceType}`}
                      className="flex items-baseline justify-between gap-3 text-[14px]"
                    >
                      <span className="font-semibold text-ink-body">
                        {s.size || "Each"}
                      </span>
                      <span className="font-extrabold text-accent-ink">
                        ${s.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[15px] font-extrabold leading-snug text-accent-ink">
                  {product.priceNote || "Call for price"}
                </p>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
