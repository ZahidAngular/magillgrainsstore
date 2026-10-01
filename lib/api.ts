/**
 * Client for the DelaPizza API that backs this site.
 *
 * The token lives in localStorage rather than a cookie: the API is a separate
 * origin issuing JWTs, and every dashboard screen is a client component, so
 * there is no server render that needs the session.
 */

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000"

/** Site whose catalogue this front end reads and writes. */
export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "Magill-Grains-Store"

const TOKEN_KEY = "mgs.token"
const USER_KEY = "mgs.user"
const REFRESH_KEY = "mgs.refresh"
const EXPIRES_KEY = "mgs.expiresAt"

export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T | null
}

export type PagedResult<T> = {
  items: T[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPrevious: boolean
  hasNext: boolean
}

export type AuthUser = {
  userId: number
  fullName: string
  email: string
  role: string
  siteName?: string | null
}

export type ProductSize = {
  productSizeId?: number
  size: string
  priceType?: string
  price: number
  sortOrder?: number
}

export type Product = {
  productId: number
  siteDetailId: number
  siteName: string
  category: string
  name: string
  description?: string | null
  image?: string | null
  imageUrl?: string | null
  /** Set when the store quotes wording rather than a number. */
  priceNote?: string | null
  isActive: boolean
  sortOrder: number
  createdAt: string
  updatedAt?: string | null
  sizes: ProductSize[]
}

export type ProductInput = {
  category: string
  name: string
  description?: string | null
  image?: string | null
  priceNote?: string | null
  isActive: boolean
  sortOrder: number
  sizes: { size: string; priceType?: string; price: number; sortOrder?: number }[]
}

/* ── session ─────────────────────────────────────────────────────────── */

export const auth = {
  get token() {
    if (typeof window === "undefined") return null
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch {
      // Private-mode browsers throw on access rather than returning null.
      return null
    }
  },
  get refreshToken() {
    if (typeof window === "undefined") return null
    try {
      return localStorage.getItem(REFRESH_KEY)
    } catch {
      return null
    }
  },
  /** Epoch ms the access token stops being valid, or null if unknown. */
  get expiresAt(): number | null {
    if (typeof window === "undefined") return null
    try {
      const raw = localStorage.getItem(EXPIRES_KEY)
      return raw ? Number(raw) : null
    } catch {
      return null
    }
  },
  get user(): AuthUser | null {
    if (typeof window === "undefined") return null
    try {
      const raw = localStorage.getItem(USER_KEY)
      return raw ? (JSON.parse(raw) as AuthUser) : null
    } catch {
      return null
    }
  },
  save(
    token: string,
    user: AuthUser,
    refreshToken?: string,
    expiresAt?: string
  ) {
    try {
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(USER_KEY, JSON.stringify(user))
      if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken)
      if (expiresAt) localStorage.setItem(EXPIRES_KEY, String(Date.parse(expiresAt)))
    } catch {
      /* storage unavailable — the session simply will not persist */
    }
    notify()
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      localStorage.removeItem(REFRESH_KEY)
      localStorage.removeItem(EXPIRES_KEY)
    } catch {
      /* nothing to clear */
    }
    notify()
  },
}

/*
 * Session as an external store. Reading localStorage during render would not
 * match the server snapshot, and setting it from an effect causes the cascading
 * render the lint rules reject — so components subscribe to it instead.
 *
 * getSnapshot has to return a stable reference or React re-renders forever, so
 * the parsed user is cached against the raw string it came from.
 */
let cachedRaw: string | null = null
let cachedUser: AuthUser | null = null

const listeners = new Set<() => void>()

function notify() {
  for (const fn of listeners) fn()
}

export function subscribeSession(onChange: () => void) {
  listeners.add(onChange)
  // Catches sign-out in another tab.
  window.addEventListener("storage", onChange)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener("storage", onChange)
  }
}

export function getSessionSnapshot(): AuthUser | null {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(TOKEN_KEY) ? localStorage.getItem(USER_KEY) : null
  } catch {
    raw = null
  }

  if (raw !== cachedRaw) {
    cachedRaw = raw
    try {
      cachedUser = raw ? (JSON.parse(raw) as AuthUser) : null
    } catch {
      cachedUser = null
    }
  }
  return cachedUser
}

/** The server render has no localStorage, so it always sees a signed-out page. */
export const getServerSessionSnapshot = (): AuthUser | null => null

/** Thrown for any non-2xx reply, carrying the API's own message. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message)
    this.name = "ApiError"
  }
}

type AuthPayload = {
  accessToken: string
  accessTokenExpiresAt: string
  refreshToken: string
  user: AuthUser
}

/*
 * A 60-minute access token would otherwise sign the store owner out mid-shift
 * — refreshed quietly in the background instead, using the 7-day refresh
 * token the login already issued. Only an actual "Sign out" click, or that
 * refresh token itself expiring from a week of inactivity, ends the session.
 *
 * Concurrent requests share one in-flight refresh rather than each racing to
 * rotate the (single-use) refresh token themselves.
 */
let refreshing: Promise<boolean> | null = null

async function doRefresh(): Promise<boolean> {
  const refreshToken = auth.refreshToken
  if (!refreshToken) return false

  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    })
    if (!res.ok) return false

    const payload = (await res.json()) as ApiResponse<AuthPayload>
    if (!payload.data) return false

    auth.save(
      payload.data.accessToken,
      payload.data.user,
      payload.data.refreshToken,
      payload.data.accessTokenExpiresAt
    )
    return true
  } catch {
    return false
  }
}

/** Refreshes now if the access token is missing, expired, or about to be. */
async function ensureFreshToken() {
  if (!auth.refreshToken) return
  const expiresAt = auth.expiresAt
  const needsRefresh = !auth.token || expiresAt === null || expiresAt - Date.now() < 30_000
  if (!needsRefresh) return

  refreshing ??= doRefresh().finally(() => {
    refreshing = null
  })
  const ok = await refreshing
  if (!ok) auth.clear() // refresh token itself expired or was revoked — a real sign-out
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown; auth?: boolean } = {}
): Promise<T> {
  const { method = "GET", body, auth: withAuth = true } = options

  if (withAuth) await ensureFreshToken()

  const send = () =>
    fetch(`${API_BASE}/api${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(withAuth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    })

  let res = await send()

  // Belt-and-braces: a token that expired between ensureFreshToken() and the
  // request landing (clock skew, a slow request) gets one retry after refresh.
  if (res.status === 401 && withAuth && auth.refreshToken) {
    const ok = await doRefresh()
    if (ok) res = await send()
  }

  let payload: ApiResponse<T> | null = null
  try {
    payload = (await res.json()) as ApiResponse<T>
  } catch {
    /* 204s and error pages have no JSON body */
  }

  if (!res.ok) {
    throw new ApiError(
      payload?.message || `Request failed (${res.status})`,
      res.status
    )
  }

  return payload?.data as T
}

/* ── endpoints ───────────────────────────────────────────────────────── */

export const api = {
  async login(email: string, password: string) {
    const data = await request<AuthPayload>("/auth/login", {
      method: "POST",
      body: { email, password },
      auth: false,
    })
    auth.save(data.accessToken, data.user, data.refreshToken, data.accessTokenExpiresAt)
    return data.user
  },

  async logout() {
    // Revokes the refresh token server-side so it can't quietly renew the
    // session again — best-effort, since the whole point of "sign out" is to
    // end the session locally even if the API call itself fails.
    try {
      await request<string>("/auth/logout", { method: "POST" })
    } catch {
      /* still signing out locally either way */
    }
    auth.clear()
  },

  listProducts(params: {
    siteName?: string
    category?: string
    search?: string
    isActive?: boolean
    /** Owner-only: returns hidden products alongside the live ones. */
    includeHidden?: boolean
    page?: number
    pageSize?: number
  }) {
    const query = new URLSearchParams()
    query.set("siteName", params.siteName ?? SITE_NAME)
    if (params.category) query.set("category", params.category)
    if (params.search) query.set("search", params.search)
    if (params.includeHidden) query.set("includeHidden", "true")
    if (params.isActive !== undefined) query.set("isActive", String(params.isActive))
    query.set("page", String(params.page ?? 1))
    query.set("pageSize", String(params.pageSize ?? 20))

    return request<PagedResult<Product>>(`/products?${query}`)
  },

  categories(siteName: string = SITE_NAME) {
    return request<string[]>(`/products/categories?siteName=${encodeURIComponent(siteName)}`)
  },

  createProduct(input: ProductInput) {
    return request<Product>("/products", { method: "POST", body: input })
  },

  updateProduct(id: number, input: ProductInput) {
    return request<Product>(`/products/${id}`, { method: "PUT", body: input })
  },

  deleteProduct(id: number) {
    return request<string>(`/products/${id}`, { method: "DELETE" })
  },
}
