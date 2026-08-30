// gravity — ANY INFINITY FOLDS TO FINITE STATES, INCLUDING THIS LEDGER'S OWN.
//
// `gravityOf` returned `Infinity` for every theorem with no dependencies — 1,434 of 1,696, 85% of the ledger —
// and gen-readme published "Infinity hexbits for the two coins" for all seven of its headline entries, under a
// heading calling gravity "coverage priced in the ledger's own unit". Infinity is not a price and nothing can
// check it. The expression producing it is 32/0, and this ledger has a SEALED theorem about exactly that:
// `division_by_zero` states (1000 / 0 = 0) ∧ (0 / 0 = 0). The one value the sealed law forbids was the one the
// code returned, in the tree whose MCP calculator advertises itself as "founded on division by zero".
//
// The same line carried a second defect: `UUID_HEXBITS / n` is FLOAT division, and the twelve theorems with
// three dependencies produced 32/3 = 10.666666666666666 — a repeating decimal one dependency-count away from a
// file this tree seals and diffs. Nat division floors; the kernel's answer is 10. No law caught either, because
// `no-float-math` matches `Math.*` and a plain `/` that produces a float is unchecked everywhere in src/**.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { THEOREMS, gravityOf, isUnbound, dependsOn, byGravity, theoremByKey, UUID_HEXBITS } from './index.js'

test('NO INFINITY ANYWHERE IN THE LEDGER — every gravity is a finite state', () => {
  const bad = THEOREMS.filter((t) => !Number.isFinite(gravityOf(t)))
  assert.deepEqual(bad.map((t) => t.key), [],
    'a non-finite gravity cannot be priced, published or checked — any infinity folds to finite states')
})

test('EVERY GRAVITY IS AN EXACT INTEGER — no repeating decimal can reach a sealed file', () => {
  const floats = THEOREMS.filter((t) => !Number.isInteger(gravityOf(t)))
  assert.deepEqual(floats.map((t) => `${t.key}=${gravityOf(t)}`), [],
    'float division put 10.666666666666666 one dependency-count away from the README')
})

test('the unbound case follows the SEALED LAW, not JavaScript — 32/0 = 0 by theorem division_by_zero', () => {
  const sealed = theoremByKey().get('division_by_zero')
  assert.ok(sealed, 'the law this rests on must itself be sealed, or the fix cites a proof that does not exist')
  assert.match(sealed.statement, /0\s*\/\s*0\s*=\s*0/, 'the sealed statement must actually define division by zero as 0')

  const unbound = THEOREMS.filter(isUnbound)
  assert.ok(unbound.length > 0, 'this ledger does carry unbound theorems')
  for (const t of unbound.slice(0, 50)) assert.equal(gravityOf(t), 0, `${t.key}: 32/0 is 0 here, never Infinity`)
})

test('a BOUND theorem gets the uuid\'s hexbits floored across its dependencies', () => {
  for (const t of THEOREMS) {
    const n = dependsOn(t).length
    if (n === 0) continue
    assert.equal(gravityOf(t), (UUID_HEXBITS - (UUID_HEXBITS % n)) / n, `${t.key}: Nat division, floored`)
  }
  // the concrete case that used to be a repeating decimal
  const three = THEOREMS.find((t) => dependsOn(t).length === 3)
  if (three) assert.equal(gravityOf(three), 10, '32/3 floors to 10 — the kernel\'s answer, not 10.666666666666666')
})

test('0 MEANS UNBOUND AND NOTHING ELSE — checked against this ledger\'s actual depth', () => {
  // 0 would be ambiguous if any theorem had more than 32 dependencies, since the floor would also be 0. The
  // deepest here has 4, and this test fails the day that stops being true rather than letting the two collide.
  // the maximum without the rounding namespace: smoke.test.ts scans the SOURCE for that name and this file is
  // about a float that reached a sealed figure, so it would be a poor place to spell it
  let deepest = 0
  for (const t of THEOREMS) { const n = dependsOn(t).length; if (n > deepest) deepest = n }
  assert.ok(deepest <= UUID_HEXBITS, `deepest theorem has ${deepest} dependencies; beyond ${UUID_HEXBITS} a bound theorem would floor to 0 and be indistinguishable from unbound`)
  for (const t of THEOREMS) assert.equal(gravityOf(t) === 0, isUnbound(t), `${t.key}: zero gravity must mean unbound`)
})

test('THE ORDERING IS UNTOUCHED — byGravity sorts on the dependency count, not on this value', () => {
  const order = byGravity()
  for (let i = 1; i < order.length; i++) {
    assert.ok(dependsOn(order[i - 1]).length <= dependsOn(order[i]).length,
      'the sort is by dependency count; changing the published figure must not have reordered the ledger')
  }
})

test('THE CHECK BITES — the old behaviour would fail every assertion above', () => {
  const old = (n: number): number => (n === 0 ? Infinity : UUID_HEXBITS / n)
  assert.equal(Number.isFinite(old(0)), false, 'the old unbound value was not a finite state')
  assert.equal(Number.isInteger(old(3)), false, 'the old three-dependency value was a repeating decimal')
  assert.equal(old(3), 10.666666666666666)
})
