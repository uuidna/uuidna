// book-words — THE READER HEARS WORDS, AND THE CONTROL CAN FAIL
//
// Three books on music, dance and singing — 143k words — read as ZERO decidable facts because the extractor
// demanded digits while books spell their arithmetic ("two and two make four"). The number-word fold existed the
// whole time (wordsToNumber, built for the KJV's cubits); the decidable grammar just never read through it. This
// file is that finding folded: every test states a claim in WORDS and demands the same verdict digits would get,
// and the control set includes a claim that must come back REFUTED — a reader that can only agree is not an
// instrument (the house law: give every finder a control that can fail).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractDecidable, extractClaims, wordsToNumber } from './index.js'

test('the spelled claim seals to the same theorem as the digit claim', () => {
  const spelled = extractDecidable('Two and two make four.')
  const digits = extractDecidable('2 + 2 = 4')
  assert.equal(spelled.length, 1, 'the word form is heard')
  assert.equal(spelled[0]!.verdict, 'VERIFIED')
  assert.equal(spelled[0]!.lean, 'theorem book_fact : 2 + 2 = 4 := by decide')
  assert.equal(spelled[0]!.lean, digits[0]!.lean, 'one claim, two spellings, one theorem')
  assert.equal(spelled[0]!.address, digits[0]!.address, 'and therefore one address')
})

test('word operands work across the operator vocabulary, total semantics included', () => {
  const facts = extractDecidable(
    'Two times three makes six. Ten minus twelve is zero-ish, but ten minus twelve is 0 exactly. Twelve over four is three.',
  )
  const leans = facts.map((f) => f.lean)
  assert.ok(leans.includes('theorem book_fact : 2 * 3 = 6 := by decide'))
  assert.ok(leans.includes('theorem book_fact : 10 - 12 = 0 := by decide'), 'truncated Nat subtraction verifies in words')
  assert.ok(leans.includes('theorem book_fact : 12 / 4 = 3 := by decide'))
  for (const f of facts) assert.equal(f.verdict, 'VERIFIED')
})

test('CONTROL — a wrong spelled sum is REFUTED, not skipped and not agreed with', () => {
  const facts = extractDecidable('Two and two make five.')
  assert.equal(facts.length, 1, 'the wrong claim is still heard')
  assert.equal(facts[0]!.verdict, 'REFUTED')
  assert.equal(facts[0]!.actual, 4, 'and corrected')
})

test('the compound guard still refuses fragments, in digits as before', () => {
  const facts = extractDecidable('5 times 5 minus 3 times 8 is 1')
  assert.equal(facts.length, 0, 'a sub-expression is never mis-verdicted')
})

test('extractClaims is reachable from the root surface and hears the books’ own units', () => {
  const claims = extractClaims(
    'The waltz has three beats in a measure. The whole movement is made in eight bars. ' +
    'The dance is performed by six men taking two steps. She held the phrase for two breaths.',
  )
  const byUnit = (u: string) => claims.find((c) => c.units.some((x) => x.toLowerCase().startsWith(u)))
  assert.ok(byUnit('beat'), 'three beats — heard')
  assert.equal(byUnit('beat')!.numbers[0], 3)
  assert.ok(byUnit('bar'), 'eight bars — heard')
  assert.equal(byUnit('bar')!.numbers[0], 8)
  assert.ok(byUnit('step'), 'two steps — heard')
  assert.ok(byUnit('breath'), 'two breaths — heard')
})

test('note values are units now — "two half notes" is a measurement with n = 2', () => {
  const claims = extractClaims('A whole note equals two half notes, and a half note equals two quarter notes.')
  const halves = claims.find((c) => c.units.some((u) => /half[\s-]+note/i.test(u)))
  assert.ok(halves, 'the half-note count is heard')
  assert.equal(halves!.numbers[0], 2)
})

test('wordsToNumber round-trips the forms books actually use', () => {
  assert.equal(wordsToNumber('two'), 2)
  assert.equal(wordsToNumber('twelve'), 12)
  assert.equal(wordsToNumber('two hundred and fifty'), 250)
  assert.equal(wordsToNumber('threescore'), 60)
  assert.equal(wordsToNumber('a few'), null, 'what the fold cannot read stays null, never guessed')
})
