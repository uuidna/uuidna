// apa — references derived from the structure, tested with an instrument that can fail.
//
// The properties: names initialise without being reordered (the archival record already stores them APA-first),
// the author list joins by APA's own rules at one, two and three, a missing date renders (n.d.) rather than a
// guessed year, and a theorem cites with its CONTENT-ADDRESS where a page number would stand.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { apaName, apaAuthors, apaYear, apaWork, apaTheorem, apaInText, apaReferences, type WorkFacts } from './apa.js'

const work: WorkFacts = {
  creators: ['Rouschev, Tsvetan'],
  name: 'uuidna',
  version: '0.2.8',
  year: '2026',
  url: 'https://github.com/uuidna/uuidna',
}

test('a name stored surname-first is INITIALISED, not reordered', () => {
  // .zenodo.json already holds "Rouschev, Tsvetan" — APA's own order — so the derivation initialises and stops.
  // Reordering a name that is already correct is how a "helpful" formatter corrupts a bibliography.
  assert.equal(apaName('Rouschev, Tsvetan'), 'Rouschev, T.')
  assert.equal(apaName('Ivanov, Georgi Petrov'), 'Ivanov, G. P.', 'every given name initialises')
})

test('a GROUP author is left whole — an organisation has no initials', () => {
  // No comma means no given name, which means this is not a person. APA leaves group authors intact, and a
  // formatter that initialised them would turn "uuidna Project" into something that cites nobody.
  assert.equal(apaName('uuidna Project'), 'uuidna Project')
})

test('the author list joins by APA\'s rules at one, two and three', () => {
  assert.equal(apaAuthors(['Rouschev, Tsvetan']), 'Rouschev, T.')
  assert.equal(apaAuthors(['Rouschev, Tsvetan', 'Ivanov, Georgi']), 'Rouschev, T. & Ivanov, G.')
  assert.equal(apaAuthors(['Rouschev, Tsvetan', 'Ivanov, Georgi', 'Petrov, Maria']),
    'Rouschev, T., Ivanov, G., & Petrov, M.', 'three or more take the serial comma before the ampersand')
  assert.equal(apaAuthors([]), '', 'no creators is empty, not a fabricated author')
})

test('an unknown date renders (n.d.) — APA\'s own answer, never the current year', () => {
  // THE ONE PLACE A CLOCK WOULD BE TEMPTING. If no release tag names the version, the year is not known, and
  // substituting today's year produces a reference that reads complete while resting on nothing — the same shape
  // as a witness whose denominator is short. APA already supplies the third value, so this uses it.
  assert.equal(apaYear('2026'), '2026')
  assert.equal(apaYear(null), 'n.d.')
  assert.match(apaWork({ ...work, year: null }), /\(n\.d\.\)/)
  assert.doesNotMatch(apaWork({ ...work, year: null }), /\(20\d\d\)/, 'no year is invented in place of the missing one')
})

test('the work renders as APA software — version and [Computer software] both present', () => {
  const ref = apaWork(work)
  assert.equal(ref, 'Rouschev, T. (2026). uuidna (Version 0.2.8) [Computer software]. https://github.com/uuidna/uuidna')
})

test('a theorem cites with its CONTENT-ADDRESS where a page number would stand', () => {
  // A page number tells a reader where to look. A content-address lets them RECOMPUTE what they find, which is
  // the stronger locator and the one this ledger can actually offer.
  const ref = apaTheorem({ key: 'two_coins', file: 'Coins.lean', address: '453bbf7e-6abf-8264-b355-7c73f43cd710' }, work)
  assert.match(ref, /two_coins \[Sealed theorem\]/)
  assert.match(ref, /In uuidna \(Version 0\.2\.8\)/)
  assert.match(ref, /Coins\.lean/)
  assert.match(ref, /453bbf7e-6abf-8264-b355-7c73f43cd710$/, 'the address is the locator, and it ends the reference')
})

test('the in-text form names the surname, and a specific proof by its key', () => {
  assert.equal(apaInText(work), '(Rouschev, 2026)')
  assert.equal(apaInText(work, 'two_coins'), '(Rouschev, 2026, two_coins)')
  assert.equal(apaInText({ ...work, year: null }), '(Rouschev, n.d.)')
})

test('the reference list leads with the work, sorts by key, and dedupes', () => {
  const t = (key: string) => ({ key, file: 'X.lean', address: 'a-' + key })
  const refs = apaReferences([t('zebra'), t('alpha'), t('zebra'), t('mid')], work)
  assert.equal(refs.length, 4, 'the work plus three DISTINCT theorems — one cited twice is one reference')
  assert.match(refs[0]!, /\[Computer software\]/, 'the work itself leads the list')
  // the key is read back with the pattern that DEFINES it in the rendered form, not by counting separators —
  // the first version of this assertion split on ') ' and landed inside "(Version 0.2.8) [Computer software]",
  // so it failed while the code was correct. A test that parses by position is testing its own arithmetic.
  const keyOf = (r: string): string => /\. (\S+) \[Sealed theorem\]/.exec(r)?.[1] ?? ''
  assert.deepEqual(refs.slice(1).map(keyOf), ['alpha', 'mid', 'zebra'],
    'and the theorems are alphabetised by the locator that identifies them, so the order is computed not chosen')
})
