import { test } from 'node:test'
import assert from 'node:assert/strict'
import { shardsOf, parseShardOutput, isMergedLine } from './test-shards.js'
import { totalOf, receiptOf } from './scripts/test-receipt.js'

test('every file lands in exactly one shard, and the heaviest are spread first', () => {
  const files = ['a', 'b', 'c', 'd', 'e']
  const shards = shardsOf(files, { a: 10, b: 9, c: 1, d: 1, e: 1 }, 2)
  assert.deepEqual(shards.flat().sort(), files, 'no file lost, none run twice')
  assert.equal(shards.length, 2)
  assert.ok(!shards.some((s) => s.includes('a') && s.includes('b')), 'the two heaviest never share a shard')
  // CONTROL: more shards than files drops the empty ones; a nonsense count is one shard, never zero
  assert.equal(shardsOf(['x'], {}, 8).length, 1)
  assert.deepEqual(shardsOf(['x', 'y'], {}, 0), [['x', 'y']])
})

test('the merged root is the single-run root, whatever the partition', () => {
  const leaves: [string, string, number][] = [['f1.test.js', receiptOf(['t1']), 1], ['f2.test.js', receiptOf(['t2', 't3']), 2], ['f3.test.js', receiptOf(['t4']), 1]]
  const asOne = totalOf(leaves)
  const split = [leaves.slice(2), leaves.slice(0, 2)].flat()
  assert.equal(totalOf([...split].sort(([a], [b]) => a.localeCompare(b))), asOne)
  // CONTROL: a lost file moves the root
  assert.notEqual(totalOf(leaves.slice(1)), asOne)
})

test('a shard\'s printed receipt parses back to its leaves, peak and counts', () => {
  const out = parseShardOutput([
    '✗ something failed', '· 0a1b2c3d     3      1.5s  x.test.js', '· deadbeef    12     20.0s  y.test.js',
    '⏱ slowest superpositions: y.test.js 20.0s', '⚖ peak 3145728 bytes (maxRSS of this runner)', '✗ tests — 1 of 16 FAILED, 15 pass, receipt 12345678',
  ].join('\n'))
  assert.deepEqual(out.leaves, [['x.test.js', '0a1b2c3d', 3, 1.5], ['y.test.js', 'deadbeef', 12, 20]])
  assert.equal(out.peakBytes, 3145728)
  assert.deepEqual([out.passed, out.failed], [15, 1])
  assert.ok(isMergedLine('· 0a1b2c3d     3      1.5s  x.test.js') && !isMergedLine('✗ something failed'), 'failures are forwarded live, never merged away')
})
