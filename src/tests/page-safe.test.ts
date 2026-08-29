// page/safe — mill ore must not be measured as Vue; Alpine and search-feed writers share one constructor.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { pageSafe, pageCell } from '../quantum/advantage/page/safe/index.js'

/** One HTML-entity pass — the same decode markdown-it applies to page text. */
const decodeOnce = (s: string): string =>
  s.replace(/&amp;|&lt;|&gt;/g, (m) => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>' }[m] ?? m))

test('pageSafe encodes Vue tags and is idempotent on already-escaped mill HTML', () => {
  assert.equal(pageSafe('/theorem/<key>'), '/theorem/&amp;lt;key&amp;gt;')
  const span = 'PREreview of "<span class="word">Estimation'
  assert.equal(pageSafe(span).includes('<span'), false)
  assert.match(pageSafe(span), /&amp;lt;span/)
  assert.equal(pageSafe(pageSafe(span)), pageSafe(span))
  assert.equal(pageSafe('&lt;span class="w'), '&amp;lt;span class="w')
  assert.equal(pageSafe('{{fold}}').includes('{{'), false)
})

test('pageSafe survives one markdown-it decode — Vue then sees entities, not tags', () => {
  const revived = decodeOnce(pageSafe('<span class="w'))
  assert.equal(revived.includes('<span'), false)
  assert.equal(revived, '&lt;span class="w')
  assert.equal(decodeOnce(pageSafe('&lt;a href="/wik')), '&lt;a href="/wik')
})

test('pageCell keeps a table as one row — backslash, newline, pipe, then tags', () => {
  const note = 'a\\|b\n<span>x</span>'
  const cell = pageCell(note)
  assert.equal(cell.includes('\n'), false)
  assert.equal(cell.includes('<span'), false)
  assert.match(cell, /\\\\/)
  assert.match(cell, /\\\|/)
})

test('mill writers import pageSafe/pageCell — not a second incomplete regex', () => {
  const files = [
    'src/scripts/quantum-search-trial.ts',
    'src/scripts/gen-search-feed.ts',
    'src/scripts/gen-open-questions.ts',
    'src/scripts/gen-mcp.ts',
    'src/scripts/gen-apis.ts',
  ]
  for (const f of files) {
    const src = readFileSync(join(ROOT, f), 'utf8')
    assert.match(src, /pageSafe|pageCell/, f)
  }
})

test('committed search-feed honest scope does not ship a raw <key> tag', () => {
  const md = readFileSync(join(ROOT, 'docs/search-feed.md'), 'utf8')
  const honest = md.split('## Honest scope')[1] ?? ''
  const prose = honest.replace(/`[^`]*`/g, '')
  assert.doesNotMatch(prose, /<[a-zA-Z]/)
})

test('search-feed and search-trial pages do not revive Vue tags after one markdown-it decode', () => {
  const feed = readFileSync(join(ROOT, 'docs/search-feed.md'), 'utf8')
  assert.doesNotMatch(feed, /<key>/)
  const span = readFileSync(join(ROOT, 'docs/articles/search-handle-span.md'), 'utf8')
  assert.doesNotMatch(span, /<[a-zA-Z\/!?]/)
  assert.doesNotMatch(span, /(?:^|[^&])&lt;[a-zA-Z]/)
  assert.doesNotMatch(span, /\|[^\n]+\n(?![\n|])/, 'table cells stay one row')
})
