// uuidna_git and uuidna_payload — the two doors built on 2026-09-28 that shipped with no dedicated test.
//
// tool-exercise names them: a NEW aggregate-only tool fails that ratchet by name, and the baseline "MAY ONLY SHRINK",
// so a declared debt is the wrong answer for a door that can simply be exercised. Both can be, read-only.
//
// THE CONTROLS ARE THE POINT, because a test that only calls a door and finds an object proves the name dispatches and
// nothing else. uuidna_git SHELLS OUT — it is one of the three tools the schema gate scans for exactly that — so the
// assertions that matter are the refusals: an unknown `ask` is refused by name, and `commit` with an empty pathspec is
// refused WITHOUT committing, which is checked by reading HEAD on both sides of the call rather than by trusting it.
//
// NO VALUE IS PINNED. `ahead`, `dirty` and the log move with every commit on a shared tree, so the invariants are the
// shapes and the bounds: a head is forty hex, a count is a non-negative integer, a log honours its own limit. A test
// asserting today's ahead-count would fail on the next landing and teach the next hand to delete it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import { callTool } from './mcp.js'

const head = (): string => execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim()
const asObj = (r: unknown): Record<string, unknown> =>
  (typeof r === 'string' ? JSON.parse(r) : r) as Record<string, unknown>

test('uuidna_git ask:state reports the repository, shaped and bounded rather than pinned', async () => {
  const s = asObj(await callTool('uuidna_git', { ask: 'state' }))
  assert.match(String(s.head), /^[0-9a-f]{40}$/, 'a head is forty hex characters')
  assert.equal(typeof s.branch, 'string')
  for (const k of ['ahead', 'behind']) {
    assert.equal(typeof s[k], 'number', `${k} is a number`)
    assert.ok(Number.isInteger(s[k]) && (s[k] as number) >= 0, `${k} is a non-negative integer`)
  }
  assert.ok(Array.isArray(s.dirty), 'the porcelain set is a list, empty or not')
})

// A REFUSAL IS A VALUE HERE, NOT AN EXCEPTION, and the first draft of this test asserted the wrong contract. The door
// answers {refused:true, why} — the better design and the tree's own three-state discipline: a refusal that arrives as
// data can be read, folded and served, where a thrown error is a fact about the caller's stack.
test('uuidna_git refuses an ask it does not serve, and names what it serves', async () => {
  const r = asObj(await callTool('uuidna_git', { ask: 'rm-rf' }))
  assert.equal(r.refused, true, 'an unknown ask is refused')
  assert.match(String(r.why), /rm-rf/, 'the refusal quotes what was asked')
  for (const served of ['state', 'log', 'holder', 'commit']) {
    assert.match(String(r.why), new RegExp(served), 'the refusal names ' + served + ', so a caller learns the surface')
  }
})

// THE CONTROL THAT MAKES THE REST MEAN ANYTHING: the refusal must not have committed. Asked of git on both sides.
test('uuidna_git refuses commit with an empty pathspec, and HEAD does not move', async () => {
  const before = head()
  const r = asObj(await callTool('uuidna_git', { ask: 'commit', paths: [], message: 'must not land' }))
  assert.equal(r.refused, true, 'an empty pathspec is refused')
  assert.match(String(r.why), /pathspec/, 'the refusal says what was missing')
  // THE CONTROL: asked of git on both sides, because a door that refuses in its ANSWER and commits anyway would pass
  // every assertion above. It is the one thing here that cannot be checked by reading the return value.
  assert.equal(head(), before, 'a refused commit must leave HEAD exactly where it was')
})

test('uuidna_git log honours its own limit', async () => {
  const l = asObj(await callTool('uuidna_git', { ask: 'log', limit: 3 }))
  const rows = (l.log ?? l.commits ?? l.entries) as unknown[]
  assert.ok(Array.isArray(rows), 'a log is a list')
  assert.ok(rows.length <= 3, `asked for 3, got ${rows.length}`)
})

test('uuidna_payload answers the conformance record, or says it is ABSENT rather than guessing', async () => {
  const p = asObj(await callTool('uuidna_payload', {}))
  const absent = JSON.stringify(p).includes('ABSENT') || p.absent === true
  if (absent) {
    assert.ok(true, 'an unproduced artifact reports itself absent — the three-state law, not a zero')
    return
  }
  assert.equal(typeof p.receipt, 'string', 'a produced record carries its receipt')
  const slugged = asObj(await callTool('uuidna_payload', { slugs: true }))
  assert.ok(JSON.stringify(slugged).length >= JSON.stringify(p).length,
    'slugs:true adds the mounted collections and plugin names; it cannot answer with less')
})
