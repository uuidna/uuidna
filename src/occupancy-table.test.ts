// occupancy-table — THE DERIVABLE FIELD LEFT THE PAGE BAG, AND THIS IS THE PROOF IT LOST NOTHING.
//
// Lead 126 measured 58 MB of the 130 MB param payload in one field, `occupancyCites`, repeated on every one of the
// 10,344 object pages. The lead's own caution was that dropping it silently DROPS the citation keys from rendered
// pages — a content change, not a free perf win. So the cut is not a drop: the field is occupancy × a 36-entry
// address-independent table, shipped once (docs/.vitepress/occupancy.data.ts) and re-derived in HexFace.vue. What
// this file holds is the equivalence over EVERY address the ledger seals, the absence of the field from the page
// bag, and the size of the table — so the saving is measured, not assumed.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { occupancyCiteTable, occupancyCitesOf, occupancyOf, monographFaceOf } from './hexagram.js'
import { composeTheorem } from './compose-object.js'
import { theorems } from './index.js'

test('occupancy × the table reproduces occupancyCitesOf for every sealed address', () => {
  const table = occupancyCiteTable()
  for (const t of theorems()) {
    const derived = occupancyOf(t.address).map((n) => ({ n, keys: table[n] ?? [] }))
    assert.deepEqual(derived, occupancyCitesOf(t.address), `${t.key}: the table-derived citations differ from the served face`)
  }
})

test('the page bag no longer carries occupancyCites, and the table is small enough to ship once', () => {
  const t = theorems()[0]!
  assert.equal('occupancyCites' in monographFaceOf(t.address), false, 'monographFaceOf must not repeat the derivable field')
  assert.equal('occupancyCites' in composeTheorem(t).params, false, 'composeTheorem must not repeat the derivable field')
  const bytes = JSON.stringify(occupancyCiteTable()).length
  assert.ok(bytes < 65536, `the shared table is ${bytes} bytes — it must stay a fraction of one page's params`)
  assert.ok(Object.keys(occupancyCiteTable()).length > 0, 'an empty table would render every citation list empty — the silent drop the lead warned of')
})

test('CONTROL — a table missing a count would be caught, not rendered as an empty list', () => {
  const table = occupancyCiteTable()
  const t = theorems().find((x) => occupancyOf(x.address).some((n) => (table[n] ?? []).length > 0))!
  const broken: Record<number, readonly string[]> = { ...table }
  const n = occupancyOf(t.address).find((k) => (table[k] ?? []).length > 0)!
  delete broken[n]
  const derived = occupancyOf(t.address).map((k) => ({ n: k, keys: broken[k] ?? [] }))
  assert.notDeepEqual(derived, occupancyCitesOf(t.address), 'the equivalence test must be able to fail')
})
