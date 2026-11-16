// references — the per-wing source count (uuidna_sources), driven in both directions with constructed rows, so the
// counter is seen to count a resolved source, to refuse one the registry never resolved, and to leave silent prose
// silent. The live count is the door's; this file fixes what the door may call resolvable.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { identifiersIn, sourcesByWing } from './references.js'
import { sourced } from './scripts/lean-gen.js'

test('a standard named by its number reads as the DOI its publisher registered', () => {
  assert.deepEqual(identifiersIn('ChaCha20-Poly1305 (RFC 8439) and SHA-256 (FIPS 180-4)'), ['10.17487/RFC8439', '10.6028/NIST.FIPS.180-4'])
  assert.deepEqual(identifiersIn('IP is RFC 791'), ['10.17487/RFC0791'])
  // a DOI closing a sentence keeps its suffix and loses the full stop; a repeat is read once
  assert.deepEqual(identifiersIn('witness: DOI 10.1038/171737a0. Again 10.1038/171737a0'), ['10.1038/171737a0'])
  // lower-case rfc in a key or a word is not a citation
  assert.deepEqual(identifiersIn('fam_jitter_rfc3550estimate and ISO 100 film'), [])
})

test('the generator states a source in the form the reader reads back, and leaves unsourced prose byte for byte', () => {
  const p = 'E = mc², so masses [1,2,3] carry rest energies [9,18,27].'
  assert.equal(sourced(p), p)
  assert.equal(sourced(p, []), p)
  const s = sourced(p, ['10.1002/andp.19053231314', '10.1088/0026-1394/19/4/004'])
  assert.equal(s, p + ' Source: DOI 10.1002/andp.19053231314; DOI 10.1088/0026-1394/19/4/004.')
  assert.deepEqual(identifiersIn(s), ['10.1002/andp.19053231314', '10.1088/0026-1394/19/4/004'])
})

test('a row counts as resolvable only when the registry resolved what it names', () => {
  const rows = [
    { file: 'A.lean', name: sourced('cited and resolved', ['10.1038/171737a0']) },
    { file: 'A.lean', name: sourced('cited, never resolved', ['10.9999/nothing']) },
    { file: 'A.lean', name: 'names nothing' },
    { file: 'B.lean', name: 'the nonce is 96 bits (RFC 8439)' },
  ]
  const resolved = new Set(['10.1038/171737a0', '10.17487/rfc8439'])
  const [a, b] = [sourcesByWing(rows, resolved).find((w) => w.wing === 'A.lean')!, sourcesByWing(rows, resolved).find((w) => w.wing === 'B.lean')!]
  assert.deepEqual([a.theorems, a.resolvable, a.unresolved, a.unsourced], [3, 1, 1, 1])
  assert.deepEqual(a.dois, ['10.1038/171737a0'])
  assert.deepEqual(a.unresolvedDois, ['10.9999/nothing'])
  assert.deepEqual([b.resolvable, b.dois], [1, ['10.17487/RFC8439']])
  // the control: with nothing resolved, the same rows count no resolvable source at all
  assert.equal(sourcesByWing(rows, new Set()).reduce((s, w) => s + w.resolvable, 0), 0)
})
