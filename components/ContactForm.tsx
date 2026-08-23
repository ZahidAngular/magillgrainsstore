"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { site } from "@/lib/site"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Website enquiry from ${name || "a customer"}`
  )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={(e) => {
        e.preventDefault()
        window.location.href = mailto
      }}
    >
      <Field label="Name">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm outline-none transition focus:border-navy-500"
        />
      </Field>
      <Field label="E-mail">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm outline-none transition focus:border-navy-500"
        />
      </Field>
      <Field label="Message">
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm outline-none transition focus:border-navy-500"
        />
      </Field>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-navy-700"
      >
        Submit
        <Send className="h-4 w-4 text-gold-400" />
      </button>
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
