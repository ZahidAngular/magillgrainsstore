"use client"

import { useState } from "react"
import { Plus, Trash2, X } from "lucide-react"
import type { Product, ProductInput } from "@/lib/api"
import { cn } from "@/lib/utils"

type SizeRow = { size: string; priceType: string; price: string }

const emptyRow = (): SizeRow => ({ size: "", priceType: "RETAIL", price: "" })

/*
 * Every class list goes through cn() — tailwind-merge resolves the width
 * conflicts. Without it, the `w-full` in the shared field style beat the
 * per-input `w-36`/`w-32`/`flex-1`, and all three inputs collapsed to 34px so
 * the pack size looked empty even though its value was there.
 */
const FIELD =
  "w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-ink-muted focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"

const LABEL = "mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-body"

/** Create/edit dialog. Prices stay strings while typing and parse once on submit. */
export function ProductForm({
  product,
  categories,
  onCancel,
  onSave,
}: {
  product: Product | null
  categories: string[]
  onCancel: () => void
  onSave: (input: ProductInput) => Promise<void>
}) {
  const [category, setCategory] = useState(product?.category ?? "")
  const [name, setName] = useState(product?.name ?? "")
  const [description, setDescription] = useState(product?.description ?? "")
  const [isActive, setIsActive] = useState(product?.isActive ?? true)
  const [sortOrder, setSortOrder] = useState(String(product?.sortOrder ?? 0))
  const [rows, setRows] = useState<SizeRow[]>(
    product?.sizes.length
      ? product.sizes.map((s) => ({
          size: s.size,
          priceType: s.priceType ?? "RETAIL",
          price: String(s.price),
        }))
      : [emptyRow()]
  )
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const setRow = (i: number, patch: Partial<SizeRow>) =>
    setRows((prev) => prev.map((r, n) => (n === i ? { ...r, ...patch } : r)))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const sizes = rows
      .filter((r) => r.size.trim() !== "" || r.price.trim() !== "")
      .map((r, i) => ({
        size: r.size.trim(),
        priceType: r.priceType.trim() || "RETAIL",
        price: Number(r.price),
        sortOrder: i,
      }))

    if (sizes.some((s) => !Number.isFinite(s.price) || s.price < 0)) {
      setError("Every pack size needs a price of 0 or more.")
      return
    }

    setBusy(true)
    try {
      await onSave({
        category: category.trim(),
        name: name.trim(),
        description: description.trim() || null,
        isActive,
        sortOrder: Number(sortOrder) || 0,
        sizes,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.")
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-navy-950/70 p-4 backdrop-blur-sm">
      <div className="my-auto w-full max-w-3xl rounded-[1.5rem] border border-line bg-surface shadow-2xl">
        {/* header */}
        <div className="flex items-start justify-between gap-6 border-b border-line px-8 py-6 md:px-10">
          <div>
            <span className="block h-px w-10 rule-gold" />
            <h2 className="display mt-4 text-[2.1rem] leading-none text-ink">
              {product ? "Edit product" : "New product"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line text-ink transition hover:border-gold-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={submit} className="px-8 py-7 md:px-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className={LABEL}>Category</span>
              <input
                required
                list="mgs-categories"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={cn(FIELD)}
                placeholder="GRIT"
              />
              <datalist id="mgs-categories">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>

            <label className="block">
              <span className={LABEL}>Name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn(FIELD)}
                placeholder="Shellgrit - Coarse"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className={LABEL}>Description</span>
            <textarea
              rows={2}
              value={description ?? ""}
              onChange={(e) => setDescription(e.target.value)}
              className={cn(FIELD, "resize-y")}
              placeholder="Optional"
            />
          </label>

          {/* pack sizes */}
          <div className="mt-8 rounded-2xl border border-line bg-surface-2 p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-ink">
                  Pack sizes &amp; prices
                </h3>
                <p className="mt-1 text-[12.5px] text-ink-body">
                  One line per bag size, exactly as the price list has it.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRows((r) => [...r, emptyRow()])}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition hover:border-gold-400"
              >
                <Plus className="h-3.5 w-3.5" />
                Add size
              </button>
            </div>

            {/* column headings, hidden on narrow screens where rows stack */}
            <div className="mt-5 hidden grid-cols-[1.1fr_1fr_1fr_auto] gap-3 px-1 sm:grid">
              <span className={cn(LABEL, "mb-0")}>Pack size</span>
              <span className={cn(LABEL, "mb-0")}>Price list</span>
              <span className={cn(LABEL, "mb-0")}>Price ($)</span>
              <span className="w-11" />
            </div>

            <div className="mt-2 space-y-3">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-[1.1fr_1fr_1fr_auto] sm:items-center"
                >
                  <input
                    value={row.size}
                    onChange={(e) => setRow(i, { size: e.target.value })}
                    className={cn(FIELD)}
                    placeholder="20KG"
                    aria-label={`Size ${i + 1}`}
                  />
                  <select
                    value={row.priceType}
                    onChange={(e) => setRow(i, { priceType: e.target.value })}
                    className={cn(FIELD)}
                    aria-label={`Price list ${i + 1}`}
                  >
                    <option value="RETAIL">RETAIL</option>
                    <option value="WHOLESALE">WHOLESALE</option>
                  </select>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-ink-muted">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      inputMode="decimal"
                      value={row.price}
                      onChange={(e) => setRow(i, { price: e.target.value })}
                      className={cn(FIELD, "pl-8")}
                      placeholder="0.00"
                      aria-label={`Price ${i + 1}`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setRows((r) => r.filter((_, n) => n !== i))}
                    disabled={rows.length === 1}
                    aria-label={`Remove size ${i + 1}`}
                    className="grid h-12 w-11 shrink-0 place-items-center justify-self-start rounded-xl border border-line text-ink-muted transition hover:border-red-400 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 sm:justify-self-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className={LABEL}>Sort order</span>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={cn(FIELD)}
              />
            </label>

            <label className="flex cursor-pointer items-center gap-3 self-end rounded-xl border border-line bg-surface-2 px-4 py-3.5">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 accent-gold-500"
              />
              <span className="text-[15px] font-semibold text-ink">
                Show on the website
              </span>
            </label>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-600"
            >
              {error}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
            <button
              type="submit"
              disabled={busy}
              className="rounded-full bg-navy-900 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-navy-700 disabled:opacity-60"
            >
              {busy ? "Saving…" : product ? "Save changes" : "Create product"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-line px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition hover:border-gold-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
