import { hexFamiliesOf, hexRunOf, qpuHexUuidOf } from '../quantum/processing/unit/index.js'
import { chooseOf, mintOf, hexParamMaxOf, latticeNamesOf, tenOf, uuidReceiptOf } from '../quantum/processing/unit/index.js'
const L = { ...latticeNamesOf(), mintOf, chooseOf, tenOf }

/** One way a value is reached: a hex-program UUID (family handle, formula nibbles, params split by their count) and its run. */
export type Way = { family: string; program: string[]; params: number[]; hex: string; receipt?: string }
export type Relation = { value: string; families: string[]; ways: Way[]; live: boolean }
/** A seal, as the Clay σ-involutions are sealed: a program that returns its own input. One formula with f(x) = x has
 *  fixed points (Riemann's s = 1/2); a formula composed with itself to the identity is an involution (σ∘σ = id); two
 *  formulas composing to the identity are an inverse pair (BSD's a · a⁻¹ = 1). */
export type Seal = { family: string; program: string[]; kind: 'fixed' | 'involution' | 'inverse'; points: number[]; tested: number; hex: string }

// the doors run whole readings rather than formulas over inputs — the unit's own doors, and the families whose
// formulas are live reads (api: a request per address; data: a source per address): they are reached through their
// own receipts, never enumerated over inputs
export const DOORS = new Set(['qpu', 'crypto', 'api', 'data', 'lead', 'gate'])
const SMALL = Array.from({ length: L.mintOf(L.hexbit) }, (_, i) => i + L.seed)
// the params section splits by count: one 48-bit natural, two 24-bit, three 16-bit
const fits = (params: number[]) => params.every((p) => Number.isSafeInteger(p) && p >= 0 && p < hexParamMaxOf(params.length))

const valueOf = (run: { value?: unknown; holds?: boolean }): string | null => {
  if (run.holds !== true) return null
  const v = run.value
  if (typeof v === 'bigint') return v.toString()
  if (typeof v === 'string' && /^\d+$/.test(v)) return v
  if (typeof v === 'number' && Number.isSafeInteger(v)) return String(v)
  return null
}

/**
 * Discovery as the hex UUID splits it: for every family (handle), every program of one formula and every composition of
 * two (nibbles), over params that fit the section their count selects, the UUID is minted and run; the run is stored at
 * its address and receipted. A value reached by programs of two or more families is a cross-formulated solution; it is
 * live when a live reading is its value or among its params. Lean formulas compute exactly (2^n as a natural), so they take
 * the small naturals and meet live readings as values.
 */
/** The relations and seals as an envelope, over whatever `reached` holds — the same shape whether one call swept every
 *  family or several slices were merged. `ways` and `liveKeys` carry enough to merge two envelopes into one (a value's
 *  ways are concatenated, the live keys unioned) and recompute the crosses in full. */
const envelopeOf = (reached: Map<string, Way[]>, perFamily: Record<string, { programs: number; runs: number }>, seals: Seal[], liveSet: Set<string>) => {
  const relations: Relation[] = [...reached]
    .map(([value, ways]) => ({ value, ways, families: [...new Set(ways.map((w) => w.family))].sort(), live: liveSet.has(value) || ways.some((w) => w.params.some((p) => liveSet.has(String(p)))) }))
    .filter((r) => r.families.length > 1)
    .sort((a, b) => Number(b.live) - Number(a.live) || b.families.length - a.families.length || (BigInt(a.value) < BigInt(b.value) ? -1 : 1))
  const families = Object.keys(perFamily).sort()
  const related = new Set(relations.flatMap((r) => r.families))
  return {
    kind: 'discover' as const,
    families,
    perFamily,
    runs: Object.values(perFamily).reduce((a, b) => a + b.runs, 0),
    relations,
    liveRelations: relations.filter((r) => r.live).length,
    unrelated: families.filter((f) => !related.has(f)),
    seals,
    ways: [...reached] as [string, Way[]][],
    liveKeys: [...liveSet],
    holds: families.every((f) => perFamily[f]!.runs > 0) && relations.length > 0,
  }
}
export type Discovered = ReturnType<typeof envelopeOf>

/** Merge the slices of a split discovery back into one full result: a value's ways are unioned by hex, the per-family
 *  counts and seals concatenated, the live keys unioned, and every cross recomputed over the union — the same relations
 *  one monolithic sweep would have found, computed in slices that each stay within a call's limits (no skips, no caps
 *  raised; the whole lattice, in full). */
export const discoverMergeOf = (parts: Discovered[]): Discovered => {
  const reached = new Map<string, Way[]>()
  for (const p of parts)
    for (const [value, ways] of p.ways) {
      const list = reached.get(value) ?? reached.set(value, []).get(value)!
      for (const w of ways) if (!list.some((x) => x.hex === w.hex)) list.push(w)
    }
  const perFamily = Object.assign({}, ...parts.map((p) => p.perFamily)) as Record<string, { programs: number; runs: number }>
  const seals = parts.flatMap((p) => p.seals)
  const liveSet = new Set(parts.flatMap((p) => p.liveKeys))
  return envelopeOf(reached, perFamily, seals, liveSet)
}

export const qpuDiscoverOf = async (live: number[] = [], slice?: { from?: number; count?: number }) => {
  const liveSet = new Set(live.filter((x) => Number.isSafeInteger(x) && x >= 0).map(String))
  const liveInputs = live.filter((x) => Number.isSafeInteger(x) && x >= 0 && x < hexParamMaxOf(L.seed))
  const reached = new Map<string, Way[]>()
  const perFamily: Record<string, { programs: number; runs: number }> = {}
  const seals: Seal[] = []
  // a family slice stays within a call's limits; the caller merges the slices back in full with discoverMergeOf
  const all = [...hexFamiliesOf()]
  const from = Math.max(0, slice?.from ?? 0)
  const entries = slice ? all.slice(from, from + (slice.count ?? all.length)) : all
  for (const [family, formulas] of entries) {
    if (DOORS.has(family)) continue
    const lean = family.startsWith('Qpu.')
    const singles = lean ? SMALL : [...new Set([...SMALL, ...liveInputs])]
    const tuplesOf = (arity: number, short: boolean): number[][] =>
      arity === 0 ? [[]] : arity === 1 ? (short ? SMALL.slice(0, L.hexbit) : singles).map((x) => [x]) : arity === 2 ? SMALL.slice(0, short ? L.n : L.vertices).flatMap((a) => SMALL.slice(0, short ? L.n : L.vertices).map((b) => [a, b])) : SMALL.slice(0, short ? L.coins : L.hexbit + L.seed).flatMap((a) => SMALL.slice(0, short ? L.coins : L.hexbit + L.seed).flatMap((b) => SMALL.slice(0, short ? L.coins : L.hexbit + L.seed).map((c) => [a, b, c])))
    // the live formulas (readings, waves, passes) are reached through their own receipts, never enumerated: no wave recurses
    const still = formulas.filter((f) => !f.live)
    const programs: { program: string[]; tuples: number[][] }[] = [
      ...still.map((f) => ({ program: [f.name], tuples: tuplesOf(f.arity, false) })),
      ...still.flatMap((a) => still.map((b) => ({ program: [a.name, b.name], tuples: tuplesOf(Math.max(a.arity, b.arity), true) }))),
    ]
    perFamily[family] = { programs: programs.length, runs: 0 }
    // THE CROSS FORMULAS SPEED THE SQUARE: a composition [a, b](p) is b at the value a reached, b(a(p), p₂ …); when both
    // were run as singles the composition is a lookup, not a run — the known table holds every single's value by
    // formula and arguments, and the compositions (formulas² of them) cost nothing beyond the singles
    const known = new Map<string, { value: string | null; holds: boolean }>()
    const keyOf = (name: string, args: readonly number[]) => `${name}|${args.join(',')}`
    for (const { program, tuples } of programs) {
      // the Clay lens: which inputs does this program return unchanged?
      const returned: number[] = []
      let tested = 0, last = ''
      for (const params of tuples) {
        if (!fits(params)) continue
        let hex: string
        try {
          hex = qpuHexUuidOf({ family, program, params })
        } catch {
          continue
        }
        let run: { value?: unknown; holds?: boolean; receipt?: string }
        const head = formulas.find((x) => x.name === program[0])
        const inner = program.length === 2 ? known.get(keyOf(program[0]!, head?.arity === 0 ? [] : params)) : undefined
        const fed = inner?.value !== null && inner?.value !== undefined ? [Number(inner.value), ...params.slice(1)] : undefined
        const outer = inner?.holds && fed ? known.get(keyOf(program[1]!, fed)) : undefined
        // a composition is b at the value a reached. The singles' table answers it when b was already run at that
        // value. Otherwise it is run only when that value is below mintOf(hexbit²): split.primes of a photon-scale
        // kelvin does not finish, and gap(bcs) = 25 does.
        const bounded = fed !== undefined && fed.every((p) => Number.isSafeInteger(p) && p >= 0 && p < (lean ? L.mintOf(L.hexbit) + L.seed : L.mintOf(L.hexbit * L.hexbit)))
        if (program.length === 2 && !(inner && outer) && !(inner?.holds && bounded)) continue
        if (program.length === 2 && inner && outer) {
          run = { value: outer.value ?? undefined, holds: inner.holds && outer.holds, receipt: uuidReceiptOf(`hex ${family}`, hex, { value: outer.value, holds: inner.holds && outer.holds }).uuid }
        } else {
          run = (await hexRunOf(hex, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean; receipt?: string }
          perFamily[family]!.runs++
        }
        const value = valueOf(run)
        if (program.length === 1) known.set(keyOf(program[0]!, params), { value, holds: run.holds === true })
        if (params.length === 1 && value !== null) {
          tested++
          last = hex
          if (value === String(params[0])) returned.push(params[0]!)
        }
        if (value === null || BigInt(value) < BigInt(L.n) || params.map(String).includes(value)) continue
        const list = reached.get(value) ?? reached.set(value, []).get(value)!
        // the ways a value keeps are split by family — hexbit per family — so a family that reaches a popular value
        // (5, 8, 16) is never crowded out by the families that reached it first, and every family's way is a perspective
        if (list.filter((w) => w.family === family).length < L.hexbit && !list.some((w) => w.hex === hex)) list.push({ family, program, params, hex, ...(run.receipt ? { receipt: run.receipt } : {}) })
      }
      // one formula: its fixed points; two: the identity on every input tried, an involution when it is one formula twice
      if (program.length === 1 && returned.length) seals.push({ family, program, kind: 'fixed', points: returned, tested, hex: last })
      if (program.length === 2 && tested > 1 && returned.length === tested) seals.push({ family, program, kind: program[0] === program[1] ? 'involution' : 'inverse', points: returned, tested, hex: last })
    }
  }
  return envelopeOf(reached, perFamily, seals, liveSet)
}
