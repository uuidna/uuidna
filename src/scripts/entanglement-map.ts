#!/usr/bin/env node
// entanglement-map — EVERY RARE QUANTITY IN THE LEDGER AND THE FEW WINGS THAT SHARE IT, in one pass.
//
// The captain, 2026-09-28: "widen to anything imaginable and deep research the entanglements and cross applications".
//
// WHY THIS IS THE COMPLETE FORM AND THE PER-WING DOOR IS THE SAMPLE. window-crossroads answers "where does THIS wing
// stand", which needs a wing named and walks its junctions. Asking it about every wing is 262 questions and a wing-pair
// walk. But an entanglement IS a rare integer with more than one carrier, so the whole map falls out of one walk over
// the corpus's integers: for each, the wings that carry it. Cheap, complete, and no wing has to be chosen in advance.
//
// THE RANKING IS CARRIER COUNT ASCENDING, which is the same discipline as everywhere else here — a quantity two wings
// share is a bridge, one that 77 wings share is a counting number. Two is the sharpest possible entanglement and the
// listing starts there.
//
// WHAT IT IS NOT. A shared integer is a fact about integers. lean/CrossFormulas.lean says it plainly about its own
// census — "two domains sharing an integer is a fact about integers; whether it means anything about the domains is a
// question for a person" — and this inherits that exactly. Colour and Acoustics share 340; one is a hue angle and the
// other a wave speed in metres per second, and nothing physical passes between them. The map says where to look.

import { theorems } from '../theorems/index.js'
import { characteristicNumerals } from '../formula.js'

const ARG = process.argv.slice(2)
const wanted = (flag: string, fallback: number): number => {
  const i = ARG.indexOf(flag)
  if (i < 0 || ARG[i + 1] === undefined) return fallback
  const n = Number(ARG[i + 1])
  return Number.isFinite(n) && n > 0 ? n : fallback
}
const MAX_CARRIERS = wanted('--carriers', 4)
const SHOW = wanted('--show', 40)

// ── one walk: every characteristic integer, and the wings that carry it
const carriers = new Map<string, Set<string>>()
const keyOf = new Map<string, string>()
for (const t of theorems()) {
  const wing = String(t.file).replace(/\.lean$/, '')
  for (const v of characteristicNumerals(String(t.statement ?? ''))) {
    const s = carriers.get(v) ?? new Set<string>()
    if (!s.has(wing)) keyOf.set(`${v}|${wing}`, String(t.key))
    s.add(wing)
    carriers.set(v, s)
  }
}

// AN ENUMERATED FAMILY IS ONE CARRIER, NOT SIXTEEN. HexSpan1..16 and EquilibriumXor1..64 are one wing split across
// files; counting them separately would make every integer in them look widely shared and drown the real bridges.
const family = (wing: string): string => wing.replace(/\d+$/, '')
const bridges: { value: string; wings: string[]; families: number }[] = []
for (const [value, wingSet] of carriers) {
  const wings = [...wingSet].sort()
  const fams = new Set(wings.map(family))
  if (fams.size < 2) continue          // a single family sharing with itself is its own arithmetic
  if (fams.size > MAX_CARRIERS) continue // a quantity many families carry is a counting number
  bridges.push({ value, wings, families: fams.size })
}
bridges.sort((a, b) =>
  a.families - b.families
  || (BigInt(b.value) > BigInt(a.value) ? 1 : BigInt(b.value) < BigInt(a.value) ? -1 : 0))

const distinct = carriers.size
console.log(`characteristic integers ${distinct} · bridges (shared by 2..${MAX_CARRIERS} wing families) ${bridges.length}`)
console.log()
for (const b of bridges.slice(0, SHOW)) {
  const named = b.wings.slice(0, 6).join(' ⇄ ')
  console.log(`${b.value.padStart(12)}  ${b.families} families  ${named}${b.wings.length > 6 ? ` … +${b.wings.length - 6}` : ''}`)
}
if (bridges.length > SHOW) console.log(`… and ${bridges.length - SHOW} more bridges`)
console.log()
console.log('A shared integer is a fact about integers. Whether it means anything about the domains is a question for a')
console.log('person — Colour and Acoustics share 340, a hue angle and a wave speed, and nothing physical passes between.')
