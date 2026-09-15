// handle-store-census — the pure census over leaves it is handed, and the host reader that answers UNMEASURED
// where there is no filesystem rather than a store of zero leaves.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ROOT, isUnmeasured } from './boundary.js'
import { censusOfLeaves, handleStoreCensus, storeLeaves } from './handle-store-census.js'

test('censusOfLeaves counts a sound leaf as sound and names a mismatched and an unreadable one', () => {
  const c = censusOfLeaves([
    { where: 'ab/cd/index.json', segs: ['ab', 'cd'], text: JSON.stringify({ handle: 'abcd', address: 'abcd1234-0000', kind: 'theorem', keys: ['k1', 'k2'] }) },
    { where: 'ab/ef/index.json', segs: ['ab', 'ef'], text: JSON.stringify({ handle: 'abff', address: 'ffff0000', keys: [] }) },
    { where: 'ab/zz/index.json', segs: ['ab', 'zz'], text: null },
  ])
  assert.equal(c.leaves, 2)
  assert.equal(c.keys, 2)
  assert.equal(c.treeLinks, 1)
  assert.equal(c.pairs, 1)
  assert.deepEqual(c.kinds, { theorem: 1, unnamed: 1 })
  assert.deepEqual(c.pathMismatch, ['ab/ef/index.json'])
  assert.deepEqual(c.prefixMismatch, ['ab/ef/index.json'])
  assert.deepEqual(c.unreadable, ['ab/zz/index.json'], 'an unreadable leaf is UNMEASURED, never counted sound')
})

test('with no filesystem the census answers UNMEASURED by name; on the host it measures the store', () => {
  const edge = handleStoreCensus(ROOT, null)
  assert.ok(isUnmeasured(edge))
  assert.match(edge.unmeasured, /handle store census — UNMEASURED/)
  assert.ok(isUnmeasured(storeLeaves(ROOT, null)))
  const host = handleStoreCensus(ROOT)
  if (isUnmeasured(host)) assert.fail(host.unmeasured)
  assert.ok(host.leaves > 0, 'the live store holds leaves')
})
