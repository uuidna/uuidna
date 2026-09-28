#!/usr/bin/env node
// @finder phase:2 — DISCOVERED, not listed. This file says that it belongs to the audit
// chain and where in it; the runner (finders.ts) reads that and nothing central is edited when a finder
// is added. The phase was taken from the chain as it stood when the hand list was dissolved, so the
// order did not change on the day it stopped being typed.
// window-crossroads — REPORT WHERE A WING OF FINITE WINDOWS STANDS, and how much is formulable there.
//
// Usage: npm run x -- window-crossroads [<Wing.lean> ...]   (default: Clay.lean and the two CERN wings)
//
// Through the dispatcher, not a package.json entry: a hand-typed wrapper nothing else calls is refused here, and a
// usage line naming a script that does not exist is a remedy pointing nowhere.
//
// This is the door src/window-crossroads.ts was missing (recorded at the time as UUIDNA_MCP_GAP="no clay door"). It
// reports and holds: it deposits nothing and seals nothing, because a crossroad is a place to look and the crosses
// found at one belong on the wave conveyor, which is the only thing here allowed to feed the ledger.

import { theorems } from '../theorems/index.js'
import { corpusAlgebra } from '../formulas.js'
import { CERN_WINGS, CLAY_WING, crossroadCensus, crossroads, entanglements, windowsOf } from '../window-crossroads.js'

const asked = process.argv.slice(2).filter((a) => a.endsWith('.lean'))
const wings = asked.length > 0 ? asked : [CLAY_WING, ...CERN_WINGS]

const rows = theorems().map((t) => ({
  key: String(t.key),
  file: String(t.file),
  statement: String(t.statement ?? ''),
}))
const alg = corpusAlgebra()
const stated = new Set(alg.stated.keys())

for (const wing of wings) {
  const windows = windowsOf(rows, wing)
  if (windows.length === 0) {
    console.log(`${wing}: NO SUCH WING in the ledger — nothing measured, which is not the same as nothing found`)
    console.log()
    continue
  }
  const roads = crossroads({
    windows,
    homeWing: wing,
    integers: alg.integers,
    stated,
    arithmetic: alg.arithmetic,
    ceiling: alg.ceiling,
  })
  const census = crossroadCensus(windows, roads)
  console.log(`${wing} — ${census.windows} window(s), ${census.reachableAsFormula} reachable as formula`)
  console.log(`  junctions ${census.junctions} · formulable ${census.applications} · CHARACTERISTIC ${census.characteristic}`)
  if (census.isolated.length > 0) {
    console.log(`  ISOLATED (standing at no junction): ${census.isolated.join(', ')}`)
  }
  // ENTANGLEMENTS, not the biggest junctions. Ranking by the count of formulable crosses answers HexSpan1.lean and
  // Audit.lean for every wing, because those two carry nearly every integer and so junction with everything — a fact
  // about their size and not about the subject. See `entanglements` for the measured breadth cut.
  const ent = entanglements(roads)
  if (ent.length === 0) {
    console.log('  no entanglement: every neighbour is wider than the median wing, so nothing here is characteristic')
  } else {
    for (const r of ent) {
      console.log(`    ⇄ ${r.wing.replace(/\.lean$/, '')} on [${r.shared.slice(0, 10).join(', ')}] — rarity ${r.rarity}, breadth ${r.breadth}`)
      console.log(`        via ${r.windowKey}`)
    }
  }
  console.log()
}
