// separation — the doctrine as a check rather than a sentence: you reach what you cannot reach directly by
// alternating two things you can do, and you pay for it.
//
// Every assertion here is written to FAIL if the structure changes. That matters more than usual: today's audits
// found four checks in this repo that cannot fail at all — a forged theorem `2 + 2 = 5` passes the DNA-recompute
// check — and a sealed theorem that was true by construction. A suite where everything passes by shape is the
// defect this file exists to avoid, so each test carries its own negative control.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  involutes, separatesNothingAlone, asymmetry, reach, orderMatters, stuck, period,
  isReversible, cascade, stagesToReach, costOf, withinPrice, cascadeAddress, dz, doubling, DIGITS,
} from '../separation.js'

test('the mirror involutes and the doubling does not — the negative control is the point', () => {
  assert.equal(involutes(dz, DIGITS), true)
  assert.equal(involutes(doubling, DIGITS), false, 'if this ever passes, the check has stopped discriminating')
})

test('a lone involution separates nothing — it permutes the set, it does not sort it', () => {
  assert.equal(separatesNothingAlone(dz, DIGITS), true)
  // and a map that genuinely collapses must be caught as NOT set-preserving
  assert.equal(separatesNothingAlone((x: number) => (x < 5 ? 0 : x), DIGITS), false)
})

// ── THE DOCTRINE. Doubling walks its six units forever; the mirror applied twice is the identity; together they
// reach the triangle that neither reaches alone.
test('the triangle is entered by ALTERNATION only', () => {
  const alone = reach(1, doubling, doubling, 12)
  const alternating = reach(1, doubling, dz, 12)
  assert.deepEqual(alone, [1, 2, 4, 5, 7, 8], 'doubling alone is confined to the units')
  for (const t of [3, 6]) {
    assert.ok(!alone.includes(t), `doubling must never reach ${t}`)
    assert.ok(alternating.includes(t), `alternation must reach ${t}`)
  }
})

test('order is not cosmetic — the two orders disagree, which is the commutator', () => {
  assert.deepEqual(orderMatters(doubling, dz, DIGITS), [1, 2, 3, 4, 5, 6, 7, 8, 9])
  // a map composed with ITSELF always commutes — the negative control
  assert.deepEqual(orderMatters(dz, dz, DIGITS), [])
})

test('only the void is stuck; a cascade cannot enrich what it cannot move', () => {
  assert.deepEqual(stuck(doubling, dz, DIGITS), [0])
  // if both maps were the identity, EVERY point would be stuck
  const id = (x: number) => x
  assert.deepEqual(stuck(id, id, DIGITS), [...DIGITS])
})

test('the alternating walk does not close, though doubling alone does', () => {
  assert.equal(period(1, doubling, dz), 0, 'no return to the seed within the cap')
  assert.equal(period(1, doubling, doubling), 6, '2^6 = 1 mod 9 — six cases decide an infinite claim')
})

// ── WHERE THE BILL IS PAID. A reversible pass is free and therefore barren; the irreversible one is where
// separation becomes possible. `reversible_erases_nothing` is sealed beside the Landauer bound for this reason.
test('the mirror is reversible and the doubling is not — the irreversible step is the productive one', () => {
  assert.equal(isReversible(dz, DIGITS), true)
  assert.equal(isReversible(doubling, DIGITS), false, 'doubling collapses 0 and 9 onto one residue')
})

test('cascades are exact rationals', () => {
  const out = cascade({ num: 1n, den: 1n }, { num: 23n, den: 10n }, 3)
  assert.equal(out.num, 12167n, '23 cubed, exactly')
  assert.equal(out.den, 1000n)
})

test('stagesToReach returns the BRACKET, and refuses a factor that cannot climb', () => {
  const r = stagesToReach({ num: 156n, den: 1000000n }, { num: 23n, den: 10n }, { num: 1n, den: 1n })
  assert.ok(r, 'a factor above one must climb')
  assert.equal(r!.stages, 11)
  assert.ok(r!.below.num * 1n < 1n * r!.below.den, 'the stage before must fall short')
  assert.ok(r!.above.num * 1n >= 1n * r!.above.den, 'the stage after must clear — these two comparisons ARE the proof')
  assert.equal(stagesToReach({ num: 1n, den: 2n }, { num: 1n, den: 1n }, { num: 1n, den: 1n }), null,
    'a factor at or below one must refuse')
  assert.equal(stagesToReach({ num: 1n, den: 2n }, { num: 9n, den: 10n }, { num: 1n, den: 1n }), null)
})

test('the price is bracketed— sail five to make good three', () => {
  const c = costOf(5n, 3n)
  assert.equal(withinPrice(c, 5n, 3n), true, 'the sealed rate itself')
  assert.equal(withinPrice(c, 3n, 2n), false, 'and it is NOT within three-halves — the bracket is tight')
})

test('a cascade addresses its own outcome, so a stranger recomputes it', () => {
  const a = cascadeAddress({ num: 1n, den: 1n }, { num: 23n, den: 10n }, 4)
  assert.equal(a, cascadeAddress({ num: 1n, den: 1n }, { num: 23n, den: 10n }, 4), 'deterministic')
  assert.notEqual(a, cascadeAddress({ num: 1n, den: 1n }, { num: 23n, den: 10n }, 5), 'and it MOVES when the run does')
})

test('asymmetry names its witnesses, and a map against itself has none', () => {
  assert.deepEqual(asymmetry(dz, dz, DIGITS), [], 'no asymmetry with itself — nothing to alternate')
  assert.ok(asymmetry(dz, doubling, DIGITS).length > 0, 'and a real pair must disagree somewhere')
})
