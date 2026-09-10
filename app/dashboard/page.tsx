"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, useSyncExternalStore } from "react"
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react"
import { ProductForm } from "@/components/dashboard/ProductForm"
import {
  api,
  getServerSessionSnapshot,
  getSessionSnapshot,
  SITE_NAME,
  subscribeSession,
  type PagedResult,
  type Product,
  type ProductInput,
} from "@/lib/api"

const PAGE_SIZE = 10

/** Which products the list shows. "all" covers live and hidden together. */
type StatusFilter = "all" | "live" | "hidden"

export default function DashboardPage() {
  const router = useRouter()

  const user = useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getServerSessionSnapshot
  )

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  // "all" is the default so hiding a product never makes it vanish from this list.
  const [status, setStatus] = useState<StatusFilter>("all")
  const [categories, setCategories] = useState<string[]>([])
  const [result, setResult] = useState<PagedResult<Product> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [editing, setEditing] = useState<Product | null>(null)
  const [creating, setCreating] = useState(false)
  // Bumped after a write so the list refetches without duplicating the effect.
  const [reloadKey, setReloadKey] = useState(0)

  // The session is unreadable during the server render, so the redirect can
  // only happen once the store has been read on the client.
  useEffect(() => {
    if (!user) router.replace("/login")
  }, [user, router])

  /**
   * Every state update below happens after an await, never in the effect body —
   * a synchronous setState here would trigger the cascading render that
   * react-hooks/set-state-in-effect exists to prevent.
   */
  useEffect(() => {
    if (!user) return
    let cancelled = false

    void (async () => {
      try {
        const [products, cats] = await Promise.all([
          api.listProducts({
            page,
            pageSize: PAGE_SIZE,
            search: search || undefined,
            category: category || undefined,
            // "live" sends neither flag — that is already the API's default.
            includeHidden: status === "all" || undefined,
            isActive: status === "hidden" ? false : undefined,
          }),
          api.categories(),
        ])
        if (cancelled) return
        setResult(products)
        setCategories(cats ?? [])
        setError(null)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : "Could not load products.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [user, page, search, category, status, reloadKey])

  const reload = () => {
    setLoading(true)
    setReloadKey((k) => k + 1)
  }

  async function save(input: ProductInput) {
    if (editing) await api.updateProduct(editing.productId, input)
    else await api.createProduct(input)
    setEditing(null)
    setCreating(false)
    reload()
  }

  async function remove(product: Product) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    try {
      await api.deleteProduct(product.productId)
      reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete.")
    }
  }

  function signOut() {
    api.logout()
    router.replace("/login")
  }

  // Nothing to show until the guard has confirmed a session.
  if (!user) return null

  const items = result?.items ?? []

  return (
    <main className="min-h-screen bg-surface">
      <header className="mesh-navy relative overflow-hidden">
        <div className="grain-texture absolute inset-0" />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-8">
          <div>
            <span className="block h-px w-10 rule-gold" />
            <h1 className="display mt-4 text-[2.4rem] leading-none text-white">
              Product catalogue
            </h1>
            <p className="mt-3 text-[13px] text-navy-200">
              {user.fullName} · {user.role} · site{" "}
              <span className="text-gold-400">{user.siteName ?? SITE_NAME}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[16rem] flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              value={search}
              onChange={(e) => {
                setPage(1)
                setLoading(true)
                setSearch(e.target.value)
              }}
              placeholder="Search products…"
              className="w-full rounded-xl border border-line bg-surface-2 py-3 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-gold-400"
            />
          </div>

          <select
            value={category}
            onChange={(e) => {
              setPage(1)
              setLoading(true)
              setCategory(e.target.value)
            }}
            className="rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-ink outline-none transition focus:border-gold-400"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => {
              setPage(1)
              setLoading(true)
              setStatus(e.target.value as StatusFilter)
            }}
            className="rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-ink outline-none transition focus:border-gold-400"
          >
            <option value="all">All statuses</option>
            <option value="live">Live only</option>
            <option value="hidden">Hidden only</option>
          </select>

          <button
            type="button"
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-navy-700"
          >
            <Plus className="h-4 w-4 text-gold-400" />
            New product
          </button>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {/* table */}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-surface-2">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.14em] text-ink-body">
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Sizes &amp; prices</th>
                <th className="px-6 py-4 font-bold">Price list</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-ink-muted">
                    Loading…
                  </td>
                </tr>
              )}

              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-ink-muted">
                    No products yet. Use “New product” to add the first one.
                  </td>
                </tr>
              )}

              {!loading &&
                items.map((p) => (
                  <tr key={p.productId} className="border-b border-line last:border-0">
                    <td className="px-6 py-4">
                      <span className="font-bold text-ink">{p.name}</span>
                      {p.description && (
                        <span className="mt-1 block text-[12px] text-ink-muted">
                          {p.description}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-ink-body">{p.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {p.sizes.length === 0 && (
                          <span className="text-ink-muted">—</span>
                        )}
                        {p.sizes.map((s) => (
                          <span
                            key={`${s.productSizeId ?? s.size}-${s.priceType}`}
                            className="rounded-full border border-line bg-surface px-3 py-1 text-[12px] font-semibold text-ink"
                          >
                            {s.size || "—"} · ${s.price.toFixed(2)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {[...new Set(p.sizes.map((s) => s.priceType).filter(Boolean))].map(
                          (t) => (
                            <span
                              key={t}
                              className="rounded-full bg-gold-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-accent-ink"
                            >
                              {t}
                            </span>
                          )
                        )}
                        {p.sizes.length === 0 && <span className="text-ink-muted">—</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          p.isActive
                            ? "rounded-full bg-gold-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-accent-ink"
                            : "rounded-full bg-surface-3 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted"
                        }
                      >
                        {p.isActive ? "Live" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditing(p)}
                          aria-label={`Edit ${p.name}`}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink transition hover:border-gold-400"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(p)}
                          aria-label={`Delete ${p.name}`}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-muted transition hover:border-red-400 hover:text-red-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* paging */}
        {result && result.totalCount > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[13px] text-ink-body">
              Page {result.page} of {result.totalPages} · {result.totalCount}{" "}
              product{result.totalCount === 1 ? "" : "s"}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={!result.hasPrevious}
                onClick={() => {
                  setLoading(true)
                  setPage((p) => Math.max(1, p - 1))
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition hover:border-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous
              </button>
              <button
                type="button"
                disabled={!result.hasNext}
                onClick={() => {
                  setLoading(true)
                  setPage((p) => p + 1)
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition hover:border-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </section>

      {(creating || editing) && (
        <ProductForm
          product={editing}
          categories={categories}
          onCancel={() => {
            setCreating(false)
            setEditing(null)
          }}
          onSave={save}
        />
      )}
    </main>
  )
}
