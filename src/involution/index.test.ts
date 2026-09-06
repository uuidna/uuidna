import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { holds } from './index.js'
import { theorems } from '../theorems/index.js'
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
  const legless = theorems().filter((t) => !readFileSync(join(ROOT, 'src', 'falsifiers.test.ts'), 'utf8').includes(t.key))
  assert.deepEqual(legless.map((t) => t.key), [],
    'a shortfall means the evaluator lost a grammar it once decided — regenerate with `npm run x -- gen-falsifiers` and, if it stays, the grammar is the gap')
})
