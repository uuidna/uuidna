// Every case below is a VIOLATION handed to the law, plus the lawful twin. A control that only proves refusal
// would equally pass a gate that refuses everything, which is the gate that gets switched off in a week.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prePushForge, rosterGaps, MUST_JUDGE, NEED_NOT_JUDGE, type ForgeReceipt } from './forge-verdict.js'

const r = (over: Partial<ForgeReceipt> = {}): ForgeReceipt =>
  ({ sha: '7d9eae4e0abc', ok: true, measured: true, failing: [], notJudged: [], ...over })

test('a RED forge behind HEAD refuses the next push, and names the workflow', () => {
  const g = prePushForge(r({ ok: false, failing: ['security'] }), true)
  assert.equal(g.refuse, true)
  assert.match(g.reason, /RED on 7d9eae4e0 — security/)
})

test('a GREEN forge behind HEAD allows silently — the control', () => {
  assert.equal(prePushForge(r(), true).refuse, false)
})

test('a MUST-JUDGE workflow that did not judge refuses — a cancelled security scan is not a clean one', () => {
  const g = prePushForge(r({ ok: true, failing: [], notJudged: ['security'] }), true)
  assert.equal(g.refuse, true, 'ok:true with security unjudged is the exact shape post-push shipped and had to fix')
  assert.match(g.reason, /did NOT judge/)
})

test('UNMEASURED behind HEAD refuses — no run reported is not a pass', () => {
  assert.equal(prePushForge(r({ measured: false, ok: false }), true).refuse, true)
})

test('a MISSING receipt does NOT refuse, and says so — an absent verdict is not evidence of red', () => {
  const g = prePushForge(null, false)
  assert.equal(g.refuse, false)
  assert.match(g.reason, /UNMEASURED, and allowed/)
})

test('a red verdict for a sha NOT behind HEAD says nothing about this push', () => {
  assert.equal(prePushForge(r({ ok: false, failing: ['security'] }), false).refuse, false)
})

test('ACKNOWLEDGED lets the cure through, and only for its own sha', () => {
  const red = { ok: false, failing: ['security'] }
  assert.equal(prePushForge(r({ ...red, acknowledged: '7d9eae4e0abc' }), true).refuse, false)
  assert.equal(prePushForge(r({ ...red, acknowledged: 'some-other-sha' }), true).refuse, true,
    'an acknowledgement for a different sha must not carry over')
})

test('a verdict that is not ok and names nothing is refused — it cannot say why', () => {
  assert.equal(prePushForge(r({ ok: false }), true).refuse, true)
})

test('ROSTER: a workflow in neither column is a gap, so adding one forces a decision', () => {
  assert.deepEqual(rosterGaps(['security', 'dependency-review']), [], 'both columns claim these')
  assert.deepEqual(rosterGaps(['security', 'brand-new-workflow']), ['brand-new-workflow'])
})

test('the two columns are disjoint — a workflow cannot both must-judge and be exempt', () => {
  const overlap = MUST_JUDGE.filter((n) => n in NEED_NOT_JUDGE)
  assert.deepEqual(overlap, [])
  for (const [name, why] of Object.entries(NEED_NOT_JUDGE)) assert.ok(why.length > 10, `${name} must carry its reason for being exempt`)
})
