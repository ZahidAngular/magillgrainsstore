"use client"

import { Moon, Sun } from "lucide-react"
import { useSyncExternalStore } from "react"

export type Theme = "light" | "dark"

/**
 * Runs before paint via a blocking inline script in <head>, so the correct
 * theme class is on <html> before the first frame and there is no flash.
 * Kept as a string because it must execute ahead of React hydration.
 */
export const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`

/*
 * The <html> class is the source of truth — the pre-paint script sets it before
 * React exists. Subscribing to it rather than mirroring it into state keeps the
 * two from drifting, and the server snapshot ("light") matches the markup React
 * renders on the server, so hydration stays clean.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light"

const getServerSnapshot = (): Theme => "light"

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    const root = document.documentElement
    root.classList.add("theme-switching")
    root.classList.toggle("dark", next === "dark")
    try {
      localStorage.setItem("theme", next)
    } catch {
      // Private mode or blocked storage — the toggle still works for this visit.
    }
    window.setTimeout(() => root.classList.remove("theme-switching"), 60)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      className="grid h-11 w-11 place-items-center rounded-lg border border-line text-ink transition hover:bg-surface-3"
    >
      {theme === "dark" ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  )
}
