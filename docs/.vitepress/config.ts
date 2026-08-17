// docs/.vitepress/config.ts — uuidna VitePress Configuration
// Beautiful documentation site built from markdown

import { defineConfig } from 'vitepress'
import { SITE, urlOf } from '../../src/site/index.js'
import { infuseQuantumPayload } from './uuidna-quantum.js'

// relativePath → clean route (cleanUrls): 'guides.md' → '/guides', 'index.md' → '/'
const routeOf = (rel: string): string => '/' + rel.replace(/\.md$/, '').replace(/\/index$/, '').replace(/^index$/, '')

export default defineConfig({
  // /lean/*.lean files are copied INTO the built site AFTER `vitepress build` (copy-lean-to-site.js), so at
  // check time these links are "dead" by construction — and alive in production. The REAL gate for them is
  // copy-lean-to-site's own forensic scan, which FAILS the build if any /lean link in the built HTML is broken
  // (it runs after the copy, so it sees the truth). Exempt ONLY that class; every other dead link still fails.
  ignoreDeadLinks: [/^\/lean\//],
  title: SITE.name,
  description: SITE.description,

  head: [
    // schema.org/OG strict: Open Graph tags carry `property`, not `name` (RDFa); twitter:card correctly uses `name`.
    ['meta', { property: 'og:title', content: SITE.name }],
    ['meta', { property: 'og:description', content: SITE.tagline }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  themeConfig: {
    siteTitle: SITE.mark + ' ' + SITE.name,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'School', link: '/school' },
      { text: 'Doctrine', link: '/doctrine' },
      { text: 'Theorems', link: '/theorems' },
    ],

    // The captain's four groups — the ONE categorization, same as the site footer (SiteFooter.vue).
    sidebar: {
      '/': [
        {
          text: 'The ledger',
          items: [
            { text: 'All theorems', link: '/theorems' },
            { text: 'Topics (by skill)', link: '/topics' },
            { text: 'The trials', link: '/trials' },
            { text: 'What quantum means', link: '/quantum' },
            { text: 'Quantum Cryptography (course)', link: '/quantum-cryptography' },
            { text: 'News (computed)', link: '/news' },
            { text: 'Articles (computed)', link: '/articles/' },
            { text: 'Games', link: '/games' },
          ],
        },
        {
          text: 'Fuse it in',
          items: [
            { text: 'The school', link: '/school' },
            { text: 'MCP tools', link: '/mcp' },
            { text: 'Chat', link: '/chat' },
            { text: 'Books', link: '/books' },
            { text: 'Guides', link: '/guides' },
            { text: 'Reading dimensions ◈', link: '/dimensions' },
          ],
        },
        {
          text: 'The captain',
          items: [
            { text: "The captain's coins", link: '/captain' },
            { text: 'The doctrine', link: '/doctrine' },
            { text: 'Succession', link: '/succession' },
          ],
        },
        {
          text: 'Verify it yourself',
          items: [
            { text: 'The tests', link: '/tests' },
            { text: 'Analytics', link: '/analytics' },
            { text: 'Deploy', link: '/deploy' },
            { text: 'Changelog', link: '/changelog' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: SITE.repo },
    ],

    footer: {
      message: SITE.mark + ' ' + SITE.description,
      copyright: 'uuidna — All theorems sealed to ledger',
    },

    search: {
      provider: 'local',
    },
  },

  vite: {
    define: {
      __DEV__: 'true',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },

  build: {
    rollupOptions: {},
  },

  // The build IS the forensic: a deleted page that other pages still link to FAILS the build. NOTHING is ignored —
  // markdown links point at PAGES (the MCP-computed presentations: /theorem/<key>, /publications/<slug>), never at
  // raw served files, so the checker sees every link. The served assets (/lean/*.lean proofs, /seeds/*) are still
  // shipped and get their own forensic: copy-lean-to-site scans every built HTML page and FAILS if any /lean or
  // /seeds reference lacks a served file. Two forensics, zero ignores, zero blind spots.
  cleanUrls: true,

  // Learned from the site-config reference (vitepress.dev/reference/site-config), defaults kept elsewhere:
  // the sitemap makes every page discoverable at the canonical host; lastUpdated reads each page's timestamp
  // from git — measured, not typed.
  sitemap: { hostname: SITE.origin },
  lastUpdated: true,

  // FUSE the uuidna payload with VitePress (re-wired 2026-08-15 — the plugin had been orphaned by an earlier
  // config rewrite; no page is a dead node to a crawler):
  //   • Canonical → uuidna.com on EVERY page, whichever host serves it (.net PaaS, a [contract-uuid].uuidna.org
  //     SaaS subdomain, a commercial CNAME) — crawlers fold the copies to the one recomputable home.
  //   • Static pages get the quantum payload (content-address + recomputable SEO) from uuidna-quantum.ts.
  //   • Dynamic theorem pages get their own Lean statement as the unique meta description.
  transformPageData(pageData) {
    const p = pageData.params as { address?: string; key?: string; slug?: string; statement?: string; tactic?: string; principle?: string } | undefined
    const slug = p?.key ? `theorem/${p.key}` : p?.slug ? `publications/${p.slug}`
      : pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const canonical = urlOf(slug)   // the ONE origin — a third hardcoded copy lived here until 2026-08-18
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:url', content: canonical }],
    )
    if (p?.statement) pageData.description = `${p.statement} — proven by ${p.tactic} in Lean 4, sorry-free (no Mathlib); part of ${p.principle}.`
    // EVERY page — static AND dynamic — gets the quantum payload + strict schema.org JSON-LD from the ONE source;
    // the theorem/publication pages' ScholarlyArticle was the last unaligned surface ("align all", 2026-08-16).
    infuseQuantumPayload(pageData as never, routeOf)
  },
})
