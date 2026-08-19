// handle-chunks — gen-handle-chunks.ts stores the reusable ALGEBRA — one file per DISTINCT statement — not the theorem
// record, of which there are more (a statement sealed in two wings is one fact with two names). Tested here for the three things that matter: every key resolves to exactly one chunk, no chunk
// is lossy (the has_and_belongs_to_many join holds both ways), and the identity is stable/collision-free.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems } from '../index.js'
import { buildChunks, chunkHandleOf } from '../scripts/gen-handle-chunks.js'
import { allStatementChunks, statementCensus } from '../editorial.js'

test('handle-chunks: chunk count matches the audited distinct-statement figure exactly', () => {
  const chunks = buildChunks()
  const census = statementCensus()
  assert.equal(chunks.length, census.distinct, 'a chunk per distinct statement — no more, no fewer')
  assert.equal(chunks.length, allStatementChunks().length)
})

test('handle-chunks: every theorem key resolves to exactly one chunk, and that chunk lists the key back', () => {
  const chunks = buildChunks()
  const byKey = new Map<string, string>()
  for (const c of chunks) for (const k of c.keys) byKey.set(k, c.handle)
  for (const t of theorems()) {
    const handle = byKey.get(t.key)
    assert.ok(handle, `${t.key} is not claimed by any chunk`)
    const chunk = chunks.find((c) => c.handle === handle)!
    assert.ok(chunk.keys.includes(t.key), 'the join must hold from both sides')
  }
  // no key claimed twice by different chunks
  const totalKeyRefs = chunks.reduce((n, c) => n + c.keys.length, 0)
  assert.equal(totalKeyRefs, theorems().length, 'every key cited exactly once across all chunks')
})

test('handle-chunks: a reused statement (z9mul_1_1 / mul9_1_1) is ONE chunk citing both keys', () => {
  const chunks = buildChunks()
  const shared = chunks.find((c) => c.keys.includes('mul9_1_1') && c.keys.includes('z9mul_1_1'))
  assert.ok(shared, 'mul9_1_1 and z9mul_1_1 must land in the same chunk — same fact, two names')
  assert.equal(shared!.tactic, 'decide')
})

test('handle-chunks: handles are collision-free and deterministic across two independent builds', () => {
  const a = buildChunks()
  const b = buildChunks()
  assert.deepEqual(a, b)
  const handles = a.map((c) => c.handle)
  assert.equal(new Set(handles).size, handles.length, 'chunk handle collision — the pigeonhole bound was hit')
})

test('handle-chunks: chunkHandleOf agrees with the bulk build for a sampled key', () => {
  const t = theorems()[0]
  const bulk = buildChunks().find((c) => c.keys.includes(t.key))!.handle
  assert.equal(chunkHandleOf(t.key), bulk)
  assert.equal(chunkHandleOf('this-key-does-not-exist'), undefined)
})
