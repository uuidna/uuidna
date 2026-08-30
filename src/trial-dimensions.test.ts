// trial-dimensions — THE TRIAL COMPUTES IN ALL DIMENSIONS, AND A SAMPLE CAN NO LONGER POSE AS A WALK
//
// The single-test trial was exactly wide enough to seal one point of a universal and call the universal
// verified — the one-step fraud this ledger has already paid for once. adjudicateAll makes the range part of
// the claim: one named test per dimension, VERIFIED only when every one recomputes, the failing dimension named
// to its face, and the empty range refused outright (vacuous truth is the same fraud in disguise). The worked
// example is the very claim that exposed the gap: χ = 2 − 2g across all three genera — sphere, torus, double
// torus — which the single-test trial could only ever try one leg of.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { adjudicateAll } from './index.js'

const CHI = [
  { dimension: 'sphere (g=0): χ = 2', test: () => 2 - 2 * 0 === 2 },
  { dimension: 'torus (g=1): χ = 0', test: () => 2 - 2 * 1 === 0 },
  { dimension: 'double torus (g=2): χ = −2', test: () => 2 - 2 * 2 === -2 },
]

test('the χ claim computes in ALL THREE genus dimensions — the whole range, one verdict', () => {
  const v = adjudicateAll('χ = 2 − 2g distinguishes the sphere, the torus and the double torus', CHI)
  assert.equal(v.verdict, 'VERIFIED')
  assert.equal(v.computedAll, true)
  assert.equal(v.dimensions.length, 3)
  assert.ok(v.note.includes('all 3 dimensions'), v.note)
  assert.match(v.dimensionRoot, /^[0-9a-f-]{36}$/)
})

test('CONTROL — one failing dimension fails the whole trial and names itself', () => {
  const v = adjudicateAll('every genus is flat', [
    ...CHI,
    { dimension: 'flatness needs χ = 0 at every genus', test: () => 2 - 2 * 0 === 0 },
  ])
  assert.equal(v.verdict, 'UNVERIFIED')
  assert.equal(v.computedAll, false)
  assert.ok(v.note.includes('fails in 1 of 4'), v.note)
  assert.ok(v.note.includes('flatness needs χ = 0'), 'the failed dimension is named to its face')
})

test('CONTROL — the empty range verifies nothing (vacuous truth refused)', () => {
  const v = adjudicateAll('everything I did not test is true', [])
  assert.equal(v.verdict, 'UNVERIFIED')
  assert.ok(v.note.includes('empty range'), v.note)
})

test('a throwing dimension is a failed dimension, never a crash and never a pass', () => {
  const v = adjudicateAll('the range survives a broken instrument', [
    { dimension: 'sound', test: () => true },
    { dimension: 'broken', test: () => { throw new Error('instrument failure') } },
  ])
  assert.equal(v.verdict, 'UNVERIFIED')
  assert.ok(v.note.includes('broken'))
})

test('the proof root is order-invariant — two observers, two orders, one root', () => {
  const a = adjudicateAll('order does not privilege a dimension', CHI)
  const b = adjudicateAll('order does not privilege a dimension', [...CHI].reverse())
  assert.equal(a.dimensionRoot, b.dimensionRoot)
  assert.equal(a.verdict, b.verdict)
})

test('the seven locale rays ride the same trial — harness7 as one instance of the general range', () => {
  const rays = ['en', 'bg', 'de', 'fr', 'es', 'ru', 'zh'].map((d) => ({
    dimension: d, test: () => d.length === 2,
  }))
  const v = adjudicateAll('every locale ray is a two-letter dimension', rays)
  assert.equal(v.verdict, 'VERIFIED')
  assert.equal(v.dimensions.length, 7)
})
