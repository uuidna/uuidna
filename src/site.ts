// site — the ONE navigable graph of every uuidna page, in a canonical order that WRAPS to a closed cover: every page
// has a next, so there is no "next gap" and no orphan. VitePress's native pager reads its `next` from this order
// (config.ts), and the release gate checks the order covers every real page (scripts/next.ts) — one source, so the
// button the reader clicks and the gap the gate hunts are the same edge. A page is a node; the order is a Hamiltonian
// walk over all nodes that returns to the start. Integrity, not truth.
import { theorems, SKILLS } from './theorems/index.js'
import { publications } from './publish.js'
import { lsRoot } from './boundary.js'

/** A page in the graph — its route and a short human label for the pager. */
export interface PageNode { route: string; text: string }

// ── STATIC PAGE DISCOVERY — Node-only (lsRoot), the SINGLE recursive walk of docs/ both scripts/next.ts's
//    readiness gap-check and docs/.vitepress/config.ts's live sidebar/nav now share, instead of each hand-typing
//    (and silently drifting from) its own copy of "what pages exist". FULL and exhaustive — every real .md page,
//    articles/ included — because the gap-check's whole job is to catch an orphan ANYWHERE, including 150+ deep
//    article pages; sidebar-scale filtering (collapsing articles/ to its one index entry) is computeSidebar's
//    job below, not this walk's, so the audit never loses coverage for the sake of the sidebar's display needs.
const walkStaticMd = (rel: string): string[] =>
  lsRoot(`docs/${rel}`).flatMap((e) => {
    if (e.name === '.vitepress') return []
    const childRel = rel ? `${rel}/${e.name}` : e.name
    if (e.isDirectory()) return walkStaticMd(childRel)
    return e.name.endsWith('.md') && !e.name.includes('[') ? [childRel] : []
  })

/** discoverStaticPages() → every real static section page under docs/ (including every article page), as
 *  {route, text}, EXCLUDING the homepage itself (index.md — not a sidebar/pager entry) and dynamic-route
 *  templates ([key].md / [slug].md). Node-only. */
export function discoverStaticPages(): PageNode[] {
  return walkStaticMd('')
    .map((rel) => '/' + rel.replace(/\.md$/, '').replace(/\/index$/, '').replace(/^index$/, ''))
    .filter((route) => route !== '/' && route !== '')
    .sort()
    .map((route) => ({ route, text: route.replace(/^\//, '') }))
}

// ── SIDEBAR CATEGORIES — the one place left deliberately editorial: WHICH named group a page belongs to is a
//    curation choice, not a decidable fact a theorem could settle. Kept small, visible, and singular (matching
//    the site footer's own four groups) rather than duplicated by hand across config.ts, the homepage table, and
//    SiteFooter.vue as it was before. Any real page NOT listed here still appears (in "More"), so a forgotten
//    category assignment is a visible gap, never a silent drop the way an un-added sidebar entry used to be.
export const SIDEBAR_CATEGORIES: readonly [string, string[]][] = [
  ['The ledger', ['/theorems', '/topics', '/grid', '/trials', '/quantum', '/quantum-cryptography', '/rosetta', '/rosetta-glagolitic', '/search', '/publications', '/news', '/articles', '/games']],
  ['Fuse it in', ['/school', '/mcp', '/chat', '/books', '/guides', '/chess', '/quantum-messaging', '/dimensions']],
  ['The captain', ['/captain', '/doctrine', '/succession', '/captain-claims']],
  ['Verify it yourself', ['/tests', '/analytics', '/deploy', '/changelog', '/prose-evidence']],
  ['The terms', ['/license', '/privacy', '/justice']],
]

/** Human labels for known routes — the readable text a slug alone doesn't carry. A route with no entry here still
 *  renders (title-cased from its slug), so an unlabelled new page is visible, not missing. */
const LABELS: Readonly<Record<string, string>> = {
  '/theorems': 'All theorems', '/topics': 'Topics (by skill)', '/grid': 'The 432 grid', '/trials': 'The trials',
  '/quantum': 'What quantum means', '/quantum-cryptography': 'Quantum Cryptography (course)',
  '/rosetta': 'Rosette rays', '/rosetta-glagolitic': 'The Glagolitic hypothesis', '/search': 'Search',
  '/publications': 'Publications', '/news': 'News (computed)', '/articles': 'Articles (computed)',
  '/games': 'Games', '/school': 'The school', '/mcp': 'MCP tools', '/chat': 'Chat', '/books': 'Books',
  '/guides': 'Guides', '/quantum-messaging': 'Quantum messaging', '/dimensions': 'Reading dimensions ◈',
  '/captain': "The captain's coins", '/doctrine': 'The doctrine', '/succession': 'Succession',
  '/captain-claims': 'Captain claims', '/tests': 'The tests', '/analytics': 'Analytics', '/deploy': 'Deploy',
  '/changelog': 'Changelog', '/prose-evidence': 'Prose evidence', '/license': 'License', '/privacy': 'Privacy',
  '/justice': 'Justice',
}
const labelOf = (route: string): string => LABELS[route] ??
  route.replace(/^\//, '').replace(/[-/]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

export interface SidebarGroup { text: string; items: { text: string; link: string }[] }

/** computeSidebar() → the live VitePress sidebar, computed from the REAL page tree (discoverStaticPages) grouped
 *  by SIDEBAR_CATEGORIES — a page that exists but was never added to a category still appears, under "More",
 *  instead of silently missing from the sidebar the way ten real pages (captain-claims, justice, license,
 *  privacy, prose-evidence, publications, quantum-messaging, rosetta, rosetta-glagolitic, search) previously did
 *  under the hand-typed array. Ledger-derived counts ride the label where one exists (theorem/skill totals).
 *  /articles/* subpages (150+, individually) are excluded from "More" — they're sidebar-scale-excluded by design
 *  (the single /articles entry covers them), not forgotten; discoverStaticPages still sees them for the gap audit. */
export function computeSidebar(): SidebarGroup[] {
  const real = discoverStaticPages().filter((p) => p.route === '/articles' || !p.route.startsWith('/articles/'))
  const realRoutes = new Set(real.map((p) => p.route))
  const placed = new Set<string>()
  const groups: SidebarGroup[] = SIDEBAR_CATEGORIES.map(([text, routes]) => ({
    text,
    items: routes.filter((r) => realRoutes.has(r)).map((r) => {
      placed.add(r)
      const label = labelOf(r)
      return { text: r === '/theorems' ? `${label} (${theorems().length})` : r === '/topics' ? `${label} — ${SKILLS.length} skills` : label, link: r }
    }),
  }))
  const uncategorised = real.filter((p) => !placed.has(p.route))
  if (uncategorised.length > 0) groups.push({ text: 'More', items: uncategorised.map((p) => ({ text: labelOf(p.route), link: p.route })) })
  return groups
}

/** canonicalOrder(staticPages) → every navigable page, ordered and wrapping: the given section pages first (in the
 *  order supplied), then every theorem in ledger order, then every publication. Deterministic and total — the pager
 *  and the gap-check both derive `next` from this, so the walk covers all nodes with no gap. */
// the theorem+publication tail of the sitemap is INVARIANT (the ledger is immutable at runtime); only the staticPages
// prefix varies per call. Build the tail ONCE (DRY) — the indices are the sitemap.
let _tail: PageNode[] | null = null
const sitemapTail = (): PageNode[] => (_tail ??= [
  ...theorems().map((x) => ({ route: `/theorem/${x.key}`, text: x.key })),
  ...publications().map((x) => ({ route: `/publications/${x.slug}`, text: x.title })),
])
export function canonicalOrder(staticPages: PageNode[]): PageNode[] {
  return [...staticPages, ...sitemapTail()]
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
