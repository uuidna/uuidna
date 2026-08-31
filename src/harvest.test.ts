import { test } from 'node:test'
import assert from 'node:assert/strict'
import { harvestFragments, fragmentToLean, keyFromFragment, mintLeadsFromText } from './index.js'

test('harvestFragments finds arithmetic equalities', () => {
  const f = harvestFragments('CrossRef DOI 10.1/2: arXiv note says 11 * 13 = 143 in the abstract')
  assert.ok(f.some((x) => x.includes('11') && x.includes('143')))
})

test('fragmentToLean shapes propositions for the kernel', () => {
  assert.equal(fragmentToLean('11*13=143'), '(11 * 13 = 143)')
  assert.equal(fragmentToLean('2**10=1024'), '(2 ^ 10 = 1024)')
})

test('keyFromFragment is lawful and deterministic', () => {
  const k = keyFromFragment('11*13=143')
  assert.match(k, /^api_[a-f0-9]{8}$/)
  assert.equal(k, keyFromFragment('11*13=143'))
})

test('mintLeadsFromText mints decided TRUE fragments not yet sealed', () => {
  const leads = mintLeadsFromText('test', 'addr', 'probe 11 * 13 = 143 and 2 + 2 = 4')
  assert.ok(leads.length >= 1)
  for (const l of leads) {
    assert.ok(l.lean.endsWith(':= by decide'))
    assert.ok(l.why.includes('FREE MINT'))
  }
})

// THE FINDER FOR THE 79 (2026-08-31). The Alpine port census walked 28,635 packages and proposed 79 theorems;
// the conveyor refused all 79 as bare literals, every one a digit read out of a package name. decide() had
// confirmed each of them TRUE, which is exactly why truth is the wrong gate: `5 = 5` is true and empty.
test('CONTROL — a bare-literal fragment is NOT minted, however true decide() finds it', () => {
  // "attica5-dev" is the real sample the census reported: ARITH_FRAG's second alternative permits ZERO operators.
  const vacuous = mintLeadsFromText('alpine', 'attica5-dev', 'attica5-dev 5=5 and 41=41')
  assert.equal(vacuous.length, 0, 'a comparison of two literals carries no algebra and must never reach the door')
})

test('a fragment with REAL algebra is still minted — the filter refuses the empty, not the new', () => {
  // 37*41 and NOT 11*13: the latter is already a sealed theorem, so decide() answers sealed-theorem rather than
  // decided-arithmetic and the mint skips it for a different and equally correct reason. A positive control has
  // to be able to pass — picking an example the ledger already holds would prove nothing about the new filter.
  const real = mintLeadsFromText('alpine', 'pkg', 'the note records 37 * 41 = 1517 exactly')
  assert.ok(real.some((l) => l.lean.includes('37 * 41 = 1517')), 'arithmetic that says something still mints')
})
