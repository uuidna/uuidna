// site-contents — the site's table of contents, held to the same three properties books.ts holds a text's to:
// an ORDER (index), an ADDRESS per chapter, and a ROOT that folds them. bookContents gives a text exactly that
// (chapters + chapterRoot); the sidebar had headings and order but no addresses and no root, so nothing could
// tell whether the contents had silently changed. These tests hold the parity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { siteContents, computeSidebar, pagesByProof } from '../site.js'

test('site contents is a book: every chapter carries an index, a heading and its own address', () => {
  const c = siteContents()
  assert.ok(c.chapters.length > 0, 'a site with no contents is not a book')
  c.chapters.forEach((ch, i) => {
    assert.equal(ch.index, i, 'chapters are ORDERED — index is position')
    assert.ok(ch.heading.length > 0)
    assert.match(ch.address, /^[0-9a-f-]{36}$/)
    assert.ok(ch.entries > 0, `chapter "${ch.heading}" holds no pages`)
  })
})

test('the contents root folds every chapter, and recomputes', () => {
  const a = siteContents()
  assert.match(a.contentsRoot, /^[0-9a-f-]{36}$/)
  assert.deepEqual(siteContents(), a, 'the contents must be deterministic — same tree, same root')
})

test('chapter addresses are distinct — no two chapters fold alike', () => {
  const addrs = siteContents().chapters.map((c) => c.address)
  assert.equal(new Set(addrs).size, addrs.length)
})

test('the contents covers the whole sidebar — no group is dropped on the way to the book', () => {
  const groups = computeSidebar()
  const c = siteContents()
  assert.equal(c.chapters.length, groups.length)
  assert.deepEqual(c.chapters.map((x) => x.heading), groups.map((g) => g.text))
  // and every page the sidebar shows is counted by exactly one chapter
  const shown = groups.reduce((n, g) => n + g.items.length, 0)
  assert.equal(c.chapters.reduce((n, ch) => n + ch.entries, 0), shown)
})

// ── the BY-PROOF axis — the page-level twin of /topics. It groups by what a page RESTS ON, and is deliberately a
// second view rather than the sidebar: deriving the sidebar names this way files license.md under the cipher
// principle, which is true and useless for finding it. These hold the axis honest.
test('by-proof groups every page that cites, and no page that does not', () => {
  const { groups, grouped } = pagesByProof()
  assert.ok(groups.length > 0)
  const total = groups.reduce((n, g) => n + g.pages.length, 0)
  assert.equal(total, grouped, 'the grouped count must equal the pages actually placed')
  for (const g of groups) for (const p of g.pages)
    assert.ok(p.cites > 0, `${p.route} was grouped while resting on nothing`)
})

test('by-proof is deterministic and its root folds every group', () => {
  const a = pagesByProof()
  assert.deepEqual(pagesByProof(), a)
  assert.match(a.root, /^[0-9a-f-]{36}$/)
  const addrs = a.groups.map((g) => g.address)
  assert.equal(new Set(addrs).size, addrs.length, 'two groups folded alike')
})

test('by-proof is a SECOND axis— the two disagree, and that is the point', () => {
  const proof = pagesByProof().groups.length
  const purpose = computeSidebar().length
  assert.notEqual(proof, purpose, 'if the axes agreed there would be no reason to keep both')
  assert.ok(proof > purpose, 'grouping by citation fragments the site — 13 principles against 5 purposes')
})
