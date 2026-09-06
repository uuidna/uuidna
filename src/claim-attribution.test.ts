import { test } from 'node:test'
import assert from 'node:assert/strict'
import { attributions, factSource, heldAs, captainOverClaimGaps } from './claim-attribution.js'
import claims from '../docs/captain-claims.json' with { type: 'json' }

// THE CENSUS IS NON-EMPTY. Every assertion below would also pass against an empty census — captainOverClaimGaps
// returns [] when it knows about nobody, which reads exactly like "no over-claims". This is the control: the
// instrument is shown able to see something before its silence is read as a verdict.
test('claim-attribution — the witness census actually carries rows', () => {
  const a = attributions()
  assert.ok(a.length > 0, 'the rosetta CLAIMS census is empty — every over-claim check below is vacuous')
  assert.ok(a.every((x) => x.key.length > 0 && x.source.length > 0), 'a row parsed to an empty key or source')
})

test('claim-attribution — a fact with a named source is held as formalisation only', () => {
  // Watson & Crick, Nature 1953. The captain wrote the Lean; he did not find base pairing.
  assert.equal(factSource('dna_base_pairing_involution'), '10.1038/171737a0')
  assert.equal(heldAs('dna_base_pairing_involution'), 'formalisation')
})

test('claim-attribution — an unattributed key defaults to the captain', () => {
  assert.equal(factSource('mul9_1_1'), '')
  assert.equal(heldAs('mul9_1_1'), 'discovery+formalisation')
})

// THE POSITIVE CONTROL. A finder that only ever returns [] is indistinguishable from a finder that cannot run.
// Handed the pre-fix shape — a claim with no attribution for a key the census names — it must report.
test('claim-attribution — the finder CATCHES an over-claim when one is present', () => {
  const gaps = captainOverClaimGaps([{ key: 'dna_base_pairing_involution' }])
  assert.equal(gaps.length, 1, 'the finder missed a row the census explicitly attributes elsewhere')
  assert.match(gaps[0], /10\.1038\/171737a0/)
})

test('claim-attribution — the shipped ledger over-claims nothing', () => {
  const gaps = captainOverClaimGaps(claims.claims_list)
  assert.deepEqual(gaps, [], 'docs/captain-claims.json claims a discovery a named source already holds')
})

test('claim-attribution — every attributed fact is still CLAIMED, as formalisation', () => {
  // The involution: the cure for over-claiming is not under-claiming. All 2658 stay claimed.
  const byKey = new Map(claims.claims_list.map((c) => [c.key, c]))
  for (const a of attributions()) {
    const row = byKey.get(a.key)
    assert.ok(row, `${a.key} vanished from the claims ledger — the fix surrendered a formalisation`)
    assert.equal(row.held, 'formalisation')
    assert.equal(row.factAttributedTo, a.source)
  }
  assert.equal(claims.total_claimed, claims.novelty_claimed + claims.formalisation_only)
})
