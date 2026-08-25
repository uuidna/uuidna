// measurement — ONE SHAPE FOR EVERY FIGURE THIS TREE PUBLISHES, so a reader can filter by HOW A NUMBER WAS
// DETERMINED rather than by where it happened to be written down.
//
// The vocabulary is not invented here; it is collected. quantum/advantage already types a level's cost as
// `measured` and its reach as `declared` — and says why: reach "is the column a reader is most tempted to read as
// a measurement, so it is the one that must be denied the flattering class it is not entitled to". The research
// ledger already separates `convention` (exact by definition) from `measured` (carries uncertainty), and gates
// what each may DO. hardware/lanes carries three wall-clock figures and the ppm derived from them. Every one of
// these is a measurement with a technique attached, and every one used a different shape, so nothing could ask
// the whole tree "show me only what was actually measured" — which is precisely the question a reader needs.
//
// THE LAW THIS ENCODES, and it is the expensive one. A RAW TIMING MAY NOT BE SEALED; only its DECADE may. That is
// not a preference. gen-quantum-capacity sealed a raw wall-clock figure, so every run produced a different answer;
// README.md and lean/quantum-capacity.* alternated between exactly two states; and a run of `Reconcile:` commits
// in the log were each other's undoing rather than anyone's fix. Three consecutive runs on the same idle host gave
// 261, 330 and 332 ns. The decade was 2, 2, 2. So `sealing` is part of the shape, a time measurement sealed
// `exact` is a defect this module can NAME (see `violations`), and a UI can filter the unstable figures out of a
// view rather than each surface remembering the rule.
//
// HONEST SCOPE: this standardises the CARRIAGE of a figure — its units, its technique, whether it may be sealed.
// It does not verify any value, and a `measured` label is a claim about method, not a warrant of accuracy.
// Integrity, not truth (theorem provenance_integrity_not_content_truth).

/** HOW the figure was determined. The three the tree already uses, and no fourth invented for convenience. */
export type Technique =
  | 'measured'     // an instrument ran and this is what it returned — carries uncertainty
  | 'declared'     // true by construction; nothing was run and nothing could have come out differently
  | 'convention'   // exact by definition (a standard, a published constant) — not an observation

/** WHETHER the figure may enter the derived layer, and in what form. */
export type Sealing =
  | 'exact'        // the value itself is stable and may be sealed verbatim
  | 'decade'       // only the order of magnitude is stable enough to seal; the raw value belongs in a build log
  | 'unsealed'     // reported, never written to a sealed file

/** Units seen across the tree. Time units are the ones the decade law bites on. */
export type Unit = 'ns' | 'ms' | 'ppm' | 'percent' | 'states' | 'count' | 'ratio'

const TIME_UNITS: readonly Unit[] = ['ns', 'ms']

export interface Measurement {
  /** what the figure is ABOUT — the level, lane, or corpus it describes */
  subject: string
  /** what was determined about the subject */
  metric: string
  value: number
  unit: Unit
  technique: Technique
  sealing: Sealing
  /** the denominator a bound was taken over. A bound is only as strong as its count, so the count travels with
   *  it — an error rate "better than one in N" is meaningless without N, and a UI showing the rate without the
   *  count would be publishing the boast and dropping the evidence. */
  over?: number
  /** where a reader goes to recompute it */
  source: string
  note?: string
}

/** The axes a view may filter on. Every field is optional; an omitted field filters nothing. */
export interface MeasurementFilter {
  technique?: Technique | Technique[]
  sealing?: Sealing | Sealing[]
  unit?: Unit | Unit[]
  subject?: string
  /** only figures a bound was taken over at least this many times — the honest way to demand confidence */
  minOver?: number
}

const oneOf = <T,>(want: T | T[] | undefined, got: T): boolean =>
  want === undefined || (Array.isArray(want) ? want.includes(got) : want === got)

/** filterMeasurements(list, f) → the subset matching every stated axis, order preserved.
 *
 *  ORDER IS PRESERVED ON PURPOSE: a filter is a VIEW, and a view that reorders invites a reader to infer a
 *  ranking the producer never expressed. The caller sorts if the caller means to rank. */
export function filterMeasurements(list: readonly Measurement[], f: MeasurementFilter = {}): Measurement[] {
  return list.filter((m) =>
    oneOf(f.technique, m.technique) &&
    oneOf(f.sealing, m.sealing) &&
    oneOf(f.unit, m.unit) &&
    (f.subject === undefined || m.subject === f.subject) &&
    (f.minOver === undefined || (m.over ?? 0) >= f.minOver))
}

/** The distinct values present, so a UI can build its controls from the DATA rather than from a hand-kept list
 *  that silently goes stale the first time a producer adds a unit. */
export function facets(list: readonly Measurement[]): {
  technique: Technique[]; sealing: Sealing[]; unit: Unit[]; subject: string[]
} {
  const uniq = <T,>(xs: T[]): T[] => [...new Set(xs)]
  return {
    technique: uniq(list.map((m) => m.technique)),
    sealing: uniq(list.map((m) => m.sealing)),
    unit: uniq(list.map((m) => m.unit)),
    subject: uniq(list.map((m) => m.subject)),
  }
}

/** violations(list) → every figure whose carriage breaks a law of this shape, named. Empty is the healthy answer.
 *
 *  Two laws, both learned the expensive way:
 *   · A MEASURED TIME MAY NOT BE SEALED EXACT — the flip-flop above. Its decade may.
 *   · A BOUND MUST CARRY ITS COUNT — a `measured` figure with `over: 0` states a result with no denominator,
 *     which is the shape of a claim rather than of an observation. */
export function violations(list: readonly Measurement[]): { measurement: Measurement; law: string }[] {
  const out: { measurement: Measurement; law: string }[] = []
  for (const m of list) {
    if (m.technique === 'measured' && TIME_UNITS.includes(m.unit) && m.sealing === 'exact')
      out.push({ measurement: m, law: 'a measured time has no fixed point across runs and may not be sealed exact — seal its decade (gen-quantum-capacity, the two-coin flip-flop)' })
    if (m.technique === 'measured' && m.over !== undefined && m.over <= 0)
      out.push({ measurement: m, law: 'a measured figure carrying over ≤ 0 states a result with no denominator — a bound is only as strong as the count it was taken over' })
  }
  return out
}

/** The decade of a positive value — the only form a measured time may be sealed in. Integer arithmetic only:
 *  the determinism scan admits no host Math call anywhere in this tree, no exemption for a helper. */
export function decadeOf(value: number): number {
  if (value <= 0) return 0
  let d = 0
  let v = value
  while (v >= 10) { v = (v - (v % 10)) / 10; d++ }
  return d
}
