// gate-all — the law that independent verdicts are computed TOGETHER.
//
// `npm run audit` joins twenty-nine steps with `&&`, so it stops at the first failure. Bringing the dormant-backlog
// work to green cost SEVEN full passes — stale axiom witness, Math.* determinism reject, heartbeats missing four,
// two injected thin wrappers, heartbeats again, spin drift, derived diff — every one of which was already true on
// the first pass. Independence is also the licence to run them CONCURRENTLY: the first version of this script
// collected all the verdicts but still walked them linearly, which is why it was slow.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { plan, kindOf, runPlan, pool, label } from '../scripts/gate-all.js'

const CHAIN = 'npm run lean && npm run build && node dist/scripts/gen-lines.js && node dist/scripts/guard.js'
  + ' && node dist/scripts/gen-reports.js && node dist/scripts/spin.js && node dist/scripts/conformance.js'
  + ' && node dist/scripts/exercise-dormant.js && git diff --exit-code -- lean/'

const green = async () => ({ exit: 0, out: '' })

test('the plan is READ from the chain, so it cannot drift from what audit runs', () => {
  const steps = plan(CHAIN)
  assert.equal(steps.length, 9)
  assert.deepEqual(steps.map((s) => s.kind),
    ['generator', 'generator', 'generator', 'check', 'generator', 'check', 'check', 'serial-check', 'serial-check'])
})

test('the three classes are told apart by what a step DOES', () => {
  assert.equal(kindOf('node dist/scripts/gen-mcp.js'), 'generator', 'gen-* writes inputs for later steps')
  assert.equal(kindOf('npx vitepress build docs'), 'generator')
  assert.equal(kindOf('node dist/scripts/harmonic-scan.js'), 'check', 'a scanner renders a verdict and feeds nothing')
  assert.equal(kindOf('node dist/scripts/exercise-dormant.js'), 'serial-check', 'it dirties the tree and restores it')
  assert.equal(kindOf('git diff --exit-code -- lean/'), 'serial-check', 'it READS the tree to decide')
})

// ── THE POINT (1): every failing check is reported from one pass.
test('every failing CHECK is reported in a single pass', async () => {
  const failing = new Set(['node dist/scripts/guard.js', 'node dist/scripts/spin.js', 'node dist/scripts/conformance.js'])
  const { verdicts, aborted } = await runPlan(plan(CHAIN), async (cmd) => ({ exit: failing.has(cmd) ? 1 : 0, out: '' }), 8)
  assert.equal(aborted, null, 'no generator failed, so nothing may abort')
  assert.equal(verdicts.length, 9, 'the walk must reach EVERY step')
  assert.deepEqual(verdicts.filter((v) => v.exit !== 0).map((v) => v.cmd).sort(), [...failing].sort())
})

// ── THE POINT (2): the read-only checks actually overlap in time. A linear walk would serialise them.
test('read-only checks run CONCURRENTLY — the linear walk was the slowness', async () => {
  let inFlight = 0, peak = 0
  const { verdicts } = await runPlan(plan(CHAIN), async (cmd) => {
    if (kindOf(cmd) === 'check') {
      inFlight++; peak = inFlight > peak ? inFlight : peak
      await new Promise((r) => setTimeout(r, 20))
      inFlight--
    }
    return { exit: 0, out: '' }
  }, 8)
  assert.equal(verdicts.length, 9)
  assert.ok(peak >= 3, `all three read-only checks must overlap; peak concurrency was ${peak}`)
})

// ── and the tree-touching ones must NOT overlap, with anything.
test('tree-touching checks never share the tree — they run strictly alone', async () => {
  let inFlight = 0, serialPeak = 0
  await runPlan(plan(CHAIN), async (cmd) => {
    inFlight++
    if (kindOf(cmd) === 'serial-check') serialPeak = inFlight > serialPeak ? inFlight : serialPeak
    await new Promise((r) => setTimeout(r, 5))
    inFlight--
    return { exit: 0, out: '' }
  }, 8)
  assert.equal(serialPeak, 1, 'exercise-dormant dirties the tree; git diff reads it — they must never overlap')
})

test('a failing GENERATOR still aborts — later steps read what it never wrote', async () => {
  const { verdicts, aborted } = await runPlan(plan(CHAIN),
    async (cmd) => ({ exit: cmd === 'node dist/scripts/gen-lines.js' ? 1 : 0, out: '' }), 8)
  assert.equal(aborted, 'node dist/scripts/gen-lines.js')
  assert.equal(verdicts.length, 3, 'the walk stops AT the failed generator')
})

test('a check failing never stops the generators or the checks that follow it', async () => {
  const { verdicts, aborted } = await runPlan(plan(CHAIN),
    async (cmd) => ({ exit: cmd === 'node dist/scripts/guard.js' ? 1 : 0, out: '' }), 8)
  assert.equal(aborted, null)
  assert.equal(verdicts.length, 9)
  assert.equal(verdicts.filter((v) => v.exit !== 0).length, 1)
})

test('an all-green chain reports no failures and never aborts', async () => {
  const { verdicts, aborted } = await runPlan(plan(CHAIN), green, 8)
  assert.equal(aborted, null)
  assert.equal(verdicts.filter((v) => v.exit !== 0).length, 0)
})

test('pool honours its limit and preserves result order', async () => {
  let inFlight = 0, peak = 0
  const out = await pool(Array.from({ length: 12 }, (_, i) => async () => {
    inFlight++; peak = inFlight > peak ? inFlight : peak
    await new Promise((r) => setTimeout(r, 5))
    inFlight--
    return i
  }), 4)
  assert.deepEqual(out, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 'order must survive concurrency')
  assert.ok(peak <= 4, `the limit must hold; peak was ${peak}`)
  assert.ok(peak > 1, 'and it must actually run more than one at a time')
})

test('labels stay short enough to read as a table', () => {
  assert.equal(label('node dist/scripts/exercise-dormant.js'), 'exercise-dormant')
  assert.equal(label('npm run build'), 'npm:build')
  assert.equal(label('node --test dist/tests/*.test.js'), 'test dist/tests', 'a test step names its suite — the 50-second stranger of lead 132b, never again bare "node"')
  assert.equal(label('node --test docs/.vitepress/theme/*.test.ts'), 'test docs/.vitepress/theme')
  assert.ok(label('git diff --exit-code -- lean/ src/theorems/generated.ts README.md llm.txt').length <= 46)
})
