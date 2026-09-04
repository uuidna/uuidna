#!/usr/bin/env node
// audit-ledger-drain — THE LEAN LEDGER AND THE TYPED LEDGER MUST HOLD THE SAME THEOREMS.
//
// THE DEFECT THIS CLOSES, caught live on 2026-09-04. Three theorems were authored in a wing generator, emitted to
// lean/SiteBuild.lean, and VERIFIED SORRY-FREE by the real kernel — and the ledger every consumer reads still said
// 2603. The site, the MCP tools, the trial and the publications all read src/theorems/generated.ts, which is
// written by a SEPARATE door (`npm run x -- lean-ledger`). `npm run x -- generate` runs every generator and does
// not include that one, so the reconcile order a maintainer follows leaves the gap open. Nothing failed. The
// theorems were proved and invisible, which is the worst of the two directions: an unproved claim gets refused by
// the kernel, but a proved-and-undrained one is simply absent, and absence does not announce itself.
//
// TWO DIRECTIONS, BOTH FAULTS. Lean ahead of the ledger means proved work is not being served. The ledger ahead of
// Lean means the served ledger holds a key no wing proves, which the axiom witness would catch, but this names it
// sooner and more plainly. The check is a set comparison, not a count comparison, so a rename that keeps the total
// steady is caught too — a count equality would have passed 2606 = 2606 while two keys swapped.
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { THEOREMS } from '../theorems/index.js'
import { toUuid, merkleFold } from '../address.js'

const THEOREM_RE = /^theorem\s+([A-Za-z0-9_]+)/gm

export interface DrainCensus {
  /** every theorem key proved in lean/*.lean */
  inLean: string[]
  /** every theorem key the typed ledger serves */
  inLedger: string[]
  /** proved but not served — the direction that hides work */
  undrained: string[]
  /** served but not proved — the direction that would serve an unproved key */
  unproved: string[]
  agrees: boolean
  receipt: string
}

/** compareLedgers(inLean, inLedger) → the comparison itself, with no filesystem in it. Split out so a test can
 *  inject a mismatch and prove the finder FIRES: a drain check that only ever runs against a healthy tree is
 *  indistinguishable, by construction, from one that returns the empty list unconditionally. */
export function compareLedgers(inLean: Iterable<string>, inLedger: Iterable<string>): DrainCensus {
  const lean = new Set(inLean)
  const ledger = new Set(inLedger)
  const undrained = [...lean].filter((k) => !ledger.has(k)).sort()
  const unproved = [...ledger].filter((k) => !lean.has(k)).sort()
  return {
    inLean: [...lean].sort(),
    inLedger: [...ledger].sort(),
    undrained,
    unproved,
    agrees: undrained.length === 0 && unproved.length === 0,
    receipt: merkleFold([
      toUuid('drain|' + lean.size + '|' + ledger.size),
      ...undrained.map((k) => toUuid('undrained|' + k)),
      ...unproved.map((k) => toUuid('unproved|' + k)),
    ]),
  }
}

/** ledgerDrain() → the two ledgers, compared as sets. Pure; one walk of lean/. */
export function ledgerDrain(): DrainCensus {
  const inLean = new Set<string>()
  for (const f of readdirSync(join(ROOT, 'lean')).filter((f) => f.endsWith('.lean'))) {
    const src = readFileSync(join(ROOT, 'lean', f), 'utf8')
    for (const m of src.matchAll(THEOREM_RE)) inLean.add(m[1]!)
  }
  return compareLedgers(inLean, THEOREMS.map((t) => t.key))
}

/** drainGaps() → the guard's shape. Named `ledgerDrainGaps` to avoid colliding with one-receipt's drainGaps. */
export function ledgerDrainGaps(): { what: string; fix: string }[] {
  const c = ledgerDrain()
  const gaps: { what: string; fix: string }[] = []
  if (c.undrained.length) gaps.push({
    what: `${c.undrained.length} theorem(s) are PROVED in lean/ and absent from the served ledger: `
      + `${c.undrained.slice(0, 8).join(', ')}${c.undrained.length > 8 ? ', …' : ''}`,
    fix: 'run `npm run x -- lean-ledger` to rewrite src/theorems/generated.ts from lean/, then `npm run build`. '
      + 'A theorem the kernel proved and the ledger does not serve is invisible work: the site, the MCP tools and '
      + 'the publications all read the typed ledger, not the .lean files.',
  })
  if (c.unproved.length) gaps.push({
    what: `${c.unproved.length} theorem key(s) are SERVED by the ledger and proved by no wing: `
      + `${c.unproved.slice(0, 8).join(', ')}${c.unproved.length > 8 ? ', …' : ''}`,
    fix: 'either author and prove the wing that seals them, or regenerate the ledger from lean/ so it stops '
      + 'serving a key nothing proves — a served key with no proof is the one thing this tree refuses outright',
  })
  return gaps
}

const isMain = process.argv[1]?.endsWith('audit-ledger-drain.js') ?? false
if (isMain) {
  const c = ledgerDrain()
  console.log(`audit-ledger-drain — ${c.inLean.length} proved in lean/ · ${c.inLedger.length} served by the ledger · receipt ${c.receipt}`)
  const gaps = ledgerDrainGaps()
  if (gaps.length) {
    console.log('✗ audit-ledger-drain — ' + gaps.length + ' gap(s), each with its exact fix:')
    for (const g of gaps) console.log('    GAP ' + g.what + '\n    FIX ' + g.fix)
    process.exit(1)
  }
  console.log('✓ audit-ledger-drain — every proved theorem is served, and every served theorem is proved.')
}
