import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseIvtff, profileOf, collisionOf, compareRates, letterShuffle, wordShuffle, relabel, substitutionInvariants, shuffledBy } from './index.js'

// a few EVA-shaped words; the ZL transcription itself is not committed (its licence is the transcriber's)
const SAMPLE = ['daiin', 'chol', 'chor', 'shol', 'daiin', 'qokeedy', 'chol', 'daiin', 'okaiin', 'chedy', 'qokedy', 'shedy']

test('IVTFF: comments and locus ids drop, alternatives keep the first reading, unreadable glyphs are counted', () => {
  const t = [
    '#=IVTFF Eva- 2.0',
    '<f1r>      <! $I=H $Q=A $P=A>',
    '<f1r.1,@P0>    fachys.ykal.ar.ata<!note>.dain,[o:a]ls?.shory',
    '<f1r.2,+P0>    kchsy.chy*s',
  ].join('\n')
  const p = parseIvtff(t)
  assert.deepEqual(p.words, ['fachys', 'ykal', 'ar', 'ata', 'dain', 'ols', 'shory', 'kchsy', 'chys'])
  assert.equal(p.unreadable, 2)
  assert.equal(p.lines, 3)
})

test('collision rates are exact and compare by cross-multiplication', () => {
  assert.deepEqual(collisionOf(['a', 'a', 'b']), { same: 2n, pairs: 6n })
  assert.equal(compareRates({ same: 1n, pairs: 3n }, { same: 2n, pairs: 6n }), 0)
  assert.equal(compareRates({ same: 1n, pairs: 4n }, { same: 1n, pairs: 3n }), -1)
})

test('a simple substitution leaves every collision count unchanged — the refutation of letter-for-letter readings', () => {
  const alphabet = [...new Set(SAMPLE.join(''))].sort()
  const map = new Map(alphabet.map((c, i) => [c, alphabet[(i + 5) % alphabet.length]!]))
  assert.equal(substitutionInvariants(SAMPLE, map).preserved, true)
})

test('the controls fire: shuffling letters moves the spelling structure, shuffling words moves the word order', () => {
  const base = profileOf(SAMPLE)
  assert.notDeepEqual(profileOf(letterShuffle(SAMPLE, 20260913)).bigram, base.bigram, 'a letter shuffle must be able to change bigram collisions, or the invariance above proves nothing')
  const repeated = ['a', 'b', 'a', 'b', 'a', 'b', 'c', 'd']
  assert.notDeepEqual(profileOf(wordShuffle(repeated, 7)).wordPair, profileOf(repeated).wordPair)
  assert.deepEqual(profileOf(wordShuffle(SAMPLE, 7)).bigram, base.bigram, 'word order cannot move a within-word count')
})

test('relabel refuses what is not a substitution', () => {
  assert.throws(() => relabel(['ab'], new Map([['a', 'x'], ['b', 'x']])), /not a bijection/)
  assert.throws(() => relabel(['ac'], new Map([['a', 'x']])), /no image/)
})

test('the shuffle is deterministic: one seed, one order, on every run', () => {
  assert.deepEqual(shuffledBy([1, 2, 3, 4, 5, 6], 42), shuffledBy([1, 2, 3, 4, 5, 6], 42))
  assert.notDeepEqual(shuffledBy([1, 2, 3, 4, 5, 6], 42), shuffledBy([1, 2, 3, 4, 5, 6], 43))
})
