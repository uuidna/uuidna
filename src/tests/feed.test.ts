// feed — gen-feed.ts unites every theorem's real per-page JSON-LD into one schema.org DataFeed. Tested here
// (not just eyeballed after one manual run) for the two things that matter: completeness (every theorem present,
// nothing dropped) and vocabulary (the SAME vetted schema.org check every other JSON-LD surface passes — not a
// second, unchecked exemption for this one file).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems, merkleGravity, toUuid } from '../index.js'
import { buildFeed } from '../scripts/gen-feed.js'
import { auditJsonLd } from '../schema-org-vocab.js'

test('feed: unites every theorem, exactly once, nothing dropped', () => {
  const feed = buildFeed()
  const T = theorems()
  assert.equal(feed.dataFeedElement.length, T.length)
  const itemIdentifiers = new Set(feed.dataFeedElement.map((e) => (e.item as { identifier: string }).identifier))
  assert.equal(itemIdentifiers.size, T.length, 'every item must be present exactly once — a duplicate would mean a theorem is double-counted, a missing one silently dropped')
  for (const t of T) assert.ok(itemIdentifiers.has(t.address), `${t.key} is missing from the feed`)
})

test('feed: @type/@id are structurally correct DataFeed/DataFeedItem, receipt is recomputable', () => {
  const feed = buildFeed()
  assert.equal(feed['@type'], 'DataFeed')
  assert.match(feed['@id'], /^urn:uuid:[0-9a-f-]{36}$/)
  for (const el of feed.dataFeedElement) assert.equal(el['@type'], 'DataFeedItem')
  // same construction as gen-feed.ts's own receipt — recomputed independently here, not trusted blind
  const receipt = merkleGravity(theorems().map((t) => t.lineAddress))
  assert.equal(feed['@id'], `urn:uuid:${toUuid('feed:' + receipt)}`)
  // deterministic — two builds produce the identical feed
  assert.deepEqual(buildFeed(), feed)
})

test('feed: every nested item is vetted schema.org vocabulary — no second, unchecked JSON-LD surface', () => {
  const feed = buildFeed()
  const failures: string[] = []
  auditJsonLd(feed, 'feed', failures)
  assert.deepEqual(failures, [], 'unvetted schema.org naming in the feed — vet the name or fix the emission')
})
