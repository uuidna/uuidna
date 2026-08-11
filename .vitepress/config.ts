import { defineConfig } from 'vitepress'
import { theorems, PRINCIPLES } from '../dist/index.js'

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
const seqNav: Record<string, { prev?: { text: string; link: string }; next?: { text: string; link: string } }> = {}
LEDGER.forEach((t, i) => {
  seqNav[t.key] = {
    prev: i > 0 ? { text: LEDGER[i - 1].key, link: `/theorem/${LEDGER[i - 1].key}` } : undefined,
    next: i < LEDGER.length - 1 ? { text: LEDGER[i + 1].key, link: `/theorem/${LEDGER[i + 1].key}` } : undefined,
  }
})

// One collapsed sidebar group per principle; every proven theorem is a leaf linking to its show page.
const theoremSidebar = order.map((name) => ({
  text: `${name} · ${LEDGER.filter((t) => t.principle === name).length}`,
  collapsed: true,
  items: LEDGER.filter((t) => t.principle === name).map((t) => ({ text: t.name, link: `/theorem/${t.key}` })),
}))

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
      : pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const canonical = `https://uuidna.com/${slug}`
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:url', content: canonical }],
    )

    if (!p?.address) return
    // Per-page meta description (Google SEO: unique, descriptive per page) — the theorem's own statement, not the
    // shared site description. VitePress renders pageData.description as the <meta name="description">.
    pageData.description = `${p.statement} — proven by ${p.tactic} in Lean 4, sorry-free (no Mathlib); part of ${p.principle}.`
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { property: 'og:title', content: p.name }],
      ['meta', { property: 'og:description', content: `${p.statement} — proven by ${p.tactic} in Lean 4.` }],
      ['meta', { property: 'uuidna:address', content: p.address }],
    )
    // Official prev/next doc-footer links (VitePress frontmatter) — the ledger's sequence neighbours.
    const nav = seqNav[p.key]
    if (nav?.prev) pageData.frontmatter.prev = nav.prev
    if (nav?.next) pageData.frontmatter.next = nav.next
  },

  themeConfig: {
    logo: undefined,
    search: { provider: 'local' },
    outline: 'deep',

    nav: [
      { text: 'Home', link: '/' },
      { text: `Theorems`, link: '/theorems' },
      { text: 'Topics', link: '/topics' },
      { text: 'MCP', link: '/mcp' },
      { text: 'Captain', items: [{ text: 'The Contract', link: '/captain/config' }, { text: "The captain's message", link: '/captain/message' }, { text: 'The Navigator', link: '/captain/navigator' }] },
    ],

    sidebar: {
      '/theorem/': theoremSidebar,
      '/theorems': [{ text: 'The ledger', items: [{ text: 'All theorems', link: '/theorems' }] }, ...theoremSidebar],
    },

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
