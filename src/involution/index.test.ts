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
    // ONE RULE, THE GENERATOR'S: gen-falsifiers grants a leg only when the statement is evaluable AND holds decides it
    // true; an evaluable shape that holds leaves undecided — a universal over every n, a wing's own recursion — gets
    // no leg there, so counting it as legless here was two surfaces disagreeing about what "decidable" means.
    return evaluable(t.statement, wing) && holds(t.statement, wing) === true
  })
  assert.deepEqual(legless.map((t) => t.key), [],
    'a shortfall means the evaluator lost a grammar it once decided — regenerate with `npm run x -- gen-falsifiers` and, if it stays, the grammar is the gap')
})

// ── THE GRAMMAR THE INVOLUTION WINGS STATE THEIR LEADS IN: each form decides TRUE and FALSE, so no reading passes by accepting ──
test('list membership decides both ways, and `∉` is its negation', () => {
  assert.equal(holds('"a" ∈ ["b", "a"]'), true)
  assert.equal(holds('"c" ∈ ["b", "a"]'), false)
  assert.equal(holds('"c" ∉ ["b", "a"]'), true)
  assert.equal(holds('"a" ∉ ["b", "a"]'), false)
})

test('divisibility decides both ways, with 0 ∣ n exactly when n = 0', () => {
  assert.equal(holds('6 ∣ 12'), true)
  assert.equal(holds('5 ∣ 12'), false)
  assert.equal(holds('0 ∣ 0'), true)
  assert.equal(holds('0 ∣ 5'), false)
  assert.equal(holds('¬ (42 ∣ 432)'), true)
})

test('the bounded binder `∀ x ∈ xs, P` walks its list, and a universal over Nat stays undecided', () => {
  assert.equal(holds('∀ g ∈ [1, 2], g < 3'), true)
  assert.equal(holds('∀ g ∈ [1, 3], g < 3'), false)
  assert.equal(holds('∀ d n : Nat, d * n = n * d'), null, 'no window stands in for every Nat')
})

test('a named function passed as an argument is not applied to the arguments after it', () => {
  const wing = 'def both (a b : Nat) : Nat := a + b'
  assert.equal(holds('List.zipWith both [1, 2] [3, 4] = [4, 6]', wing), true)
  assert.equal(holds('List.zipWith both [1, 2] [3, 4] = [4, 7]', wing), false)
})

test('a def the evaluator cannot read leaves undecided only the statements that name it', () => {
  const wing = 'def good : Nat := 7\ndef bad : Nat := Classical.choice h'
  assert.equal(holds('good = 7', wing), true, 'a neighbour of an unreadable def still decides')
  assert.equal(holds('good = 8', wing), false)
  assert.equal(holds('bad = 7', wing), null, 'an unreadable def is never read as a value')
  assert.equal(holds('¬ (bad = 7)', wing), null)
})

test('the involution wings decide on their own source, and a perturbed source moves the verdict', () => {
  const wing = (f: string): string => readFileSync(join(ROOT, 'lean', f), 'utf8')
  const e = wing('Involutione92de628.lean')
  assert.equal(holds('¬ lead_e92de628', e), true)
  assert.equal(holds('¬ lead_e92de628', e.replace('def historicalWings : Nat := 72', 'def historicalWings : Nat := 84')), false, '42 divides 6 × 84')
  const b = wing('Involutionb13fd37a.lean')
  assert.equal(holds('"gen-prose-evidence.js" ∈ reconcileRuns', b), true)
  assert.equal(holds('"gen-prose-evidence.js" ∈ reconcileRuns', b.replace(/"gen-prose-evidence\.js", /g, '')), false)
  const s = wing('Involution2d552f1f.lean')
  assert.equal(holds('fallingOf (arow 1 3) = 4 ∧ fallingOf ((arow 1 3).map dz) = 5', s), true)
  assert.equal(holds('fallingOf (arow 1 3) = 5', s), false)
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
