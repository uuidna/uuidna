#!/usr/bin/env node
// rosetta — FIVE WITNESSES, CHOSEN FOR INDEPENDENCE RATHER THAN COUNT.
//
// emit() already cross-checks a `js:` mirror against its `lean:` statement and hard-fails on disagreement. That is
// two legs: enough to DETECT a discrepancy, never enough to LOCATE one. And on 2026-08-20 it proved insufficient in
// the worse way — strokes_survive_reflection passed BOTH legs. The mirror agreed with the kernel, and the theorem
// was still wrong, because both legs were written by the same hand and encoded the same mistaken framing. Two legs
// written by one author share that author's errors.
//
// The Rosetta Stone worked because Greek was already known: an INDEPENDENT anchor. So the extra legs must come from
// outside the pair, and the count follows from error correction rather than taste — to locate t faults you need
// 2t+1 witnesses. Three handles one. Four is worse than it looks, because a 2-2 split has no majority. Five is the
// next count that decides, and it survives a correlated pair plus one more.
//
//   SYMBOL     the TypeScript computation — what the code says
//   PROOF      the kernel's `by decide` verdict — what Lean accepts
//   WITNESS    an external source: a book, a standard, a measurement. Independent OF THE PROJECT.
//   FALSIFIER  a deliberate mutation that must FAIL. Independent OF THE CLAIM'S TRUTH — it tests the test.
//   ADDRESS    the content fold, so a stranger recomputes from the exact bytes. Independent OF PERSON AND MOMENT.
//
// Symbol and proof are the correlated pair. Each of the day's failures would have been caught by a different one of
// the last three: the seams theorem (true by construction) by the FALSIFIER, the sailing angles and the stroke
// framing by the WITNESS.
//
// THIS MEASURES BEFORE IT ENFORCES. Requiring five legs of all 1334 theorems today would fail on nearly all of
// them — only a handful cite an external source. So it reports the census and holds a FLOOR that may only RISE,
// the same shape as the dormant roster's may-only-shrink rule: the ledger cannot get less anchored than it is.
//
//   node dist/scripts/rosetta.js [--census] [--key <theorem>]
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

export type Leg = 'symbol' | 'proof' | 'witness' | 'falsifier' | 'address'
export const LEGS: readonly Leg[] = ['symbol', 'proof', 'witness', 'falsifier', 'address'] as const

/** Named external anchors. A WITNESS must be something outside this repository that a stranger could consult —
 *  a published standard, a named author, a measured artefact. The project's own prose is not a witness to itself. */
const WITNESS = /\b(NIST|CODATA|WGS ?84|IUPAC|SI\b|Gutenberg|Landauer|Eratosthenes|Fujishima|McCarty|Heidrich|Rossi|Runciman|Rathbun|Mathot|Day,|Wellman|ISO ?\d|RFC ?\d|doi|DOI|physics\.nist\.gov|measured (?:at|as|by)|bomb calorimetry)\b/

// ATTRIBUTION IS COMPUTED, NOT ANNOTATED. The first attempt at this hand-wrote "Claimed by the captain" with a
// date onto three theorems. Three things wrong with that, and the captain named all three: it is manual logic in a
// project whose first law is that manual work always fails; the date was invented, since the claim long predates
// the day it was sealed; and it was redundant, because gen-captain-claims.ts already holds the doctrine that the
// UNCLAIMED IS THE CAPTAIN'S. Writing an annotation to record a default is the definition of manual.
//
// So attribution is not a leg. It is a HOOK with a default: a claim carries an external source, or it carries the
// captain's, and nothing needs saying for the second case. Ownership is total and automatic.
//
// WITNESS stays a separate and deliberately rare axis, because the two answer different questions. The captain's
// claim settles WHOSE it is — legal, universal, computed. A witness settles WHETHER A STRANGER CAN CHECK IT —
// epistemic, external, and at 9 of 1334 the scarcest thing in the ledger. Folding the first into the second would
// score every theorem as witnessed and destroy the only measurement that located today's errors: the vacuity trap
// one more time, wearing the captain's name.

export interface Rosetta { key: string; wing: string; legs: Leg[]; missing: Leg[]; claimedBy: string }

/** The hook: an external source if the note names one, otherwise the captain. No annotation, no date, no
 *  exceptions — the unclaimed is claimed, which is the doctrine gen-captain-claims.ts already seals. */
export function claimedBy(note: string): string {
  const m = note.match(WITNESS)
  return m ? m[0] : 'captain'
}

/** the comment block immediately above a theorem is where its wing records provenance. */
export function commentAbove(src: string, key: string): string {
  const at = src.search(new RegExp('^theorem\\s+' + key.replace(/[-_]/g, '[-_]') + '\\b', 'm'))
  if (at < 0) return ''
  const before = src.slice(0, at)
  const lines = before.split('\n')
  const out: string[] = []
  for (let i = lines.length - 1; i >= 0; i--) {
    const l = lines[i]
    if (/^\s*--/.test(l)) out.unshift(l)
    else if (l.trim() === '' && out.length) break
    else if (l.trim() === '') continue
    else break
  }
  return out.join('\n')
}

/** Read every wing and decide, per theorem, which of the five legs it actually carries. */
export function census(): Rosetta[] {
  const leanDir = join(ROOT, 'lean')
  const wings = readdirSync(leanDir).filter((f) => f.endsWith('.lean'))
  const testDir = join(ROOT, 'src', 'tests')
  const tests = existsSync(testDir)
    ? readdirSync(testDir).filter((f) => f.endsWith('.ts')).map((f) => readFileSync(join(testDir, f), 'utf8')).join('\n')
    : ''
  const emitters = readdirSync(join(ROOT, 'src', 'scripts')).filter((f) => /^lean-.*\.ts$/.test(f))
    .map((f) => readFileSync(join(ROOT, 'src', 'scripts', f), 'utf8')).join('\n')
  const generated = existsSync(join(ROOT, 'src', 'theorems', 'generated.ts'))
    ? readFileSync(join(ROOT, 'src', 'theorems', 'generated.ts'), 'utf8') : ''

  const out: Rosetta[] = []
  for (const wing of wings) {
    const src = readFileSync(join(leanDir, wing), 'utf8')
    for (const m of src.matchAll(/^theorem\s+([A-Za-z0-9_]+)/gm)) {
      const key = m[1]
      const note = commentAbove(src, key)
      const legs: Leg[] = []
      // PROOF — it is a sealed theorem in a wing the emitter verified sorry-free
      legs.push('proof')
      // SYMBOL — the emitter carries a js: mirror keyed to it (emit() hard-fails if the two disagree)
      if (new RegExp("key: '" + key + "'").test(emitters)) legs.push('symbol')
      // ADDRESS — the generated ledger folds it, so a stranger recomputes from the exact bytes
      if (generated.includes(key)) legs.push('address')
      // WITNESS — its wing note names something outside this repository
      if (WITNESS.test(note)) legs.push('witness')
      // FALSIFIER — a test names it, which is where a mutation that must fail would live
      if (tests.includes(key)) legs.push('falsifier')
      out.push({ key, wing, legs, missing: LEGS.filter((l) => !legs.includes(l)), claimedBy: claimedBy(note) })
    }
  }
  return out
}

/** the floor may only rise: a ledger cannot become less anchored than it already is. */
export function floorGaps(rows: readonly Rosetta[], floor: { witness: number; falsifier: number }): string[] {
  const gaps: string[] = []
  const w = rows.filter((r) => r.legs.includes('witness')).length
  const f = rows.filter((r) => r.legs.includes('falsifier')).length
  if (w < floor.witness) gaps.push(`witnessed theorems fell to ${w}, below the floor of ${floor.witness} — a claim lost its external anchor`)
  if (f < floor.falsifier) gaps.push(`falsified theorems fell to ${f}, below the floor of ${floor.falsifier} — a check stopped proving it can fail`)
  return gaps
}

if (process.argv[1] && /rosetta\.(js|ts)$/.test(process.argv[1])) {
  const rows = census()
  const key = process.argv.indexOf('--key') >= 0 ? process.argv[process.argv.indexOf('--key') + 1] : null

  if (key) {
    const r = rows.find((x) => x.key === key)
    if (!r) { console.error(`rosetta — no sealed theorem named ${key}`); process.exit(1) }
    console.log(`${r.key}  [${r.wing}]`)
    for (const l of LEGS) console.log(`  ${r.legs.includes(l) ? '✓' : '·'} ${l}`)
    console.log(`\n  ${r.legs.length} of 5 legs${r.legs.length < 3 ? ' — below the three that can LOCATE a fault' : ''}`)
    process.exit(0)
  }

  const byCount = new Map<number, number>()
  for (const r of rows) byCount.set(r.legs.length, (byCount.get(r.legs.length) ?? 0) + 1)
  console.log(`rosetta — ${rows.length} sealed theorems, by how many independent witnesses they carry\n`)
  for (const n of [...byCount.keys()].sort((a, b) => b - a)) {
    console.log(`  ${n} leg(s): ${String(byCount.get(n)).padStart(5)}  ${n >= 3 ? 'can locate a fault' : n === 2 ? 'can only DETECT — the pair that failed today' : ''}`)
  }
  for (const l of LEGS) {
    console.log(`  ${l.padEnd(10)} ${String(rows.filter((r) => r.legs.includes(l)).length).padStart(5)} of ${rows.length}`)
  }
  const byClaim = new Map<string, number>()
  for (const r of rows) byClaim.set(r.claimedBy, (byClaim.get(r.claimedBy) ?? 0) + 1)
  console.log(`\n  claimed by (computed, never annotated):`)
  for (const [who, n] of [...byClaim.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)) console.log(`    ${who.padEnd(14)} ${n}`)

  const five = rows.filter((r) => r.legs.length === 5)
  console.log(`\n  fully anchored (all five): ${five.length}${five.length ? ' — ' + five.slice(0, 6).map((r) => r.key).join(', ') : ''}`)
}
