// legal-audit — every agent action is audited against the laws as it happens: one chained record per call, holding
// addresses only. Each rule has a control that must fire, so a broken or leaky audit cannot read as a clean one.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { auditCall, auditChainBreaks, auditState, lawsState, auditRecordOf, auditManipulation } from './legal-audit.js'
import { laws } from './laws.js'
import { callTool } from './mcp.js'

test('a call is audited with addresses only — no argument value reaches the record', () => {
  const argument = 'never-in-the-record-7f3a'
  const r = auditCall('test', 'uuidna_sha256', { text: argument }, { digest: 'x' }, { clean: true, receipt: 'g' })
  assert.ok(!JSON.stringify(r).includes(argument), 'the argument value is not in the record')
  assert.match(r.args, /^[0-9a-f-]{36}$/)
  assert.equal(r.laws, laws().receipt, 'the record carries the laws\' own receipt')
  assert.equal(r.allHold, laws().allHold)
})

test('the same arguments address the same, in any key order', () => {
  const a = auditCall('test', 't', { x: 1, y: [2, 3] }, null, { clean: true, receipt: 'g' })
  const b = auditCall('test', 't', { y: [2, 3], x: 1 }, null, { clean: true, receipt: 'g' })
  assert.equal(a.args, b.args)
})

test('the chain recomputes, and an altered or removed record breaks it at a named link', () => {
  const chain = [1, 2, 3].map((n) => auditCall('test', 'tool' + n, { n }, { n }, { clean: true, receipt: 'g' + n }))
  assert.equal(auditChainBreaks(chain), null)
  // CONTROL: an altered record no longer recomputes to its link
  const altered = chain.map((r, i) => (i === 1 ? { ...r, tool: 'forged' } : r))
  assert.equal(auditChainBreaks(altered)?.at, 1)
  // CONTROL: a removed record leaves the next one naming a prev the chain never carried
  assert.equal(auditChainBreaks([chain[0]!, chain[2]!])?.at, 1)
})

test('manipulation is measured from the evidence: each drained call by its signal and tool, a forgery named', () => {
  const s = { receipt: 'r', allHold: true, failing: [] as string[] }
  const a = auditRecordOf(1, 'genesis', 'stdio', 'uuidna_sha256', {}, null, { clean: true, receipt: 'g1', input: 0, output: 0, honesty: 0 }, s)
  const b = auditRecordOf(2, a.link, 'stdio', 'uuidna_decode', { x: '<script>' }, null, { clean: false, receipt: 'g2', input: 1, output: 0, honesty: 0 }, s)
  const c = auditRecordOf(3, b.link, 'stdio', 'uuidna_decode', {}, null, { clean: false, receipt: 'g3', input: 0, output: 0, honesty: 1 }, { ...s, allHold: false })
  const d = auditRecordOf(1, 'genesis', 'stdio', 'uuidna_laws', {}, null, { clean: true, receipt: 'g4' }, s)   // a second serving run
  const m = auditManipulation([a, b, c, d])
  assert.equal(m.audited, 4)
  assert.equal(m.clean, 2)
  assert.equal(m.drained, 2)
  assert.deepEqual(m.signals, { input: 1, output: 0, honesty: 1 })
  assert.equal(m.lawsBroken, 1)
  assert.equal(m.runs, 2, 'a restart at genesis is a run, not a break')
  assert.deepEqual(m.byTool, [{ tool: 'uuidna_decode', drained: 2 }])
  assert.equal(m.chain, null)
  // CONTROL: a record made to look clean after the fact is named as a break in the chain
  assert.equal(auditManipulation([a, { ...b, clean: true }, c, d]).chain?.at, 1)
  // CONTROL: an empty log audited no call, so it reports zero — never a clean bill with no record behind it
  assert.equal(auditManipulation([]).audited, 0)
})

test('a served tools/call extends the audit chain, and the fused law door reports it', () => {
  const before = auditState().audited
  const fused = callTool('uuidna_laws') as { laws: unknown[]; legal: Record<string, unknown>; audit: { audited: number; laws: unknown } }
  assert.ok(Array.isArray(fused.laws) && fused.laws.length > 0, 'the laws')
  for (const k of ['facts', 'treason', 'rights', 'dueProcess']) assert.ok(k in fused.legal, `the fused door carries ${k}`)
  assert.ok(fused.audit.audited >= before, 'the live audit state')
  assert.deepEqual(fused.audit.laws, lawsState())
})
