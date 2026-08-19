// lead-shapes — which shape of stated number actually seals. Measured over the mined corpus 2026-08-19: 379
// leads from six public-domain texts produced ONE sealable item (Day's "45 degrees, or four points"), while
// standards produced seven theorems the same day. The difference is not the subject but the KIND of number: a
// narrative measurement is a claim about the world and has no decidable test, while a DEFINING constant is a
// convention — and a convention is what `by decide` can hold. The extractor now names all three.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractClaims } from '../books.js'

test('a defining constant is told apart from a narrative measurement', () => {
  const claims = extractClaims('The semi-major axis shall be exactly 6378137 metres, while the ark was three hundred cubits.')
  const kinds = Object.fromEntries(claims.map((c) => [c.kind, c]))
  assert.ok(kinds['defining-constant'], 'a constant fixed by convention must be recognised as such')
  assert.equal(kinds['defining-constant'].numbers[0], 6378137)
  assert.ok(kinds['measurement'], 'a narrative number is still mined, but as a different kind')
  assert.equal(kinds['measurement'].numbers[0], 300)
})

test('both phrasings of a definition are caught, before and after the number', () => {
  for (const text of ['defined as 299792458 metres', '1.380649 joules by definition', 'precisely 9192631770 seconds']) {
    const c = extractClaims(text).filter((x) => x.kind === 'defining-constant')
    assert.equal(c.length, 1, `not recognised as a definition: ${text}`)
  }
})

test('a bare number is NOT a defining constant — the words carry the claim', () => {
  const c = extractClaims('the tower stood 300 metres and the voyage took 60 days')
  assert.equal(c.filter((x) => x.kind === 'defining-constant').length, 0,
    'without a word fixing it by convention, a number is a measurement — treating it as a definition is the overclaim')
})

test('every lead carries the sentence that produced it — a number with no provenance is not a lead', () => {
  for (const c of extractClaims('The metre is defined as exactly 1650763.73 wavelengths of krypton.')) {
    assert.ok(c.sentence.length > 0)
    assert.match(c.address, /^[0-9a-f-]{36}$/)
  }
})
