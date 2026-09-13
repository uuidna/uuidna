// theology — the rank rule derives every value, three published counts check the instrument, and the control shows a
// shared value is blind to order while the lattice station is not.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { NUMERAL_ORDER, rankValueOf, lettersOf, numeralValueOf, readingOf } from './index.js'

test('the rank rule derives every letter value from its numeral position', () => {
  assert.deepEqual(Object.fromEntries(Object.entries(NUMERAL_ORDER).map(([s, o]) => [s, [...o].length])), { hebrew: 22, greek: 27, arabic: 28 })
  assert.equal(rankValueOf(0), 1)
  assert.equal(rankValueOf(9), 10)
  assert.equal(rankValueOf(18), 100)
  assert.equal(rankValueOf(21), 400, 'tav, the last Hebrew letter, is 400')
  assert.equal(rankValueOf(26), 900, 'sampi, the last Greek numeral sign, is 900')
  assert.equal(rankValueOf(27), 1000, 'ghayn, the last abjad letter, is 1000')
})

// Three values published by the traditions themselves, none computed here, so the instrument can fail against them.
test('three published counts: Genesis 1:1 is 2701, the Bismillah is 786, Iesous is 888', () => {
  assert.equal(numeralValueOf('<big>בְּ</big>רֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃', 'hebrew'), 2701)
  assert.equal(numeralValueOf('بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ', 'arabic'), 786)
  assert.equal(numeralValueOf('Ἰησοῦς', 'greek'), 888)
})

test('marks, markup and letters of other scripts are not counted', () => {
  assert.equal(numeralValueOf('', 'hebrew'), 0)
  assert.deepEqual(lettersOf('In the beginning', 'hebrew'), [], 'Latin letters carry no Hebrew value')
  assert.equal(numeralValueOf('ם', 'hebrew'), numeralValueOf('מ', 'hebrew'), 'a final form counts as its base letter')
})

test('CONTROL: the sorted letters keep the value and move the station, so a station is identity, not meaning', () => {
  const r = readingOf('בראשית ברא אלהים את השמים ואת הארץ', 'hebrew')
  assert.equal(r.value, 2701)
  assert.equal(r.control.value, r.value, 'gematria_ignores_order: an anagram carries the same value')
  assert.notEqual(r.control.station, r.station, 'while the address, and so the station, follows the order of the letters')
  assert.match(r.station, /^[0-9a-f]{4}$/)
  assert.deepEqual(readingOf('בראשית ברא אלהים את השמים ואת הארץ', 'hebrew'), r, 'the reading is deterministic')
})
