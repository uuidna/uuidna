import { test } from 'node:test'
import assert from 'node:assert/strict'
import { shardsOf, parseShardOutput, isMergedLine, shardOfAddress } from './test-shards.js'
import { totalOf, receiptOf } from './scripts/test-receipt.js'
import { theorems } from './index.js'

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

test('the LEDGER slice is total, stable and balanced — the lattice decides it, not a hand-drawn range', () => {
  const all = theorems()
  for (const n of [2, 3, 4, 8]) {
    const counts = new Array<number>(n).fill(0)
    for (const t of all) {
      const i = shardOfAddress(t.address, n)
      assert.ok(Number.isInteger(i) && i >= 0 && i < n, `${t.key}: slice ${i} is outside 0..${n - 1}`)
      counts[i]! += 1
    }
    // TOTAL: every theorem landed in exactly one slice
    assert.equal(counts.reduce((a, b) => a + b, 0), all.length, `${n} slices must cover the ledger exactly once`)
    // BALANCED BY CONSTRUCTION, not by tuning: content-addresses spread, so no slice may carry half again its share
    const fair = all.length / n
    const heaviest = counts.reduce((a, b) => (b > a ? b : a), 0)
    assert.ok(heaviest <= fair * 1.5, `${n} slices: heaviest ${heaviest} against a fair share of ${fair.toFixed(0)}`)
  }
  // STABLE: the address decides, so the same theorem lands in the same slice every time and on every machine
  const t0 = all[0]!
  assert.equal(shardOfAddress(t0.address, 3), shardOfAddress(t0.address, 3))
  // CONTROL: a partition must actually partition — a different address may land elsewhere, and n must be a count
  assert.notEqual(new Set(all.slice(0, 500).map((t) => shardOfAddress(t.address, 4))).size, 1, 'a slice that swallows everything is not a partition')
  assert.throws(() => shardOfAddress(t0.address, 0), /not a partition/)
})
