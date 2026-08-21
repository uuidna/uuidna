// captain-coins — the valuation law, tested: each theorem is worth one coin per DIRECTION per BOUNDARY covered
// (its top-level ∧-conjuncts held in superposition, each walked forward and contra), so total coins are the
// superpositions times two. The floor agrees with the conservation law: a one-boundary theorem is worth exactly
// coins() = 2. Pure and offline, recomputed from the sealed ledger. Integrity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { coins, boundariesOf, theoremCoins, ledgerCoins, theorems } from '../index.js'

test('boundaries are top-level conjuncts — depth-aware, at least one', () => {
  assert.equal(boundariesOf('2 = 2'), 1, 'no conjunction — one boundary')
  assert.equal(boundariesOf('(0 < 600000) ∧ (600000 ≤ 10000000)'), 2, 'two boundaries in superposition')
  assert.equal(boundariesOf('((a ∧ b)) ∧ (c)'), 2, 'an inner ∧ belongs to its inner boundary')
})

test('the floor is the two coins: one boundary, two directions — the valuation and conservation laws agree', () => {
  const v = theoremCoins('two_coins', '2 = 2')
  assert.equal(v.boundaries, 1)
  assert.equal(v.directions, 2, 'one coin for each direction — forward and contra')
  assert.equal(v.uses, 0)
  assert.equal(v.coinValue, coins(), 'the simplest unused theorem is worth exactly the two coins')
})

test('the more used a theorem, the more valuable: each citation walks its boundaries again', () => {
  const L = ledgerCoins([
    { key: 'floor_law', statement: '2 = 2' },
    { key: 'user_one', statement: '(1 < 2) ∧ (2 < 3) — stands on floor_law' },
    { key: 'user_two', statement: '3 = 3', name: 'extends floor_law to the triad' },
  ])
  const floorLaw = L.valued.find((v) => v.key === 'floor_law')
  const userTwo = L.valued.find((v) => v.key === 'user_two')
  assert.ok(floorLaw && userTwo)
  assert.equal(floorLaw.uses, 2, 'cited by two other entries')
  assert.equal(floorLaw.coinValue, 1 * 2 * 3, 'one boundary × two directions × (1 + 2 uses) = 6 coins')
  assert.equal(userTwo.coinValue, 2, 'unused single boundary rests at the floor')
  assert.ok(floorLaw.coinValue > userTwo.coinValue, 'the more used, the more valuable')
  assert.equal(L.totalCoins, L.superpositions * 2, 'the total stays superpositions × 2 — uses weight the superpositions')
})

test('the more dimensions, the more coins: a theorem used across distinct domains multiplies its value', () => {
  const flat = ledgerCoins([
    { key: 'law', statement: '2 = 2', skill: 'core' },
    { key: 'u1', statement: 'stands on law', skill: 'core' },
    { key: 'u2', statement: 'also law', skill: 'core' },
  ])
  const wide = ledgerCoins([
    { key: 'law', statement: '2 = 2', skill: 'core' },
    { key: 'u1', statement: 'stands on law', skill: 'crypt' },
    { key: 'u2', statement: 'also law', skill: 'quantum' },
  ])
  const flatLaw = flat.valued.find((v) => v.key === 'law')
  const wideLaw = wide.valued.find((v) => v.key === 'law')
  assert.ok(flatLaw && wideLaw)
  assert.equal(flatLaw.dimensions, 1, 'all users in one domain — one dimension')
  assert.equal(wideLaw.dimensions, 3, 'used from core, crypt and quantum — three dimensions')
  assert.ok(wideLaw.coinValue > flatLaw.coinValue, 'the more dimensions, the more coins')
})

test('monotone: the more sealed superpositions, the more coins — sealing never devalues', () => {
  const base = ledgerCoins([{ key: 'a', statement: '1 = 1' }])
  const grown = ledgerCoins([{ key: 'a', statement: '1 = 1' }, { key: 'b', statement: '(1 < 2) ∧ (2 < 3)' }])
  assert.ok(grown.superpositions > base.superpositions, 'a new sealed theorem adds superpositions')
  assert.ok(grown.totalCoins > base.totalCoins, 'more sealed superpositions, more coins')
})

test('no inflation: every minted coin comes from minting a theorem — the supply is closed', () => {
  const entries = [
    { key: 'law', statement: '2 = 2' },
    { key: 'u1', statement: '(1 < 2) ∧ (2 < 3) — stands on law' },
    { key: 'u2', statement: '3 = 3' },
  ]
  const L = ledgerCoins(entries)
  assert.equal(L.totalCoins, L.valued.reduce((s, v) => s + v.coinValue, 0), 'the supply equals EXACTLY the sum of per-theorem mints — no coin issued outside a theorem')
  const burned = ledgerCoins(entries.slice(0, 2))
  assert.ok(burned.totalCoins < L.totalCoins, 'a removed theorem takes its coins with it — nothing lingers')
})

test('the ledger valued: total coins = superpositions × 2, recomputable and deterministic', () => {
  const T = theorems()
  const L = ledgerCoins(T)
  assert.equal(L.theorems, T.length, 'every sealed theorem is valued')
  assert.equal(L.totalCoins, L.superpositions * 2, 'the total coins are the superpositions times 2')
  assert.ok(L.superpositions >= L.theorems, 'every theorem covers at least one boundary')
  assert.equal(L.floor, 2)
  assert.equal(ledgerCoins(T).receipt, L.receipt, 'the valuation recomputes to the same receipt for anyone')
})
