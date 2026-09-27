#!/usr/bin/env node
// numeral-reach — HOW MUCH OF THE LEDGER'S ARITHMETIC THE CROSSING MACHINERY CAN SEE.
//
// clay-crossroads found the Clay windows standing at zero junctions, and the cause was not about Clay: corpusAlgebra()
// draws its integers from formulas(), which keeps only rows that PARSE as formulas. Every program-shaped theorem — the
// overwhelming majority — contributes nothing, however characteristic the quantities it counts. This door measures the
// size of that blind spot so the decision to close it is taken against a number rather than an impression.
//
// It reports and holds. Closing the gap changes the novelty ranking for the whole corpus, which is a decision for a
// wave with a seal behind it, not for a reporting script.

import { theorems } from '../theorems/index.js'
import { characteristicNumerals, classify } from '../formula.js'
import { corpusAlgebra } from '../formulas.js'


const rows = theorems()
let formulaShaped = 0
const reachable = new Set<string>()
const all = new Set<string>()
const wingsOfInvisible = new Map<string, number>()

for (const t of rows) {
  const st = String(t.statement ?? '')
  const shape = classify(st)
  const ints = characteristicNumerals(st)
  for (const i of ints) all.add(i)
  if (shape === 'formula') {
    formulaShaped += 1
    for (const i of ints) reachable.add(i)
  } else {
    wingsOfInvisible.set(String(t.file), (wingsOfInvisible.get(String(t.file)) ?? 0) + 1)
  }
}

const alg = corpusAlgebra()
const seen = new Set(alg.integers.map((i) => i.value))
const invisible = [...all].filter((i) => !seen.has(i))

// THE COUNT ALONE WOULD MISLEAD, and it nearly did. The first run reported 65,536 invisible integers, which is exactly
// 2^16 — not 65,536 discoveries but ONE enumerated address space, the HexSpan wings walking every 16-bit value. An
// enumeration's members are coordinates, not characteristic quantities: admitting them would hand the crossing
// machinery 65k counting numbers and call the flood coverage. So the invisible set is split by how many DISTINCT wings
// each integer appears in and whether its wing family enumerates a contiguous range. What is worth reaching is the
// integer some wing had a reason to count to.
const wingsCarrying = new Map<string, Set<string>>()
for (const t of rows) {
  for (const i of characteristicNumerals(String(t.statement ?? ''))) {
    const s = wingsCarrying.get(i) ?? new Set<string>()
    s.add(String(t.file))
    wingsCarrying.set(i, s)
  }
}
const enumerated = new Set<string>()
for (const i of invisible) {
  const fams = new Set([...(wingsCarrying.get(i) ?? [])].map((w) => w.replace(/\d+\.lean$/, '.lean')))
  // an integer appearing ONLY inside one enumerating family, and nowhere a reader would have chosen it
  if (fams.size === 1 && (wingsCarrying.get(i)?.size ?? 0) <= 2) enumerated.add(i)
}
const characteristic = invisible.filter((i) => !enumerated.has(i))

const pct = (n: number, d: number): string => (d === 0 ? '—' : `${((n / d) * 100).toFixed(1)}%`)

console.log(`theorems: ${rows.length}`)
console.log(`  formula-shaped: ${formulaShaped} (${pct(formulaShaped, rows.length)})`)
console.log(`  program-shaped: ${rows.length - formulaShaped} (${pct(rows.length - formulaShaped, rows.length)})`)
console.log()
console.log(`distinct characteristic integers the ledger carries:      ${all.size}`)
console.log(`distinct integers corpusAlgebra() actually sees:          ${seen.size} (${pct(seen.size, all.size)})`)
console.log(`INVISIBLE to every cross the machinery can form:          ${invisible.length} (${pct(invisible.length, all.size)})`)
console.log(`  of those, members of one enumerated address space:      ${enumerated.size} — coordinates, not quantities`)
console.log(`  of those, CHARACTERISTIC and unreachable:               ${characteristic.length} — the real blind spot`)
if (characteristic.length > 0) {
  const sample = characteristic
    .sort((a, b) => (wingsCarrying.get(b)?.size ?? 0) - (wingsCarrying.get(a)?.size ?? 0))
    .slice(0, 10)
    .map((i) => `${i}(${wingsCarrying.get(i)?.size ?? 0} wings)`)
  console.log(`  the ten most widely carried of them: ${sample.join(', ')}`)
}
console.log()
const top = [...wingsOfInvisible].sort((a, b) => b[1] - a[1]).slice(0, 8)
console.log('wings contributing the most unreachable statements:')
for (const [wing, n] of top) console.log(`  ${wing.padEnd(28)} ${n}`)
