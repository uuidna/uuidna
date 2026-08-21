// Book-audit tests — the PURE, offline auditText (provenance fingerprint + structural decode + honesty gate).
// fetchGutenberg/auditBook are the network path and are NOT unit-tested here (the audit gate stays hermetic — no
// live HTTP in CI); auditBook is just fetchGutenberg piped into this same auditText. Integrity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { auditText, auditTranslation, toUuid, digitalRoot, merkleRoot } from '../index.js'
import { UUID } from './api.js'

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
