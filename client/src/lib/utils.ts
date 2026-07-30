import { clsx, type ClassValue } from "clsx"
import type { KeyboardEvent } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Render an ISO timestamp as a relative label, computed at render rather than baked in.
 * A stored string like "2h ago" is correct for one afternoon and wrong forever after, which
 * reads as fake on content that is genuinely dated.
 *
 * Weeks stop at 4; beyond that months are the honest unit.
 */
export function relativeTime(iso: string, now: Date = new Date()) {
  const seconds = Math.max(0, (now.getTime() - new Date(iso).getTime()) / 1000)
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24

  if (minutes < 1) return "just now"
  if (minutes < 60) return `${Math.floor(minutes)}m ago`
  if (hours < 24) return `${Math.floor(hours)}h ago`
  if (days < 7) return `${Math.floor(days)}d ago`
  if (days < 28) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.max(1, Math.floor(days / 30))}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

/**
 * Spread onto a non-semantic element (a card, tile, or row) to make it operable by keyboard
 * as well as pointer. Enter and Space activate, matching native button behaviour; Space is
 * prevented so it does not scroll the page instead.
 *
 * Do not use on a container that already holds a button or link — nesting interactive
 * elements confuses assistive tech. Give the inner control the action instead.
 */
export function clickable(onActivate: () => void) {
  return {
    role: "button",
    tabIndex: 0,
    onClick: onActivate,
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        onActivate()
      }
    },
  }
}
