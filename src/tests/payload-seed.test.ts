// payload-seed — the versioned Lean→PayloadCMS seed tree, tested at its three claims: the uuid is a REVERSIBLE
// imprint (status/stem/content decode back out — the no-cost index), any content change mints a NEW version
// (append-only immutability), and the seed's page tree is stamped by the order-sensitive document address.
// Pure and offline. Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { seedUuid, readSeed, filterSeeds, belongsTo, buildLeanPageSeed, verifySeed, toPayloadDocs } from '../index.js'

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
  assert.equal(verifySeed(seed, 'Coins', CONTENTS), true, 'folder name and document address both recompute')
  assert.equal(verifySeed(seed, 'Coins', CONTENTS + 'x'), false, 'a tampered source no longer verifies this version')
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
  assert.equal(draft[0]._status, 'draft', 'a lean file with nothing sealed syncs as a draft, never published')
})
