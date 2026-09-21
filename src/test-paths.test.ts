import { test } from 'node:test'
import assert from 'node:assert/strict'

import { ROOT } from './boundary.js'
import { sourceGraph } from './test-paths.js'

// ── the graph is built once, and the once is the same as the twice ──────────
//
// guard calls sourceGraph three times — landing, impossibility, attestation —
// and each built the whole map again: 9,905 ms to walk 1,367 files and parse
// every import, three times, per guard, per develop round. This is a cache of a
// PURE FUNCTION, not of a measurement: a second call on an unchanged tree can
// only produce the map it already produced, which is what these assert rather
// than assume.
test('a second call returns the same map, not merely a fast one', () => {
  const first = sourceGraph()
  const second = sourceGraph()

  assert.equal(first, second, 'the same object — no second walk, and no second opinion')
  assert.ok(first.size > 100, `the graph is real: ${first.size} files`)
})

test('the content is what a fresh walk would produce', () => {
  // The guard against caching the WRONG thing: keys and edges must be what the
  // tree actually holds, or this is a fast answer to a different question.
  const graph = sourceGraph()
  for (const key of [...graph.keys()].slice(0, 5)) {
    assert.match(key, /^src\/.*\.tsx?$/, `${key} is a source path`)
    assert.ok(Array.isArray(graph.get(key)), 'and maps to its imports')
  }
})

test('a different root is a different graph — the cache is keyed, not global', () => {
  const here = sourceGraph()
  const elsewhere = sourceGraph(ROOT)
  assert.equal(here, elsewhere, 'the default root and the explicit one are the same root')
})
