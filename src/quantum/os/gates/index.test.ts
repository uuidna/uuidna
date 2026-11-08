// gates — the registry holds, and the grading has a control: a search engine with AI can never read as a standards gate.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  RESEARCH_GATES, RESEARCH_PROFILE, researchGates, gatesHolds, researchEnvironment, environmentHolds, gradeOfGate, standardsGraded,
} from './index.js'

test('the gates registry holds and its receipt recomputes', () => {
  const r = researchGates()
  assert.equal(r.count, RESEARCH_GATES.length)
  assert.equal(gatesHolds(r), true)
  assert.equal(r.gates.filter((g) => g.standards).length, r.standardsGraded)
  assert.equal(Object.values(r.byKind).reduce((a, b) => a + b, 0), r.count)
  assert.equal(Object.values(r.byAccess).reduce((a, b) => a + b, 0), r.count)
})

test('every keyed gate names the key the owner sets, and no keyless gate names one', () => {
  const r = researchGates()
  for (const g of r.gates) {
    if (g.access === 'owner-key') assert.ok(g.key && g.key.length > 0, `${g.id} needs a key name`)
    else assert.equal(g.key, undefined, `${g.id} is not keyed`)
  }
  assert.ok(r.ownerKeys.includes('GOOGLE_CSE_KEY'))
  assert.equal(new Set(r.ownerKeys).size, r.ownerKeys.length)
})

test('CONTROL — the standards grade comes from the credit classifier, never from the kind', () => {
  const r = researchGates()
  const nist = r.gates.find((g) => g.id === 'nist-codata-constants')!
  const iso = r.gates.find((g) => g.id === 'iso-obp')!
  const google = r.gates.find((g) => g.id === 'google-programmable-search')!
  const gemini = r.gates.find((g) => g.id === 'google-gemini-grounded')!
  const crossref = r.gates.find((g) => g.id === 'crossref-works')!
  assert.equal(nist.grade, 'standard')
  assert.equal(iso.grade, 'standard')
  assert.equal(crossref.grade, 'identifier')
  assert.equal(google.grade, 'named')
  assert.equal(gemini.grade, 'named')
  assert.equal(standardsGraded(google), false, 'a search engine finds, it certifies nothing')
  // the control proper: relabel Google as a standards gate and the grade still says named
  assert.equal(gradeOfGate({ ...google, kind: 'standards' }), 'named')
  // and a body the classifier does not know grades named even when it serves no DOI
  assert.equal(gradeOfGate({ ...nist, body: 'Acme Standards Ltd' }), 'named')
})

test('the research environment ports from the catalogue or honestly ports nothing', () => {
  const e = researchEnvironment()
  assert.equal(e.asked, RESEARCH_PROFILE.length)
  assert.equal(environmentHolds(e), true)
  if (e.measured) assert.ok(e.ported > 0, 'a present catalogue ports at least one of the asked packages')
  else assert.equal(e.ported, 0)
  assert.equal(e.gates, researchGates().receipt)
})
