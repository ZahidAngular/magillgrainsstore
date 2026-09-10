"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowRight, Lock, Mail } from "lucide-react"
import { Logo } from "@/components/Logo"
import { api, auth } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  // Someone already signed in has no business on the login screen.
  useEffect(() => {
    if (auth.token) router.replace("/dashboard")
  }, [router])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await api.login(email.trim(), password)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.")
      setBusy(false)
    }
  }

  return (
    <main className="mesh-navy relative grid min-h-screen place-items-center overflow-hidden px-6 py-16">
      <div className="grain-texture absolute inset-0" />

      <div className="relative w-full max-w-md">
        <div className="flex justify-center">
          <Link href="/" aria-label="Magill Grain Store home">
            <Logo tone="light" />
          </Link>
        </div>

        <div className="mt-9 rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur md:p-10">
          <span className="block h-px w-10 rule-gold" />
          <h1 className="display mt-5 text-[2.2rem] leading-tight text-white">
            Store sign in
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-navy-200">
            Manage the product catalogue — prices, pack sizes and what shows on
            the shop pages.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-navy-100">
                Email
              </span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400" />
                <input
                  required
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-navy-950/40 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-navy-300 focus:border-gold-400"
                  placeholder="you@example.com"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-navy-100">
                Password
              </span>
              <span className="relative block">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400" />
                <input
                  required
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-navy-950/40 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-navy-300 focus:border-gold-400"
                  placeholder="••••••••"
                />
              </span>
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-200"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-7 py-4 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Signing in…" : "Sign in"}
              {!busy && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[13px] text-navy-200">
          <Link href="/" className="transition hover:text-gold-400">
            ← Back to the website
          </Link>
        </p>
      </div>
    </main>
  )
}
