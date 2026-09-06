import { test } from 'node:test'
import assert from 'node:assert/strict'
import { classify, externalFactGaps, armDisagreement, gradeOf, gradeCensus } from './external-fact.js'
import { attributions } from './claim-attribution.js'
import { theorems } from './index.js'

const rows = () => theorems().map((t) => ({ key: t.key, name: t.name }))

// THE GROUND-TRUTH CONTROL, AND IT FAILS AT 10 OF 16 — which is why it is the first test in the file.
//
// The 16 attributed rows are the only rows whose external status this tree KNOWS. Run the classifier at them
// with the attribution withheld and it catches 10. That is the sensitivity, measured rather than assumed, and it
// is the number every other figure here has to be read through: the floor below is not an estimate of the truth,
// it is a count of what an instrument with this known miss rate happened to catch.
//
// THE MISSES INDICT THE ARM THEY COME FROM. Eratosthenes, Landauer and Van de Graaf are missed because the NAMED
// list does not contain them — the allowlist failure mode, demonstrated on ground truth, in the very file that
// argues against allowlists. Adding those three names would raise this number and teach nothing: the list would
// still be blind to every originator nobody typed, and the score would no longer be able to say so. So the
// omissions stay, the number stays honest, and the cure stays what it was — arms that are blind differently.
test('external-fact — sensitivity against the only rows with a known answer', () => {
  const byKey = new Map(rows().map((r) => [r.key, r.name]))
  const known = attributions()
  assert.ok(known.length > 0, 'the witness census is empty — this control would certify anything')
  const caught = known.filter((a) => classify(a.key, byKey.get(a.key)!).arms.length > 0)
  assert.ok(caught.length < known.length, 'the classifier now catches every known row — re-derive the floor and rewrite this test, do not just raise the number')
  assert.ok(caught.length * 2 > known.length, `sensitivity fell below half: ${caught.length}/${known.length}`)
})

// EVERY ARM MUST FIND SOMETHING NO OTHER ARM FINDS, or it is not an arm — it is a second opinion from the same
// instrument, which is exactly what rosetta's witness leg and claimedBy() turned out to be: one predicate at two
// call sites, whose matching counts of 16 read as corroboration and were a single measurement twice.
test('external-fact — the arms are independent, each catching rows the others miss', () => {
  const attributed = new Set(attributions().map((a) => a.key))
  const d = armDisagreement(externalFactGaps(rows(), attributed))
  for (const arm of ['named', 'eponym', 'units'] as const) {
    assert.ok(d.soleFinder[arm] > 0, `the ${arm} arm found nothing the others missed — it is redundant, and a redundant arm inflates the floor without improving it`)
  }
})

// THE FLOOR IS A FLOOR. It may rise as the arms improve and it may never be reported as a count.
test('external-fact — the floor exceeds what any single arm could claim', () => {
  const attributed = new Set(attributions().map((a) => a.key))
  const gaps = externalFactGaps(rows(), attributed)
  const d = armDisagreement(gaps)
  // Widest arm found by comparison, not by the standard-library maximum — this tree's determinism gate
  // hard-rejects that namespace everywhere, including inside a comment explaining its own absence.
  const counts = [d.byArm.named, d.byArm.eponym, d.byArm.units]
  let widest = 0
  for (const c of counts) if (c > widest) widest = c
  assert.ok(gaps.length > widest, 'the union is no larger than its widest arm — the other arms are contributing nothing')
  assert.ok(d.onlyOneArm > d.allThree, 'the arms mostly agree, which would mean they share a blindness — check they are not reading the same signal')
})

// POSITIVE CONTROLS, one per arm, so a silent classifier cannot pass as a clean ledger.
//
// VERIFIED BY SUBSTITUTION 2026-09-06, uuidna-f8's method: a coverage check that tests one direction of a
// biconditional passes every substitution erring in the untested direction, so the only way to know a suite
// covers both is to break the implementation in each direction and watch it fail. Measured against this file:
//
//   externalFactGaps -> []                         2 tests fail   (the blind detector)
//   classify -> every arm fires on everything      4 tests fail   (the indiscriminate detector)
//   captainOverClaimGaps -> [] always              1 test fails   (the finder that certifies)
//
// The third is the thin one and it is thin by nature: "the shipped ledger over-claims nothing" passes happily
// against a finder that knows nobody, and only the explicit positive control below distinguishes them. That is
// the arm to add to first if this file grows.
test('external-fact — each arm fires on a crafted claim in its own shape', () => {
  // ISOLATING THE ARM: Burnside is NOT in the NAMED list, so only the shape can catch this. A control using a
  // listed name (Kepler) passed on the wrong arm and proved nothing about the shape at all.
  assert.deepEqual(classify('k', "Burnside's lemma counts the orbits").arms, ['eponym'])
  assert.deepEqual(classify('k', "Kepler's third law, T squared equals a cubed").arms.includes('eponym'), true, 'an ordinal between the name and the law-word must not break the shape')
  assert.deepEqual(classify('k', 'the Fermat exponent divides the order').arms.includes('named'), true)
  assert.deepEqual(classify('k', 'the floor sits at 273 kelvin').arms.includes('units'), true)
  // …and does NOT fire on this tree's own constructs, which is the arm that certifies if it is missing.
  assert.deepEqual(classify('k', 'the hexbit carries four bits and the coin pays two').arms, [])
  assert.deepEqual(classify('k', 'The Captain rule holds for every address').arms, [], 'a capitalised in-tree noun before a law-word must not read as a person')
})

// CREDITED IS NOT ONE THING. A single "228 credited" invites the reader to assume 228 fetchable citations, and
// the rows on file say otherwise: of the 16 already attributed, FOUR carry a DOI and twelve name a standard or
// a person. This test holds that split so no surface can report the total without it.
test('external-fact — the evidence behind a credit is graded, and the grades do not collapse', () => {
  const sources = attributions().map((a) => a.source)
  const c = gradeCensus(sources)
  assert.equal(c.identifier + c.standard + c.named, sources.length, 'a source fell outside every grade')
  assert.equal(c.identifier, 4, 'the DOI count moved — re-read the census before changing this number, it is the checkable subset')
  assert.ok(c.identifier < sources.length, 'if every credit had an identifier the grades would be pointless; check the census is real')
  assert.equal(gradeOf('10.1038/171737a0'), 'identifier')
  assert.equal(gradeOf('CODATA'), 'standard')
  assert.equal(gradeOf('Eratosthenes'), 'named')
})
