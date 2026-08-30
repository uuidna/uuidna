// measure — a measurement without a receipt is a claim.
//
// These assertions were first written as a `node -e` one-liner, in the same turn as the tool built to end that
// habit. That is the whole disease in miniature: the verification of the receipt machinery left no receipt. A test
// file is the difference between checking something once and checking it on every pass.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MEASUREMENTS, take, receiptOf } from '../scripts/measure.js'

test('a receipt is deterministic across runs of the same measurement', async () => {
  const m = MEASUREMENTS.find((x) => x.name === 'ledger')!
  const [a, b] = [await take(m), await take(m)]
  assert.equal(a.receipt, b.receipt)
})

// ── the control. A receipt that never moves would be a constant wearing an address.
test('a receipt MOVES when the value moves', () => {
  assert.notEqual(receiptOf('ledger', { keys: 1336 }), receiptOf('ledger', { keys: 1337 }))
  assert.notEqual(receiptOf('ledger', { keys: 1336 }), receiptOf('rosetta', { keys: 1336 }),
    'the NAME is folded too, so two measurements agreeing on a value are still distinct')
})

test('every registered measurement runs and returns a receipt', async () => {
  for (const m of MEASUREMENTS) {
    const r = await take(m)
    assert.ok(r.receipt.length > 0, `${m.name} produced no receipt`)
    assert.notEqual(r.value, undefined, `${m.name} measured nothing`)
  }
})

// ── the live invariants these measurements exist to hold.
test('wing-parity holds in BOTH directions', async () => {
  const r = await take(MEASUREMENTS.find((x) => x.name === 'wing-parity')!)
  const v = r.value as { inWings: number; inLedger: number; wingNotInLedger: string[] }
  assert.deepEqual(v.wingNotInLedger, [], 'a wing theorem absent from the ledger is invisible to every consumer')
  assert.equal(v.inWings, v.inLedger)
})

test('no handle fails to recover itself from its path', async () => {
  const v = (await take(MEASUREMENTS.find((x) => x.name === 'handle-roundtrip')!)).value as { broken: number }
  assert.equal(v.broken, 0)
})

test('axiom-balance lands all dimensions and fuses', async () => {
  const r = await take(MEASUREMENTS.find((x) => x.name === 'axiom-balance')!)
  const v = r.value as { active: number; balanced: number; fused: string; global: { citeEdges: number }; worst: unknown[] }
  assert.ok(v.fused.length > 0)
  assert.ok(v.active > 0)
  assert.ok(v.global.citeEdges > 0)
  assert.ok(Array.isArray(v.worst))
})
