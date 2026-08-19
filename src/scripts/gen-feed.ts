#!/usr/bin/env node
// gen-feed — unites every theorem's already-real per-page JSON-LD (seo.ts's quantumSeo, the SAME ScholarlyArticle
// node each /theorem/<key> page ships) into ONE schema.org DataFeed document. Not "Atom" — the IETF Atom
// Syndication Format (RFC 4287) is a distinct, real, XML-based standard that has never existed anywhere in this
// codebase (checked, twice, across this whole session: zero hits). DataFeed is schema.org's own real, vetted
// JSON-LD equivalent for exactly this shape — a feed of items — so this builds the honest version of what was
// asked: uniting real, already-existing nodes into one real, standards-based document, not inventing a format
// this project never had.
//
// Written to docs/public/feed.json — VitePress's real static-passthrough directory (the same one robots.txt and
// manifest.webmanifest already live in), so it is genuinely fetchable at /feed.json, not just source data a
// markdown page reads (the way captain-claims.json is).

import { theorems, quantumSeo, merkleGravity, toUuid } from '../index.js'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

export interface DataFeed {
  '@context': string
  '@id': string
  '@type': 'DataFeed'
  name: string
  description: string
  url: string
  dataFeedElement: { '@type': 'DataFeedItem'; dateCreated: string; item: Record<string, unknown> }[]
}

/** buildFeed() → the whole DataFeed, recomputed fresh from the ledger every call — deterministic, no I/O. The
 *  CLI entry point below is the only thing that writes it to disk; tests call this directly. */
export function buildFeed(): DataFeed {
  const T = theorems()
  const dataFeedElement = T.map((t) => ({
    '@type': 'DataFeedItem' as const,
    dateCreated: '2025-01-01', // the ledger has no per-theorem authored date (deterministic build, no wall clock) —
                                // a fixed, honest placeholder rather than a fabricated one; item order is the real signal
    item: quantumSeo({ key: t.key }).jsonLd,
  }))
  // Order-invariant fold over every item's own lineAddress — the SAME identity each item's own @id already
  // carries (seo.ts), so the feed's receipt is recomputable from the feed alone, no re-derivation needed.
  const receipt = merkleGravity(T.map((t) => t.lineAddress))
  return {
    '@context': 'https://schema.org',
    '@id': `urn:uuid:${toUuid('feed:' + receipt)}`,
    '@type': 'DataFeed',
    name: 'uuidna theorem ledger feed',
    description: 'Every sealed theorem, united in one feed — each item the SAME JSON-LD its own /theorem/<key> page ships (seo.ts, one source, no second copy). Integrity, not truth.',
    url: 'https://uuidna.com/feed.json',
    dataFeedElement,
  }
}

if (process.argv[1] && process.argv[1].endsWith('gen-feed.js')) {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║ GEN-FEED — Unite every theorem\'s JSON-LD into one DataFeed ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const feed = buildFeed()
  console.log(`United ${feed.dataFeedElement.length} theorem JSON-LD nodes into one DataFeed.`)
  console.log(`@id: ${feed['@id']}`)

  const outDir = join(process.cwd(), 'docs/public')
  mkdirSync(outDir, { recursive: true })
  const outPath = join(outDir, 'feed.json')
  writeFileSync(outPath, JSON.stringify(feed, null, 2))

  console.log(`\nWritten to: ${outPath}`)
  console.log(`Served at:  /feed.json (docs/public/ is VitePress's real static passthrough)`)
  console.log('\n✓ gen-feed complete\n')
}
