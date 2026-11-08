import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TOX — TOXICOLOGY AS EVIDENCE. A poisoning is arithmetic over concentration, dose and time: the dose from a
 *  concentration in a volume, what remains after a number of half-lives, linear clearance, the margin of safety, the
 *  cumulative exposure, whether a level exceeds the permissible limit, the fraction of a lethal dose, and the onset. A
 *  forensic measure crossing to `evidence` — not a diagnosis. */

const PROOF = 'toxicology arithmetic (dose, half-life decay, clearance, margin of safety, cumulative exposure, permissible limit, fraction of LD50, onset); a forensic measure crossed to evidence'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const x = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tox', dst: 'evidence', formula, value, proof: PROOF, ...extra }, holds, { name: `tox.${name}`, params })

export class ToxFormulas {
  /** THE DOSE: a concentration over a volume. value conc · volume. */
  static dose(conc: number, volume: number): CrossFormula { return x('tox-dose', 'dose(conc, volume) = conc · volume', conc * volume, nat(conc, volume), 'dose', [conc, volume]) }
  /** WHAT REMAINS after `halvings` half-lives. value ⌊dose / 2^halvings⌋. */
  static halflife(dose: number, halvings: number): CrossFormula { return x('tox-halflife', 'halflife(dose, halvings) = ⌊dose / 2^halvings⌋', Math.floor(dose / 2 ** halvings), nat(dose, halvings), 'halflife', [dose, halvings]) }
  /** LINEAR CLEARANCE: the dose less a constant rate over `hours`. value max(0, dose − rate · hours). */
  static clearance(dose: number, rate: number, hours: number): CrossFormula { return x('tox-clearance', 'clearance(dose, rate, hours) = max(0, dose − rate · hours)', Math.max(0, dose - rate * hours), nat(dose, rate, hours), 'clearance', [dose, rate, hours]) }
  /** THE MARGIN OF SAFETY as a percentage: the toxic threshold over the exposure. value ⌊toxic · 100 / exposure⌋. */
  static margin(toxic: number, exposure: number): CrossFormula { return x('tox-margin', 'margin(toxic, exposure) = ⌊toxic · 100 / exposure⌋', exposure > 0 ? Math.floor((toxic * 100) / exposure) : 0, nat(toxic, exposure) && exposure > 0, 'margin', [toxic, exposure]) }
  /** CUMULATIVE EXPOSURE: a concentration at a rate over `hours`. value conc · rate · hours. */
  static exposure(conc: number, rate: number, hours: number): CrossFormula { return x('tox-exposure', 'exposure(conc, rate, hours) = conc · rate · hours', conc * rate * hours, nat(conc, rate, hours), 'exposure', [conc, rate, hours]) }
  /** THE PERMISSIBLE LIMIT: 1 when the level exceeds the limit. value [level > limit]. */
  static threshold(level: number, limit: number): CrossFormula { return x('tox-threshold', 'threshold(level, limit) = [level > limit]', level > limit ? 1 : 0, nat(level, limit), 'threshold', [level, limit]) }
  /** THE FRACTION OF A LETHAL DOSE as a percentage of LD50. value ⌊dose · 100 / ld50⌋. */
  static ld(dose: number, ld50: number): CrossFormula { return x('tox-ld', 'ld(dose, ld50) = ⌊dose · 100 / ld50⌋', ld50 > 0 ? Math.floor((dose * 100) / ld50) : 0, nat(dose, ld50) && ld50 > 0, 'ld', [dose, ld50]) }
  /** ONSET: time to effect as the dose over the absorption rate. value ⌊dose / rate⌋. */
  static onset(dose: number, rate: number): CrossFormula { return x('tox-onset', 'onset(dose, rate) = ⌊dose / rate⌋', rate > 0 ? Math.floor(dose / rate) : 0, nat(dose, rate) && rate > 0, 'onset', [dose, rate]) }
}

for (const name of ['clearance', 'dose', 'exposure', 'halflife', 'ld', 'margin', 'onset', 'threshold'] as const)
  hexRegisterOf('tox', name, (ToxFormulas[name] as (...x: unknown[]) => unknown).bind(ToxFormulas))
