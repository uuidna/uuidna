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
