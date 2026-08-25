// measurement-sources — EVERY PUBLISHED FIGURE, CARRIED IN THE ONE SHAPE. measurement.ts states the shape and
// the laws; this states where the tree's actual numbers come from and what class each is entitled to.
//
// The adapters are deliberately thin and deliberately separate. measurement.ts must not import a producer — a
// shape that knows its sources cannot be reused by a surface that has different ones, and the coupling would run
// the wrong way. So the shape stays pure and the knowledge of WHICH figure is `measured` and which is `declared`
// lives here, next to a comment saying why, where a reader checking a class can find the reasoning rather than
// inferring it from a literal.
//
// WHAT THE CLASSES COST TO GET RIGHT, in this tree specifically:
//   · A LEVEL'S REACH IS `declared`. quantum/advantage says it in its own words — reach "is the column a reader
//     is most tempted to read as a measurement, so it is the one that must be denied the flattering class it is
//     not entitled to". 2^128 states is true by construction; nothing was run and nothing could have come out
//     differently. Carrying it as `measured` would be the single most flattering lie available here.
//   · A LEVEL'S COST IS `measured` AND SEALS ONLY AS A DECADE. Three runs of one generator on one idle host gave
//     261, 330 and 332 ns. The decade was 2, 2, 2. The raw figure belongs in a build log.
//   · A BASELINE IS `convention`, NOT `measured`. REPORTED_BASELINE is the platforms' own published error rate.
//     uuidna measured none of it, the row says so, and the source is named.
//   · FIDELITY CARRIES ITS COUNT. Zero disagreements over N is a bound better than one in N — never a proof of
//     zero — and a bound without its denominator is a boast. `over` is the denominator and it travels.
//
// HONEST SCOPE: this reports how each figure was DETERMINED, never whether it is accurate. Integrity, not truth
// (theorem provenance_integrity_not_content_truth).
import type { Measurement } from './measurement.js'
import { gpuEligiblePpm, kernelPercent, CPU_NS_PER_ADDRESS } from './hardware/lanes/index.js'
import { LEVELS, REPORTED_BASELINE, type LevelMeasurement } from './quantum/advantage/index.js'

/** The executor's own figures. The two shares are RATIOS derived from a recorded gate run — a ratio is stable
 *  across runs in a way its numerator and denominator are not, which is exactly why the lane note publishes the
 *  share rather than the seconds. */
export function fromLanes(): Measurement[] {
  return [
    { subject: 'gate', metric: 'device-eligible share', value: gpuEligiblePpm(), unit: 'ppm',
      technique: 'measured', sealing: 'exact', source: 'hardware/lanes',
      note: 'the share of a gate pass a device lane could address at all — derived from a recorded run, published as a ratio because the ratio is what holds still' },
    { subject: 'gate', metric: 'Lean kernel share', value: kernelPercent(), unit: 'percent',
      technique: 'measured', sealing: 'exact', source: 'hardware/lanes',
      note: 'the share the proof checker holds, which no lane assignment touches' },
    // FLAGGED ON PURPOSE. This is a raw wall-clock ns written as a source constant, and `violations` will name it
    // under the decade law. It is carried anyway rather than quietly reclassified: the auditor's complaint is the
    // honest output, and whether a HAND-RECORDED constant deserves the same treatment as a REGENERATED seal is a
    // judgement for the humans who own the lane note. The shape cannot currently tell those two apart, and
    // inventing a field to excuse this one figure would be fitting the instrument to the answer.
    { subject: 'address', metric: 'CPU fold cost', value: CPU_NS_PER_ADDRESS, unit: 'ns',
      technique: 'measured', sealing: 'exact', source: 'hardware/lanes',
      note: 'a hand-recorded constant, not a regenerated seal — see violations(), which flags it under the decade law' },
  ]
}

/** The reported baseline the fidelity comparison is drawn against. Nothing here was measured by uuidna. */
export function fromBaseline(): Measurement[] {
  return [
    { subject: REPORTED_BASELINE.name, metric: 'published two-qubit gate error', value: REPORTED_BASELINE.errorsPerMillion,
      unit: 'count', technique: 'convention', sealing: 'exact', source: REPORTED_BASELINE.source,
      note: 'errors per million operations, from the platforms\' own literature — deliberately coarse, because a per-device rate drifts with calibration and pinning one we do not measure would be the substitution this refuses' },
    { subject: REPORTED_BASELINE.name, metric: 'published gate time', value: REPORTED_BASELINE.gateNs, unit: 'ns',
      technique: 'convention', sealing: 'exact', source: REPORTED_BASELINE.source },
  ]
}

/** One measured level, carried as its three honest rows: cost (measured, decade-sealed), fidelity (measured, with
 *  its denominator) and reach (declared, exact). The caller supplies the measurement because taking it requires
 *  the scripts boundary — the library layer may not read a clock. */
export function fromLevel(m: LevelMeasurement): Measurement[] {
  const level = LEVELS.find((l) => l.name === m.level)
  const rows: Measurement[] = [
    { subject: m.level, metric: 'operation cost', value: m.opNsDecade, unit: 'ns', technique: 'measured',
      sealing: 'decade', over: m.costOps, source: 'quantum/advantage',
      note: `the DECADE of the steady-state floor over ${m.costOps} ops; the raw floor (${m.opNs} ns) is a build-log figure and has no fixed point` },
    { subject: m.level, metric: 'sealed-value disagreements', value: m.disagreements, unit: 'count',
      technique: 'measured', sealing: 'exact', over: m.ops, source: 'quantum/advantage',
      note: `${m.disagreements} of ${m.ops} executions disagreed with the value Lean sealed — an upper BOUND on the error rate, never a proof of zero` },
  ]
  if (level) rows.push(
    { subject: m.level, metric: 'reach', value: level.pow2, unit: 'states', technique: 'declared', sealing: 'exact',
      source: 'quantum/advantage',
      note: 'true by construction — nothing was run and nothing could have come out differently; the column most tempted to be read as a measurement' })
  return rows
}

/** Every figure the library layer can carry without touching the host, plus any measured levels the caller took.
 *  A surface calls this once and filters it, instead of each surface knowing which module holds which number. */
export function allMeasurements(levels: readonly LevelMeasurement[] = []): Measurement[] {
  return [...fromLanes(), ...fromBaseline(), ...levels.flatMap(fromLevel)]
}
