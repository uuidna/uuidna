import {
  DIMENSIONLESS,
  dimUnit,
  qAdd,
  qDiv,
  qMul,
  quantity,
  type Dim,
  type Quantity,
} from './quantum/os/engapi/index.js'

/**
 * The equations printed on the DRY CLEANING plate of Zenodo record 22934883, read against the SI seven.
 *
 * WHAT THE RECORD CLAIMS, in its own words: the framework bridges "industrial chemical engineering
 * (tetrachloroethylene distillation, soil mass dynamics, emulsification kinetics)" with multimedia synthesis,
 * and its self-assessment rates the underlying mathematics as "standard chemical engineering models". The
 * plates are image renders of that mathematics. This module asks the one question a render cannot answer for
 * itself: does what is PRINTED still say what the chemistry says.
 *
 * WHY THE ANSWER WAS NOT KNOWN IN ADVANCE, which is the bar a fact has to clear here. "A generated image
 * garbles equations" is a hunch, not a measurement: it names no equation and predicts no count. The plate mixes
 * genuine chemistry — the tetrachloroethylene partition ratio is textbook and is printed correctly — with
 * renders that are not equations at all, and nothing outside this run says which is which or how many of each.
 *
 * THE ARITHMETIC IS NOT REIMPLEMENTED HERE. quantum/os/engapi already carries dimensioned exact arithmetic over
 * the SI seven — exponent vectors, exact BigInt rationals, and a `qAdd` that REFUSES a sum whose dimensions
 * disagree and hands back the exact factor that would make it lawful. This file was first written against a
 * second, weaker copy of that (plain numbers, no values), which is the duplication this tree exists to refuse.
 * What is added here is only what engapi has no reason to carry: the SHAPE of a printed equation, and a verdict
 * for a symbol the table does not know — unreadable by construction, since a checker with no entry for a symbol
 * has nothing to read it as.
 *
 * THREE VERDICTS, AND THE THIRD IS THE POINT. `consistent`, `inconsistent`, and `illegible` — a symbol this
 * table does not know is REFUSED, never read as dimensionless. A checker that silently reads an unknown symbol
 * as "1" manufactures agreement, and would report a plate of glyph soup as sound arithmetic.
 *
 * A DEFINITION IS NOT A DISAGREEMENT. Where the left side is a single symbol this table does not carry, the
 * equation DEFINES that symbol, and only the right side's internal consistency is at issue. Without this rule
 * every definition on earth reads as a failure, which would make the instrument useless and flattering at once.
 *
 * NECESSARY, NOT SUFFICIENT — and this file ships the proof. `m = m + m'` is dimensionally perfect and
 * algebraically forces m' = 0. `degenerate` is the second instrument, and neither subsumes the other.
 *
 * THE TRANSCRIPTION IS VERBATIM, INCLUDING THE GARBLE. Symbols that could not be read off the plate are
 * transcribed under the name they appear to carry and left OUT of the symbol table, so the instrument returns
 * `illegible` for them. The refusals are the table's, not the transcriber's — a transcriber who quietly drops
 * he has no entry for decides the census himself and then reports it as a measurement.
 *
 * `T_` IS AMBIGUOUS AND BOTH READINGS ARE RUN. The plate uses `T_dist` beside a distillation column, where it
 * could be the temperature of the stage or the time of the cut. Picking one would put the instrument's thumb on
 * the scale, so both symbol tables are evaluated and a verdict that differs between them is reported as
 * `contested` rather than settled.
 */

// The SI seven in engapi's order — m, kg, s, A, K, mol, cd.
const MASS: Dim = [0, 1, 0, 0, 0, 0, 0]
const VOLUME: Dim = [3, 0, 0, 0, 0, 0, 0]
const AREA: Dim = [2, 0, 0, 0, 0, 0, 0]
const TIME: Dim = [0, 0, 1, 0, 0, 0, 0]
const TEMPERATURE: Dim = [0, 0, 0, 0, 1, 0, 0]
/** amount concentration, mol·m⁻³ — what square brackets mean in a chemical equation. */
const CONCENTRATION: Dim = [-3, 0, 0, 0, 0, 1, 0]

/** A symbol carries a dimension, not a measurement — so every one is the unit quantity of its kind. */
const one = (dim: Dim): Quantity => quantity(1n, 1n, dim)

/** An equation's right side, as structure rather than as a string. */
export type EquationTerm =
  | { kind: 'symbol'; name: string }
  /** a pure number, including a percentage — dimensionless by construction */
  | { kind: 'number' }
  | { kind: 'sum'; terms: readonly EquationTerm[] }
  | { kind: 'product'; terms: readonly EquationTerm[] }
  | { kind: 'quotient'; over: EquationTerm; by: EquationTerm }
  /** ∫ f d(x) — carries dim(f)·dim(x), which is why an undeclared integrand cannot be checked */
  | { kind: 'integral'; of: EquationTerm; by: EquationTerm }

export type Reading =
  | { verdict: 'consistent'; quantity: Quantity }
  | { verdict: 'inconsistent'; because: string }
  | { verdict: 'illegible'; because: string }

/** Values may be absent: a table that types every string as known makes the `illegible` path unreachable. */
export type SymbolTable = Readonly<Record<string, Dim | undefined>>

/** The dimension a term carries, or the first reason it has none. */
export function dimensionOf(term: EquationTerm, symbols: SymbolTable): Reading {
  switch (term.kind) {
    case 'number':
      return { verdict: 'consistent', quantity: one(DIMENSIONLESS) }

    case 'symbol': {
      const known = symbols[term.name]
      return known === undefined
        ? {
            verdict: 'illegible',
            because: `${term.name} is not in the symbol table, and an unread symbol is refused rather than taken for a pure number`,
          }
        : { verdict: 'consistent', quantity: one(known) }
    }

    case 'sum': {
      let carried: Quantity | undefined
      for (const addend of term.terms) {
        const read = dimensionOf(addend, symbols)
        if (read.verdict !== 'consistent') return read
        if (carried === undefined) { carried = read.quantity; continue }
        // engapi refuses the unlawful sum AND names the factor that would fix it — the mismatch states its cure.
        const sum = qAdd(carried, read.quantity)
        if (!sum.lawful || sum.quantity === null) return { verdict: 'inconsistent', because: sum.why }
        carried = sum.quantity
      }
      return carried === undefined
        ? { verdict: 'illegible', because: 'an empty sum has no dimension to read' }
        : { verdict: 'consistent', quantity: carried }
    }

    case 'product': {
      let carried = one(DIMENSIONLESS)
      for (const factor of term.terms) {
        const read = dimensionOf(factor, symbols)
        if (read.verdict !== 'consistent') return read
        carried = qMul(carried, read.quantity)
      }
      return { verdict: 'consistent', quantity: carried }
    }

    case 'quotient': {
      const above = dimensionOf(term.over, symbols)
      if (above.verdict !== 'consistent') return above
      const below = dimensionOf(term.by, symbols)
      if (below.verdict !== 'consistent') return below
      return { verdict: 'consistent', quantity: qDiv(above.quantity, below.quantity) }
    }

    case 'integral': {
      const of = dimensionOf(term.of, symbols)
      if (of.verdict !== 'consistent') return of
      const by = dimensionOf(term.by, symbols)
      if (by.verdict !== 'consistent') return by
      return { verdict: 'consistent', quantity: qMul(of.quantity, by.quantity) }
    }
  }
}

export interface Equation {
  /** the left side as the plate writes it */
  left: string
  right: EquationTerm
}

/**
 * Read one equation.
 *
 * Where `left` is a symbol the table does not carry, the equation DEFINES it and only the right side is at
 * issue — see the header. Where the table does carry it, both sides must agree.
 */
export function readEquation(equation: Equation, symbols: SymbolTable): Reading {
  const right = dimensionOf(equation.right, symbols)
  if (right.verdict !== 'consistent') return right

  const left = symbols[equation.left]
  if (left === undefined) return right

  const sum = qAdd(one(left), right.quantity)
  if (sum.lawful) return right
  return {
    verdict: 'inconsistent',
    because: `${equation.left} is ${dimUnit(left)} and its right side is ${right.quantity.unit} — they are not the same kind of thing, and the gap is ${sum.gapUnit}`,
  }
}

/**
 * The second instrument: an equation whose left symbol is a direct addend of its own right side.
 *
 * `m = m + m'` forces m' = 0 — every other addend must vanish. This is a DIFFERENT defect from a dimensional
 * one and is invisible to `readEquation`, which passes it cleanly. Stated narrowly, to exactly what follows:
 * only a top-level sum containing the left symbol is claimed, because that is the case where the conclusion is
 * arithmetic rather than a guess about what the author meant.
 */
export function degenerate(equation: Equation): string | undefined {
  if (equation.right.kind !== 'sum') return undefined
  const others = equation.right.terms.filter(
    (t) => !(t.kind === 'symbol' && t.name === equation.left),
  )
  if (others.length === equation.right.terms.length) return undefined
  return `${equation.left} appears on both sides of its own sum, so the remaining ${String(others.length)} addend(s) are forced to zero`
}

const symbol = (name: string): EquationTerm => ({ kind: 'symbol', name })
const number: EquationTerm = { kind: 'number' }
const sum = (...terms: EquationTerm[]): EquationTerm => ({ kind: 'sum', terms })
const product = (...terms: EquationTerm[]): EquationTerm => ({ kind: 'product', terms })
const quotient = (over: EquationTerm, by: EquationTerm): EquationTerm => ({ kind: 'quotient', over, by })

/** Symbols read with confidence off the plate, under its own prefix convention. */
const SHARED: SymbolTable = {
  // m_ — mass
  m_solv: MASS, m_soil: MASS, m_dist: MASS, m_s: MASS, m_e: MASS,
  // V_ — volume
  V_tank: VOLUME, V_solv: VOLUME, V_liquid: VOLUME, V_soil: VOLUME, V_dist: VOLUME,
  // C_ and bracketed species — amount concentration, which is what square brackets mean
  C_solv: CONCENTRATION, C_soil: CONCENTRATION, C_liquid: CONCENTRATION, C_dist: CONCENTRATION,
  C2Cl4_gas: CONCENTRATION, C2Cl4_liquid: CONCENTRATION,
  // n_ — amount of substance
  n_t: [0, 0, 0, 0, 0, 1, 0], n_2: [0, 0, 0, 0, 0, 1, 0],
  // a partition ratio is a ratio
  K_eq: DIMENSIONLESS,
  t: TIME,
  'Surface Area': AREA,
}

const T_SYMBOLS = ['T_dist', 'T_tank'] as const

const asTemperature: SymbolTable = {
  ...SHARED,
  ...Object.fromEntries(T_SYMBOLS.map((s) => [s, TEMPERATURE])),
}

const asTime: SymbolTable = {
  ...SHARED,
  ...Object.fromEntries(T_SYMBOLS.map((s) => [s, TIME])),
}

export const READINGS = [
  { of: 'T_ as thermodynamic temperature', symbols: asTemperature },
  { of: 'T_ as elapsed time', symbols: asTime },
] as const

export type Printed = Equation & {
  /** the panel of the plate it is printed in */
  panel: 'distillation' | 'equilibrium' | 'emulsification' | 'kinetics'
  /** the equation as the plate prints it, so a reader can go and look */
  as_printed: string
}

export const PLATE: readonly Printed[] = [
  { panel: 'distillation', as_printed: 'm_solv = m_solv + m_soil',
    left: 'm_solv', right: sum(symbol('m_solv'), symbol('m_soil')) },
  { panel: 'distillation', as_printed: 'V_tank = V_tank + T_tank',
    left: 'V_tank', right: sum(symbol('V_tank'), symbol('T_tank')) },
  { panel: 'distillation', as_printed: 'm_dist = V_liquid + V_soil',
    left: 'm_dist', right: sum(symbol('V_liquid'), symbol('V_soil')) },
  { panel: 'distillation', as_printed: 'm_dist = V_dist + T_dist',
    left: 'm_dist', right: sum(symbol('V_dist'), symbol('T_dist')) },
  { panel: 'distillation', as_printed: 'F_riġist = (m_solv − m_solv)/T_dist + 100%',
    left: 'F_rigist',
    right: sum(quotient(sum(symbol('m_solv'), symbol('m_solv')), symbol('T_dist')), number) },
  { panel: 'distillation', as_printed: 'm_solv = V_solv + C_soil + c[v^−1]',
    left: 'm_solv', right: sum(symbol('V_solv'), symbol('C_soil'), symbol('c[v^-1]')) },
  { panel: 'distillation', as_printed: 'T_dist = (m_s − V_tank)/(n_t + T_dist)',
    left: 'T_dist',
    right: quotient(sum(symbol('m_s'), symbol('V_tank')), sum(symbol('n_t'), symbol('T_dist'))) },
  { panel: 'distillation', as_printed: 'T_dist = (m_s − C_soil)/(t·C_liquid)',
    left: 'T_dist',
    right: quotient(sum(symbol('m_s'), symbol('C_soil')), product(symbol('t'), symbol('C_liquid'))) },
  { panel: 'equilibrium', as_printed: 'K_eq = [C2Cl4_gas]/[C2Cl4_liquid]',
    left: 'K_eq', right: quotient(symbol('C2Cl4_gas'), symbol('C2Cl4_liquid')) },
  { panel: 'equilibrium', as_printed: 'K_smast = K_eq = [C2Cl4_gas] + [C_liquid]',
    left: 'K_eq', right: sum(symbol('C2Cl4_gas'), symbol('C_liquid')) },
  { panel: 'equilibrium', as_printed: 'C_smiec = K_eq · (C2Cl4 − [C2Cl4_gas])/(C_solv + C_soil)',
    left: 'C_smiec',
    right: product(symbol('K_eq'), quotient(sum(symbol('C2Cl4'), symbol('C2Cl4_gas')),
      sum(symbol('C_solv'), symbol('C_soil')))) },
  { panel: 'emulsification', as_printed: 'Surface Area = ∫ f(t) dt',
    left: 'Surface Area', right: { kind: 'integral', of: symbol('f'), by: symbol('t') } },
  { panel: 'kinetics', as_printed: 'C_soil = C_soil/[m_solv + C_soil]',
    left: 'C_soil', right: quotient(symbol('C_soil'), sum(symbol('m_solv'), symbol('C_soil'))) },
  { panel: 'kinetics', as_printed: 'C_soil = (m_solv·[C_soil])/(m_s + [C_soil])',
    left: 'C_soil',
    right: quotient(product(symbol('m_solv'), symbol('C_soil')), sum(symbol('m_s'), symbol('C_soil'))) },
  { panel: 'kinetics', as_printed: 'C_dist = (m_e·[C2Cl4])/(−t·C_soil)',
    left: 'C_dist',
    right: quotient(product(symbol('m_e'), symbol('C2Cl4')), product(symbol('t'), symbol('C_soil'))) },
]

export interface Audited {
  as_printed: string
  panel: Printed['panel']
  /** the verdict under each reading of `T_`, in READINGS order */
  under: readonly { of: string; verdict: 'consistent' | 'inconsistent' | 'illegible'; because: string }[]
  /** the verdict that holds under every reading, or 'contested' when the readings disagree */
  verdict: 'consistent' | 'inconsistent' | 'illegible' | 'contested'
  /** set when the equation forces its own addends to zero — a defect dimensions cannot see */
  forced?: string
}

export function auditPlate(plate: readonly Printed[] = PLATE): Audited[] {
  return plate.map((printed) => {
    const under = READINGS.map((reading) => {
      const read = readEquation(printed, reading.symbols)
      return {
        of: reading.of,
        verdict: read.verdict,
        because: read.verdict === 'consistent' ? `carries ${read.quantity.unit}` : read.because,
      }
    })
    const first = under[0].verdict
    return {
      as_printed: printed.as_printed,
      panel: printed.panel,
      under,
      verdict: under.every((u) => u.verdict === first) ? first : 'contested',
      forced: degenerate(printed),
    }
  })
}

export interface PlateCensus {
  consistent: number
  contested: number
  illegible: number
  inconsistent: number
  /** equations that pass the dimensional read and still force an addend to zero */
  passing_but_forced: number
  total: number
}

export function plateCensus(audited: readonly Audited[] = auditPlate()): PlateCensus {
  const count = (v: Audited['verdict']): number => audited.filter((a) => a.verdict === v).length
  return {
    consistent: count('consistent'),
    contested: count('contested'),
    illegible: count('illegible'),
    inconsistent: count('inconsistent'),
    passing_but_forced: audited.filter((a) => a.verdict === 'consistent' && a.forced !== undefined).length,
    total: audited.length,
  }
}
