// reactor tests — the involutionary refusion reactor. Snapshot fuses sealed theorems across domains to one
// recomputable superposition uuid (first segment the handle); a changed set moves it, so drift is refused. The
// reactor recycles: nothing refused is discarded — an UNVERIFIED claim (cites no proof, or a fabricated one)
// returns with its develop plan.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { snapshot, reactor, theorems } from './index.js'
import { UUID } from './test-api.js'
import { handleOf } from './index.js'   // THE one derivation — see handle.ts

test('snapshot fuses sealed theorems across domains to one recomputable superposition', () => {
  const keys = ['diamond_involution', 'week_is_z7', 'true_colour_is_24_bit', 'seven_bands_in_order']
  const s = snapshot(keys)
  assert.equal(s.members.length, 4)
  assert.match(s.superposition, UUID)
  assert.equal(s.handle, handleOf(s.superposition), 'the first part IS the identity handle')
  // order-invariant — the same set, any order, recomputes the same superposition (no drift)
  assert.equal(snapshot([...keys].reverse()).superposition, s.superposition)
  // a changed member MOVES the uuid — drift is caught
  assert.notEqual(snapshot([...keys, 'z9add_0_0']).superposition, s.superposition)
  assert.ok(s.viewpoints.length >= 4, 'each domain and skill the set spans is a folded point of view')
})

test('snapshot NAMES an unknown key rather than folding it — drift refused', () => {
  const s = snapshot(['diamond_involution', 'not_a_real_theorem'])
  assert.deepEqual(s.unknown, ['not_a_real_theorem'])
  assert.equal(s.members.length, 1)
})

test('the reactor recycles — an unverified claim returns with its develop plan', () => {
  const r = reactor([
    'the birth number governs destiny',                    // cites no proof → UNVERIFIED
    'proven in theorem riemann_is_solved',                 // cites a proof not in the ledger → UNVERIFIED
    'two units multiply to a unit',                        // with a decidable test → VERIFIED
  ], [undefined, undefined, () => (2 * 5) % 9 === 1])
  assert.equal(r.verified.length, 1)
  assert.equal(r.unverified.length, 2)
  for (const cell of r.unverified) assert.ok(cell.develop.length >= 1, 'every unverified cell carries a develop plan (new aspects)')
  assert.match(r.superposition, UUID)
  assert.equal(r.handle, handleOf(r.superposition))
  // deterministic — the same claims recompute the same run
  assert.equal(reactor(['the birth number governs destiny']).superposition, reactor(['the birth number governs destiny']).superposition)
})
