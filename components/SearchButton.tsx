"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2, Search, Wheat, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { getAllProducts, priceLines, toSlug, type Product } from "@/lib/shop"

export function SearchButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState<Product[] | null>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return

    if (products === null) {
      setLoading(true)
      getAllProducts().then((data) => {
        setProducts(data)
        setLoading(false)
      })
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 150)

    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      window.clearTimeout(focusTimer)
    }
  }, [open, products])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q || !products) return []
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [query, products])

  const close = () => {
    setOpen(false)
    setQuery("")
  }

  const goToProduct = (product: Product) => {
    close()
    router.push(`/shop/${toSlug(product.category)}?highlight=${product.productId}`)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search products"
        className="grid h-11 w-11 place-items-center rounded-lg border border-line text-ink transition hover:bg-surface-3"
      >
        <Search className="h-[18px] w-[18px]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-navy-990/60 px-4 pt-20 backdrop-blur-sm sm:pt-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <motion.div
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-[0_40px_90px_-30px_rgba(0,19,119,0.65)]"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-line px-5 py-4">
                <Search className="h-5 w-5 shrink-0 text-ink-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="w-full bg-transparent text-base text-ink placeholder:text-ink-muted focus:outline-none"
                />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close search"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-muted transition hover:bg-surface-3 hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {loading && (
                  <div className="flex items-center justify-center gap-2 py-10 text-sm text-ink-muted">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading products…
                  </div>
                )}

                {!loading && query.trim() && results.length === 0 && (
                  <p className="px-5 py-10 text-center text-sm text-ink-muted">
                    No products match &ldquo;{query}&rdquo;.
                  </p>
                )}

                {!loading && !query.trim() && (
                  <p className="px-5 py-10 text-center text-sm text-ink-muted">
                    Start typing a product name to search.
                  </p>
                )}

                {!loading && results.length > 0 && (
                  <ul className="divide-y divide-line">
                    {results.map((product) => {
                      const lines = priceLines(product)
                      return (
                        <li key={product.productId}>
                          <button
                            type="button"
                            onClick={() => goToProduct(product)}
                            className="flex w-full items-center gap-4 px-5 py-3.5 text-left transition hover:bg-surface-3"
                          >
                            <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-bone-100 to-white">
                              {product.imageUrl ? (
                                <Image
                                  src={product.imageUrl}
                                  alt=""
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              ) : (
                                <Wheat className="h-5 w-5 text-ink-muted" />
                              )}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-bold text-ink">
                                {product.name}
                              </span>
                              <span className="block truncate text-xs text-ink-muted">
                                {product.category}
                              </span>
                            </span>
                            {lines.length > 0 && (
                              <span className="shrink-0 text-right text-xs font-extrabold text-accent-ink">
                                {lines[0]}
                                {lines.length > 1 && (
                                  <span className="block font-semibold text-ink-muted">
                                    +{lines.length - 1} more
                                  </span>
                                )}
                              </span>
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
