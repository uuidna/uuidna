#!/usr/bin/env node
// src/scripts/stamp.ts — THE ONE STAMPER. Every ledger number on every surface, from one place.
//
// WHY IT EXISTS. The archive published 1274 theorems into a permanent DOI because .zenodo.json was typed; the
// correction that followed fixed the title by hand and left the principle count and the receipt stale in the
// sentence below it. Widening the finder then showed the same disease across the repo: 1195 stated in four
// separate files, 1208 in the doctrine, 66 principles in an orphan report — each true once, none true now, and
// each written by a different hand into a different file with no owner. A finder turns that into a chore. A
// GENERATOR removes it. The consolidation is the point: one slot table, so a surface never learns a number, it
// only declares WHICH number it wants and where.
//
// HOW A SURFACE OPTS IN. Anywhere in a tracked text file:
//     <!--L:distinct-->…<!--/L-->
// The stamper replaces the contents with the live value, wrapped in microdata. Adding a surface is one marker;
// adding a fact is one line in SLOTS. Nothing else changes, and no file is edited that did not ask to be.
//
// MICRODATA — cheap to compute, expensive to fake. Each stamp renders the value carrying its own provenance:
// the slot it came from and the ledger receipt it was read at. Computing it is one census pass over the sealed
// ledger; faking it means producing a ledger whose 1307 addresses fold, order-invariantly, to the same receipt.
// So the number a reader sees is checkable by machine without trusting the page: recompute the census, recompute
// the fold, compare. That asymmetry is the whole design — display costs nothing, forgery costs a preimage.
import { writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT, rd } from './api.js'
import { theorems, statementCensus, runTrial, PRINCIPLES, coins } from '../index.js'

const T = theorems()
const census = statementCensus()
const RECEIPT = runTrial().receipt

/** THE SLOT TABLE — the only place any surface's ledger number is decided. A number absent here cannot be
 *  stamped, which is the intended friction: a fact worth publishing is worth computing. */
export const SLOTS: Readonly<Record<string, () => string>> = {
  distinct: () => String(census.distinct),        // propositions — a theorem is its Lean
  keys: () => String(T.length),                   // entries — the larger of the two true sizes
  renamings: () => String(census.renamings),      // the gap between them, stated so neither number misleads
  principles: () => String((PRINCIPLES as unknown[]).length),
  skills: () => String(new Set(T.map((t) => t.skill)).size),
  coins: () => String(coins()),
  receipt: () => RECEIPT,                         // the order-invariant fold of every theorem address
}

/** microdata(slot, value) → the value carrying its own provenance. Machine-readable, no page trust required. */
const microdata = (slot: string, value: string): string =>
  `<span class="ledger" data-slot="${slot}" data-receipt="${RECEIPT}">${value}</span>`

// `<!--L:slot-->` carries microdata; `<!--L:slot:raw-->` writes the bare value, for the two places a span would
// render as literal text rather than provenance: inside a fenced code block, and inside JSON.
const MARKER = /<!--L:([a-z]+)(:raw)?-->[\s\S]*?<!--\/L-->/g

/** stampText(text) → the same text with every declared slot refreshed. Idempotent: stamping twice is stamping once. */
export function stampText(text: string): { out: string; slots: string[]; unknown: string[] } {
  const slots: string[] = [], unknown: string[] = []
  const out = text.replace(MARKER, (whole, slot: string, raw: string | undefined) => {
    const read = SLOTS[slot]
    if (!read) { unknown.push(slot); return whole }
    slots.push(slot)
    const tag = `<!--L:${slot}${raw ?? ''}-->`
    return `${tag}${raw ? read() : microdata(slot, read())}<!--/L-->`
  })
  return { out, slots, unknown }
}

/** The surfaces are DISCOVERED— a file is stamped exactly when it declares a slot. */
export function stampSurfaces(write = true): { file: string; slots: string[]; changed: boolean }[] {
  const files = execSync('git ls-files', { cwd: ROOT, encoding: 'utf8' }).split('\n')
    .filter((f) => /\.(md|html|txt|json)$/.test(f) && !f.includes('package-lock'))
  const done: { file: string; slots: string[]; changed: boolean }[] = []
  for (const f of files) {
    let text = ''
    try { text = rd(f) } catch { continue }
    if (!text.includes('<!--L:')) continue
    const { out, slots, unknown } = stampText(text)
    if (unknown.length) throw new Error(`stamp: ${f} declares unknown slot(s) ${unknown.join(', ')} — add it to SLOTS or fix the marker; a surface may not invent a fact`)
    const changed = out !== text
    if (changed && write) writeFileSync(join(ROOT, f), out)
    done.push({ file: f, slots, changed })
  }
  return done
}

// THE STALE-STAMP FINDER, and the fast path is why it is needed. stamp.js runs inside `npm run lean`, the whole
// five-minute chain over sixty-six wings. `lean-one <wing>` proves ONE wing in 0.087 seconds and is therefore
// what anybody sealing a single wing actually runs — and it does not stamp. Measured on this landing: a wing of
// seven theorems left docs/doctrine.md telling readers the ledger held 2589 keys and 2506 distinct statements
// when it held 2596 and 2513, with a receipt beside the numbers vouching for them. A stamped number carrying a
// stale receipt is worse than an unstamped one, because the provenance is what invites the reader to trust it.
/** the surfaces whose stamped numbers no longer match the ledger. Reads only; writes nothing. Internal: the
 *  finder below is the one public door, so guard and state cannot drift onto two different readings. */
function stampDrift(): { file: string; slots: string[] }[] {
  return stampSurfaces(false).filter((d) => d.changed).map(({ file, slots }) => ({ file, slots }))
}

/** stampGaps() → the same reading in the shape every other finder speaks, so guard and state read one function. */
export function stampGaps(): { what: string; fix: string }[] {
  return stampDrift().map((d) => ({
    what: `${d.file} carries stamped ledger slot(s) (${d.slots.join(', ')}) that no longer match the ledger`,
    fix: 'run `npm run x -- stamp` — the slots are generated from the live census, so the surface is corrected by recomputing it, never by editing the number',
  }))
}

if (process.argv[1] && process.argv[1].endsWith('stamp.js')) {
  const done = stampSurfaces(true)
  const moved = done.filter((d) => d.changed)
  for (const d of done) console.log(`  ${d.changed ? '↻' : '='} ${d.file} — ${d.slots.join(', ')}`)
  console.log(`✓ stamp — ${done.length} surface(s), ${moved.length} refreshed, at receipt ${RECEIPT}`)
}
