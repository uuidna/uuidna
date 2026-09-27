#!/usr/bin/env node
// clay-crossroads — REPORT WHERE THE SEVEN MILLENNIUM WINDOWS STAND, and how much is formulable there.
//
// This is the door src/clay-crossroads.ts was missing (recorded at the time as UUIDNA_MCP_GAP="no clay door"). It
// reports and holds: it deposits nothing and seals nothing, because a crossroad is a place to look and the crosses
// found at one belong on the wave conveyor, which is the only thing in this repository allowed to feed the ledger.

import { theorems } from '../theorems/index.js'
import { corpusAlgebra } from '../formulas.js'
import { clayWindows, crossroadCensus, crossroads } from '../clay-crossroads.js'

const rows = theorems().map((t) => ({
  key: String(t.key),
  file: String(t.file),
  statement: String(t.statement ?? ''),
}))
const windows = clayWindows(rows)
const alg = corpusAlgebra()
const roads = crossroads({
  windows,
  integers: alg.integers,
  stated: new Set(alg.stated.keys()),
  arithmetic: alg.arithmetic,
  ceiling: alg.ceiling,
})
const census = crossroadCensus(windows, roads)

console.log(`clay windows: ${census.windows}  ·  reachable as formula: ${census.reachableAsFormula}`)
console.log(`junctions: ${census.junctions}  ·  formulable applications: ${census.applications}`)
console.log(`of those, CHARACTERISTIC (built on an integer the corpus rarely carries): ${census.characteristic}`)
if (census.isolated.length > 0) console.log(`ISOLATED (standing at no junction): ${census.isolated.join(', ')}`)
console.log()
for (const w of windows) {
  const mine = roads.filter((r) => r.windowKey === w.key)
  const apps = mine.reduce((n, r) => n + r.applications, 0)
  const chr = mine.reduce((n, r) => n + r.characteristic, 0)
  console.log(`${w.key}`)
  console.log(`   shape ${w.shape} · integers [${w.integers.join(', ')}] · ${mine.length} junction(s) · ${apps} application(s), ${chr} characteristic`)
  for (const r of mine.slice(0, 3)) {
    console.log(`     ↳ ${r.wing} on [${r.shared.join(', ')}] — ${r.characteristic} characteristic of ${r.applications}, rarity ${r.rarity}`)
  }
}
