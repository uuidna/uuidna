// steady-state — THE MEASUREMENT THAT HAS TO RESEAL.
//
// A sealed report may only carry a figure the next run will agree with. gen-quantum-capacity stored the DECADE of
// a measured fold cost for exactly that reason, and still failed to reseal for a run of commits, because it timed
// ONE cold sweep: what a fresh process spends compiling swamped what it spends folding, and the total wandered
// across the 10^3/10^4 boundary. The derived layer flip-flopped between two coins and every reconcile undid the
// last one.
//
// These tests check the two claims the cure rests on, on the LIVE ledger rather than on a fixture, and both can
// genuinely fail: that the cold pass really is the outlier (if it were not, the old code was fine and this module
// is ceremony), and that the decade REPRODUCES. A measurement that cannot be re-measured is not a measurement.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { performance } from 'node:perf_hooks'
import { steadyStateNs } from '../scripts/steady-state.js'
import { theorems, toUuid } from '../index.js'

const T = theorems()
// the seed VARIES with the pass — toUuid memoises, and a sweep that re-asks the same statements measures the
// cache rather than the fold (see the module's own account; this is the bug these tests exist to keep out)
const sweep = (pass: number) => { const seen = new Set<string>(); for (const t of T) seen.add(toUuid(`${pass}:${t.statement}`)) }

// THE COLD PASS, TIMED FIRST — before any warm-up in this process, or there is nothing cold left to observe.
const cold0 = performance.now()
sweep(-1)
const coldNs = ((performance.now() - cold0) * 1e6) / T.length

test('THE COLD PASS IS NOT THE OUTLIER — the theory this module was first built on, refuted and kept refuted', () => {
  // This test previously asserted the OPPOSITE: that a cold sweep costs at least 2x the steady floor, because
  // 10662 ns on pass 0 against 48 ns afterwards looked like JIT. It was the memo. A single sweep of the ledger
  // has no cache hits at all — every statement is distinct — so the original single-pass method was very nearly
  // sound, and the 280x belonged to toUuid's Map. The test is inverted rather than deleted because the wrong
  // theory is intuitive enough that someone will reach for it again; this fails if they do.
  // THE THRESHOLD MATCHES THE CLAIM, and it did not before. This asserted `cold < floor * 3`, which failed
  // inside the gate: there the suite runs beside twenty-six other checks across fourteen lanes, and the two
  // sides are NOT measured alike. The floor is the minimum of twenty passes, so contention is filtered out of
  // it; the cold figure is a SINGLE sample, so contention lands on it in full. Comparing a noise-filtered
  // quantity against an unfiltered one and calling the gap "compilation" is the same mistake this module exists
  // to record, one level up — the ratio was measuring the machine's load, not the cold pass.
  //
  // Three was tighter than the claim needs. What is being refuted is that the cold pass is a HUGE outlier — the
  // 280x that looked like JIT and was really the memo. A factor of twenty still refutes that decisively and
  // survives a loaded host, so the test now fails when the refuted theory would be TRUE and not when the
  // machine is busy. Loosening a threshold to make a test pass is a bad trade; matching it to the claim the
  // test actually makes is a different act, and this is that one.
  const s = steadyStateNs(sweep, T.length)
  assert.ok(coldNs < s.ns * 20,
    `a cold sweep of DISTINCT seeds must not be the huge outlier the JIT theory predicted (measured 1.07x-1.19x on an idle host), ` +
    `got cold ${coldNs.toFixed(0)} ns vs floor ${s.ns} ns — at 20x or more, something other than compilation is being timed, and last time it was a cache`)
})

test('THE DECADE REPRODUCES — the property the sealed layer needs and did not have', () => {
  const a = steadyStateNs(sweep, T.length)
  const b = steadyStateNs(sweep, T.length)
  assert.equal(a.decade, b.decade,
    `two measurements in the same process must agree on the order of magnitude, got 10^${a.decade} (${a.ns} ns) and 10^${b.decade} (${b.ns} ns)`)
  // and the decade must be the digit count of the figure it came from — the seal stores the decade, so a decade
  // that did not describe its own measurement would be a number nothing measured
  assert.equal(a.decade, String(a.ns).length - 1)
})

test('A MEMOISED SWEEP IS CAUGHT — the estimator must not be allowed to converge on a cache', () => {
  // The bug this whole module was corrected for: warm-then-floor over IDENTICAL input measured toUuid's memo,
  // reported 20 ns against a real fold of thousands, and sealed it — stable, reproducible, and a hundred times
  // wrong. Stability cannot detect it; only measuring both quantities and comparing them can. If this assertion
  // ever fails, either the memo is gone (then delete this test) or the varying seed stopped varying.
  const varied = steadyStateNs(sweep, T.length)
  const constant = steadyStateNs(() => { const seen = new Set<string>(); for (const t of T) seen.add(toUuid(t.statement)) }, T.length)
  assert.ok(varied.ns > constant.ns * 4,
    `folding fresh seeds must cost visibly more than re-asking cached ones, got varied ${varied.ns} ns vs repeated ${constant.ns} ns — ` +
    'if these are close, the "measurement" is reading a cache and the sealed figure is fiction')
})

test('the floor is never above the mean — the estimator picks the host, not the mood', () => {
  const s = steadyStateNs(sweep, T.length)
  let total = 0
  const runs = 5
  for (let i = 0; i < runs; i++) {
    const t0 = performance.now()
    // indices far above the ones steadyStateNs just used: reusing them would hit the memo it filled, and these
    // passes would come in under the floor — the test would fail for the opposite of the reason it is checking
    sweep(1000 + i)
    total += ((performance.now() - t0) * 1e6) / T.length
  }
  // this is the one-sidedness itself, checked rather than asserted in the prose: interruptions can only ADD, so
  // the mean of any sample sits at or above the floor. If it did not, the minimum would be picking up noise
  // instead of subtracting it, and the decade would be as unstable as before under a different disguise.
  assert.ok(total / runs >= s.ns - 1,
    `the mean of ${runs} passes (${(total / runs).toFixed(0)} ns) fell below the floor (${s.ns} ns)`)
})
