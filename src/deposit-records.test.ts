import { test } from 'node:test'
import assert from 'node:assert/strict'
import { depositLedger, depositRecord, depositTitle, gradeRecord, relationsFor, keywordsOf, depositGaps } from './deposit-records.js'
import { publications } from './publish.js'
import { KIN } from './publication-graph.js'

// THE GRADE IS A GATE, NOT A REPORT. A DOI is permanent, so a record below the bar must be REFUSED rather than
// noted. These checks prove the grade can fail — it already did, on two monographs whose titles were seven
// characters ("The cut", "The mix"): unusable in a reference list, and caught before anything was minted.

test('the grade FIRES on a record below the bar', () => {
  const pub = publications()[0]!
  const rec = depositRecord(pub)
  const corpus = publications().map((p) => p.abstract)
  // a thin title, the exact fault the grade caught on two real monographs
  const thin = gradeRecord({ ...rec, title: 'The cut' }, corpus)
  assert.equal(thin.find((g) => g.name === 'title')?.ok, false)
  // an abstract shared with another record — a template deposited as a corpus
  const shared = gradeRecord({ ...rec, abstract: 'x' }, ['x', 'x'])
  assert.equal(shared.find((g) => g.name === 'abstract-distinct')?.ok, false)
  // a DOI it was never assigned is a fabrication
  const invented = gradeRecord({ ...rec, doi: '10.5281/zenodo.1' as unknown as null }, corpus)
  assert.equal(invented.find((g) => g.name === 'doi-not-invented')?.ok, false)
  // a leaf record names no related work
  const leaf = gradeRecord({ ...rec, relatedPublications: [] }, corpus)
  assert.equal(leaf.find((g) => g.name === 'graph')?.ok, false)
})

test('every candidate passes every criterion — nothing is minted below the bar', () => {
  const l = depositLedger()
  assert.equal(l.records.length, publications().length, 'one candidate per monograph')
  assert.deepEqual(l.refused, [], 'a refused record must be fixed at the monograph, never waved through')
  assert.equal(l.ready.length, l.records.length)
  assert.equal(l.allReady, true)
  assert.ok(l.criteria >= 13, 'the bar is what a citable record carries')
  assert.deepEqual(depositGaps(), [])
})

test('a deposit title identifies the work on its own', () => {
  for (const p of publications()) {
    const t = depositTitle(p)
    assert.ok(t.length >= 8, `${p.slug}: "${t}" is not a citation title`)
    assert.ok(t.startsWith(p.title), `${p.slug}: the title must lead`)
    assert.ok(t.length <= 240, `${p.slug}: too long for a reference list`)
  }
})

test('no record invents a DOI, and each declares one pending', () => {
  for (const r of depositLedger().records) {
    assert.equal(r.doi, null, `${r.id}: a DOI is assigned by the mint, never by the generator`)
    assert.equal(r.doiPending, true)
  }
})

test('the relation set carries the graph and the archive', () => {
  for (const p of publications()) {
    const rels = relationsFor(p)
    assert.ok(rels.some((r) => r.relation === 'isPartOf'), `${p.slug}: not declared part of the archived ledger`)
    assert.ok(rels.some((r) => r.relation === 'isDocumentedBy'), `${p.slug}: no page relation`)
    assert.ok(rels.filter((r) => r.relation === 'isRelatedTo').length <= KIN, `${p.slug}: more kin than the shortlist`)
  }
})

test('the proofs ride IN the record — not only linked', () => {
  for (const r of depositLedger().records) {
    assert.equal(r.proofs.length, r.theorems, `${r.id}: a proof missing from the record`)
    for (const p of r.proofs) {
      assert.ok(p.lean.length > 0, `${r.id}/${p.key}: no Lean carried`)
      assert.ok(p.tactic.length > 0)
      // tex is NULL for a computation with no formula form — null and '' are different facts
      assert.ok(p.tex === null || p.tex.length > 0, `${r.id}/${p.key}: tex must be null or real, never blank`)
    }
  }
})

test('every record joins the uuidna community and carries derived keywords', () => {
  for (const p of publications()) {
    assert.ok(keywordsOf(p).length >= 5, `${p.slug}: too little vocabulary for discovery`)
    assert.ok(depositRecord(p).communities.some((c) => c.identifier === 'uuidna'))
  }
})

test('the ledger receipt is deterministic', () => {
  assert.equal(depositLedger().receipt, depositLedger().receipt)
})
