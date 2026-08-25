// dirty-paths — WHOSE WORK IS THIS FILE, tested with an instrument that can fail.
//
// The properties: a path clean at session open is MINE, a path already dirty is FOREIGN, and a path the manifest
// cannot speak about is UNKNOWN — three answers, never two. That last one is the reason this module exists in the
// shape it does, so it is tested first and hardest: collapsing unknown into either neighbour would make this
// finder an instance of the very class it was built to end.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ownershipOf, covers, judge, chargeSheet, type OpenManifest } from '../dirty-paths.js'

const manifest = (dirtyAtOpen: string[], covered = ['src', 'lean']): OpenManifest =>
  ({ dirtyAtOpen, covered, head: 'a'.repeat(40) })

test('a path CLEAN when the session opened is mine to commit', () => {
  assert.equal(ownershipOf('src/scripts/one-writer.ts', manifest([])), 'mine')
})

test('a path ALREADY DIRTY when the session opened is FOREIGN — a peer is mid-edit in it', () => {
  // The live failure: `git commit -- src/scripts/one-receipt.ts` took the whole file's working-tree state, and
  // of 83 insertions roughly twenty belonged to the committer. The pathspec form protects against the shared
  // INDEX; it does not protect against a file somebody else is inside. Path isolation is not hunk isolation.
  const m = manifest(['src/scripts/one-receipt.ts'])
  assert.equal(ownershipOf('src/scripts/one-receipt.ts', m), 'foreign')
  assert.equal(ownershipOf('src/scripts/one-writer.ts', m), 'mine', 'and its neighbours are unaffected')
})

test('UNKNOWN is its own answer and is NEVER read as clean — the trap this module exists to avoid', () => {
  // THE OBJECTION THAT SHAPED THIS FILE. "The manifest has no entry" is not "the path was not dirty". A file
  // created after the session opened, a manifest written before a peer's checkout finished, a path outside the
  // scanned roots — each produces no entry, and the tempting reading is "absent from dirtyAtOpen, therefore
  // mine". That is `[]` from a down archive equalling `[]` from a clean one: the healthy case and the broken
  // case returning the same value, which is the single predicate behind every instrument that failed today.
  // Building it into the finder meant to end that class would be the eighth instance.
  assert.equal(ownershipOf('docs/index.md', manifest([])), 'unknown',
    'outside the covered roots — absent from the dirty list proves nothing about it')
  assert.equal(ownershipOf('src/anything.ts', null), 'unknown',
    'no manifest at all cannot mean everything is clean')

  // and the ORDERING is the mechanism: coverage is asked BEFORE dirtiness, so a path the scan never looked at is
  // unknown even though it is, trivially, absent from a list that was never populated for it.
  const narrow = manifest([], ['src/scripts'])
  assert.equal(ownershipOf('src/hexbit/index.ts', narrow), 'unknown', 'never scanned, so never clean')
  assert.equal(ownershipOf('src/scripts/spin.ts', narrow), 'mine', 'scanned and clean')
})

test('coverage compares on / boundaries, so a root never claims its lookalike by prefix', () => {
  assert.equal(covers('src/scripts', 'src/scripts/api.ts'), true)
  assert.equal(covers('src/scripts', 'src/scripts'), true, 'the root covers itself')
  assert.equal(covers('src/scripts', 'src/scripts-extra/api.ts'), false, 'a string prefix is not a directory')
  assert.equal(covers('.', 'anything/at/all.ts'), true, 'the whole-tree root covers everything')
})

test('judge BLOCKS foreign and unknown, passes mine, and names what is blocking', () => {
  const m = manifest(['src/scripts/one-receipt.ts'])
  const { verdicts, ok, blocking } = judge(
    ['src/scripts/one-writer.ts', 'src/scripts/one-receipt.ts', 'docs/index.md'], m)
  assert.equal(verdicts.length, 3)
  assert.equal(ok, false)
  assert.deepEqual(blocking.map((b) => b.ownership).sort(), ['foreign', 'unknown'])
})

test('the override NAMES ITS PATH — one statement per file actually thought about', () => {
  // A blanket --force is a habit within a week, and this finding exists precisely because two careful sessions'
  // habits failed under time pressure. Committing a file a peer dirtied IS legitimate — a reconcile does it by
  // design, and one session deliberately landed four payload seeds another had generated. What must not happen
  // is doing it without noticing, so the override is per-path and says which.
  const m = manifest(['src/scripts/one-receipt.ts'])
  const paths = ['src/scripts/one-receipt.ts']
  assert.equal(judge(paths, m).ok, false, 'unmentioned, it blocks')
  assert.equal(judge(paths, m, ['src/scripts/one-receipt.ts']).ok, true, 'named, it passes')
  assert.equal(judge(paths, m, ['src/scripts/something-else.ts']).ok, false,
    'and an override for a DIFFERENT path does not release this one')
})

test('an all-mine commit is never obstructed — the finder must not cost anything when nothing is wrong', () => {
  const { ok, blocking } = judge(['src/a.ts', 'src/b.ts', 'lean/C.lean'], manifest([]))
  assert.equal(ok, true)
  assert.deepEqual(blocking, [])
})

test('the charge sheet gives each answer its OWN cure — they want different acts', () => {
  const m = manifest(['src/taken.ts'])
  const { blocking } = judge(['src/taken.ts', 'docs/outside.md'], m)
  const sheet = chargeSheet(blocking).join('\n')
  assert.match(sheet, /FOREIGN src\/taken\.ts/)
  assert.match(sheet, /ask whoever is editing it/, 'a foreign path wants a conversation')
  assert.match(sheet, /UNKNOWN docs\/outside\.md/)
  assert.match(sheet, /re-open the session manifest/, 'an unknown path wants a manifest, not a conversation')
  assert.match(sheet, /--also src\/taken\.ts/, 'and each names the exact override for ITS path')
})
