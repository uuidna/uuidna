// @non-harmonic: measures wall-clock (performance.now, node:perf_hooks) — used ONLY to MEASURE, the same named
// exemption crypto-measure.ts and gen-quantum-capacity.ts carry. Never imported by the harmonic core.
//
// steady-state — A STABLE NUMBER IS NOT A TRUE ONE.
//
// This module's first version was written to cure a flip-flop and it CAUSED A WORSE ONE, so the history is the
// documentation and is kept in full. Anyone who shortens it to the conclusion will re-derive the mistake.
//
// THE SYMPTOM: gen-quantum-capacity timed ONE sweep of the sealed ledger in a fresh process and stored its
// decade, on the stated reasoning that "a decade reseals, a raw number drifts". The decade did not reseal.
// README.md and lean/quantum-capacity.{json,md} alternated between exactly two coins, each `npm run reconcile`
// sealing one state and the next run restoring the other — a run of Reconcile commits that were each other's
// undoing.
//
// THE FIRST DIAGNOSIS, WHICH WAS WRONG: twelve sweeps in one process read 10662 ns on pass 0 and 48-132 ns
// afterwards, and that was read as JIT compilation — cold start swamping the work. It is not. toUuid memoises
// every seed in an unbounded Map, so pass 0 folded 1689 addresses and passes 1-11 served them from a cache.
// The 280x was the CACHE, not the compiler. Measured properly, a cold sweep costs only 1.07x to 1.19x a warm
// memo-free one, because a single pass over the ledger has no cache hits in it at all — every statement is
// distinct. The original single-pass method was very nearly sound.
//
// THE FIRST CURE, WHICH WAS WORSE THAN THE DISEASE: warm first, then take the floor of twenty passes — over the
// SAME statements. It measured the memo. 20 ns against a true ~2000, sealed, and stable to a few percent. A
// flip-flop announces itself; a wrong fixed point does not.
//
// THE ACTUAL CAUSE, found only by running a KNOWN-GOOD instrument ten times: the ledger's fold cost through the
// old BigInt multiply lands within ~1% of 10000 ns. Ten launches of the corrected estimator — memo defeated,
// fixed-width seeds, warm, floor of 20, reproducible to 3.8% — sealed decade 4 in FOUR OF TEN. Nothing was
// wrong with that instrument. A ~1% margin against a ~4% spread is a coin flip, and no estimator quality buys
// you the side of a threshold. Cold start, contention and the memo were only ever things that tipped a coin
// already balanced on its edge.
//
// WHAT SURVIVES, and why the module still exists:
//   WARM FIRST — discard the passes that compile; what they time happens once per process and never again.
//   TAKE THE FLOOR, NOT THE MEAN — host noise is ONE-SIDED. A scheduler slice, a GC, another session's audit in
//     the next lane can only ever ADD time; nothing makes the work cheaper than it is. The minimum converges on
//     the host, the mean measures the operating system's mood.
//   VARY THE INPUT WITH THE PASS — see the `work` signature. Without this the two rules above converge, tightly
//     and reproducibly, on whatever a cache is willing to hand back.
//   REPORT THE MARGIN — see `edgeMargin`. A caller quantising to a decade must be able to refuse.
//
// THE ONE SENTENCE: warm-then-floor converges just as tightly on the wrong quantity as on the right one, so
// precision is evidence of nothing on its own. Stability and validity are independent, and each needs its own
// gate — `edgeMargin` for the first, and for the second a control that feeds the estimator the input which
// breaks it and demands the reading collapse (gen-quantum-capacity runs exactly that before it seals).
import { performance } from 'node:perf_hooks'

const WARMUP = 3
const PASSES = 20

/** Monotonic for the life of the process, never reset per call — a seed handed to `work` is never handed out
 *  twice, so a memoising caller measured TWICE in one process still folds fresh input the second time. */
let nextPass = 0

export interface SteadyState {
  /** the floor over `passes` timed passes, in nanoseconds per unit — the host's true per-unit cost */
  ns: number
  /** its order of magnitude: the value a sealed report stores, because a raw figure drifts and this does not */
  decade: number
  /** How far the measurement sits from the NEARER edge of its decade, as a multiple: 1 means exactly on an edge,
   *  ~3.16 means dead centre. THIS IS THE FIELD THAT SAYS WHETHER THE DECADE MAY BE SEALED AT ALL. Rounding to
   *  an order of magnitude is only stable when the value is not near a boundary. Measured against the ledger's
   *  fold cost at ~1% from its edge, ten launches of a CORRECT estimator — memo defeated, fixed-width seeds,
   *  warm, floor of 20, reproducible to 3.8% — sealed the wrong decade four times in ten. Nothing was wrong with
   *  the instrument; a ~1% margin against a ~4% spread is a coin flip, and no amount of estimator quality buys
   *  you the side of a threshold. A caller that seals a decade without reading this is publishing a fixed point
   *  that does not exist.
   *
   *  IT MEASURES STABILITY, NEVER VALIDITY, AND THE TWO ARE ORTHOGONAL — stated here rather than in a commit
   *  because collapsing them back into one "measurement guard" would re-hide the bug that made this field
   *  necessary. When this module timed a memoised sweep it read 20 ns instead of ~2000, and that reading passes
   *  the margin check comfortably (margin 2.0, mid-decade): a cache is perfectly stable and completely wrong.
   *  Margin asks "will this decade hold?"; only measuring the varied and repeated forms and comparing them asks
   *  "is this the quantity I meant?". A green margin is not evidence of a real measurement. */
  edgeMargin: number
  passes: number
  warmup: number
}

/** The margin a decade needs before it can be sealed. At 1.5 the value must sit at least half again above its
 *  decade's floor and half again below its ceiling. Chosen against MEASURED failures rather than by taste: the
 *  BigInt fold path, timed by three independent instruments at 9368-10139 ns, gives margins of 1.02x to 1.07x
 *  and demonstrably flipped decade in 4 of 10 launches — refused. The split-multiply path at ~2000 ns gives
 *  1.98x and held on every process anyone ran — admitted. The threshold sits between a measured coin flip and a
 *  measured fixed point, which is the only place a threshold can honestly be put. */
export const SEALABLE_MARGIN = 1.5

/** Time `work` in its STEADY STATE: warm the process, then take the floor of `passes` timed passes.
 *  `units` is how many units of work one pass performs, so the result is the per-unit cost.
 *
 *  THE PASS INDEX IS NOT DECORATION — IF A MEMO SITS IN THE PATH, VARY THE INPUT WITH IT. `work` receives the
 *  pass number precisely so it can fold a different seed each time. This function's own first version did not
 *  offer one, and the first caller swept the SAME ledger statements on every pass; toUuid memoises every seed it
 *  has ever seen in an unbounded Map, so warm-up populated the cache and all twenty timed passes measured a Map
 *  lookup. Floor of 20 ns against a true fold cost of ~2600 ns on the same host: wrong by a factor of a hundred,
 *  and SEALED, because it was beautifully stable. Warm-then-floor converges just as tightly on the wrong
 *  quantity as on the right one, and a memo is the commonest way to be handed the wrong one.
 *
 *  That is the estimator's real limit and it deserves stating flatly: THE FLOOR TELLS YOU HOW CHEAP THE WORK CAN
 *  BE, NEVER WHETHER YOU MEASURED THE WORK. Stability is not evidence of validity — the two feel alike from
 *  inside, and only the second one is the claim a sealed report makes. */
export function steadyStateNs(work: (pass: number) => void, units: number, passes = PASSES, warmup = WARMUP): SteadyState {
  // THE COUNTER IS PROCESS-WIDE (nextPass), not per-call, and that is load-bearing rather than tidy. It already
  // had to span warm-up AND the timed passes, or warm-up would pre-populate a memoising caller's cache with
  // exactly the seeds about to be timed. But a counter that restarted at 0 on each CALL has the same defect one
  // level up: the second call hands back the very seeds the first call cached, so measuring twice in one process
  // — precisely what the memo control below does, and what any before/after comparison does — silently reads the
  // cache on the second measurement. That is the original bug reintroduced by the fix for it, in the function
  // written to prevent it. The test that measures the varied and cached forms and compares them caught it.
  for (let i = 0; i < warmup; i++) work(nextPass++)
  let floor = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < passes; i++) {
    const t0 = performance.now()
    work(nextPass++)
    const ns = ((performance.now() - t0) * 1e6) / units
    if (ns < floor) floor = ns
  }
  const ns = Number(floor.toFixed(0))
  // no Math.* anywhere (the determinism hard-reject has no exemption): the digit count carries the decade
  const decade = String(ns).length - 1
  // distance to whichever edge is nearer, as a multiple — how far above this decade's floor, how far below its
  // ceiling, smaller wins. Both are >= 1 by construction, so 1 means sitting exactly on an edge.
  const above = ns / 10 ** decade
  const below = 10 ** (decade + 1) / ns
  return { ns, decade, edgeMargin: above < below ? above : below, passes, warmup }
}
