// Typography audit — the real typography frameworks vs the sealed Typesetting domain, as regression tests (was
// scratchpad typo-audit). The domain seals the INTEGER arithmetic of the Anglo-American DTP/PostScript/CSS point
// system, imposition, and the Pythagorean/Fibonacci page canons — and HONESTLY does not seal the frameworks built on
// IRRATIONAL or non-72 units (TeX's 72.27 pt, the Didot point, √2/φ ratios). A real audit names the gap; so do these
// tests. Each SEALED framework must RING its theorem (resonance); each GAP must be a genuine, checkable absence.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { reflects, THEOREMS } from '../index.js'

const key = (k: string) => THEOREMS.find((t) => t.key === k)
const rings = (query: string, k: string) => reflects(query).matches.some((m) => m.key === k)

test('the 13 sealed Typesetting details exist in the ledger', () => {
  for (const k of [
    'inch_is_seventytwo_points', 'em_en_and_thin', 'folio_quarto_octavo', 'signature_multiple_of_four',
    'page_diagonal_three_four_five', 'cassini_golden_page', 'van_de_graaf_margins',
    'leading_exceeds_type', 'baseline_grid_snaps_to_four', 'type_scale_octave', 'a_series_halving',
    'ream_is_five_hundred', 'recto_odd_verso_even',
  ]) assert.ok(key(k), `missing sealed theorem: ${k}`)
})

test('SEALED frameworks ring their gateway theorem (resonance)', () => {
  assert.ok(rings('PostScript PDF DTP point: 6 picas times 12 points is 72 points to the inch', 'inch_is_seventytwo_points'))
  assert.ok(rings('Van de Graaf canon sets margins in the ratio 2 to 3 to 4 to 6', 'van_de_graaf_margins'))
  assert.ok(rings('A ream is 500 sheets, 20 quires times 25 sheets', 'ream_is_five_hundred'))
  assert.ok(rings('A folio is 2 leaves, a quarto 8, an octavo 16', 'folio_quarto_octavo'))
})

test('GAP frameworks are a GENUINE absence — no sealed theorem carries their native unit', () => {
  // The honest boundary: uuidna seals the 72-point (bp) inch, NOT TeX's 72.27; and no theorem seals a font UPM.
  const statements = THEOREMS.map((t) => (t.statement || '') + ' ' + t.key).join(' ')
  assert.equal(/72\.27/.test(statements), false, 'TeX 72.27 pt is honestly unsealed (the GAP is real)')
  assert.equal(/2048|units per em|upm/i.test(statements), false, 'OpenType UPM is honestly unsealed')
})

test('DEMARCATED irrationals are marked, not sealed as rational', () => {
  // ISO 216 halving is sealed; the √2 ratio itself is demarcated irrational (never sealed as a fraction).
  assert.ok(key('a_series_halving'), 'the halving is sealed')
  const statements = THEOREMS.map((t) => t.statement || '').join(' ')
  assert.equal(/√2\s*=\s*\d/.test(statements), false, '√2 is never sealed as equal to a rational')
})
