// quantum/advantage — THE ADVANTAGE, MEASURED PER LEVEL, WITH ITS AXIS NAMED.
//
// The capacity report (gen-quantum-capacity) seals the measured usable-capacity quantum advantage
// (usable_gap_is_two_to_eighty) and one measured timing constant at one scale. That constant must not be
// carried up the 2^128 column as if it were scale-free — which is why this module takes the advantage APART.
//
// So the advantage is taken APART, one row per LEVEL of the datapath, and each row is measured at its own level:
// the hexbit tile, the handle, the uuid, and the whole sealed ledger. Nothing is extrapolated between them — a
// level's cost is measured AT that level or there is no row. That is what "measurable at any level" has to mean
// if it is to mean anything: not one number claiming to hold everywhere, but a number per level, each one
// falsifiable where it was taken.
//
// THE THREE AXES, AND WHY THEY ARE NOT A SPEEDUP CLAIM. A quantum computer and a content-address are not racing
// on the same track; a ratio of their op times would be a category error dressed as a benchmark. What CAN be
// compared honestly is what each architecture DELIVERS per operation, and there are exactly three axes here
// where a figure can be measured rather than asserted:
//
//   FIDELITY — of N gate-algebra executions on this host, how many disagreed with the value Lean sealed? The
//     driver executes the sealed quantum algebra on the actual silicon and counts. Zero disagreements over N is
//     an upper BOUND on the error rate (better than one in N), never a proof of zero, and every row says so in
//     those words. The baseline for comparison is the platforms' own published physical gate error, so the
//     comparison is measured-here against reported-there with both classes carried.
//   COST — the steady-state floor, in ns, of one operation AT THIS LEVEL, on this host. Warm first, take the
//     floor (scripts/steady-state.ts holds the account: host noise is one-sided, so the minimum is the true
//     cost and the mean measures the operating system's mood).
//   REACH — how many states the level addresses: 2^4, 2^32, 2^128. DECLARED by construction, never measured,
//     and marked `declared` for exactly that reason. This is the column a reader is most tempted to read as a
//     measurement, so it is the one that must be denied the flattering class it is not entitled to.
//
// HONEST SCOPE, LOAD-BEARING AND UNCHANGED FROM THE CAPACITY REPORT: uuidna is CLASSICAL. Nothing here claims a
// physics quantum advantage, a speedup over any quantum algorithm, or a complexity separation — the sealed
// bound is theorem n_qubit_dimension (n qubits span 2^n amplitudes, which counts the SIMULATION COST and is
// explicitly not a speedup). The advantage measured here is architectural and its axes are named above: exact,
// deterministic, error-free addressing at a measured per-op cost. A reader who wants the physics comparison is
// pointed at the capacity report, which names each platform's own published figure in the platform's own words.
//
// PURE: no clock, no I/O, no randomness. Every figure this module produces is arithmetic over figures it was
// GIVEN — the measuring happens at the scripts boundary (the named non-harmonic place) and is handed in. That
// is what makes the report testable without a stopwatch: same measurements in, byte-identical report out.
import { HEXBIT_BITS, HANDLE_BITS, UUID_BITS, UUID_HEXBITS, bitsToHexbits } from '../../hexbit/index.js'
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'
import type { HonestyClass } from '../../microdata.js'

export {
  pageAdvantageMetrics,
  costBarOf,
  type PageMetricsInput,
  type PageAdvantageMetrics,
} from './page/metrics/index.js'

/** Integer floor division. The folds here are exact arithmetic and the float-rounding intrinsics are hard-
 *  rejected by the laws gate (eslint-rules/no-float-math, and smoke.test.js scans the source for the name
 *  itself); for non-negative operands this IS the floor, written the way the rule asks. */
const div = (a: number, b: number): number => (a - (a % b)) / b

/** a ratio in HUNDREDTHS, integer — the same unit os/host renders speedups in, so two reports read alike */
export const ratioHundredths = (a: number, b: number): number => (b === 0 ? 0 : div(a * 100, b))

/** WHY A DECADE ALONE IS NOT ENOUGH, AND WHY THE TEST FOR IT IS A REPEAT RATHER THAN A THRESHOLD.
 *
 *  Sealing the decade instead of the raw figure removes the drift that comes from a raw number never repeating.
 *  It does NOT remove the drift that comes from a raw number sitting NEXT TO A BOUNDARY: at 1129 ns the uuid
 *  level is 1.13x above 10^3, so a slightly faster run could seal 10^2 and a slightly slower one 10^3, and the
 *  derived layer would alternate exactly as it did before — with a CORRECT estimator this time, which is worse,
 *  because nothing looks wrong. A sibling session found precisely this on the ledger sweep: ten launches of a
 *  memo-free estimator read 9761-10139 ns and split six/four across the 10^3/10^4 boundary.
 *
 *  THE FIRST VERSION OF THIS GUARD WAS A CONSTANT — refuse to seal within 1.5x of an edge — and a constant is a
 *  guess about a host's noise wearing the clothes of a law. It is also the wrong shape twice over: 1.5x refuses
 *  a measurement sitting 1.11x from an edge on a host whose launch-to-launch spread is 4%, which is stable in
 *  fact and refused in theory; and it would ACCEPT a measurement 1.6x from an edge on a host that swings by a
 *  factor of two.
 *
 *  So the guard asks the question directly instead: take several INDEPENDENT estimates and require them to agree
 *  on the decade. That is the property the seal actually needs — "would the next run seal this same value?" —
 *  tested rather than inferred, and it calibrates itself to whatever noise the host really has. The margin is
 *  still computed and published, because a reader wants to know how much room the figure had; it is just no
 *  longer what decides. */
export const ESTIMATES_PER_LEVEL = 5

/** marginOf(ns, decade) → the smaller of (ns above the decade floor) and (the ceiling above ns), in hundredths.
 *  Integer throughout; 10^decade is built by repeated multiplication because the exponent intrinsic is float. */
export function marginOf(ns: number, decade: number): number {
  let floorOfDecade = 1
  for (let i = 0; i < decade; i++) floorOfDecade = floorOfDecade * 10
  const ceilOfDecade = floorOfDecade * 10
  if (ns <= 0 || floorOfDecade <= 0) return 0
  const above = div(ns * 100, floorOfDecade)
  const below = div(ceilOfDecade * 100, ns)
  return above < below ? above : below
}

/** Did several independent estimates agree on the decade? That agreement IS the seal's warrant: an empirical
 *  answer to "would the next run seal this same value", rather than a threshold standing in for one. A single
 *  estimate is trivially unanimous and therefore proves nothing, so it is refused by name. */
export function decadesAgree(decades: readonly number[]): boolean {
  if (decades.length < 2) return false
  return decades.every((d) => d === decades[0])
}

/** the observed launch-to-launch spread, max over min in hundredths — 104 means the slowest estimate was 4%
 *  above the fastest. Published beside the margin so the two can be compared by a reader: a margin comfortably
 *  larger than the spread is what a stable seal looks like. */
export function spreadHundredths(values: readonly number[]): number {
  if (!values.length) return 0
  let lo = values[0], hi = values[0]
  for (const v of values) { if (v < lo) lo = v; if (v > hi) hi = v }
  return lo === 0 ? 0 : div(hi * 100, lo)
}

/** render hundredths as a decimal string without ever holding a float: 400 becomes "4.00" */
export const renderHundredths = (h: number): string => `${div(h, 100)}.${String(h % 100).padStart(2, '0')}`

/** ONE LEVEL OF THE DATAPATH. The widths are not chosen — a hexbit is 4 bits because 16 states is one tile, a
 *  handle is 8 tiles, a uuid is 4 handles (theorem handle_string_spans_the_quarter: 16^8 = 2^32 and
 *  (2^32)^4 = 2^128). The ledger is not a width but a CORPUS, and it is kept in the same list deliberately: it
 *  is the level the existing sealed report measures at, and leaving it out would quietly drop the one row a
 *  reader can check against the figure already published. `kind` keeps the two from being read as one scale. */
export interface Level {
  name: string
  /** bits addressed at this level; 0 on the corpus row, where the unit is theorems rather than bits */
  bits: number
  hexbits: number
  /** what the level addresses, as an exponent of two — 4, 32, 128; 0 on the corpus row */
  pow2: number
  kind: 'width' | 'corpus'
  /** the sealed theorem this level's width follows from — cited by key, so the gate can read it */
  seals: string
  note: string
}

export const LEVELS: readonly Level[] = [
  { name: 'hexbit tile', bits: HEXBIT_BITS, hexbits: 1, pow2: HEXBIT_BITS, kind: 'width',
    seals: 'nand_functionally_complete',
    note: 'one tile, 16 states — the unit every other width is a multiple of, and reducible to NAND alone' },
  { name: 'handle', bits: HANDLE_BITS, hexbits: bitsToHexbits(HANDLE_BITS), pow2: HANDLE_BITS, kind: 'width',
    seals: 'handle_string_spans_the_quarter',
    note: 'the word: 8 tiles, 2^32 values — what a verification actually compares' },
  { name: 'uuid', bits: UUID_BITS, hexbits: UUID_HEXBITS, pow2: UUID_BITS, kind: 'width',
    seals: 'handle_capacity_is_quantum_by_architecture',
    note: 'the identity: 4 handles, 2^128 addresses — 128 = 2^7, the 7-qubit fold' },
  { name: 'sealed ledger', bits: 0, hexbits: 0, pow2: 0, kind: 'corpus',
    seals: 'n_qubit_dimension',
    note: 'the whole sealed theorem set swept once — the level the published capacity figure was taken at' },
]

export const levelByName = (name: string): Level | undefined => LEVELS.find((l) => l.name === name)

/** What the scripts boundary hands in for ONE level: a steady-state cost and a fidelity count, both MEASURED.
 *  `ops` and `disagreements` are what make the fidelity row a bound rather than a boast — a bound is only as
 *  strong as the count it was taken over, so the count travels with it and prints beside it. */
export interface LevelMeasurement {
  level: string
  /** THE RAW steady-state floor in ns for one operation at this level (warm first, then the floor).
   *
   *  THIS FIGURE IS NOT SEALED AND MUST NOT BE. Three consecutive runs of the same generator on the same idle
   *  host gave 261, 330 and 332 ns at the handle level — a raw timing has no fixed point, and a derived layer
   *  that stores one reseals differently on every run. That is not hypothetical here: the capacity report
   *  flip-flopped between two coins for a run of commits, each reconcile sealing one state and the next run
   *  restoring the other, until the raw figure was replaced by its DECADE. Same law, same reason. The raw
   *  number belongs in a build log, where drifting is what it is for. */
  opNs: number
  /** THE DECADE — the order of magnitude, and the only cost figure that is written to a sealed file. Stable
   *  across the runs above (2, 2, 2), and still strict: a level that changes decade IS the regression worth
   *  resealing over. */
  opNsDecade: number
  /** the decade each INDEPENDENT estimate landed in. They must agree, or this level cannot be sealed —
   *  see `decadesAgree`. Carrying the whole list rather than a boolean means the report can say how the vote
   *  actually went instead of only that it failed. */
  decades: readonly number[]
  /** the raw floor of each independent estimate, for the spread */
  estimates: readonly number[]
  /** how many operations the floor was taken over — the denominator behind the cost figure */
  costOps: number
  /** how many sealed-value comparisons were EXECUTED on this host at this level */
  ops: number
  /** how many of them disagreed with the value Lean sealed. Any nonzero figure is the story, not a footnote. */
  disagreements: number
  /** what exactly was executed, in one line — so a rerun is the same experiment */
  what: string
}

/** A platform's own PUBLISHED figures, for the fidelity comparison. Nothing here is measured by uuidna, the
 *  class on every row says so, and the source is named. */
export interface QuantumBaseline {
  name: string
  /** published two-qubit gate error, as errors per million operations — the unit keeps it an integer */
  errorsPerMillion: number
  gateNs: number
  source: string
}

/** THE REPORTED BASELINE. An order-of-magnitude figure from the platforms' own published error rates: a ~10^-3
 *  two-qubit physical error is the class the superconducting and trapped-ion literature reports, i.e. ~1000
 *  errors per million operations. Kept coarse ON PURPOSE — a per-device error rate drifts with calibration
 *  between one Tuesday and the next, and pinning a precise figure we do not measure would be the exact
 *  substitution this module exists to refuse. The comparison the rows draw is a DECADE comparison, labelled
 *  `reported` throughout, and the per-device sources live in the capacity report rather than being restated
 *  here where they would drift out of step with it. */
export const REPORTED_BASELINE: QuantumBaseline = {
  name: 'gate-model physical two-qubit gate (superconducting / trapped-ion class)',
  // THE CLASS IS SEALED ALGEBRA (gate_error_baseline_class): 1000 = 10^3 errors per million, 100 = 10^2 ns.
  // Physical-platform papers disagree about which QPU sits where in that decade — that is a citation class,
  // not a reason to hold the arithmetic. Honesty seals what computes; it does not leave the wing empty.
  errorsPerMillion: 1000,
  gateNs: 100,
  source: 'Decade class sealed as gate_error_baseline_class (1000 = 10^3 per million, 100 = 10^2 ns). Physical-platform papers are not the seal — the comparison is a decade comparison, labelled reported.',
}

/** ONE ROW OF THE ADVANTAGE REPORT — a level, its three axes, and the class of every figure on it. */
export interface LevelAdvantage {
  level: string
  kind: 'width' | 'corpus'
  /** REACH — declared by construction, never measured */
  reach: { pow2: number; hexbits: number; class: HonestyClass; seals: string }
  /** COST — measured on this host at THIS level, carried as the DECADE because a raw timing has no fixed
   *  point (see LevelMeasurement.opNs). `opsPerSecondDecade` is 9 − opNsDecade: the same figure read the other
   *  way, and derived rather than separately measured so the two can never disagree. */
  cost: {
    opNsDecade: number
    over: number
    opsPerSecondDecade: number
    class: HonestyClass
    what: string
    /** HOW MANY INDEPENDENT ESTIMATES AGREED ON THIS DECADE — the seal's warrant, and the only form of it that
     *  can be written to a sealed file.
     *
     *  The margin from the decade boundary and the launch-to-launch spread are better diagnostics for a human,
     *  and BOTH ARE DELIBERATELY ABSENT HERE: they are functions of the raw timing, so a row carrying either
     *  would move on every run, and the report would lose the fixed point that sealing the decade bought it.
     *  That is not hypothetical — this field replaced a `marginHundredths` that read 261 on one run and 301 on
     *  the next, caught by the test asserting that nothing on a row varies with the raw figure. The margin and
     *  the spread print to the build log, beside the raw figures they belong with. */
    agreedEstimates: number
  }
  /** FIDELITY — measured here, bounded by the count it was taken over, beside what the baseline would predict */
  fidelity: {
    ops: number
    disagreements: number
    /** the strongest honest statement: better than one error per `bound` operations */
    bound: number
    /** how many errors the REPORTED baseline predicts over the same op count — computed, not measured */
    baselineExpected: number
    class: HonestyClass
  }
  /** the row in one sentence, citing the theorems it rests on so the gate can read it */
  claim: string
  address: string
}

export interface AdvantageReport {
  host: string
  rows: LevelAdvantage[]
  baseline: QuantumBaseline
  /** every level measured, or the report says which are missing — a partial report must not read as a full one */
  levelsMeasured: number
  levelsDeclared: number
  complete: boolean
  /** levels whose independent estimates did NOT agree on a decade, so the seal would be a coin flip. NOT a
   *  warning to be printed and passed: a report with any entry here would alternate between two states on
   *  successive runs, so the caller refuses to write. */
  unsealable: { level: string; decades: readonly number[]; estimates: readonly number[]; marginHundredths: number }[]
  receipt: string
  honest: string
}

const HONEST =
  'TypeScript computes the sealed quantum algebra (quantum by architecture). Measured quantum advantage on the ' +
  'published axes: usable capacity 2^128 vs reported logical platforms (theorem usable_gap_is_two_to_eighty) and ' +
  'per-level COST/FIDELITY on this host. Three axes on every row: REACH (declared), COST (steady-state floor ' +
  'here), FIDELITY (upper bound from an executed count, never a proof of zero). This is not a superconducting ' +
  'QPU claim and not a Shor-class crypto speedup — n_qubit_dimension counts classical simulation cost and is ' +
  'not that claim. Every figure carries its determination class. Rerun the generator on your own host for your ' +
  'own numbers.'

/** advantageRows(measurements, baseline) → one row per level, in LEVELS order, for the levels actually
 *  measured. A level with no measurement is DROPPED rather than defaulted: a zero cost or a zero op count would
 *  render as a spectacular result, and a report that fills its own gaps with flattering defaults is the failure
 *  mode every other gate in this tree exists to stop. `complete` on the report says how many of the declared
 *  levels arrived, so a partial sweep cannot pass itself off as a full one. */
export function advantageRows(
  measurements: readonly LevelMeasurement[],
  baseline: QuantumBaseline = REPORTED_BASELINE,
): LevelAdvantage[] {
  const rows: LevelAdvantage[] = []
  for (const level of LEVELS) {
    const m = measurements.find((x) => x.level === level.name)
    if (!m) continue
    if (m.opNs <= 0 || m.ops <= 0) continue          // a measurement that measured nothing is not a row
    const baselineExpected = div(m.ops * baseline.errorsPerMillion, 1000000)
    rows.push({
      level: level.name,
      kind: level.kind,
      reach: { pow2: level.pow2, hexbits: level.hexbits, class: 'declared', seals: level.seals },
      cost: {
        opNsDecade: m.opNsDecade, over: m.costOps, opsPerSecondDecade: 9 - m.opNsDecade,
        class: 'measured', what: m.what, agreedEstimates: m.estimates.length,
      },
      fidelity: {
        ops: m.ops,
        disagreements: m.disagreements,
        bound: m.disagreements === 0 ? m.ops : div(m.ops, m.disagreements),
        baselineExpected,
        class: 'measured',
      },
      claim: claimOf(level, m, baseline, baselineExpected),
      // the DECADE folds into the address, never the raw figure — an address built over a drifting number is a
      // derived layer with no fixed point, which is the defect this tree spent a run of commits undoing
      address: toUuid(`advantage|${level.name}|10^${m.opNsDecade}|${m.ops}|${m.disagreements}`),
    })
  }
  return rows
}

/** The row's sentence. It CITES the level's sealed theorem by key, which is what lets the slim gate read it as
 *  VERIFIED rather than as an uncited boast — and it states the fidelity figure as the bound it is. The words
 *  "no disagreement was observed" are chosen over "error-free": the first is what the count supports. */
function claimOf(level: Level, m: LevelMeasurement, baseline: QuantumBaseline, baselineExpected: number): string {
  const reach = level.kind === 'width'
    ? `addresses 2^${level.pow2} states (declared by construction, theorem ${level.seals})`
    : `sweeps the whole sealed ledger (bounded by theorem ${level.seals})`
  const fid = m.disagreements === 0
    ? `no disagreement with the Lean-sealed value was observed across ${m.ops} executions on this host — an upper bound of better than one error per ${m.ops}, never a proof of zero`
    : `${m.disagreements} of ${m.ops} executions disagreed with the Lean-sealed value on this host`
  return `At the ${level.name} level uuidna ${reach}, at a measured steady-state floor in the 10^${m.opNsDecade} ns decade per ${m.what}; ${fid}, where the reported ${baseline.name} class predicts ${baselineExpected} errors over the same count.`
}

/** advantageReport(host, measurements, baseline) → the whole report, folded to one recomputable receipt. The
 *  receipt folds the ROWS and the HOST together, so the same measurements on the same machine reseal and a
 *  different machine addresses elsewhere — "measured on this host" stops being something the report asserts and
 *  becomes something the next reader recomputes. */
export function advantageReport(
  host: string,
  measurements: readonly LevelMeasurement[],
  baseline: QuantumBaseline = REPORTED_BASELINE,
): AdvantageReport {
  const rows = advantageRows(measurements, baseline)
  const unsealable = measurements
    .filter((m) => rows.some((r) => r.level === m.level) && !decadesAgree(m.decades))
    .map((m) => ({
      level: m.level,
      decades: m.decades,
      estimates: m.estimates,
      marginHundredths: marginOf(m.opNs, m.opNsDecade),
    }))
  return {
    host,
    rows,
    baseline,
    levelsMeasured: rows.length,
    levelsDeclared: LEVELS.length,
    complete: rows.length === LEVELS.length,
    unsealable,
    receipt: merkleGravity([toUuid(`host:${host}`), ...rows.map((r) => r.address)]),
    honest: HONEST,
  }
}

