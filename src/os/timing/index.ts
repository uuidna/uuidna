// @non-harmonic: reads a WALL CLOCK — the one impure act here, and the reason this file sits under src/os.
//
// IT LIVES AT THE BOUNDARY BECAUSE THE HARD-REJECT HAS NO EXEMPTION. Written first as src/timing.ts, the guard
// answered with two charges and both were right: the rounding helper this file called in its browser fallback is
// refused tree-wide with no exemption, and a @non-harmonic marker in the CORE reads as stale because the core may
// not be non-harmonic at all. os/ and drivers/ are the named non-determinism boundary; a clock belongs there or
// nowhere. (The banned name is not spelled here either — a comment quoting it trips the same scanner, which is
// the lesson one-writer.ts already carries: if a token is banned, it is banned in prose too.)
//
// timing — THE NANOSECOND LAW, MADE CHECKABLE (the captain's standard: uuidnaOS computes in nanoseconds in the
// browser, and anything slower is a crack).
//
// WHY THIS FILE HAD TO EXIST. measure.ts opens by condemning exactly the work that produced every performance
// number this repository has ever quoted: "A one-liner is manual work wearing computation's clothes: it
// computes, and it is not reusable, sealed, testable or citable." The module that forbids it had no TIMING
// dimension, so the numbers kept coming from throwaway scripts — five of them in one session (71.3 ms to load
// the catalogue, 21.9 ms of field-splitting, 322 ns per handle read), each computed correctly and then gone.
//
// WHAT IS SEALED AND WHAT CANNOT BE. Every other measurement folds its VALUE into its receipt, so recomputing
// reproduces the address. A duration cannot work that way: the same code on the same tree gives a different
// number every run, and a receipt over it would change without anything changing. So the sealed value is the
// VERDICT — op, declared budget, and whether the op came in under it — which is stable while the code and the
// budget are. The nanoseconds are REPORTED for a person to read and deliberately not folded.
//
// AND A BUDGET IS A CLAIM ABOUT TWO THINGS. A failure here names the code OR the host: a loaded or slower
// machine fails a budget the code would pass elsewhere. That is why a red verdict is a CRACK TO LOOK AT rather
// than a proof of a defect, and why the budget is declared in the open where it can be argued with.
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'

/** the clock, named. hrtime where Node offers it, performance elsewhere, and a refusal by name when neither —
 *  never a silent zero, which would report every op as infinitely fast. */
const nowNs = (): number => {
  const p = (globalThis as { process?: { hrtime?: { bigint?: () => bigint } } }).process
  if (typeof p?.hrtime?.bigint === 'function') return Number(p.hrtime.bigint())
  const perf = (globalThis as { performance?: { now?: () => number } }).performance
  if (typeof perf?.now === 'function') return perf.now() * 1e6
  throw new Error('timing: no clock on this runtime — refusing to report a duration it cannot measure')
}

/** THE HOST, NAMED. A verdict about speed is a verdict about a machine, so the machine is on the record. */
export interface Arch { platform: string; arch: string; cpus: number }
export const hostArch = (): Arch => {
  const p = (globalThis as { process?: { platform?: string; arch?: string } }).process
  const nav = (globalThis as { navigator?: { hardwareConcurrency?: number } }).navigator
  return {
    platform: p?.platform ?? 'browser',
    arch: p?.arch ?? 'unknown',
    cpus: nav?.hardwareConcurrency ?? 0,
  }
}

/** CALIBRATION — the same fixed integer work on every host, measured every run. Budgets are expressed against
 *  THIS, never against a nanosecond count, because an absolute budget is a statement about the machine that
 *  happened to measure it. A CPU half the speed doubles both sides and the ratio survives; a regression in the
 *  code moves only one side, which is the thing a budget is for. This is what "timing per exact architecture"
 *  has to mean if a budget is to travel: the architecture calibrates itself and the claim stays comparable. */
export const calibrationNs = (): number => timeNs(() => { let s = 0; for (let i = 0; i < 64; i++) s = (s + i * 7) % 9; return s }, 2000)

export interface Budget { op: string; ratio: number; why: string }

/** THE DECLARED BUDGETS, as multiples of one calibration unit. Open to being argued with rather than hidden in
 *  a threshold, and portable: the absolute nanoseconds each ratio implied on the machine that set them are
 *  recorded in `why` as provenance, not as the test. */
export const BUDGETS: readonly Budget[] = [
  { op: 'handle.valueOf', ratio: 4, why: 'the lattice\'s smallest step — 322 ns against a ~180 ns calibration when set' },
  { op: 'catalogue.lookup', ratio: 40, why: 'an indexed read — 211 ns warm, 940 ns lazy when set' },
  { op: 'decide.arithmetic', ratio: 4_000, why: 'parses and evaluates a fragment; not a lattice step' },
]

export interface Timing { op: string; ns: number; units: number; budget: number; within: boolean }
export interface TimingCensus {
  definition: 'uuidna-timing-census'
  arch: Arch
  calibrationNs: number
  timings: Timing[]
  cracks: string[]         // ops over budget — named, never averaged away
  within: boolean
  receipt: string          // folds the VERDICTS and budgets, never the durations
  honest: string
}

/** timeNs(fn, iterations) → nanoseconds PER CALL. Iterated because a single call measures the clock as much as
 *  the code; the caller picks a count large enough that the work dominates. */
export function timeNs(fn: () => unknown, iterations = 1000): number {
  if (iterations < 1) throw new Error('timing: iterations must be at least 1 — an average over nothing is not a measurement')
  const a = nowNs()
  for (let i = 0; i < iterations; i++) fn()
  const b = nowNs()
  return (b - a) / iterations
}

/** timingCensus(ops) → each op against its declared budget. An op with no budget is REFUSED rather than passed:
 *  a timing with nothing to fail against is a number, not a verdict. */
export function timingCensus(ops: { op: string; run: () => unknown; iterations?: number }[]): TimingCensus {
  const unit = calibrationNs()
  if (unit <= 0) throw new Error('timing: the calibration measured zero — this clock is too coarse to judge anything')
  const timings: Timing[] = []
  for (const o of ops) {
    const b = BUDGETS.find((x) => x.op === o.op)
    if (!b) throw new Error(`timing: "${o.op}" has no declared budget — declare one in BUDGETS or do not measure it`)
    const ns = timeNs(o.run, o.iterations ?? 1000)
    const units = ns / unit
    timings.push({ op: o.op, ns, units, budget: b.ratio, within: units <= b.ratio })
  }
  const cracks = timings.filter((t) => !t.within).map((t) => t.op)
  return {
    definition: 'uuidna-timing-census',
    arch: hostArch(),
    calibrationNs: unit,
    timings,
    cracks,
    within: cracks.length === 0,
    // the fold covers op, budget and verdict — recomputable while the code and the budgets hold. The durations
    // are excluded on purpose: folding a clock reading would move this address on every run, for nothing.
    receipt: merkleGravity(timings.map((t) => toUuid(`timing|${t.op}|${t.budget}|${t.within}`))),
    honest:
      'Durations are MEASURED, verdicts are SEALED. The receipt folds op, budget and pass/fail — never the ' +
      'nanoseconds, which differ every run and would move the address without anything changing. Budgets are ' +
      'RATIOS against a calibration taken on the same host each run, so the same claim travels across machines: ' +
      'a slower CPU stretches both sides and the verdict holds, while a regression moves only one. The host is ' +
      'named in `arch` because a verdict about speed is a verdict about a machine. Reads a clock — @non-harmonic.',
  }
}
