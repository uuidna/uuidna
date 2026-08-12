import { defineConfig } from 'vitepress'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems, PRINCIPLES, canonicalOrder, type PageNode } from '../dist/index.js'

// Lean is the single source. The nav, the sidebar (one collapsed group per computing principle) and the per-theorem
// SEO meta are all derived here from the same compiled ledger the pages render — nothing is hand-maintained.
// Requires `npm run build` (→ dist/) first; `npm run docs:build` runs it in order.
type T = { key: string; name: string; principle: string; statement: string; tactic: string; address: string }

const LEDGER = theorems() as T[]
const order = PRINCIPLES.map((p: string[]) => p[1]).filter((name: string) => LEDGER.some((t) => t.principle === name))
const blurb = Object.fromEntries(PRINCIPLES.map((p: string[]) => [p[1], p[2]])) as Record<string, string>

// Sequence neighbours (ledger order) → the OFFICIAL VitePress prev/next doc-footer links, set per page in
// transformPageData below (https://vitepress.dev/reference/default-theme-prev-next-links). A concise key label
// so the footer bar stays short; the full three-axis compass still lives in the page body.
// The discovery sequence is CYCLIC: the tip's next wraps to the genesis and the genesis's prev wraps to the tip,
// so a reader clicking the doc-footer "next" covers all N theorems exactly as the sequence discovered them, then
// closes the loop — no terminal gap. (The per-axis frontiers, where a theorem is genuinely missing, are surfaced
// separately on the page body as the "invisible next".) Stride 1 is coprime to any N → one full cycle covering all.
// The ONE navigable graph: every page — sections, theorems, publications — in a canonical wrapping walk, so EVERY
// page has a native prev/next and there is NO next-gap (the closed cover scripts/next.js verifies). The native
// pager is fed from this SAME order (below), so the button the reader clicks and the gap the release gate hunts are
// the one edge. Static section pages are discovered from docs/ (every .md that is not a dynamic-route template) and
// sorted for determinism; canonicalOrder appends the theorems (ledger order) then the publications.
const routeOf = (rel: string): string => '/' + rel.replace(/\.md$/, '').replace(/\/index$/, '').replace(/^index$/, '')
const DOCS = fileURLToPath(new URL('../docs', import.meta.url))
const walkMd = (dir: string, base = ''): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walkMd(join(dir, e.name), base + e.name + '/')
    : e.name.endsWith('.md') && !e.name.includes('[') ? [base + e.name] : [])
const staticPages: PageNode[] = walkMd(DOCS)
  .map((rel) => ({ route: routeOf(rel), text: routeOf(rel).slice(1) || 'home' }))
  .sort((a, b) => a.route.localeCompare(b.route))
const ORDER = canonicalOrder(staticPages) as PageNode[]
const NW = ORDER.length
const walkNav = new Map<string, { prev: PageNode; next: PageNode }>()
ORDER.forEach((n, i) => walkNav.set(n.route, { prev: ORDER[(i - 1 + NW) % NW], next: ORDER[(i + 1) % NW] }))

// One collapsed sidebar group per principle; every proven theorem is a leaf linking to its show page.
const theoremSidebar = order.map((name) => ({
  text: `${name} · ${LEDGER.filter((t) => t.principle === name).length}`,
  collapsed: true,
  items: LEDGER.filter((t) => t.principle === name).map((t) => ({ text: t.name, link: `/theorem/${t.key}` })),
}))

// The sidebar was a GAP: it existed only on /theorem/ pages, so every section page (home, /trials, /deploy, /mcp,
// the captain's cabin …) had NO sidebar — navigation split across the top nav, the pager and this theorem-only tree,
// three structures for one site. Close it from the SAME canonical walk the pager reads (ORDER): one sidebar, shown on
// every page, whose sections and publications come off the one graph so nothing is orphaned and nothing is repeated.
const prettyRoute = (route: string): string =>
  route === '/' ? 'Home'
    : route.slice(1).split('/').map((s) => s === 'mcp' ? 'MCP' : s.charAt(0).toUpperCase() + s.slice(1)).join(' · ')
const inWalk = (pred: (r: string) => boolean) => ORDER.filter((n) => pred(n.route)).map((n) => ({ text: prettyRoute(n.route), link: n.route }))
// The full site tree, in ONE order for EVERY page: the sections first (the voyage), then each publication, then the
// 45 principle groups of theorems. Derived, not hand-listed — add a page and it appears; remove one and it's gone.
const siteSidebar = [
  { text: `The voyage · ${ORDER.filter((n) => !n.route.startsWith('/theorem/') && !n.route.startsWith('/publications/')).length}`,
    collapsed: false, items: inWalk((r) => !r.startsWith('/theorem/') && !r.startsWith('/publications/')) },
  { text: `Publications · ${ORDER.filter((n) => n.route.startsWith('/publications/')).length}`,
    collapsed: true, items: inWalk((r) => r.startsWith('/publications/')) },
  ...theoremSidebar,
]

export default defineConfig({
  title: 'uuidna',
  description:
    'Content-addressed identity, honest by construction. ' +
    `${LEDGER.length} theorems proven in Lean 4 (by decide, sorry-free), folded to one recomputable receipt. `,
  lang: 'en-US',
  cleanUrls: true,
  outDir: 'site', // wrangler.toml serves ./site — VitePress now produces it
  srcDir: 'docs',
  lastUpdated: true,
  ignoreDeadLinks: true,
  sitemap: { hostname: 'https://uuidna.com' },

  head: [
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'uuidna' }],
    // PWA — installable, offline-capable. Manifest + theme + icons, and the service worker registered on load.
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#0b1020' }],
    ['link', { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/icon.svg' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'uuidna' }],
    ['script', {}, `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})})}`],
  ],

  // Per-theorem Open Graph + content-address meta, derived from the dynamic-route params.
  transformPageData(pageData) {
    const p = pageData.params as (T & Record<string, string>) | undefined

    // Canonical → uuidna.com, on EVERY page, whichever host actually serves it: the
    // .net PaaS, a [contract-uuid].uuidna.org SaaS subdomain, or a commercial CNAME.
    // Relative links follow the serving host by design (that is why /captain/message
    // renders as uuidna.net/captain/message on the .net deployment); rel=canonical
    // names the one recomputable home so crawlers fold the copies to a single source
    // instead of splitting them as duplicate content. https://vitepress.dev/reference/site-config
    const slug = p?.key
      ? `theorem/${p.key}`
      : p?.slug
      ? `publications/${p.slug}`
      : pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const canonical = `https://uuidna.com/${slug}`

    // The native prev/next pager — ONE button, fed from the canonical walk, on EVERY page (no next-gap). The route
    // is the theorem/publication dynamic slug or the static page's own path; the walk wraps, so there is always a next.
    const route = p?.key ? `/theorem/${p.key}` : p?.slug ? `/publications/${p.slug}` : routeOf(pageData.relativePath)
    const nav = walkNav.get(route)
    if (nav) {
      pageData.frontmatter.prev = { text: nav.prev.text, link: nav.prev.route }
      pageData.frontmatter.next = { text: nav.next.text, link: nav.next.route }
    }
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:url', content: canonical }],
    )

    if (!p?.address) return
    // Per-page meta description (Google SEO: unique, descriptive per page) — the theorem's own statement, not the
    // shared site description. VitePress renders pageData.description as the <meta name="description">.
    pageData.description = `${p.statement} — proven by ${p.tactic} in Lean 4, sorry-free (no Mathlib); part of ${p.principle}.`
    // INLINE FRONTMATTER TAGS — the capability axis, organised as page tags. The skill is authored in Lean (the
    // single source, carried through the manifest → ledger → params), so the tag on the page IS the sealed skill,
    // never a hand-kept list; the principle rides alongside as the derivation-cluster tag.
    pageData.frontmatter.tags = [p.skill, p.principle].filter(Boolean)
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { property: 'og:title', content: p.name }],
      ['meta', { property: 'og:description', content: `${p.statement} — proven by ${p.tactic} in Lean 4.` }],
      ['meta', { property: 'uuidna:address', content: p.address }],
      // the LLM/microdata facet — skill and principle as machine-readable keywords + a typed uuidna:skill tag.
      ['meta', { property: 'uuidna:skill', content: p.skill || '' }],
      ['meta', { name: 'keywords', content: [p.skill, p.principle].filter(Boolean).join(', ') }],
    )
  },

  themeConfig: {
    logo: undefined,
    search: { provider: 'local' },
    outline: 'deep',

    nav: [
      { text: 'Home', link: '/' },
      { text: `Theorems`, link: '/theorems' },
      { text: 'Topics', link: '/topics' },
      { text: 'Rosette', link: '/rosetta' },
      { text: 'MCP', link: '/mcp' },
      { text: 'Books', link: '/books' },
      { text: 'Publications', link: '/publications' },
      { text: 'Vocabulary', link: '/vocabulary' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Guides', link: '/guides' },
      { text: 'Captain', items: [{ text: 'The Contract', link: '/captain/config' }, { text: "The captain's message", link: '/captain/message' }, { text: 'The Navigator', link: '/captain/navigator' }] },
    ],

    // ONE sidebar for the whole site (the '/' key matches every route), so no page is left without the graph — the
    // gap that split navigation into three structures is closed. Derived from the same canonical walk as the pager.
    sidebar: { '/': siteSidebar },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/uuidna/uuidna' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@uuidna/uuidna' },
    ],

    editLink: {
      pattern: 'https://github.com/uuidna/uuidna/edit/main/:path',
      text: 'Edit / source on GitHub',
    },

    // The footer is the global categorised SiteFooter (theme layout-bottom slot) — shown on every page, not just
    // no-sidebar ones, so the default-theme `footer` config is intentionally omitted here.
  },
})

// principle blurbs are surfaced on /theorems and per-theorem pages via the data loader; referenced here so the
// import is not dead when the sidebar labels are trimmed.
void blurb
