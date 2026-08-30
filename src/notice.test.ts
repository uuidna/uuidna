// notice — UNVERIFIED made a pointer, held to its law: an open verdict carries magnets, a verified one carries
// none (nothing to point at), the magnets really are involution-shaped, a claim the ledger has never met gets an
// HONEST EMPTY list rather than invented directions, and the control proves the notice can be silent.
import { test } from 'node:test'
import assert from 'node:assert'
import { noticeOf } from './quantum/apps/categories/coding/index.js'
import { isInvolutionShaped } from './school/index.js'
import { THEOREMS } from './index.js'

test('an open verdict becomes a notice that points at self-inverse structure', () => {
  const n = noticeOf('the reflection applied twice returns and every complement pairs to nine')
  assert.equal(n.verdict, 'UNVERIFIED')
  assert.equal(n.notice, true)
  assert.ok(n.magnets.length > 0, 'a self-inverse claim must feel the census magnets')
  for (const m of n.magnets) {
    const t = THEOREMS.find((x: { key: string }) => x.key === m.key)!
    assert.ok(isInvolutionShaped(t), `${m.key} must be involution-shaped to be a magnet`)
  }
  assert.ok(n.where.includes(n.magnets[0]!.key), 'the sentence names where to look')
})

test('a verified claim needs no direction — the notice stays silent', () => {
  const n = noticeOf('the bar is four thousand and thirty-two samples', () => 16 * 252 === 4032)
  assert.equal(n.verdict, 'VERIFIED')
  assert.equal(n.notice, false)
  assert.deepEqual(n.magnets, [], 'a standing claim is not handed a research direction it does not need')
})

test('CONTROL — words the ledger has never sealed get an honest empty list, never invented pointers', () => {
  const n = noticeOf('zanzibar cormorant paperwork remains unresolved')
  assert.equal(n.notice, true)
  assert.deepEqual(n.magnets, [])
  assert.ok(n.where.includes('yours to seal'), 'the honest answer is an open first magnet, not a fabricated one')
})

test('the notice never invents a verdict — it only adds direction to the one the trial gave', () => {
  const bare = noticeOf('this claim brings nothing')
  assert.equal(bare.verdict, 'UNVERIFIED')
  assert.ok(bare.receipt.length > 0, 'the receipt is the trial’s own, carried through unchanged')
})
