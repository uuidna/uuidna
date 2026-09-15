// the court's investigator classes every drained call from its own input, and records nothing while a call falls in no
// class or a law is down — the controls below are an OTHER breach, an unmatched call and a law down, each of which must
// block the record while the explained classes let it through.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { classifyCall, investigate, mayRecord, sinceByTool, ordersFor, resultOf, statementOf, type DrainedRecord, type CallInput, type Judges } from './court-investigate.js'

// the judges a real run builds from the ledger, the gate and git — here they answer from the statement alone
const judges: Judges = {
  breaches: (s) => [...new Set(s.match(/\b(?:fake_key|other_key)\b/g) ?? [])].map((k) => `fabricated citation: ${k}`),
  cited: (s) => s.match(/\bsealed_\w+/g) ?? [],
  sealedSince: (k) => k === 'sealed_new',
  oldGate: (s) => (s.includes('old_trunc') ? ['old_trunc'] : []),
}
const rec = (seq: number, tool: string, over: Partial<DrainedRecord> = {}): DrainedRecord =>
  ({ seq, tool, args: `a${seq}`, clean: false, gate: 'g', allHold: true, failing: [], signals: { honesty: 1 }, ...over })
const call = (input: Record<string, unknown>, mine = false): CallInput => ({ input, mine, who: 'agent-x' })

test('each stated class is computed from the call\'s own input', () => {
  assert.deepEqual(classifyCall(rec(1, 'Write'), call({ file_path: 'lean/X.lean', content: 'theorem fake_key : 1 = 1 := rfl' }), judges).classes, ['declared'])
  assert.deepEqual(classifyCall(rec(2, 'Write'), call({ file_path: 'src/g.test.ts', content: "assert.ok(slimGate('cites /theorem/fake_key').fabricated.length)" }), judges).classes, ['control'])
  assert.deepEqual(classifyCall(rec(3, 'Edit'), call({ file_path: 'src/p.test.ts', new_string: "const refused = 'fake_key'" }), judges).classes, ['test-fixture'])
  assert.deepEqual(classifyCall(rec(4, 'Agent'), call({ prompt: 'for example /theorem/fake_key is refused' }, true), judges).classes, ['my-prompt-example'])
  assert.deepEqual(classifyCall(rec(5, 'Write'), call({ file_path: 'src/w.ts', content: 'backed by theorem sealed_new' }), judges).classes, ['sealed-since=sealed_new'])
  assert.deepEqual(classifyCall(rec(6, 'Write'), call({ file_path: 'src/w.ts', content: "theorem old_trunc' closes it" }), judges).classes, ['pre-fix-gate=old_trunc'])
  assert.deepEqual(classifyCall(rec(7, 'Bash', { signals: { honesty: 0 }, allHold: false, failing: ['security-posture-clean'] }), call({ command: 'ls' }), judges).classes, ['law-down=security-posture-clean'])
})

test('CONTROL — an OTHER breach blocks the record; the same calls without it are recorded', () => {
  const explainedOnly: [string, CallInput][] = [['a1', call({ file_path: 'lean/X.lean', content: 'theorem fake_key : True := trivial' })]]
  const withOther: [string, CallInput][] = [...explainedOnly, ['a2', call({ file_path: 'src/claim.ts', content: '// proved by /theorem/other_key' })]]
  const tools = new Set(['Write'])
  const good = investigate([rec(1, 'Write')], new Map(explainedOnly), tools, {}, judges)
  assert.equal(mayRecord(good, true, []).ok, true)
  const bad = investigate([rec(1, 'Write'), rec(2, 'Write')], new Map(withOther), tools, {}, judges)
  assert.deepEqual(bad.unexplained.map((c) => c.classes), [['OTHER']])
  const verdict = mayRecord(bad, true, [])
  assert.equal(verdict.ok, false)
  assert.match(verdict.ok ? '' : verdict.why, /2 Write OTHER/)
})

test('CONTROL — a call no transcript holds is UNMATCHED and blocks the record', () => {
  const inv = investigate([rec(9, 'Write')], new Map(), new Set(['Write']), {}, judges)
  assert.deepEqual(inv.unexplained.map((c) => c.classes), [['UNMATCHED']])
  assert.equal(mayRecord(inv, true, []).ok, false)
})

test('CONTROL — a law down refuses the record even when every call is explained', () => {
  const v = mayRecord({ unexplained: [] }, false, ['conformance:security-posture-clean'])
  assert.equal(v.ok, false)
  assert.match(v.ok ? '' : v.why, /security-posture-clean/)
})

test('a drained call already named by a recorded result is not judged again — both record forms are read', () => {
  const lines = [
    { address: 'x', result: 'investigated by recomputation: the new drained Write call(s) (3601:declared:agent-a, 3605:control:agent-b) matched …' },
    { address: 'y', result: 'r', calls: [{ seq: 12, tool: 'Edit', classes: ['declared'] }] },
    { address: 'z', claimedBy: 's' },
  ]
  const since = sinceByTool(lines)
  assert.deepEqual(since, { Write: 3605, Edit: 12 })
  const inv = investigate([rec(3605, 'Write'), rec(3606, 'Write'), rec(12, 'Edit')], new Map([['a3606', call({ file_path: 'lean/Y.lean', content: 'theorem fake_key : True := trivial' })]]), new Set(['Write', 'Edit']), since, judges)
  assert.deepEqual(inv.calls.map((c) => c.seq), [3606])
})

test('claim first: an unclaimed order is claimed, one this claimant holds is resumed, another claimant\'s is left alone', () => {
  const orders = [
    { kind: 'audit', subject: 'tool Write', why: '3 call(s) drained by the gate', address: 'o1' },
    { kind: 'audit', subject: 'tool Edit', why: '1 call(s) drained by the gate', address: 'o2' },
    { kind: 'audit', subject: 'tool Bash', why: '2 call(s) drained by the gate', address: 'o3' },
    { kind: 'law', subject: 'a law', why: 'down', address: 'o4' },
  ]
  const lines = [{ address: 'o2', claimedBy: 'me' }, { address: 'o3', claimedBy: 'someone else' }]
  const r = ordersFor(orders, lines, 'me')
  assert.deepEqual(r.toClaim.map((o) => o.address), ['o1'])
  assert.deepEqual(r.resumed.map((o) => o.address), ['o2'])
})

test('a recorded result names its calls, so the next run reads its own since from it', () => {
  const line = resultOf({ kind: 'audit', subject: 'tool Write', why: 'w', address: 'o1' }, 'me', 'abc', [{ seq: 4, tool: 'Write', who: 'w', classes: ['declared'], explained: true, context: '' }])
  assert.deepEqual(sinceByTool([line]), { Write: 4 })
  assert.equal(statementOf({ a: 'x', b: 2, c: 'y' }), 'x\ny')
})
