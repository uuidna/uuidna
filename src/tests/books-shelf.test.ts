// books-shelf — the four reading-room instruments held to the hexbit-app law: deterministic, controls-first,
// each able to fail, and the word-arithmetic ear proven on truth AND falsehood.
import { test } from 'node:test'
import assert from 'node:assert'
import { readPassage } from '../quantum/apps/categories/books/reader.js'
import { findFacts } from '../quantum/apps/categories/books/fact-finder.js'
import { rankShelf } from '../quantum/apps/categories/books/librarian.js'
import { tryQuote } from '../quantum/apps/categories/books/quote-trial.js'

test('the reader gives the same text the same identity, and different texts different ones', () => {
  const a = readPassage('The octave doubles the frequency. 4 x 60 = 240.')
  const b = readPassage('The octave doubles the frequency. 4 x 60 = 240.')
  const c = readPassage('An entirely different sentence.')
  assert.equal(a.audit.address, b.audit.address, 'same text, same fingerprint')
  assert.notEqual(a.audit.address, c.audit.address, 'the fingerprint can fail')
})

test('the fact-finder hears digits and words, decides both ways, and validates its instrument first', () => {
  const r = findFacts('Two and two make four. 3 times 3 equals 9. Two and two make five. Music soothes.')
  assert.equal(r.instrumentValid, true)
  assert.ok(r.verified >= 2, 'true arithmetic in words and digits verifies')
  assert.ok(r.refuted >= 1, 'the false sum is refuted — truth and falsehood wear different verdicts')
})

test('the librarian ranks by counted weight, deterministically, ties by title', () => {
  const shelf = rankShelf([
    { title: 'B', facts: 1, linked: 0 }, { title: 'A', facts: 1, linked: 0 }, { title: 'C', facts: 5, linked: 2 },
  ])
  assert.deepEqual(shelf.map((s) => s.title), ['C', 'A', 'B'])
  assert.equal(shelf[0]!.rank, 1)
})

test('the quote-trial: an on-topic sealed citation verifies, a bare beauty stays open, and the quote leaves addressed', () => {
  const cited = tryQuote('the round turns on seven, proven by theorem song_round_turns_on_seven')
  assert.equal(cited.subject!.verdict, 'VERIFIED')
  const bare = tryQuote('music expresses what words cannot say', 'Victor Hugo (attributed)')
  assert.equal(bare.subject!.verdict, 'UNVERIFIED', 'beauty without a proof stays honestly open')
  assert.ok(bare.address && bare.handle.length === 8, 'the quote leaves addressed either way')
  assert.notEqual(cited.address, bare.address)
})
