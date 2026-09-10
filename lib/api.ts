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
  get user(): AuthUser | null {
    if (typeof window === "undefined") return null
    try {
      const raw = localStorage.getItem(USER_KEY)
      return raw ? (JSON.parse(raw) as AuthUser) : null
    } catch {
      return null
    }
  },
  save(token: string, user: AuthUser) {
    try {
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch {
      /* storage unavailable — the session simply will not persist */
    }
    notify()
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
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

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown; auth?: boolean } = {}
): Promise<T> {
  const { method = "GET", body, auth: withAuth = true } = options
  const token = withAuth ? auth.token : null

  const res = await fetch(`${API_BASE}/api${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  })

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
    const data = await request<{ accessToken: string; user: AuthUser }>(
      "/auth/login",
      { method: "POST", body: { email, password }, auth: false }
    )
    auth.save(data.accessToken, data.user)
    return data.user
  },

  logout() {
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
