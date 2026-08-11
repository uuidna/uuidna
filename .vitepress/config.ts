import { defineConfig } from 'vitepress'
import { theorems, PRINCIPLES } from '../dist/index.js'

// Lean is the single source. The nav, the sidebar (one collapsed group per computing principle) and the per-theorem
// SEO meta are all derived here from the same compiled ledger the pages render — nothing is hand-maintained.
// Requires `npm run build` (→ dist/) first; `npm run docs:build` runs it in order.
type T = { key: string; name: string; principle: string; statement: string; tactic: string; address: string }

const LEDGER = theorems() as T[]
const order = PRINCIPLES.map((p: string[]) => p[1]).filter((name: string) => LEDGER.some((t) => t.principle === name))
const blurb = Object.fromEntries(PRINCIPLES.map((p: string[]) => [p[1], p[2]])) as Record<string, string>

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
    if (!p?.address) return
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { property: 'og:title', content: p.name }],
      ['meta', { property: 'og:description', content: `${p.statement} — proven by ${p.tactic} in Lean 4.` }],
      ['meta', { property: 'uuidna:address', content: p.address }],
    )
  },

  themeConfig: {
    logo: undefined,
    search: { provider: 'local' },
    outline: 'deep',

    nav: [
      { text: 'Home', link: '/' },
      { text: `Theorems`, link: '/theorems' },
      { text: 'MCP', link: '/mcp' },
      { text: 'Captain', items: [{ text: "The captain's message", link: '/captain/message' }, { text: 'The Navigator', link: '/captain/navigator' }] },
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

    footer: {
      message: 'License CC BY-NC 4.0 — Tsvetan Rouschev.',
      copyright: 'License CC BY-NC 4.0 — Tsvetan Rouschev.',
    },
  },
})

// principle blurbs are surfaced on /theorems and per-theorem pages via the data loader; referenced here so the
// import is not dead when the sidebar labels are trimmed.
void blurb
