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
import { bridges as bridgesOf, carriedCount } from '../entanglement.js'

const ARG = process.argv.slice(2)
const wanted = (flag: string, fallback: number): number => {
  const i = ARG.indexOf(flag)
  if (i < 0 || ARG[i + 1] === undefined) return fallback
  const n = Number(ARG[i + 1])
  return Number.isFinite(n) && n > 0 ? n : fallback
}
const MAX_CARRIERS = wanted('--carriers', 4)
const SHOW = wanted('--show', 40)

// ── one walk: every characteristic integer, and the wings that carry it. THE RULE LIVES IN src/entanglement.ts so the
// CODATA proving door shares it rather than restating it — a duplicated criterion drifts, and the drift is invisible
// because each copy stays self-consistent.
const rows = theorems().map((t) => ({
  file: String(t.file),
  numerals: characteristicNumerals(String(t.statement ?? '')),
}))
const bridges = bridgesOf(rows, MAX_CARRIERS)
const distinct = carriedCount(rows)
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
