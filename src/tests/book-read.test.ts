// book-read — A LIBRARY NOBODY MAY READ IS A CATALOGUE. Every book surface in this repo measured a work and threw
// the text away: auditText splits the chapters, addresses each one, folds them into chapterRoot — and returns
// `chapters: NUMBER`. The count survived; the chapters did not. So uuidna could prove you held an exact edition and
// could never show you a page of it, which fails the law every surface answers to: the ledger exists FOR a person.
//
// THE PROOF IS WHAT MAKES IT MORE THAN A FILE. A plain text file can be altered silently; a chapter handed over with
// its merkle inclusion proof cannot — change one character and `belongs` goes false against the original root. These
// tests assert exactly that: the words come back, and a forgery is caught. The machinery was already here
// (merkleProof/verifyProof); only the return was missing.
//
// HONEST SCOPE: reading, never interpretation — this proves WHICH text you hold, never what it means.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { bookContents, readChapter, auditText, verifyProof } from '../index.js'

const BOOK = [
  'CHAPTER I',
  'Call me Ishmael. Some years ago, never mind how long precisely.',
  '',
  'CHAPTER II',
  'I stuffed a shirt or two into my old carpet-bag.',
  '',
  'CHAPTER III',
  'Entering that gable-ended Spouter-Inn, you found yourself in a wide, low room.',
].join('\n')

test('the words come back — the unlock', () => {
  const ch = readChapter(BOOK, 1)
  assert.ok(ch.text.includes('carpet-bag'), 'the chapter returns its own words')
  assert.equal(ch.index, 1)
  assert.equal(ch.chapters, 3)
  assert.ok(ch.words > 0 && ch.chars > 0)
})

test('a chapter proves it belongs to the book it came from', () => {
  for (let i = 0; i < 3; i++) {
    const ch = readChapter(BOOK, i)
    assert.equal(ch.belongs, true, `chapter ${i} verifies against the root`)
    // verify independently, the way a reader would — not by trusting the flag
    assert.equal(verifyProof(ch.address, ch.proof, ch.chapterRoot), true)
  }
})

test('ONE altered character fails the proof — a forgery is caught', () => {
  const original = readChapter(BOOK, 1)
  const tampered = BOOK.replace('carpet-bag', 'carpet-bags')
  const forged = readChapter(tampered, 1)
  assert.notEqual(forged.address, original.address, 'the altered chapter has a different address')
  // the forged chapter cannot verify against the ORIGINAL book's root
  assert.equal(verifyProof(forged.address, forged.proof, original.chapterRoot), false)
})

test('the chapter root agrees with the audit that never returned the text', () => {
  // the unlock must not invent a second, disagreeing structure
  assert.equal(readChapter(BOOK, 0).chapterRoot, auditText(BOOK).chapterRoot)
  assert.equal(bookContents(BOOK).chapterRoot, auditText(BOOK).chapterRoot)
  assert.equal(readChapter(BOOK, 0).chapters, auditText(BOOK).chapters)
})

test('the table of contents lists the book own headings', () => {
  const toc = bookContents(BOOK, { title: 'Moby Dick' })
  assert.equal(toc.title, 'Moby Dick')
  assert.equal(toc.chapters.length, 3)
  assert.deepEqual(toc.chapters.map((c) => c.heading), ['CHAPTER I', 'CHAPTER II', 'CHAPTER III'])
  assert.deepEqual(toc.chapters.map((c) => c.index), [0, 1, 2])
  for (const c of toc.chapters) assert.ok(c.words > 0, 'no empty chapter listed')
})

test('an out-of-range index is clamped, never an error', () => {
  assert.equal(readChapter(BOOK, 99).index, 2, 'past the end clamps to the last chapter')
  assert.equal(readChapter(BOOK, -5).index, 0, 'before the start clamps to the first')
  assert.equal(readChapter(BOOK, 99).belongs, true, 'a clamped read still proves membership')
})

test('a text with no chapter headings is one readable chapter', () => {
  const plain = 'There is no heading here, only prose that runs on without division.'
  const ch = readChapter(plain, 0)
  assert.equal(ch.chapters, 1)
  assert.equal(ch.text, plain, 'the whole text is returned')
  assert.equal(ch.belongs, true)
})

test('reading is deterministic — the same text reads the same forever', () => {
  const a = readChapter(BOOK, 2), b = readChapter(BOOK, 2)
  assert.deepEqual(a, b)
})
