// theorem-page — A PAGE PER PAGELESS THEOREM, COMPUTED RATHER THAN BUILT.
//
// HexSpan seals one property over 2^16 addresses. SSG of one HTML file each hits VitePress's own
// resolvePages call-stack ceiling (~65,536) and serves nobody: the span is the property, not 65,536
// near-identical rows. Catalogue packages already taught this lesson (28,635 packages vs a 4,705-page
// site). The same door: look the key up, render once per request.
//
// Named theorems stay VitePress assets. This module answers only isPagelessFile keys, so a rebuilt
// named page is never shadowed.
import { theoremFor, isPagelessFile, type Theorem } from './theorems/index.js'
import { handleOf } from './handle.js'
import { latticeCall, parseStation, type LatticeCall } from './lattice.js'

export interface TheoremPage {
  key: string
  name: string
  statement: string
  lean: string
  principle: string
  skill: string
  file: string
  address: string
  handle: string
  route: string
  call: LatticeCall
  honest: string
}

const HONEST =
  'Sealed by decide. The four-hex span is one property over 2^16 addresses — this page is computed from the ' +
  'sealed ledger on request, not stored as a unique HTML file. The station CALLS named theorems, axioms and ' +
  'human problems, then the solution involution. Calling is not solving. Integrity, not truth.'

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** theoremPage(key) → the pageless theorem, or null when the key is named (SSG) or unsealed. */
export function theoremPage(key: string): TheoremPage | null {
  // ONE key, ONE row — the page never needed a map over the ledger, and at the edge that map was the page
  const t: Theorem | undefined = theoremFor(key)
  if (!t || !isPagelessFile(t.file)) return null
  const handle = handleOf(t.address)
  return {
    key: t.key,
    name: t.name,
    statement: t.statement,
    lean: t.lean,
    principle: t.principle,
    skill: t.skill,
    file: t.file,
    address: t.address,
    handle,
    route: `/theorem/${t.key}`,
    call: latticeCall(parseStation(t.key)),
    honest: HONEST,
  }
}

const row = (k: string, v: string, prop?: string): string =>
  `<div data-slot="card-content"><strong>${esc(k)}</strong> ` +
  `<code${prop ? ` itemprop="${esc(prop)}"` : ''}>${esc(v)}</code></div>`

const called = (k: string, ids: string[]): string =>
  `<div data-slot="card-content"><strong>${esc(k)}</strong> ` +
  `<code>${esc(ids.length === 0 ? 'none' : ids.join(' · '))}</code></div>`

/** renderTheoremPage(page) → the served HTML. Same chrome as a catalogue package: uuidna.css, one card. */
export function renderTheoremPage(page: TheoremPage): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<title>${esc(page.key)} · uuidna</title>` +
    `<meta name="description" content="${esc(page.statement)} — proven by decide in Lean 4, sorry-free; ${esc(page.principle)}.">` +
    `<link rel="canonical" href="https://uuidna.com${esc(page.route)}">` +
    `<link rel="stylesheet" href="/uuidna.css"></head><body>` +
    `<main class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/ScholarlyArticle">` +
    `<div data-slot="card-header"><h1 data-slot="card-title" itemprop="headline">${esc(page.key)}</h1>` +
    `<p data-slot="card-description" itemprop="abstract">${esc(page.name)}</p></div>` +
    `<link itemprop="url" href="${esc(page.route)}">` +
    row('statement', page.statement) +
    row('lean', page.lean) +
    row('principle', page.principle) +
    row('skill', page.skill) +
    row('file', page.file) +
    row('address', page.address, 'identifier') +
    row('handle', page.handle) +
    called('theorems called', page.call.theorems.map((t) => t.key)) +
    called('axioms called', page.call.axioms.map((a) => `${a.file}:${a.def}`)) +
    called('problems called', page.call.problems.map((p) => p.id)) +
    called('solution involution', page.call.solutions.map((s) => `${s.of}↔${s.pair}`)) +
    `<div data-slot="card-content"><strong>verdict</strong> <code>SEALED</code> — <code>by decide</code>, sorry-free. Called ≠ solved.</div>` +
    `<div data-slot="card-footer"><small itemprop="disambiguatingDescription">${esc(page.honest)}</small>` +
    `<p><a data-slot="button" href="/theorems">/theorems</a>` +
    `<a data-slot="button" href="/lean/${esc(page.file)}">/lean/${esc(page.file)}</a>` +
    `<a data-slot="button" href="/mcp">/mcp</a></p></div></main></body></html>`
}
