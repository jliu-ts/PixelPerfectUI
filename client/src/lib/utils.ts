import { clsx, type ClassValue } from "clsx"
import type { KeyboardEvent } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
