import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { holds, evaluable, holdsKey, seedHolds, reDecide, holdsUncachedCount, evaluatorDigestOf } from './index.js'
import { theorems, isPagelessFile } from '../theorems/index.js'
import { ROOT } from '../boundary.js'

// ── ADDITION MUST PROMOTE LIKE MULTIPLICATION DOES (found 2026-09-06 by a missing falsifier leg).
//
// `pow` returns a BigInt above MAX_SAFE_INTEGER on purpose, so sealed mod-power filters cannot float-corrupt.
// `mulScalar` promoted to match; `+` and `-` did NOT — they went through `asNum`, which THROWS on a BigInt. So
// `2 ^ 32 * 2 ^ 96 == 2 ^ 128` decided and `2 ^ 32 + 2 ^ 96 != 2 ^ 128` came back UNDECIDED, and exactly one
// sealed theorem lost its falsifier leg to that asymmetry: address_and_payload_exchange_at_one_twenty_eight,
// whose subject IS the 32/96 split of a 128-bit address, so its statement cannot avoid these magnitudes.
//
// The evaluator was never WRONG — undecided is the honest answer for a grammar it cannot reach — but the
// grammar was reachable all along. These hold the promotion AND the arithmetic it must not change.
test('a sum that overflows a float still decides, and decides correctly', () => {
  assert.equal(holds('(2 ^ 32 + 2 ^ 96 != 2 ^ 128)'), true, 'the conjunct that cost a leg')
  assert.equal(holds('(2 ^ 32 + 2 ^ 96 == 2 ^ 128)'), false, 'and the FALSE variant is refused, not undecided')
  assert.equal(holds('(2 ^ 53 + 1 != 2 ^ 53)'), true, 'exactly where a float would have said they are equal')
})

test('subtraction promotes too, and Nat still truncates at BigInt width', () => {
  assert.equal(holds('(2 ^ 96 - 2 ^ 32 != 2 ^ 96)'), true)
  assert.equal(holds('(2 ^ 32 - 2 ^ 96 == 0)'), true, 'Nat subtraction truncates at zero — promotion may not change the arithmetic')
})

test('small arithmetic is untouched by the promotion — the control', () => {
  assert.equal(holds('(1 + 1 == 2)'), true)
  assert.equal(holds('(1 + 1 == 3)'), false)
  assert.equal(holds('(7 - 9 == 0)'), true, 'Nat truncation on plain numbers')
  assert.equal(holds('(2 + 2 = 4)'), true)
})

test('the falsifier ceiling is COMPLETE: every sealed statement carries a decidable denial', () => {
  const src = readFileSync(join(ROOT, 'src', 'falsifiers.test.ts'), 'utf8')
  const legless = theorems().filter((t) => {
    if (isPagelessFile(t.file)) return false
    if (src.includes(t.key)) return false
    let wing = ''
    try { wing = readFileSync(join(ROOT, 'lean', t.file), 'utf8') } catch { wing = '' }
    return evaluable(t.statement, wing)
  })
  assert.deepEqual(legless.map((t) => t.key), [],
    'a shortfall means the evaluator lost a grammar it once decided — regenerate with `npm run x -- gen-falsifiers` and, if it stays, the grammar is the gap')
})

// ── THE PERSISTED FALSIFIER VERDICTS: a receipt only if these hold, each with its control (folders law: one model, one test file) ──
// wing sources here are unique strings so no key collides with a real proposition in the shared memo
test('a seeded verdict is served without computing', () => {
  seedHolds({ [holdsKey('7 * 6 = 42', 'def cacheA := 1')]: true })
  const before = holdsUncachedCount()
  assert.equal(holds('7 * 6 = 42', 'def cacheA := 1'), true)
  assert.equal(holdsUncachedCount(), before, 'a cache hit must not compute')
})

test('a different wing digest MISSES and computes', () => {
  const before = holdsUncachedCount()
  assert.equal(holds('7 * 6 = 42', 'def cacheB := 2'), true)
  assert.equal(holdsUncachedCount(), before + 1, 'a moved wing is a different key')
})

// THE CONTROL — a poisoned entry is served by the memo and refused by the real decision.
test('reDecide bypasses the memo and refuses a poisoned seed', () => {
  seedHolds({ [holdsKey('2 + 2 = 5', 'def cacheC := 0')]: true })
  assert.equal(holds('2 + 2 = 5', 'def cacheC := 0'), true, 'the poison is served — which is why the sample exists')
  assert.notEqual(reDecide('2 + 2 = 5', 'def cacheC := 0'), true, 'and the real decision refuses it')
})

test('the evaluator digest moves when its source moves', () => {
  assert.notEqual(evaluatorDigestOf('rule a'), evaluatorDigestOf('rule b'))
  assert.equal(evaluatorDigestOf('same'), evaluatorDigestOf('same'))
})

test('seedHolds never overwrites a verdict already held', () => {
  assert.equal(holds('3 + 3 = 6', 'def cacheD := 0'), true)
  assert.equal(seedHolds({ [holdsKey('3 + 3 = 6', 'def cacheD := 0')]: false }), 0)
  assert.equal(holds('3 + 3 = 6', 'def cacheD := 0'), true, 'the computed verdict stands')
})
