/**
 * Whether the online shop (Buy Now, cart, checkout, dashboard orders) is on.
 *
 * Off unless the build says otherwise: the orders API isn't live yet, so a
 * production build must never show Buy Now. `.env.development` turns it on for
 * `next dev`; set NEXT_PUBLIC_SHOP_ENABLED=1 on a build once the backend is
 * published.
 *
 * Kept out of lib/orders.ts on purpose: that module is "use client", and a
 * server component importing a value from it gets a client reference (always
 * truthy), not the boolean.
 */
export const SHOP_ENABLED = process.env.NEXT_PUBLIC_SHOP_ENABLED === "1"

/**
 * Whether checkout sends the order to the backend's /api/orders. Off until that
 * endpoint is published: in the meantime the order is only logged to the
 * browser console, so nothing reaches the store.
 */
export const ORDERS_API_ENABLED = process.env.NEXT_PUBLIC_ORDERS_API === "1"
