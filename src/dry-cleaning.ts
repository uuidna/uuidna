import {
  AMOUNT,
  AREA,
  CONCENTRATION,
  DIMENSIONLESS,
  MASS,
  TEMPERATURE,
  TIME,
  VOLUME,
  degenerate,
  readEquation,
  type Equation,
  type SymbolTable,
  type Term,
} from './si.js'

/**
 * The equations printed on the DRY CLEANING plate of Zenodo record 22934883, read by the SI instrument.
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
 * THE TRANSCRIPTION IS VERBATIM, INCLUDING THE GARBLE. Symbols that could not be read off the plate are
 * transcribed under the name they appear to carry and left OUT of the symbol table, so the instrument returns
 * `illegible` for them. The refusals are the table's, not the transcriber's — which matters, because a
 * transcriber who quietly drops what he cannot read decides the census himself and then reports it as a
 * measurement.
 *
 * `T_` IS AMBIGUOUS AND BOTH READINGS ARE RUN. The plate uses `T_dist` beside a distillation column, where it
 * could be the temperature of the stage or the time of the cut. Picking one would put the instrument's thumb on
 * the scale, so both symbol tables are evaluated and `ROBUST` records whether a verdict survives either reading.
 * A failure that holds only under one reading is a weaker finding and is reported as one.
 */

const symbol = (name: string): Term => ({ kind: 'symbol', name })
const number: Term = { kind: 'number' }
const sum = (...terms: Term[]): Term => ({ kind: 'sum', terms })
const product = (...terms: Term[]): Term => ({ kind: 'product', terms })
const quotient = (over: Term, by: Term): Term => ({ kind: 'quotient', over, by })

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
  n_t: AMOUNT, n_2: AMOUNT,
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
        because: read.verdict === 'consistent' ? `carries ${JSON.stringify(read.dimension)}` : read.because,
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
