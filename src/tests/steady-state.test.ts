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
const sweep = () => { const seen = new Set<string>(); for (const t of T) seen.add(toUuid(t.statement)) }

// THE COLD PASS, TIMED FIRST — before any warm-up in this process, or there is nothing cold left to observe.
const cold0 = performance.now()
sweep()
const coldNs = ((performance.now() - cold0) * 1e6) / T.length

test('the cold pass is an outlier, which is why timing one of them sealed the wrong order of magnitude', () => {
  const s = steadyStateNs(sweep, T.length)
  // measured on the build host the gap was ~280x (10662 ns cold against a 38 ns floor); asserting only 2x keeps
  // the test honest on a slow or busy machine while still failing loudly if the cold tax ever vanishes — in which
  // case the old single-pass measurement was sound and this module should go, not be kept out of politeness
  assert.ok(coldNs > s.ns * 2,
    `the first sweep of a fresh process must cost visibly more than the steady floor, got cold ${coldNs.toFixed(0)} ns vs floor ${s.ns} ns`)
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

test('the floor is never above the mean — the estimator picks the host, not the mood', () => {
  const s = steadyStateNs(sweep, T.length)
  let total = 0
  const runs = 5
  for (let i = 0; i < runs; i++) {
    const t0 = performance.now()
    sweep()
    total += ((performance.now() - t0) * 1e6) / T.length
  }
  // this is the one-sidedness itself, checked rather than asserted in the prose: interruptions can only ADD, so
  // the mean of any sample sits at or above the floor. If it did not, the minimum would be picking up noise
  // instead of subtracting it, and the decade would be as unstable as before under a different disguise.
  assert.ok(total / runs >= s.ns - 1,
    `the mean of ${runs} passes (${(total / runs).toFixed(0)} ns) fell below the floor (${s.ns} ns)`)
})
