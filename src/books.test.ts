// Book-audit tests — the PURE, offline auditText (provenance fingerprint + structural decode + honesty gate).
// fetchGutenberg/auditBook are the network path and are NOT unit-tested here (the audit gate stays hermetic — no
// live HTTP in CI); auditBook is just fetchGutenberg piped into this same auditText. Integrity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { auditText, auditTranslation, toUuid, digitalRoot, merkleRoot } from './index.js'
import { stripGutenberg } from './books.js'
import { UUID } from './test-api.js'

const BOOK = `The Project

CHAPTER I

It was the best of lines.

CHAPTER II

Two roads folded to one receipt.
`

test('provenance fingerprint: the address is the exact-copy proof, recomputable', () => {
  const a = auditText(BOOK, { title: 'Demo', authors: ['Anon'] })
  assert.match(a.address, UUID)
  assert.equal(a.address, toUuid(BOOK)) // anyone with the same text recomputes it
  assert.notEqual(auditText(BOOK + ' ').address, a.address) // one changed byte → a different fingerprint
  assert.equal(a.title, 'Demo')
})

test('chapters are split and merkle-folded — any chapter can be proven to belong', () => {
  const a = auditText(BOOK)
  assert.equal(a.chapters, 3) // preamble + CHAPTER I + CHAPTER II
  assert.match(a.chapterRoot, UUID)
})

test('structural decode: counts and the ℤ/9 gravity are recomputable', () => {
  const a = auditText(BOOK)
  assert.equal(a.chars, BOOK.length)
  assert.equal(a.words, BOOK.trim().split(/\s+/).length)
  assert.equal(a.lines, BOOK.split('\n').length)
  assert.equal(a.gravity, digitalRoot(BOOK.length)) // a checksum digit of the length
  assert.ok(a.gravity >= 1 && a.gravity <= 9)
})

test('the reversible imprint round-trips on the sample', () => {
  assert.equal(auditText(BOOK).imprintRoundTrips, true)
})

test('the honesty gate runs and ordinary prose passes (binary 1)', () => {
  const a = auditText(BOOK)
  assert.ok(a.gate.binary === 0 || a.gate.binary === 1)
  assert.equal(a.gate.binary, 1) // no overclaim vocabulary in plain prose
})

test('empty text is handled (zero words, still a valid fingerprint)', () => {
  const a = auditText('')
  assert.equal(a.words, 0)
  assert.match(a.address, UUID)
})

test('translation audit binds source→translation with a directional provenance receipt', () => {
  const src = 'It is a truth universally acknowledged.'
  const tr = 'Всеобще признанная истина.'
  const a = auditTranslation(src, tr, { title: 'Opening line', sourceLang: 'en', targetLang: 'ru' })
  assert.equal(a.source.address, toUuid(src)) // each side keeps its own exact-copy fingerprint
  assert.equal(a.translation.address, toUuid(tr))
  assert.match(a.pair, UUID)
  assert.equal(a.pair, toUuid(`${a.source.address}→${a.translation.address}`)) // recomputable, directional
  assert.notEqual(a.pair, toUuid(`${a.translation.address}→${a.source.address}`)) // reverse is a different receipt
  assert.equal(a.targetLang, 'ru')
})

test('a revised translation re-addresses — the change is visible in the pair', () => {
  const src = 'the vortex speaks'
  const a1 = auditTranslation(src, 'вихрь говорит')
  const a2 = auditTranslation(src, 'вихрь говорит.') // one edit
  assert.equal(a1.source.address, a2.source.address) // same source
  assert.notEqual(a1.translation.address, a2.translation.address) // changed translation
  assert.notEqual(a1.pair, a2.pair) // so the binding receipt changes too
})

// ── THE WRAPPER IS NOT THE WORK ──────────────────────────────────────────────────────────────────────────────
// A Project Gutenberg file wraps the book in a header and a licence footer, and nothing in this tree stripped
// them. Measured on Wealth of Nations (3300) 2026-08-25: 142 header words, 381,096 words of Smith, 2,915 words
// of licence footer. That wrapper is 0.8% of the file and produced 13 of 194 mined leads — 7%, nine times its
// share, because legal prose is dense in numbers. The Foundation's royalty terms and 30-day refund window were
// filed as numeric claims of Adam Smith, each carrying the book's own content-address as provenance.
test('stripGutenberg removes the header and the licence footer, and reports what it removed', () => {
  const text = [
    'The Project Gutenberg eBook of Something',
    'This eBook is for the use of anyone anywhere at no cost.',
    '*** START OF THE PROJECT GUTENBERG EBOOK SOMETHING ***',
    'It is natural that what is usually the produce of two days labour should be worth double.',
    '*** END OF THE PROJECT GUTENBERG EBOOK SOMETHING ***',
    'You provide a full refund of any money paid within 30 days of receipt.',
  ].join('\n')
  const r = stripGutenberg(text)
  assert.equal(r.stripped, true)
  assert.match(r.work, /produce of two days labour/)
  assert.doesNotMatch(r.work, /refund/, 'the licence footer must not survive into the work')
  assert.doesNotMatch(r.work, /This eBook is for the use/, 'nor the header')
  assert.ok(r.headerWords > 0 && r.footerWords > 0, 'what was removed is counted, not silently dropped')
})

test('A TEXT WITH NO MARKERS IS RETURNED WHOLE — an unlocatable wrapper is not an absent one', () => {
  const plain = 'A book with no Gutenberg markers at all, worth two deer per beaver.'
  const r = stripGutenberg(plain)
  assert.equal(r.stripped, false, 'the flag must say the strip did not happen')
  assert.equal(r.work, plain, 'nothing may be cut on a guess')
  assert.equal(r.headerWords, 0)
  assert.equal(r.footerWords, 0)
})

test('a HALF-matched wrapper cuts nothing — losing the opening of a book is worse than carrying a licence', () => {
  const startOnly = '*** START OF THE PROJECT GUTENBERG EBOOK X ***\nthe work continues and never ends'
  assert.equal(stripGutenberg(startOnly).stripped, false)
  const endFirst = '*** END OF THE PROJECT GUTENBERG EBOOK X ***\nthen a start\n*** START OF THE PROJECT GUTENBERG EBOOK X ***'
  assert.equal(stripGutenberg(endFirst).stripped, false, 'markers out of order are not a wrapper')
})

test('the strip is PURE and idempotent — stripping twice is stripping once', () => {
  const text = '*** START OF THE PROJECT GUTENBERG EBOOK A ***\nthe work\n*** END OF THE PROJECT GUTENBERG EBOOK A ***\nlicence'
  const once = stripGutenberg(text).work
  assert.equal(stripGutenberg(once).work, once, 'an already-stripped work has no markers and must survive intact')
})
