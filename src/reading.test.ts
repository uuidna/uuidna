// reading — the aspects beyond arithmetic, and the two disciplines they carry.
//
// Every test below asserts one of three things: that an aspect DISCRIMINATES (two texts it should separate get
// different numbers), that it REFUSES (a text it cannot read returns `unread` WITH a reason rather than a zero),
// or that it reports its own DENOMINATOR. The middle one is the important one: an instrument that cannot fail
// cannot be trusted when it passes, and an instrument whose silence is indistinguishable from its success is the
// defect this module exists to avoid.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  ASPECTS, readingOf, structure, script, prosody, dialogue, morphology, readability, provenance,
} from './reading/index.js'

const VERSE = ['Tyger Tyger burning bright', 'In the forests of the night', 'What immortal hand or eye',
  'Could frame thy fearful symmetry'].join('\n')
const PROSE = 'It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith slipped quickly through the glass doors, though not quickly enough to prevent a swirl of gritty dust from entering along with him.'

test('every aspect answers, and no aspect is silently dropped', () => {
  const r = readingOf(PROSE)
  assert.equal(r.aspects.length, ASPECTS.length)
  assert.deepEqual(r.aspects.map((a) => a.name), [...ASPECTS])
  for (const a of r.aspects) {
    assert.ok(a.verdict === 'read' || a.verdict === 'unread', `${a.name} returned no verdict`)
    if (a.verdict === 'unread') assert.ok(a.reason && a.reason.length > 0, `${a.name} is unread with no reason`)
    else assert.equal(a.reason, undefined, `${a.name} is read but carries a refusal reason`)
  }
})

test('the reading reports its own coverage as integers, never a division', () => {
  const r = readingOf(PROSE)
  const read = r.aspects.filter((a) => a.verdict === 'read').length
  assert.equal(r.covered.num, read)
  assert.equal(r.covered.den, r.aspects.length)
  assert.ok(r.covered.num <= r.covered.den)
})

test('AN ASPECT THAT COULD NOT LOOK SAYS SO — refusal is never a zero', () => {
  // one line: divisions are not zero, they are unreadable
  const s = structure('a single line with no break at all')
  assert.equal(s.verdict, 'unread')
  assert.match(s.reason!, /no line break/)
  assert.deepEqual(s.evidence, {})

  // three lines cannot repeat a measure
  const p = prosody('one\ntwo\nthree')
  assert.equal(p.verdict, 'unread')
  assert.match(p.reason!, /four/)

  // no speech mark this reader knows
  const d = dialogue('Plain narration carrying no marked speech whatsoever.')
  assert.equal(d.verdict, 'unread')

  // a short text cannot fill the readability window
  const rd = readability(PROSE)
  assert.equal(rd.verdict, 'unread')
  assert.match(rd.reason!, /tokens/)
})

test('PROVENANCE REFUSES TO GUESS — bytes cannot testify to their own source', () => {
  const none = provenance(PROSE)
  assert.equal(none.verdict, 'unread')
  assert.equal(none.examined, 0, 'a refusal that examined nothing must say it examined nothing')
  assert.match(none.reason!, /will not guess/)

  const given = provenance(PROSE, { source: 'gutenberg:1342', licence: 'public-domain', retrieved: '2026-08-25' })
  assert.equal(given.verdict, 'read')
  assert.equal(given.evidence.licence, 'public-domain')
})

test('PROSODY SEPARATES VERSE FROM PROSE — the aspect a bag of words cannot reach', () => {
  const v = prosody(VERSE)
  assert.equal(v.verdict, 'read')
  // the same words as prose would give one long line; as verse they repeat a measure
  assert.equal(v.evidence.lines, 4)
  assert.ok((v.evidence.atThatMeasureNum as number) >= 2, 'verse must repeat its commonest measure')
  // WHAT THE ASPECT CLAIMS is repetition of a measure — not that Blake's tetrameter survives a vowel-group
  // count, which it does not: counting `y` as a vowel scatters those four lines across several measures, and
  // asserting otherwise would be testing a theory of the syllable this reader explicitly does not hold.
  // So the discrimination is tested on the claim itself: a text that repeats one measure against one that does not.
  const measured = prosody(['na na na na', 'la la la la', 'ba ba ba ba', 'ta ta ta ta'].join('\n'))
  // consonant-separated, because the measure counts vowel GROUPS: 'aeoi' is one group, not four
  const scattered = prosody(['ba', 'ba be', 'ba be bo', 'ba be bo bi', 'ba be bo bi bu',
    'ba be bo bi bu da', 'ba be bo bi bu da de'].join('\n'))
  assert.equal(measured.evidence.distinctMeasures, 1, 'a repeated measure is one measure')
  assert.equal(measured.evidence.atThatMeasureNum, 4)
  assert.equal(scattered.evidence.distinctMeasures, 7, 'a scattered text repeats nothing')
  assert.ok((measured.evidence.atThatMeasureNum as number) > (scattered.evidence.atThatMeasureNum as number))
})

test('SCRIPT counts by Unicode block, so it is right about languages it has never heard of', () => {
  const mixed = script('England и България, Ελλάδα')
  assert.equal(mixed.verdict, 'read')
  assert.equal(mixed.evidence.scripts, 3)
  assert.ok((mixed.evidence.latin as number) > 0)
  assert.ok((mixed.evidence.cyrillic as number) > 0)
  assert.ok((mixed.evidence.greek as number) > 0)
  assert.equal(script('12345 …').verdict, 'unread')
})

test('MORPHOLOGY sees hapax legomena, which a distinct-count hides', () => {
  // identical type and token counts, different hapax shape
  const a = morphology('alpha beta gamma delta')          // 4 tokens, 4 types, 4 hapax
  const b = morphology('alpha alpha beta beta gamma delta') // 6 tokens, 4 types, 2 hapax
  assert.equal(a.evidence.types, b.evidence.types)
  assert.notEqual(a.evidence.hapax, b.evidence.hapax)
  assert.equal(a.evidence.hapax, 4)
  assert.equal(b.evidence.hapax, 2)
})

test('STRUCTURE sees the tree a bag of words cannot — headings decided by shape, not a word list', () => {
  const book = ['CHAPTER I', '', 'The opening paragraph runs here.', '', 'ГЛАВА II', '', 'And another paragraph.'].join('\n')
  const s = structure(book)
  assert.equal(s.verdict, 'read')
  assert.equal(s.evidence.headings, 4, 'short lines standing alone between blanks, in any script')
  assert.equal(s.evidence.paragraphs, 4)
})

test('DIALOGUE counts speech by its own marks, and reports an unbalanced edition rather than repairing it', () => {
  const balanced = dialogue('He said "yes" and she said "no".')
  assert.equal(balanced.verdict, 'read')
  assert.equal(balanced.evidence.balanced, 1)
  const dashes = dialogue('— Добър ден.\n— Добър ден.')
  assert.equal(dashes.verdict, 'read')
  assert.equal(dashes.evidence.dashTurns, 2)
})

test('EVERY ASPECT CARRIES ITS OWN DENOMINATOR — a reader that read a fraction cannot look like one that read all', () => {
  const long = (PROSE + '\n').repeat(40)
  const r = readingOf(long, { source: 'test', licence: 'public-domain', retrieved: '2026-08-25' })
  const rd = r.aspects.find((a) => a.name === 'readability')!
  assert.equal(rd.verdict, 'read')
  assert.ok(rd.examined > 0 && rd.examined < long.length,
    'readability inspects a window, so its denominator must be smaller than the whole text')
  for (const a of r.aspects) assert.ok(a.examined >= 0 && a.examined <= long.length)
})

test('the reading is bound to the exact bytes — change one word and the address moves', () => {
  const a = readingOf(PROSE)
  const b = readingOf(PROSE.replace('thirteen', 'fourteen'))
  assert.notEqual(a.address, b.address)
  assert.equal(a.chars, b.chars)  // same length, different content: the address is what separates them
})
