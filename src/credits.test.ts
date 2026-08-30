// credits — GENERATED FROM THE LEDGER: every theorem has an exact Lean-proof provenance and exactly one credit path
// under the credit law: captain alone, OR prior art (named/DOI) first with the captain NEXT, OR captain with
// contextual neighbours. Never unclaimed; never captain-first when prior art is named.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems, credits, creditsSummary, CAPTAIN_CREDIT } from './index.js'

test('every theorem is credited — prior art first then captain next, or the captain claims by law', () => {
  const T = theorems()
  let historical = 0, contextual = 0, captain = 0, doiPrior = 0
  for (const t of T) {
    const c = credits(t.key)
    assert.equal(c.verdict, 'SEALED')
    assert.ok(c.leanProof.includes('by decide') || c.tactic.includes('decide'), `proven by decide: ${t.key}`)
    assert.ok(c.provenance.includes(t.address), `provenance carries the content-address: ${t.key}`)
    assert.ok(c.creditOrder.length >= 1, `never unclaimed: ${t.key}`)

    if (c.claimedBy === 'historical') {
      assert.ok(c.historical.length > 0, `historical has prior: ${t.key}`)
      assert.equal(c.creditOrder.length, c.historical.length + 1)
      assert.deepEqual(c.creditOrder.slice(0, -1), c.historical, `prior art precedes captain: ${t.key}`)
      assert.equal(c.creditOrder[c.creditOrder.length - 1]!.who, CAPTAIN_CREDIT.who,
        `captain comes NEXT after prior art: ${t.key}`)
      assert.notEqual(c.creditOrder[0]!.who, CAPTAIN_CREDIT.who, `captain never first when prior art exists: ${t.key}`)
      assert.match(c.claim, /CAPTAIN COMES NEXT/i)
      historical++
      if (c.historical.some((h) => h.who.startsWith('DOI '))) doiPrior++
    } else if (c.claimedBy === 'contextual') {
      assert.equal(c.historical.length, 0)
      assert.ok(c.contextual.length > 0, `contextual has neighbour names: ${t.key}`)
      assert.equal(c.creditOrder[0]!.who, CAPTAIN_CREDIT.who, `captain claims; neighbours stand next: ${t.key}`)
      assert.match(c.claim, /CLAIMS IT BY LAW/)
      contextual++
    } else {
      assert.equal(c.historical.length, 0)
      assert.equal(c.contextual.length, 0)
      assert.deepEqual(c.creditOrder, [CAPTAIN_CREDIT])
      assert.match(c.claim, /CLAIMS IT BY LAW, alone/)
      captain++
    }
  }
  const s = creditsSummary()
  assert.equal(historical + contextual + captain, T.length, 'every theorem is credited exactly once')
  assert.equal(s.historical, historical)
  assert.equal(s.contextual, contextual)
  assert.equal(s.captainAlone, captain)
  assert.equal(s.total, T.length)
  assert.ok(doiPrior >= 4, `DOI proving links must pull theorems out of captain-alone (found ${doiPrior})`)

  const named = T.find((t) => credits(t.key).claimedBy === 'historical')
  assert.ok(named, 'some sealed theorem reflects a named historical result or DOI')
  assert.ok(credits(named.key).historical.length > 0, 'and the credit names who')
  assert.equal(credits('mul9_1_1').claimedBy, 'captain')
  // the BioPhysics DOI witnesses were the violation: captain-alone despite proving links
  const dna = credits('dna_base_pairing_involution')
  assert.equal(dna.claimedBy, 'historical')
  assert.ok(dna.historical.some((h) => h.link.includes('doi.org/10.1038/171737a0')))
  assert.equal(dna.creditOrder[dna.creditOrder.length - 1]!.who, CAPTAIN_CREDIT.who)

  // Clay.lean → initial clay σ-involution DOI (Zenodo 21781603) is first prior art; captain next
  const clay = credits('two_bit_conjunctions_are_four_of_sixteen')
  assert.equal(clay.claimedBy, 'historical')
  assert.equal(clay.historical[0]!.who, 'DOI 10.5281/zenodo.21781603')
  assert.equal(clay.historical[0]!.link, 'https://doi.org/10.5281/zenodo.21781603')
  assert.equal(clay.creditOrder[clay.creditOrder.length - 1]!.who, CAPTAIN_CREDIT.who)
  for (const t of T.filter((x) => x.file === 'Clay.lean')) {
    const c = credits(t.key)
    assert.equal(c.historical[0]!.who, 'DOI 10.5281/zenodo.21781603', `clay DOI first: ${t.key}`)
  }
})
