// aspects — structure across named aspects: resonance + harvest + operation-last naming. Meaning is always null.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { aspectCensus, loudOf } from './index.js'

test('meaning is always null — structure computes, sense stays the reader\'s', () => {
  const c = aspectCensus([{ id: 'tides', text: 'tides sailing weather calendar' }])
  assert.equal(c.meaning, null)
  assert.ok(c.receipt.length > 8)
  assert.equal(c.door, `https://uuidna.com/${c.handle}`)
})

test('same aspects fold the same receipt — order of listing is the set', () => {
  const a = [{ id: 'maps', text: 'maps topography navigation grid' }, { id: 'uuid', text: 'uuid handle hexbit coins' }]
  const r1 = aspectCensus(a)
  const r2 = aspectCensus([...a].reverse())
  assert.equal(r1.receipt, r2.receipt, 'merkleFold is order-invariant over aspect rows')
})

test('rare concepts outrank stopwords — maps rings topography, not the whole ledger', () => {
  const c = aspectCensus([{ id: 'maps', text: 'maps topography navigation grid seats coordinates' }])
  const row = c.aspects[0]!
  assert.ok(row.peak > 0)
  assert.ok(row.loud.length > 0, 'a distinctive query has a loud band')
  const keys = row.loud.map((m) => m.key)
  assert.ok(
    keys.some((k) => /grid|topograph|navigat|seat|coord|compass|gunter/i.test(k + row.loud.find((m) => m.key === k)!.principle)),
    'loud keys sit in maps/grid/nav/topography, not a generic report theorem',
  )
  assert.ok(!keys.includes('a_claim_is_verified_or_unverified'), 'substring accidents are not the loud band')
})

test('a query with no sealed neighbour is silent — cricket is not a wing', () => {
  const c = aspectCensus([{ id: 'cricket', text: 'cricket india england' }])
  assert.deepEqual(c.silent, ['cricket'])
  assert.equal(c.aspects[0]!.loud.length, 0)
})

test('harvest smelts stated arithmetic — 128 - 70 = 58 is decided, not sealed as usable_gap', () => {
  const c = aspectCensus([{ id: 'ibm-70', text: '70 logical qubits. 128 - 70 = 58. 70 < 128.' }])
  const frags = c.aspects[0]!.harvest.map((h) => h.fragment.replace(/\s+/g, ''))
  assert.ok(frags.some((f) => f.includes('128-70=58')), 'the IBM gap arithmetic is a mint candidate')
})

test('loudOf keeps the peak band and is empty at peak 0', () => {
  assert.deepEqual(loudOf([], 0), [])
  assert.deepEqual(loudOf([{ key: 'a', title: '', skill: '', principle: '', address: 'x', concept: 'c', concepts: ['c'], resonance: 10 }], 100), [])
  assert.equal(loudOf([{ key: 'a', title: '', skill: '', principle: '', address: 'x', concept: 'c', concepts: ['c'], resonance: 40 }], 100).length, 1)
})
