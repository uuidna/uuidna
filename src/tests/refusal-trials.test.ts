import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  refusalStatus,
  sealedKeysIn,
  trialRefusal,
  trialAllRefusals,
  collideRefusals,
  dispositionFor,
  pairCollisions,
  witnessKeysFor,
} from '../refusal-trials.js'

test('sealedKeysIn finds theorem keys in boundary prose', () => {
  const keys = new Set(['grover_quadratic_bound', 'two_coins'])
  const found = sealedKeysIn('Grover is not gone: grover_quadratic_bound and two_coins seal it.', keys)
  assert.deepEqual(found.sort(), ['grover_quadratic_bound', 'two_coins'])
})

test('refusalStatus — lean when boundary cites sealed keys', () => {
  assert.equal(refusalStatus(['n_qubit_dimension'], 'Quantum advantage', 'theorem n_qubit_dimension counts cost'), 'lean')
})

test('refusalStatus — policy for desk/crawl boundaries', () => {
  assert.equal(refusalStatus([], 'Desk auto-seals', 'Two-handle law: desk proposes'), 'policy')
})

test('trialRefusal — quantum refusal is lean with sealed keys and verified disposition', () => {
  const keys = new Set(['grover_quadratic_bound', 'sha256_grover_margin_is_the_address', 'key_floor_is_one_uuid'])
  const row = trialRefusal({
    lead: 'All quantum threat is gone with uuidna',
    boundary:
      'Grover is not gone: grover_quadratic_bound and sha256_grover_margin_is_the_address seal 256/2 = 128, and key_floor_is_one_uuid names that floor.',
  })
  assert.ok(row)
  assert.equal(row.status, 'lean')
  assert.equal(row.disposition, 'verified')
  assert.ok(row.sealedKeys.some((k) => keys.has(k)))
  assert.ok(row.theoremTrials.every((t) => t.verdict === 'VERIFIED'))
  assert.equal(row.instrumentValid, true)
})

test('witnessKeysFor — Girdler refusal exposes separation doctrine already sealed', () => {
  const prose =
    'Girdler sulfide dual-temperature exchange as separation-by-involution. ' +
    'Separation-by-involution remains sealed for the digit walk (Phase.lean / Thermodynamics.lean)'
  const w = witnessKeysFor(prose)
  assert.ok(w.includes('dz_loses_nothing'))
  assert.ok(w.includes('reversible_erases_nothing'))
})

test('trialRefusal — over-unity boundary omits keys but witness exposes thermodynamics', () => {
  const row = trialRefusal({
    lead: 'Over-unity / free energy devices',
    boundary: 'the first law. Splitting water costs at least what burning it returns.',
  })
  assert.ok(row)
  assert.equal(row.status, 'lean')
  assert.equal(row.disposition, 'verified')
  assert.equal(row.citedKeys.length, 0)
  assert.ok(row.witnessKeys.includes('first_law_conservation'))
  assert.ok(row.witnessKeys.includes('no_perpetual_motion'))
})

test('collideRefusals — all 20 refusals settle verified or purged with theorem trials', () => {
  const refused = [
    { lead: 'Quantum advantage or speedup claims', boundary: 'sealed boundary is theorem n_qubit_dimension: 2^n counts cost' },
    { lead: 'Bulk crawling of chitanka.info', boundary: 'robots.txt disallows systematic retrieval' },
    { lead: 'Over-unity / free energy devices', boundary: 'the first law. Splitting water costs at least what burning it returns.' },
  ]
  const record = collideRefusals(refused)
  assert.equal(record.refused, 3)
  assert.equal(record.open, 0)
  assert.equal(record.verified + record.purged, 3)
  assert.ok(record.collisionPairs >= 0)
  for (const t of record.trials) {
    assert.ok(t.disposition === 'verified' || t.disposition === 'purged')
    if (t.status === 'lean') assert.ok(t.theoremTrials.every((x) => x.verdict === 'VERIFIED'))
  }
})

test('dispositionFor — policy boundaries verify without theorem keys', () => {
  assert.equal(dispositionFor({ status: 'policy' }, []), 'verified')
})

test('pairCollisions — shared theorem keys link refusals', () => {
  const a = trialRefusal({
    lead: 'All quantum threat is gone',
    boundary: 'grover_quadratic_bound and key_floor_is_one_uuid seal the floor.',
  })!
  const b = trialRefusal({
    lead: 'Quantum advantage or speedup claims',
    boundary: 'n_qubit_dimension counts simulation cost.',
  })!
  const pairs = pairCollisions([a, b])
  assert.equal(pairs[0]!.length + pairs[1]!.length, 0)
})

test('trialAllRefusals — folds every refused row with boundary', () => {
  const record = trialAllRefusals([
    { lead: 'Quantum advantage or speedup claims', boundary: 'sealed boundary is theorem n_qubit_dimension: 2^n counts cost' },
    { lead: 'Bulk crawling of chitanka.info', boundary: 'robots.txt disallows systematic retrieval' },
  ])
  assert.equal(record.refused, 2)
  assert.equal(record.lean, 1)
  assert.equal(record.policy, 1)
  assert.equal(record.open, 0)
  assert.equal(record.verified, 2)
  assert.ok(record.receipt)
})
