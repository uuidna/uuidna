// microdata — A FIGURE MUST NOT LOSE ITS CLASS ON THE WAY OUT.
//
// The report's honesty lives in a column: reported, measured, declared. A serialisation that drops it hands a
// consumer a bare number, and a number measured on one laptop then reads as a fact about the world. These tests
// hold the two properties that make the structured form worth emitting at all — that every figure carries its
// provenance, and that nothing can quietly widen the vocabulary — and both can genuinely fail.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { reportDataset, type SealedReport } from './microdata.js'
import { auditJsonLd, SCHEMA_ORG_TYPES, SCHEMA_ORG_PROPERTIES } from './schema-org-vocab.js'

const sample: SealedReport = {
  slug: 'sample-report', name: 'a sealed report', description: 'for the trial', receipt: 'abc-123',
  figures: [
    { name: 'someone else\'s device', value: 1121, unitText: 'qubits', measurementTechnique: 'reported', citation: 'their publication' },
    { name: 'our own fold', value: 10, unitText: 'ns', measurementTechnique: 'measured', citation: 'timed by the generator' },
    { name: 'our own address space', value: 128, measurementTechnique: 'declared', citation: 'true by construction' },
  ],
}

test('EVERY figure carries its class and its source — no bare numbers leave the report', () => {
  const d = reportDataset(sample)
  assert.equal(d.variableMeasured.length, 3)
  for (const v of d.variableMeasured) {
    assert.ok(v.measurementTechnique, `${v.name} shipped without the technique that determined it`)
    assert.ok(v.citation && v.citation.length > 0, `${v.name} shipped without a named source`)
    assert.notEqual(v.value, undefined)
  }
  // the classes must survive INTACT, not be normalised to one default on the way through
  assert.deepEqual(d.variableMeasured.map((v) => v.measurementTechnique), ['reported', 'measured', 'declared'])
})

test('the emitted node passes the SAME vocabulary gate seo.ts and gen-feed.ts pass', () => {
  const failures: string[] = []
  auditJsonLd(reportDataset(sample), 'sample', failures)
  assert.deepEqual(failures, [], `unvetted schema.org terms: ${failures.join('; ')}`)
})

test('THE GATE BITES — an unvetted term is refused, so the audit is not decorative', () => {
  // if this passed, the test above would prove nothing: a walk that accepts everything accepts the right things too
  const failures: string[] = []
  auditJsonLd({ '@type': 'NotARealSchemaType', invented: 1 }, 'forged', failures)
  assert.equal(failures.length, 2, 'the audit must object to both the fabricated @type and the fabricated property')
  assert.ok(failures.some((f) => f.includes('NotARealSchemaType')))
})

test('every vetted term resolves to a real schema.org URL, not a plausible-looking one', () => {
  for (const [term, url] of Object.entries({ ...SCHEMA_ORG_TYPES, ...SCHEMA_ORG_PROPERTIES })) {
    assert.equal(url, `https://schema.org/${term}`,
      `${term} maps to ${url} — the vocabulary's whole value is that the URL is the term's real one`)
  }
})

test('identity follows the RECEIPT, so the same report reseals and a changed one does not', () => {
  const again = reportDataset(sample)
  assert.equal(reportDataset(sample)['@id'], again['@id'], 'same report must fold to the same @id — it is derived, not stamped')
  const moved = reportDataset({ ...sample, receipt: 'def-456' })
  assert.notEqual(moved['@id'], again['@id'], 'a changed receipt must produce a new identity, or the node can go stale silently')
})

test('a dimensionless figure OMITS the unit rather than sending an empty one', () => {
  const d = reportDataset(sample)
  const declared = d.variableMeasured.find((v) => v.measurementTechnique === 'declared')
  assert.ok(declared)
  // "unit unknown" and "dimensionless" are different facts; a blank string collapses them into the wrong one
  assert.ok(!('unitText' in declared), 'a figure with no unit must not carry the key at all')
})
