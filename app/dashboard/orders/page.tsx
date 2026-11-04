"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, useSyncExternalStore } from "react"
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react"
import {
  api,
  getServerSessionSnapshot,
  getSessionSnapshot,
  ORDER_STATUSES,
  SITE_NAME,
  subscribeSession,
  type Order,
  type OrderStatus,
  type PagedResult,
} from "@/lib/api"

const PAGE_SIZE = 20

const money = (amount: number) => `$${amount.toFixed(2)}`

const when = (iso: string) =>
  new Date(iso.endsWith("Z") ? iso : `${iso}Z`).toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  })

/** Orders placed on the shop, for the store to prepare and hand over. */
export default function OrdersPage() {
  const router = useRouter()
  const user = useSyncExternalStore(subscribeSession, getSessionSnapshot, getServerSessionSnapshot)

  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<"" | OrderStatus>("")
  const [result, setResult] = useState<PagedResult<Order> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  // `user` is still the server's null on the first client render, so ask the
  // store directly before deciding nobody is signed in — otherwise a refresh on
  // this page would bounce through the sign-in screen.
  useEffect(() => {
    if (!user && !getSessionSnapshot()) router.replace("/login")
  }, [user, router])

  useEffect(() => {
    if (!user) return
    let cancelled = false
    void (async () => {
      try {
        const data = await api.listOrders({
          siteName: user.siteName ?? SITE_NAME,
          status: status || undefined,
          page,
          pageSize: PAGE_SIZE,
        })
        if (!cancelled) {
          setResult(data)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load orders.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [user, status, page, reloadKey])

  async function changeStatus(order: Order, next: OrderStatus) {
    try {
      await api.updateOrderStatus(order.orderId, next)
      setReloadKey((k) => k + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update the order.")
    }
  }

  if (!user) return null

  const items = result?.items ?? []
  const totalPages = Math.max(1, Math.ceil((result?.totalCount ?? 0) / PAGE_SIZE))

  return (
    <main className="min-h-screen bg-surface">
      <header className="mesh-navy relative overflow-hidden">
        <div className="grain-texture absolute inset-0" />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-8">
          <div>
            <span className="block h-px w-10 rule-gold" />
            <h1 className="display mt-4 text-[2.4rem] leading-none text-white">Orders</h1>
            <p className="mt-3 text-[13px] text-navy-200">
              {user.fullName} · {user.role} · site <span className="text-gold-400">{user.siteName ?? SITE_NAME}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
            >
              Products
            </Link>
            <button
              type="button"
              onClick={() => {
                api.logout()
                router.replace("/login")
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={status}
            onChange={(e) => {
              setPage(1)
              setLoading(true)
              setStatus(e.target.value as "" | OrderStatus)
            }}
            className="rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-ink outline-none transition focus:border-gold-400"
          >
            <option value="">All orders</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p role="alert" className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-surface-2">
          <table className="w-full min-w-[56rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.14em] text-ink-body">
                <th className="px-6 py-4 font-bold">Order</th>
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Items</th>
                <th className="px-6 py-4 font-bold">Total</th>
                <th className="px-6 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-ink-muted">
                    Loading orders…
                  </td>
                </tr>
              )}
              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-ink-muted">
                    No orders yet.
                  </td>
                </tr>
              )}
              {!loading &&
                items.map((order) => (
                  <tr key={order.orderId} className="border-b border-line align-top last:border-0">
                    <td className="px-6 py-5">
                      <p className="font-extrabold tracking-wider text-ink">{order.orderNumber}</p>
                      <p className="mt-1 text-xs text-ink-muted">{when(order.createdAt)}</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-ink">{order.customerName}</p>
                      <a href={`tel:${order.phone}`} className="block text-ink-body hover:text-accent-ink">
                        {order.phone}
                      </a>
                      <a href={`mailto:${order.email}`} className="block text-ink-body hover:text-accent-ink">
                        {order.email}
                      </a>
                      {order.notes && <p className="mt-2 text-xs italic text-ink-body">&ldquo;{order.notes}&rdquo;</p>}
                    </td>
                    <td className="px-6 py-5">
                      <ul className="space-y-1">
                        {order.items.map((item, i) => (
                          <li key={i} className="text-ink-body">
                            {item.quantity} × <span className="font-semibold text-ink">{item.productName}</span>
                            {item.sizeLabel ? ` (${item.sizeLabel})` : ""}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-extrabold text-accent-ink">{money(order.total)}</p>
                      <p className="mt-1 text-xs text-ink-muted">
                        {order.paymentMethod === "PayAtPickup" ? "Pay at pickup" : order.paymentMethod} · {order.paymentStatus}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <select
                        value={order.status}
                        onChange={(e) => changeStatus(order, e.target.value as OrderStatus)}
                        className="rounded-xl border border-line bg-surface px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-gold-400"
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between text-sm text-ink-body">
            <span>
              Page {page} of {totalPages} · {result?.totalCount} orders
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => {
                  setLoading(true)
                  setPage((p) => p - 1)
                }}
                className="inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 font-bold uppercase tracking-wide disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => {
                  setLoading(true)
                  setPage((p) => p + 1)
                }}
                className="inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 font-bold uppercase tracking-wide disabled:opacity-40"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
