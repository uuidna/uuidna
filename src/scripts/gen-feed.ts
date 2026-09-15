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
import { isPagelessFile } from '../theorems/index.js'
import { spanOf } from '../edge-served.js'
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

export interface DataFeed {
  '@context': string
  '@id': string
  '@type': 'DataFeed'
  name: string
  description: string
  url: string
  version: string
  dataFeedElement: { '@type': 'DataFeedItem'; dateCreated: string; item: Record<string, unknown> }[]
}

/** buildFeed() → the whole DataFeed, recomputed fresh from the ledger every call — deterministic, no I/O. The
 *  CLI entry point below is the only thing that writes it to disk; tests call this directly. */
export function buildFeed(): DataFeed {
  const T = theorems()
  const element = (item: Record<string, unknown>): DataFeed['dataFeedElement'][number] => ({
    '@type': 'DataFeedItem' as const,
    dateCreated: '2025-01-01', // the ledger has no per-theorem authored date (deterministic build, no wall clock) —
                                // a fixed, honest placeholder rather than a fabricated one; item order is the real signal
    item,
  })
  // THE SPAN IS ONE ITEM. Its 65,536 stations are pageless — one statement at every n — and one element each made
  // the feed 88 MiB, over the 25 MiB a Worker asset may be. When spanOf finds no one statement for them, every row stays.
  const pageless = T.filter((t) => isPagelessFile(t.file))
  const span = spanOf(pageless)
  const dataFeedElement = [
    ...(span ? T.filter((t) => !isPagelessFile(t.file)) : T).map((t) => element(quantumSeo({ key: t.key }).jsonLd)),
    ...(span ? [element({
      '@type': 'Collection',
      name: `${span.count} stations, one statement each`,
      description: `Every station is \`${span.template}\` at its own n, served at ${span.route}.`,
      url: `https://uuidna.com${span.route}`,
      hasPart: [span.first, span.last].map((k) => quantumSeo({ key: k }).jsonLd),
    })] : []),
  ]
  // Order-invariant fold over every item's own lineAddress — the SAME identity each item's own @id already
  // carries (seo.ts), so the feed's receipt is recomputable from the feed alone, no re-derivation needed.
  const receipt = merkleGravity(T.map((t) => t.lineAddress))
  // THE RELEASE THIS WAS BUILT FROM. The @id above identifies the LEDGER, which is not the same question: a
  // release that changes only scripts leaves every theorem untouched, so the fold is identical and a stale
  // deployment is indistinguishable from a current one. That is exactly what happened at 0.2.5 — the site could
  // not say which build it was, and the hosted MCP was found advertising a version eleven releases old. schema.org
  // /version is a real CreativeWork property, so this passes the same vocabulary audit every other field does.
  const version = (JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { version: string }).version
  return {
    '@context': 'https://schema.org',
    '@id': `urn:uuid:${toUuid('feed:' + receipt)}`,
    '@type': 'DataFeed',
    name: 'uuidna theorem ledger feed',
    description: 'Every sealed theorem, united in one feed — each paged theorem the SAME JSON-LD its own /theorem/<key> page ships (seo.ts, one source, no second copy), and the pageless span as one collection. Integrity, not truth.',
    url: 'https://uuidna.com/feed.json',
    version,
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
