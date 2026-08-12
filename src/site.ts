// site — the ONE navigable graph of every uuidna page, in a canonical order that WRAPS to a closed cover: every page
// has a next, so there is no "next gap" and no orphan. VitePress's native pager reads its `next` from this order
// (config.ts), and the release gate checks the order covers every real page (scripts/next.ts) — one source, so the
// button the reader clicks and the gap the gate hunts are the same edge. A page is a node; the order is a Hamiltonian
// walk over all nodes that returns to the start. Integrity, not truth.
import { theorems } from './theorems/index.js'
import { publications } from './publish.js'

/** A page in the graph — its route and a short human label for the pager. */
export interface PageNode { route: string; text: string }

/** canonicalOrder(staticPages) → every navigable page, ordered and wrapping: the given section pages first (in the
 *  order supplied), then every theorem in ledger order, then every publication. Deterministic and total — the pager
 *  and the gap-check both derive `next` from this, so the walk covers all nodes with no gap. */
export function canonicalOrder(staticPages: PageNode[]): PageNode[] {
  const t: PageNode[] = theorems().map((x) => ({ route: `/theorem/${x.key}`, text: x.key }))
  const p: PageNode[] = publications().map((x) => ({ route: `/publications/${x.slug}`, text: x.title }))
  return [...staticPages, ...t, ...p]
}

/** nextOf(order) → a map route → the next route (wrapping), the closed cover the native pager follows. */
export function nextOf(order: PageNode[]): Map<string, PageNode> {
  const m = new Map<string, PageNode>()
  order.forEach((n, i) => m.set(n.route, order[(i + 1) % order.length]))
  return m
}

/** A gap — a page that exists but is not covered by the canonical order (no next), the orphan the graph reveals. */
export function gaps(order: PageNode[], allRoutes: string[]): string[] {
  const covered = new Set(order.map((n) => n.route))
  return allRoutes.filter((r) => !covered.has(r))
}
