import { test } from 'node:test'
import assert from 'node:assert/strict'
import { holds } from './index.js'

// The independent evaluator reads Lean's Int arithmetic and the families' and asked wing's helpers by their plain
// meaning. Each case pairs a statement the kernel would prove with a control it would refute, so a helper that read
// everything as true, or a division that truncated, fails here by name.
const FAMILY_DEFS = 'def fchoose (n : Nat) : Nat → Nat\ndef ffact : Nat → Nat\ndef fperm (n : Nat) : Nat → Nat\ndef fgcd : Nat → Nat → Nat → Nat\ndef flog (b : Nat) : Nat → Nat → Nat\ndef fclog (b n : Nat) : Nat := 0\ndef fsqrt (n : Nat) : Nat := 0\ndef fmax (a b : Int) : Int := 0\ndef fmin (a b : Int) : Int := 0\ndef powmod (b e m : Nat) : Nat := 0'

test('Int division is Euclidean, as Lean divides: −100 / 12 = −9 and −4000 / 60 = −67', () => {
  assert.equal(holds('((-100 : Int) / (12 : Int)) = (-9 : Int)'), true)
  assert.equal(holds('((-4000 : Int) / (60 : Int)) = (-67 : Int)'), true)
  assert.equal(holds('((-100 : Int) / (12 : Int)) = (-8 : Int)'), false, 'control: truncation gives −8, which Lean refutes')
  assert.equal(holds('(100 / 12) = 8'), true, 'Nat division floors')
})

test('the families helpers read by their meaning, each with a control', () => {
  const cases: [string, boolean][] = [
    ['(Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)', true],
    ['(Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (67 : Int)', false],
    ['(Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)', true],
    ['(Int.ofNat (fperm (Int.toNat (5 : Int)) (Int.toNat (2 : Int)))) = (20 : Int)', true],
    ['(Int.ofNat (fgcd 100 (Int.toNat (4 : Int)) (Int.toNat (6 : Int)))) = (2 : Int)', true],
    ['(Int.ofNat (fgcd 100 (Int.toNat (4 : Int)) (Int.toNat (6 : Int)))) = (4 : Int)', false],
    ['(Int.ofNat (flog 10 64 (Int.toNat (1000 : Int)))) = (3 : Int)', true],
    ['(Int.ofNat (fclog 2 (Int.toNat (9 : Int)))) = (4 : Int)', true],
    ['(Int.ofNat (fsqrt (Int.toNat (99 : Int)))) = (9 : Int)', true],
    ['(fmax (-3 : Int) (2 : Int)) = (2 : Int)', true],
    ['(fmin (-3 : Int) (2 : Int)) = (-3 : Int)', true],
    ['(Int.toNat (-5 : Int)) = 0', true],
    ['(powmod 2 340 341) = 1', true],
    ['(powmod 3 340 341) = 1', false],
  ]
  for (const [s, want] of cases) assert.equal(holds(s, FAMILY_DEFS), want, s)
})
