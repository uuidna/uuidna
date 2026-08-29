// docs/.vitepress/config.ts — uuidna VitePress Configuration
// Beautiful documentation site built from markdown

import { defineConfig } from 'vitepress'
import { SITE, urlOf, OG_IMAGE } from '../../src/site/index.js'
import { computeSidebar, discoverStaticPages, canonicalOrder, nextOf } from '../../src/site.js'
import { infuseQuantumPayload } from './uuidna-quantum.js'
import { theorems } from '../../src/theorems/index.js'
import { handleOf } from '../../src/handle.js'
import { hexFaceOf } from '../../src/hexagram.js'

// relativePath → clean route (cleanUrls): 'guides.md' → '/guides', 'index.md' → '/'
const routeOf = (rel: string): string => '/' + rel.replace(/\.md$/, '').replace(/\/index$/, '').replace(/^index$/, '')

/** Wrapping walk next for THIS route — baked into page data so Layout never imports the census. */
let WALK: Map<string, { text: string; link: string }> | null = null
function walkNextOf(route: string): { text: string; link: string } | undefined {
  if (!WALK) {
    WALK = new Map()
    for (const [from, to] of nextOf(canonicalOrder(discoverStaticPages()))) {
      WALK.set(from, { text: to.text, link: to.route })
    }
  }
  const key = route.replace(/\/$/, '') || '/'
  return WALK.get(key) ?? WALK.get(route)
}

export default defineConfig({
  // /lean/*.lean files are copied INTO the built site AFTER `vitepress build` (copy-lean-to-site.js), so at
  // check time these links are "dead" by construction — and alive in production. The REAL gate for them is
  // copy-lean-to-site's own forensic scan, which FAILS the build if any /lean link in the built HTML is broken
  // (it runs after the copy, so it sees the truth). Exempt ONLY that class; every other dead link still fails.
  ignoreDeadLinks: [/^\/lean\//],
  title: SITE.name,
  titleTemplate: ':title · uuidna',
  description: SITE.description,

  head: [
    // schema.org/OG strict: Open Graph tags carry `property`, not `name` (RDFa); twitter:card correctly uses `name`.
    ['meta', { property: 'og:title', content: SITE.name }],
    ['meta', { property: 'og:description', content: SITE.description }],
    ['meta', { property: 'og:image', content: OG_IMAGE }],
    // summary_large_image restored — docs/public/og.png (1200×630) ships with the site.
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: OG_IMAGE }],
    // browsers still probe /favicon.ico by default; declare the served SVG so the 47/day bare-probe 404s stop
    // once clients honour the link, and the worker rewrites /favicon.ico → /icon.svg for the rest
    ['link', { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' }],
  ],

  themeConfig: {
    siteTitle: SITE.name,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'School', link: '/school' },
      { text: 'Doctrine', link: '/doctrine' },
      { text: 'Theorems', link: '/theorems' },
    ],

    // computeSidebar() (src/site.ts) walks the REAL docs/ tree (boundary.ts's lsRoot, Node-only — safe here,
    // config.ts only ever runs server-side) and groups it by SIDEBAR_CATEGORIES, the one editorial manifest —
    // not a hand-typed sidebar duplicating a categorisation that also lives, separately, in the homepage table
    // and SiteFooter.vue. A page that exists but isn't in a category still surfaces, under "More", instead of
    // silently missing (as ten real pages previously did from the hand-typed version of this array).
    sidebar: { '/': computeSidebar() },

    socialLinks: [
      { icon: 'github', link: SITE.repo },
    ],

    // No themeConfig.footer — SiteFooter.vue (layout-bottom) is the one footer chrome.
    // A second VPFooter on home duplicated the message/copyright strip.

    search: {
      provider: 'local',
      options: {
        // Dynamic object pages (theorems + publications) would MiniSearch-serialize the census
        // into the client. The monitor reads constructors; it does not hold the ledger twice.
        async _render(src: string, env: { relativePath?: string; frontmatter?: { search?: boolean } }, md: { render: (s: string, e: unknown) => string }) {
          const rel = env.relativePath ?? ''
          if (env.frontmatter?.search === false) return ''
          if (rel.includes('[id]') || rel.includes('[key]') || rel.includes('[slug]')) return ''
          return md.render(src, env)
        },
      },
    },
  },

  vite: {
    define: {
      __DEV__: 'true',
    },
    // The mill stays in Node (SSG). Rolldown must not parse generated.ts into the client/server AST —
    // that copy plus live theorems() is what blew Cloudflare's default 2 GiB heap.
    ssr: {
      external: ['theorems/generated', 'axis-monograph', 'phd-proofs', 'quantum/index.js'],
    },
    // tsc and src edits were each a full VitePress restart; Shiki dispose raced loadLanguage and killed the process.
    server: {
      watch: {
        ignored: ['**/dist/**', '**/src/**'],
      },
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    // Shiki has no Lean grammar. loadLanguage('lean') on every theorem fence raced HMR dispose and killed the process.
    languageAlias: {
      lean: 'txt',
      bash: 'txt',
      sh: 'txt',
      shell: 'txt',
      typescript: 'txt',
      ts: 'txt',
      javascript: 'txt',
      js: 'txt',
      markdown: 'txt',
      md: 'txt',
      vue: 'txt',
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
  // Dynamic object pages: hero fields live in params (compose-object). Merge into frontmatter here —
  // YAML-in-content is NOT parsed (VitePress injects @content after the route template, so gray-matter
  // never sees a leading --- and the bag would leak into the rendered body).
  async transformPageData(pageData) {
    const p = pageData.params as {
      address?: string; key?: string; slug?: string; statement?: string; tactic?: string; principle?: string
      title?: string; heroTitle?: string; abstract?: string; handle?: string; handleUrl?: string
      depositReferrer?: string; objectKind?: string; locales?: string[]
      name?: string
      heartbeats?: number | null; sealCount?: number | null
      hexbits?: number[]; hexagrams?: number[]; occupancy?: number[]
      occupancyCites?: { n: number; keys: string[] }[]; occupancyDoors?: string[]
      aura?: { hsl: string; hue: number; ray: number; wave: number }
      handleParts?: string[]
      board?: number; gates?: number; hexagramBits?: number
      // Stock VitePress docFooter + ObjectCrosslinks graph + breadcrumbs (compose-object / object-graph).
      prev?: false | { text?: string; link?: string }
      next?: false | { text?: string; link?: string }
      crosslinks?: Record<string, unknown>
      breadcrumbs?: { text: string; link?: string; handle?: string }[]
      use?: unknown
    } | undefined
    if (p) {
      const fm = pageData.frontmatter as Record<string, unknown>
      // Dynamic object pages: visible <title> is the handle (compose-object). OG keeps the Lean name below.
      if (p.title != null) {
        pageData.title = p.title
        fm.title = p.title
      }
      if (p.heroTitle != null) fm.heroTitle = p.heroTitle
      if (p.name != null) fm.name = p.name
      if (p.abstract != null) fm.abstract ??= p.abstract
      if (p.handle != null) fm.handle ??= p.handle
      if (p.handleUrl != null) fm.handleUrl ??= p.handleUrl
      if (p.depositReferrer != null) fm.depositReferrer ??= p.depositReferrer
      if (p.objectKind != null) fm.objectKind ??= p.objectKind
      if (p.locales != null) fm.locales ??= p.locales
      if (p.heartbeats != null) fm.heartbeats ??= p.heartbeats
      if (p.sealCount != null) fm.sealCount ??= p.sealCount
      if (p.hexbits != null) fm.hexbits = p.hexbits
      if (p.hexagrams != null) fm.hexagrams = p.hexagrams
      if (p.occupancy != null) fm.occupancy = p.occupancy
      if (p.occupancyCites != null) fm.occupancyCites = p.occupancyCites
      if (p.occupancyDoors != null) fm.occupancyDoors = p.occupancyDoors
      if (p.aura != null) fm.aura = p.aura
      if (p.handleParts != null) fm.handleParts = p.handleParts
      if (p.address != null) fm.address ??= p.address
      if (p.board != null) fm.board = p.board
      if (p.gates != null) fm.gates = p.gates
      if (p.hexagramBits != null) fm.hexagramBits = p.hexagramBits
      // Stock VPDocFooter prev/next — sequence neighbours (sidebar cannot list every theorem).
      if (p.prev !== undefined) fm.prev = p.prev
      if (p.next !== undefined) fm.next = p.next
      if (p.crosslinks != null) fm.crosslinks = p.crosslinks
      // Stock Layout #doc-before breadcrumbs (Home → kind → id/handle).
      if (p.breadcrumbs != null) fm.breadcrumbs = p.breadcrumbs
      if (p.use != null) fm.use = p.use
      // MiniSearch indexes every dynamic object into the client bundle; skip theorem keys and publication slugs.
      if (p.key || p.slug) fm.search = false
    }
    const fmAll = pageData.frontmatter as Record<string, unknown>
    fmAll.theoremCount ??= theorems().length
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

    const fm = pageData.frontmatter as Record<string, unknown>
    // Visible H1/title is the handle; og:title keeps the Lean / publication name so crawlers are not eight hex.
    if (p?.name && Array.isArray(fm.head)) {
      for (const tuple of fm.head as [string, Record<string, string>][]) {
        if (tuple[0] === 'meta' && (tuple[1].property === 'og:title' || tuple[1].name === 'twitter:title')) {
          tuple[1].content = p.name
        }
      }
    }
    // Hex face whenever a monograph has an address — theorems and every other object page, not home.
    if (fm.layout !== 'home') {
      const address = String(p?.address || fm.seoAddress || fm.address || '')
      if (address) {
        try {
          const face = hexFaceOf(address)
          fm.address ??= address
          fm.handle ??= face.handle
          fm.hexbits ??= face.hexbits
          fm.hexagrams ??= face.hexagrams
          fm.occupancy ??= face.occupancy
          fm.occupancyCites ??= face.occupancyCites
          fm.occupancyDoors ??= face.occupancyDoors
          fm.aura ??= face.aura
          fm.handleParts ??= face.handleParts
          fm.handleUrl ??= face.door
          fm.board ??= face.board
          fm.gates ??= face.gates
          fm.hexagramBits ??= face.hexagramBits
          fm.packedTriangles ??= face.packedTriangles
          fm.merkabasPacked ??= face.merkabasPacked
          fm.veFaces ??= face.veFaces
        } catch { /* non-uuid addresses are not a hex face */ }
      }
    }
    const here = p?.key ? `/theorem/${p.key}` : p?.slug ? `/publications/${p.slug}`
      : routeOf(pageData.relativePath)
    const walkNext = walkNextOf(here)
    if (walkNext) fm.walkNext = walkNext

    // Axis listings are monographs of that fold — attach only this URL's slice (not the Layout census).
    // Load the census after Rolldown: phd/os/host/ghz must not sit in the config graph during the bundle.
    const listing = pageData.relativePath.replace(/\\/g, '/')
    if (listing === 'theorems.md' || listing === 'topics.md' || listing === 'rosetta.md' || listing === 'trials.md' || listing === 'index.md') {
      const { axisForRelativePath } = await import('../../src/axis-monograph.js')
      const axis = axisForRelativePath(pageData.relativePath)
      if (axis.axis) fm.axis = axis.axis
      if (axis.census) fm.census = axis.census
    }
    // Do not stamp objectKind onto listing markdown — ObjectBreadcrumbs would treat /theorems as an
    // object leaf (Home → handle) instead of the docs trail (Home → Theorems).

    // Static pages without compose-object still carry a monograph graph: this handle + wrapping next.
    if (fm.crosslinks == null) {
      const address = String(fm.seoAddress || '')
      let handle = String(fm.handle || '')
      if (!handle && address) {
        try { handle = handleOf(address) } catch { handle = '' }
      }
      fm.crosslinks = {
        objectKind: fm.objectKind || 'page',
        handle,
        address,
        sequence: {
          prev: null,
          next: walkNext ? { key: walkNext.text, title: walkNext.text, link: walkNext.link } : null,
        },
      }
    }
  },

  // ── buildEnd — THE ONE ARTIFACT THIS TREE NEVER SEALED WAS THE ONE THE WORLD RECEIVES.
  //
  // Every other surface here carries a recomputable receipt: the ledger, the derived layer, the gate itself. The
  // SITE had none. `vitepress build docs` exiting 0 proves the tree renders; it says nothing about WHAT was
  // rendered, so a page silently lost — a route that stopped being generated, a dynamic path whose loader
  // returned an empty list — ships as a green build. That is the same shape as every instrument corrected in this
  // tree recently: the check observed "the build succeeded" and was read as "the site is what we think it is".
  //
  // buildEnd runs after SSG completes and before the CLI exits (the official hook signature is
  // `(siteConfig: SiteConfig) => Awaitable<void>`), which is the only moment the finished output exists and the
  // process is still alive to fold it. So the pages are counted and their paths folded to ONE address, printed
  // for the build log and written beside the output. A number that changes when the site changes is a receipt; a
  // number nobody computes is how a missing page goes unnoticed.
  //
  // IT REPORTS, IT DOES NOT GATE. Deciding a page count is "wrong" needs a sealed expectation to compare against,
  // and inventing a threshold here would be the constant-wearing-the-clothes-of-a-law mistake this tree spent the
  // day removing. It states what shipped; comparing successive receipts is what catches the loss.
  async buildEnd(siteConfig) {
    const { readdir, writeFile } = await import('node:fs/promises')
    const { join, relative } = await import('node:path')
    const { toUuid } = await import('../../src/address.js')

    const out = siteConfig.outDir
    const walk = async (dir: string): Promise<string[]> => {
      const entries = await readdir(dir, { withFileTypes: true })
      const found = await Promise.all(entries.map(async (e) => {
        const abs = join(dir, e.name)
        if (e.isDirectory()) return walk(abs)
        return e.name.endsWith('.html') ? [abs] : []
      }))
      return found.flat()
    }

    // ORDER-INVARIANT BY CONSTRUCTION: the paths are sorted before folding, so the receipt is a property of the
    // set of pages published and not of the order the filesystem happened to hand them back.
    const pages = (await walk(out)).map((p) => relative(out, p).replace(/\\/g, '/')).sort()
    const receipt = toUuid(`site|${pages.length}|${pages.join('|')}`)
    await writeFile(join(out, 'build-receipt.json'), JSON.stringify({ pages: pages.length, receipt }, null, 1) + '\n')
    console.log(`\n  site receipt — ${pages.length} pages published, receipt ${receipt}`)
    console.log('  (recompute: fold the sorted relative paths of every .html under the out dir)\n')
  },
})
