// payload-seed — the versioned Lean→PayloadCMS seed tree, tested at its three claims: the uuid is a REVERSIBLE
// imprint (status/stem/content decode back out — the no-cost index), any content change mints a NEW version
// (append-only immutability), and the seed's page tree is stamped by the order-sensitive document address.
// Pure and offline. Integrity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { seedUuid, readSeed, filterSeeds, belongsTo, buildLeanPageSeed, verifySeed, toPayloadDocs, retiredUuid } from './index.js'

const CONTENTS = 'theorem two_coins : 2 = 2 := by decide\n'

test('the uuid reverse-engineers: status, stem and content decode from the name alone — zero reads, zero index', () => {
  const u = seedUuid('Coins', CONTENTS, 'usable')
  const id = readSeed(u)
  assert.equal(id.status, 'usable', 'the status travels IN the uuid')
  assert.equal(belongsTo(u, 'Coins'), true, 'the stem fingerprint groups versions by file')
  assert.equal(belongsTo(u, 'Cipher'), false)
  const d = seedUuid('Coins', CONTENTS, 'draft')
  assert.equal(readSeed(d).status, 'draft')
  assert.equal(readSeed(d).content64, id.content64, 'same contents, same content fingerprint — status is orthogonal')
})

test('any change to the Lean mints a NEW version: the uuid moves with the contents, deterministically', () => {
  const v1 = seedUuid('Coins', CONTENTS, 'usable')
  const v1again = seedUuid('Coins', CONTENTS, 'usable')
  const v2 = seedUuid('Coins', CONTENTS + '-- a comment\n', 'usable')
  assert.equal(v1, v1again, 'same contents → the same version for everyone')
  assert.notEqual(v1, v2, 'changed contents → a new immutable version folder')
  assert.equal(readSeed(v2).stem32, readSeed(v1).stem32, 'both versions still belong to the same file')
})

test('filtering is free: a folder listing filters by status decoded from the names', () => {
  const names = [
    seedUuid('Coins', 'a', 'usable'), seedUuid('Cipher', 'b', 'usable'),
    seedUuid('Draft1', 'c', 'draft'), 'not-a-seed-uuid',
  ]
  assert.equal(filterSeeds(names, 'usable').length, 2)
  assert.equal(filterSeeds(names, 'draft').length, 1, 'a non-seed name filters out instead of throwing')
})

test('the seed is a stamped, verifiable nested page: parent + one nested child page per theorem', () => {
  const entries = [{ key: 'two_coins', name: 'the two coins', statement: '2 = 2', lean: CONTENTS.trim() }]
  const seed = buildLeanPageSeed('Coins', CONTENTS, entries, true)
  assert.equal(seed.status, 'usable')
  assert.equal(seed.slug, 'coins')
  const pages = (seed.page.root.children ?? []).filter((n) => n.type === 'page')
  assert.equal(pages.length, 1, 'one nested child page per theorem')
  assert.equal(verifySeed(seed, 'Coins', CONTENTS, entries), true, 'folder name and document address both recompute')
  assert.equal(verifySeed(seed, 'Coins', CONTENTS + 'x', entries), false, 'a tampered source no longer verifies this version')
})

test('THE VERSION COVERS THE WHOLE PAGE: a changed theorem name mints a new version, not a silent overwrite', () => {
  // The page embeds each theorem's name from the ledger, but the uuid used to hash the Lean text alone. A name
  // that changed without its wing changing therefore produced a DIFFERENT page under the SAME folder name, and
  // the generator skipped it as already sealed — permanently, since nothing about the identity had moved. It
  // published a current Lean block under a stale heading (90c4f258, 2026-09-18), and no re-run could cure it.
  const entries = [{ key: 'two_coins', name: 'the two coins', statement: '2 = 2', lean: CONTENTS.trim() }]
  const renamed = [{ ...entries[0]!, name: 'the two coins, stated narrowly' }]
  const a = buildLeanPageSeed('Coins', CONTENTS, entries, true)
  const b = buildLeanPageSeed('Coins', CONTENTS, renamed, true)
  assert.notEqual(a.uuid, b.uuid, 'a changed name must move the version — otherwise the new page is skipped forever')
  assert.notEqual(a.address, b.address, 'and the document address moves with it')
  // the seed a stale version verifies against is its OWN entries, never the renamed ones
  assert.equal(verifySeed(a, 'Coins', CONTENTS, renamed), false, 'a version does not verify against content it does not hold')
  // CONTROL, and the sealed property this must not cost: with no entries the name is exactly what it always was,
  // so every version already on disk keeps its folder — the change is additive, not a re-address of the store.
  assert.equal(seedUuid('Coins', CONTENTS, 'usable'), seedUuid('Coins', CONTENTS, 'usable', []), 'an empty entry list hashes the contents alone')
})

test('payload sync speaks only the standard shapes: pages, nested-docs parent, drafts _status, lexical content', () => {
  const entries = [{ key: 'two_coins', name: 'the two coins', statement: '2 = 2', lean: CONTENTS.trim() }]
  const docs = toPayloadDocs(buildLeanPageSeed('Coins', CONTENTS, entries, true))
  assert.equal(docs.length, 2, 'one parent page + one nested child per theorem')
  const [parent, child] = docs
  assert.equal(parent.parent, null, 'the lean file is a root page')
  assert.equal(parent._status, 'published', 'usable maps to the drafts plugin published state')
  assert.equal(child.parent, parent.slug, 'the theorem is nested under its file — the nested-docs relation')
  assert.equal(child.slug, 'theorem-two_coins')
  assert.equal(child.content.root.type, 'root', 'the content field is the lexical editor-state shape')
  assert.equal(parent.uuidnaVersion, child.uuidnaVersion, 'one version uuid rides every doc — idempotent upsert by equality')
  const draft = toPayloadDocs(buildLeanPageSeed('Draft1', 'x', [], false))
  assert.equal(draft[0]._status, 'draft', 'a lean file with nothing sealed syncs as a draft')
})

test('RETIRING SUPERSEDES WITHOUT PURGING: only the status bits move, and the no-cost index stops calling it usable', () => {
  const live = seedUuid('Coins', CONTENTS, 'usable')
  const gone = retiredUuid(live)
  const a = readSeed(live), b = readSeed(gone)
  assert.equal(b.status, 'retired', 'the name now decodes as retired')
  assert.equal(b.content64, a.content64, 'same content — the bytes are not touched')
  assert.equal(b.stem32, a.stem32, 'same wing')
  assert.notEqual(gone, live, 'and it is a different folder name, so the index can tell them apart')
  assert.deepEqual(filterSeeds([live, gone], 'usable'), [live], 'only the current version reads as usable')
  assert.deepEqual(filterSeeds([live, gone], 'retired'), [gone], 'the superseded one is still there, still addressable')
  assert.equal(retiredUuid(gone), gone, 'retiring twice is the same name — the operation settles')
})
