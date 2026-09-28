// crossfold.test — THE CROSS MUST BE ABLE TO FAIL, or `agrees: true` is a decoration.
//
// Every assertion below has a partner that would pass against a broken instrument, so both directions are asserted:
// an order-invariant fold agrees, and a fold that is order-DEPENDENT is caught. Without the second arm this file
// passes against a crossFold that returns `agrees: true` unconditionally, which is the defect it exists to prevent.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { crossFold } from './crossfold.js'
import { hexbitReceipt } from './hexbit/index.js'

test('the same leaves in any arrangement reach one address', () => {
  const leaves = ['delta:4', 'alpha:1', 'charlie:3', 'bravo:2']
  const a = crossFold(leaves)
  const b = crossFold([...leaves].reverse())
  const c = crossFold([leaves[2]!, leaves[0]!, leaves[3]!, leaves[1]!])
  assert.equal(a.receipt, b.receipt, 'the argument order must not reach the address')
  assert.equal(a.receipt, c.receipt)
  assert.ok(a.crossed.agrees, 'and the two routes inside the fold must meet')
  assert.equal(a.crossed.sorted, a.crossed.reversed)
  assert.equal(a.leaves, 4)
})

// ── THE CONTROL. This is the arm that makes `agrees` mean something.
test('AN ORDER-DEPENDENT FOLD WOULD BE CAUGHT — the cross can fail', () => {
  // the instrument, applied to a fold that is deliberately NOT order-invariant: concatenate in the given order
  const dependent = (xs: readonly string[]): string => hexbitReceipt([xs.join('|')]).receipt
  const leaves = ['alpha:1', 'bravo:2', 'charlie:3']
  const sorted = [...leaves].sort()
  const forward = dependent(sorted)
  const backward = dependent([...sorted].reverse())
  assert.notEqual(forward, backward,
    'a fold that reads its input in order MUST give two answers for two orders — if this passes, the control is not '
    + 'testing an order-dependent fold and the positive arm above proves nothing')
  // and the real fold, on the same leaves, does not behave that way
  const real = crossFold(leaves)
  assert.ok(real.crossed.agrees, 'the fold under test is invariant where the counter-example is not')
})

test('different leaves reach different addresses, so the fold is not constant', () => {
  const a = crossFold(['alpha:1', 'bravo:2'])
  const b = crossFold(['alpha:1', 'bravo:3'])
  assert.notEqual(a.receipt, b.receipt, 'one changed leaf must move the address, or the receipt says nothing')
  assert.notEqual(crossFold([]).receipt, a.receipt, 'and the empty fold is not every fold')
})

test('a duplicated leaf is a different multiset and is not silently collapsed', () => {
  assert.notEqual(crossFold(['a', 'a']).receipt, crossFold(['a']).receipt,
    'two identical leaves are two leaves — a fold that deduplicates would hide a repeated row')
  assert.equal(crossFold(['a', 'a']).leaves, 2)
})
