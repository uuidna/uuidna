// Every case below is a VIOLATION handed to the law, plus the lawful twin. A control that only proves refusal
// would equally pass a gate that refuses everything, which is the gate that gets switched off in a week.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prePushForge, rosterGaps, absentMustJudge, staleExemptions, mustJudge, MUST_JUDGE_BY_REF, NEED_NOT_JUDGE, type ForgeReceipt } from './forge-verdict.js'

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
  const every = [...MUST_JUDGE_BY_REF.branch, ...MUST_JUDGE_BY_REF.tag]
  assert.deepEqual(every.filter((n: string) => n in NEED_NOT_JUDGE), [])
  for (const [name, why] of Object.entries(NEED_NOT_JUDGE)) assert.ok(why.length > 10, `${name} must carry its reason for being exempt`)
})

// uuidna-49 refuted the flat set from the forge: publish and release are TAG-triggered, so on a push to main
// they produce NO ROW, and a must-judge workflow the event never triggers can never judge. Measured over 60
// runs: deploy 19 / security 18 / CodeQL 18 on push+main; publish 1 / release 1, tag only.
// the real check-run set on origin/main, measured — three of these are jobs of ONE workflow run
const LIVE = ['secret-scan', 'recomputable-audit', 'deploy', 'Analyze (actions)', 'Analyze (javascript-typescript)', 'dependency-review', 'Workers Builds: uuidna']

test('the live check set is fully rostered — every name is claimed by exactly one column', () => {
  assert.deepEqual(rosterGaps(LIVE), [], 'an unrostered check is a decision nobody made')
  assert.deepEqual(absentMustJudge(LIVE, 'branch'), [], 'an ordinary landing must not be refused')
  assert.deepEqual(staleExemptions(LIVE), [], 'every exemption is still arriving, so no reason is paperwork')
})

test('a must-judge check that produced NO ROW is caught — rosterGaps structurally cannot see a silence', () => {
  assert.deepEqual(absentMustJudge(['deploy'], 'branch'), ['recomputable-audit', 'secret-scan'])
  assert.deepEqual(rosterGaps(['deploy']), [], 'the survey of what ARRIVED reports nothing about what did not')
})

test('the TAG column is EMPTY because it was never measured — it refuses nothing and invents nothing', () => {
  assert.deepEqual(mustJudge('tag'), [], 'the v0.3.1 tag was deleted before its check names could be read')
  assert.deepEqual(absentMustJudge([], 'tag'), [], 'an unmeasured column must not refuse a tag push')
})

test('an exemption whose check STOPS ARRIVING is reported — a repaired gap keeps no paperwork', () => {
  const afterTheDashboardAct = LIVE.filter((n) => n !== 'Workers Builds: uuidna')
  assert.deepEqual(staleExemptions(afterTheDashboardAct), ['Workers Builds: uuidna'],
    'once disconnected, "it can never succeed" asserts something about a check that no longer exists')
  assert.deepEqual(absentMustJudge(afterTheDashboardAct, 'branch'), [], 'and its absence must not refuse the push')
})

test('a NEW check nobody rostered is a gap — a second Worker mints a new name', () => {
  assert.deepEqual(rosterGaps([...LIVE, 'Workers Builds: uuidna-edge']), ['Workers Builds: uuidna-edge'])
})
