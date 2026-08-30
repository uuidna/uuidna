// quantum/context — THE WINDOW BALANCE, TESTED FROM THE THEOREMS, NO FIXTURES (the captain's rule): every
// number in these tests DERIVES from the sealed constants — the ring UUID_HEXBITS = 32, the spare law
// SAFE_HEXBITS = 13 (the same 13/32 that guards the uuid), the receipt price RECEIPT_TOKENS, and the two
// coins (theorem two_coins) shaping the categories. A window keeping exactly 13 rings of 32 free sits ON the
// law — balanced; a window keeping 12 — one hexbit under — must say FOLD: the boundary is the theorem's own
// edge, not a captured screenshot. Controls that can fail throughout; integer permille, no floats.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { balanceContext, RECEIPT_TOKENS } from './index.js'
import { SAFE_HEXBITS, UUID_HEXBITS, COINS } from './index.js'

const RING = 1000                                   // tokens per hexbit-ring: capacity = one full 32-ring
const CAPACITY = UUID_HEXBITS * RING                // 32 000 — the window AS the ring, scaled
const idiv = (a: number, b: number): number => (a - (a % b)) / b

test('keeping exactly SAFE_HEXBITS/32 free sits ON the spare law — balanced at the theorem\'s own edge', () => {
  const spent = (UUID_HEXBITS - SAFE_HEXBITS) * RING          // spend 19 rings, keep 13 — the law's boundary
  // the two coins shape the spend: the claim and its receipt, two categories (theorem two_coins)
  const half = idiv(spent, COINS)
  const b = balanceContext([{ name: 'claim', tokens: half }, { name: 'receipt', tokens: spent - half }], CAPACITY)
  assert.equal(b.free, SAFE_HEXBITS * RING)
  assert.equal(b.safeFloorPermille, idiv(SAFE_HEXBITS * 1000, UUID_HEXBITS), 'the floor IS 13/32 in permille')
  assert.ok(b.freePermille >= b.safeFloorPermille, 'exactly the law\'s spare holds the law')
  assert.equal(b.balanced, true)
  assert.match(b.verdict, /BALANCED/)
  assert.equal(b.hexbits.length, UUID_HEXBITS)
})

test('keeping 12 of 32 — ONE HEXBIT under the law — must say FOLD, heaviest named (the control that can fail)', () => {
  const spent = (UUID_HEXBITS - SAFE_HEXBITS + 1) * RING      // spend 20 rings, keep 12: one ring short
  const b = balanceContext([{ name: 'messages', tokens: spent - RING }, { name: 'tools', tokens: RING }], CAPACITY)
  assert.equal(b.freePermille, idiv((SAFE_HEXBITS - 1) * 1000, UUID_HEXBITS), '12/32 = 375‰ exactly')
  assert.ok(b.freePermille < b.safeFloorPermille)
  assert.equal(b.balanced, false)
  assert.match(b.verdict, /FOLD/)
  assert.match(b.verdict, /messages/, 'the heaviest category is named with its priced release')
  assert.equal(b.categories[0]!.foldCeiling, (spent - RING) - RECEIPT_TOKENS, 'the fold releases all but one receipt')
  assert.equal(b.categories[0]!.leverage, idiv(spent - RING, RECEIPT_TOKENS))
})

test('integer-exact, deterministic, change-sensitive — and degenerate inputs stay honest', () => {
  const w = [{ name: 'claim', tokens: 9 * RING }, { name: 'receipt', tokens: 9 * RING }]
  const a = balanceContext(w, CAPACITY)
  assert.deepEqual(a, balanceContext(w, CAPACITY))
  for (const r of a.categories) { assert.ok(Number.isInteger(r.permille)); assert.ok(Number.isInteger(r.leverage)) }
  const moved = balanceContext([{ name: 'claim', tokens: 9 * RING }, { name: 'receipt', tokens: 9 * RING + 1 }], CAPACITY)
  assert.notEqual(moved.receipt, a.receipt, 'one token moved, the receipt moved — the instrument can fail')
  assert.equal(balanceContext([], 0).spent, 0, 'an empty window never crashes')
  assert.equal(balanceContext([{ name: 'x', tokens: RECEIPT_TOKENS - 1 }], CAPACITY).categories[0]!.foldCeiling, 0,
    'a block cheaper than its receipt has nothing to release — folding it would COST tokens')
})
