import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { hnHitsToArticles, searchHnAlgolia } from './index.js'
import { publicApiRegistry } from '../public/index.js'
import { ROOT } from '../../../boundary.js'

test('NEWS_APIS names hn-algolia beside wikinews-rss', () => {
  const ids = publicApiRegistry().news.map((n) => n.id)
  assert.ok(ids.includes('wikinews-rss'))
  assert.ok(ids.includes('hn-algolia'))
  const hn = publicApiRegistry().news.find((n) => n.id === 'hn-algolia')!
  assert.equal(hn.host, 'hn.algolia.com')
  assert.equal(hn.access, 'keyless')
  assert.match(hn.base, /hn\.algolia\.com\/api\/v1\/search/)
})

test('hnHitsToArticles maps Algolia hits to stubs', () => {
  const rows = hnHitsToArticles([
    { objectID: '1', title: '  ', url: 'https://x.example' },
    {
      objectID: '2',
      title: 'Quantum hop',
      url: 'https://news.ycombinator.com/item?id=2',
      author: 'alice',
      created_at: '2026-09-16T12:00:00.000Z',
      story_text: 'a story',
      points: 42,
    },
  ], 8)
  assert.equal(rows.length, 1)
  assert.equal(rows[0]!.title, 'Quantum hop')
  assert.equal(rows[0]!.source, 'hn.algolia.com')
  assert.equal(rows[0]!.date, '2026-09-16')
  assert.match(rows[0]!.body, /by alice/)
  assert.match(rows[0]!.body, /42 points/)
})

test('hnHitsToArticles respects limit', () => {
  const hits = Array.from({ length: 5 }, (_, i) => ({ title: `t${i}`, objectID: String(i) }))
  assert.equal(hnHitsToArticles(hits, 2).length, 2)
})

test('collectMintExtras wires HN Algolia and Wikinews search beside featured', () => {
  const src = readFileSync(join(ROOT, 'src', 'api-mint.ts'), 'utf8')
  assert.ok(src.includes('fetchWikinewsFeatured'), 'featured RSS')
  assert.ok(src.includes('searchWikinews'), 'mint query → Wikinews search')
  assert.ok(src.includes('searchHnAlgolia'), 'mint query → HN Algolia')
  assert.ok(src.includes('searchHnAlgolia(query'), 'HN gets the mint query')
  assert.ok(src.includes('searchWikinews(query'), 'Wikinews search gets the mint query')
})

test('searchHnAlgolia is a named export on the news port', () => {
  assert.equal(typeof searchHnAlgolia, 'function')
})
