// research-ledger — the findings, and the two rules that decide what each one may DO.
//
// EVERY CHECK HERE IS WRITTEN TO BE ABLE TO FAIL. Today's audits found four checks in this repo that cannot fail at
// all — a forged theorem `{key:'totally_made_up', statement:'2 + 2 = 5'}` passes the DNA-recompute check — so each
// test below carries its own negative control: the same predicate applied to material that MUST be rejected. A
// suite where every assertion is satisfied by shape is not evidence, and this ledger exists precisely because
// believing something unchecked is what produced the errors it records.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import {
  FINDINGS, STATUSES, KINDS, anchors, sealableAsEquality, sealableAs, sealReason, findingAddress,
  researchGaps, census, judge, ledgerReport, proposeFinding, type Finding,
} from '../research-ledger.js'
import { callTool, MCP_CATALOG } from '../mcp.js'

// A finding the tests own, so mutating one never touches the shipped ledger.
const READ_CONVENTION: Finding = { claim: 'a convention read at its defining source', value: '16/27', units: 'ratio', source: 'the standard itself', status: 'read', kind: 'convention' }
const READ_MEASURED: Finding = { ...READ_CONVENTION, claim: 'a measurement read at the paper', kind: 'measured' }

test('the shipped findings are the record in lean/research-ledger.json, field for field', () => {
  // The edge has no filesystem, so the findings are carried in source; the JSON is the human record. Two copies of
  // anything drift, so the comparison is the guard — and it names the finding that moved.
  const record = JSON.parse(readFileSync(join(ROOT, 'lean', 'research-ledger.json'), 'utf8')) as { findings: Finding[] }
  const same = (a: readonly Finding[], b: readonly Finding[]): string[] => {
    const diffs: string[] = []
    if (a.length !== b.length) diffs.push(`the ledgers hold ${a.length} and ${b.length} findings`)
    for (let i = 0; i < (a.length < b.length ? a.length : b.length); i++) {
      const x = a[i], y = b[i]
      for (const k of ['claim', 'value', 'units', 'source', 'status', 'kind', 'note'] as const)
        if ((x[k] ?? '') !== (y[k] ?? '')) diffs.push(`finding ${i} "${x.claim}": ${k} is "${x[k]}" in source and "${y[k]}" in the record`)
    }
    return diffs
  }
  assert.deepEqual(same(FINDINGS, record.findings), [],
    'src/research-ledger.ts and lean/research-ledger.json disagree — the hosted edge would serve a finding the record does not contain')
  // THE NEGATIVE CONTROL: the same comparison, applied to a record with ONE field altered, must object. Without
  // this, a comparison that silently passed everything would look exactly like a comparison that passed correctly.
  const forged = record.findings.map((f, i) => (i === 1 ? { ...f, value: '96485' } : f))
  assert.equal(same(FINDINGS, forged).length, 1, 'the mirror check must catch a single altered value')
})

test('ONLY A READ PRIMARY SOURCE ANCHORS — and the negative controls prove the predicate discriminates', () => {
  assert.equal(anchors(READ_CONVENTION), true)
  for (const status of ['secondary', 'unread', 'refuted'] as const)
    assert.equal(anchors({ ...READ_CONVENTION, status }), false, `a ${status} finding must not anchor a theorem`)
})

test('a MEASUREMENT never seals as an equality, however well it was read', () => {
  assert.equal(sealableAsEquality(READ_CONVENTION), true)
  assert.equal(sealableAsEquality(READ_MEASURED), false, 'if this ever passes, a measured quantity has become an asserted constant')
  assert.equal(sealableAs(READ_CONVENTION), 'EQUALITY')
  assert.equal(sealableAs(READ_MEASURED), 'BRACKET')
  assert.equal(sealableAs({ ...READ_CONVENTION, status: 'secondary' }), 'NOTHING')
  // the reason must name the actual status— a diagnosis
  assert.match(sealReason({ ...READ_CONVENTION, status: 'unread' }), /unread/)
})

test('the address moves when any addressed field moves — a forged value cannot keep its identity', () => {
  const base = findingAddress(READ_MEASURED)
  assert.equal(findingAddress({ ...READ_MEASURED }), base, 'the same four fields must recompute the same address')
  for (const k of ['claim', 'value', 'units', 'source'] as const)
    assert.notEqual(findingAddress({ ...READ_MEASURED, [k]: 'forged' }), base, `a changed ${k} must change the address`)
  // and the NOTE is deliberately NOT addressed — editing commentary must not mint a new finding
  assert.equal(findingAddress({ ...READ_MEASURED, note: 'rewritten commentary' }), base)
})

test('the ledger objects to ITSELF — and stays silent when there is nothing to object to', () => {
  const gaps = researchGaps(FINDINGS)
  assert.ok(gaps.length > 0, 'the shipped ledger holds at least one unread finding and must say so')
  assert.ok(gaps.some((g) => /believed but unchecked/.test(g.what)), 'an unread finding must be named as unchecked')
  // NEGATIVE CONTROL — a ledger with nothing wrong must produce NO gaps. A finder that always fires is not a finder.
  assert.deepEqual(researchGaps([READ_CONVENTION, READ_MEASURED]), [])
  // a convention whose defining source was NOT read is the second gap class, and it must fire on exactly that
  const soft = researchGaps([{ ...READ_CONVENTION, status: 'secondary' }])
  assert.equal(soft.length, 1)
  assert.match(soft[0].what, /exact-by-definition/)
  // Two sources disagreeing about ONE quantity is the third class — and it is the branch that was UNREACHABLE
  // while it grouped by content-address, since the address folds the value in and every group was value-identical.
  // Same claim, same units, different values and different sources: the gap must fire.
  const disagreeing = researchGaps([READ_MEASURED, { ...READ_MEASURED, value: '2/3', source: 'a second paper' }])
  assert.ok(disagreeing.some((g) => /disagreeing values/.test(g.what)), 'two sources disagreeing about one quantity must be named')
  // NEGATIVE CONTROL: two findings agreeing on the value are NOT a disagreement, however many sources report it
  assert.deepEqual(researchGaps([READ_MEASURED, { ...READ_MEASURED, source: 'a second paper' }]), [])
})

test('the census counts every status and cannot be flattered by a filter', () => {
  const c = census(FINDINGS)
  assert.equal(STATUSES.reduce((n, s) => n + c[s], 0), FINDINGS.length, 'every finding lands in exactly one status')
  const all = ledgerReport({})
  const readOnly = ledgerReport({ status: 'read' })
  assert.deepEqual(readOnly.census, all.census, 'the census must describe the WHOLE ledger, filtered or not')
  assert.ok(readOnly.matched < all.total, 'the filter must actually narrow the findings it returns')
  assert.ok(readOnly.findings.every((f) => f.status === 'read'))
  // and the receipt is the ledger's identity's — order-invariant over every finding
  assert.equal(readOnly.receipt, all.receipt)
  assert.equal(all.handle.length, 8)
  assert.equal(all.hexbits.length, 32)
  assert.match(all.door, /^https:\/\/uuidna\.com\/[0-9a-f]{8}$/)
})

test('an unknown filter is REFUSED by name', () => {
  assert.throws(() => ledgerReport({ status: 'skimmed' }), /unknown status "skimmed"/)
  assert.throws(() => ledgerReport({ kind: 'vibes' }), /unknown kind "vibes"/)
  // NEGATIVE CONTROL: every legitimate value must be accepted, or the refusal is just a broken filter
  for (const s of STATUSES) assert.equal(ledgerReport({ status: s }).filter.status, s)
  for (const k of KINDS) assert.equal(ledgerReport({ kind: k }).filter.kind, k)
})

test('the report makes plain which findings may anchor a theorem and which may not', () => {
  const r = ledgerReport({})
  assert.equal(r.anchoring.canAnchor + r.anchoring.cannotAnchor, r.total)
  assert.equal(r.anchoring.sealsAsEquality + r.anchoring.sealsAsBracket, r.anchoring.canAnchor)
  assert.ok(r.anchoring.cannotAnchor > 0, 'the ledger carries findings that were not read, and must not hide them')
  for (const f of r.findings) {
    assert.equal(f.anchorsTheorem, f.status === 'read')
    assert.equal(f.sealableAs === 'EQUALITY', f.status === 'read' && f.kind === 'convention')
    assert.ok(f.why.length > 0)
  }
  // judge() must not quietly promote anything: a secondary finding stays unanchored through the whole pipeline
  assert.equal(judge({ ...READ_CONVENTION, status: 'secondary' }).anchorsTheorem, false)
})

test('the tool dispatches through the served surface and is listed in the catalogue', () => {
  const served = callTool('uuidna_research_ledger', { status: 'unread' }) as ReturnType<typeof ledgerReport>
  assert.equal(served.matched, ledgerReport({ status: 'unread' }).matched)
  assert.ok(served.findings.every((f) => !f.anchorsTheorem), 'an unread finding may never anchor a theorem')
  assert.ok(MCP_CATALOG.some((t) => t.name === 'uuidna_research_ledger'), 'the catalogue must list it, or docs/mcp.md cannot see it')
  // a bad argument through the SERVED door must refuse there too
  assert.throws(() => callTool('uuidna_research_ledger', { kind: 'measured-ish' }), /unknown kind/)
})

test('proposeFinding never writes the ledger and defaults to unread', () => {
  const before = FINDINGS.length
  const p = proposeFinding({ claim: 'a proposed figure', value: '1', units: 'count', source: 'a test' })
  assert.equal(p.status, 'unread')
  assert.equal(p.kind, 'measured')
  assert.equal(FINDINGS.length, before, 'proposeFinding must not mutate FINDINGS')
  assert.equal(anchors(p), false)
})
