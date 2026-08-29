// books-shelf — the four reading-room instruments held to the hexbit-app law: deterministic, controls-first,
// each able to fail, and the word-arithmetic ear proven on truth AND falsehood.
import { test } from 'node:test'
import assert from 'node:assert'
import { readPassage } from '../quantum/apps/categories/books/reader.js'
import { findFacts } from '../quantum/apps/categories/books/fact-finder.js'
import { rankShelf } from '../quantum/apps/categories/books/librarian.js'
import { tryQuote } from '../quantum/apps/categories/books/quote-trial.js'
import { handleBookOf, stripsOf, STRIP_LINES, STRIP_CHOICES } from '../quantum/apps/categories/books/strips.js'
import { decode, candidates, judge, probeOfDecoding, VACUOUS_ON_CORPUS } from '../quantum/apps/categories/books/structure.js'
import { VE_FACES } from '../hexbit/index.js'
import { STATION_TEN } from '../hexagram.js'

test('the reader gives the same text the same identity, and different texts different ones', () => {
  const a = readPassage('The octave doubles the frequency. 4 x 60 = 240.')
  const b = readPassage('The octave doubles the frequency. 4 x 60 = 240.')
  const c = readPassage('An entirely different sentence.')
  assert.equal(a.audit.address, b.audit.address, 'same text, same fingerprint')
  assert.notEqual(a.audit.address, c.audit.address, 'the fingerprint can fail')
  assert.equal(a.structure.address, b.structure.address)
  assert.deepEqual(a.structure.ranks, b.structure.ranks)
  assert.ok(a.facts.length >= 1)
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

test('handle strips write the book: fourteen lines, ten choices, same picks same handle', () => {
  assert.equal(STRIP_LINES, VE_FACES)
  assert.equal(STRIP_CHOICES, STATION_TEN)
  let volume = 1
  for (let i = 0; i < STRIP_LINES; i++) volume = volume * STRIP_CHOICES
  assert.equal(STRIP_LINES * STRIP_CHOICES, 140)
  assert.equal(volume, 10 ** 14)
  const zero = Array.from({ length: STRIP_LINES }, () => 0)
  const a = handleBookOf(zero)
  const b = handleBookOf(zero)
  assert.equal(a.handle, b.handle)
  assert.equal(a.handle.length, 8)
  assert.equal(a.volume, volume)
  assert.equal(a.volume, 10 ** 14)
  assert.ok(a.volume > 16 ** 8)
  assert.ok(BigInt(a.volume) < (2n ** 128n))
  const flipped = [...zero]
  flipped[0] = 1
  assert.notEqual(handleBookOf(flipped).handle, a.handle)
  const fromAddr = handleBookOf(stripsOf(a.address))
  assert.equal(fromAddr.choices.length, STRIP_LINES)
  for (const c of fromAddr.choices) {
    assert.ok(c >= 0 && c < STRIP_CHOICES)
  }
})

test('structure: same text same ranks; an edit moves them; ties refuse rank1 exceeds rank2', () => {
  const a = decode('the the the cat sat on the mat')
  const b = decode('the the the cat sat on the mat')
  assert.equal(a.address, b.address)
  assert.deepEqual(a.ranks, b.ranks)
  assert.equal(a.ranks[0]!.word, 'the')
  const edited = decode('the the the cat cat cat sat on the mat')
  assert.notEqual(edited.address, a.address)
  assert.ok(edited.ranks.some((r) => r.word === 'cat' && r.count === 3))
  const tied = decode('aa aa bb bb')
  assert.equal(tied.ranks[0]!.count, tied.ranks[1]!.count)
  const facts = candidates(tied)
  const zipf = facts.find((f) => f.claim.startsWith('rank1 exceeds rank2'))
  assert.ok(zipf)
  assert.equal(zipf!.holds, false, 'tied top counts refuse the Zipf comparison')
  assert.equal(zipf!.shape, 'vacuous-on-corpus')
  assert.ok(facts.every((f) => !f.claim.startsWith('words/distinct')), 'the richness floor is occupancy, not a candidate')
  assert.deepEqual([...VACUOUS_ON_CORPUS], ['rank1 exceeds rank2', "commonest word is 'the'"])
})

test('structure: judge reports Zipf as vacuous when it holds on every probe', () => {
  const texts = [
    { id: 1, raw: 'the the the cat sat' },
    { id: 2, raw: 'the the dog ran far' },
    { id: 3, raw: 'the bird flew the sky the wind' },
  ]
  const probes = texts.map((t) => probeOfDecoding(decode(t.raw), t.id)).filter((p) => p !== null)
  assert.equal(probes.length, 3)
  const zipf = judge(probes).find((v) => v.fact === 'rank1 exceeds rank2')
  assert.ok(zipf)
  assert.equal(zipf!.held, probes.length)
  assert.equal(zipf!.discriminates, false)
})

