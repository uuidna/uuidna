// seo-freeze — FINAL SEO AUDIT + URL FREEZE VIA QUANTUM HEXBITS (captain, 2026-08-26).
//
// After this seal passes, editorial URL paths are FROZEN. Permanence is solved in hexbits only: each page's
// content-address folds to an 8-hex handle (handleOf), and `https://uuidna.com/<handle>` is the stable door.
// Renaming `/theorem/foo` → `/theorem/bar` or moving a static slug fails the freeze; updating theorem *content*
// may move the handle (regenerate the map) but must not change the route identity (kind+key/slug).
//
// SEO audit (no vitepress build required for the freeze path): every subject has quantumSeo with canonical,
// title, description band, JSON-LD; sitemap cover via site.gaps; zero handle collisions on the freeze map.
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { theorems } from './theorems/index.js'
import { publications } from './publish.js'
import { quantumSeo } from './seo.js'
import { handleOf } from './handle.js'
import { discoverStaticPages, canonicalOrder, gaps as siteGaps } from './site.js'
import { toUuid, merkleFold } from './address.js'
import { seoPackageGaps } from './seo-package.js'

export const SEO_URL_MAP_PATH = 'lean/seo-url-map.json'
const HOST = 'https://uuidna.com'

export interface SeoUrlEntry {
  route: string
  kind: 'theorem' | 'publication' | 'page'
  /** theorem key or publication slug — identity frozen with the route */
  identity: string
  canonical: string
  address: string
  /** eight hexbits — the quantum door */
  handle: string
  /** permanent hexbit URL — post-freeze link permanence */
  hexbitDoor: string
}

export interface SeoUrlMap {
  frozen: true
  generated: string
  entries: SeoUrlEntry[]
  receipt: string
  honest: string
}

export interface SeoFreezeGap { what: string; fix: string }

export interface FinalSeoAudit {
  ok: boolean
  gaps: SeoFreezeGap[]
  pages: number
  frozenRoutes: number
  handleCollisions: number
  routeDrift: string[]
  receipt: string
  honest: string
}

/** Build the live URL↔hexbit map from the ledger (theorems + publications + static docs pages). */
export function buildSeoUrlMap(): SeoUrlMap {
  const entries: SeoUrlEntry[] = []
  for (const t of theorems()) {
    const seo = quantumSeo({ key: t.key })
    const handle = handleOf(seo.address)
    entries.push({
      route: seo.route, kind: 'theorem', identity: t.key,
      canonical: seo.canonical, address: seo.address, handle,
      hexbitDoor: `${HOST}/${handle}`,
    })
  }
  for (const p of publications()) {
    const seo = quantumSeo({ slug: p.slug })
    const handle = handleOf(seo.address)
    entries.push({
      route: seo.route, kind: 'publication', identity: p.slug,
      canonical: seo.canonical, address: seo.address, handle,
      hexbitDoor: `${HOST}/${handle}`,
    })
  }
  // homepage is excluded from discoverStaticPages (not a sidebar/pager entry) but is a public URL — freeze it too
  const pages: { route: string; text: string }[] = [{ route: '/', text: 'uuidna' }, ...discoverStaticPages()]
  for (const page of pages) {
    const seo = quantumSeo({ route: page.route, title: page.text })
    const handle = handleOf(seo.address)
    entries.push({
      route: seo.route, kind: 'page', identity: page.route === '/' ? '/' : page.route,
      canonical: seo.canonical, address: seo.address, handle,
      hexbitDoor: `${HOST}/${handle}`,
    })
  }
  entries.sort((a, b) => a.route < b.route ? -1 : a.route > b.route ? 1 : 0)
  const receipt = merkleFold(entries.map((e) => toUuid(`${e.route}|${e.kind}|${e.identity}|${e.handle}`)))
  return {
    frozen: true,
    generated: receipt.slice(0, 10),  // content-derived, never wall-clock
    entries,
    receipt,
    honest:
      'FINAL SEO FREEZE: editorial routes are sealed in lean/seo-url-map.json. Link permanence after freeze is ' +
      'solved ONLY via quantum hexbit doors (https://uuidna.com/<handle> = handleOf(content-address)). A route ' +
      'rename or identity move fails the audit; regenerate the map deliberately only when adding a NEW sealed ' +
      'subject, never to chase a slug edit.',
  }
}

export function readSealedSeoUrlMap(): SeoUrlMap | null {
  const p = join(ROOT, SEO_URL_MAP_PATH)
  if (!existsSync(p)) return null
  return JSON.parse(readFileSync(p, 'utf8')) as SeoUrlMap
}

export function writeSeoUrlMap(map: SeoUrlMap = buildSeoUrlMap()): SeoUrlMap {
  mkdirSync(join(ROOT, 'lean'), { recursive: true })
  writeFileSync(join(ROOT, SEO_URL_MAP_PATH), JSON.stringify(map, null, 2) + '\n')
  return map
}

/** Freeze identity — kind + sealed identity. Route renames with the same identity fail the drift check below. */
const idKey = (e: SeoUrlEntry): string => `${e.kind}:${e.identity}`

/**
 * finalSeoAudit() → PhD-grade SEO checks + URL freeze against the sealed hexbit map.
 * Does not require vitepress dist (quantumSeo is ledger-derived); optional dist strengthens title/canonical HTML checks.
 */
export function finalSeoAudit(): FinalSeoAudit {
  const gaps: SeoFreezeGap[] = []
  const live = buildSeoUrlMap()

  // ── SEO surfaces from quantumSeo ──
  for (const e of live.entries) {
    const seo = e.kind === 'theorem' ? quantumSeo({ key: e.identity })
      : e.kind === 'publication' ? quantumSeo({ slug: e.identity })
        : quantumSeo({ route: e.route })
    if (!seo.canonical.startsWith(HOST)) {
      gaps.push({ what: `${e.route}: canonical not on uuidna.com`, fix: 'quantumSeo must fold every host to https://uuidna.com' })
    }
    if (!seo.title.trim()) {
      gaps.push({ what: `${e.route}: empty title`, fix: 'supply a title for honest discovery' })
    }
    const d = seo.description
    if (!d.trim()) {
      gaps.push({ what: `${e.route}: empty meta description`, fix: 'quantumSeo must emit a description' })
    } else if (e.kind === 'page' && (d.length < 50 || d.length > 160)) {
      // theorems/publications carry Lean statements that often exceed 160 — pages must stay in the click band
      gaps.push({
        what: `${e.route}: description ${d.length} chars outside 50–160 band`,
        fix: 'rewrite the page description to the click-worthy band (one-receipt seoGaps law)',
      })
    }
    if (!seo.jsonLd || !seo.jsonLd['@type']) {
      gaps.push({ what: `${e.route}: no JSON-LD @type`, fix: 'infuse schema.org via quantumSeo' })
    }
    if (!seo.head.some((h) => h[0] === 'link' && (h[1] as { rel?: string }).rel === 'canonical')) {
      gaps.push({ what: `${e.route}: head missing rel=canonical`, fix: 'quantumSeo.head must include canonical' })
    }
    // SEO PACKAGING LAW — complete OG + microdata frontmatter (even a solitary link must package this way)
    const pkg = seoPackageGaps(seo)
    if (!pkg.ok) {
      gaps.push({
        what: `${e.route}: incomplete SEO package — missing ${pkg.missing.join(', ')}`,
        fix: 'every publishable object needs canonical + og:title/description/url/type (property=) + uuidna:address + JSON-LD — see seo-package.ts',
      })
    }
  }

  // ── sitemap cover — no orphan routes (homepage `/` is SEO-frozen but not a pager node — exclude from this check)
  const order = canonicalOrder(discoverStaticPages())
  const sitemapSubjects = live.entries.filter((e) => e.route !== '/').map((e) => e.route)
  const orphans = siteGaps(order, sitemapSubjects)
  if (orphans.length) {
    gaps.push({
      what: `sitemap orphans (not in canonicalOrder): ${orphans.slice(0, 8).join(', ')}${orphans.length > 8 ? '…' : ''}`,
      fix: 'every navigable route must appear in site.canonicalOrder — see site.ts',
    })
  }
  const liveRoutes = new Set(live.entries.map((e) => e.route))
  const missingFromMap = order.map((n) => n.route).filter((r) => !liveRoutes.has(r))
  if (missingFromMap.length) {
    gaps.push({
      what: `canonicalOrder routes missing from SEO map: ${missingFromMap.slice(0, 8).join(', ')}${missingFromMap.length > 8 ? '…' : ''}`,
      fix: 'buildSeoUrlMap must cover every pager/sitemap subject — theorems, publications, static pages',
    })
  }

  // Built-site HTML SEO (seoGaps in one-receipt) stays a post-docs:build check — this freeze path is ledger-derived
  // so prepublish does not require vitepress dist. VitePress cleanUrls + dead-link fail-on-build remain the HTML door.

  // ── handle collisions (hexbit door uniqueness) ──
  const byHandle = new Map<string, string>()
  let handleCollisions = 0
  for (const e of live.entries) {
    const prev = byHandle.get(e.handle)
    if (prev && prev !== e.route) {
      handleCollisions++
      gaps.push({
        what: `hexbit handle collision: ${e.handle} binds both ${prev} and ${e.route}`,
        fix: 'content-addresses must not share handleOf — pigeonhole; change content or refuse the duplicate',
      })
    } else byHandle.set(e.handle, e.route)
  }

  // ── URL FREEZE against sealed map ──
  const sealed = readSealedSeoUrlMap()
  const routeDrift: string[] = []
  if (!sealed) {
    gaps.push({
      what: `${SEO_URL_MAP_PATH} missing — URL freeze has no sealed map`,
      fix: 'run `node dist/scripts/gen-seo-freeze.js` once to seal the final URL↔hexbit map, then commit it',
    })
  } else {
    const sealedIds = new Map(sealed.entries.map((e) => [idKey(e), e]))
    const liveIds = new Map(live.entries.map((e) => [idKey(e), e]))
    for (const [k, e] of sealedIds) {
      if (!liveIds.has(k)) {
        routeDrift.push(`REMOVED ${e.route} (${e.kind}:${e.identity})`)
        gaps.push({
          what: `URL FREEZE BROKEN — sealed route removed: ${e.route} (${e.kind} ${e.identity})`,
          fix: 'URLs are frozen after the final SEO audit. Restore the route/identity, or deliberately reseal ONLY by regenerating gen-seo-freeze with captain approval. Prefer linking via hexbitDoor ' + e.hexbitDoor,
        })
      }
    }
    for (const [k, e] of liveIds) {
      if (!sealedIds.has(k)) {
        // allow NEW theorems/publications (ledger growth) but NOT static page route renames:
        // new theorem keys are new identities — they extend the map; require reseal
        routeDrift.push(`ADDED ${e.route} (${e.kind}:${e.identity})`)
        gaps.push({
          what: `URL FREEZE — new route not in sealed map: ${e.route} (${e.kind} ${e.identity})`,
          fix: 'run `node dist/scripts/gen-seo-freeze.js` to extend the freeze map for NEW sealed subjects; never rename an existing slug/path — use hexbit doors for permanence',
        })
      } else {
        const s = sealedIds.get(k)!
        if (s.route !== e.route) {
          routeDrift.push(`RENAMED ${s.route} → ${e.route}`)
          gaps.push({
            what: `URL FREEZE — route rename forbidden: ${s.route} → ${e.route}`,
            fix: `keep sealed path ${s.route}; cite ${s.hexbitDoor} for permanent links (hexbit doors survive slug edits — do not chase the slug)`,
          })
        }
        // handle may move when content changes (content-address) — permanence is the hexbit door space
      }
    }
  }

  const receipt = live.receipt
  return {
    ok: gaps.length === 0,
    gaps,
    pages: live.entries.length,
    frozenRoutes: sealed?.entries.length ?? 0,
    handleCollisions,
    routeDrift,
    receipt,
    honest:
      'Final SEO audit: complete OG+microdata package per subject (seo-package.ts), sitemap cover, zero hexbit ' +
      'handle collisions, and lean/seo-url-map.json freeze (route+identity sealed). Post-freeze permanence = ' +
      'https://uuidna.com/<handle> only — not mutable editorial slugs. Bare links without the package are refused.',
  }
}
