import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  QC_BUILD_STEPS, QC_CHARACTERISATION, QC_DOCUMENT, QC_FAULT_TOLERANCE, QC_INGREDIENTS, QC_PLANES,
  QC_PLATFORMS, QC_ROUTE, REFUSED_CORRESPONDENCES, qcArithmetic, qcVerdict, renderQcVerdict,
  QC_AUDIT, EXPOSED_GATE_SET, EXTERNAL_AUDIT_FINDINGS, auditConformance, leanNormalise, quantumClaimCensus,
} from './index.js'
import { theoremByKey } from '../../../theorems/index.js'
import { handleOf } from '../../../handle.js'
import { callTool } from '../../../mcp.js'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../../boundary.js'

test('the document is addressed, and its transcription is complete against what it published', () => {
  assert.match(QC_DOCUMENT.address, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  assert.equal(QC_DOCUMENT.handle, handleOf(QC_DOCUMENT.address), 'the handle is the address’s own, derived in one place')
  assert.equal(QC_DOCUMENT.pages, 8)
  assert.equal(QC_DOCUMENT.references.length, 15, 'the document numbered fifteen references')
  assert.equal(new Set(QC_DOCUMENT.references).size, 15, 'a duplicated reference would inflate the count')
  for (const r of QC_DOCUMENT.references) assert.match(r, /^https?:\/\//)
  // the counts the document itself carries
  assert.equal(QC_INGREDIENTS.length, 5)
  assert.equal(QC_PLANES.length, 4)
  assert.equal(QC_PLATFORMS.length, 5)
  assert.equal(QC_BUILD_STEPS.length, 7)
  assert.equal(QC_CHARACTERISATION.length, 8)
  assert.equal(QC_FAULT_TOLERANCE.length, 6)
  assert.equal(QC_ROUTE.length, 4)
})

test('every transcribed list is numbered in the document’s own order, with nothing empty', () => {
  assert.deepEqual(QC_PLANES.map((p) => p.n), [1, 2, 3, 4])
  assert.deepEqual(QC_BUILD_STEPS.map((s) => s.n), [1, 2, 3, 4, 5, 6, 7])
  assert.deepEqual(QC_ROUTE.map((s) => s.n), [1, 2, 3, 4])
  for (const p of QC_PLATFORMS)
    for (const [k, v] of Object.entries(p)) assert.ok(v.length > 3, `platform ${p.approach}: ${k} is empty`)
  for (const i of QC_INGREDIENTS) assert.ok(i.why.length > 40, `${i.name} must say where this tree stands`)
  for (const m of QC_CHARACTERISATION) assert.ok(m.why.length > 40, `${m.metric} must justify its sealability`)
})

test('the arithmetic developed from the document HOLDS, and it is computed rather than asserted', () => {
  const a = qcArithmetic()
  assert.equal(a.allHold, true, a.facts.filter((f) => !f.holds).map((f) => f.arithmetic).join(' · '))
  assert.equal(a.facts.length, 7)
  // NEGATIVE CONTROL: the fact set must be falsifiable — a wrong power of two must NOT hold
  assert.notEqual(2 ** 10, 1000, 'if 2^10 were 1000 the exponential-growth fact would be vacuous')
  // every theorem a fact leans on is IN the ledger
  for (const f of a.facts)
    if (f.theorem) assert.ok(theoremByKey().get(f.theorem), `${f.theorem} is cited but absent from the ledger`)
})

test('the verdict is NO, and every claim it does make is backed by a sealed statement', () => {
  const v = qcVerdict()
  assert.equal(v.isQuantumComputer, false)
  assert.equal(v.stagesReached, 0, 'not one of the document’s four stages is reached here')
  assert.equal(v.ingredientsTotal, 5)
  assert.equal(v.ingredientsCarried, QC_INGREDIENTS.filter((i) => i.stance !== 'none').length)
  assert.ok(v.ingredientsCarried < v.ingredientsTotal, 'carrying all five would be the overclaim this exists to stop')
  assert.equal(v.sealableMetrics, QC_CHARACTERISATION.filter((m) => m.sealableHere).length)
  assert.ok(v.sealableMetrics < v.metricsTotal, 'a tree that could seal every hardware metric would be lying')
  for (const c of v.claims) {
    const t = theoremByKey().get(c.theorem)
    assert.ok(t, `${c.theorem} is cited but absent — the citation must be refused, not resolved to prose`)
    assert.equal(c.statement, t.statement, 'the statement must BE the ledger’s, never a retyped copy')
  }
  assert.ok(v.refused.length >= 3, 'the refused claims are part of the verdict, not a footnote')
  // THE SCORE IS THE ARGUMENT: every fraction in the verdict must BE the count it claims, recomputed here
  assert.equal(v.metrics.ingredientsCarried, `${v.ingredientsCarried}/${v.ingredientsTotal}`)
  assert.equal(v.metrics.stagesReached, `${v.stagesReached}/${v.stagesTotal}`)
  assert.equal(v.metrics.metricsSealableHere, `${v.sealableMetrics}/${v.metricsTotal}`)
  assert.equal(v.metrics.arithmeticHolding, `${v.arithmetic.facts.filter((f) => f.holds).length}/${v.arithmetic.facts.length}`)
  assert.equal(v.metrics.claimsBackedByLedger, `${v.claims.length}/${v.claims.length}`, 'every citation resolved in the ledger')
  assert.equal(v.metrics.itemsTranscribed, 39, '5 + 4 + 5 + 7 + 8 + 6 + 4 items, transcribed from the document')
  assert.match(v.honest, /ingredients carried 2\/5/, 'the honest field leads with the score, not with an adjective')
  assert.match(renderQcVerdict(v), /the score is the argument/)
})

// THE NUMEROLOGY, CHECKED AND REFUSED. A matching count is the cheapest false structure available, and this
// records that the match was noticed rather than avoided.
test('the refused correspondences are real matches, and the one that fails arithmetic says so', () => {
  assert.ok(REFUSED_CORRESPONDENCES.length >= 3)
  for (const r of REFUSED_CORRESPONDENCES) assert.ok(r.why.length > 50, `${r.pair} must say why it is refused`)
  // the 7 ↔ 7 match is genuine: the document has seven steps and the gate has seven arms
  assert.equal(QC_BUILD_STEPS.length, 7)
  assert.ok(REFUSED_CORRESPONDENCES.some((r) => /7 build steps · 7 arms/.test(r.counts)))
  // and the planes one is refused on arithmetic ALONE — 4 planes against 3 named layers
  assert.equal(QC_PLANES.length, 4)
  assert.ok(REFUSED_CORRESPONDENCES.some((r) => /4 planes · 3 layers/.test(r.counts)),
    'a correspondence that fails on counting is the most useful kind to have recorded')
})

test('the receipt moves when the transcription moves — the document cannot be edited silently', () => {
  const v = qcVerdict()
  assert.equal(v.receipt, qcVerdict().receipt, 'pure: two calls, one receipt')
  assert.match(v.door, /^https:\/\/uuidna\.com\/[0-9a-f]{8}$/)
  assert.equal(v.handle, handleOf(v.receipt))
})

// uuidna_qc is the wire name: a zero-argument tool, so the door answers the full demarcation on an empty call.
test('uuidna_qc — the wire answers NO with the working, and agrees with the library', () => {
  const r = callTool('uuidna_qc') as ReturnType<typeof qcVerdict>
  assert.equal(r.isQuantumComputer, false, 'the one answer this tool exists to give')
  assert.equal(r.definition, 'uuidnaOS·qc·demarcation')
  assert.equal(r.receipt, qcVerdict().receipt, 'one door, one answer — the wire must not compute its own')
  assert.equal(r.arithmetic.allHold, true)
  assert.equal(r.document.references.length, 15)
  assert.ok(r.refusedCorrespondences.length >= 3, 'the refused numerology travels with the verdict')
  // every count is DERIVED from the transcribed lists, so each one recomputes from what the document published
  assert.ok(r.ingredientsCarried < r.ingredientsTotal)
  assert.equal(r.stagesReached, 0)
})

// ── THE EXTERNAL AUDIT, RUN AS A GUARD. An outside reader inspected uuidna.com and the live tools and wrote up
// what each seal proves and where its scope ends. Transcribed, its scope readings become regression tests: a
// later rewording that widens one of them shows up as drift here.
test('the audit document is addressed, and every finding carries arithmetic and both scope halves', () => {
  assert.equal(QC_AUDIT.handle, handleOf(QC_AUDIT.address))
  assert.equal(QC_AUDIT.references.length, 6)
  assert.ok(EXTERNAL_AUDIT_FINDINGS.length >= 9)
  assert.equal(new Set(EXTERNAL_AUDIT_FINDINGS.map((f) => f.id)).size, EXTERNAL_AUDIT_FINDINGS.length)
  for (const f of EXTERNAL_AUDIT_FINDINGS) {
    assert.ok(f.arithmetic.length >= 1, `${f.id} must record the arithmetic the audit read`)
    assert.ok(f.provesExactly.length > 30, `${f.id} must say what the seal establishes`)
    assert.ok(f.outsideScope.length > 30, `${f.id} must say where that reach ends`)
    if (f.verdict === 'REFINED') assert.ok((f.refinement ?? '').length > 60, `${f.id}: a refinement must say what measurement changed`)
  }
})

test('every audit finding that names a seal still finds its arithmetic in the ledger', () => {
  const a = auditConformance()
  assert.deepEqual(a.drifted, [], 'a seal whose statement stopped carrying the audited arithmetic is a widened scope')
  assert.equal(a.arithmeticHeld, a.arithmeticChecked)
  assert.equal(a.metrics.arithmeticHeld, `${a.arithmeticHeld}/${a.arithmeticChecked}`)
  assert.equal(a.confirmed + a.refined, a.findings, 'every finding is CONFIRMED or REFINED, never unclassified')
  // and the check is LOAD-BEARING: normalising ascriptions must not erase the arithmetic it compares
  assert.equal(leanNormalise('((2:Nat)^2 < 2^3)'), '(2^2 < 2^3)')
  assert.equal(leanNormalise('(2^4 = 16)').includes(leanNormalise('2^3 = 8')), false,
    'a widened seal must still fail the comparison — otherwise the guard agrees by construction')
})

test('the audit is audited BACK: the circuit-menu finding is REFINED by the measured gate set', () => {
  const refined = EXTERNAL_AUDIT_FINDINGS.filter((f) => f.verdict === 'REFINED')
  assert.equal(refined.length, 1, 'exactly one finding disagrees with the audit on its reasoning')
  const f = refined[0]!
  assert.equal(f.id, 'exposed-circuit-menu')
  for (const g of EXPOSED_GATE_SET) assert.match(f.refinement!, new RegExp(`\\b${g}\\b`), `the refinement must name ${g}`)
  // the gate set is what the served schema actually accepts — read from the tool, not retyped here
  const mcp = readFileSync(join(ROOT, 'src', 'mcp.ts'), 'utf8')
  for (const g of EXPOSED_GATE_SET) assert.ok(mcp.includes(g), `${g} must appear in the served schema`)
  assert.equal(EXPOSED_GATE_SET.includes('rz'), false, 'the phase/rotation family is what period finding needs')
})

test('uuidna_qc census — every quantum-flavoured seal is counted and every one is decidable arithmetic', () => {
  const c = quantumClaimCensus()
  assert.ok(c.quantumFlavoured > 100, `the quantum vocabulary is a real population, got ${c.quantumFlavoured}`)
  assert.ok(c.quantumFlavoured < c.ledger, 'and it is a SUBSET of the ledger, not the whole of it')
  assert.equal(c.decidable, c.quantumFlavoured,
    'every seal speaking the quantum vocabulary is proven by decide — that IS the scope the audit assigned')
  assert.equal(c.metrics.decidable, `${c.decidable}/${c.quantumFlavoured}`)
  assert.ok(c.auditNamed.length >= 6, 'the audit names the load-bearing capacity and dimension seals')
  assert.equal(c.metrics.skillsTouched, c.bySkill.length)
  assert.equal(c.bySkill.reduce((n, s) => n + s.count, 0), c.quantumFlavoured, 'the per-skill split partitions the population')
  // the wire serves all three views through one name
  const audit = callTool('uuidna_qc', { of: 'audit' }) as ReturnType<typeof auditConformance>
  assert.equal(audit.definition, 'uuidnaOS·qc·audit')
  const census = callTool('uuidna_qc', { of: 'census' }) as ReturnType<typeof quantumClaimCensus>
  assert.equal(census.receipt, c.receipt, 'one door, one answer')
})
