// quantum/apps/catalogue-browser — THE FULL ALPINE CENSUS IN THE BROWSER (pure half).
//
// Search and inspect any published package after uuidnaOS boots and primes the catalogue.
// Same mint as apk info / man: provenance identity + 32 hexbits, never binary execution
// (theorem the_os_is_bootable_quantum). The Vue shell is docs/.vitepress/theme/CatalogueBrowser.vue.
import {
  catalogueSearch, cataloguePackage, catalogueCompile, catalogueState, catalogueBrowse, resolveManPage, manAppWitness,
  type CataloguePackage,
} from '../os/catalogue/index.js'
import { UUID_HEXBITS } from '../../hexbit/index.js'
import { toUuid } from '../../address.js'
import { handleOf } from '../../handle.js'

/** shadcn card anatomy — the same slots renderTheorem ships, so Alpine apps are widget-API compatible. */
export const SHADCN_CARD_SLOTS = [
  'card', 'card-header', 'card-title', 'card-description', 'card-content', 'card-footer',
] as const

/** Alpine apps UI adds input / button / badge on the same card. No Tailwind, no React. */
export const SHADCN_ALPINE_SLOTS = [...SHADCN_CARD_SLOTS, 'badge', 'button', 'input'] as const

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

export interface CatalogueHit {
  name: string
  version: string
  repo: string
  desc: string
  address: string
  hexbits: number[]
  state: 'AVAILABLE'
}

export interface CatalogueBrowseResult {
  query: string
  repo: 'main' | 'community' | 'all'
  total: number
  shown: number
  hits: CatalogueHit[]
  present: boolean
  why: string | null
  receipt: string
}

export interface CatalogueInspectResult {
  ok: boolean
  name: string
  detail: string
  package?: CatalogueHit & { deps: string[]; checksum: string; man?: string; app?: string | null }
  receipt: string
}

const hitOf = (p: CataloguePackage): CatalogueHit => {
  const c = catalogueCompile(p)
  return {
    name: p.name, version: p.version, repo: p.repo, desc: p.desc,
    address: c.address, hexbits: c.hexbits, state: 'AVAILABLE',
  }
}

/** browseCatalogue(query, limit?, repo?) → bounded browse over the primed census (offline PWA shelf). */
export function browseCatalogue(query: string, limit = 40, repo: 'main' | 'community' | 'all' = 'all'): CatalogueBrowseResult {
  const st = catalogueState()
  const repoTag = repo
  if (!st.present) {
    return {
      query, repo: repoTag, total: 0, shown: 0, hits: [], present: false, why: st.why,
      receipt: toUuid('catalogue-browse|absent|' + repoTag + '|' + query),
    }
  }
  const { hits, total } = query.trim()
    ? catalogueBrowse(query, limit, repo === 'all' ? undefined : repo)
    : catalogueBrowse('', limit, repo === 'all' ? undefined : repo)
  const rows = hits.map(hitOf)
  return {
    query, repo: repoTag, total, shown: rows.length, hits: rows, present: true, why: null,
    receipt: toUuid('catalogue-browse|' + repoTag + '|' + query + '|' + total + '|' + rows.map((h) => h.name).join(',')),
  }
}

/** inspectCataloguePackage(name) → one AVAILABLE package with hexbits + optional man→app witness. */
export function inspectCataloguePackage(name: string): CatalogueInspectResult {
  const st = catalogueState()
  const receiptBase = 'catalogue-inspect|' + name
  if (!st.present) {
    return { ok: false, name, detail: st.why ?? 'catalogue absent', receipt: toUuid(receiptBase + '|absent') }
  }
  const p = cataloguePackage(name)
  if (!p) {
    return {
      ok: false, name,
      detail: `no such package — searched all ${st.count} published rows`,
      receipt: toUuid(receiptBase + '|miss'),
    }
  }
  const h = hitOf(p)
  if (h.hexbits.length !== UUID_HEXBITS) {
    return { ok: false, name, detail: `compile produced ${h.hexbits.length} states, not ${UUID_HEXBITS}`, receipt: toUuid(receiptBase + '|bad') }
  }
  const doc = resolveManPage(name)
  const witness = doc ? manAppWitness(doc) : null
  return {
    ok: true, name,
    detail: `${p.name}-${p.version} [${p.repo}] · ${UUID_HEXBITS} hexbits`,
    package: {
      ...h, deps: p.deps, checksum: p.checksum,
      man: doc?.name, app: witness?.ok ? witness.app : null,
    },
    receipt: toUuid(receiptBase + '|' + h.address),
  }
}

/** renderAlpineApp(hit) → one shadcn card for a published Alpine package. Pure HTML+CSS anatomy, no script.
 *  Same slots as renderTheorem so a widget host that already paints theorem cards can paint apps. */
export function renderAlpineApp(hit: CatalogueHit): string {
  const handle = handleOf(hit.address)
  const title = escapeHtml(`${hit.name}-${hit.version}`)
  const desc = escapeHtml(hit.desc)
  const repo = escapeHtml(hit.repo)
  return `<article class="uuidna-card" data-slot="card" data-alpine="${escapeHtml(hit.name)}" data-state="${hit.state}">`
    + `<div data-slot="card-header">`
    + `<h3 data-slot="card-title">${title} <span data-slot="badge">${repo}</span></h3>`
    + `<p data-slot="card-description">${desc}</p>`
    + `</div>`
    + `<div data-slot="card-content">`
    + `<code data-slot="handle">${escapeHtml(handle)}</code>`
    + `</div>`
    + `<div data-slot="card-footer"><small>integrity — published metadata, loading rather than running</small></div>`
    + `</article>`
}
