import { test } from 'node:test'
import assert from 'node:assert/strict'
import { displayGaps, homoglyphCensus } from './index.js'

test('the address separates EVERY display-gap class', () => {
  // The defence is not a filter that must anticipate each trick — it is the addressing, which anticipates none.
  for (const g of displayGaps()) {
    assert.equal(g.addressesDiffer, true, `${g.kind}: two texts a reader cannot tell apart must not share an address`)
  }
})

test('a scrub reaches ONE class of four — the comfortable assumption is wrong', () => {
  // I would have said the scrub was the defence. Measured: it collapses the bidi case and cannot touch
  // zero-width, non-breaking space, or homoglyphs — by construction, since a Cyrillic letter is legitimate text
  // in the Unicode standard and no filter
  // may remove it. The scrub protects the reader; the address protects the record; neither replaces the other.
  const c = homoglyphCensus()
  assert.equal(c.caughtByAddress, c.gaps.length)
  assert.ok(c.caughtByScrub < c.caughtByAddress, 'if a scrub caught everything, the address would be redundant — it does not')
  assert.ok(c.caughtByScrub >= 1, 'and it does catch the bidi class, which is why sanitize.ts is still worth running')
})

test('homoglyphs specifically survive scrubbing and are caught only by address', () => {
  const homo = displayGaps().find((g) => g.kind === 'cyrillic homoglyph')!
  assert.equal(homo.scrubCollapses, false, 'a legitimate letter cannot be filtered away')
  assert.equal(homo.addressesDiffer, true, 'so the address is the only thing separating paypal from pаypal')
})

test('the census says what it does NOT establish', () => {
  assert.match(homoglyphCensus().honest, /does not say WHICH rendering is honest/)
})
