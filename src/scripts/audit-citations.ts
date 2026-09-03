#!/usr/bin/env node
// audit-citations — PURELY LEDGER-DERIVED. The honest replacement for a "superlative scan": a word-list floor is
// VOID here (it is not a theorem, so it carries no authority), so this asks only what the ledger can DERIVE about
// every composed publication — for each load-bearing claim (a bullet in the note), does it cite a theorem, and is
// that theorem SEALED in the ledger? Three ledger-derived facts per claim:
//
//   CITED    — links /theorem/<key> and the key IS sealed → the claim points at a proof (the honest state).
//   FABRICATED — links /theorem/<key> but the key is NOT in the ledger → the one decidably-false thing (a violation).
//   UNCITED  — a claim bullet that links no proof at all → revealed as unbacked (not a violation, but surfaced).
//
// No lexicon decides "superlative"; the ledger decides "sealed". CACHED: keyed by the content-address of the whole
// publication set, so an unchanged set is a cache hit and a changed note moves the key and re-scans. SAVED to
// audit-citations.json, recomputable by anyone from the same ledger. Integrity.
import { writeFileSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { publications, theorems, merkleFold, toUuid, digitalRoot } from '../index.js'
import { ROOT } from './api.js'

const OUT = join(ROOT, 'audit-citations.json')

const sealed = new Set(theorems().map((t) => t.key))
// the sealed statements' OWN prose — a publication drains these verbatim, so a claim matching one needs no
// pointer: it already IS the theorem. Kept as full names; the scan compares a 60-character head.
const sealedNames = new Set(theorems().map((t) => t.name.replace(/^[-*\s]+/, '').slice(0, 60)))
const pubs = publications()
// The cache key is the content-address of the whole publication set AND OF THIS AUDITOR'S OWN SOURCE.
//
// It was the publications alone, and that omitted the thing most likely to change: the RULE. Measured
// 2026-09-03 — the scan was corrected so a claim that IS a sealed theorem's own prose stops reading as uncited,
// the publications had not moved, and the run reported `cache HIT … 1 uncited` from the stale answer. A cache
// keyed on the inputs but not on the function is a proxy standing in for the computation: the healthy case and
// the un-rerun case return the same line. Folding this file's own bytes in means a corrected rule invalidates
// its own cache, which is the only way the correction can be seen.
const key = merkleFold([
  ...pubs.map((p) => p.address),
  toUuid(readFileSync(new URL(import.meta.url), 'utf8')),
])

// theorem keys can carry uppercase (e.g. air_ppO2_in_window_at_surface), so match case-insensitively — a
// lowercase-only class truncates such a key mid-word and mis-reports a real citation as fabricated.
const CITE = /\/theorem\/([A-Za-z0-9_]+)/g
// A load-bearing CLAIM is a bullet line in the composed note (the generator writes one bullet per fact); meta prose
// (title, abstract, provenance) is not a per-fact claim. Structure.
const claimsOf = (markdown: string): string[] =>
  markdown.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('- '))

interface PubAudit { slug: string; claims: number; cited: number; isTheorem: number; uncited: string[]; fabricated: { claim: string; key: string }[] }

interface Harmonic { claims: number; theorems: number; bijection: boolean; digitalRoots: { claims: number; theorems: number; publications: number }; note: string }
function scan(): { key: string; publications: number; sealedTheorems: number; fabricated: number; uncited: number; receipt: string; harmonic: Harmonic; perPublication: PubAudit[] } {
  const perPublication: PubAudit[] = pubs.map((p) => {
    const uncited: string[] = []
    const fabricated: { claim: string; key: string }[] = []
    let cited = 0
    const claims = claimsOf(p.markdown)
    // A CLAIM THAT **IS** A SEALED THEOREM'S OWN WORDS IS NOT UNCITED — IT IS THE THEOREM.
    //
    // This asked one question ("does the prose POINT AT a proof?") and reported its answer as if it had asked
    // another ("is the prose BACKED by a proof?"). Measured 2026-09-03: the div-by-zero publication showed
    // 12 of 13 cited, and the thirteenth was `the_six_motions_connect_the_whole_ring` — a theorem sealed in
    // DivByZero.lean with 9 cases, whose `name` IS that claim, drained into the publication verbatim. There was
    // nothing to point at because the words were already the proof's own, and demanding a self-pointer would
    // move the theorem's content-address to satisfy a scan. Same units error as the table-enumeration metric:
    // the denominator was the wrong quantity.
    //
    // The two states stay APART rather than merged: `cited` is prose that points at a proof, `isTheorem` is prose
    // that IS one. Both are backed; only the second needs no link. `uncited` now means what it says.
    const theoremProse = new Set([...sealedNames].map((n) => n.slice(0, 60)))
    const isTheoremProse = (claim: string): boolean => {
      const head = claim.replace(/^[-*\s]+/, '').slice(0, 60)
      return head.length >= 24 && theoremProse.has(head)
    }
    let isTheorem = 0
    for (const claim of claims) {
      const keys = [...claim.matchAll(CITE)].map((m) => m[1])
      if (keys.length === 0) {
        if (isTheoremProse(claim)) { isTheorem++; continue }
        uncited.push(claim.length > 140 ? claim.slice(0, 137) + '…' : claim)
        continue
      }
      const fab = keys.filter((k) => !sealed.has(k))
      if (fab.length) fab.forEach((k) => fabricated.push({ claim: claim.slice(0, 100), key: k }))
      else cited++
    }
    return { slug: p.slug, claims: claims.length, cited, isTheorem, uncited, fabricated }
  })
  const fabricated = perPublication.reduce((n, p) => n + p.fabricated.length, 0)
  const uncited = perPublication.reduce((n, p) => n + p.uncited.length, 0)
  // the violation receipt folds only the FABRICATED citations (the ledger-derived violations); clean → a fixed token
  const receipt = fabricated
    ? merkleFold(perPublication.flatMap((p) => p.fabricated.map((f) => toUuid(p.slug + '|' + f.key))))
    : toUuid('citations-clean')
  // The HARMONIC reading — decidable ℤ/9 facts about the counts (their digital roots), and the BIJECTION invariant:
  // every sealed theorem should surface as exactly one cited claim, so total claims == total sealed theorems. The
  // digital roots are proven arithmetic; any NUMEROLOGICAL meaning is UNVERIFIED (the ledger seals the number
  // significance). The bijection, by contrast, IS a real integrity invariant — a drift in it means a lost citation.
  const totalClaims = perPublication.reduce((n, p) => n + p.claims, 0)
  const harmonic = {
    claims: totalClaims,
    theorems: sealed.size,
    bijection: totalClaims === sealed.size, // one cited claim per sealed theorem — a real ledger invariant
    digitalRoots: { claims: digitalRoot(totalClaims), theorems: digitalRoot(sealed.size), publications: digitalRoot(pubs.length) },
    note: 'digital roots are decidable ℤ/9 facts; any numerological meaning is UNVERIFIED. The bijection is a real integrity invariant.',
  }
  return { key, publications: pubs.length, sealedTheorems: sealed.size, fabricated, uncited, receipt, harmonic, perPublication }
}

let prev: { key?: string; fabricated?: number; uncited?: number } | null = null
try { prev = JSON.parse(readFileSync(OUT, 'utf8')) } catch { prev = null }

if (prev && prev.key === key) {
  console.log(`audit-citations: cache HIT (${key}) — publications unchanged; ${prev.fabricated} fabricated, ${prev.uncited} uncited. No re-scan.`)
  process.exitCode = prev.fabricated ? 1 : 0
} else {
  const report = scan()
  writeFileSync(OUT, JSON.stringify(report, null, 2) + '\n')
  const totalClaims = report.perPublication.reduce((n, p) => n + p.claims, 0)
  console.log(`audit-citations (purely ledger-derived): ${report.publications} publications, ${totalClaims} claims.`)
  console.log(`  FABRICATED (cite a key not in the ledger) : ${report.fabricated}   ← the only ledger-derivable violation`)
  console.log(`  UNCITED    (a claim linking no proof)      : ${report.uncited}   ← revealed as unbacked`)
  console.log(`  HARMONIC   claims ${report.harmonic.claims} (dr ${report.harmonic.digitalRoots.claims}) ${report.harmonic.bijection ? '==' : '!='} theorems ${report.harmonic.theorems} (dr ${report.harmonic.digitalRoots.theorems}) · publications ${report.publications} (dr ${report.harmonic.digitalRoots.publications})` + (report.harmonic.bijection ? '   ← bijection holds' : '   ← BIJECTION BROKEN: a citation drifted'))
  for (const p of report.perPublication.filter((p) => p.fabricated.length || p.uncited.length))
    console.log(`    • ${p.slug}: ${p.cited}/${p.claims} cited` + (p.fabricated.length ? `, ${p.fabricated.length} FABRICATED` : '') + (p.uncited.length ? `, ${p.uncited.length} uncited` : ''))
  console.log(`  saved ${OUT}  · cache key ${report.key}  · receipt ${report.receipt}  ${report.fabricated ? '(FLAGGED)' : '(no fabricated citations)'}`)
  process.exitCode = report.fabricated ? 1 : 0
}
