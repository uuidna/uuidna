// unreached-modules — THREE MODULES NOTHING IMPORTED, EXERCISED SO THEY ARE VERIFIED RATHER THAN MERELY PRESENT.
//
// The leads gate held three research leads on 2026-09-07, each reading "an unreachable module — no root reaches
// it; nothing in the public API, the scripts, or the tests imports it", and each owing "wire it, or retire it".
// The gate's own words for why: a module nothing reaches is UNVERIFIED BY CONSTRUCTION. All three are wired here
// rather than retired, because each computes something the tree uses in prose or in a claim; what none of them had
// was a root that would notice if they stopped working.
//
// THEY SHARE A FILE ON PURPOSE, and the purpose is the lead rather than convenience: what they have in common is
// exactly that nothing reached them, so the fence against that recurring is one place a reader can find. Each gets
// a real exercise — a computed value with a property that could fail — not an import statement dressed as a test.
//
// TWO CORRECTIONS THIS FILE EXISTS TO RECORD, because both were me mistaking my own assumptions for the module's
// behaviour — the exact hazard of writing the first test a module has ever had.
//   1. `shorFactor(15)` threw the runtime's bigint-mixing TypeError, which read like a defect in an unreachable
//      module — the lead's own thesis, apparently confirmed. It was not, and the reason is a host fact: the
//      module declares `bigint` throughout and the runtime refuses to mix the two numeric types, so passing a
//      Number could only ever throw. `shorFactor(15n)` answers correctly. The broken thing was my call.
//   2. Then I asserted `factors` were `[3n, 5n]` IN ORDER. They are STRINGS, and `shorFactor(21n)` gives
//      ['7','3'] — not ascending. `factorsFromPeriod` likewise returns `{factors, reason}`, never a bare null.
//      So the assertions below are written from what the module RETURNS, checked by running it, not from what a
//      function of that name ought to return. A first test that encodes the author's expectation rather than the
//      subject's contract is how a module acquires a green that means nothing.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { families, collapses } from './law-collapse.js'
import { proseByWing } from './prose-completeness.js'
import { shorFactor, multiplicativeOrder, gcd, factorsFromPeriod } from './quantum/shor/index.js'

test('law-collapse finds families of restated theorems, and a family is more than one member', () => {
  const fams = families()
  assert.ok(fams.length > 0, 'the ledger restates enough shapes for at least one family to exist')
  for (const f of fams) {
    assert.ok(f.members.length > 1, `a family of one is not a family: ${f.shape}`)
    assert.match(f.shape, /#/, 'a shape carries at least one varying slot, or it is a single theorem')
  }
  const cs = collapses()
  assert.ok(Array.isArray(cs), 'collapses() answers over the same ledger')
})

test('prose-completeness scores every wing, and its percentages are percentages', () => {
  const rows = proseByWing()
  assert.ok(rows.length > 0, 'the ledger has wings to score')
  for (const r of rows) {
    assert.ok(r.theorems > 0, `${r.file} is scored, so it holds theorems`)
    for (const [k, v] of Object.entries(r)) {
      if (!k.endsWith('Pct')) continue
      assert.ok(typeof v === 'number' && v >= 0 && v <= 100, `${r.file}.${k} must be a percentage, got ${v}`)
    }
  }
})

test('shor factors 15 into 3 and 5, deterministically and with its rule stated', () => {
  const r = shorFactor(15n)
  // as a SET: the module does not promise ascending order, and shorFactor(21n) returns ['7','3']
  assert.deepEqual([...(r.factors ?? [])].map(String).sort(), ['3', '5'], 'the factors of fifteen')
  assert.equal(String(r.period), '4', 'the order of the chosen base modulo 15')
  assert.equal(multiplicativeOrder(2n, 15n), 4n, 'and the order agrees when asked directly, as a bigint')
  assert.match(r.baseRule, /least a/, 'the base is CHOSEN BY A STATED RULE, never drawn — this tree runs no RNG')
  assert.deepEqual(shorFactor(15n).factors, r.factors, 'and the same input gives the same answer')
})

test('THE CONTROL — these assertions can fail, on inputs where the answers differ', () => {
  // Without this, "factors of 15" could be satisfied by a function that returns [3n, 5n] for anything.
  const twentyOne = shorFactor(21n)
  assert.deepEqual([...(twentyOne.factors ?? [])].map(String).sort(), ['3', '7'],
    '21 is not 15 — the factoriser reads its input')
  assert.equal(gcd(12n, 18n), 6n)
  assert.notEqual(gcd(12n, 18n), 12n, 'and gcd is a gcd, not a first argument')
  // A NON-PERIOD MUST BE REFUSED WITH ITS REASON, never answered with an invented factor.
  const bad = factorsFromPeriod(15n, 2n, 3n)
  assert.equal(bad.factors, null, '3 is not the order of 2 mod 15, so there is no factor by this route')
  assert.match(bad.reason, /not a period/, 'and the refusal says WHY rather than returning an empty answer')
})
