// @non-harmonic: measures wall-clock (performance.now, node:perf_hooks) — used ONLY to MEASURE, the same named
// exemption crypto-measure.ts and gen-quantum-capacity.ts carry. Never imported by the harmonic core.
//
// steady-state — A COLD PASS MEASURES THE COMPILER, NOT THE WORK.
//
// gen-quantum-capacity timed ONE sweep of the sealed ledger in a fresh process and stored its decade, on the
// stated reasoning that "a decade reseals, a raw number drifts". The decade did not reseal. The derived layer
// flip-flopped between 10^3 and 10^4 ns — README.md, lean/quantum-capacity.json and lean/quantum-capacity.md
// alternating between exactly TWO coins, each `npm run reconcile` sealing one state and the next run restoring
// the other. That is a fixed point the tree did not have, and spin was right to hard-reject it every time; the
// string of Reconcile commits that "fixed" it were each other's undoing.
//
// THE CAUSE: the first sweep of a fresh process is not a measurement of the sweep. Measured on the build host,
// twelve consecutive sweeps of the same 1689-theorem ledger in one process:
//     pass 0 — 10662 ns per fold        passes 1..11 — 48 to 132 ns per fold
// The sealed figure was ~280x the real cost and was dominated by JIT compilation and first-touch. Noise that
// large straddles a decade boundary, so which order of magnitude got sealed was decided by how busy the machine
// happened to be for one millisecond.
//
// THE CURE is the standard one, and it is two rules:
//   WARM FIRST — discard the passes that compile. What they time happens once per process and never again.
//   TAKE THE FLOOR, NOT THE MEAN — noise on a shared host is ONE-SIDED. A scheduler slice, a GC, another agent's
//     audit running in the next lane can only ever ADD time to a pass; nothing can make the work cheaper than it
//     actually is. So the minimum over N passes is the host's true cost, and the mean measures the operating
//     system's mood. The floor is the estimator that CONVERGES — that it also reads well is a consequence, not
//     the reason, and the ceiling would be the flattering-in-reverse mistake.
//
// Measured across 8 independent process launches the floor lands on 38-39 ns — a 2.6% spread, where the single
// cold pass spanned a full order of magnitude. THAT is a figure a decade can honestly be taken of.
import { performance } from 'node:perf_hooks'

const WARMUP = 3
const PASSES = 20

export interface SteadyState {
  /** the floor over `passes` timed passes, in nanoseconds per unit — the host's true per-unit cost */
  ns: number
  /** its order of magnitude: the value stored in a sealed report, because a raw figure drifts and this does not */
  decade: number
  passes: number
  warmup: number
}

/** Time `work` in its STEADY STATE: warm the process, then take the floor of `passes` timed passes.
 *  `units` is how many units of work one pass performs, so the result is the per-unit cost. */
export function steadyStateNs(work: () => void, units: number, passes = PASSES, warmup = WARMUP): SteadyState {
  for (let i = 0; i < warmup; i++) work()
  let floor = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < passes; i++) {
    const t0 = performance.now()
    work()
    const ns = ((performance.now() - t0) * 1e6) / units
    if (ns < floor) floor = ns
  }
  const ns = Number(floor.toFixed(0))
  // no Math.* anywhere (the determinism hard-reject has no exemption): the digit count carries the decade
  return { ns, decade: String(ns).length - 1, passes, warmup }
}
