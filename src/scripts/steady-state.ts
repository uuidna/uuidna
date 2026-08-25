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
// every seed in an unbounded Map, so pass 0 folded the whole ledger and passes 1-11 served it from a cache.
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
//   ASK IF THE ESTIMATES AGREE — see AGREEMENT_ESTIMATES. A caller quantising to a decade must be able to refuse,
//     and the warrant for refusing is a repeated measurement, never a threshold standing in for one.
//
// THE ONE SENTENCE: warm-then-floor converges just as tightly on the wrong quantity as on the right one, so
// precision is evidence of nothing on its own. Stability and validity are independent, and each needs its own
// gate — repeated estimates agreeing on the decade for the first, and for the second a control that feeds the
// estimator the input which breaks it and demands the reading collapse (gen-quantum-capacity runs both before
// it seals).
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
  passes: number
  warmup: number
}

// THE MARGIN USED TO BE COMPUTED HERE AND IS NOT ANY MORE — deleted rather than deprecated, because a second
// implementation of one quantity is the drift this tree spends its time removing. `quantum/advantage/marginOf`
// owns it, and owns it BETTER: it works in integer hundredths where this returned a float, and the determinism
// law admits no float where an integer will do. Callers take margin and spread from there.
//
// STABILITY AND VALIDITY REMAIN ORTHOGONAL, which is the one thing that must not be lost with the field. Margin
// asks "will this decade hold?"; only measuring the varied and repeated forms and comparing them asks "is this
// the quantity I meant?". When this module timed a memoised sweep it read 20 ns instead of ~2000 — and that
// reading sits mid-decade and passes any margin check comfortably. A cache is perfectly stable and completely
// wrong, so a green margin is never evidence of a real measurement. Both gates, or neither is worth having.

/** How many independent estimates a caller takes before deciding a decade will hold.
 *
 *  THIS REPLACED A THRESHOLD, AND THE REPLACEMENT IS THE POINT. The gate here was once `SEALABLE_MARGIN = 1.5`:
 *  the value had to sit half again clear of both edges of its decade. That constant was justified against real
 *  measured failures, which is what made it convincing and what made it wrong — it is a guess about ONE host's
 *  noise on ONE night wearing the clothes of a law. It refuses a genuinely reproducible reading that happens to
 *  land 1.1x from an edge, and it accepts 1.6x on a machine that swings 2x. No better constant exists, because
 *  the quantity a constant is standing in for is the host's noise, and that is measurable.
 *
 *  So the question is asked directly instead — would the next run seal this same decade? — and answered by
 *  repeating the estimate (quantum/advantage's `decadesAgree`). Margin is still computed and still published,
 *  but as the DIAGNOSIS rather than the verdict: it explains WHY estimates disagreed, compared against the
 *  spread actually observed. Both numbers come from this host in this build, and neither is chosen in advance.
 *
 *  Two is the minimum that can answer the question at all — a single estimate is trivially unanimous and proves
 *  nothing — and five is cheap here (about 80 ms per estimate over the ledger) while giving noise room to show. */
export const AGREEMENT_ESTIMATES = 5

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
  return { ns, decade, passes, warmup }
}
