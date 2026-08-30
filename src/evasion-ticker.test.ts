// evasion-ticker — the catalogue held to its own law: every convicting seal EXISTS in the ledger (an entry
// citing an unsealed key fails — the catalogue cannot evade), the board folds deterministically and order-blind,
// one moved figure moves the address, and the control proves the seal-check can fail.
import { test } from 'node:test'
import assert from 'node:assert'
import { TRICKS, tickerBoard } from './quantum/apps/categories/coding/evasion-ticker.js'
import { LEAN_LEDGER } from './theorems/generated.js'

test('every convicting seal in the catalogue is sealed in the ledger — the catalogue cannot evade', () => {
  const sealed = new Set(LEAN_LEDGER.map((t) => t.key))
  for (const t of TRICKS) assert.ok(sealed.has(t.seal), `"${t.trick}" cites ${t.seal} which is NOT sealed`)
})

test('CONTROL: the seal-check can fail — a fabricated entry must be caught', () => {
  const sealed = new Set(LEAN_LEDGER.map((t) => t.key))
  assert.equal(sealed.has('this_convicting_seal_was_never_minted'), false, 'the control key must not exist')
})

test('the board folds order-blind and moves with one figure', () => {
  const a = tickerBoard([{ name: 'x', value: 1, of: null, unit: 'u' }, { name: 'y', value: 2, of: 10, unit: 'v' }])
  const b = tickerBoard([{ name: 'y', value: 2, of: 10, unit: 'v' }, { name: 'x', value: 1, of: null, unit: 'u' }])
  assert.equal(a.fold, b.fold, 'the tape reads the same in any order')
  const c = tickerBoard([{ name: 'x', value: 2, of: null, unit: 'u' }, { name: 'y', value: 2, of: 10, unit: 'v' }])
  assert.notEqual(c.fold, a.fold, 'one moved figure moves the address')
  assert.equal(a.states.length, 32, 'the board sings on the full lattice width')
})

test('every trick carries all four faces — no half-taught lesson enters', () => {
  for (const t of TRICKS) {
    assert.ok(t.trick.length > 0 && t.finder.length > 0 && t.seal.length > 0 && t.lesson.length > 10,
      `"${t.trick}" must name its finder, its seal, and a lesson worth keeping`)
  }
})
