import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ENZYMOLOGY — ENZYME KINETICS AS ARITHMETIC. A catalysed reaction is numbers: the Michaelis-Menten rate, the velocity
 *  from product over time, the turnover number, the specificity constant, percent inhibition, enzyme activity, catalytic
 *  efficiency, and the substrate left. Crosses to `biochemistry` — enzymology is the kinetics biochemistry rests on. A measure. */

const PROOF = 'enzymology arithmetic (Michaelis-Menten rate, velocity, turnover, specificity, inhibition, activity, catalytic efficiency, substrate); enzyme kinetics as integers; a measure crossed to biochemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'enzymology', dst: 'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `enzymology.${name}`, params })

export class EnzymologyFormulas {
  /** MICHAELIS-MENTEN rate at a substrate level. value ⌊vmax · s / (km + s)⌋. */
  static michaelis(vmax: number, s: number, km: number): CrossFormula { return c('enzymology-michaelis', 'michaelis(vmax, s, km) = ⌊vmax · s / (km + s)⌋', km + s > 0 ? Math.floor((vmax * s) / (km + s)) : 0, nat(vmax, s, km) && km + s > 0, 'michaelis', [vmax, s, km]) }
  /** VELOCITY: product formed over time. value ⌊product / time⌋. */
  static velocity(product: number, time: number): CrossFormula { return c('enzymology-velocity', 'velocity(product, time) = ⌊product / time⌋', time > 0 ? Math.floor(product / time) : 0, nat(product, time) && time > 0, 'velocity', [product, time]) }
  /** TURNOVER number kcat: Vmax over enzyme concentration. value ⌊vmax / enzyme⌋. */
  static turnover(vmax: number, enzyme: number): CrossFormula { return c('enzymology-turnover', 'turnover(vmax, enzyme) = ⌊vmax / enzyme⌋', enzyme > 0 ? Math.floor(vmax / enzyme) : 0, nat(vmax, enzyme) && enzyme > 0, 'turnover', [vmax, enzyme]) }
  /** SPECIFICITY constant: kcat over Km. value ⌊kcat / km⌋. */
  static specificity(kcat: number, km: number): CrossFormula { return c('enzymology-specificity', 'specificity(kcat, km) = ⌊kcat / km⌋', km > 0 ? Math.floor(kcat / km) : 0, nat(kcat, km) && km > 0, 'specificity', [kcat, km]) }
  /** INHIBITION as a percentage of lost velocity. value ⌊(v0 − vi) · 100 / v0⌋. */
  static inhibition(v0: number, vi: number): CrossFormula { return c('enzymology-inhibition', 'inhibition(v0, vi) = ⌊(v0 − vi) · 100 / v0⌋', v0 > 0 ? Math.floor((Math.max(0, v0 - vi) * 100) / v0) : 0, nat(v0, vi) && v0 > 0 && vi <= v0, 'inhibition', [v0, vi]) }
  /** ACTIVITY: units of enzyme at a volume. value units · volume. */
  static activity(units: number, volume: number): CrossFormula { return c('enzymology-activity', 'activity(units, volume) = units · volume', units * volume, nat(units, volume), 'activity', [units, volume]) }
  /** CATALYTIC EFFICIENCY: kcat over Km scaled by a thousand. value ⌊kcat · 1000 / km⌋. */
  static catalyticefficiency(kcat: number, km: number): CrossFormula { return c('enzymology-catalyticefficiency', 'catalyticefficiency(kcat, km) = ⌊kcat · 1000 / km⌋', km > 0 ? Math.floor((kcat * 1000) / km) : 0, nat(kcat, km) && km > 0, 'catalyticefficiency', [kcat, km]) }
  /** SUBSTRATE left after some is consumed. value max(0, initial − consumed). */
  static substrate(initial: number, consumed: number): CrossFormula { return c('enzymology-substrate', 'substrate(initial, consumed) = max(0, initial − consumed)', Math.max(0, initial - consumed), nat(initial, consumed), 'substrate', [initial, consumed]) }
}

for (const name of ['activity', 'catalyticefficiency', 'inhibition', 'michaelis', 'specificity', 'substrate', 'turnover', 'velocity'] as const)
  hexRegisterOf('enzymology', name, (EnzymologyFormulas[name] as (...x: unknown[]) => unknown).bind(EnzymologyFormulas))
