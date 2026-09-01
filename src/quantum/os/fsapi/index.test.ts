import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fsSeal, fsVerify, fsApi, fsCensus } from './index.js'

const enc = (s: string): Uint8Array => new TextEncoder().encode(s)
const TREE = [
  { path: 'a.txt', bytes: enc('alpha') },
  { path: 'b.txt', bytes: enc('beta') },
  { path: 'c.txt', bytes: enc('gamma') },
]

test('the port is provenance and the census counts it', () => {
  const c = fsCensus()
  assert.equal(c.domain, 'filesystem')
  assert.ok(c.packages > 0 && c.origins > 0)
})

test('a sealed tree verifies against itself, and the root recomputes', () => {
  const sealed = fsSeal(TREE)
  assert.equal(fsVerify(TREE, sealed).ok, true)
  assert.equal(fsSeal(TREE).root, sealed.root, 'same bytes, same order, same root — or the seal is not a seal')
})

test('a failure NAMES the file rather than reporting that something moved', () => {
  const sealed = fsSeal(TREE)
  const r = fsVerify([{ path: 'a.txt', bytes: enc('ALPHA') }, TREE[1]!, TREE[2]!], sealed)
  assert.equal(r.ok, false)
  assert.ok(!r.ok && r.changed.includes('a.txt'), 'a single digest would say "something moved" and hide which')
})

test('added and removed are distinguishable, not one mismatch', () => {
  const sealed = fsSeal(TREE)
  const added = fsVerify([...TREE, { path: 'd.txt', bytes: enc('delta') }], sealed)
  assert.ok(!added.ok && added.added.includes('d.txt') && added.removed.length === 0)
  const removed = fsVerify([TREE[0]!, TREE[2]!], sealed)
  assert.ok(!removed.ok && removed.removed.includes('b.txt') && removed.added.length === 0)
})

test('REORDERING is caught — a provenance is a sequence, not a set', () => {
  // THE REGRESSION THIS FILE EXISTS FOR. The first implementation folded the addresses with merkleGravity, which
  // is ORDER-INVARIANT by design, so three files shuffled verified as ok:true while the comment above the fold
  // claimed reordering was caught. Position is bound into each leaf now, and this is the control that says so.
  const sealed = fsSeal(TREE)
  const r = fsVerify([TREE[2]!, TREE[1]!, TREE[0]!], sealed)
  assert.equal(r.ok, false, 'same names and same digests in a different order must NOT verify')
  assert.ok(!r.ok && r.reordered, 'and it must be diagnosed as reordering: nothing changed, added or removed')
  assert.ok(!r.ok && r.changed.length === 0 && r.added.length === 0 && r.removed.length === 0)
})

test('the API states what it is for, without pretending it is limited', () => {
  const a = fsApi()
  assert.match(a.honest, /Integrity, never content truth|are these the bytes that were sealed/)
})
