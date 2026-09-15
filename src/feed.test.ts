// feed — gen-feed.ts unites every theorem's real per-page JSON-LD into one schema.org DataFeed. Tested here
// (not just eyeballed after one manual run) for the two things that matter: completeness (every theorem present,
// nothing dropped) and vocabulary (the SAME vetted schema.org check every other JSON-LD surface passes — not a
// second, unchecked exemption for this one file).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { theorems, merkleGravity, toUuid } from './index.js'
import { buildFeed } from './scripts/gen-feed.js'
import { auditJsonLd } from './schema-org-vocab.js'
import { isPagelessFile } from './theorems/index.js'
import { spanOf } from './edge-served.js'

test('feed: unites every theorem, exactly once, nothing dropped — each paged theorem an item, the span one collection', () => {
  const feed = buildFeed()
  const paged = theorems().filter((t) => !isPagelessFile(t.file))
  const pageless = theorems().filter((t) => isPagelessFile(t.file))
  const items = feed.dataFeedElement.map((e) => e.item as { '@type'?: string; identifier?: string; name?: string; description?: string })
  const identifiers = new Set(items.filter((i) => i['@type'] !== 'Collection').map((i) => i.identifier))
  assert.equal(identifiers.size, paged.length, 'every paged theorem is present exactly once — a duplicate would double-count it, a missing one drop it silently')
  for (const t of paged) assert.ok(identifiers.has(t.address), `${t.key} is missing from the feed`)
  // the pageless rows are not dropped: they are stated once, as the span spanOf computes from exactly those rows
  const span = spanOf(pageless)!
  const collection = items.filter((i) => i['@type'] === 'Collection')
  assert.equal(collection.length, 1, 'the span is one collection')
  assert.ok(collection[0]!.name?.startsWith(`${span.count} stations`), 'it counts every pageless theorem')
  assert.ok(collection[0]!.description?.includes(span.template), 'it states the one statement every station is')
  assert.equal(feed.dataFeedElement.length, paged.length + 1)
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

// ── THE RELEASE, NOT ONLY THE LEDGER. The @id identifies the ledger fold, which cannot answer "which build is
// deployed": a release that changes only scripts leaves every theorem untouched, so the fold is identical and a
// stale deployment looks exactly like a current one. That is the state 0.2.5 shipped in — the site published no
// version at all, and the hosted MCP was found advertising one eleven releases old.
test('feed: carries the release version, held to package.json', () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { version: string }
  const feed = buildFeed()
  assert.equal(feed.version, pkg.version, 'the served feed must state the release it was built from')
  assert.match(feed.version, /^\d+\.\d+\.\d+$/)
})
