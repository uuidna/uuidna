// reactor tests — the involutionary refusion reactor. Snapshot fuses sealed theorems across domains to one
// recomputable superposition uuid (first segment the handle); a changed set moves it, so drift is refused. The
// reactor recycles: nothing refused is discarded — a REFUTED or UNVERIFIED claim returns with its develop plan.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { snapshot, reactor, theorems } from '../index.js'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

test('snapshot fuses sealed theorems across domains to one recomputable superposition', () => {
  const keys = ['diamond_involution', 'week_is_z7', 'true_colour_is_24_bit', 'seven_bands_in_order']
  const s = snapshot(keys)
  assert.equal(s.members.length, 4)
  assert.match(s.superposition, UUID)
  assert.equal(s.handle, s.superposition.slice(0, 8), 'the first part IS the identity handle')
  // order-invariant — the same set, any order, recomputes the same superposition (no drift)
  assert.equal(snapshot([...keys].reverse()).superposition, s.superposition)
  // a changed member MOVES the uuid — drift is caught, not hidden (z9add_0_0 is a real sealed key, so it folds in)
  assert.notEqual(snapshot([...keys, 'z9add_0_0']).superposition, s.superposition)
  assert.ok(s.viewpoints.length >= 4, 'each domain and skill the set spans is a folded point of view')
})

test('snapshot NAMES an unknown key rather than folding it — drift refused, not silent', () => {
  const s = snapshot(['diamond_involution', 'not_a_real_theorem'])
  assert.deepEqual(s.unknown, ['not_a_real_theorem'])
  assert.equal(s.members.length, 1)
})

test('the reactor recycles — a refused claim returns with its develop plan, never discarded', () => {
  const r = reactor([
    'the birth number governs destiny',                    // cites no proof → UNVERIFIED
    'proven in theorem riemann_is_solved',                 // fabricated citation → REFUTED
    'two units multiply to a unit',                        // with a decidable test → SEALED
  ], [undefined, undefined, () => (2 * 5) % 9 === 1])
  assert.equal(r.sealed.length, 1)
  assert.equal(r.recycled.length, 2)
  for (const cell of r.recycled) assert.ok(cell.develop.length >= 1, 'every recycled cell carries a develop plan (new aspects)')
  assert.match(r.superposition, UUID)
  assert.equal(r.handle, r.superposition.slice(0, 8))
  // deterministic — the same claims recompute the same run
  assert.equal(reactor(['the birth number governs destiny']).superposition, reactor(['the birth number governs destiny']).superposition)
})
