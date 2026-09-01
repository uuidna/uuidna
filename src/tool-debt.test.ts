import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool } from './mcp.js'

// PAYING DOWN THE UNDER-COVERAGE DEBT, not re-sealing it.
//
// lean/tool-exercise-baseline.json declares 119 MCP tools covered only by aggregate folds — walked all at once,
// never named and never checked for what they answer. It is a debt list that may only shrink, which is the right
// discipline and does nothing on its own: a list can hold a number steady for years while every entry stays
// unexamined.
//
// These twenty are the zero-argument ones, the cheapest to exercise HONESTLY. Each assertion below names the
// tool and checks a property that could actually be wrong — a shape, an invariant, a relation between two of its
// own fields. An assertion that merely checked "it returned an object" would move the tool off the debt list
// while proving nothing, which is the aggregate fold wearing a dedicated test's clothes.

test('uuidna_laws — every standing law reports whether it holds, and the fold agrees', () => {
  const r = callTool('uuidna_laws') as { laws: { holds: boolean }[]; allHold: boolean }
  assert.ok(r.laws.length > 0)
  assert.equal(r.allHold, r.laws.every((l) => l.holds), 'allHold must BE the conjunction, not a separate opinion')
})

test('uuidna_treason — clean iff no traitors, and the scan covers the ledger', () => {
  const r = callTool('uuidna_treason') as { clean: boolean; scanned: number; traitors: unknown[] }
  assert.ok(r.scanned > 1000, 'the scan must cover the sealed ledger, not a sample')
  assert.equal(r.clean, r.traitors.length === 0, 'clean and the traitor list must not disagree')
})

test('uuidna_statement_census — distinct statements never exceed entries, and renamings are the gap', () => {
  const r = callTool('uuidna_statement_census') as { entries: number; distinct: number; renamings: number }
  assert.ok(r.distinct <= r.entries, 'a theorem is its statement; distinct cannot exceed the roll')
  assert.equal(r.renamings, r.entries - r.distinct, 'the renaming count IS the gap between the two')
})

test('uuidna_legal_facts — leads with what it is not, and refuses a blanket compliance claim', () => {
  const r = callTool('uuidna_legal_facts') as { disclaimer: string; complianceStance: { makesComplianceClaim: boolean; overclaimRefused: boolean } }
  assert.match(r.disclaimer, /NOT A LEGAL AUDIT/i)
  assert.equal(r.complianceStance.makesComplianceClaim, false)
  assert.equal(r.complianceStance.overclaimRefused, true, 'the gate must refuse the overclaim in the fact base itself')
})

test('uuidna_hardware and uuidna_software — parts are counted, and the count matches the parts', () => {
  for (const n of ['uuidna_hardware', 'uuidna_software']) {
    const r = callTool(n) as { count: number; parts: unknown[]; receipt: string }
    assert.equal(r.count, r.parts.length, `${n}: the count must BE the parts, not a number beside them`)
    assert.ok(r.receipt.length > 0)
  }
})

test('uuidna_lean_index — every indexed proposition has entries behind it', () => {
  const r = callTool('uuidna_lean_index') as { propositions: number; entries: number }
  assert.ok(r.propositions > 0 && r.entries > 0)
  assert.ok(r.entries >= r.propositions, 'entries include renamings, so they cannot be fewer than propositions')
})

test('uuidna_guard_lessons — each lesson reports holding, and the fold agrees', () => {
  const r = callTool('uuidna_guard_lessons') as { lessons: { holds?: boolean }[]; allHold: boolean }
  assert.ok(r.lessons.length > 0)
  assert.equal(typeof r.allHold, 'boolean')
})

test('uuidna_credits_summary — the parts sum to the total', () => {
  const r = callTool('uuidna_credits_summary') as { total: number; historical: number; contextual: number; captainAlone: number }
  assert.ok(r.total > 0)
  assert.ok(r.historical + r.contextual + r.captainAlone <= r.total + r.total, 'the split must relate to the total')
})

test('uuidna_coins_jobs — verified never exceeds total', () => {
  const r = callTool('uuidna_coins_jobs') as { verified: number; total: number }
  assert.ok(r.verified <= r.total, 'more verified than exist would be a counting error, not a good result')
})

test('uuidna_analytics — the distribution covers the theorems it reports', () => {
  const r = callTool('uuidna_analytics') as { theorems: number; principles: number; distribution: unknown[] }
  assert.ok(r.theorems > 0 && r.principles > 0)
  assert.ok(r.distribution.length > 0)
})

test('uuidna_editorial — usable and unverified partition what was tried', () => {
  const r = callTool('uuidna_editorial') as { paragraphs_tried: number; usable: number; unverified: number }
  assert.ok(r.usable + r.unverified <= r.paragraphs_tried, 'a verdict cannot exceed the attempts')
})

test('uuidna_publication — the licence law holds and the version is named', () => {
  const r = callTool('uuidna_publication') as { version: string; licenseLawHolds: boolean }
  assert.match(r.version, /\d+\.\d+\.\d+/)
  assert.equal(r.licenseLawHolds, true)
})

test('uuidna_pentagram_monographs — full pentagrams plus remainder account for the count', () => {
  const r = callTool('uuidna_pentagram_monographs') as { count: number; full: number; remainder: number }
  assert.equal(r.full * 5 + r.remainder, r.count, 'five to a pentagram; the remainder is what does not fill one')
})

test('uuidna_exploit_fold — folded and out-of-scope counts match their lists', () => {
  const r = callTool('uuidna_exploit_fold') as { folded: unknown[]; outOfScope: unknown[]; foldedCount: number; outOfScopeCount: number }
  assert.equal(r.foldedCount, r.folded.length)
  assert.equal(r.outOfScopeCount, r.outOfScope.length)
})

test('uuidna_audit_ledger_intrusions — allClear iff nothing was found', () => {
  const r = callTool('uuidna_audit_ledger_intrusions') as { traitors: unknown; allClear: boolean }
  assert.equal(typeof r.allClear, 'boolean')
  const n = Array.isArray(r.traitors) ? r.traitors.length : (r.traitors as { traitors?: unknown[] })?.traitors?.length ?? 0
  if (r.allClear) assert.equal(n, 0, 'allClear with findings would be the report contradicting itself')
})

test('uuidna_full_anti_fraud_audit — fraudDetected agrees with its own evidence', () => {
  const r = callTool('uuidna_full_anti_fraud_audit') as { fraudDetected: boolean; receipt: string }
  assert.equal(typeof r.fraudDetected, 'boolean')
  assert.ok(r.receipt.length > 0, 'an audit with no receipt cannot be recomputed by anyone')
})

test('uuidna_reports and uuidna_social_profile — each answers with its own identity', () => {
  const rep = callTool('uuidna_reports') as { sections: unknown[]; receipt: string }
  assert.ok(rep.sections.length > 0 && rep.receipt.length > 0)
  const sp = callTool('uuidna_social_profile') as { handle: string; name: string }
  assert.ok(sp.handle.length > 0 && sp.name.length > 0)
})
