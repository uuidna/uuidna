import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STABILITY — CONTROL-SYSTEM MARGINS, AS ARITHMETIC. Whether a feedback loop holds is numbers: how much the gain can grow
 *  before instability, how much phase is left at crossover, where the loop crosses over, the poles and zeros of the transfer,
 *  the Routh sign test, the ratio of the two margins, and how damped the response is. Crosses to `control` — stability is what
 *  control keeps. A measure. */

const PROOF = 'stability arithmetic (gain margin, phase margin, crossover frequency, poles, zeros, Routh criterion, margin ratio, damping factor); a measure crossed to control'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'stability', dst: 'control', formula, value, proof: PROOF, ...extra }, holds, { name: `stability.${name}`, params })

export class StabilityFormulas {
  /** GAIN MARGIN: how far the gain limit sits above the gain, as a percentage. value ⌊limit · 100 / gain⌋. */
  static gainmargin(limit: number, gain: number): CrossFormula { return c('stability-gainmargin', 'gainmargin(limit, gain) = ⌊limit · 100 / gain⌋', gain > 0 ? Math.floor((limit * 100) / gain) : 0, nat(limit, gain) && gain > 0, 'gainmargin', [limit, gain]) }
  /** PHASE MARGIN: the phase left below the limit at crossover. value max(0, limit − phase). */
  static phasemargin(limit: number, phase: number): CrossFormula { return c('stability-phasemargin', 'phasemargin(limit, phase) = max(0, limit − phase)', Math.max(0, limit - phase), nat(limit, phase), 'phasemargin', [limit, phase]) }
  /** CROSSOVER FREQUENCY: bandwidth spread over the poles. value ⌊bandwidth / poles⌋. */
  static crossoverfrequency(bandwidth: number, poles: number): CrossFormula { return c('stability-crossoverfrequency', 'crossoverfrequency(bandwidth, poles) = ⌊bandwidth / poles⌋', poles > 0 ? Math.floor(bandwidth / poles) : 0, nat(bandwidth, poles) && poles > 0, 'crossoverfrequency', [bandwidth, poles]) }
  /** POLES: real poles plus the two of each complex pair. value real + 2 · pairs. */
  static poles(real: number, pairs: number): CrossFormula { return c('stability-poles', 'poles(real, pairs) = real + 2 · pairs', real + 2 * pairs, nat(real, pairs), 'poles', [real, pairs]) }
  /** ZEROS: numerator roots left after cancellation. value max(0, num − cancelled). */
  static zeros(num: number, cancelled: number): CrossFormula { return c('stability-zeros', 'zeros(num, cancelled) = max(0, num − cancelled)', Math.max(0, num - cancelled), nat(num, cancelled), 'zeros', [num, cancelled]) }
  /** ROUTH CRITERION: 1 when the first column has no sign changes (no right-half-plane poles). value [signchanges = 0]. */
  static routhcriterion(signchanges: number): CrossFormula { return c('stability-routhcriterion', 'routhcriterion(signchanges) = [signchanges = 0]', signchanges === 0 ? 1 : 0, nat(signchanges), 'routhcriterion', [signchanges]) }
  /** MARGIN RATIO: gain margin against phase margin, as a percentage. value ⌊gainmargin · 100 / phasemargin⌋. */
  static marginratio(gainmargin: number, phasemargin: number): CrossFormula { return c('stability-marginratio', 'marginratio(gainmargin, phasemargin) = ⌊gainmargin · 100 / phasemargin⌋', phasemargin > 0 ? Math.floor((gainmargin * 100) / phasemargin) : 0, nat(gainmargin, phasemargin) && phasemargin > 0, 'marginratio', [gainmargin, phasemargin]) }
  /** DAMPING FACTOR: actual damping as a percentage of critical. value ⌊actual · 100 / critical⌋. */
  static dampingfactor(actual: number, critical: number): CrossFormula { return c('stability-dampingfactor', 'dampingfactor(actual, critical) = ⌊actual · 100 / critical⌋', critical > 0 ? Math.floor((actual * 100) / critical) : 0, nat(actual, critical) && critical > 0, 'dampingfactor', [actual, critical]) }
}

for (const name of ['crossoverfrequency', 'dampingfactor', 'gainmargin', 'marginratio', 'phasemargin', 'poles', 'routhcriterion', 'zeros'] as const)
  hexRegisterOf('stability', name, (StabilityFormulas[name] as (...x: unknown[]) => unknown).bind(StabilityFormulas))
