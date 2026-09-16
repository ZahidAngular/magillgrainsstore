"use client"

import { useState } from "react"
import { Check, Loader2, Send } from "lucide-react"
import { preloadRecaptcha, submitLead } from "@/lib/formService"

type Status = "idle" | "submitting" | "success" | "error"

/**
 * Sends the enquiry to the WebAppConsulting lead API (website id 32), which
 * emails it on — the visitor never has to open their own mail client.
 *
 * `emailLabel` exists because the store labelled this field differently on
 * different pages — "E-mail" on Contact Us, "Email Address" on the garden
 * page — and both wordings are theirs to keep.
 */
export function ContactForm({
  emailLabel = "E-mail",
}: {
  emailLabel?: string
} = {}) {
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    setStatus("submitting")
    try {
      await submitLead({
        fullName: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        // The store's form has no phone field; the API still expects the key.
        phone: "",
        comment: String(data.get("message") || ""),
      })
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  const input =
    "w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm outline-none transition focus:border-navy-500"

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <Field label="Name">
        <input
          required
          name="name"
          onFocus={preloadRecaptcha}
          className={input}
        />
      </Field>
      <Field label={emailLabel}>
        <input
          required
          type="email"
          name="email"
          onFocus={preloadRecaptcha}
          className={input}
        />
      </Field>
      <Field label="Message">
        <textarea
          required
          rows={5}
          name="message"
          className={`${input} resize-y`}
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-navy-700 disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            Sending
            <Loader2 className="h-4 w-4 animate-spin text-gold-400" />
          </>
        ) : (
          <>
            Submit
            <Send className="h-4 w-4 text-gold-400" />
          </>
        )}
      </button>

      {status === "success" && (
        <p
          role="status"
          className="flex items-center gap-2 rounded-xl border border-gold-400/40 bg-gold-400/10 px-4 py-3 text-sm font-semibold text-ink"
        >
          <Check className="h-4 w-4 text-accent-ink" />
          Thanks — your message has been sent. We&apos;ll be in touch soon.
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-600"
        >
          Something went wrong sending your message — please try again, or
          call us.
        </p>
      )}
    </form>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.16em] text-ink">
        {label}
      </span>
      {children}
    </label>
  )
}
